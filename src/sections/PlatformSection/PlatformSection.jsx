import React from "react";
import customerQrImg from "../../assets/Customer qr.png";
import businessQrImg from "../../assets/Business qr.png";
import "./PlatformSection.css";

const PlatformSection = () => {
  return (
    <section className="nh-platform" id="download-section">
      <div className="nh-section-inner">
        <h2 className="nh-platform-title nh-animate">One Platform. Every Service.</h2>
        <p className="nh-platform-sub nh-animate nh-d1">
          Connecting you with trusted local professionals to get any job done right.
        </p>
        <div className="nh-platform-cards">

          <div className="nh-pcard nh-animate-left nh-d2">
            <div className="nh-pcard-badge">
              <i className="bi bi-check-circle-fill"></i>
              ARE YOU A CUSTOMER?
            </div>
            <h3 className="nh-pcard-title">Looking for a Service?</h3>
            <p className="nh-pcard-desc">
              Access trusted local professionals for daily tasks or specialized projects.
              Reliable, fast, and handled via Prolper.
            </p>
            <div className="nh-qr-box">
              <img src={customerQrImg} alt="Customer App QR" className="nh-qr-img" />
            </div>
          </div>

          <div className="nh-pcard nh-animate-right nh-d2">
            <div className="nh-pcard-badge">
              <i className="bi bi-check-circle-fill"></i>
              ARE YOU A SERVICE PROVIDER?
            </div>
            <h3 className="nh-pcard-title">Providing a Service?</h3>
            <p className="nh-pcard-desc">
              Turn your expertise into a business. Find new clients, manage
              schedule, and grow on your own terms.
            </p>
            <div className="nh-qr-box">
              <img src={businessQrImg} alt="Provider App QR" className="nh-qr-img" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
