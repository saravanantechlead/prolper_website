import React from "react";
import { Link } from "react-router-dom";
import "./ProviderCTASection.css";

const PERKS = [
  { icon: "bi-cash-coin",        text: "Keep more of what you earn" },
  { icon: "bi-calendar2-check",  text: "Work on your own schedule" },
  { icon: "bi-people-fill",      text: "A steady stream of local jobs" },
  { icon: "bi-shield-check",     text: "Secure in-app payments" },
];

const ProviderCTASection = () => (
  <section className="nh-provcta" id="become-provider">
    <div className="nh-section-inner">
      <div className="nh-provcta-card nh-animate">
        <div className="nh-provcta-glow" />

        <div className="nh-provcta-left">
          <span className="nh-provcta-eyebrow">
            <i className="bi bi-briefcase-fill"></i> For service pros
          </span>
          <h2 className="nh-provcta-title">
            Turn your skills into <span className="nh-teal">steady income.</span>
          </h2>
          <p className="nh-provcta-lead">
            Join thousands of professionals growing their business on Prolper.
            Get matched with customers near you and get paid securely — no cold calls,
            no chasing invoices.
          </p>

          <ul className="nh-provcta-perks">
            {PERKS.map((p) => (
              <li key={p.text}>
                <i className={`bi ${p.icon}`}></i> {p.text}
              </li>
            ))}
          </ul>

          <div className="nh-provcta-actions">
            <Link to="/become-a-provider" className="nh-provcta-btn nh-provcta-btn-primary">
              Become a Provider <i className="bi bi-arrow-right"></i>
            </Link>
            <a href="#download-section" className="nh-provcta-btn nh-provcta-btn-ghost">
              Get the Pro app
            </a>
          </div>
        </div>

        <div className="nh-provcta-right">
          <div className="nh-earn-card">
            <div className="nh-earn-head">
              <span className="nh-earn-label">This week's earnings</span>
              <span className="nh-earn-trend"><i className="bi bi-graph-up-arrow"></i> +18%</span>
            </div>
            <div className="nh-earn-amount">$1,240</div>
            <div className="nh-earn-bars">
              {[42, 68, 55, 80, 62, 95, 74].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="nh-earn-foot">
              <span><i className="bi bi-check-circle-fill"></i> 9 jobs completed</span>
              <span className="nh-earn-rating"><i className="bi bi-star-fill"></i> 4.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProviderCTASection;
