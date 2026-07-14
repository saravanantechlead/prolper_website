/* ──────────────────────────────────────────────────────────
   Per-service content for the /service/:id landing pages.
   This is STATIC (bundled) so the pages are SEO-rich and can be
   pre-rendered to static HTML without a Firestore read.
   Reuses the shared SERVICES list (name, icon, accent, image).
   ────────────────────────────────────────────────────────── */
import { SERVICES } from "./siteContent";

/* id → rich content: category (badge + grouping), intro (meta + hero),
   what's included, and FAQs (also emitted as FAQ structured data). */
const RICH = {
  handyman: {
    category: "Home services",
    intro:
      "Book a local handyman in Mississauga for repairs, furniture assembly, TV mounting and all the odd jobs on your list. Get matched with a rated pro in minutes and pay securely in the app.",
    included: [
      "Furniture & IKEA assembly",
      "TV, shelf & mirror mounting",
      "Drywall patching & minor repairs",
      "Door, lock & hardware fixes",
      "Picture hanging & odd jobs",
      "Fixture & small appliance installs",
    ],
    faqs: [
      { q: "How much does a handyman cost in Mississauga?", a: "It depends on the job. Your matched pro sends an upfront estimate before you confirm, so there are no surprises — you only pay once you agree the price." },
      { q: "How quickly can I book a handyman?", a: "Most customers get matched with a local handyman within minutes and can book same-day or next-day, depending on availability." },
      { q: "Are the handymen local to Mississauga?", a: "Yes. Prolper connects you with independent local pros in the Mississauga area, each rated by the customers they've helped." },
      { q: "How do I pay?", a: "Payment is handled securely inside the Prolper app once the job is agreed — no cash and no chasing invoices." },
    ],
  },
  painting: {
    category: "Home services",
    intro:
      "Find a local painter in Mississauga for interior and exterior painting done clean. Get matched with a rated pro, see a clear estimate, and book in minutes.",
    included: [
      "Interior wall & ceiling painting",
      "Exterior & trim painting",
      "Accent walls & feature colours",
      "Prep, priming & patching",
      "Doors, cabinets & trim",
      "Colour advice from your pro",
    ],
    faqs: [
      { q: "How much does painting a room cost?", a: "Pricing varies with room size, prep and paint. Your painter gives an upfront estimate in the app before you confirm." },
      { q: "Do painters bring their own supplies?", a: "Most pros bring their tools and can supply or advise on paint. Confirm the details in-chat with your matched painter." },
      { q: "Can I book interior and exterior painting?", a: "Yes — describe the job when you book and you'll be matched with a local painter who covers it." },
      { q: "Is the work rated?", a: "Every painter on Prolper is rated by past customers, so you can choose with confidence." },
    ],
  },
  cleaning: {
    category: "Home services",
    intro:
      "Book house and office cleaning in Mississauga you can rely on. Match with a rated local cleaner for a one-off deep clean or a regular schedule, and pay securely in the app.",
    included: [
      "Standard & deep cleaning",
      "Kitchen & bathroom cleaning",
      "Move-in / move-out cleans",
      "Office & workspace cleaning",
      "Recurring weekly or monthly plans",
      "Eco-friendly options on request",
    ],
    faqs: [
      { q: "How much does house cleaning cost in Mississauga?", a: "It depends on home size and whether it's a standard or deep clean. You'll see an upfront estimate before you book." },
      { q: "Can I book a recurring cleaner?", a: "Yes. You can arrange a one-off clean or set up a regular weekly, bi-weekly or monthly schedule with your pro." },
      { q: "Do cleaners bring supplies?", a: "Many bring their own supplies and equipment — confirm with your matched cleaner in-chat before the visit." },
      { q: "Is payment secure?", a: "Yes, you pay securely in the Prolper app after the clean is agreed. No cash needed." },
    ],
  },
  "car-detailing": {
    category: "Auto services",
    intro:
      "Book mobile car detailing in Mississauga — wash, polish and interior detailing that comes to you. Match with a rated local detailer and pay securely in the app.",
    included: [
      "Exterior hand wash & wax",
      "Paint polish & decontamination",
      "Interior vacuum & shampoo",
      "Leather & upholstery care",
      "Headlight restoration",
      "Mobile service at your location",
    ],
    faqs: [
      { q: "Do you offer mobile car detailing?", a: "Many Prolper detailers come to your home or workplace in Mississauga. Confirm mobile service with your matched pro when you book." },
      { q: "How long does a full detail take?", a: "A full interior and exterior detail typically takes a few hours. Your detailer confirms timing with the estimate." },
      { q: "How much does car detailing cost?", a: "It depends on vehicle size and the package. You'll get an upfront quote in the app before you confirm." },
      { q: "Can I book interior-only detailing?", a: "Yes — just describe what you need and you'll be matched with a detailer who offers it." },
    ],
  },
  "pet-care": {
    category: "Pet services",
    intro:
      "Find local pet care in Mississauga — grooming, sitting and dog walking from rated pet lovers. Match in minutes and book with secure in-app payment.",
    included: [
      "Dog walking & drop-in visits",
      "Pet sitting & boarding",
      "At-home grooming & bathing",
      "Nail trims & tidy-ups",
      "Feeding & medication visits",
      "Puppy & senior pet care",
    ],
    faqs: [
      { q: "Can I book at-home dog grooming?", a: "Yes — many Prolper pros offer mobile grooming in Mississauga so your pet stays comfortable at home." },
      { q: "How do I choose a pet sitter?", a: "You'll be matched with local pet-care pros and can chat, review ratings, and pick the right fit before booking." },
      { q: "Is dog walking available on a schedule?", a: "Yes, you can book one-off walks or set up a recurring routine with your walker." },
      { q: "Are pet-care pros rated?", a: "Every pro is rated by past customers, so you can book pet care with confidence." },
    ],
  },
  "cpa-services": {
    category: "Professional services",
    intro:
      "Connect with a local CPA in Mississauga for accounting, tax planning and filing. Match with a rated professional and handle it all through the Prolper app.",
    included: [
      "Personal & business tax filing",
      "Bookkeeping & accounting",
      "Tax planning & advice",
      "Small business & self-employed",
      "GST/HST filing",
      "Year-end financial statements",
    ],
    faqs: [
      { q: "Can a CPA help with personal tax returns?", a: "Yes. Prolper matches you with local accountants who handle personal, self-employed and small-business tax filing." },
      { q: "Do you offer year-round accounting?", a: "Many pros offer ongoing bookkeeping and tax planning, not just tax season. Discuss your needs in-chat." },
      { q: "How much do CPA services cost?", a: "Fees vary with the work involved. You'll get a clear estimate from your matched accountant before you commit." },
      { q: "Is my financial information private?", a: "Your details stay private, and communication and payment run securely through the Prolper app." },
    ],
  },
  tutor: {
    category: "Learning services",
    intro:
      "Find a local tutor in Mississauga for academic and personal tutoring in any subject. Match with a rated tutor for in-person or online lessons and book in minutes.",
    included: [
      "Math, science & English",
      "Elementary to high school",
      "Exam & test prep",
      "Homework help & study skills",
      "Languages & music",
      "In-person or online lessons",
    ],
    faqs: [
      { q: "What subjects can I get tutoring for?", a: "Prolper tutors cover a wide range — math, sciences, English, languages, music and more, from elementary through high school and beyond." },
      { q: "Are lessons in person or online?", a: "Both. Many tutors offer in-person sessions in Mississauga as well as online lessons — pick what suits you." },
      { q: "How much does a tutor cost?", a: "Rates vary by subject and level. Your tutor shares their rate up front so you can decide before booking." },
      { q: "Can I book regular sessions?", a: "Yes — arrange one-off help or a recurring weekly schedule with your tutor." },
    ],
  },
  "fitness-coach": {
    category: "Health & fitness",
    intro:
      "Book a personal trainer or fitness coach in Mississauga. Match with a rated coach for training and coaching that fits your goals — at home, in the gym or online.",
    included: [
      "1-on-1 personal training",
      "Custom workout programs",
      "Weight loss & strength coaching",
      "At-home, gym or online sessions",
      "Nutrition & habit guidance",
      "Beginner to advanced levels",
    ],
    faqs: [
      { q: "Do personal trainers come to my home?", a: "Many Prolper coaches offer at-home and outdoor sessions in Mississauga, plus gym and online options. Confirm when you book." },
      { q: "Can a coach help with weight loss?", a: "Yes — trainers build programs around your goals, whether that's weight loss, strength, or general fitness." },
      { q: "How much does a personal trainer cost?", a: "Rates depend on the coach and session type. You'll see the rate up front before you confirm." },
      { q: "I'm a beginner — is that okay?", a: "Absolutely. Coaches work with all levels and tailor sessions to where you're starting from." },
    ],
  },
};

/* Merge shared SERVICES fields (name, icon, accent, img) with the rich content. */
export const SERVICE_CONTENT = SERVICES.reduce((acc, s) => {
  const rich = RICH[s.id] || {};
  acc[s.id] = {
    id: s.id,
    title: s.name,
    icon: s.icon,
    accent: s.accent,
    img: s.img,
    category: rich.category || "Local services",
    intro: rich.intro || s.desc,
    included: rich.included || [],
    faqs: rich.faqs || [],
  };
  return acc;
}, {});

export const ALL_SERVICE_IDS = SERVICES.map((s) => s.id);

/* Up to `n` other services to cross-link (internal linking for SEO). */
export const relatedServices = (id, n = 4) =>
  ALL_SERVICE_IDS.filter((sid) => sid !== id)
    .slice(0, n)
    .map((sid) => SERVICE_CONTENT[sid]);
