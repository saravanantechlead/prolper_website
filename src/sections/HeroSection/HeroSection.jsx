import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAppLinks from "../../hooks/useAppLinks";
import { SERVICES } from "../../data/siteContent";
import "./HeroSection.css";

const HeroSection = () => {
  const appLinks = useAppLinks();
  const navigate = useNavigate();
  const goToService = (id) => navigate(`/service/${id}`);
  const heroRef = useRef(null);
  const raf = useRef(0);

  const handleParallax = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    });
  };

  return (
    <section className="nh-hero" id="top" ref={heroRef} onMouseMove={handleParallax}>
      {/* Playful background shapes */}
      <span className="nh-hero-blob nh-hero-blob-1" aria-hidden="true"></span>
      <span className="nh-hero-blob nh-hero-blob-2" aria-hidden="true"></span>
      <span className="nh-hero-blob nh-hero-blob-3" aria-hidden="true"></span>
      <span className="nh-hero-ring" aria-hidden="true"></span>
      <span className="nh-hero-stripes" aria-hidden="true"></span>
      <span className="nh-hero-dots" aria-hidden="true"></span>

      <div className="nh-hero-inner">
        <span className="nh-hero-eyebrow">
          <i className="bi bi-geo-alt-fill"></i>
          Now serving Mississauga, ON · more areas soon
        </span>

        <h1 className="nh-hero-title">
          Find Your <span className="nh-teal">Pro&nbsp;Helper.</span>
        </h1>

        <p className="nh-hero-sub">
          Tell us the task and we'll match you with a rated local pro in minutes.
          Chat or call your pro, pay and rate, all in one app.
        </p>

        {/* Branded service picker panel — services right from the get-go */}
        <div className="nh-hero-panel" id="services">
          <div className="nh-hero-panel-head">
            <i className="bi bi-ui-checks-grid"></i>
            What do you need done?
          </div>

          <div className="nh-hero-services">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                className="nh-hero-svc"
                style={{ "--svc-accent": s.accent, "--i": i }}
                onClick={() => goToService(s.id)}
                aria-label={`Book ${s.name}`}
              >
                <span className="nh-hero-svc-img">
                  <img src={s.img} alt={s.name} loading="lazy" />
                  <span className="nh-hero-svc-label">{s.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* App stores + trust */}
        <div className="nh-hero-stores">
          <a href={appLinks.customer_ios} className="nh-store-mini" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-apple"></i> App Store
          </a>
          <a href={appLinks.customer_android} className="nh-store-mini" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-google-play"></i> Google Play
          </a>
        </div>

        <div className="nh-hero-trust">
          <span><i className="bi bi-star-fill"></i> 4.8 average rating</span>
          <span className="nh-dot">·</span>
          <span>Local pros</span>
          <span className="nh-dot">·</span>
          <span>Secure in-app payments</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
