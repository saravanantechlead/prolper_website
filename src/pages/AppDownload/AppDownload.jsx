import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./AppDownload.css";

/* ─── Replace with your real App Store / Play Store URLs ─── */
const STORE_URLS = {
  customer: {
    ios:     "https://apps.apple.com/app/prolper/id000000001",
    android: "https://play.google.com/store/apps/details?id=com.prolper.customer",
  },
  business: {
    ios:     "https://apps.apple.com/app/prolper-business/id000000002",
    android: "https://play.google.com/store/apps/details?id=com.prolper.business",
  },
};

const detectOS = () => {
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua))          return "android";
  return "desktop";
};

/* ══════════════════════════════════════════════════════════ */

const AppDownload = () => {
  const [params]   = useSearchParams();
  const forType    = params.get("for"); // "customer" | "business" | null
  const [os, setOs]                   = useState(null);
  const [countdown, setCountdown]     = useState(3);
  const [redirected, setRedirected]   = useState(false);
  const [qrUrls, setQrUrls]           = useState({ customer: null, business: null });

  /* Fetch QR image URLs from Firestore */
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "qr_links", "current_qrs"));
        if (snap.exists()) {
          const d = snap.data();
          setQrUrls({
            customer: d.customer_qr_url || null,
            business: d.business_qr_url || null,
          });
        }
      } catch {
        /* silently fall back to no image */
      }
    })();
  }, []);

  /* OS detection + auto-redirect on mobile when a specific app is requested */
  useEffect(() => {
    const detected = detectOS();
    setOs(detected);

    if (forType && STORE_URLS[forType] && detected !== "desktop") {
      const url = STORE_URLS[forType][detected];
      let c = 3;
      const id = setInterval(() => {
        c -= 1;
        setCountdown(c);
        if (c === 0) {
          clearInterval(id);
          setRedirected(true);
          window.location.href = url;
        }
      }, 1000);
      return () => clearInterval(id);
    }
  }, [forType]);

  /* ── Redirect screen (mobile + specific app) ── */
  if (forType && STORE_URLS[forType] && os && os !== "desktop") {
    const cfg = forType === "customer"
      ? { label: "Prolper Customer", icon: "bi-person-fill", color: "#0fba81" }
      : { label: "Prolper Business", icon: "bi-briefcase-fill", color: "#818cf8" };

    const storeLabel = os === "ios" ? "App Store" : "Google Play";
    const storeIcon  = os === "ios" ? "bi-apple" : "bi-google-play";
    const storeUrl   = STORE_URLS[forType][os];

    return (
      <div className="ad-redirect">
        <div className="ad-redirect-card">
          <div className="ad-redirect-icon" style={{ color: cfg.color, borderColor: `${cfg.color}30` }}>
            <i className={`bi ${cfg.icon}`}></i>
          </div>
          <h1 className="ad-redirect-title">{cfg.label}</h1>

          {!redirected ? (
            <>
              <p className="ad-redirect-sub">
                Opening the <strong>{storeLabel}</strong> in {countdown}…
              </p>
              <div className="ad-redirect-bar">
                <div
                  className="ad-redirect-fill"
                  style={{ width: `${((3 - countdown) / 3) * 100}%`, background: cfg.color }}
                ></div>
              </div>
            </>
          ) : (
            <p className="ad-redirect-sub">Opening store…</p>
          )}

          <a href={storeUrl} className="ad-store-btn" style={{ background: cfg.color }}>
            <i className={`bi ${storeIcon}`}></i>
            Open {storeLabel}
          </a>

          <Link to="/" className="ad-home-link">← Back to prolper.com</Link>
        </div>
      </div>
    );
  }

  /* ── Main landing (no param, or desktop) ── */
  return (
    <div className="ad-root">

      {/* Top bar */}
      <header className="ad-topbar">
        <div className="ad-topbar-inner">
          <Link to="/" className="ad-logo">Prolper</Link>
          <Link to="/" className="ad-back-btn">
            <i className="bi bi-arrow-left"></i>
            Back to site
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="ad-hero">
        <div className="ad-hero-inner">
          <div className="ad-hero-badge">
            <span className="ad-hero-dot"></span>
            Now Live · iOS &amp; Android
          </div>
          <h1 className="ad-hero-title">Get Prolper</h1>
          <p className="ad-hero-sub">
            Download the app that matches you with trusted local service
            professionals in minutes.
          </p>
        </div>
      </div>

      {/* App cards */}
      <main className="ad-cards-section">
        <div className="ad-cards">

          {/* Customer */}
          <div className="ad-card ad-card-customer">
            <div className="ad-card-header">
              <div className="ad-card-icon ad-icon-teal">
                <i className="bi bi-person-fill"></i>
              </div>
              <div>
                <div className="ad-card-badge">For Customers</div>
                <h2 className="ad-card-title">Prolper</h2>
              </div>
            </div>
            <p className="ad-card-desc">
              Book trusted local professionals for handyman, cleaning, painting,
              pet care and more — all in one tap.
            </p>

            {qrUrls.customer && (
              <div className="ad-qr-wrap">
                <img src={qrUrls.customer} alt="Customer App QR" className="ad-qr-img" />
                <p className="ad-qr-caption">Scan to download</p>
              </div>
            )}

            <div className="ad-store-btns">
              <a href={STORE_URLS.customer.ios}     className="ad-store-btn-sm" target="_blank" rel="noreferrer">
                <i className="bi bi-apple"></i>
                <span><small>Download on the</small>App Store</span>
              </a>
              <a href={STORE_URLS.customer.android} className="ad-store-btn-sm" target="_blank" rel="noreferrer">
                <i className="bi bi-google-play"></i>
                <span><small>GET IT ON</small>Google Play</span>
              </a>
            </div>
          </div>

          {/* Business */}
          <div className="ad-card ad-card-business">
            <div className="ad-card-header">
              <div className="ad-card-icon ad-icon-indigo">
                <i className="bi bi-briefcase-fill"></i>
              </div>
              <div>
                <div className="ad-card-badge ad-badge-indigo">For Service Providers</div>
                <h2 className="ad-card-title">Prolper Business</h2>
              </div>
            </div>
            <p className="ad-card-desc">
              Grow your service business. Receive job requests, manage your
              schedule, and get paid — all on Prolper.
            </p>

            {qrUrls.business && (
              <div className="ad-qr-wrap">
                <img src={qrUrls.business} alt="Business App QR" className="ad-qr-img" />
                <p className="ad-qr-caption">Scan to download</p>
              </div>
            )}

            <div className="ad-store-btns">
              <a href={STORE_URLS.business.ios}     className="ad-store-btn-sm ad-store-btn-indigo" target="_blank" rel="noreferrer">
                <i className="bi bi-apple"></i>
                <span><small>Download on the</small>App Store</span>
              </a>
              <a href={STORE_URLS.business.android} className="ad-store-btn-sm ad-store-btn-indigo" target="_blank" rel="noreferrer">
                <i className="bi bi-google-play"></i>
                <span><small>GET IT ON</small>Google Play</span>
              </a>
            </div>
          </div>

        </div>

        <p className="ad-hint">
          <i className="bi bi-phone"></i>
          On a mobile device? Tap a button above to go directly to your store.
        </p>
      </main>

      {/* Footer */}
      <footer className="ad-footer">
        <div className="ad-footer-inner">
          <span className="ad-footer-copy">© 2026 Prolper Inc.</span>
          <div className="ad-footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/legal/customer">Customer Legal</Link>
            <Link to="/legal/business">Business Legal</Link>
          </div>
          <div className="ad-social-row">
            <a href="https://www.facebook.com/Prolperapp"    target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/prolperapp"  target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-instagram"></i></a>
            <a href="https://x.com/ProlperApp"              target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-twitter-x"></i></a>
            <a href="https://www.linkedin.com/company/prolper" target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AppDownload;
