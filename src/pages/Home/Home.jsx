import React, { useEffect } from "react";
import "./Home.css";

import HeroSection from "../../sections/HeroSection/HeroSection";
import HowItWorksSection from "../../sections/HowItWorksSection/HowItWorksSection";
import StandardSection from "../../sections/StandardSection/StandardSection";
import GetAppSection from "../../sections/GetAppSection/GetAppSection";
import ContactSection from "../../sections/ContactSection/ContactSection";
import FooterSection from "../../sections/FooterSection/FooterSection";

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('nh-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.nh-animate, .nh-animate-left, .nh-animate-right')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="nh-page">
      <HeroSection />
      <HowItWorksSection />
      <StandardSection />
      <GetAppSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Home;
