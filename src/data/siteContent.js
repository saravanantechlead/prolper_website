/* ──────────────────────────────────────────────────────────
   CENTRALIZED SITE CONTENT — swap these for your own Prolper
   photos anytime. Every image below is a royalty-free Unsplash
   photo (Unsplash License: free for commercial use). To replace,
   just change the URL (or drop a local file in /assets and import).
   ────────────────────────────────────────────────────────── */

const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

/* The 8 launched services (matches services_manifest categories). */
export const SERVICES = [
  { id: "handyman",      name: "Handyman",      icon: "bi-tools",             desc: "Repairs, mounting, assembly & odd jobs.",       img: U("1731168273756-e02cae42265b"), accent: "#14b8a6" },
  { id: "painting",      name: "Painting",      icon: "bi-brush-fill",        desc: "Interior & exterior painting, done clean.",      img: U("1554995207-c18c203602cb"),    accent: "#0ea5e9" },
  { id: "cleaning",      name: "Cleaning",      icon: "bi-house-heart-fill",  desc: "Home & office cleaning you can rely on.",         img: U("1563453392212-326f5e854473"),  accent: "#6366f1" },
  { id: "car-detailing", name: "Car Detailing", icon: "bi-car-front-fill",    desc: "Wash, polish & interior detailing.",              img: U("1520340356584-f9917d1eea6f"),  accent: "#f59e0b" },
  { id: "pet-care",      name: "Pet Care",      icon: "bi-heart-fill",        desc: "Grooming, sitting & walking for your pets.",      img: U("1548199973-03cce0bbc87b"),     accent: "#ec4899" },
  { id: "cpa-services",  name: "CPA Services",  icon: "bi-calculator-fill",   desc: "Accounting, tax planning & filing.",              img: U("1664382951020-41874ae61a44"),  accent: "#22c55e" },
  { id: "tutor",         name: "Tutor",         icon: "bi-book-half",         desc: "Academic & personal tutoring, any subject.",      img: U("1522881193457-37ae97c905bf"),  accent: "#8b5cf6" },
  { id: "fitness-coach", name: "Fitness Coach", icon: "bi-heart-pulse-fill",  desc: "Personal training & coaching that fits you.",     img: U("1571019614242-c5c5dee9f50b"),  accent: "#ef4444" },
];

/* How it works — 3 steps, each with a real photo */
export const HOW_STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    desc: "Pick a service, choose your location, date and time. It takes less than a minute.",
    img: U("1512428559087-560fa5ceab42"),
  },
  {
    n: "02",
    title: "Get matched with a local pro",
    desc: "Chat or call your pro, receive a clear estimate, and pay securely to confirm the job.",
    img: U("1530983822321-fcac2d3c0f06"),
  },
  {
    n: "03",
    title: "Job done, you rate it",
    desc: "Your pro completes the work, any balance is settled in-app, and you leave a review.",
    img: U("1616377230292-97f202692d74"),
  },
];

/* Reviews — real customer faces */
export const REVIEWS = [
  { name: "Sarah M.",  location: "Mississauga, ON", service: "House Cleaning",   rating: 5, img: U("1573496359142-b8d87734a5a2", 200), text: "Booked a deep clean and someone was at my door the next morning. Friendly, thorough, and the price matched the estimate exactly." },
  { name: "David R.",  location: "Mississauga, ON", service: "Plumbing",         rating: 5, img: U("1560250097-0b93528c311a", 200),  text: "Chatted with a pro in the app, got a quote in minutes, and it was fixed the same day. Prolper is my go-to now." },
  { name: "Amina K.",  location: "Mississauga, ON", service: "Painting",         rating: 5, img: U("1573497019940-1c28c88b4f3e", 200), text: "Loved seeing ratings before choosing. The painter was exactly as advertised, clean, punctual and professional." },
  { name: "Marcus T.", location: "Mississauga, ON", service: "Handyman",         rating: 5, img: U("1500648767791-00dcc994a43e", 200), text: "Paying through the app made everything feel safe. Estimate up front, work done, balance settled. Simple." },
  { name: "Priya S.",  location: "Mississauga, ON", service: "Pet Care",         rating: 4, img: U("1627161683077-e34782c24d81", 200), text: "My dog was groomed at home while I worked. Great communication throughout. Would absolutely use again." },
  { name: "Jason L.",  location: "Mississauga, ON", service: "Car Detailing",    rating: 5, img: U("1519085360753-af0119f7cbe7", 200), text: "A local pro, fair fixed price, zero stress. Being able to rate afterward makes the whole thing feel trustworthy." },
];

