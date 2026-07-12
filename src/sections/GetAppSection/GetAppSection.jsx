import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAppLinks from "../../hooks/useAppLinks";
import useQrLinks from "../../hooks/useQrLinks";
import customerAppImg from "../../assets/iphone customer app.png";
import businessAppImg from "../../assets/iphone business icon.png";
import "./GetAppSection.css";

/* App-brand tiles live in /public (spaces encoded). */
const CUSTOMER_ICON = "/prolper%20customer.png";
const PRO_ICON = "/prolper%20pro.png";

const VARIANTS = {
  customer: {
    label: "For customers",
    badgeIcon: "bi-person-fill",
    title: "Looking for a service?",
    lead: "Book local professionals in minutes. Handyman, cleaning, painting, pet care and more, all on Prolper.",
    appImg: customerAppImg,
    icon: CUSTOMER_ICON,
    iconAlt: "Prolper, the customer app",
    accent: "#0d9488",
    perks: [
      { icon: "bi-grid-1x2-fill",   text: "Browse services and book in a few taps" },
      { icon: "bi-chat-dots-fill",  text: "Chat or call your pro, get a clear estimate" },
      { icon: "bi-shield-lock-fill", text: "Pay securely in-app, no cash, no surprises" },
      { icon: "bi-star-fill",       text: "Rate every job and help your neighbours" },
    ],
    ios: "customer_ios",
    android: "customer_android",
  },
  pro: {
    label: "For service pros",
    badgeIcon: "bi-briefcase-fill",
    title: "Prolper Pro",
    lead: "Turn your skills into income. Receive job requests, manage your schedule, and grow your client base.",
    appImg: businessAppImg,
    icon: PRO_ICON,
    iconAlt: "Prolper Pro, the provider app",
    accent: "#4f46e5",
    perks: [
      { icon: "bi-inbox-fill",      text: "Receive job requests from nearby customers" },
      { icon: "bi-calendar2-check", text: "Work on your own schedule, accept what you want" },
      { icon: "bi-wallet2",         text: "Get paid securely, no chasing invoices" },
      { icon: "bi-graph-up-arrow",  text: "Build ratings that win you more work" },
    ],
    ios: "business_ios",
    android: "business_android",
    learnMore: "/become-a-provider",
  },
};

const GetAppSection = () => {
  const [variant, setVariant] = useState("customer");
  const v = VARIANTS[variant];
  const appLinks = useAppLinks();
  const qr = useQrLinks();
  const qrUrl = variant === "customer" ? qr.customer : qr.business;

  return (
    <section className="nh-getapp" id="get-app" style={{ "--accent": v.accent }}>
      <div className="nh-getapp-blob nh-getapp-blob-a" aria-hidden="true" />
      <div className="nh-getapp-blob nh-getapp-blob-b" aria-hidden="true" />

      <div className="nh-getapp-head nh-animate">
        {/* Switch */}
        <div className="nh-getapp-toggle" data-active={variant} role="tablist" aria-label="Choose app">
          <span className="nh-getapp-thumb" aria-hidden="true"></span>
          <button
            className={`nh-getapp-tab ${variant === "customer" ? "active" : ""}`}
            onClick={() => setVariant("customer")}
            role="tab"
            aria-selected={variant === "customer"}
          >
            <i className="bi bi-person-fill"></i> Prolper
          </button>
          <button
            className={`nh-getapp-tab ${variant === "pro" ? "active" : ""}`}
            onClick={() => setVariant("pro")}
            role="tab"
            aria-selected={variant === "pro"}
          >
            <i className="bi bi-briefcase-fill"></i> Pro
          </button>
        </div>
      </div>

      <div className="nh-getapp-stage">
        {/* Back-to-back phone frames */}
        <div className="nh-getapp-phones" data-active={variant}>
          <div className="nh-gphone nh-gphone-customer">
            <span className="nh-gphone-island"></span>
            <img src={customerAppImg} alt="The Prolper customer app" loading="lazy" />
          </div>
          <div className="nh-gphone nh-gphone-pro">
            <span className="nh-gphone-island"></span>
            <img src={businessAppImg} alt="The Prolper Pro app" loading="lazy" />
          </div>
          <div className="nh-getapp-appicon" key={variant + "-icon"}>
            <img src={v.icon} alt={v.iconAlt} loading="lazy" />
          </div>
        </div>

        {/* Content — swaps with the switch */}
        <div className="nh-getapp-panel" key={variant}>
          <span className="nh-getapp-badge">
            <i className={`bi ${v.badgeIcon}`}></i> {v.label}
          </span>
          <h3 className="nh-getapp-panel-title">{v.title}</h3>
          <p className="nh-getapp-panel-lead">{v.lead}</p>

          <ul className="nh-getapp-perks">
            {v.perks.map((p) => (
              <li key={p.text}><i className={`bi ${p.icon}`}></i> {p.text}</li>
            ))}
          </ul>

          <div className="nh-getapp-download">
            <div className="nh-getapp-qr">
              {qrUrl ? (
                <img src={qrUrl} alt={`Scan to download the ${v.label} app`} loading="lazy" />
              ) : (
                <div className="nh-getapp-qr-ph"><i className="bi bi-qr-code"></i></div>
              )}
              <span>Scan to<br />download</span>
            </div>

            <div className="nh-getapp-stores">
              <a href={appLinks[v.ios]} className="nh-getapp-store" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-apple"></i>
                <div><small>Download on the</small><strong>App Store</strong></div>
              </a>
              <a href={appLinks[v.android]} className="nh-getapp-store" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-google-play"></i>
                <div><small>GET IT ON</small><strong>Google Play</strong></div>
              </a>
              {v.learnMore && (
                <Link to={v.learnMore} className="nh-getapp-learn">Learn more <i className="bi bi-arrow-right"></i></Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetAppSection;
