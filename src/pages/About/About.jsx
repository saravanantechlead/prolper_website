import React from "react";
import { Link } from "react-router-dom";
import "./About.css"; // Custom styles (optional)
import socialLogo from "/social-white.png";

const About = () => {
  return (
    <>
      <div className="container my-5 px-5">
        {/* About Us Heading */}
        <h1 className="text-center fw-bold mb-5">About Us</h1>

        {/* Description */}
        <p className="text-start mt-5 lh-lg ">
          With just a couple of clicks, our advanced AI-based algorithm quickly
          identifies the best available service providers tailored to your
          preferred location, date, and time. Whether you’re in need of an
          electrician, plumber, baker, private tutor, realtor or mover,
          Prolper has you covered with more than 150 service categories.
        </p>
        <p className="text-start lh-lg ">
          Join Prolper today for free and experience a new level of
          convenience in finding the services you need in real time, whenever
          you need them!
        </p>

        <p className="text-start mb-5 lh-lg ">
          This table highlights the distinctions between a Referral/online
          Search and Prolper.
        </p>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle ">
            <thead className="table">
              <tr style={{ backgroundColor: "red", color: "white" }}>
                <th
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Criteria
                </th>
                <th
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Referral/Online Search
                </th>
                <th
                  style={{
                    backgroundColor: "#363445",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Prolper
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  Potential for Misleading Information
                </td>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  May be misleading and/or fake.
                </td>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  Provides unbiased referrals based on an AI-driven algorithm.
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Source of Rating
                </td>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  May not be Rated by a verified customer.
                </td>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Ratings are given exclusively by real customers.
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  Monetary Incentives
                </td>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Referrers may earn commissions for service referrals.
                </td>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  No revenue share for referring service providers.
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Accountability for Service Quality
                </td>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  No implications for poor service quality.
                </td>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Businesses may be delisted after a thorough investigation.
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  Data Security
                </td>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Customer information could be at risk.
                </td>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  Prolper doesn't share customer information with service
                  providers.
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Availability
                </td>
                <td style={{ backgroundColor: "#f0f0f0", color: "black" }}>
                  The service provider’s availability on the required day and
                  time is not guaranteed.
                </td>
                <td style={{ backgroundColor: "white", color: "black" }}>
                  Availability isn’t an issue as service calls are shared with
                  multiple providers simultaneously.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="text-center bg-dark text-white py-4 pt-5 pb-5 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h4 className="mb-3">Prolper</h4>
            </div>
            <div className="col-md-4">
              <p className="mb-2">© 2024 Prolper. All rights reserved.</p>
              <div className="footer-links">
                <Link to="/privacy-policy" className="text-white text-decoration-none">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="social-icons">
                <img
                  className="ms-2"
                  src={socialLogo}
                  alt="Logo"
                  width="100"
                  height="20"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default About;
