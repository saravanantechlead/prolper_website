// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useNavigate,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import Legal from "./pages/HowItWorks/HowItWorks";
// import Social from "./pages/Social/Social";
// import Privacy from "./pages/Privacy/Privacy";
// import logo from "/prolper-cropped.svg";
// import linkedin from "./assets/in.png";
// import facebook from "./assets/Vector.png";
// import instagram from "./assets/insta.png";
// import twitter from "./assets/x.png";
// import socialLogo from "/social-white.png";
// import "./App.css";

// function App() {
//   return (
//     <Router basename="/">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/legal" element={<Legal />} />
//         <Route path="/social" element={<Social />} />
//         <Route path="/privacy-policy" element={<Privacy />} />
//         {/* Redirect old path to new privacy-policy route */}
//         <Route
//           path="/privacy"
//           element={<Navigate to="/privacy-policy" replace />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleContactClick = (e) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById("contact-section");
//         if (section) {
//           window.scrollTo({
//             top: section.offsetTop - 100, // Adjust for proper alignment
//             behavior: "smooth",
//           });
//         }
//       }, 500);
//     } else {
//       const section = document.getElementById("contact-section");
//       if (section) {
//         window.scrollTo({
//           top: section.offsetTop - 100,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   const handleHowClick = (e) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById("how-section");
//         if (section) {
//           window.scrollTo({
//             top: section.offsetTop - 100, // Adjust this value for proper alignment
//             behavior: "smooth",
//           });
//         }
//       }, 500);
//     } else {
//       const section = document.getElementById("how-section");
//       if (section) {
//         window.scrollTo({
//           top: section.offsetTop - 100,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   const handleAboutClick = (e) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById("about-us");
//         if (section) {
//           window.scrollTo({
//             top: section.offsetTop - 100, // Adjust for proper alignment
//             behavior: "smooth",
//           });
//         }
//       }, 500);
//     } else {
//       const section = document.getElementById("about-us");
//       if (section) {
//         window.scrollTo({
//           top: section.offsetTop - 100,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-evenly align-items-baseline navbar-dark bg-dark sticky-top">
//       <div className="container-fluid align-items-baseline">
//         <Link
//           className="navbar-brand"
//           to="/"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           <img src={logo} alt="Logo" height="50" style={{width: 'auto', margin: "0 20px", padding:"5px 0"}} />
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarText"
//           aria-controls="navbarText"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse text-center" id="navbarText">
//           {/* <ul className="navbar-nav mb-2 mb-lg-0 align-items-baseline navLink"> */}
//           <ul className="navbar-nav d-flex flex-wrap justify-content-center align-items-center gap-3 navLink">
//             <li className="nav-item mx-auto">
//               {/* <Link className="nav-link active my-text" to="/about">
//                 About
//               </Link> */}
//               <a
//                 className="nav-link my-text"
//                 href="/"
//                 onClick={handleAboutClick}
//               >
//                 About Us
//               </a>
//             </li>
//             <li
//               className="nav-item"
//               // style={{ marginLeft: "13rem", marginRight: "4rem" }}
//             >
//               <a className="nav-link my-text" href="/" onClick={handleHowClick}>
//                 How It Works
//               </a>
//             </li>

//             {/* <li className="nav-item">
//               <Link className="nav-link mx-5 fs-4" to="/social">
//                 <img
//                   className="ms-2"
//                   src={socialLogo}
//                   alt="Logo"
//                   width="100"
//                   height="20"
//                 />
//               </Link>
//             </li> */}
//             {/* <li className="mx-auto nav-item d-flex justify-content-center"> */}
//             <li className="nav-item mx-auto d-flex align-items-center gap-0">
//               {/* Facebook */}
//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://www.facebook.com/Prolper/"
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

//               {/* LinkedIn */}
//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://www.linkedin.com/company/prolper"
//                 target="_blank"
//               >
//                 <img
//                   className="ms-2"
//                   // src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
//                   src={linkedin}
//                   alt="LinkedIn"
//                   width="30"
//                   height="30"
//                 />
//               </Link>

//               {/* Instagram */}
//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://www.instagram.com/prolperapp/"
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

//               {/* X (formerly Twitter) */}
//               <Link
//                 className="nav-link mx-2 fs-4"
//                 to="https://x.com/ProlperApp"
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
//             <li className="nav-item">
//               <a
//                 className="nav-link my-text"
//                 href="/"
//                 onClick={handleContactClick}
//               >
//                 Contact Us
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useNavigate,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import Legal from "./pages/HowItWorks/HowItWorks";
// import Social from "./pages/Social/Social";
// import Privacy from "./pages/Privacy/Privacy";
// import logo from "/prolper-cropped.svg";
// import linkedin from "./assets/in.png";
// import facebook from "./assets/Vector.png";
// import instagram from "./assets/insta.png";
// import twitter from "./assets/x.png";
// import "./App.css";

// function App() {
//   return (
//     <Router basename="/">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/legal" element={<Legal />} />
//         <Route path="/social" element={<Social />} />
//         <Route path="/privacy-policy" element={<Privacy />} />
//         <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Unified scroll handler to reduce code repetition
//   const scrollToSection = (e, sectionId) => {
//     e.preventDefault();
//     const action = () => {
//       const section = document.getElementById(sectionId);
//       if (section) {
//         window.scrollTo({
//           top: section.offsetTop - 80, // Adjust for sticky nav height
//           behavior: "smooth",
//         });
//       }
//     };

//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(action, 500);
//     } else {
//       action();
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark sticky-top premium-nav">
//       <div className="container">
//         {/* Logo Section */}
//         <Link className="navbar-brand" to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//           <img src={logo} alt="Prolper" className="nav-logo" />
//         </Link>

//         {/* Mobile Toggle */}
//         <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Links Section */}
//         <div className="collapse navbar-collapse" id="navbarContent">
//           <ul className="navbar-nav ms-auto align-items-center gap-lg-4">
//             <li className="nav-item">
//               <a className="nav-link nav-custom-link" href="/" onClick={(e) => scrollToSection(e, "about-us")}>
//                 About Us
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link nav-custom-link" href="/" onClick={(e) => scrollToSection(e, "how-section")}>
//                 How It Works
//               </a>
//             </li>

//             {/* Social Icons Group */}
//             <li className="nav-item d-flex align-items-center gap-3 px-lg-3 py-3 py-lg-0">
//               <SocialLink url="https://www.facebook.com/Prolper/" icon={facebook} alt="FB" />
//               <SocialLink url="https://www.linkedin.com/company/prolper" icon={linkedin} alt="IN" />
//               <SocialLink url="https://www.instagram.com/prolperapp/" icon={instagram} alt="IG" />
//               <SocialLink url="https://x.com/ProlperApp" icon={twitter} alt="X" isX />
//             </li>

//             {/* CTA Button */}
//             <li className="nav-item">
//               <a className="btn btn-contact-cta" href="/" onClick={(e) => scrollToSection(e, "contact-section")}>
//                 Contact Us
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // Helper component for social links
// const SocialLink = ({ url, icon, alt, isX }) => (
//   <Link to={url} target="_blank" className="social-icon-wrapper">
//     <img src={icon} alt={alt} style={isX ? { filter: "grayscale(100%) brightness(2)" } : {}} />
//   </Link>
// );

// export default App;

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Legal from "./pages/HowItWorks/Legal";
import LegalPage from "./pages/Legal/LegalPage";
import AppDownload from "./pages/AppDownload/AppDownload";
import BecomeProvider from "./pages/BecomeProvider/BecomeProvider";
import ServiceLanding from "./pages/ServiceLanding/ServiceLanding";
import Social from "./pages/Social/Social";
import Privacy from "./pages/Privacy/Privacy";
import logo from "/prolper-cropped.svg";
import MobileAppBar from "./components/MobileAppBar/MobileAppBar";
import linkedin from "./assets/in.png";
import facebook from "./assets/Vector.png";
import instagram from "./assets/insta.png";
import twitter from "./assets/x.png";
import "./App.css";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <MobileAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/social" element={<Social />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/legal/:type" element={<LegalPage />} />
        <Route path="/app"         element={<AppDownload appType="customer" />} />
        <Route path="/get-app"     element={<AppDownload appType="business" />} />
        <Route path="/become-a-provider" element={<BecomeProvider />} />
        <Route path="/service/:id" element={<ServiceLanding />} />
      </Routes>
    </Router>
  );
}

// Optimized Social Icon Component
const SocialIcon = React.memo(({ url, icon, alt, isX }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`ios-social-icon ${isX ? "is-x" : ""}`}
    aria-label={alt}
  >
    <img src={icon} alt={alt} loading="lazy" />
  </a>
));

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Handle scroll state for styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavigateAndScroll = useCallback((e, sectionId) => {
    e.preventDefault();
    const wasMenuOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false); // Close mobile menu on click

    const action = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      // Measure the real (collapsed) navbar height so this works on any device.
      const nav = document.querySelector(".ios-nav");
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 90;
      const gap = 18;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY+40;
      const available = window.innerHeight - navBottom - gap;

      // Sections that fit the screen get centered in view; taller sections
      // align just under the navbar so their top is fully visible.
      let target;
      if (rect.height <= available) {
        target = sectionTop - navBottom - Math.max(gap, (available - rect.height) / 2);
      } else {
        target = sectionTop - navBottom - gap;
      }

      window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(action, 520);
    } else {
      // Give the mobile menu time to collapse before measuring the navbar.
      setTimeout(action, wasMenuOpen ? 340 : 30);
    }
  }, [location.pathname, navigate, isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Hide site navbar on standalone pages
  if (
    ["/privacy-policy", "/privacy", "/app"].includes(location.pathname) ||
    location.pathname.startsWith("/legal/")
  ) return null;

  return (
    <nav ref={navRef} className={`navbar navbar-expand-xl fixed-top ios-nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <div className="container">
        <Link 
          className="navbar-brand" 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={logo} alt="Prolper Logo" className="ios-logo" />
        </Link>

        <button
          className={`navbar-toggler ${isMobileMenuOpen ? "" : "collapsed"}`}
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="ios-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="iosNavbar">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a href="#how-it-works" className="nav-link ios-link" onClick={(e) => handleNavigateAndScroll(e, "how-it-works")}>
                How it works
              </a>
            </li>
            <li className="nav-item">
              <a href="#why-us" className="nav-link ios-link" onClick={(e) => handleNavigateAndScroll(e, "why-us")}>
                Why us
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact-section" className="nav-link ios-link" onClick={(e) => handleNavigateAndScroll(e, "contact-section")}>
                Contact us
              </a>
            </li>

            <li className="nav-item">
              <div className="ios-social-group">
                <SocialIcon url="https://www.facebook.com/Prolperapp" icon={facebook} alt="Facebook" />
                <SocialIcon url="https://www.instagram.com/prolperapp" icon={instagram} alt="Instagram" />
                <SocialIcon url="https://x.com/ProlperApp" icon={twitter} alt="X" isX />
                <SocialIcon url="https://www.linkedin.com/company/prolper" icon={linkedin} alt="LinkedIn" />
              </div>
            </li>

            <li className="nav-item d-none d-xl-flex align-items-center">
              <div className="ios-nav-divider"></div>
            </li>

            <li className="nav-item">
              <a
                href="#get-app"
                className="btn ios-cta-glass"
                onClick={(e) => handleNavigateAndScroll(e, "get-app")}
              >
                Get the app
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}



export default App;