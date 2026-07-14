# Prolper Website — Redesign Changelog

A marketing-site overhaul turning Prolper into an on-demand local-services site
(à la Jiffy / TaskRabbit), serving Mississauga, ON. React 19 + Vite, Bootstrap
Icons, Firebase/Firestore, deployed to Firebase Hosting.

---

## Page flow (final)

**Home:** Hero (services picker) → How it works → Why us (+ reviews) → Get the app → Contact → Footer
**Nav:** How it works · Why us · Contact us · social icons · Get the app
**Other routes:** `/become-a-provider`, `/service/:id`, `/privacy-policy`, `/legal/:type`

---

## 1. Hero section
- Rebuilt as a centered, branded layout (not a TaskRabbit clone): eyebrow → "Find
  Your **Pro Helper**." → subcopy → **"Our services"** picker panel.
- Services shown right away as **real photos, 4 per row (2 rows of 4)** — big,
  visible imagery that scales with viewport height so the whole hero fits one screen.
- Panel header has a teal gradient + animated sheen; tiles pop in staggered.
- Cursor **parallax** on the background blobs/ring/dots.
- Removed: the old search bar, App Store/Google Play buttons, and the trust line.
- Copy: "Tell us what you need, get matched, chat and call, pay and rate, all in one app."
- Files: `src/sections/HeroSection/`, `src/data/siteContent.js`

## 2. How it works
- Copy rewritten (Post your job → get matched → chat/call → pay & rate).
- 3 photo-step cards with numbered badges, connecting progress line, chips.
- Step 2 & 3 use **custom photos**: `public/call.jpg` (handyman on a call) and
  `public/step 3.jpg` (happy customer). Step-2 chip: "Chat or call, agree a price".
- Files: `src/sections/HowItWorksSection/`, `src/data/siteContent.js`

## 3. Why us ("The Prolper Standard")
- Copy: "Why locals choose Prolper for their services." + updated card copy
  (Unbiased Matching, Local First, Privacy Protected, **Real Reviews**).
- **Reviews merged in here** as a single-line auto-scrolling marquee:
  - Hover/focus a pill → **popover with the full review**.
  - **Prev/next arrow buttons** for manual scrolling (JS transform-driven so the
    popover isn't clipped); pauses on hover; reduced-motion safe.
- Compacts so the **whole section centers in view** when "Why us" is clicked.
- Files: `src/sections/StandardSection/`

## 4. Get the app (merged Become sections)
- Combined "Become a customer" + "Become a Pro" into **one** section with a
  **Prolper / Pro switch** that flips the phone screen, app icon, content, QR and
  store links (accent teal ↔ indigo).
- Two phone frames shown **back-to-back**; sizes scale with viewport height and
  the section **fits one screen**; bigger QR.
- "Get the app" nav CTA scrolls here.
- Files: `src/sections/GetAppSection/`

## 5. Become a Provider page (`/become-a-provider`)
- Full visual glow-up: animated hero with **count-up earnings card**, floating
  job/payment notifications, parallax shapes; connected step flow; colored benefit
  cards; **pro-testimonials marquee**; dark final CTA with QR + shine.
- Removed (per feedback): stats strip, hero trust line, plumber testimonial.
- Files: `src/pages/BecomeProvider/`

## 6. Navigation & footer
- **Nav:** removed Services, Reviews, Become-a-customer/Pro links; added the
  **social icon group** (FB/IG/X/LinkedIn); "Get the app" scrolls to Get-the-app.
- **Footer:** 3-column layout — brand + app-store badges, **Explore** nav, newsletter
  + socials. Explore links **navigate home then scroll** (work from any page).
- **Sticky mobile app bar** (`src/components/MobileAppBar/`) — App Store/Play on phones.
- Files: `src/App.jsx`, `src/sections/FooterSection/`

## 7. Copy cleanup
- Removed the word **"trusted"** across the whole portal ("Trusted Reviews" → "Real
  Reviews", etc.).
- Removed **em-dashes** from body copy (AI tell) in favor of natural phrasing.
- Removed **plumbing/plumber** references (not a live category): home review → Handyman,
  provider testimonial → Cleaner.

## 8. Firestore-driven data (no hardcoding)
- App-store URLs from `config/links`, QR images from `qr_links/current_qrs`,
  services from `services/services_manifest` (enabled only).
- Hooks: `src/hooks/useAppLinks.js`, `useQrLinks.js`, `useServiceManifest.js`.
- ⚠️ Needs a public read rule on `services/services_manifest` (see `memory/`).

## 9. Cleanup
- Deleted unused components: `ServicesSection`, `ReviewsSection`, `TrustBarSection`,
  `BecomeSection`, `GetAppModal`; trimmed stale exports from `siteContent.js`.

## 10. SEO (full pass)
- **`index.html`:** rich `<title>`, geo tags (Mississauga), robots directives,
  keywords, apple-touch-icon, manifest link, OG/Twitter cards (1294×646 image),
  and **JSON-LD** (`Organization`, `WebSite`, `MobileApplication`, `Service` +
  `OfferCatalog` of the 8 services).
- **Per-page meta** via `react-helmet-async` → unique title/description/canonical
  for every route (`src/components/Seo/Seo.jsx`, wrapped in `HelmetProvider`).
  Provider page adds `FAQPage`; service pages add `Service` + `BreadcrumbList`.
- **`public/robots.txt`, `sitemap.xml`, `site.webmanifest`.**
- Single `<h1>` per page; image alt text.

### SEO to-dos for you
- Confirm the canonical domain — currently **`https://www.prolper.com`** (hard-coded
  in `Seo.jsx`, `index.html`, `sitemap.xml`, `robots.txt`). Change if different.
- This is a client-rendered SPA: Google sees per-page tags (renders JS), but **no-JS
  social scrapers fall back to the home OG card**. For best results add
  **prerendering/SSG** (e.g. `vite-react-ssg`).
- After deploy, submit `sitemap.xml` in Google Search Console.

---

## Deployment
- Firebase Hosting, project **`prolper-apps`**, `public: "dist"`, SPA rewrites.
- Build: `npm run build` → deploy: `firebase deploy --only hosting`.
- ⚠️ Last deploy blocked by expired credentials — run `firebase login --reauth` first.

## Tech notes
- Global scroll-reveal via `IntersectionObserver` (`.nh-animate` → `.nh-visible`).
- Smart nav scroll (`handleNavigateAndScroll` in `App.jsx`): centers sections that
  fit the viewport, top-aligns taller ones (accounts for navbar height).
- Brand: teal `#14b8a6`, indigo `#6366f1`; `nh-` prefixed global classes.
