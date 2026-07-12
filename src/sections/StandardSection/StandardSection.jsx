import React, { useState, useEffect, useRef } from "react";
import { REVIEWS } from "../../data/siteContent";
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
      const vis = w < 900 ? 1 : w < 1024 ? 2 : 3;
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

  /* ── Reviews marquee: JS-driven transform (keeps overflow visible for the
     hover popover) with auto-scroll + manual prev/next buttons ── */
  const rvTrackRef  = useRef(null);
  const rvPausedRef = useRef(false);
  const rvOffsetRef = useRef(0);
  const rvTargetRef = useRef(null);

  useEffect(() => {
    const track = rvTrackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const AUTO = reduce ? 0 : 0.4;
    let half = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => { half = track.scrollWidth / 2; });
    ro.observe(track);
    let raf;
    const frame = () => {
      let o = rvOffsetRef.current;
      if (rvTargetRef.current !== null) {
        o += (rvTargetRef.current - o) * 0.14;
        if (Math.abs(rvTargetRef.current - o) < 0.5) { o = rvTargetRef.current; rvTargetRef.current = null; }
      } else if (!rvPausedRef.current) {
        o -= AUTO;
      }
      if (half > 0) {
        if (o <= -half) { o += half; if (rvTargetRef.current !== null) rvTargetRef.current += half; }
        if (o > 0)      { o -= half; if (rvTargetRef.current !== null) rvTargetRef.current -= half; }
      }
      rvOffsetRef.current = o;
      track.style.transform = `translateX(${o}px)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const rvScroll = (dir) => {
    const vw = rvTrackRef.current?.parentElement?.clientWidth || 600;
    const step = Math.max(260, vw * 0.5);
    const base = rvTargetRef.current !== null ? rvTargetRef.current : rvOffsetRef.current;
    rvTargetRef.current = base + (dir === "prev" ? step : -step);
  };

  return (
    <section className="nh-standard" id="why-us">
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

      {/* Single-line customer reviews marquee (full-width so the hover
          popover can escape the strip; the section clips horizontally) */}
      <div className="nh-std-reviews" id="reviews">
        <p className="nh-std-reviews-label">
          <i className="bi bi-star-fill nh-std-reviews-star"></i>
          <strong>4.8</strong> average · Loved by locals in Mississauga
        </p>
        <div
          className="nh-std-reviews-viewport"
          onMouseEnter={() => { rvPausedRef.current = true; }}
          onMouseLeave={() => { rvPausedRef.current = false; }}
        >
          <button
            className="nh-std-rv-btn nh-std-rv-prev"
            onClick={() => rvScroll("prev")}
            aria-label="Previous reviews"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="nh-std-rv-btn nh-std-rv-next"
            onClick={() => rvScroll("next")}
            aria-label="Next reviews"
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          <div className="nh-std-reviews-track" ref={rvTrackRef}>
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div className="nh-std-review" key={i} tabIndex={0}>
                <img className="nh-std-review-av" src={r.img} alt={r.name} loading="lazy" />
                <span className="nh-std-review-stars" aria-label={`${r.rating} out of 5`}>
                  {"★".repeat(r.rating)}
                </span>
                <span className="nh-std-review-text">"{r.text}"</span>
                <span className="nh-std-review-name">— {r.name}, {r.service}</span>

                {/* Full review on hover / focus */}
                <div className="nh-std-review-pop" role="tooltip">
                  <div className="nh-std-review-pop-head">
                    <img src={r.img} alt="" loading="lazy" />
                    <div>
                      <strong>{r.name}</strong>
                      <span>{r.service} · {r.location}</span>
                    </div>
                  </div>
                  <span className="nh-std-review-pop-stars" aria-label={`${r.rating} out of 5`}>
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </span>
                  <p>"{r.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardSection;
