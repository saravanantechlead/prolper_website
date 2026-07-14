import React, { useEffect } from "react";
import "./Home.css";

import Seo from "../../components/Seo/Seo";
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
      <Seo
        title="Local Services in Mississauga: Handyman, Cleaning & More | Prolper"
        description="Book local pros in Mississauga in minutes: handyman, cleaning, painting, car detailing, pet care, tutoring, CPA and fitness. Get matched, chat or call, pay and rate in the Prolper app."
        path="/"
      />
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
