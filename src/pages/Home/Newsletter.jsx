// import axios from "axios";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const NewsletterSection = () => {
//   const [nemail, setNEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleNewsletterSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://us-central1-quickfindapp-eaae2.cloudfunctions.net/subscribeNewsletter",
//         { email: nemail }
//       );
//       setMessage("Subscription successful! Check your email.");
//       setNEmail("");
//     } catch (error) {
//       // Prefer backend-provided message when available (e.g. "Email is already subscribed")
//       console.error("Subscription error:", error);
//       const backendMessage =
//         (error && error.response && (error.response.data?.message || error.response.data)) ||
//         error.message ||
//         "Subscription failed. Please try again.";
//       setMessage(backendMessage);
//     }
//   };

//   return (
//     <div
//       className="row align-items-center text-center text-md-start w-100 px-0 py-0 pt-5"
//       style={{
//         marginTop: "0rem",
//         marginTop: window.innerWidth >= 768 ? "5rem" : "0rem",
//       }}
//     >
//       <div className="col-12 col-md-auto mb-3 mb-md-0">
//         <h5 className="m-0">
//           <b className="fs-5">Subscribe to our newsletter:</b>
//         </h5>
//       </div>
//       <div className="col-6 col-md text-center pb-3 fs-2 fw-bold">
//         <form
//           className="d-flex flex-wrap align-items-center gap-2 w-100 justify-content-center justify-content-md-start"
//           onSubmit={handleNewsletterSubmit}
//         >
//           <input
//             className="form-control w-100 w-md-auto"
//             type="email"
//             placeholder="Enter a valid email address"
//             aria-label="Submit"
//             value={nemail}
//             onChange={(e) => setNEmail(e.target.value)}
//             required
//             style={{ minWidth: "0px", maxWidth: "400px" }}
//           />
//           <button className="btn btn-success px-4" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//       {/* Legal Link (Optional - you had it commented out in the second version) */}
//       {/* <div className="col-12 col-md-auto mt-2 mt-md-0 d-flex justify-content-center justify-content-md-start">
//         <Link
//           to="/legal"
//           className="btn"
//           style={{
//             backgroundColor: "white",
//             color: "black",
//             border: "1px solid #28a745",
//           }}
//         >
//           Legal
//         </Link>
//       </div> */}
//       {/* Message */}
//       {message && (
//         <div className="col-12 text-center mt-3">
//           <span>{message}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsletterSection;

import axios from "axios";
import { useState } from "react";

const NewsletterSection = () => {
  const [nemail, setNEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://us-central1-quickfindapp-eaae2.cloudfunctions.net/subscribeNewsletter",
        { email: nemail }
      );
      setMessage("Thank you! You've been subscribed.");
      setNEmail("");
    } catch (error) {
      const backendMessage = error.response?.data?.message || "Please try again.";
      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-minimal py-4">
      <h5 className="fw-bold mb-3" style={{
        color:"whitesmoke"
      }}>Stay updated</h5>
      <form className="d-flex gap-2" onSubmit={handleNewsletterSubmit}>
        <input
          className="modern-input"
          type="email"
          placeholder="email@company.com"
          value={nemail}
          onChange={(e) => setNEmail(e.target.value)}
          required
          style={{ maxWidth: "300px" }}
        />
        <button className="modern-submit-btn" type="submit" disabled={loading}>
          {loading ? "Joining..." : "Subscribe"}
        </button>
      </form>
      {message && <p className="small mt-2 text-success">{message}</p>}
    </div>
  );
};

export default NewsletterSection;