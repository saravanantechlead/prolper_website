/* ──────────────────────────────────────────────────────────
   Static pre-rendering for SEO.

   After `vite build`, this serves `dist/` and uses a headless browser
   to snapshot each marketing route into a static HTML file (with the
   fully-rendered content + per-page <title>/description/canonical/JSON-LD
   baked in). Search engines and social scrapers then get real HTML
   instead of an empty SPA shell.

   Firebase Hosting serves these files directly (cleanUrls), and falls
   back to the SPA for any route we don't pre-render.

   Run: npm run prerender   (or npm run build:prod to build + prerender)
   ────────────────────────────────────────────────────────── */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const DIST = join(process.cwd(), "dist");
const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

// Routes to pre-render. (Legal/privacy pull markdown from Firestore at
// runtime, so they stay SPA-rendered and are intentionally excluded.)
const ROUTES = [
  "/",
  "/become-a-provider",
  "/service/handyman",
  "/service/painting",
  "/service/cleaning",
  "/service/car-detailing",
  "/service/pet-care",
  "/service/cpa-services",
  "/service/tutor",
  "/service/fitness-coach",
];

if (!existsSync(join(DIST, "index.html"))) {
  console.error("✗ dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

console.log("→ starting preview server…");
const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
  shell: process.platform === "win32",
});

let browser;
try {
  // wait for the server to accept connections
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(BASE); if (r.ok) break; } catch { /* not up yet */ }
    await wait(250);
  }

  browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture every route FIRST (no writes), so the SPA fallback shell served
  // by the preview server stays pristine and each page gets only its own
  // <title>/description/canonical (no leftover home tags).
  const snapshots = [];
  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".nh-page, .sl-page, .bp-page", { timeout: 10000 }).catch(() => {});
    await page.waitForFunction(() => document.title && document.title.length > 0, { timeout: 5000 }).catch(() => {});
    await wait(800);
    const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
    const outPath = route === "/"
      ? join(DIST, "index.html")
      : join(DIST, route.replace(/^\//, "") + ".html");
    snapshots.push({ route, outPath, html });
    console.log(`  ✓ captured ${route}`);
  }

  // Now write them all.
  for (const { outPath, html } of snapshots) {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
  }

  console.log(`✓ pre-rendered ${ROUTES.length} routes → dist/`);
} catch (err) {
  console.error("✗ prerender failed:", err.message);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.kill();
}
