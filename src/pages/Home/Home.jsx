import React, { useState,useCallback } from "react";
import bannerImg from "/banner1.png";
import qrImg from "/QR.png";
import App from "/app.png";
import Play from "/play.png";
import { Link,useNavigate,useLocation } from "react-router-dom";
import Slider from "react-slick";
import hiwImg from "/hiw.png";
import linkedin from "./../../assets/in.png";
import facebook from "./../../assets/Vector.png";
import instagram from "./../../assets/insta.png";
import twitter from "./../../assets/x.png";
import socialLogo from "/social-white.png";
import logo from "/prolper-cropped.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import NewsletterSection from "./Newsletter";
import "./Home.css";
import Swal from 'sweetalert2';

import uiMockup from '/ProlperBanner3.png'; // Example placeholder

const Home = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nemail, setNEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
const navigate = useNavigate();
  const location = useLocation();
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "newsletters"), { nemail });
      alert("Email subscribed successfully!");
      setNEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error subscribing. Please try again.");
    }
  };

  const testimonials = [
    {
      name: "Amit",
      role: "Electrician",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      review:
        "Prolper only sends me requests I can actually take. Accepting jobs through the app is simple, and it keeps my schedule organized and productive.",
      rating: 5,
    },
    {
      name: "Sofia",
      role: "Bakery Owner",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      review:
        "Since joining Prolper, more people have discovered our bakery. The app helped us reach new customers we wouldn't have found otherwise!",
      rating: 5,
    },
    {
      name: "David",
      role: "Handyman",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      review:
        "Prolper has been great for my business — the service requests I accept turn into real jobs, and my income has increased significantly!",
      rating: 5,
    },
    {
      name: "Emma",
      role: "Musician",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      review:
        "The in-app chat on Prolper makes it so easy to confirm sessions without sharing personal contact info. Everything is quick, clear, and professional!",
      rating: 5,
    },
  ];

  const handleNavigateAndScroll = useCallback((e, sectionId) => {
      e.preventDefault();
      setIsMobileMenuOpen(false); // Close mobile menu on click
  
      const action = () => {
        const section = document.getElementById(sectionId);
        if (section) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = section.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };
  
      if (location.pathname !== "/") {
        navigate("/");
        // Increased timeout slightly to ensure DOM is ready on slow devices
        setTimeout(action, 500);
      } else {
        action();
      }
    }, [location.pathname, navigate]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Show a rounded loading state
    Swal.fire({
      title: 'Sending...',
      allowOutsideClick: false,
      customClass: {
        popup: 'rounded-2xl', // More rounded corners
        title: 'text-gray-800 font-semibold' // Match UI font style
      },
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        mobile,
        email,
        message,
        timestamp: new Date()
      });

      // 2. Success Alert matching UI
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you shortly.',
        confirmButtonColor: '#0e766d', // Match the teal button color
        timer: 3000,
        customClass: {
          popup: 'rounded-2xl shadow-lg',
          title: 'text-gray-900 font-bold',
          confirmButton: 'rounded-lg px-6 py-3 font-semibold' // Rounded, styled button
        }
      });

      // Clear form
      setName(""); setMobile(""); setEmail(""); setMessage("");
    } catch (error) {
      // 3. Error Alert matching UI
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'rounded-2xl shadow-lg',
          title: 'text-gray-900 font-bold',
          confirmButton: 'rounded-lg px-6 py-3 font-semibold'
        }
      });
    }
  };
  return (
    <div className="home-page">
      {/* === NEW PROFESSIONAL HERO SECTION === */}
      <section className="hero-split-section">
        <div className="container">
          <div className="row align-items-center">

            {/* Right Image Side - Now Order 1 on Mobile, Order 2 on Desktop */}
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="hero-image-right animate-float mobile-margin-bottom">
                <img
                  src={uiMockup}
                  alt="Prolper App Interface"
                  className="hero-ui-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logo;
                    e.target.style.maxWidth = '40%';
                  }}
                />
              </div>
            </div>

            {/* Left Content Side - Now Order 2 on Mobile, Order 1 on Desktop */}
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="hero-content-left">
                <div className="hero-badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  New • Reliable & Real-Time
                </div>

                <h1 className="hero-headline animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  Finding Reliable Service Providers, <span className="teal-text">Made Easy.</span>
                </h1>

                <p className="hero-subtext animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  In today's overwhelming digital landscape, finding trustworthy professionals can be daunting.
                  <strong> Prolper</strong> is the innovative app designed to connect you with verified service
                  providers in real-time.
                </p>

                <div className="hero-buttons animate-fade-up" style={{ animationDelay: '0.4s' }}>
                  <a href="#download-section" className="btn-primary-teal" onClick={(e) => handleNavigateAndScroll(e, "download-section")}>Get Started</a>
                  <a href="#how-section" className="btn-outline-teal" onClick={(e) => handleNavigateAndScroll(e, "how-section")}>See How It Works</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* === END NEW HERO SECTION === */}

      {/* App Download Section */}
      {/* <section className="download-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="download-card">
                <div className="download-card-header">
                  <h3>Are you a Customer?</h3>
                </div>
                <div className="download-card-body">
                  <div className="store-badge-wrapper">
                    <img src={App} alt="App Store" className="store-badge" />
                    <span className="coming-soon-badge">Coming Soon</span>
                  </div>
                  <div className="store-badge-wrapper">
                    <img src={Play} alt="Google Play" className="store-badge" />
                    <span className="coming-soon-badge">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="download-card">
                <div className="download-card-header">
                  <h3>Are you a Business?</h3>
                </div>
                <div className="download-card-body">
                  <div className="store-badge-wrapper">
                    <img src={App} alt="App Store" className="store-badge" />
                    <span className="coming-soon-badge">Coming Soon</span>
                  </div>
                  <div className="store-badge-wrapper">
                    <img src={Play} alt="Google Play" className="store-badge" />
                    <span className="coming-soon-badge">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="download-section" id="download-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">One Platform. Every Service.</h2>
            <p className="section-subtitle">Connecting those who need things done with the experts who do them best.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Customer Card */}
            <div className="col-lg-5 col-md-6">
              <div className="download-card customer-card">
                <div className="download-card-header">
                  <span className="status-tag">Coming Soon</span>
                  <h3>Looking for a Service?</h3>
                  <p>Access verified experts for any task. From daily essentials to specialized projects, get it handled with Prolper.</p>
                </div>
                <div className="download-card-body">
                  <div className="store-group">
                    <div className="store-item">
                      <img src={App} alt="App Store" className="disabled-store-badge" />
                    </div>
                    <div className="store-item">
                      <img src={Play} alt="Google Play" className="disabled-store-badge" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Helper Card */}
            <div className="col-lg-5 col-md-6">
              <div className="download-card business-card pro-card">
                <div className="download-card-header">
                  <span className="status-tag">Coming Soon</span>
                  <h3>Providing a Service?</h3>
                  <p>Turn your expertise into a thriving business. Manage your schedule, find new clients, and grow on your own terms.</p>
                </div>
                <div className="download-card-body">
                  <div className="store-group">
                    <div className="store-item">
                      <img src={App} alt="App Store" className="disabled-store-badge" />
                    </div>
                    <div className="store-item">
                      <img src={Play} alt="Google Play" className="disabled-store-badge" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <h2 className="section-title">What Our Members Say About Us</h2>
          <div className="testimonial-slider-wrapper">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="testimonial-avatar"
                      />
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-role">{testimonial.role}</p>
                        <div className="testimonial-rating">
                          {"★".repeat(testimonial.rating)}
                          {"☆".repeat(5 - testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="testimonial-review">"{testimonial.review}"</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="how-it-works-section py-5" id="how-section">
        <div className="container">
          {/* Header Section - Kept your exact classes */}
          <div className="text-center mb-5">
            <h2 className="fs-2 fw-bold pb-3">How It Works</h2>
            <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
              At Prolper, our mission is to simplify your search for service providers.
              After signing up, you can easily book the services you need in just a few simple steps:
            </p>
          </div>

          <div className="row g-5">
            {/* Step 1 */}
            <div className="col-12 col-md-4">
              <div className="step-card-minimal text-center">
                <div className="step-badge-teal">1</div>
                <h4 className="fw-bold fs-5 mt-4">Choose Your Service</h4>
                <p className="fs-5 mt-2">
                  Select the service you require, along with your preferred
                  location, date, and time.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-4">
              <div className="step-card-minimal text-center">
                <div className="step-badge-teal">2</div>
                <h4 className="fw-bold fs-5 mt-4">Find Your Match</h4>
                <p className="fs-5 mt-2">
                  Our AI-driven algorithm will quickly identify the best-suited
                  service provider for your needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-4">
              <div className="step-card-minimal text-center">
                <div className="step-badge-teal">3</div>
                <h4 className="fw-bold fs-5 mt-4">Connect and Decide</h4>
                <p className="fs-5 mt-2">
                  Communicate directly through the ‘Activity’ tab chat feature.
                  Discuss requirements and decide whether to proceed or cancel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What Makes Us Different Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title-light">What Makes Us Different</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h4 className="feature-title">AI-Driven Algorithm</h4>
              <p className="feature-text">
                Prolper utilizes an advanced AI algorithm to analyze customer
                reviews and feedback.
              </p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">Data Collection</h4>
              <p className="feature-text">
                The platform collects real-time data from verified users who have
                engaged with service providers.
              </p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">Recommendation Generation</h4>
              <p className="feature-text">
                Based on the analysis, Prolper generates unbiased recommendations
                tailored to user needs.
              </p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">Quality Assurance</h4>
              <p className="feature-text">
                The platform conducts thorough investigations into service provider
                performance and can delist those with consistent negative feedback.
              </p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">Privacy Protection</h4>
              <p className="feature-text">
                Prolper ensures that user data remains confidential and is not
                shared with service providers.
              </p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">User Feedback Loop</h4>
              <p className="feature-text">
                Users can continuously provide feedback, helping to refine the
                recommendations and maintain service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section" id="about-us">
        <div className="container">
          <h2 className="section-title">About Us</h2>

          <p className="about-text">
            With just a couple of clicks, our advanced AI-based algorithm quickly
            identifies the best available service providers tailored to your
            preferred location, date, and time. Whether you're in need of an
            electrician, plumber, baker, private tutor, realtor or mover, Prolper
            has you covered with more than 150 service categories.
          </p>

          <p className="about-text mb-4">
            This table highlights the distinctions between a Referral/online Search
            and Prolper.
          </p>

          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Referral/Online Search</th>
                  <th>Prolper</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="criteria-cell">Potential for Misleading Information</td>
                  <td className="comparison-cell">May be misleading and/or fake.</td>
                  <td className="prolper-cell">
                    Provides unbiased referrals based on an AI-driven algorithm.
                  </td>
                </tr>
                <tr>
                  <td className="criteria-cell">Source of Rating</td>
                  <td className="comparison-cell">
                    May not be Rated by a verified customer.
                  </td>
                  <td className="prolper-cell">
                    Ratings are given exclusively by real customers.
                  </td>
                </tr>
                <tr>
                  <td className="criteria-cell">Monetary Incentives</td>
                  <td className="comparison-cell">
                    Referrers may earn commissions for service referrals.
                  </td>
                  <td className="prolper-cell">
                    No revenue share for referring service providers.
                  </td>
                </tr>
                <tr>
                  <td className="criteria-cell">Accountability for Service Quality</td>
                  <td className="comparison-cell">
                    No implications for poor service quality.
                  </td>
                  <td className="prolper-cell">
                    Businesses may be delisted after a thorough investigation.
                  </td>
                </tr>
                <tr>
                  <td className="criteria-cell">Data Security</td>
                  <td className="comparison-cell">
                    Customer information could be at risk.
                  </td>
                  <td className="prolper-cell">
                    Prolper doesn't share customer information with service
                    providers.
                  </td>
                </tr>
                <tr>
                  <td className="criteria-cell">Availability</td>
                  <td className="comparison-cell">
                    The service provider's availability on the required day and time
                    is not guaranteed.
                  </td>
                  <td className="prolper-cell">
                    Availability isn't an issue as service calls are shared with
                    multiple providers simultaneously.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="row align-items-start g-5">
            <div className="col-lg-7">
              <h2 className="section-title-teal">We're Here for You!</h2>
              <div className="contact-text-wrapper mt-4">
                <p className="contact-intro fs-5">
                  Got a question? Need support? Just want to share your thoughts? Our
                  friendly team is ready to help! Whether you're looking for
                  information or assistance, we're all ears and eager to connect.
                </p>
                <p className="contact-intro fs-5">
                  Reaching out is simple — just fill out the form or drop us an email.
                  We genuinely value your feedback and strive to respond promptly
                  because <strong className="teal-accent">your satisfaction is our top priority.</strong>
                </p>
                <p className="contact-intro fs-5">
                  Don't hesitate — get in touch today! We can't wait to hear from you
                  and provide the support you need.
                </p>
              </div>

              {/* Newsletter Section component will inherit the teal styles from CSS */}
              <div className="mt-5">
                <NewsletterSection />
              </div>
            </div>

            <div className="col-lg-5" id="contact-section">
              <div className="contact-form-card">
                <h3 className="contact-form-title fs-3 fw-bold">Contact Us</h3>
                <p className="contact-form-subtitle mb-4">
                  Email us on <span className="teal-accent fw-bold">contact@prolper.com</span> or submit your question below.
                </p>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control minimal-input"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control minimal-input"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control minimal-input"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      className="form-control minimal-input"
                      rows="4"
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="teal-submit-btn w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="legal-button-wrapper text-center mt-5">
            <Link to="/legal" className="legal-link-minimal">
              Legal Information
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pro-footer-dark">
        <div className="container">
          <div className="footer-main-row">
            {/* Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo-link">
                {/* Logo is kept in its natural style/black */}
                <img src={logo} alt="Prolper" className="logo-black" />
              </Link>
              <p className="footer-mini-text">
                Streamlining services with intelligent matching.
              </p>
            </div>

            {/* Social Links - Distinct and visible */}
            <div className="footer-social-group">
              <Link to="https://facebook.com/Prolper/" target="_blank" className="social-btn">
                <img src={facebook} alt="Facebook" />
              </Link>
              <Link to="https://linkedin.com/company/prolper" target="_blank" className="social-btn">
                <img src={linkedin} alt="LinkedIn" />
              </Link>
              <Link to="https://instagram.com/prolperapp/" target="_blank" className="social-btn">
                <img src={instagram} alt="Instagram" />
              </Link>
              <Link to="https://x.com/ProlperApp" target="_blank" className="social-btn">
                <img src={twitter} alt="X" className="x-icon-style" />
              </Link>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-copyright">
              © 2026 Prolper. All rights reserved.
            </div>
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

export default Home;
// import React, { useState } from "react";
// import bannerImg from "/banner1.png";
// import qrImg from "/QR.png";
// import App from "/app.png";
// import Play from "/play.png";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import hiwImg from "/hiw.png";
// import linkedin from "./../../assets/in.png";
// import facebook from "./../../assets/Vector.png";
// import instagram from "./../../assets/insta.png";
// import twitter from "./../../assets/x.png";
// import socialLogo from "/social-white.png";
// import logo from "/prolper-cropped.svg";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { db } from "../../firebase"; // Adjust the path as necessary
// import { collection, addDoc } from "firebase/firestore";
// import NewsletterSection from "./Newsletter";
// import axios from "axios";

// const Home = () => {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [nemail, setNEmail] = useState("");

//   const handleNewsletterSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     try {
//       await addDoc(collection(db, "newsletters"), {
//         nemail,
//       });
//       alert("Email subscribed successfully!");
//       setNEmail(""); // Clear the input field after submission
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Error subscribing. Please try again.");
//     }
//   };

//   const testimonials = [
//     {
//       name: "Amit",
//       role: "Electrician",
//       image: "https://randomuser.me/api/portraits/men/1.jpg",
//       review:
//         "Prolper only sends me requests I can actually take. Accepting jobs through the app is simple, and it keeps my schedule organized and productive.",
//       rating: 5,
//     },
//     {
//       name: "Sofia",
//       role: "Bakery Owner",
//       image: "https://randomuser.me/api/portraits/women/2.jpg",
//       review:
//         "Since joining Prolper, more people have discovered our bakery. The app helped us reach new customers we wouldn't have found otherwise!",
//       rating: 5,
//     },
//     {
//       name: "David",
//       role: "Handyman",
//       image: "https://randomuser.me/api/portraits/men/3.jpg",
//       review:
//         "Prolper has been great for my business — the service requests I accept turn into real jobs, and my income has increased significantly!",
//       rating: 5,
//     },
//     {
//       name: "Emma",
//       role: "Musician",
//       image: "https://randomuser.me/api/portraits/women/4.jpg",
//       review:
//         "The in-app chat on Prolper makes it so easy to confirm sessions without sharing personal contact info. Everything is quick, clear, and professional!",
//       rating: 5,
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 2 },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "contacts"), {
//         name,
//         mobile,
//         email,
//         message,
//       });
//       alert("Message sent successfully!");
//       // Clear the form
//       setName("");
//       setMobile("");
//       setEmail("");
//       setMessage("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Error sending message. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div className=" flex justify-center items-center   mt-5 px-5">
//         {/* Text Container */}
//         <div
//           className="relative bg-white rounded-lg shadow-lg max-w-lg"
//           style={{ padding: "30px" }} // Increased inner padding
//         >
//           <p
//             className="text-gray-800 fs-5 text-right"
//             style={{ fontSize: "22px", lineHeight: "1.8", textAlign: "left" }} // Increased text size and line spacing
//           >
//             In today’s overwhelming digital landscape, finding reliable service
//             providers can be a daunting task. With countless search engines,
//             referrals, ratings, and reviews, it often feels impossible to
//             identify trustworthy businesses that genuinely meet your needs when
//             you need them most. <br />
//             <strong>Solution is Prolper—</strong> An innovative app designed
//             to connect customers and service providers in real time, on your
//             desired date and time or whenever you need them. Our mission is to
//             simplify the search process, making it easier than ever to connect
//             with the right professionals for any requirement. Join Prolper
//             today for free and experience a new level of convenience in finding
//             the services you need in real time, whenever you need them!
//           </p>
//         </div>
//       </div>
//       {/* Banner & QR Code */}
//       {/* <div className="text-center mt-5">
//         <img className=" img-fluid" src={qrImg} alt="QR Code"  />
//       </div> */}
//       <div className="container my-3">
//         <div className="row text-center">
//           <div className="col-md-6 mb-4">
//             <div className="p-4 shadow rounded-4 h-100">
//               <h4 className="fw-bold mb-4 fs-2">Are you a Customer?</h4>
//               <div className="mb-3">
//                 <img src={App} alt="App Store" className="img-fluid" />
//               </div>
//               <div
//                 className="mb-3 p-4 text-center"
//               >
//                 <h5 className="text-muted fw-bold fs-4">Coming Soon</h5>
//               </div>

//               <div className="mb-3">
//                 <img src={Play} alt="Google Play" className="img-fluid" />
//               </div>
//               <div
//                 className="mb-3 p-4 text-center"
//               >
//                 <h5 className="text-muted fw-bold fs-4">Coming Soon</h5>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6 mb-4">
//             <div className="p-4 shadow rounded-4 h-100">
//               <h4 className="fw-bold mb-4 fs-2">Are you a Business?</h4>
//               <div className="mb-3">
//                 <img src={App} alt="App Store" className="img-fluid" />
//               </div>
//               <div
//                 className="mb-3 p-4 text-center"
//               >
//                 <h5 className="text-muted fw-bold fs-4">Coming Soon</h5>
//               </div>
//               <div className="mb-3">
//                 <img src={Play} alt="Google Play" className="img-fluid" />
//               </div>
//               <div
//                 className="mb-3 p-4 text-center"
//               >
//                 <h5 className="text-muted fw-bold fs-4">Coming Soon</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Testimonial Slider */}
//       <div
//         className="bg-dark text-white mt-5"
//         style={{ color: "#fff", marginBottom: "1rem" }}
//       >
//         <h3 className="text-center pt-5 pb-0 px-1 fs-2">
//           What Our Members Say About Us:
//         </h3>
//         <div
//           className="container"
//           style={{ position: "relative", paddingBottom: "40px" }}
//         >
//           <style>
//             {`
//           .slick-dots li {
//             margin: 0 5px; /* Optional: Add some spacing between dots */
//           }
//           .slick-dots li button {
//             background-color: grey !important; /* Change the background color of the dots */
//             border-radius: 100%; /* Make the dots circular */
//             width: 20px; /* Set the width of the dots */
//             height: 18px; /* Set the height of the dots */
//             padding: 0; /* Remove padding */
//             border: none; /* Remove border */
//           }
//           .slick-dots li.slick-active button {
//             background-color: darkgrey !important; /* Change the active dot color if needed */
//           }
//         `}
//           </style>
//           <Slider {...settings}>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="p-2">
//                 <div className="bg-white text-dark rounded-lg shadow-lg p-5 rounded ">
//                   <div className="d-flex align-items-flex-start">
//                     <img
//                       width={80}
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       className="rounded-full mb-3 rounded-circle"
//                     />
//                     <div>
//                       <div className="d-flex">
//                         <h4 className="text font-bold ms-2">
//                           {testimonial.name}
//                         </h4>
//                         <div className="flex justify-center my-1 ms-2">
//                           {"★".repeat(testimonial.rating)}
//                           {"☆".repeat(5 - testimonial.rating)}
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-sm ms-2">
//                         {testimonial.role}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-gray-800 text-sm">
//                     "{testimonial.review}"
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//           <div></div>
//         </div>
//       </div>
//       <div className="text-center mt-5" id="how-section">
//         <h3 className="text-center pb-3 fs-2 fw-bold">How It Works</h3>
//         <p className="fs-5">
//           At Prolper, our mission is to Simplify your search for service
//           providers. After signing up, <br />
//           you can easily book the services you need in just a few simple steps:
//         </p>
//       </div>
//       <div className="bg-white py-10 px-4">
//         <div className="container ">
//           <div className="row text-center">
//             {/* Step 1 */}
//             <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
//               <div className="d-flex flex-column align-items-center text-center w-100">
//                 <div
//                   className="d-flex align-items-center justify-content-center text-white rounded-circle"
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     backgroundColor: "#45C824",
//                   }}
//                 >
//                   Step-1
//                 </div>

//                 <h4 className="fw-bold mt-1 fs-5">Choose Your Service</h4>
//                 <p className="mt-1 fs-5">
//                   Select the service you require, along with your preferred
//                   location, date, and time.
//                 </p>
//               </div>
//             </div>
//             {/* Step 2 */}
//             <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
//               <div className="d-flex flex-column align-items-center text-center w-100">
//                 <div
//                   className="d-flex align-items-center justify-content-center text-white rounded-circle"
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     backgroundColor: "#45C824",
//                   }}
//                 >
//                   Step-2
//                 </div>{" "}
//                 <h4 className="fw-bold mt-1 fs-5">Find Your Match</h4>
//                 <p className="mt-1 fs-5">
//                   Our AI-driven algorithm will quickly identify the best-suited
//                   service provider for your needs.
//                 </p>
//               </div>
//               {/* <div className="d-none d-lg-block mt-3">
//         <h2>→</h2>
//       </div> */}
//             </div>

//             {/* Step 3 */}
//             <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
//               <div className="d-flex flex-column align-items-center text-center w-100">
//                 <div
//                   className="d-flex align-items-center justify-content-center text-white rounded-circle"
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     backgroundColor: "#45C824",
//                   }}
//                 >
//                   Step-3
//                 </div>
//                 <h4 className="fw-bold text-center mt-1 fs-5">
//                   Connect and Decide
//                 </h4>
//                 <p className="mt-1 fs-5">
//                   Once your service request is accepted, you can communicate
//                   directly with the service provider under the ‘Activity’ tab
//                   through Chat feature. Discuss your requirements, and decide
//                   whether to proceed or cancel the request.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className="container-fluid text-white py-5 mt-5 mb-0"
//         style={{ backgroundColor: "#111827" }}
//       >
//         <div className="container">
//           <h4 className="text pb-3 fs-2 fw-bold">What makes us different:</h4>
//           <ul className="list-unstyled mt-3">
//             <li>
//               <h4>
//                 <strong className="fs-4">AI-Driven Algorithm: </strong>
//                 <span className="fs-5">
//                   Prolper utilizes an advanced AI algorithm to analyze
//                   customer reviews and feedback.
//                 </span>
//               </h4>
//             </li>
//             <li>
//               <h5>
//                 <strong className="fs-4">Data Collection:</strong>
//                 <span className="fs-5">
//                   {" "}
//                   The platform collects real-time data from verified users who
//                   have engaged with service providers.
//                 </span>
//               </h5>
//             </li>
//             <li>
//               <h5>
//                 <strong className="fs-4">Recommendation Generation:</strong>
//                 <span className="fs-5">
//                   {" "}
//                   Based on the analysis, Prolper generates unbiased
//                   recommendations tailored to user needs.
//                 </span>
//               </h5>
//             </li>
//             <li>
//               <h5>
//                 <strong className="fs-4">Quality Assurance:</strong>
//                 <span className="fs-5">
//                   {" "}
//                   The platform conducts thorough investigations into service
//                   provider performance and can delist those with consistent
//                   negative feedback.
//                 </span>
//               </h5>
//             </li>
//             <li>
//               <h5>
//                 <strong className="fs-4">Privacy Protection:</strong>
//                 <span className="fs-5">
//                   {" "}
//                   Prolper ensures that user data remains confidential and is
//                   not shared with service providers.
//                 </span>
//               </h5>
//             </li>
//             <li>
//               <h5>
//                 <strong className="fs-4">User Feedback Loop:</strong>
//                 <span className="fs-5">
//                   {" "}
//                   Users can continuously provide feedback, helping to refine the
//                   recommendations and maintain service quality.
//                 </span>
//               </h5>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* About Us  */}
//       <div className="container my-5 px-5" id="about-us">
//         {/* About Us Heading */}
//         <h1 className="text-center fw-bold mb-5">About Us</h1>

//         {/* Description */}
//         <p className="text-start mt-2 fs-5">
//           With just a couple of clicks, our advanced AI-based algorithm quickly
//           identifies the best available service providers tailored to your
//           preferred location, date, and time. Whether you’re in need of an
//           electrician, plumber, baker, private tutor, realtor or mover,
//           Prolper has you covered with more than 150 service categories.
//         </p>

//         <p className="text-start mb-0 fs-5">
//           This table highlights the distinctions between a Referral/online
//           Search and Prolper.
//         </p>

//         {/* Table Section */}
//         <div className="table-responsive">
//           <table className="table table-bordered text-center align-middle fs-5">
//             <thead className="table ">
//               <tr style={{ backgroundColor: "#363445", color: "white" }}>
//                 <th
//                   style={{
//                     backgroundColor: "#363445",
//                     color: "white",
//                     padding: "10px",
//                   }}
//                 >
//                   Criteria
//                 </th>
//                 <th
//                   style={{
//                     backgroundColor: "#363445",
//                     color: "white",
//                     padding: "10px",
//                   }}
//                 >
//                   Referral/Online Search
//                 </th>
//                 <th
//                   style={{
//                     backgroundColor: "#363445",
//                     color: "white",
//                     padding: "10px",
//                   }}
//                 >
//                   Prolper
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td style={{ backgroundColor: "#76c8c8", color: "black" }}>
//                   Potential for Misleading Information
//                 </td>
//                 <td style={{ backgroundColor: "#F0F0F0", color: "black" }}>
//                   May be misleading and/or fake.
//                 </td>
//                 <td style={{ backgroundColor: "white", color: "black" }}>
//                   Provides unbiased referrals based on an AI-driven algorithm.
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ backgroundColor: "#76c8c8", color: "black" }}>
//                   Source of Rating
//                 </td>
//                 <td style={{ backgroundColor: "#F0F0F0", color: "black" }}>
//                   May not be Rated by a verified customer.
//                 </td>
//                 <td style={{ backgroundColor: "white", color: "black" }}>
//                   Ratings are given exclusively by real customers.
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ backgroundColor: "#76c8c8", color: "black" }}>
//                   Monetary Incentives
//                 </td>
//                 <td style={{ backgroundColor: "#F0F0F0", color: "black" }}>
//                   Referrers may earn commissions for service referrals.
//                 </td>
//                 <td style={{ backgroundColor: "white", color: "black" }}>
//                   No revenue share for referring service providers.
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ backgroundColor: "#76c8c8", color: "black" }}>
//                   Accountability for Service Quality
//                 </td>
//                 <td style={{ backgroundColor: "#F0F0F0", color: "black" }}>
//                   No implications for poor service quality.
//                 </td>
//                 <td style={{ backgroundColor: "white", color: "black" }}>
//                   Businesses may be delisted after a thorough investigation.
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ backgroundColor: "#76c8c8", color: "black" }}>
//                   Data Security
//                 </td>
//                 <td style={{ backgroundColor: "#F0F0F0", color: "black" }}>
//                   Customer information could be at risk.
//                 </td>
//                 <td style={{ backgroundColor: "white", color: "black" }}>
//                   Prolper doesn't share customer information with service
//                   providers.
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ backgroundColor: "#76c8c8", color: "black" }}>
//                   Availability
//                 </td>
//                 <td style={{ backgroundColor: "#F0F0F0", color: "black" }}>
//                   The service provider’s availability on the required day and
//                   time is not guaranteed.
//                 </td>
//                 <td style={{ backgroundColor: "white", color: "black" }}>
//                   Availability isn’t an issue as service calls are shared with
//                   multiple providers simultaneously.
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div
//         className="container-fluid text-white py-5 mt-5"
//         style={{ backgroundColor: "#111827" }}
//       >
//         <div className="container">
//           <div className="row align-items-center mt-5">
//             {/* Left Section - Contact Information */}
//             <div className="col-12 col-md-8 d-flex flex-column justify-content-between">
//               <h3 className="fw-bold fs-2 mt-5">We’re Here for You!</h3>
//               <p className="fs-5">
//                 Got a question? Need support? Just want to share your thoughts?
//                 Our friendly team is ready to help! Whether you’re looking for
//                 information or assistance, we’re all ears and eager to connect.
//               </p>
//               <p className="fs-5">
//                 Reaching out is simple - just fill out the form or drop us an
//                 email. We genuinely value your feedback and strive to respond
//                 promptly because <b>your satisfaction is our top priority.</b>
//               </p>
//               <p className="fs-5">
//                 Don’t hesitate - get in touch today! We can’t wait to hear from
//                 you and provide the support you need.
//               </p>

//               <NewsletterSection />
//               {/* Subscribe newsletter  */}
//               {/* <div className="row align-items-center text-center text-md-start w-100 px-0 py-0 pt-5" style={{ marginTop: "0rem", marginTop: window.innerWidth >= 768 ? "5rem" : "0rem",}}>
//                 <div className="col-12 col-md-auto mb-3 mb-md-0">
//                   <h5 className="m-0">
//                     <b className="fs-5">Subscribe to our newsletter:</b>
//                   </h5>
//                 </div>
//                 <div className="col-6 col-md text-center pb-3 fs-2 fw-bold">
//                   <form
//                     className="d-flex flex-wrap align-items-center gap-2 w-100 justify-content-center justify-content-md-start"
//                     onSubmit={handleNewsletterSubmit}
//                   >
//                     <input
//                       className="form-control w-100 w-md-auto"
//                       type="email"
//                       placeholder="Enter a valid email address"
//                       aria-label="Submit"
//                       value={nemail}
//                       onChange={(e) => setNEmail(e.target.value)}
//                       required
//                       style={{ minWidth: "0px", maxWidth: "400px" }}
//                     />
//                     <button className="btn btn-success px-4" type="submit">
//                       Submit
//                     </button>
//                   </form>
//                 </div>
//               </div> */}
//             </div>

//             {/* Right Section - Contact Form */}
//             <div className="col-12 col-md-4" id="contact-section">
//               <h3 className="text-center pb-3 fs-2 fw-bold">Contact Us</h3>
//               <div className="bg-white text-dark p-4 rounded-4 shadow">
//                 <form onSubmit={handleSubmit}>
//                   <p className="text-center text-dark fs-5">
//                     Email us on <b>contact@prolper.com</b> or Submit your question
//                     here.
//                   </p>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Your Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Mobile Number"
//                       value={mobile}
//                       onChange={(e) => setMobile(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <textarea
//                       className="form-control"
//                       rows="4"
//                       placeholder="Message"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                     ></textarea>
//                   </div>
//                   <div className="d-flex justify-content-center">
//                     <button type="submit" className="btn btn-success px-4">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           {/* Subscribe to newsletter */}
//           <div className="row align-items-center text-center text-md-start w-100 px-3 py-3 pt-5">
//             {/* Left-aligned heading */}
//             {/* <div className="col-12 col-md-auto mb-3 mb-md-0">
//               <h5 className="m-0">
//                 <b className="fs-5">Subscribe to our newsletter:</b>
//               </h5>
//             </div> */}

//             {/* Center-aligned form */}
//             {/* <div className="col-12 col-md flex-grow-1 d-flex justify-content-center">
//               <form
//                 className="d-flex flex-wrap align-items-center gap-2 w-100 justify-content-center justify-content-md-start"
//                 onSubmit={handleNewsletterSubmit}
//               >
//                 <input
//                   className="form-control w-100 w-md-auto"
//                   type="email"
//                   placeholder="Enter a valid email address"
//                   aria-label="Submit"
//                   value={nemail}
//                   onChange={(e) => setNEmail(e.target.value)}
//                   required
//                   style={{ minWidth: "250px", maxWidth: "450px" }}
//                 />
//                 <button className="btn btn-success px-4" type="submit">
//                   Submit
//                 </button>
//               </form>
//             </div> */}

//             {/* Right-aligned Legal button */}
//             <div className="col-12 col-md-auto mt-2 mt-md-0 d-flex justify-content-center justify-content-md-start">
//               <Link
//                 to="/legal"
//                 className="btn"
//                 style={{
//                   backgroundColor: "white",
//                   color: "black",
//                   border: "1px solid #28a745",
//                 }}
//               >
//                 Legal
//               </Link>
//             </div>
//           </div>

//           {/* Footer Section */}
//           {/* <footer
//             className="text-center text-white py-4 pt-5 pb-3 mt-0 d-flex justify-content-around align-items-center"
//             style={{ backgroundColor: "#111827" }}
//           >
//             <Link className="navbar-brand mx-5" to="/">
//               <img src={logo} alt="Logo" width="200" height="40" />
//             </Link>
//             <p>© 2025 Prolper. All rights reserved.</p>
//             <li className="nav-item d-flex">
//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://www.facebook.com/login"
//                 target="_blank"
//               >
//                 <img
//                   className="ms-2"
//                   src={facebook}
//                   alt="Facebook"
//                   width="30"
//                   height="30"
//                 />
//               </Link>

//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://www.linkedin.com/login"
//                 target="_blank"
//               >
//                 <img
//                   className="ms-2"
//                   src={linkedin}
//                   alt="LinkedIn"
//                   width="30"
//                   height="30"
//                 />
//               </Link>

//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://www.instagram.com/accounts/login"
//                 target="_blank"
//               >
//                 <img
//                   className="ms-2"
//                   src={instagram}
//                   alt="Instagram"
//                   width="30"
//                   height="30"
//                 />
//               </Link>

//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://twitter.com/login"
//                 target="_blank"
//               >
//                 <img
//                   className="ms-2"
//                   src={twitter}
//                   style={{ filter: "grayscale(100%)" }}
//                   alt="X"
//                   width="30"
//                   height="30"
//                 />
//               </Link>
//             </li>
//           </footer> */}
//           <footer
//             className="text-center text-white py-4 pt-5 pb-3 mt-0 d-flex flex-wrap justify-content-evenly  align-items-center px-3"
//             style={{ backgroundColor: "#111827" }}
//           >
//             {/* Logo on the left */}
//             <Link className="navbar-brand mb-3 mb-md-0" to="/">
//               <img src={logo} alt="Logo" height="60" style={{width: 'auto'}} />
//             </Link>

//             {/* Centered Copyright Text with Links */}
//             <div className="mb-3 mb-md-0 text-white text-center flex-grow-1">
//               <p className="mb-2">© 2025 Prolper. All rights reserved.</p>
//               <div className="footer-links">
//                 <Link to="/privacy-policy" className="text-white text-decoration-none">
//                   Privacy Policy
//                 </Link>
//               </div>
//             </div>

//             {/* Social Media Icons */}
//             <ul className="nav d-flex justify-content-center gap-3">
//               {/* Facebook */}
//               <li>
//                 <Link
//                   to="https://www.facebook.com/Prolper/"
//                   target="_blank"
//                 >
//                   <img src={facebook} alt="Facebook" width="30" height="30" />
//                 </Link>
//               </li>

//               {/* LinkedIn */}
//               <li>
//                 <Link
//                   to="https://www.linkedin.com/company/prolper"
//                   target="_blank"
//                 >
//                   <img src={linkedin} alt="LinkedIn" width="30" height="30" />
//                 </Link>
//               </li>

//               {/* Instagram */}
//               <li>
//                 <Link
//                   to="https://www.instagram.com/prolperapp/"
//                   target="_blank"
//                 >
//                   <img src={instagram} alt="Instagram" width="30" height="30" />
//                 </Link>
//               </li>

//               {/* X (formerly Twitter) */}
//               <li>
//                 <Link to="https://x.com/ProlperApp" target="_blank">
//                   <img
//                     src={twitter}
//                     style={{ filter: "grayscale(100%)" }}
//                     alt="X"
//                     width="30"
//                     height="30"
//                   />
//                 </Link>
//               </li>
//             </ul>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


