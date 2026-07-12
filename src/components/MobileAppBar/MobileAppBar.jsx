import React from "react";
import useAppLinks from "../../hooks/useAppLinks";
import "./MobileAppBar.css";

/** Slim sticky bar shown on phones only — quick access to the app stores. */
const MobileAppBar = () => {
  const appLinks = useAppLinks();

  return (
    <div className="nh-appbar" role="complementary" aria-label="Download the Prolper app">
      <div className="nh-appbar-text">
        <strong>Get the Prolper app</strong>
        <span>Book a local pro in minutes</span>
      </div>
      <div className="nh-appbar-btns">
        <a href={appLinks.customer_ios} className="nh-appbar-btn" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
          <i className="bi bi-apple"></i>
        </a>
        <a href={appLinks.customer_android} className="nh-appbar-btn" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
          <i className="bi bi-google-play"></i>
        </a>
      </div>
    </div>
  );
};

export default MobileAppBar;
