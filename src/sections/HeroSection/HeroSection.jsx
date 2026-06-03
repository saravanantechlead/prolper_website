import React, { useState } from "react";
import customerAppImg from "../../assets/iphone customer app.png";
import businessAppImg from "../../assets/iphone business icon.png";
import "./HeroSection.css";

const HeroSection = () => {
  const [showProvider, setShowProvider] = useState(false);

  return (
    <section className="nh-hero">
      <div className="nh-hero-inner">

        {/* LEFT */}
        <div className="nh-hero-left">
          <h1 className="nh-hero-headline">
            Find Your<br />
            <span className="nh-teal">Pro Helper.</span>
          </h1>
          <p className="nh-hero-sub">
            With just a few clicks, Prolper connects you with local service
            providers based on your location, preferred date, and time. Whether
            you need help at home, for your business, or for your personal needs,
            Prolper makes finding the right professional simple, fast, and reliable.
          </p>

          {/* How It Works card — 3 steps */}
          <div className="nh-hiw-card" id="how-section">
            <h3 className="nh-hiw-title">How It Works</h3>
            <p className="nh-hiw-sub">Three simple steps to get it done.</p>
            <div className="nh-hiw-grid nh-hiw-grid-3">

              {/* Step 1 – Select a Service */}
              <div className="nh-hiw-step">
                <div className="nh-hiw-scard nh-hiw-scard-teal">
                  <span className="nh-hiw-bgnum">1</span>
                  <div className="nh-hiw-pill nh-hiw-pill-teal">01</div>
                  <div className="nh-hiw-vis">
                    <div className="nh-mini-phone">
                      <div className="nh-mini-phone-island"></div>
                      <div className="nh-mini-phone-screen">
                        <div className="nh-mini-appbar">
                          <span className="nh-mini-appname">Prolper</span>
                          <i className="bi bi-three-dots nh-mini-menu"></i>
                        </div>
                        <div className="nh-mini-search-bar">
                          <i className="bi bi-search"></i>
                          <span>Try &lsquo;Handyman&rsquo;</span>
                        </div>
                        <div className="nh-mini-section-lbl">Categories</div>
                        <div className="nh-mini-svc-grid">
                          <div className="nh-mini-svc-tile nh-tile-active"><i className="bi bi-tools"></i><span>Handyman</span></div>
                          <div className="nh-mini-svc-tile"><i className="bi bi-brush-fill"></i><span>Painting</span></div>
                          <div className="nh-mini-svc-tile"><i className="bi bi-house-heart-fill"></i><span>Cleaning</span></div>
                          <div className="nh-mini-svc-tile"><i className="bi bi-car-front-fill"></i><span>Car Detail</span></div>
                        </div>
                      </div>
                      <div className="nh-mini-phone-bar"></div>
                    </div>
                  </div>
                </div>
                <h4 className="nh-hiw-slabel">Select a Service</h4>
                <p className="nh-hiw-sdesc">Browse categories, pick what you need and when.</p>
              </div>

              {/* Step 2 – Connect with Your Pro */}
              <div className="nh-hiw-step">
                <div className="nh-hiw-scard nh-hiw-scard-indigo">
                  <span className="nh-hiw-bgnum">2</span>
                  <div className="nh-hiw-pill nh-hiw-pill-indigo">02</div>
                  <div className="nh-hiw-vis">
                    <div className="nh-connect-visual">
                      <div className="nh-connect-btns">
                        <div className="nh-cv-btn nh-cv-call">
                          <div className="nh-cv-ring"></div>
                          <div className="nh-cv-ring nh-cv-ring2"></div>
                          <div className="nh-cv-icon"><i className="bi bi-telephone-fill"></i></div>
                          <span>Call</span>
                        </div>
                        <div className="nh-cv-or">or</div>
                        <div className="nh-cv-btn nh-cv-chat">
                          <div className="nh-cv-icon"><i className="bi bi-chat-dots-fill"></i></div>
                          <span>Chat</span>
                        </div>
                      </div>
                      <div className="nh-cv-estimate">
                        <i className="bi bi-file-earmark-text-fill"></i> Estimate Sent
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="nh-hiw-slabel">Connect with Your Pro</h4>
                <p className="nh-hiw-sdesc">Chat or call, receive an estimate, and pay to confirm.</p>
              </div>

              {/* Step 3 – Get It Done & Rate */}
              <div className="nh-hiw-step">
                <div className="nh-hiw-scard nh-hiw-scard-teal">
                  <span className="nh-hiw-bgnum">3</span>
                  <div className="nh-hiw-pill nh-hiw-pill-teal">03</div>
                  <div className="nh-hiw-vis">
                    <div className="nh-rate-visual">
                      <div className="nh-rate-done">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Service Complete</span>
                      </div>
                      <div className="nh-rate-stars">
                        {[1,2,3,4,5].map(s => (
                          <i key={s} className="bi bi-star-fill nh-star"></i>
                        ))}
                      </div>
                      <div className="nh-rate-label">Rate your experience</div>
                    </div>
                  </div>
                </div>
                <h4 className="nh-hiw-slabel">Get It Done &amp; Rate</h4>
                <p className="nh-hiw-sdesc">Service delivered, balance settled, leave a rating.</p>
              </div>

            </div>
          </div>

          {/* Live badge + store buttons */}
          <div className="nh-hero-bottom">
            <div className="nh-live-badge">
              <i className="bi bi-check-circle-fill nh-live-check"></i>
              We Are Live
            </div>
            <div className="nh-store-btns">
              <a href="#download-section" className="nh-store-btn">
                <i className="bi bi-apple nh-store-icon"></i>
                <div className="nh-store-text">
                  <span className="nh-store-small">Download on the</span>
                  <span className="nh-store-large">App Store</span>
                </div>
              </a>
              <a href="#download-section" className="nh-store-btn">
                <i className="bi bi-google-play nh-store-icon"></i>
                <div className="nh-store-text">
                  <span className="nh-store-small">GET IT ON</span>
                  <span className="nh-store-large">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT – iPhone mockups with real app UI */}
        <div className="nh-hero-right">
          <button
            className="nh-provider-btn"
            onClick={() => setShowProvider(p => !p)}
          >
            <i className="bi bi-arrow-clockwise"></i>
            {showProvider ? "View Customer App" : "View Provider App"}
          </button>
          <div className="nh-phone-duo">

            {/* Customer app – front by default, goes to shadow on toggle */}
            <div className={`nh-phone-shell ${showProvider ? 'nh-shell-back' : 'nh-shell-front'}`}>
              <div className="nh-iphone">
                <div className="nh-iphone-island"></div>
                <img src={customerAppImg} alt="Prolper Customer App" className="nh-iphone-real-screen" />
                <div className="nh-iphone-bar"></div>
              </div>
            </div>

            {/* Provider app – shadow by default, comes to front on toggle */}
            <div className={`nh-phone-shell ${showProvider ? 'nh-shell-front' : 'nh-shell-back'}`}>
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

export default HeroSection;
