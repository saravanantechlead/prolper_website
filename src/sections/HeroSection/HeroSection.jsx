import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../data/siteContent";
import "./HeroSection.css";

const HeroSection = () => {
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
          Tell us what you need and get matched with a trusted local pro —
          book online in minutes, no app required to start.
        </p>

        <div className="nh-hero-cta">
          <button className="nh-hero-book-btn" onClick={() => navigate("/book")}>
            <i className="bi bi-calendar-check"></i>
            <span>Book a service</span>
            <i className="bi bi-arrow-right nh-hero-book-arrow"></i>
          </button>
          <a href="/#services" className="nh-hero-book-ghost">
            <i className="bi bi-grid-3x3-gap-fill"></i> Browse services
          </a>
        </div>
        <p className="nh-hero-trust">
          <span><i className="bi bi-shield-check"></i> Verified local pros</span>
          <span><i className="bi bi-lightning-charge-fill"></i> Free to request</span>
          <span><i className="bi bi-phone"></i> No app needed to start</span>
        </p>

        {/* Branded service picker panel — services right from the get-go */}
        <div className="nh-hero-panel" id="services">
          <div className="nh-hero-panel-head">
            <i className="bi bi-ui-checks-grid"></i>
            Our services
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
      </div>
    </section>
  );
};

export default HeroSection;
