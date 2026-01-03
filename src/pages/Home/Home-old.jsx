import React from "react";
import bannerImg from "/banner.jpg";
import qrImg from "/QR.jpg";
import Slider from "react-slick";
import hiwImg from "/hiw.jpg"
import socialLogo from "/social-white.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const testimonials = [
    {
      name: "Amit",
      role: "Designer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      review: "Quickifind Apps is a must-have for any business. It’s simple to use, and it helps us stay organized, which makes a huge difference in our productivity.",
      rating: 5,
    },
    {
      name: "Sophia",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      review: "Quickifind Apps is a must-have for any business. It’s simple to use, and it helps us stay organized, which makes a huge difference in our productivity.",
      rating: 4,
    },
    {
      name: "David",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      review: "Quickifind Apps is a must-have for any business. It’s simple to use, and it helps us stay organized, which makes a huge difference in our productivity.",
      rating: 5,
    },
    {
      name: "Emma",
      role: "Marketing Manager",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      review: "Quickifind Apps is a must-have for any business. It’s simple to use, and it helps us stay organized, which makes a huge difference in our productivity.",
      rating: 4,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  return (
    <div>
      {/* Banner & QR Code */}
      <div className="text-center">
        <img className="ms-2" src={bannerImg} alt="Banner" width="90%" />
        <img className="ms-2" src={qrImg} alt="QR Code" width="90%" />
      </div>

      {/* Testimonial Slider */}
      <div className="bg-dark text-white mt-5">
        <h2 className="text-center pt-5 pb-5">What Our Members Say About Us:</h2>
        <div className="container">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4">
                <div className="bg-white text-dark rounded-lg shadow-lg p-5 rounded ">
                  <div className="d-flex align-items-center justify-content-between">
                    <img
                      width={80}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full  mb-3 rounded-circle"
                    />
                    <div><h4 className="text-lg font-bold ">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p></div>
                    <div className="flex justify-center my-2">
                      {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm">"{testimonial.review}"</p>
                </div>

              </div>
            ))}
          </Slider>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="pt-5 pb-5">Subscribe to our newsletter:</h5>
              <form className="d-flex w-75">
                <input className="form-control me-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <img className="ms-2" src={hiwImg} alt="how" width="90%" />
      </div>
      <div className="container my-5">
      <h2 className="fw-bold">What makes us different:</h2>
      <ul className="list-unstyled mt-3">
        <li>
          <strong>AI-Driven Algorithm:</strong> Prolper utilizes an advanced AI algorithm to analyze customer reviews and feedback.
        </li>
        <li>
          <strong>Data Collection:</strong> The platform collects real-time data from verified users who have engaged with service providers.
        </li>
        <li>
          <strong>Recommendation Generation:</strong> Based on the analysis, Prolper generates unbiased recommendations tailored to user needs.
        </li>
        <li>
          <strong>Quality Assurance:</strong> The platform conducts thorough investigations into service provider performance and can delist those with consistent negative feedback.
        </li>
        <li>
          <strong>Privacy Protection:</strong> Prolper ensures that user data remains confidential and is not shared with service providers.
        </li>
        <li>
          <strong>User Feedback Loop:</strong> Users can continuously provide feedback, helping to refine the recommendations and maintain service quality.
        </li>
      </ul>
    </div>
    <div className="container-fluid bg-dark text-white py-5">
      <div className="container">
       <div className="row align-items-center">
          {/* Left Section - Contact Information */}
          <div className="col-md-8">
            <h2 className="fw-bold">We’re here to help!</h2>
            <p className="mt-3 fs-4">
              Our friendly team is ready to assist you with any questions or concerns you may have. 
              Whether you need information, support, or just want to share your thoughts, we’re all ears. 
              Reaching out is easy – simply fill out the form or send us an email. 
              We value your feedback and aim to respond promptly to every inquiry. 
              Your satisfaction is our top priority, so don’t hesitate to get in touch. 
              We look forward to hearing from you and providing the assistance you need.
            </p>
          </div>

          {/* Right Section - Contact Form */}
          <div className="col-md-4">
          <button className="btn btn-light round mb-5">Contact Us</button> 

            <div className="bg-white text-dark p-4 rounded-4 shadow">
              <form>
                <div className="mb-3 pt-5">
                  <input type="text" className="form-control" placeholder="Jean Masad" />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" placeholder="Mobile Number" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Message"></textarea>
                </div>
                <button type="submit" className="btn btn-success px-4 mt-5">Submit</button>
                <br />
              </form>
            </div>
          </div>
        </div>

        {/* Footer Section */}
         <footer className="text-center bg-dark text-white py-4 pt-5 pb-5 mt-5 d-flex justify-content-around align-items-center">
                <h1 className="mb-3">Prolper</h1>
                <p>© 2024 Prolper. All rights reserved.</p>
                <div className="social-icons">
                                   <img className="ms-2" src={socialLogo} alt="Logo" width="140" height="25" />
                 
                </div>
              </footer>
      </div>
    </div>
    </div>
  );
};

export default Home;
