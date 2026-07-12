import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import useAppLinks from "../../hooks/useAppLinks";
import "./FooterSection.css";

const FooterSection = () => {
  const [nemail, setNemail] = useState("");
  const [loading, setLoading] = useState(false);
  const appLinks = useAppLinks();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to a home-page section, navigating home first if we're elsewhere.
  const goToSection = (e, id) => {
    e.preventDefault();
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const nav = document.querySelector(".ios-nav");
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navBottom - 16;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 500);
    } else {
      doScroll();
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const email = nemail.trim().toLowerCase();
    if (!email || loading) return;

    setLoading(true);
    try {
      const existing = await getDocs(
        query(collection(db, "newsletter_subscribers"), where("email", "==", email))
      );
      if (!existing.empty) {
        Swal.fire({
          iconHtml: '<i class="bi bi-envelope-fill"></i>',
          title: "Already Subscribed!",
          html: `
            <p style="margin:0 0 6px;color:#334155;font-size:15px;line-height:1.6;">
              <strong>${email}</strong> is already on our list.
            </p>
            <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
              You'll keep receiving our updates, no action needed.
            </p>`,
          confirmButtonText: "Got it!",
          confirmButtonColor: "#14B8A6",
          background: "#ffffff",
          customClass: { icon: "prolper-swal-icon", popup: "prolper-swal-popup" },
        });
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        isActive: true,
        source: "footer_form",
        subscribedAt: new Date(),
      });
      setNemail("");
      Swal.fire({
        iconHtml: '<i class="bi bi-envelope-check-fill"></i>',
        title: "You're in! 🎉",
        html: `
          <p style="margin:0 0 6px;color:#334155;font-size:15px;line-height:1.6;">
            Welcome to the <strong>Prolper community</strong>.
          </p>
          <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
            We've just sent a welcome email, check your inbox (and spam, just in case).
          </p>`,
        confirmButtonText: "Great, thanks!",
        confirmButtonColor: "#14B8A6",
        background: "#ffffff",
        buttonsStyling: true,
        customClass: { icon: "prolper-swal-icon", popup: "prolper-swal-popup" },
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "We couldn't subscribe you right now. Please try again in a moment.",
        confirmButtonColor: "#14B8A6",
      });
    } finally {
      setLoading(false);
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
                <span><i className="bi bi-telephone-fill"></i> In-app calling</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-geo-alt-fill"></i> Live in Mississauga</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-shield-check-fill"></i> Secure in-app payments</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-star-fill"></i> Real Ratings from Real Customers</span>
                <span className="nh-dot">•</span>
                <span><i className="bi bi-tools"></i> Built for Local Service Pros</span>
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
                Book trusted local pros for your home, business and personal
                needs. Get matched, chat, pay and rate, all in one app.
              </p>
              <div className="nh-footer-loc">
                <i className="bi bi-geo-alt-fill"></i>
                <span>Mississauga, Ontario, Canada</span>
              </div>
              <div className="nh-footer-apps">
                <a href={appLinks.customer_ios} target="_blank" rel="noreferrer" className="nh-footer-app">
                  <i className="bi bi-apple"></i>
                  <span><small>Download on the</small><strong>App Store</strong></span>
                </a>
                <a href={appLinks.customer_android} target="_blank" rel="noreferrer" className="nh-footer-app">
                  <i className="bi bi-google-play"></i>
                  <span><small>Get it on</small><strong>Google Play</strong></span>
                </a>
              </div>
            </div>

            <div className="nh-footer-col">
              <h4 className="nh-footer-col-title">Explore</h4>
              <ul className="nh-footer-nav">
                <li><a href="/#how-it-works" onClick={(e) => goToSection(e, "how-it-works")}>How it works</a></li>
                <li><a href="/#why-us" onClick={(e) => goToSection(e, "why-us")}>Why us</a></li>
                <li><a href="/#get-app" onClick={(e) => goToSection(e, "get-app")}>Get the app</a></li>
                <li><Link to="/become-a-provider">Become a Pro</Link></li>
                <li><a href="/#contact-section" onClick={(e) => goToSection(e, "contact-section")}>Contact us</a></li>
              </ul>
            </div>

            <div className="nh-footer-newsletter">
              <h4 className="nh-nl-title">Stay in the Loop</h4>
              <p className="nh-nl-sub">
                Get notified about our Exclusive Content.
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
                <button type="submit" className="nh-nl-btn" disabled={loading} aria-label="Subscribe">
                  {loading
                    ? <i className="bi bi-arrow-repeat nh-nl-spin"></i>
                    : <i className="bi bi-send-fill"></i>}
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
              <Link to="/legal/business">Pro Helper Terms of Use</Link>
              <Link to="/legal/customer">Customer Terms of Use</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default FooterSection;
