import React, { useState, useEffect, useRef } from "react";
import "./StandardSection.css";

const STAT_VISIBLE = 3, STAT_TOTAL = 4, STAT_GAP = 20, STAT_MAX = 1;

const StandardSection = () => {
  const [statIndex, setStatIndex] = useState(0);
  const [cardPx, setCardPx] = useState(0);
  const statsCarouselRef = useRef(null);

  useEffect(() => {
    const el = statsCarouselRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.offsetWidth;
      setCardPx((w - STAT_GAP * (STAT_VISIBLE - 1)) / STAT_VISIBLE);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const statGoLeft  = () => setStatIndex(i => Math.max(0, i - 1));
  const statGoRight = () => setStatIndex(i => Math.min(STAT_MAX, i + 1));
  const statTranslate = statIndex * (cardPx + STAT_GAP);
  const statThumbW    = (STAT_VISIBLE / STAT_TOTAL) * 100;
  const statThumbLeft = (statIndex / STAT_MAX) * (100 - statThumbW);

  return (
    <section className="nh-standard" id="about-us">
      <div className="nh-section-inner">
        <h2 className="nh-standard-title nh-animate">The Prolper Standard</h2>
        <p className="nh-standard-sub nh-animate nh-d1">Quality isn't an option—it's our foundation.</p>
        {/* Scrollable carousel */}
        <div className="nh-stats-carousel nh-animate nh-d2" ref={statsCarouselRef}>
          <div
            className="nh-stats-track"
            style={{ transform: `translateX(-${statTranslate}px)` }}
          >

            <div className="nh-stat-card" style={{ width: cardPx || undefined }}>
              <div className="nh-stat-top">
                <div className="nh-stat-icon-badge" style={{ background: "rgba(15,186,129,0.1)", color: "#0fba81" }}>
                  <i className="bi bi-stars"></i>
                </div>
                <span className="nh-stat-num" style={{ color: "#0fba81" }}>99%</span>
              </div>
              <h4 className="nh-stat-label">Unbiased AI</h4>
              <p className="nh-stat-desc">Our algorithms match you based solely on performance data.</p>
            </div>

            <div className="nh-stat-card" style={{ width: cardPx || undefined }}>
              <div className="nh-stat-top">
                <div className="nh-stat-icon-badge" style={{ background: "rgba(15,186,129,0.1)", color: "#0fba81" }}>
                  <i className="bi bi-shield-check"></i>
                </div>
                <span className="nh-stat-num" style={{ color: "#0fba81" }}>24/7</span>
              </div>
              <h4 className="nh-stat-label">Rigorous Vetting</h4>
              <p className="nh-stat-desc">Providers who fail standards are immediately delisted.</p>
            </div>

            <div className="nh-stat-card" style={{ width: cardPx || undefined }}>
              <div className="nh-stat-top">
                <div className="nh-stat-icon-badge" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
                  <i className="bi bi-lock"></i>
                </div>
                <span className="nh-stat-num" style={{ color: "#7c3aed" }}>100%</span>
              </div>
              <h4 className="nh-stat-label">Shielded Privacy</h4>
              <p className="nh-stat-desc">Your personal contact details are never shared with providers.</p>
            </div>

            <div className="nh-stat-card" style={{ width: cardPx || undefined }}>
              <div className="nh-stat-top">
                <div className="nh-stat-icon-badge" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                  <i className="bi bi-people"></i>
                </div>
                <span className="nh-stat-num" style={{ color: "#f59e0b" }}>5K+</span>
              </div>
              <h4 className="nh-stat-label">Verified Feedback</h4>
              <p className="nh-stat-desc">A marketplace built on genuine trust and community.</p>
            </div>

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
              disabled={statIndex === STAT_MAX}
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
