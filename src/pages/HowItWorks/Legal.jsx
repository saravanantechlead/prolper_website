// // import React from "react";
// import React, { useEffect } from "react";

// const Legal = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0); // Scrolls to the top when the component is mounted
//   }, []);
//   return (
//     <div className="container mt-5">
//       <h1 className="text-center  mb-4">Terms Of Use</h1>
//       <p>
//         These Terms of Use govern your access to and use of our services.
//                 References to "Prolper service," "our service," or "the service"
//         encompass all functionalities, recommendations, reviews, website
//         features, user interfaces, and related content and software.
//       </p>

//       {/* Membership Section */}
//       <section className="mt-4">
//         <p className="">1. Membership</p>
//         <p>
//           1.1 Account Activation: Your Prolper membership remains active until
//           you choose to deactivate your account. Internet access is required to
//           utilize the Prolper service.
//         </p>
//         <p>
//           1.2 Third-Party Services: Prolper may facilitate access to services
//           provided by third parties. We are not responsible for the quality or
//           availability of these services, which may be subject to specific
//           conditions disclosed by the respective service provider.
//         </p>
//       </section>

//       {/* Promotional Offers Section */}
//       <section className="mt-4">
//         <p className="">2. Promotional Offers</p>
//         <p>
//           From time to time, Prolper may present special promotional offers,
//           plans, or memberships. Eligibility for Offers is determined at
//           Prolper’s sole discretion. We reserve the right to revoke Offers or
//           suspend your account if deemed ineligible.
//         </p>
//       </section>

//       {/* Billing and Cancellation */}
//       <section className="mt-4">
//         <p className="">3. Billing and Cancellation</p>
//         <p>
//           3.1 Payment Methods: Prolper does not require a payment method to
//           access its services. Payments are made directly to the service
//           provider based on mutually agreed terms.
//         </p>
//         <p>
//           3.2 Account Cancellation: You may cancel your Prolper account at any
//           time. Your account will be closed automatically within one business
//           day.
//         </p>
//       </section>

//       {/* Prolper Service */}
//       <section className="mt-4">
//         <p className="">4. Prolper Service</p>
//         <p>
//           4.1 Age Requirement: You must be at least 18 years old or the age of
//           majority in your jurisdiction to use Prolper services.
//         </p>
//         <p>
//           4.2 Limited License: Prolper grants you a limited, non-exclusive,
//           non-transferable right to access and use its service.
//         </p>
//         <p>
//           4.3 Geographic Limitations: You may view Prolper content only in the
//           country where your account is established.
//         </p>
//         <p>
//           4.4. Testing and Improvements: Prolper may test various aspects of
//           its services, including website functionality, user interfaces, and
//           promotional features.
//         </p>
//         <p>
//           4.5. Acceptable Use: You agree to use the Prolper service in
//           compliance with all applicable laws and regulations. You must not
//           reproduce, distribute, or modify any content obtained from Prolper
//           without explicit permission. Engaging in automated access or harmful
//           activities will result in termination of service.
//         </p>
//         <p>
//           4.6. Display Quality: The quality of Prolper content may vary
//           depending on the device used and factors such as location and internet
//           connection speed.
//         </p>
//         <p>
//           4.7. Software Updates: Prolper software is developed for authorized
//           use. You may receive automatic updates to Prolper and third-party
//           software as part of your service.
//         </p>
//       </section>

//       <section className="mt-4">
//         <p>5. Account Security</p>
//         <p>
//           The Account Owner is responsible for all activities that occur through
//           the Prolper account. To protect your account, maintain control over
//           devices used for access, and keep your password confidential. You are
//           responsible for updating your account information, and we may suspend
//           or terminate your account to prevent identity theft or fraud.
//         </p>
//       </section>

//       <section className="mt-4">
//         <p>6. Warranties and Limitations on Liability</p>
//         <p>
//           Prolper services are provided “as is” without warranties of any
//           kind. We do not guarantee uninterrupted or error-free service. You
//           waive any claims for special, indirect, or consequential damages,
//           except where prohibited by law.
//         </p>
//       </section>

//       <section className="mt-4">
//         <p>7. Class Action Waiver</p>
//         <p>
//           Where permitted by law, both you and Prolper agree to resolve
//           disputes individually and not as part of a class action or
//           representative proceeding.
//         </p>
//       </section>

//       <section className="mt-4">
//         <p>8. Miscellaneous</p>
//         <p>
//           8.1. Governing Law: These Terms of Use are governed by the laws of
//           Ontario, Canada, without regard to conflict of laws provisions.
//         </p>
//         <p>
//           8.2. Unsolicited Materials: Prolper does not accept unsolicited
//           materials or ideas and is not responsible for similarities to its
//           content.
//         </p>
//         <p>
//           8.3. Customer Support: For service information or account assistance,
//           please visit the “Contact Us” section of our website/app. In some
//           cases, customer support may require remote access to your device,
//           which you can decline.
//         </p>
//         <p>
//           8.4. Survival: If any provision of these Terms is found to be invalid,
//           the remaining provisions shall remain in effect.
//         </p>
//         <p>
//           8.5. Changes to Terms: Prolper may change these Terms of Use with at
//           least 30 days notice before the changes take effect. We may assign our
//           agreement, and you agree to cooperate with such transfers.
//         </p>
//         <p>
//           8.6. Electronic Communications: Prolper will send account-related
//           communications electronically, such as service updates and
//           confirmations, to the email address provided during registration.
//         </p>
//         <p>
//           8.7. User Information: Users agree not to use any information obtained
//           from Prolper for marketing or promotional purposes outside of
//           booking services or rating providers.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Legal;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Legal.css";

import linkedin from "./../../assets/in.png";
import facebook from "./../../assets/Vector.png";
import instagram from "./../../assets/insta.png";
import twitter from "./../../assets/x.png";
import logo from "/prolper-cropped.svg";

const Legal = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on mount
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="container py-4 px-lg-5">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fs-2 fw-bold">Terms of Use</h1>
          <div className="teal-underline mx-auto"></div>
          <p className="fs-6 text-muted mt-3">Governing your access to and use of Prolper services.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <p className="fs-5 lh-base mb-5 text-slate">
              These Terms of Use govern your access to and use of our services.
              References to **"Prolper service," "our service," or "the service"**
              encompass all functionalities, recommendations, reviews, website
              features, user interfaces, and related content and software.
            </p>

            {/* Section: Customer Terms */}
            <div className="legal-section-card mb-4" style={{borderLeft: '4px solid #0e766d'}}>
              <h2 className="fs-4 fw-bold teal-text mb-3">Terms for Customers</h2>
              <p className="fs-6 text-slate mb-3">These terms apply to individuals using the <strong>Prolper Customer App</strong> to find and book local service providers.</p>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Booking Services</h3>
                <p className="fs-6 text-slate">Customers may submit service requests by selecting a category, location, date, and time. Prolper will match the request with available local providers. Acceptance of a request is at the discretion of the provider.</p>
              </div>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Communication</h3>
                <p className="fs-6 text-slate">Customers may chat or call local providers through the Prolper app once a service request is accepted. All communication must remain professional and respectful. Personal contact information should not be exchanged outside the platform.</p>
              </div>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Estimates and Payments</h3>
                <p className="fs-6 text-slate">Customers will receive an estimate from the local provider before the service begins. By accepting an estimate, the customer agrees to the quoted price. Payment is processed securely through the Prolper app upon service completion.</p>
              </div>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Cancellations</h3>
                <p className="fs-6 text-slate">Customers may cancel a service request before it is accepted at no charge. Cancellations after acceptance may be subject to a cancellation fee as agreed with the provider.</p>
              </div>
              <div>
                <h3 className="fs-6 fw-bold text-dark mb-1">Ratings and Reviews</h3>
                <p className="fs-6 text-slate">Customers are encouraged to leave honest ratings and feedback after each service. Ratings must be based on genuine experiences and must not be used to harass or defame providers.</p>
              </div>
            </div>

            {/* Section: Provider Terms */}
            <div className="legal-section-card mb-4" style={{borderLeft: '4px solid #45C824'}}>
              <h2 className="fs-4 fw-bold mb-3" style={{color: '#2d7a2d'}}>Terms for Local Providers</h2>
              <p className="fs-6 text-slate mb-3">These terms apply to individuals and businesses using the <strong>Prolper Business App</strong> to offer services to customers.</p>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Eligibility</h3>
                <p className="fs-6 text-slate">Local providers must be legally authorized to offer the services listed on their profile. Prolper reserves the right to review credentials and may remove providers who misrepresent their qualifications.</p>
              </div>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Accepting Service Requests</h3>
                <p className="fs-6 text-slate">Providers will receive relevant service requests based on their category, location, and availability. Providers may accept or decline requests at their discretion. Consistent non-responsiveness may affect your standing on the platform.</p>
              </div>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Estimates and Payments</h3>
                <p className="fs-6 text-slate">Providers must submit a clear and honest estimate to the customer before commencing work. Once an estimate is accepted, the agreed price is binding unless there is a mutually agreed change in scope. Payments are disbursed through the Prolper app after service completion.</p>
              </div>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">Service Standards</h3>
                <p className="fs-6 text-slate">Providers are expected to deliver services professionally, safely, and as agreed. Prolper may investigate complaints and, after a thorough review, delist providers who consistently receive negative feedback or violate these terms.</p>
              </div>
              <div>
                <h3 className="fs-6 fw-bold text-dark mb-1">Prohibited Conduct</h3>
                <p className="fs-6 text-slate">Providers must not solicit customers to transact outside the Prolper platform, share customer personal information, or engage in any fraudulent or harmful activity. Violations will result in immediate account suspension.</p>
              </div>
            </div>

            {/* Section 1: Membership */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">1</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Membership</h2>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">1.1 Account Activation</h3>
                <p className="fs-6 text-slate">Your Prolper membership remains active until you choose to deactivate your account. Internet access is required to utilize the Prolper service.</p>
              </div>
              <div>
                <h3 className="fs-6 fw-bold text-dark mb-1">1.2 Third-Party Services</h3>
                <p className="fs-6 text-slate">Prolper may facilitate access to services provided by third parties. We are not responsible for the quality or availability of these services, which may be subject to specific conditions disclosed by the respective service provider.</p>
              </div>
            </div>

            {/* Section 2: Promotional Offers */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">2</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Promotional Offers</h2>
              <p className="fs-6 text-slate lh-base">
                From time to time, Prolper may present special promotional offers, plans, or memberships. Eligibility for Offers is determined at Prolper’s sole discretion. We reserve the right to revoke Offers or suspend your account if deemed ineligible.
              </p>
            </div>

            {/* Section 3: Billing and Cancellation */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">3</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Billing and Cancellation</h2>
              <div className="mb-3">
                <h3 className="fs-6 fw-bold text-dark mb-1">3.1 Payment Methods</h3>
                <p className="fs-6 text-slate">Prolper does not require a payment method to access its services. Payments are made directly to the service provider based on mutually agreed terms.</p>
              </div>
              <div>
                <h3 className="fs-6 fw-bold text-dark mb-1">3.2 Account Cancellation</h3>
                <p className="fs-6 text-slate">You may cancel your Prolper account at any time. Your account will be closed automatically within one business day.</p>
              </div>
            </div>

            {/* Section 4: Prolper Service */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">4</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Prolper Service</h2>
              <div className="mb-3">
                <p className="fs-6 text-slate"><strong>4.1 Age Requirement:</strong> You must be at least 18 years old or the age of majority in your jurisdiction to use Prolper services.</p>
                <p className="fs-6 text-slate"><strong>4.2 Limited License:</strong> Prolper grants you a limited, non-exclusive, non-transferable right to access and use its service.</p>
                <p className="fs-6 text-slate"><strong>4.3 Geographic Limitations:</strong> You may view Prolper content only in the country where your account is established.</p>
                <p className="fs-6 text-slate"><strong>4.4 Testing and Improvements:</strong> Prolper may test various aspects of its services, including website functionality, user interfaces, and promotional features.</p>
                <p className="fs-6 text-slate"><strong>4.5 Acceptable Use:</strong> You agree to use the Prolper service in compliance with all applicable laws and regulations. You must not reproduce, distribute, or modify any content obtained from Prolper without explicit permission. Engaging in automated access or harmful activities will result in termination of service.</p>
                <p className="fs-6 text-slate"><strong>4.6 Display Quality:</strong> The quality of Prolper content may vary depending on the device used and factors such as location and internet connection speed.</p>
                <p className="fs-6 text-slate"><strong>4.7 Software Updates:</strong> Prolper software is developed for authorized use. You may receive automatic updates to Prolper and third-party software as part of your service.</p>
              </div>
            </div>

            {/* Section 5: Account Security */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">5</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Account Security</h2>
              <p className="fs-6 text-slate lh-base">
                The Account Owner is responsible for all activities that occur through the Prolper account. To protect your account, maintain control over devices used for access, and keep your password confidential. You are responsible for updating your account information, and we may suspend or terminate your account to prevent identity theft or fraud.
              </p>
            </div>

            {/* Section 6: Warranties */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">6</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Warranties and Limitations on Liability</h2>
              <p className="fs-6 text-slate lh-base">
                Prolper services are provided “as is” without warranties of any kind. We do not guarantee uninterrupted or error-free service. You waive any claims for special, indirect, or consequential damages, except where prohibited by law.
              </p>
            </div>

            {/* Section 7: Class Action Waiver */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">7</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Class Action Waiver</h2>
              <p className="fs-6 text-slate lh-base">
                Where permitted by law, both you and Prolper agree to resolve disputes individually and not as part of a class action or representative proceeding.
              </p>
            </div>

            {/* Section 8: Miscellaneous */}
            <div className="legal-section-card mb-4">
              <div className="section-id-tag">8</div>
              <h2 className="fs-4 fw-bold teal-text mb-3">Miscellaneous</h2>
              <div className="fs-6 text-slate">
                <p><strong>8.1 Governing Law:</strong> These Terms of Use are governed by the laws of Ontario, Canada, without regard to conflict of laws provisions.</p>
                <p><strong>8.2 Unsolicited Materials:</strong> Prolper does not accept unsolicited materials or ideas and is not responsible for similarities to its content.</p>
                <p><strong>8.3 Customer Support:</strong> For service information or account assistance, please visit the “Contact Us” section of our website/app. support may require remote access, which you can decline.</p>
                <p><strong>8.4 Survival:</strong> If any provision is found to be invalid, the remaining provisions shall remain in effect.</p>
                <p><strong>8.5 Changes to Terms:</strong> Prolper may change these Terms with at least 30 days notice. We may assign our agreement, and you agree to cooperate.</p>
                <p><strong>8.6 Electronic Communications:</strong> Communications will be sent electronically to the email address provided during registration.</p>
                <p><strong>8.7 User Information:</strong> Users agree not to use information from Prolper for marketing or promotional purposes outside of booking services or rating providers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pro-footer-dark mt-5">
        <div className="container">
          <div className="footer-main-row">
            <div className="footer-brand">
               <Link to="/" className="footer-logo-link">
          {/* Logo is kept in its natural style/black */}
          <img src={logo} alt="Prolper" className="logo-black" />
        </Link>
              <p className="footer-mini-text">Streamlining services with intelligent matching.</p>
            </div>
            <div className="footer-social-group">
              <Link to="https://www.facebook.com/Prolperapp" target="_blank" className="social-btn"><img src={facebook} alt="FB" /></Link>
              <Link to="https://www.linkedin.com/company/prolper" target="_blank" className="social-btn"><img src={linkedin} alt="IN" /></Link>
              <Link to="https://www.instagram.com/prolperapp" target="_blank" className="social-btn"><img src={instagram} alt="IG" /></Link>
              <Link to="https://x.com/ProlperApp" target="_blank" className="social-btn"><img src={twitter} alt="X" /></Link>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <div className="footer-copyright">© 2026 Prolper. All rights reserved.</div>
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

export default Legal;