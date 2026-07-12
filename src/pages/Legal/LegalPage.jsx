import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./LegalPage.css";

const CONFIG = {
  business: {
    docId:    "BusinessLegal_2026",
    badge:    "Service Providers",
    title:    "Pro Helper Terms of Use",
    sub:      "Terms and conditions governing service providers registered on the Prolper Business platform.",
    icon:     "bi-briefcase-fill",
    accent:   "#818cf8",
  },
  customer: {
    docId:    "CustomerLegal_2026",
    badge:    "Customers",
    title:    "Customer Terms of Use",
    sub:      "Terms and conditions for customers using the Prolper app to book local service professionals.",
    icon:     "bi-person-fill",
    accent:   "#0fba81",
  },
};

const LegalPage = () => {
  const { type }   = useParams();           // "business" | "customer"
  const navigate   = useNavigate();
  const cfg        = CONFIG[type] ?? CONFIG.customer;

  const [markdown, setMarkdown]           = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [lastUpdated, setLastUpdated]     = useState("");
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(false);
    setMarkdown("");

    (async () => {
      try {
        const snap = await getDoc(doc(db, "legal", cfg.docId));
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
  }, [cfg.docId]);

  return (
    <div className="lp-root">

      {/* ── Top Bar ── */}
      <header className="lp-topbar">
        <div className="lp-topbar-inner">
          <Link to="/" className="lp-logo">Prolper</Link>
          <div className="lp-topbar-right">
            {/* Toggle between business / customer */}
            <Link
              to={type === "business" ? "/legal/customer" : "/legal/business"}
              className="lp-toggle-btn"
            >
              {type === "business" ? "Customer Terms" : "Business Terms"}
              <i className="bi bi-arrow-right-circle"></i>
            </Link>
            <button className="lp-back-btn" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="lp-hero" style={{ "--lp-accent": cfg.accent }}>
        <div className="lp-hero-inner">
          <div className="lp-hero-icon">
            <i className={`bi ${cfg.icon}`}></i>
          </div>
          <div className="lp-hero-badge">{cfg.badge}</div>
          <h1 className="lp-hero-title">{cfg.title}</h1>
          <p className="lp-hero-sub">{cfg.sub}</p>
          {(effectiveDate || lastUpdated) && (
            <div className="lp-hero-dates">
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
      <main className="lp-content">
        <div className="lp-content-inner">
          {loading ? (
            <div className="lp-loading">
              <div className="lp-spinner" style={{ borderTopColor: cfg.accent }}></div>
              <span>Loading terms…</span>
            </div>
          ) : error ? (
            <div className="lp-error">
              <i className="bi bi-exclamation-circle"></i>
              <p>Unable to load the legal terms. Please try again later.</p>
              <button onClick={() => window.location.reload()} className="lp-retry-btn">
                Try again
              </button>
            </div>
          ) : (
            <article className="lp-article">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="lp-h1">{children}</h1>,
                  h2: ({ children }) => (
                    <h2 className="lp-h2">
                      <span className="lp-h2-accent" style={{ background: `linear-gradient(180deg, ${cfg.accent}, #818cf8)` }}></span>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => <h3 className="lp-h3">{children}</h3>,
                  p:  ({ children }) => <p  className="lp-p">{children}</p>,
                  ul: ({ children }) => <ul className="lp-ul">{children}</ul>,
                  ol: ({ children }) => <ol className="lp-ol">{children}</ol>,
                  li: ({ children }) => (
                    <li className="lp-li">
                      <span className="lp-li-dot" style={{ background: cfg.accent }}></span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => <strong className="lp-strong">{children}</strong>,
                  hr: () => <div className="lp-divider"></div>,
                  a: ({ href, children }) => (
                    <a href={href} className="lp-link" target="_blank" rel="noreferrer">{children}</a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="lp-blockquote">{children}</blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="lp-table-wrap">
                      <table className="lp-table">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="lp-thead">{children}</thead>,
                  tbody: ({ children }) => <tbody className="lp-tbody">{children}</tbody>,
                  tr:    ({ children }) => <tr    className="lp-tr">{children}</tr>,
                  th:    ({ children }) => <th    className="lp-th">{children}</th>,
                  td:    ({ children }) => <td    className="lp-td">{children}</td>,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <span className="lp-footer-logo">Prolper</span>
              <p className="lp-footer-tagline">
                Intelligent service matching that connects people with local professionals.
              </p>
            </div>
            <div className="lp-footer-links-col">
              <h6 className="lp-footer-col-title">Legal</h6>
              <Link to="/legal/business"  className="lp-footer-link">Pro Helper Terms of Use</Link>
              <Link to="/legal/customer"  className="lp-footer-link">Customer Terms of Use</Link>
              <Link to="/privacy-policy"  className="lp-footer-link">Privacy Policy</Link>
            </div>
            <div className="lp-footer-links-col">
              <h6 className="lp-footer-col-title">Company</h6>
              <Link to="/" className="lp-footer-link">Home</Link>
              <a href="mailto:contact@prolper.com" className="lp-footer-link">contact@prolper.com</a>
              <span className="lp-footer-link-text">Mississauga, Ontario, Canada</span>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2026 Prolper Inc. All rights reserved.</span>
            <div className="lp-social-row">
              <a href="https://www.facebook.com/Prolperapp"    target="_blank" rel="noreferrer" className="lp-social-btn"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/prolperapp"  target="_blank" rel="noreferrer" className="lp-social-btn"><i className="bi bi-instagram"></i></a>
              <a href="https://x.com/ProlperApp"              target="_blank" rel="noreferrer" className="lp-social-btn"><i className="bi bi-twitter-x"></i></a>
              <a href="https://www.linkedin.com/company/prolper" target="_blank" rel="noreferrer" className="lp-social-btn"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LegalPage;
