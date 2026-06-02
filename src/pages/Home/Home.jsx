import React, { useEffect } from "react";
import "./Home.css";

import HeroSection from "../../sections/HeroSection/HeroSection";
import PlatformSection from "../../sections/PlatformSection/PlatformSection";
import StandardSection from "../../sections/StandardSection/StandardSection";
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
      <PlatformSection />
      <StandardSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Home;
