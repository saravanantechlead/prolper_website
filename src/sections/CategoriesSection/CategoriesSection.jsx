import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useServiceManifest, { biIcon, CATEGORY_ACCENTS } from "../../hooks/useServiceManifest";
import "./CategoriesSection.css";

const CategoriesSection = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useServiceManifest();
  const gridRef = useRef(null);

  // Show every curated category from the manifest (including ones flagged
  // selectable:false, e.g. Pet Care) — each links to its guide page.
  const items = categories;

  // Cards render after the manifest resolves (async), so the page-level
  // scroll-reveal observer has already run and misses them. Run a local one
  // once the cards exist so they animate in (or appear if already in view).
  useEffect(() => {
    if (loading || !gridRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("nh-visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    gridRef.current.querySelectorAll(".nh-animate").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loading, items.length]);

  return (
    <section className="nh-cats" id="categories">
      <div className="nh-section-inner">

        <div className="nh-cats-header nh-animate">
          <span className="nh-cats-eyebrow">Browse services</span>
          <h2 className="nh-cats-title">What can we help you with?</h2>
          <p className="nh-cats-lead">
            Pick a category and get matched with a vetted local pro in minutes.
          </p>
        </div>

        <div className="nh-cats-grid" ref={gridRef}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="nh-cat-card nh-cat-skeleton" aria-hidden="true">
                  <span className="nh-cat-icon" />
                  <span className="nh-cat-label" />
                  <span className="nh-cat-desc" />
                </div>
              ))
            : items.map((cat, i) => (
                <button
                  key={cat.serviceId || cat.name}
                  type="button"
                  onClick={() => navigate(`/service/${cat.serviceId}`)}
                  className={`nh-cat-card nh-animate nh-d${(i % 6) + 1}`}
                  style={{ "--cat-accent": CATEGORY_ACCENTS[i % CATEGORY_ACCENTS.length] }}
                  aria-label={`${cat.name} — ${cat.description || ""}`}
                >
                  <span className="nh-cat-icon">
                    <i className={`bi ${biIcon(cat.iconName)}`}></i>
                  </span>
                  <span className="nh-cat-label">{cat.name}</span>
                  {cat.description && <span className="nh-cat-desc">{cat.description}</span>}
                  <i className="bi bi-arrow-right nh-cat-arrow"></i>
                </button>
              ))}
        </div>

        {!loading && items.length === 0 && (
          <div className="nh-cats-empty">
            <i className="bi bi-wifi-off"></i>
            <p>{error ? "Services are temporarily unavailable. Please try again shortly." : "No services available right now."}</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default CategoriesSection;
