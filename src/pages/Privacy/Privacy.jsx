import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";

import linkedin from "./../../assets/in.png";
import facebook from "./../../assets/Vector.png";
import instagram from "./../../assets/insta.png";
import twitter from "./../../assets/x.png";
import logo from "/prolper-cropped.svg";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tocLinks = [
    { id: "introduction", label: "Introduction" },
    { id: "info", label: "1. Information We Collect" },
    { id: "use", label: "2. How We Use Data" },
    { id: "sharing", label: "3. Data Sharing" },
    { id: "security", label: "4. Storage & Security" },
    { id: "rights", label: "5. Your Rights" },
    { id: "children", label: "6. Children’s Privacy" },
    { id: "thirdparty", label: "7. Third‑Party Services" },
    { id: "changes", label: "8. Policy Changes" },
    { id: "contact", label: "9. Contact Us" },
  ];

  return (
    <div className="privacy-page-wrapper">
      <div className="container py-4 px-lg-5">
        
        {/* Modern Gradient Header */}
        <header className="text-center mb-5">
          <div className="badge-teal-gradient mb-3">Privacy & Trust</div>
          <h1 className="fs-2 fw-bold">Privacy Policy</h1>
          <div className="teal-underline mx-auto"></div>
          <p className="fs-6 text-muted mt-3">Effective Date: 01/10/2025</p>
        </header>

        <div className="privacy-layout">
          {/* Sticky Sidebar TOC */}
          <aside className="privacy-toc-sidebar d-none d-lg-block">
            <div className="sticky-nav-container">
              <h6 className="toc-header">ON THIS PAGE</h6>
              <nav className="toc-nav">
                {tocLinks.map((link) => (
                  <a key={link.id} href={`#${link.id}`} className="toc-link">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="privacy-content-area">
            
            {/* Introduction */}
            <section id="introduction" className="glass-card mb-4">
              <p className="fs-5 text-slate lh-base">
                {/* ("Company", "we", "us", or "our") */}
                Thank you for choosing Prolper. We respect your privacy and are committed to protecting your personal information.
              </p>
              <div className="app-scope-box mt-3">
                <span className="fw-bold text-teal d-block mb-1">This policy applies to:</span>
                <ul className="m-0 text-slate">
                  <li>Prolper Customer App</li>
                  <li>Prolper Business App</li>
                </ul>
              </div>
              <p className="fs-6 text-muted mt-3">By using our apps, you agree to this Privacy Policy.</p>
            </section>

            {/* 1. Information We Collect */}
            <PolicySection id="info" step="1" title="Information We Collect">
              <p className="fs-6 text-slate mb-4">We collect information depending on your role and how you use our apps.</p>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="sub-data-card customer-gradient">
                    <h4 className="fs-6 fw-bold mb-2">A. Customers (Customer App)</h4>
                    <ul className="fs-6 text-slate ps-3">
                      <li>Phone number (for OTP login)</li>
                      <li>Google details (name, email, photo)</li>
                      <li>Location (if required for services)</li>
                      <li>Service request details</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="sub-data-card business-gradient">
                    <h4 className="fs-6 fw-bold mb-2">B. Business Users (Business App)</h4>
                    <ul className="fs-6 text-slate ps-3">
                      <li>Email and password (authentication)</li>
                      <li>Service status updates</li>
                      <li>Business profile information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* 2. How We Use Information */}
            <PolicySection id="use" step="2" title="How We Use Information">
              <ul className="fs-6 text-slate lh-lg">
                <li>Authenticate users (Phone, Email, or Google)</li>
                <li>Connect customers and businesses</li>
                <li>Track service status (Pending, Accepted, Completed)</li>
                <li>Maintain records and improve user experience</li>
              </ul>
            </PolicySection>

            {/* 3. Data Sharing */}
            <PolicySection id="sharing" step="3" title="Data Sharing and Disclosure">
              <p className="fs-6 text-slate">We do not sell or rent your personal data. We may share data:</p>
              <ul className="fs-6 text-slate">
                <li>With service providers (Firebase)</li>
                <li>To comply with legal obligations</li>
                <li>To protect safety of users or the platform</li>
              </ul>
            </PolicySection>

            {/* 4. Data Storage */}
            <PolicySection id="security" step="4" title="Data Storage and Security">
              <div className="security-gradient-box">
                <ul className="fs-6 text-slate mb-0">
                  <li>Stored using **Google Firebase** (Auth and Firestore)</li>
                  <li>Encryption and access controls are utilized</li>
                  <li>Passwords are never stored in plain text</li>
                </ul>
              </div>
            </PolicySection>

            {/* 5. Your Rights */}
            <PolicySection id="rights" step="5" title="Your Rights">
              <p className="fs-6 text-slate">You can request access or deletion of your account and data.</p>
              <div className="action-box-teal">
                <p className="mb-0">Contact us at: contact@prolper.com</p>
              </div>
            </PolicySection>

            {/* 6. Children's Privacy */}
            <PolicySection id="children" step="6" title="Children’s Privacy">
              <p className="fs-6 text-slate">Apps are not intended for children under 13. We do not knowingly collect their data.</p>
            </PolicySection>

            {/* 7. Third‑Party Services */}
            <PolicySection id="thirdparty" step="7" title="Third‑Party Services">
              <p className="fs-6 text-slate">We use Firebase Authentication and Firestore. These services have their own privacy policies.</p>
            </PolicySection>

            {/* 8. Changes to Policy */}
            <PolicySection id="changes" step="8" title="Policy Changes">
              <p className="fs-6 text-slate">Policy updates will be reflected in the “Effective Date” at the top.</p>
            </PolicySection>

            {/* 9. Contact Us */}
            <PolicySection id="contact" step="9" title="Contact Us">
              <div className="contact-grid-card">
                <p className="mb-1 text-slate"><strong>Email:</strong> contact@prolper.com</p>
                <p className="mb-1 text-slate"><strong>Company:</strong> Prolper</p>
                <p className="mb-0 text-slate"><strong>Address:</strong> Canada</p>
              </div>
            </PolicySection>

          </main>
        </div>
      </div>

      {/* Synchronized Professional Footer */}
      <footer className="pro-footer-dark mt-5">
        <div className="container">
          <div className="footer-main-row">
            <div className="footer-brand">
              <Link to="/"><img src={logo} alt="Prolper" className="logo-black" /></Link>
              <p className="footer-mini-text">Intelligent Service Matching</p>
            </div>
            <div className="footer-social-group">
              <Link to="https://facebook.com/Prolper/" target="_blank" className="social-btn"><img src={facebook} alt="FB" /></Link>
              <Link to="https://linkedin.com/company/prolper" target="_blank" className="social-btn"><img src={linkedin} alt="IN" /></Link>
              <Link to="https://instagram.com/prolperapp/" target="_blank" className="social-btn"><img src={instagram} alt="IG" /></Link>
              <Link to="https://x.com/ProlperApp" target="_blank" className="social-btn"><img src={twitter} alt="X" /></Link>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <div className="footer-copyright">© 2026 Prolper. All rights reserved.</div>
            <div className="footer-legal-links">
              <Link to="/privacy-policy" className="legal-link">Privacy Policy</Link>
              <span className="separator">|</span>
              <Link to="/legal" className="legal-link">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Internal reusable card component
const PolicySection = ({ id, step, title, children }) => (
  <section id={id} className="glass-card mb-4 position-relative overflow-hidden">
    <div className="section-step-tag">{step}</div>
    <h2 className="fs-4 fw-bold teal-text mb-3">{title}</h2>
    <div className="section-body">{children}</div>
  </section>
);

export default Privacy;