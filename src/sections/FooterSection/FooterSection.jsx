import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./FooterSection.css";

const FooterSection = () => {
  const [nemail, setNemail] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: nemail,
        isActive: true,
        source: "footer_form",
        subscribedAt: new Date(),
      });
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "You'll be notified about our launch.",
        confirmButtonColor: "#0fba81",
        timer: 2500,
      });
      setNemail("");
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Please try again." });
    }
  };

  return (
    <footer className="nh-footer">

      {/* Ticker */}
      <div className="nh-ticker-wrap">
        <span className="nh-ticker-label">PROLPER LIVE UPDATES</span>
        <div className="nh-ticker-track">
          <div className="nh-ticker-inner">
            {[1, 2, 3, 4].map((_, r) => (
              <React.Fragment key={r}>
                <span><i className="bi bi-star-fill"></i> In-app calling coming soon</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-lightning-fill"></i> Live tracking coming soon</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-geo-alt-fill"></i> Prolper launching in Mississauga</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-cpu-fill"></i> AI Smart Matching now live</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-shield-check-fill"></i> Secure in-app payments</span>
                <span className="nh-dot">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="nh-footer-main">
        <div className="nh-section-inner">
          <div className="nh-footer-grid">

            <div className="nh-footer-brand">
              <h2 className="nh-footer-logo">Prolper</h2>
              <p className="nh-footer-tagline">
                Connecting you with local service providers through AI-powered
                matching. Your trusted marketplace for professional services.
              </p>
              <div className="nh-footer-loc">
                <i className="bi bi-geo-alt-fill"></i>
                <span>Mississauga, Ontario, Canada</span>
              </div>
            </div>

            <div className="nh-footer-newsletter">
              <h4 className="nh-nl-title">Stay in the Loop</h4>
              <p className="nh-nl-sub">
                Get notified about our launch, exclusive features, and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="nh-nl-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={nemail}
                  onChange={(e) => setNemail(e.target.value)}
                  required
                  className="nh-nl-input"
                />
                <button type="submit" className="nh-nl-btn">
                  <i className="bi bi-send-fill"></i>
                </button>
              </form>
              <div className="nh-footer-socials">
                <a href="https://www.facebook.com/Prolperapp" target="_blank" rel="noreferrer" className="nh-social-icon"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/prolperapp" target="_blank" rel="noreferrer" className="nh-social-icon"><i className="bi bi-instagram"></i></a>
                <a href="https://x.com/ProlperApp" target="_blank" rel="noreferrer" className="nh-social-icon"><i className="bi bi-twitter-x"></i></a>
                <a href="https://www.linkedin.com/company/prolper" target="_blank" rel="noreferrer" className="nh-social-icon"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="nh-copyright">
        <div className="nh-section-inner">
          <div className="nh-copyright-row">
            <span>© 2026 Prolper Inc. All rights reserved. Made with <span className="nh-heart">💚</span></span>
            <div className="nh-footer-links">
              <Link to="/legal/business">Business Legal</Link>
              <Link to="/legal/customer">Customer Legal</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default FooterSection;
