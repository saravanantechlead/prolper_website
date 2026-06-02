import React from "react";
import "./HowItWorksSection.css";

const HowItWorksSection = () => (
  <section className="nhiw-section" id="how-section">
    <div className="nhiw-blob nhiw-blob-teal" aria-hidden="true"></div>
    <div className="nhiw-blob nhiw-blob-indigo" aria-hidden="true"></div>

    <div className="nhiw-inner">

      {/* ── Header ── */}
      <div className="nhiw-header">
        <div className="nhiw-eyebrow nh-animate">
          <span className="nhiw-eyebrow-dot"></span>
          Simple &amp; Fast
        </div>
        <h2 className="nhiw-title nh-animate nh-d1">How It Works</h2>
        <p className="nhiw-sub nh-animate nh-d2">Your service sorted in four simple steps.</p>
      </div>

      {/* ── Steps ── */}
      <div className="nhiw-grid">

        {/* Step 1 – Select a Service */}
        <div className="nhiw-step nh-animate nh-d1">
          <div className="nhiw-card nhiw-card-teal">
            <span className="nhiw-bg-num">1</span>
            <div className="nhiw-pill nhiw-pill-teal">01</div>
            <div className="nhiw-visual">
              <div className="nhiw-phone">
                <div className="nhiw-ph-island"></div>
                <div className="nhiw-ph-screen">
                  <div className="nhiw-ph-appbar">
                    <span>Prolper</span>
                    <i className="bi bi-three-dots"></i>
                  </div>
                  <div className="nhiw-ph-search">
                    <i className="bi bi-search"></i>
                    <span>Try &lsquo;Handyman&rsquo;</span>
                  </div>
                  <div className="nhiw-ph-lbl">Suggestions</div>
                  <div className="nhiw-ph-grid">
                    <div className="nhiw-ph-tile nhiw-tile-active">
                      <i className="bi bi-tools"></i><span>Handyman</span>
                    </div>
                    <div className="nhiw-ph-tile">
                      <i className="bi bi-brush-fill"></i><span>Painting</span>
                    </div>
                    <div className="nhiw-ph-tile">
                      <i className="bi bi-house-heart-fill"></i><span>Cleaning</span>
                    </div>
                    <div className="nhiw-ph-tile">
                      <i className="bi bi-car-front-fill"></i><span>Car Detail</span>
                    </div>
                  </div>
                </div>
                <div className="nhiw-ph-bar"></div>
              </div>
            </div>
          </div>
          <h4 className="nhiw-step-title">Select a Service</h4>
          <p className="nhiw-step-desc">Browse 8 categories and pick exactly what you need.</p>
        </div>

        {/* Step 2 – AI Smart Match */}
        <div className="nhiw-step nh-animate nh-d2">
          <div className="nhiw-card nhiw-card-indigo">
            <span className="nhiw-bg-num">2</span>
            <div className="nhiw-pill nhiw-pill-indigo">02</div>
            <div className="nhiw-visual">
              <div className="nhiw-radar">
                <span className="nhiw-rr nhiw-rr1"></span>
                <span className="nhiw-rr nhiw-rr2"></span>
                <span className="nhiw-rr nhiw-rr3"></span>
                <span className="nhiw-rsweep"></span>
                <span className="nhiw-rch nhiw-rch-h"></span>
                <span className="nhiw-rch nhiw-rch-v"></span>
                <div className="nhiw-rcore">
                  <i className="bi bi-cpu-fill"></i>
                </div>
                <span className="nhiw-rdot nrd1"></span>
                <span className="nhiw-rdot nrd2"></span>
                <span className="nhiw-rdot nrd3"></span>
              </div>
            </div>
          </div>
          <h4 className="nhiw-step-title">AI Smart Match</h4>
          <p className="nhiw-step-desc">Our AI instantly finds the best-rated local pro near you.</p>
        </div>

        {/* Step 3 – Provider Connects */}
        <div className="nhiw-step nh-animate nh-d3">
          <div className="nhiw-card nhiw-card-teal">
            <span className="nhiw-bg-num">3</span>
            <div className="nhiw-pill nhiw-pill-teal">03</div>
            <div className="nhiw-visual">
              <div className="nhiw-connect">
                <div className="nhiw-conn-btns">
                  <div className="nhiw-conn-btn nhiw-conn-call">
                    <div className="nhiw-conn-ring"></div>
                    <div className="nhiw-conn-ring nhiw-conn-ring2"></div>
                    <div className="nhiw-conn-icon"><i className="bi bi-telephone-fill"></i></div>
                    <span>Call</span>
                  </div>
                  <div className="nhiw-conn-or">or</div>
                  <div className="nhiw-conn-btn nhiw-conn-chat">
                    <div className="nhiw-conn-icon"><i className="bi bi-chat-dots-fill"></i></div>
                    <span>Chat</span>
                  </div>
                </div>
                <div className="nhiw-conn-estimate">
                  <i className="bi bi-file-earmark-text-fill"></i>
                  Estimate Sent
                </div>
              </div>
            </div>
          </div>
          <h4 className="nhiw-step-title">Provider Connects</h4>
          <p className="nhiw-step-desc">Your pro reaches out via call or chat with a live estimate.</p>
        </div>

        {/* Step 4 – Approve & Pay */}
        <div className="nhiw-step nh-animate nh-d4">
          <div className="nhiw-card nhiw-card-indigo">
            <span className="nhiw-bg-num">4</span>
            <div className="nhiw-pill nhiw-pill-indigo">04</div>
            <div className="nhiw-visual">
              <div className="nhiw-invoice">
                <div className="nhiw-inv-top">
                  <span className="nhiw-inv-id">Invoice #1042</span>
                  <span className="nhiw-inv-ok">
                    <i className="bi bi-check-circle-fill"></i> Approved
                  </span>
                </div>
                <div className="nhiw-inv-svc">Handyman &middot; 2 hrs</div>
                <div className="nhiw-inv-amount">$120</div>
                <button className="nhiw-inv-pay">
                  <i className="bi bi-lock-fill"></i> Pay Securely
                </button>
              </div>
            </div>
          </div>
          <h4 className="nhiw-step-title">Approve &amp; Pay</h4>
          <p className="nhiw-step-desc">Accept the estimate, get the job done, and pay securely in-app.</p>
        </div>

      </div>
    </div>
  </section>
);

export default HowItWorksSection;
