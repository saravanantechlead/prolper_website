import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDocFromServer } from "firebase/firestore";
import "./PlatformSection.css";

const APPS = [
  {
    key:          "customer",
    badge:        "For Customers",
    icon:         "bi-person-fill",
    title:        "Looking for a Service?",
    desc:         "Book local professionals in minutes. Handyman, cleaning, painting, pet care and more — all on Prolper.",
    accent:       "#14b8a6",
    accentBg:     "rgba(20,184,166,0.12)",
    accentBorder: "rgba(20,184,166,0.28)",
    iosUrl:       "/app?for=customer",
    androidUrl:   "/app?for=customer",
  },
  {
    key:          "business",
    badge:        "For Service Pros",
    icon:         "bi-briefcase-fill",
    title:        "Prolper Pro",
    desc:         "Turn your skills into income. Receive job requests, manage your schedule, and grow your client base.",
    accent:       "#818cf8",
    accentBg:     "rgba(129,140,248,0.12)",
    accentBorder: "rgba(129,140,248,0.28)",
    iosUrl:       "/app?for=business",
    androidUrl:   "/app?for=business",
  },
];

const PlatformSection = () => {
  const [qrUrls, setQrUrls] = useState({ customer: null, business: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocFromServer(doc(db, "qr_links", "current_qrs"));
        if (snap.exists()) {
          const d = snap.data();
          setQrUrls({
            customer: d.customer_qr_url || null,
            business: d.business_qr_url || null,
          });
        }
      } catch (err) {
        console.error("QR fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="ps-section" id="download-section">
      <div className="ps-inner">

        <div className="ps-header nh-animate">
          <h2 className="ps-title">One Platform. Every Service.</h2>
          <p className="ps-sub">Connecting you with local professionals to get any job done right.</p>
        </div>

        <div className="ps-cards">
          {APPS.map((app) => (
            <div
              className="ps-card nh-animate"
              key={app.key}
              style={{
                "--ps-accent":        app.accent,
                "--ps-accent-bg":     app.accentBg,
                "--ps-accent-border": app.accentBorder,
              }}
            >
              {/* Badge */}
              <div className="ps-badge">
                <i className={`bi ${app.icon}`}></i>
                {app.badge}
              </div>

              {/* Text */}
              <h3 className="ps-card-title">{app.title}</h3>
              <p className="ps-card-desc">{app.desc}</p>

              {/* QR */}
              <div className="ps-qr-area">
                {loading ? (
                  <div className="ps-spinner-wrap">
                    <div className="ps-spinner"></div>
                  </div>
                ) : qrUrls[app.key] ? (
                  <div className="ps-qr-box">
                    <div className="ps-qr-img-wrap">
                      <img
                        src={qrUrls[app.key]}
                        alt={`${app.title} QR`}
                        className="ps-qr-img"
                      />
                    </div>
                    <p className="ps-qr-label">Scan to download</p>
                  </div>
                ) : null}
              </div>


            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PlatformSection;
