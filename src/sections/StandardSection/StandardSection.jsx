import React, { useState, useEffect, useRef } from "react";
import "./StandardSection.css";

const STAT_TOTAL = 4, STAT_GAP = 20;

const CARDS = [
  {
    icon: "bi-stars",
    color: "#0fba81",
    colorBg: "rgba(15,186,129,0.1)",
    label: "Unbiased Matching",
    desc: "Matched with the right provider for your needs.",
  },
  {
    icon: "bi-geo-alt-fill",
    color: "#0fba81",
    colorBg: "rgba(15,186,129,0.1)",
    label: "Local First",
    desc: "Connecting you with local professionals.",
  },
  {
    icon: "bi-shield-lock-fill",
    color: "#7c3aed",
    colorBg: "rgba(124,58,237,0.1)",
    label: "Privacy Protected",
    desc: "Your personal information stays private.",
  },
  {
    icon: "bi-star-fill",
    color: "#f59e0b",
    colorBg: "rgba(245,158,11,0.1)",
    label: "Trusted Reviews",
    desc: "Real ratings and reviews from real customers.",
  },
];

const StandardSection = () => {
  const [statIndex, setStatIndex] = useState(0);
  const [cardPx, setCardPx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const statsCarouselRef = useRef(null);

  useEffect(() => {
    const el = statsCarouselRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.offsetWidth;
      const vis = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setVisibleCount(vis);
      setCardPx((w - STAT_GAP * (vis - 1)) / vis);
      setStatIndex(0);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const statMax       = STAT_TOTAL - visibleCount;
  const statGoLeft    = () => setStatIndex(i => Math.max(0, i - 1));
  const statGoRight   = () => setStatIndex(i => Math.min(statMax, i + 1));
  const statTranslate = statIndex * (cardPx + STAT_GAP);
  const statThumbW    = (visibleCount / STAT_TOTAL) * 100;
  const statThumbLeft = statMax > 0 ? (statIndex / statMax) * (100 - statThumbW) : 0;

  return (
    <section className="nh-standard" id="about-us">
      <div className="nh-section-inner">

        {/* Header */}
        <div className="nh-standard-header nh-animate">
          <span className="nh-standard-eyebrow">Why us</span>
          <h2 className="nh-standard-title">The Prolper Standard</h2>
          <p className="nh-standard-lead">Why thousands choose Prolper for their local services.</p>
        </div>

        {/* Scrollable carousel */}
        <div className="nh-stats-carousel nh-animate nh-d2" ref={statsCarouselRef}>
          <div
            className="nh-stats-track"
            style={{ transform: `translateX(-${statTranslate}px)` }}
          >
            {CARDS.map((card) => (
              <div key={card.label} className="nh-stat-card" style={{ width: cardPx || undefined }}>
                <div className="nh-stat-top">
                  <div
                    className="nh-stat-icon-badge"
                    style={{ background: card.colorBg, color: card.color }}
                  >
                    <i className={`bi ${card.icon}`}></i>
                  </div>
                </div>
                <h4 className="nh-stat-label">{card.label}</h4>
                <p className="nh-stat-desc">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="nh-carousel-nav">
            <button
              className="nh-carousel-btn"
              onClick={statGoLeft}
              disabled={statIndex === 0}
              aria-label="Previous"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="nh-carousel-track-bg">
              <div
                className="nh-carousel-thumb"
                style={{ width: `${statThumbW}%`, left: `${statThumbLeft}%` }}
              ></div>
            </div>
            <button
              className="nh-carousel-btn"
              onClick={statGoRight}
              disabled={statIndex === statMax}
              aria-label="Next"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StandardSection;
