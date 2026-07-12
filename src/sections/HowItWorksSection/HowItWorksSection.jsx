import React from "react";
import { HOW_STEPS } from "../../data/siteContent";
import "./HowItWorksSection.css";

/* A small action chip per step, floated on the photo. */
const CHIPS = [
  { icon: "bi-ui-checks-grid", label: "Pick a service" },
  { icon: "bi-chat-dots-fill", label: "Chat & agree a price" },
  { icon: "bi-star-fill",      label: "Leave a review" },
];

const HowItWorksSection = () => {
  // Mouse-tracking 3D tilt + glare (subtle).
  const handleMove = (e) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    c.style.setProperty("--ry", ((px - 0.5) * 8).toFixed(2) + "deg");
    c.style.setProperty("--rx", ((0.5 - py) * 8).toFixed(2) + "deg");
    c.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
    c.style.setProperty("--my", (py * 100).toFixed(1) + "%");
  };
  const handleLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="nh-how" id="how-it-works">
      <div className="nh-how-inner">
        <div className="nh-how-head nh-animate">
          <span className="nh-how-eyebrow">How it works</span>
          <h2 className="nh-how-title">Get it done in three simple steps</h2>
          <p className="nh-how-lead">
            No phone tag, no chasing quotes. Prolper handles matching, messaging and
            payment, so you can just get the job done.
          </p>
        </div>

        <div className="nh-how-grid nh-animate">
          {HOW_STEPS.map((s, i) => (
            <div
              className={`nh-how-card nh-animate nh-d${i + 1}`}
              key={s.n}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <div className="nh-how-tilt">
                <div className="nh-how-img">
                  <img src={s.img} alt={s.title} loading="lazy" />
                  <span className="nh-how-glare" aria-hidden="true"></span>
                  <span className="nh-how-num">{s.n}</span>
                  <span className="nh-how-chip">
                    <i className={`bi ${CHIPS[i].icon}`}></i> {CHIPS[i].label}
                  </span>
                </div>
                <div className="nh-how-body">
                  <h3 className="nh-how-step-title">{s.title}</h3>
                  <p className="nh-how-step-desc">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
