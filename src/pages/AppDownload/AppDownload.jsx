import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDocFromServer } from "firebase/firestore";
import "./AppDownload.css";

const detectOS = () => {
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua))          return "android";
  return "desktop";
};

/* ══════════════════════════════════════════════════════════ */

const AppDownload = ({ appType = "customer" }) => {
  const os = detectOS();
  const [qrUrls, setQrUrls]       = useState({ customer: null, business: null });
  const [qrLoading, setQrLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [linksSnap, qrSnap] = await Promise.all([
          getDocFromServer(doc(db, "config", "links")),
          getDocFromServer(doc(db, "qr_links", "current_qrs")),
        ]);

        /* Redirect mobile immediately when URL is ready */
        if (os !== "desktop" && linksSnap.exists()) {
          const d   = linksSnap.data();
          const url = os === "ios" ? d[`${appType}_ios`] : d[`${appType}_android`];
          if (url) { window.location.href = url; return; }
        }

        if (qrSnap.exists()) {
          const d = qrSnap.data();
          setQrUrls({ customer: d.customer_qr_url || null, business: d.business_qr_url || null });
        }
      } catch (err) {
        console.error("AppDownload fetch error:", err);
      } finally {
        setQrLoading(false);
      }
    })();
  }, []); // eslint-disable-line

  /* ── Mobile redirect screen — shown instantly while Firestore fetch runs ── */
  if (os !== "desktop") {
    const cfg        = appType === "customer"
      ? { label: "Prolper",     icon: "bi-person-fill",    color: "#14b8a6" }
      : { label: "Prolper Pro", icon: "bi-briefcase-fill", color: "#818cf8" };
    const storeLabel = os === "ios" ? "App Store" : "Google Play";
    const storeIcon  = os === "ios" ? "bi-apple"  : "bi-google-play";

    return (
      <div className="ad-redirect">
        <div className="ad-redirect-card">
          <div className="ad-redirect-icon" style={{ color: cfg.color, borderColor: `${cfg.color}30` }}>
            <i className={`bi ${cfg.icon}`}></i>
          </div>
          <h1 className="ad-redirect-title">{cfg.label}</h1>
          <p className="ad-redirect-sub">Opening the <strong>{storeLabel}</strong>…</p>
          <div className="ad-redirect-bar">
            <div className="ad-redirect-fill ad-redirect-fill-anim" style={{ background: cfg.color }}></div>
          </div>
          <Link to="/" className="ad-home-link">← Back to prolper.com</Link>
        </div>
      </div>
    );
  }

  /* ── Desktop landing page ── */
  const customerIos     = links?.customer_ios     || "#";
  const customerAndroid = links?.customer_android  || "#";
  const businessIos     = links?.business_ios     || "#";
  const businessAndroid = links?.business_android  || "#";

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
          <h1 className="ad-hero-title">Get Prolper</h1>
          <p className="ad-hero-sub">
            Download the app that matches you with local service
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
              Book local professionals for handyman, cleaning, painting,
              pet care and more, all in one tap.
            </p>
            {qrLoading ? (
              <div className="ad-qr-wrap"><div className="ad-qr-spinner ad-qr-spinner-teal" /></div>
            ) : qrUrls.customer ? (
              <div className="ad-qr-wrap">
                <img src={qrUrls.customer} alt="Customer App QR" className="ad-qr-img" />
                <p className="ad-qr-caption">Scan to download</p>
              </div>
            ) : null}
            <div className="ad-store-btns">
              <a href={customerIos}     className="ad-store-btn-sm" target="_blank" rel="noreferrer">
                <i className="bi bi-apple"></i>
                <span><small>Download on the</small>App Store</span>
              </a>
              <a href={customerAndroid} className="ad-store-btn-sm" target="_blank" rel="noreferrer">
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
                <div className="ad-card-badge ad-badge-indigo">For Service Pros</div>
                <h2 className="ad-card-title">Prolper Pro</h2>
              </div>
            </div>
            <p className="ad-card-desc">
              Grow your service business. Receive job requests, manage your
              schedule, and get paid, all on Prolper.
            </p>
            {qrLoading ? (
              <div className="ad-qr-wrap"><div className="ad-qr-spinner ad-qr-spinner-indigo" /></div>
            ) : qrUrls.business ? (
              <div className="ad-qr-wrap">
                <img src={qrUrls.business} alt="Business App QR" className="ad-qr-img" />
                <p className="ad-qr-caption">Scan to download</p>
              </div>
            ) : null}
            <div className="ad-store-btns">
              <a href={businessIos}     className="ad-store-btn-sm ad-store-btn-indigo" target="_blank" rel="noreferrer">
                <i className="bi bi-apple"></i>
                <span><small>Download on the</small>App Store</span>
              </a>
              <a href={businessAndroid} className="ad-store-btn-sm ad-store-btn-indigo" target="_blank" rel="noreferrer">
                <i className="bi bi-google-play"></i>
                <span><small>GET IT ON</small>Google Play</span>
              </a>
            </div>
          </div>

        </div>

        <p className="ad-hint">
          <i className="bi bi-phone"></i>
          On a mobile device? Visit <strong>prolper.com/app</strong> to go directly to your store.
        </p>
      </main>

      {/* Footer */}
      <footer className="ad-footer">
        <div className="ad-footer-inner">
          <span className="ad-footer-copy">© 2026 Prolper Inc.</span>
          <div className="ad-footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/legal/customer">Customer Terms of Use</Link>
            <Link to="/legal/business">Pro Helper Terms of Use</Link>
          </div>
          <div className="ad-social-row">
            <a href="https://www.facebook.com/Prolperapp"       target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/prolperapp"      target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-instagram"></i></a>
            <a href="https://x.com/ProlperApp"                  target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-twitter-x"></i></a>
            <a href="https://www.linkedin.com/company/prolper"  target="_blank" rel="noreferrer" className="ad-social-btn"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AppDownload;
