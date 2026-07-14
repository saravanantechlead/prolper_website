# Prolper — SEO Guide

Everything SEO-related on the Prolper website: what's implemented, how it works,
how to change it, and what to do after each deploy.

> **Canonical domain:** `https://www.prolper.com`
> It is hard-coded in several places (see [Changing the domain](#changing-the-domain)).
> If the live domain differs, update it **before** launch — a wrong canonical hurts ranking.

---

## 1. What's implemented

| Area | Where | Notes |
|------|-------|-------|
| Per-page title / description / canonical | `react-helmet-async` via `src/components/Seo/Seo.jsx` | Unique per route |
| Global meta, geo, icons, JSON-LD | `index.html` `<head>` | Site-wide defaults |
| Structured data (JSON-LD) | `index.html` + per-page `Seo` | Rich-result eligible |
| Crawl files | `public/robots.txt`, `public/sitemap.xml` | Served from site root |
| PWA manifest | `public/site.webmanifest` | Installable / mobile |
| Social cards | Open Graph + Twitter tags | 1294×646 image (`/banner1.png`) |
| Semantics | one `<h1>` per page, `alt` text | On-page basics |
| Performance | `preconnect` / `dns-prefetch` in `index.html` | Faster LCP |

---

## 2. Per-page meta (react-helmet-async)

- App is wrapped in `<HelmetProvider>` in `src/main.jsx`.
- `src/components/Seo/Seo.jsx` is a reusable component that sets **title,
  description, canonical, OG and Twitter tags**, plus optional page-specific JSON-LD.

Pages that render `<Seo>`:

| Route | Title (approx.) | Extra JSON-LD |
|-------|-----------------|---------------|
| `/` | Local Services in Mississauga… \| Prolper | — (global graph in `index.html`) |
| `/become-a-provider` | Become a Pro on Prolper… | `FAQPage` |
| `/service/:id` | `{Service}` in Mississauga… | `Service` + `BreadcrumbList` |
| `/privacy-policy` | Privacy Policy \| Prolper | — |
| `/legal/:type` | `{Terms title}` \| Prolper | — |

### Add SEO to a new page

```jsx
import Seo from "../../components/Seo/Seo";

<Seo
  title="Page title (≤ ~60 chars) | Prolper"
  description="Compelling 150–160 char summary with a keyword."
  path="/your-route"
  // image="https://www.prolper.com/your-og.png"  // optional
  // noindex                                        // optional
  // jsonLd={{ "@context": "https://schema.org", ... }}  // optional
/>
```

> **Important:** the static `<meta name="description">` and `<link rel="canonical">`
> were **removed** from `index.html` on purpose — otherwise Helmet appends a second
> copy and crawlers read the wrong (home) one. Let `Seo` own those two tags. Every
> indexable route should render `<Seo>`.

---

## 3. Structured data (JSON-LD)

Global graph in `index.html` (`<script type="application/ld+json">`):
- **Organization** — name, logo, `sameAs` social profiles, area served.
- **WebSite** — site identity.
- **MobileApplication** — the Prolper app (iOS/Android, free).
- **Service + OfferCatalog** — the 8 live services, area = Mississauga, ON.

Per-page:
- **FAQPage** on `/become-a-provider` (eligible for FAQ rich snippets).
- **Service + BreadcrumbList** on `/service/:id`.

Validate at: <https://search.google.com/test/rich-results> and
<https://validator.schema.org>.

> ⚠️ Do **not** add fake `aggregateRating` / `review` counts to JSON-LD — Google can
> issue a manual penalty for unverifiable review markup. (Intentionally omitted.)

---

## 4. Crawl & indexing files (`public/`)

- **`robots.txt`** — allows all crawlers, points to the sitemap.
- **`sitemap.xml`** — home, `/become-a-provider`, all 8 `/service/*`, privacy, legal.
  Add a `<url>` entry whenever you add an indexable route.
- **`site.webmanifest`** — name, theme color `#14b8a6`, icon.

These live in `public/` and are copied verbatim to `dist/` on build.

---

## 5. Social share cards

Open Graph + Twitter tags are in `index.html` (global default = home) and
overridden per page by `Seo`. Image: `public/banner1.png` (1294×646, ~1.91:1).

> **SPA caveat:** Facebook / LinkedIn / X scrapers **do not run JavaScript**, so a
> shared deep link (e.g. `/service/painting`) shows the **home** card, not the page's.
> Google *does* render JS and will see per-page tags. To fix social previews for deep
> links you need prerendering (see below).

Test cards:
- Facebook: <https://developers.facebook.com/tools/debug/>
- LinkedIn: <https://www.linkedin.com/post-inspector/>
- X/Twitter: <https://cards-dev.twitter.com/validator>

---

## 6. Changing the domain

If the live domain is **not** `https://www.prolper.com`, update it in:

1. `src/components/Seo/Seo.jsx` → `const SITE = "..."`
2. `index.html` → `og:url`, `og:image`, `twitter:image`, and all JSON-LD `url`/`@id`
3. `public/sitemap.xml` → every `<loc>`
4. `public/robots.txt` → `Sitemap:` line

Then rebuild (`npm run build`).

---

## 7. Pre-rendering (SSG) — IMPLEMENTED ✅

Each marketing route is snapshotted to **static HTML** at build time, so Google, Bing
**and** no-JS social scrapers get the fully-rendered page (content + per-page
title/description/canonical/JSON-LD) instead of an empty SPA shell.

- Script: `scripts/prerender.mjs` (uses the already-installed Playwright/Chromium).
- Build command: **`npm run build:prod`** = `vite build` + prerender.
  (Plain `npm run build` still works but skips prerendering.)
- Routes prerendered: `/`, `/become-a-provider`, and all 8 `/service/*` pages →
  written as `dist/index.html`, `dist/become-a-provider.html`,
  `dist/service/<id>.html`.
- Firebase Hosting serves these static files directly (`cleanUrls`), and falls back to
  the SPA for anything not prerendered (e.g. legal/privacy, which fetch content from
  Firestore at runtime and are intentionally excluded).
- **Add a route to prerendering:** append its path to the `ROUTES` array in
  `scripts/prerender.mjs` (only for routes whose content doesn't depend on a runtime
  fetch).

> Because the app mounts with `createRoot`, the browser re-renders over the prerendered
> HTML on load (no hydration mismatch risk). Crawlers read the static HTML; users get
> the live app.

### Service-page content (thin-content fix)
`/service/:id` pages now render from **bundled** data (`src/data/services.js`), not a
runtime Firestore read — so they're prerenderable and content-rich: unique intro,
"what's included" list, **per-service FAQ (with FAQ schema)**, breadcrumbs, and internal
links to other services. Edit copy/keywords in `src/data/services.js`.

---

## 8. Post-deploy checklist

0. **Build with `npm run build:prod`** (not `npm run build`) so the static prerendered
   pages are generated, then `firebase deploy --only hosting`.
1. Confirm `robots.txt` / `sitemap.xml` are live.
2. **Google Search Console** — add the property, verify, submit `sitemap.xml`.
3. **Bing Webmaster Tools** — same.
4. Run **Rich Results Test** on `/` and `/become-a-provider` (FAQ).
5. Run **PageSpeed Insights** — confirm mobile score / Core Web Vitals.
6. Debug a shared link in the Facebook/LinkedIn inspectors (re-scrape after deploy).
7. Set up a **Google Business Profile** for local SEO (Mississauga) — big for
   "near me" / local-pack ranking.

---

## 9. Quick reference — key files

```
index.html                         # global meta, geo, JSON-LD, OG/Twitter
public/robots.txt                  # crawler rules + sitemap pointer
public/sitemap.xml                 # all indexable URLs
public/site.webmanifest            # PWA manifest
src/main.jsx                       # <HelmetProvider> wrapper
src/components/Seo/Seo.jsx         # per-page meta component (SITE domain here)
src/pages/**                       # each page renders <Seo …/>
```
