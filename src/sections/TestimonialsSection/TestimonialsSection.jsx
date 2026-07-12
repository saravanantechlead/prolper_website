import React from "react";
import "./TestimonialsSection.css";

const REVIEWS = [
  {
    name: "Sarah M.",
    location: "Toronto, ON",
    service: "House Cleaning",
    rating: 5,
    text: "Booked a deep clean on a Sunday and someone was at my door the next morning. The pro was friendly, thorough and the price matched the estimate exactly. No surprises.",
    initial: "S",
    accent: "#14b8a6",
  },
  {
    name: "David R.",
    location: "Mississauga, ON",
    service: "Plumbing",
    rating: 5,
    text: "My kitchen sink was leaking everywhere. I chatted with a plumber in the app, got a quote in minutes, and it was fixed the same day. Prolper is now my go-to.",
    initial: "D",
    accent: "#6366f1",
  },
  {
    name: "Amina K.",
    location: "Brampton, ON",
    service: "Painting",
    rating: 5,
    text: "Loved being able to see reviews and ratings before choosing. The painter I picked was exactly as advertised — clean, punctual and professional.",
    initial: "A",
    accent: "#ec4899",
  },
  {
    name: "Marcus T.",
    location: "Ottawa, ON",
    service: "Handyman",
    rating: 5,
    text: "Paying through the app made everything feel safe. Estimate up front, work done, balance settled. Simple. I've already recommended it to my whole street.",
    initial: "M",
    accent: "#f59e0b",
  },
  {
    name: "Priya S.",
    location: "Vaughan, ON",
    service: "Appliance Repair",
    rating: 4,
    text: "Fridge stopped cooling and I had someone diagnose it within the hour. Great communication throughout via chat and call. Would use again.",
    initial: "P",
    accent: "#0ea5e9",
  },
  {
    name: "Jason L.",
    location: "Hamilton, ON",
    service: "Moving Help",
    rating: 5,
    text: "Two vetted movers, fair fixed price, zero stress. Being able to rate them afterward makes the whole marketplace feel trustworthy.",
    initial: "J",
    accent: "#8b5cf6",
  },
];

const Stars = ({ n }) => (
  <span className="nh-rev-stars" aria-label={`${n} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((s) => (
      <i key={s} className={`bi ${s <= n ? "bi-star-fill" : "bi-star"}`}></i>
    ))}
  </span>
);

const TestimonialsSection = () => {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section className="nh-reviews" id="reviews">
      <div className="nh-section-inner">
        <div className="nh-reviews-header nh-animate">
          <span className="nh-reviews-eyebrow">Loved by locals</span>
          <h2 className="nh-reviews-title">Real jobs. Real reviews.</h2>
          <p className="nh-reviews-lead">
            Every pro on Prolper is rated by the people they've helped — so you always
            know who you're hiring.
          </p>
        </div>
      </div>

      <div className="nh-reviews-marquee nh-animate nh-d2">
        <div className="nh-reviews-track">
          {loop.map((r, i) => (
            <article className="nh-rev-card" key={i} style={{ "--rev-accent": r.accent }}>
              <div className="nh-rev-top">
                <Stars n={r.rating} />
                <span className="nh-rev-verified">
                  <i className="bi bi-patch-check-fill"></i> Local pro
                </span>
              </div>
              <p className="nh-rev-text">“{r.text}”</p>
              <div className="nh-rev-foot">
                <span className="nh-rev-avatar">{r.initial}</span>
                <div className="nh-rev-meta">
                  <span className="nh-rev-name">{r.name}</span>
                  <span className="nh-rev-sub">{r.service} · {r.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
