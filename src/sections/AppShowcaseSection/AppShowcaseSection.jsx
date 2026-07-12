import React, { useState } from "react";
import customerAppImg from "../../assets/iphone customer app.png";
import businessAppImg from "../../assets/iphone business icon.png";
import "./AppShowcaseSection.css";

const FEATURES = [
  {
    icon: "bi-chat-dots-fill",
    accent: "#14b8a6",
    title: "Chat or call your pro",
    desc: "Message or call your provider directly in the app to discuss the job.",
  },
  {
    icon: "bi-shield-lock-fill",
    accent: "#818cf8",
    title: "Secure in-app payments",
    desc: "Pay safely through the app — no cash, no chasing invoices.",
  },
  {
    icon: "bi-patch-check-fill",
    accent: "#f59e0b",
    title: "Local pros & real reviews",
    desc: "Every provider is vetted and rated by real customers like you.",
  },
];

const AppShowcaseSection = () => {
  const [showProvider, setShowProvider] = useState(false);

  return (
    <section className="nh-showcase" id="app-showcase">
      <div className="nh-showcase-inner">

        {/* LEFT — heading + app features */}
        <div className="nh-showcase-left nh-animate-left">
          <span className="nh-showcase-eyebrow">
            <i className="bi bi-phone"></i> The Prolper app
          </span>
          <h2 className="nh-showcase-title">
            Everything you need, <span className="nh-teal">in one app.</span>
          </h2>
          <p className="nh-showcase-lead">
            Find a pro, agree on a price, pay securely, and rate the job — all from
            your phone, for customers and providers alike.
          </p>

          <div className="nh-showcase-steps">
            {FEATURES.map((s) => (
              <div className="nh-showcase-step" key={s.title} style={{ "--step-accent": s.accent }}>
                <span className="nh-showcase-step-icon"><i className={`bi ${s.icon}`}></i></span>
                <div className="nh-showcase-step-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — phone mockups with toggle */}
        <div className="nh-showcase-right nh-animate-right">
          <button
            className="nh-provider-btn nh-showcase-toggle"
            onClick={() => setShowProvider((p) => !p)}
          >
            <i className="bi bi-arrow-clockwise"></i>
            {showProvider ? "View Customer App" : "View Provider App"}
          </button>

          <div className="nh-phone-duo">
            <div className={`nh-phone-shell ${showProvider ? "nh-shell-back" : "nh-shell-front"}`}>
              <div className="nh-iphone">
                <div className="nh-iphone-island"></div>
                <img src={customerAppImg} alt="Prolper Customer App" className="nh-iphone-real-screen" />
                <div className="nh-iphone-bar"></div>
              </div>
            </div>
            <div className={`nh-phone-shell ${showProvider ? "nh-shell-front" : "nh-shell-back"}`}>
              <div className="nh-iphone">
                <div className="nh-iphone-island"></div>
                <img src={businessAppImg} alt="Prolper Business App" className="nh-iphone-real-screen" />
                <div className="nh-iphone-bar"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppShowcaseSection;
