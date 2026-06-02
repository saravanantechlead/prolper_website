import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Privacy.css";

const Privacy = () => {
  const navigate = useNavigate();
  const [markdown, setMarkdown]           = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [lastUpdated, setLastUpdated]     = useState("");
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const snap = await getDoc(doc(db, "legal", "PrivacyPolicy_2026"));
        if (snap.exists()) {
          const d = snap.data();
          setMarkdown(d.legal_markdown || "");
          const fmt = (ts) =>
            ts?.toDate
              ? ts.toDate().toLocaleDateString("en-CA", {
                  year: "numeric", month: "long", day: "numeric",
                })
              : "";
          setEffectiveDate(fmt(d.effective_date));
          setLastUpdated(fmt(d.last_updated));
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pp-root">

      {/* ── Top Bar ── */}
      <header className="pp-topbar">
        <div className="pp-topbar-inner">
          <Link to="/" className="pp-logo">Prolper</Link>
          <button className="pp-back-btn" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
            Back
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-hero-icon">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <div className="pp-hero-badge">Privacy &amp; Trust</div>
          <h1 className="pp-hero-title">Privacy Policy</h1>
          <p className="pp-hero-sub">
            We are committed to protecting your personal data and being transparent
            about how we use it.
          </p>
          {(effectiveDate || lastUpdated) && (
            <div className="pp-hero-dates">
              {effectiveDate && (
                <span><i className="bi bi-calendar3"></i> Effective {effectiveDate}</span>
              )}
              {lastUpdated && (
                <span><i className="bi bi-arrow-clockwise"></i> Updated {lastUpdated}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <main className="pp-content">
        <div className="pp-content-inner">
          {loading ? (
            <div className="pp-loading">
              <div className="pp-spinner"></div>
              <span>Loading policy…</span>
            </div>
          ) : error ? (
            <div className="pp-error">
              <i className="bi bi-exclamation-circle"></i>
              <p>Unable to load the privacy policy. Please try again later.</p>
              <button onClick={() => window.location.reload()} className="pp-retry-btn">
                Try again
              </button>
            </div>
          ) : (
            <article className="pp-article">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="pp-h1">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="pp-h2">
                      <span className="pp-h2-accent"></span>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => <h3 className="pp-h3">{children}</h3>,
                  p:  ({ children }) => <p  className="pp-p">{children}</p>,
                  ul: ({ children }) => <ul className="pp-ul">{children}</ul>,
                  ol: ({ children }) => <ol className="pp-ol">{children}</ol>,
                  li: ({ children }) => (
                    <li className="pp-li">
                      <span className="pp-li-dot"></span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="pp-strong">{children}</strong>
                  ),
                  hr: () => <div className="pp-divider"></div>,
                  a: ({ href, children }) => (
                    <a href={href} className="pp-link" target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="pp-blockquote">{children}</blockquote>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="pp-footer">
        <div className="pp-footer-inner">

          <div className="pp-footer-top">
            <div className="pp-footer-brand">
              <span className="pp-footer-logo">Prolper</span>
              <p className="pp-footer-tagline">
                Intelligent service matching — connecting people with trusted local professionals.
              </p>
            </div>

            <div className="pp-footer-links-col">
              <h6 className="pp-footer-col-title">Legal</h6>
              <Link to="/privacy-policy" className="pp-footer-link">Privacy Policy</Link>
              <Link to="/legal"          className="pp-footer-link">Terms &amp; Conditions</Link>
            </div>

            <div className="pp-footer-links-col">
              <h6 className="pp-footer-col-title">Company</h6>
              <Link to="/"                className="pp-footer-link">Home</Link>
              <a href="mailto:contact@prolper.com" className="pp-footer-link">contact@prolper.com</a>
              <span className="pp-footer-link-text">Mississauga, Ontario, Canada</span>
            </div>
          </div>

          <div className="pp-footer-bottom">
            <span className="pp-footer-copy">© 2026 Prolper Inc. All rights reserved.</span>

            <div className="pp-social-row">
              <a href="https://www.facebook.com/Prolperapp"   target="_blank" rel="noreferrer" className="pp-social-btn" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/prolperapp"  target="_blank" rel="noreferrer" className="pp-social-btn" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://x.com/ProlperApp"              target="_blank" rel="noreferrer" className="pp-social-btn" aria-label="X">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.linkedin.com/company/prolper" target="_blank" rel="noreferrer" className="pp-social-btn" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Privacy;
