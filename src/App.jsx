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

import React, { useState, useEffect, useCallback } from "react";
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
import Social from "./pages/Social/Social";
import Privacy from "./pages/Privacy/Privacy";
import logo from "/prolper-cropped.svg";
import linkedin from "./assets/in.png";
import facebook from "./assets/Vector.png";
import instagram from "./assets/insta.png";
import twitter from "./assets/x.png";
import "./App.css";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/social" element={<Social />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
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

  // Handle scroll state for styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ios-nav ${isScrolled ? "nav-scrolled" : ""}`}>
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
              <a href="#about-us" className="nav-link ios-link" onClick={(e) => handleNavigateAndScroll(e, "about-us")}>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="#how-section" className="nav-link ios-link" onClick={(e) => handleNavigateAndScroll(e, "how-section")}>
                How It Works
              </a>
            </li>

            <li className="nav-item px-lg-2">
              <div className="ios-social-wrapper">
                <SocialIcon url="https://facebook.com/Prolper" icon={facebook} alt="Facebook" />
                <SocialIcon url="https://linkedin.com/company/prolper" icon={linkedin} alt="LinkedIn" />
                <SocialIcon url="https://instagram.com/prolperapp" icon={instagram} alt="Instagram" />
                <SocialIcon url="https://x.com/ProlperApp" icon={twitter} alt="X" isX />
              </div>
            </li>

            <li className="nav-item">
              <a href="#contact" className="btn ios-cta-glass" onClick={(e) => handleNavigateAndScroll(e, "contact-section")}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}



export default App;