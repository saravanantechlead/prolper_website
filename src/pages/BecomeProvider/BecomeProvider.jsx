import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAppLinks from "../../hooks/useAppLinks";
import useQrLinks from "../../hooks/useQrLinks";
import FooterSection from "../../sections/FooterSection/FooterSection";
import "./BecomeProvider.css";

const face = (id) =>
  `https://images.unsplash.com/photo-${id}?w=120&q=80&auto=format&fit=crop&crop=faces`;

const STATS = [
  { icon: "bi-people-fill",     end: 5000,  suffix: "+",  label: "Active local pros" },
  { icon: "bi-cash-stack",      end: 2.4,   prefix: "$", suffix: "M+", label: "Paid out to pros" },
  { icon: "bi-briefcase-fill",  end: 12000, suffix: "+",  label: "Jobs matched / month" },
  { icon: "bi-star-fill",       end: 4.8,   label: "Average pro rating" },
];

const STEPS = [
  { icon: "bi-person-plus-fill", title: "Create your profile",  desc: "Sign up in minutes, list your skills and set your service area." },
  { icon: "bi-patch-check-fill", title: "Get approved",         desc: "We review your details so customers know they can trust you." },
  { icon: "bi-inbox-fill",       title: "Receive job requests", desc: "Get matched with nearby customers looking for what you offer." },
  { icon: "bi-wallet2",          title: "Get paid securely",    desc: "Send estimates, complete the job, and get paid through the app." },
];

const BENEFITS = [
  { icon: "bi-cash-stack",       accent: "#14b8a6", title: "Earn on your terms",    desc: "Set your own rates and keep more of every job, with no monthly fees to start." },
  { icon: "bi-calendar2-week",   accent: "#0ea5e9", title: "Full schedule control", desc: "Accept only the jobs you want, when you want them. You're the boss." },
  { icon: "bi-geo-alt-fill",     accent: "#6366f1", title: "Local customers",       desc: "We connect you with people in your neighbourhood who need your skills." },
  { icon: "bi-shield-lock-fill", accent: "#22c55e", title: "Secure payments",       desc: "No chasing invoices. Payments are handled safely inside the app." },
  { icon: "bi-star-fill",        accent: "#f59e0b", title: "Build your reputation",  desc: "Collect ratings and reviews that help you win more work over time." },
  { icon: "bi-headset",          accent: "#ec4899", title: "Support that has your back", desc: "Our team is here to help you resolve issues and grow your business." },
];

const VOICES = [
  { name: "Marcus T.", trade: "Handyman",     img: face("1500648767791-00dcc994a43e"), quote: "I get steady local jobs without spending a cent on ads. The app handles quotes and payment, so I just show up and do great work." },
  { name: "David R.",  trade: "Plumber",      img: face("1560250097-0b93528c311a"),   quote: "Payments hit my account fast, no chasing invoices. Best decision I made for my business this year." },
  { name: "Jason L.",  trade: "Auto Detailer",img: face("1519085360753-af0119f7cbe7"), quote: "I pick the jobs that fit my schedule. Booked solid most weekends now thanks to Prolper." },
  { name: "Priya S.",  trade: "Pet Groomer",  img: face("1573496359142-b8d87734a5a2"), quote: "Started with zero reviews, now I'm one of the top-rated pros in my area. The ratings really bring in work." },
];

const FAQS = [
  { q: "How much does it cost to join?", a: "Creating a profile is free. Prolper only takes a small service fee on completed jobs, so you only pay when you earn." },
  { q: "What do I need to get started?", a: "Just your contact details, the services you offer, and any relevant qualifications or licenses. We handle the approval process from there." },
  { q: "When and how do I get paid?", a: "Payments are processed securely through the app after a job is completed, so you never have to chase a customer for money." },
  { q: "Can I choose which jobs I take?", a: "Absolutely. You'll receive requests from nearby customers and can accept or decline based on your availability and preferences." },
];

/* Animated number that counts up when `active` turns true. */
const CountUp = ({ end, duration = 1500, prefix = "", suffix = "", active }) => {
  const [val, setVal] = useState(0);
  const isFloat = !Number.isInteger(end);
  useEffect(() => {
    if (!active) return;
    let raf, startT;
    const step = (t) => {
      if (!startT) startT = t;
      const p = Math.min((t - startT) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration]);
  const shown = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
  return <>{prefix}{shown}{suffix}</>;
};

const BecomeProvider = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [statsOn, setStatsOn] = useState(false);
  const appLinks = useAppLinks();
  const qr = useQrLinks();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("nh-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".nh-animate, .nh-animate-left, .nh-animate-right")
      .forEach((el) => observer.observe(el));

    // Stats count-up trigger
    let statObs;
    if (statsRef.current) {
      statObs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setStatsOn(true); statObs.disconnect(); } },
        { threshold: 0.4 }
      );
      statObs.observe(statsRef.current);
    }
    return () => { observer.disconnect(); statObs && statObs.disconnect(); };
  }, []);

  const onParallax = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    });
  };

  return (
    <div className="nh-page bp-page">

      {/* HERO */}
      <section className="bp-hero" ref={heroRef} onMouseMove={onParallax}>
        <span className="bp-blob bp-blob-1" aria-hidden="true" />
        <span className="bp-blob bp-blob-2" aria-hidden="true" />
        <span className="bp-ring" aria-hidden="true" />
        <span className="bp-dots" aria-hidden="true" />

        <div className="bp-hero-inner">
          <div className="bp-hero-left">
            <span className="bp-eyebrow"><i className="bi bi-briefcase-fill"></i> Prolper for Pros</span>
            <h1 className="bp-hero-title">
              Grow your business,<br /><span className="nh-teal">one job at a time.</span>
            </h1>
            <p className="bp-hero-sub">
              Join thousands of trusted local professionals earning more with Prolper.
              We bring the customers to you, so you focus on doing great work.
            </p>
            <div className="bp-hero-actions">
              <a href="#download-section" className="bp-btn bp-btn-primary">
                Get the Pro app <i className="bi bi-arrow-right"></i>
              </a>
              <Link to="/" className="bp-btn bp-btn-ghost">Looking for a service?</Link>
            </div>
            <div className="bp-hero-trust">
              <span><i className="bi bi-people-fill"></i> 5,000+ active pros</span>
              <span><i className="bi bi-star-fill"></i> 4.8 average rating</span>
              <span><i className="bi bi-cash-coin"></i> Paid weekly</span>
            </div>
          </div>

          <div className="bp-hero-right">
            <div className="bp-earn-card">
              <div className="bp-earn-head">
                <span>Monthly earnings</span>
                <span className="bp-earn-trend"><i className="bi bi-graph-up-arrow"></i> +24%</span>
              </div>
              <div className="bp-earn-amount">
                $<CountUp end={4860} active duration={1600} />
              </div>
              <div className="bp-earn-bars">
                {[45, 60, 52, 74, 66, 88, 79, 96].map((h, i) => (
                  <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
              <div className="bp-earn-foot">
                <span><i className="bi bi-check-circle-fill"></i> 32 jobs done</span>
                <span className="bp-earn-rating"><i className="bi bi-star-fill"></i> 4.9</span>
              </div>
            </div>

            {/* Floating notification cards */}
            <div className="bp-float bp-float-job">
              <span className="bp-float-ic bp-float-ic-teal"><i className="bi bi-bell-fill"></i></span>
              <div><strong>New job request</strong><span>Kitchen faucet · 2.1 km away</span></div>
            </div>
            <div className="bp-float bp-float-pay">
              <span className="bp-float-ic bp-float-ic-green"><i className="bi bi-cash-coin"></i></span>
              <div><strong>Payment received</strong><span>+$180 · just now</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bp-stats" ref={statsRef}>
        <div className="nh-section-inner">
          <div className="bp-stats-card">
            {STATS.map((s, i) => (
              <div className="bp-stat" key={s.label} style={{ "--d": `${i * 90}ms` }}>
                <span className="bp-stat-ic"><i className={`bi ${s.icon}`}></i></span>
                <div className="bp-stat-txt">
                  <span className="bp-stat-val">
                    <CountUp end={s.end} prefix={s.prefix || ""} suffix={s.suffix || ""} active={statsOn} />
                  </span>
                  <span className="bp-stat-lbl">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bp-steps">
        <div className="nh-section-inner">
          <div className="bp-head nh-animate">
            <span className="bp-head-eyebrow">Getting started</span>
            <h2 className="bp-head-title">Start earning in 4 simple steps</h2>
          </div>
          <div className="bp-steps-grid nh-animate">
            <span className="bp-steps-line" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <div className="bp-step" key={s.title} style={{ "--d": `${i * 120}ms` }}>
                <span className="bp-step-num">{i + 1}</span>
                <span className="bp-step-icon"><i className={`bi ${s.icon}`}></i></span>
                <h3 className="bp-step-title">{s.title}</h3>
                <p className="bp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bp-benefits">
        <div className="nh-section-inner">
          <div className="bp-head nh-animate">
            <span className="bp-head-eyebrow">Why Prolper</span>
            <h2 className="bp-head-title">Everything you need to succeed</h2>
          </div>
          <div className="bp-benefits-grid">
            {BENEFITS.map((b, i) => (
              <div
                className={`bp-benefit nh-animate nh-d${(i % 3) + 1}`}
                key={b.title}
                style={{ "--accent": b.accent }}
              >
                <span className="bp-benefit-icon"><i className={`bi ${b.icon}`}></i></span>
                <h3 className="bp-benefit-title">{b.title}</h3>
                <p className="bp-benefit-desc">{b.desc}</p>
                <span className="bp-benefit-glow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRO VOICES */}
      <section className="bp-voices">
        <div className="bp-head nh-animate">
          <span className="bp-head-eyebrow">From our pros</span>
          <h2 className="bp-head-title">Real pros, real growth</h2>
        </div>
        <div className="bp-voices-marquee">
          <div className="bp-voices-track">
            {[...VOICES, ...VOICES].map((v, i) => (
              <figure className="bp-voice" key={i}>
                <div className="bp-voice-stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
                <blockquote>"{v.quote}"</blockquote>
                <figcaption>
                  <img src={v.img} alt={v.name} loading="lazy" />
                  <div><strong>{v.name}</strong><span>{v.trade}</span></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bp-faq">
        <div className="nh-section-inner">
          <div className="bp-head nh-animate">
            <span className="bp-head-eyebrow">Questions</span>
            <h2 className="bp-head-title">Good to know</h2>
          </div>
          <div className="bp-faq-list nh-animate nh-d2">
            {FAQS.map((f, i) => (
              <div className={`bp-faq-item ${openFaq === i ? "is-open" : ""}`} key={f.q}>
                <button className="bp-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <i className={`bi ${openFaq === i ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                </button>
                <div className="bp-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / DOWNLOAD */}
      <section className="bp-final" id="download-section">
        <div className="nh-section-inner">
          <div className="bp-final-card nh-animate">
            <span className="bp-final-shine" aria-hidden="true" />
            <div className="bp-final-body">
              <span className="bp-final-eyebrow"><i className="bi bi-rocket-takeoff-fill"></i> Start today</span>
              <h2 className="bp-final-title">Ready to put your skills to work?</h2>
              <p className="bp-final-sub">Download the Prolper Pro app and start receiving job requests today.</p>
              <div className="bp-final-actions">
                <a href={appLinks.business_ios} className="bp-store-btn" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-apple"></i>
                  <div><small>Download on the</small><strong>App Store</strong></div>
                </a>
                <a href={appLinks.business_android} className="bp-store-btn" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-google-play"></i>
                  <div><small>GET IT ON</small><strong>Google Play</strong></div>
                </a>
              </div>
            </div>
            <div className="bp-final-qr">
              {qr.business ? (
                <img src={qr.business} alt="Scan to download the Prolper Pro app" loading="lazy" />
              ) : (
                <div className="bp-final-qr-ph"><i className="bi bi-qr-code"></i></div>
              )}
              <span>Scan to download</span>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default BecomeProvider;
