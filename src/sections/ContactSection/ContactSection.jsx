import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./ContactSection.css";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Sending...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        mobile: phone,
        message,
        timestamp: new Date(),
      });
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We will get back to you shortly.",
        confirmButtonColor: "#0fba81",
        timer: 3000,
      });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="nh-contact" id="contact-section">
      <div className="nh-section-inner">
        <div className="nh-contact-grid">

          <div className="nh-contact-left nh-animate-left">
            <span className="nh-contact-badge">Contact Support</span>
            <h2 className="nh-contact-heading">
              Have questions?<br />We're all ears.
            </h2>
            <p className="nh-contact-intro">
              Whether you're curious about our service matching or need help
              with your account, the Prolper team is ready to assist.
            </p>
            <div className="nh-contact-info">
              <div className="nh-contact-row">
                <div className="nh-contact-row-icon"><i className="bi bi-envelope-fill"></i></div>
                <span>contact@prolper.com</span>
              </div>
              <div className="nh-contact-row">
                <div className="nh-contact-row-icon"><i className="bi bi-telephone-fill"></i></div>
                <span>(226) 971-2195</span>
              </div>
              <div className="nh-contact-row">
                <div className="nh-contact-row-icon"><i className="bi bi-geo-alt-fill"></i></div>
                <span>Mississauga, Canada</span>
              </div>
            </div>
            <div className="nh-responds">
              <span className="nh-online-dot"></span>
              Usually responds within 24 hours
            </div>
          </div>

          <div className="nh-contact-right nh-animate-right">
            <form onSubmit={handleSubmit} className="nh-form">
              <div className="nh-field">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="nh-field">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="nh-field nh-phone-field">
                <i className="bi bi-telephone"></i>
                <span className="nh-cc">+1 (CA) ▾</span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="nh-field nh-textarea-field">
                <i className="bi bi-chat-left-text"></i>
                <textarea
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                ></textarea>
              </div>
              <button type="submit" className="nh-send-btn">
                <i className="bi bi-send"></i> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
