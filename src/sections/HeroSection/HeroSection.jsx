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
          <div className="nh-hero-eyebrow">
            <span className="nh-eyebrow-dot"></span>
            Now Live · iOS &amp; Android
          </div>
          <h1 className="nh-hero-headline">
            Finding Service<br />
            Providers,<br />
            <span className="nh-teal">Made Easy.</span>
          </h1>
          <p className="nh-hero-sub">
            With just a couple of clicks, our advanced AI-based algorithm quickly
            identifies the best available local providers tailored to your preferred
            location, date, and time. Whether you're in need of Handyman, Painting,
            Cleaning, Car Detailing, Pet Care, CPA Services, Tutoring, or Fitness
            Coaching, Prolper has you covered across 8 service categories.
          </p>

          {/* How It Works card */}
          <div className="nh-hiw-card" id="how-section">
            <h3 className="nh-hiw-title">How It Works</h3>
            <p className="nh-hiw-sub">Your service sorted in four simple steps.</p>
            <div className="nh-hiw2-grid">

              {/* Step 1 */}
              <div className="nh-hiw2-step">
                <div className="nh-step-badge">1</div>
                <div className="nh-hiw2-visual">
                  <span className="nh-step-bg-num">1</span>
                  <div className="nh-mini-phone">
                    <div className="nh-mini-phone-island"></div>
                    <div className="nh-mini-phone-screen">
                      <div className="nh-mini-appbar">
                        <span className="nh-mini-appname">Prolper</span>
                        <i className="bi bi-three-dots nh-mini-menu"></i>
                      </div>
                      <div className="nh-mini-search-bar">
                        <i className="bi bi-search"></i>
                        <span>Try 'Handyman'</span>
                      </div>
                      <div className="nh-mini-section-lbl">Suggestions</div>
                      <div className="nh-mini-svc-grid">
                        <div className="nh-mini-svc-tile nh-tile-active">
                          <i className="bi bi-tools"></i>
                          <span>Handyman</span>
                        </div>
                        <div className="nh-mini-svc-tile">
                          <i className="bi bi-brush-fill"></i>
                          <span>Painting</span>
                        </div>
                        <div className="nh-mini-svc-tile">
                          <i className="bi bi-house-heart-fill"></i>
                          <span>Cleaning</span>
                        </div>
                        <div className="nh-mini-svc-tile">
                          <i className="bi bi-car-front-fill"></i>
                          <span>Car Detail</span>
                        </div>
                      </div>
                    </div>
                    <div className="nh-mini-phone-bar"></div>
                  </div>
                </div>
                <h4 className="nh-hiw2-title">Select a Service</h4>
                <p className="nh-hiw2-desc">Browse 8 categories and pick what you need.</p>
              </div>

              {/* Step 2 */}
              <div className="nh-hiw2-step">
                <div className="nh-step-badge">2</div>
                <div className="nh-hiw2-visual">
                  <span className="nh-step-bg-num">2</span>
                  <div className="nh-ai-radar">
                    <span className="nh-radar-r1"></span>
                    <span className="nh-radar-r2"></span>
                    <span className="nh-radar-r3"></span>
                    <span className="nh-radar-sweep"></span>
                    <span className="nh-radar-ch-h"></span>
                    <span className="nh-radar-ch-v"></span>
                    <div className="nh-radar-core"><i className="bi bi-cpu-fill"></i></div>
                    <span className="nh-radar-dot rd1"></span>
                    <span className="nh-radar-dot rd2"></span>
                    <span className="nh-radar-dot rd3"></span>
                  </div>
                </div>
                <h4 className="nh-hiw2-title">AI Smart Match</h4>
                <p className="nh-hiw2-desc">AI finds the best-rated local pro near you.</p>
              </div>

              {/* Step 3 */}
              <div className="nh-hiw2-step">
                <div className="nh-step-badge">3</div>
                <div className="nh-hiw2-visual">
                  <span className="nh-step-bg-num">3</span>
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
                <h4 className="nh-hiw2-title">Provider Connects</h4>
                <p className="nh-hiw2-desc">Pro reaches out via <strong>call</strong> or <strong>chat</strong> and sends a live estimate.</p>
              </div>

              {/* Step 4 */}
              <div className="nh-hiw2-step">
                <div className="nh-step-badge">4</div>
                <div className="nh-hiw2-visual">
                  <span className="nh-step-bg-num">4</span>
                  <div className="nh-inv-card">
                    <div className="nh-inv-toprow">
                      <span className="nh-inv-id">Invoice #1042</span>
                      <span className="nh-inv-ok"><i className="bi bi-check-circle-fill"></i> Approved</span>
                    </div>
                    <div className="nh-inv-service">Handyman · 2 hrs</div>
                    <div className="nh-inv-amount">$120</div>
                    <button className="nh-inv-pay"><i className="bi bi-lock-fill"></i> Pay Securely</button>
                  </div>
                </div>
                <h4 className="nh-hiw2-title">Approve &amp; Pay</h4>
                <p className="nh-hiw2-desc">Accept, get the job done, pay securely in-app.</p>
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
