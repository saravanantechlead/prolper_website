import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import customerAppImg from "../../assets/iphone customer app.png";
import { SERVICE_CONTENT, relatedServices } from "../../data/services";
import useAppLinks from "../../hooks/useAppLinks";
import Seo from "../../components/Seo/Seo";
import FooterSection from "../../sections/FooterSection/FooterSection";
import "./ServiceLanding.css";

const SITE = "https://www.prolper.com";

const ServiceLanding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const appLinks = useAppLinks();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); setOpenFaq(0); }, [id]);

  const svc = SERVICE_CONTENT[id];

  if (!svc) {
    return (
      <div className="nh-page sl-page">
        <Seo title="Service not found | Prolper" description="Browse local services on Prolper." path={`/service/${id || ""}`} noindex />
        <div className="sl-notfound">
          <i className="bi bi-search"></i>
          <h1>Service not found</h1>
          <p>We couldn't find that service. Browse everything Prolper offers instead.</p>
          <Link to="/#services" className="sl-btn sl-btn-primary">Browse services</Link>
        </div>
      </div>
    );
  }

  const related = relatedServices(svc.id, 4);

  const STEPS = [
    { icon: "bi-download",       title: "Download Prolper",        desc: "Get the free app from the App Store or Google Play." },
    { icon: "bi-search",         title: `Search "${svc.title}"`,   desc: "Pick this service and set your location, date, and time." },
    { icon: "bi-chat-dots-fill", title: "Connect with a pro",      desc: "Chat or call, receive an estimate, and pay to confirm." },
    { icon: "bi-star-fill",      title: "Get it done & rate",      desc: "Your pro completes the job, then you leave a review." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: svc.title,
        serviceType: svc.title,
        description: svc.intro,
        areaServed: { "@type": "City", name: "Mississauga" },
        provider: { "@type": "Organization", name: "Prolper", url: `${SITE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/#services` },
          { "@type": "ListItem", position: 3, name: svc.title, item: `${SITE}/service/${svc.id}` },
        ],
      },
      ...(svc.faqs.length
        ? [{
            "@type": "FAQPage",
            mainEntity: svc.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }]
        : []),
    ],
  };

  return (
    <div className="nh-page sl-page" style={{ "--sl-accent": svc.accent }}>
      <Seo
        title={`${svc.title} in Mississauga, ON | Book a Local Pro | Prolper`}
        description={svc.intro}
        path={`/service/${svc.id}`}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="sl-hero">
        <div className="sl-hero-inner">
          <div className="sl-hero-left">
            <nav className="sl-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <i className="bi bi-chevron-right"></i>
              <Link to="/#services">Services</Link>
              <i className="bi bi-chevron-right"></i>
              <span>{svc.title}</span>
            </nav>

            <span className="sl-badge">
              <i className={`bi ${svc.icon}`}></i>
              {svc.category}
            </span>
            <h1 className="sl-title">{svc.title} in Mississauga</h1>
            <p className="sl-desc">{svc.intro}</p>

            <div className="sl-book-cta">
              <Link to={`/book/${svc.id}`} className="sl-book-btn">
                <i className="bi bi-calendar-check"></i> Book {svc.title} now
              </Link>
            </div>
            <div className="sl-cta">
              <a href={appLinks.customer_ios} className="sl-store-btn" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-apple"></i>
                <div><small>Download on the</small><strong>App Store</strong></div>
              </a>
              <a href={appLinks.customer_android} className="sl-store-btn" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-google-play"></i>
                <div><small>GET IT ON</small><strong>Google Play</strong></div>
              </a>
            </div>
            <p className="sl-cta-note">
              <i className="bi bi-patch-check-fill"></i>
              Book <strong>{svc.title}</strong> online in minutes — then finish in the app with secure payment.
            </p>
          </div>

          <div className="sl-hero-right">
            <div className="sl-phone-glow" />
            <div className="sl-icon-float">
              <i className={`bi ${svc.icon}`}></i>
            </div>
            <div className="sl-phone">
              <div className="sl-phone-island" />
              <img src={customerAppImg} alt={`Book ${svc.title} on the Prolper app`} width="280" height="580" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      {svc.included.length > 0 && (
        <section className="sl-included-sec">
          <div className="nh-section-inner">
            <div className="sl-head">
              <span className="sl-head-eyebrow">What you can book</span>
              <h2 className="sl-head-title">{svc.title} services in Mississauga</h2>
            </div>
            <ul className="sl-included">
              {svc.included.map((item) => (
                <li key={item}><i className="bi bi-check-circle-fill"></i> {item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* HOW TO BOOK */}
      <section className="sl-steps">
        <div className="nh-section-inner">
          <div className="sl-head">
            <span className="sl-head-eyebrow">Getting started</span>
            <h2 className="sl-head-title">How to book {svc.title}</h2>
          </div>
          <div className="sl-steps-grid">
            {STEPS.map((s, i) => (
              <div className="sl-step" key={s.title}>
                <span className="sl-step-num">{i + 1}</span>
                <span className="sl-step-icon"><i className={`bi ${s.icon}`}></i></span>
                <h3 className="sl-step-title">{s.title}</h3>
                <p className="sl-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {svc.faqs.length > 0 && (
        <section className="sl-faq">
          <div className="nh-section-inner">
            <div className="sl-head">
              <span className="sl-head-eyebrow">Questions</span>
              <h2 className="sl-head-title">{svc.title} in Mississauga — FAQs</h2>
            </div>
            <div className="sl-faq-list">
              {svc.faqs.map((f, i) => (
                <div className={`sl-faq-item ${openFaq === i ? "is-open" : ""}`} key={f.q}>
                  <button className="sl-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <i className={`bi ${openFaq === i ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                  </button>
                  <div className="sl-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="sl-related">
          <div className="nh-section-inner">
            <div className="sl-head">
              <span className="sl-head-eyebrow">Explore more</span>
              <h2 className="sl-head-title">Other local services</h2>
            </div>
            <div className="sl-related-grid">
              {related.map((r) => (
                <Link key={r.id} to={`/service/${r.id}`} className="sl-related-card">
                  <span className="sl-related-icon"><i className={`bi ${r.icon}`}></i></span>
                  <span className="sl-related-name">{r.title}</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="sl-final" id="download-section">
        <div className="nh-section-inner">
          <div className="sl-final-card">
            <h2 className="sl-final-title">Ready to book {svc.title}?</h2>
            <p className="sl-final-sub">Request a local pro online in minutes — no app needed to start.</p>
            <div className="sl-book-cta">
              <Link to={`/book/${svc.id}`} className="sl-book-btn sl-book-btn-light">
                <i className="bi bi-calendar-check"></i> Book {svc.title} now
              </Link>
            </div>
            <div className="sl-cta">
              <a href={appLinks.customer_ios} className="sl-store-btn sl-store-light" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-apple"></i>
                <div><small>Download on the</small><strong>App Store</strong></div>
              </a>
              <a href={appLinks.customer_android} className="sl-store-btn sl-store-light" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-google-play"></i>
                <div><small>GET IT ON</small><strong>Google Play</strong></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ServiceLanding;
