import React, { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import customerAppImg from "../../assets/iphone customer app.png";
import useServiceManifest, { biIcon, CATEGORY_ACCENTS } from "../../hooks/useServiceManifest";
import useAppLinks from "../../hooks/useAppLinks";
import FooterSection from "../../sections/FooterSection/FooterSection";
import "./ServiceLanding.css";

const ServiceLanding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, categories, loading } = useServiceManifest();
  const appLinks = useAppLinks();

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // Resolve the service: prefer the enabled services map, fall back to the
  // curated category list (covers categories that aren't a 1:1 service id).
  const svc = useMemo(() => {
    const fromServices = services.find((s) => s.id === id);
    if (fromServices) return fromServices;
    const cat = categories.find((c) => c.serviceId === id);
    if (cat) {
      return {
        id: cat.serviceId,
        title: cat.name,
        category: cat.name,
        description: cat.description || "",
        iconName: cat.iconName || "",
        tags: [],
      };
    }
    return null;
  }, [id, services, categories]);

  // A few related services from the same category to cross-link.
  const related = useMemo(() => {
    if (!svc) return [];
    return services
      .filter((s) => s.id !== svc.id && s.category === svc.category)
      .slice(0, 4);
  }, [svc, services]);

  const accent = useMemo(() => {
    const idx = Math.max(0, categories.findIndex((c) => c.serviceId === id));
    return CATEGORY_ACCENTS[idx % CATEGORY_ACCENTS.length] || "#14b8a6";
  }, [id, categories]);

  if (loading) {
    return (
      <div className="nh-page sl-page">
        <div className="sl-loading"><div className="sl-spinner" /></div>
      </div>
    );
  }

  if (!svc) {
    return (
      <div className="nh-page sl-page">
        <div className="sl-notfound">
          <i className="bi bi-search"></i>
          <h1>Service not found</h1>
          <p>We couldn't find that service. Browse everything Prolper offers instead.</p>
          <Link to="/#categories" className="sl-btn sl-btn-primary" onClick={() => navigate("/")}>
            Browse services
          </Link>
        </div>
      </div>
    );
  }

  const STEPS = [
    { icon: "bi-download",      title: "Download Prolper",   desc: "Get the free app from the App Store or Google Play." },
    { icon: "bi-search",        title: `Search "${svc.title}"`, desc: "Pick this service and set your location, date, and time." },
    { icon: "bi-chat-dots-fill",title: "Connect with a pro", desc: "Chat or call, receive an estimate, and pay to confirm." },
    { icon: "bi-star-fill",     title: "Get it done & rate", desc: "Your pro completes the job, then you leave a review." },
  ];

  return (
    <div className="nh-page sl-page" style={{ "--sl-accent": accent }}>

      {/* HERO */}
      <section className="sl-hero">
        <div className="sl-hero-inner">
          <div className="sl-hero-left">
            <nav className="sl-crumbs">
              <Link to="/">Home</Link>
              <i className="bi bi-chevron-right"></i>
              <Link to="/#categories" onClick={() => navigate("/")}>Services</Link>
              <i className="bi bi-chevron-right"></i>
              <span>{svc.title}</span>
            </nav>

            <span className="sl-badge">
              <i className={`bi ${biIcon(svc.iconName)}`}></i>
              {svc.category || "Service"}
            </span>
            <h1 className="sl-title">{svc.title}</h1>
            <p className="sl-desc">{svc.description}</p>

            {svc.tags?.length > 0 && (
              <div className="sl-tags">
                {svc.tags.map((t) => <span key={t} className="sl-tag">{t}</span>)}
              </div>
            )}

            <div className="sl-cta">
              <a href={appLinks.customer_ios} className="sl-store-btn" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-apple"></i>
                <div><small>Download on the</small><strong>App Store</strong></div>
              </a>
              <a href={appLinks.customer_android} className="sl-store-btn" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-google-play"></i>
                <div><small>GET IT ON</small><strong>Google Play</strong></div>
              </a>
            </div>
            <p className="sl-cta-note">
              <i className="bi bi-patch-check-fill"></i>
              Book <strong>{svc.title}</strong> in minutes with trusted local pros and secure in-app payment.
            </p>
          </div>

          <div className="sl-hero-right">
            <div className="sl-phone-glow" />
            <div className="sl-icon-float">
              <i className={`bi ${biIcon(svc.iconName)}`}></i>
            </div>
            <div className="sl-phone">
              <div className="sl-phone-island" />
              <img src={customerAppImg} alt={`Book ${svc.title} on Prolper`} />
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO BOOK */}
      <section className="sl-steps">
        <div className="nh-section-inner">
          <div className="sl-head">
            <span className="sl-head-eyebrow">Getting started</span>
            <h2 className="sl-head-title">How to book {svc.title}</h2>
          </div>
          <div className="sl-steps-grid">
            {STEPS.map((s, i) => (
              <div className="sl-step" key={s.title}>
                <span className="sl-step-num">{i + 1}</span>
                <span className="sl-step-icon"><i className={`bi ${s.icon}`}></i></span>
                <h3 className="sl-step-title">{s.title}</h3>
                <p className="sl-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="sl-related">
          <div className="nh-section-inner">
            <div className="sl-head">
              <span className="sl-head-eyebrow">More in {svc.category}</span>
              <h2 className="sl-head-title">Related services</h2>
            </div>
            <div className="sl-related-grid">
              {related.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="sl-related-card"
                  onClick={() => navigate(`/service/${r.id}`)}
                >
                  <span className="sl-related-icon"><i className={`bi ${biIcon(r.iconName)}`}></i></span>
                  <span className="sl-related-name">{r.title}</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="sl-final" id="download-section">
        <div className="nh-section-inner">
          <div className="sl-final-card">
            <h2 className="sl-final-title">Ready to book {svc.title}?</h2>
            <p className="sl-final-sub">Download Prolper and get matched with a trusted local pro today.</p>
            <div className="sl-cta">
              <a href={appLinks.customer_ios} className="sl-store-btn sl-store-light" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-apple"></i>
                <div><small>Download on the</small><strong>App Store</strong></div>
              </a>
              <a href={appLinks.customer_android} className="sl-store-btn sl-store-light" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-google-play"></i>
                <div><small>GET IT ON</small><strong>Google Play</strong></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ServiceLanding;
