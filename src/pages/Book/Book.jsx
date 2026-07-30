import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SERVICE_CONTENT, ALL_SERVICE_IDS } from "../../data/services";
import useAppLinks from "../../hooks/useAppLinks";
import useGoogleMaps from "../../hooks/useGoogleMaps";
import Seo from "../../components/Seo/Seo";
import "./Book.css";

// We currently only serve this city; everything else shows "coming soon".
const SUPPORTED_CITY = "mississauga";

/*
 * Web booking flow — DESIGN ONLY (no backend yet).
 * OTP + submit are mocked locally so the whole funnel is clickable.
 * Wiring later: OTP → Firebase phone auth, Confirm → processBooking callable.
 */

// Matches the app exactly: two scheduled windows only (no "Now", no Evening).
const TIME_SLOTS = [
  { id: "9 AM - 1 PM", label: "Morning", sub: "9 AM – 1 PM", icon: "bi-sunrise" },
  { id: "1 PM - 5 PM", label: "Afternoon", sub: "1 PM – 5 PM", icon: "bi-sun" },
];

// The app allows booking today → today + 30 days.
const MAX_ADVANCE_DAYS = 30;

// Morning (9 AM–1 PM) is unavailable on *tomorrow* once it's already past noon
// today — identical rule to the customer app's _isSlotBlockedByDate().
function isMorningBlocked(dateStr) {
  if (!dateStr) return false;
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const picked = new Date(`${dateStr}T00:00:00`);
  return picked.getTime() === tomorrow.getTime() && now.getHours() >= 12;
}

const DETAIL_HINTS = {
  handyman: "wall mounting, door installation, furniture assembly",
  painting: "a room repaint, wall touch-ups, exterior painting",
  cleaning: "deep clean, move-out clean, carpet or window cleaning",
  "car-detailing": "interior clean, exterior wash, wax & polish",
  "pet-care": "grooming, dog walking, pet sitting",
  "cpa-services": "tax filing, bookkeeping, financial planning",
  tutor: "subject, grade level, and goals",
  "fitness-coach": "weight loss, strength training, meal plan",
};

// Services where a photo of the problem/space helps a pro quote — these lead
// the details step with the camera ("Show us the problem") and make text optional.
const VISUAL_SERVICES = new Set([
  "handyman", "painting", "cleaning", "car-detailing", "pet-care",
]);

const STEP_META = [
  { key: "service", label: "Service", icon: "bi-grid-3x3-gap-fill" },
  { key: "address", label: "Location", icon: "bi-geo-alt-fill" },
  { key: "schedule", label: "Date & time", icon: "bi-calendar3" },
  { key: "details", label: "Details", icon: "bi-card-text" },
  { key: "contact", label: "Your info", icon: "bi-person-fill" },
  { key: "verify", label: "Verify", icon: "bi-shield-check" },
  { key: "review", label: "Review", icon: "bi-check2-circle" },
];

export default function Book() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const appLinks = useAppLinks();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    serviceId: serviceId && SERVICE_CONTENT[serviceId] ? serviceId : "",
    serviceQuery: "",
    address: "",
    city: "",
    province: "",
    lat: null,
    lng: null,
    date: "",
    timeSlot: "",
    details: "",
    photos: [],
    name: "",
    countryCode: "+1",
    phone: "",
    otp: ["", "", "", "", "", ""],
  });
  const [otpSent, setOtpSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  useEffect(() => { window.scrollTo(0, 0); }, [step, done]);
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const svc = form.serviceId ? SERVICE_CONTENT[form.serviceId] : null;
  const accent = svc?.accent || "#14b8a6";
  const slot = TIME_SLOTS.find((t) => t.id === form.timeSlot);

  const filteredServices = useMemo(() => {
    const q = form.serviceQuery.trim().toLowerCase();
    return ALL_SERVICE_IDS
      .map((id) => SERVICE_CONTENT[id])
      .filter((s) => s && (!q || s.title.toLowerCase().includes(q)));
  }, [form.serviceQuery]);

  const detailPlaceholder = svc && DETAIL_HINTS[svc.id]
    ? `e.g. ${DETAIL_HINTS[svc.id]}…`
    : "Describe the work you need done…";
  const photoFirst = VISUAL_SERVICES.has(form.serviceId);

  const phoneOk = form.phone.replace(/\D/g, "").length >= 10;
  const otpOk = form.otp.join("").length === 6;
  const canContinue = () => {
    switch (STEP_META[step].key) {
      case "service": return !!form.serviceId;
      case "address": return !!form.address && form.city.toLowerCase() === SUPPORTED_CITY;
      case "schedule": return !!form.date && !!form.timeSlot && !(form.timeSlot === "9 AM - 1 PM" && isMorningBlocked(form.date));
      case "details":
        // Photo-first services can continue on a photo alone; text is optional.
        if (VISUAL_SERVICES.has(form.serviceId))
          return form.photos.length > 0 || form.details.trim().length > 2;
        return form.details.trim().length > 2;
      case "contact": return form.name.trim().length > 1 && phoneOk;
      case "verify": return otpSent && otpOk;
      default: return true;
    }
  };

  const goNext = () => {
    setError("");
    if (STEP_META[step].key === "contact") { sendOtp(); setStep(step + 1); return; }
    setStep((s) => Math.min(s + 1, STEP_META.length - 1));
  };
  const goBack = () => { setError(""); setStep((s) => Math.max(s - 1, 0)); };
  const jumpTo = (i) => { if (i < step) { setError(""); setStep(i); } };

  // Picking a service auto-advances to the address step — one less tap up front.
  const pickService = (id) => {
    set({ serviceId: id });
    setError("");
    setTimeout(() => setStep((s) => (s === 0 ? 1 : s)), 220);
  };

  const sendOtp = () => { setOtpSent(true); setResendIn(30); set({ otp: ["", "", "", "", "", ""] }); };
  const otpRefs = useRef([]);
  const setOtpDigit = (i, v) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...form.otp]; next[i] = d; set({ otp: next });
    if (d && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const onPickPhotos = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4 - form.photos.length);
    const added = files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    set({ photos: [...form.photos, ...added] });
    e.target.value = "";
  };
  const removePhoto = (i) => set({ photos: form.photos.filter((_, x) => x !== i) });

  const submit = () => { setSubmitting(true); setError(""); setTimeout(() => { setSubmitting(false); setDone(true); }, 1400); };

  if (done) return <SuccessView form={form} svc={svc} appLinks={appLinks} onHome={() => navigate("/")} />;

  const pct = Math.round(((step + 1) / STEP_META.length) * 100);
  const stepKey = STEP_META[step].key;

  return (
    <div className="bk-page" style={{ "--bk-accent": accent }}>
      <Seo title="Book a service | Prolper" description="Request a local pro in minutes." path="/book" noindex />

      <header className="bk-top">
        <Link to="/" className="bk-brand"><i className="bi bi-arrow-left" /> Prolper</Link>
        <span className="bk-step-count">Step {step + 1} <em>of {STEP_META.length}</em></span>
      </header>
      <div className="bk-progress"><span style={{ width: `${pct}%` }} /></div>

      <main className="bk-main">
        <div className="bk-layout">
          {/* ── Live summary rail (desktop) ─────────────────────────────── */}
          <aside className="bk-summary">
            <div className="bk-summary-head">
              <span className="bk-summary-kicker">Your request</span>
              <h2>{svc ? svc.title : "New booking"}</h2>
            </div>
            <ol className="bk-timeline">
              <SummaryItem active={stepKey === "service"} done={!!form.serviceId} icon="bi-grid-3x3-gap-fill"
                label="Service" value={svc?.title} onClick={() => jumpTo(0)} />
              <SummaryItem active={stepKey === "address"} done={!!form.address} icon="bi-geo-alt-fill"
                label="Location" value={form.address} onClick={() => jumpTo(1)} />
              <SummaryItem active={stepKey === "schedule"} done={!!form.date && !!form.timeSlot} icon="bi-calendar3"
                label="Date & time" value={form.date ? `${form.date}${slot ? " · " + slot.label : ""}` : ""} onClick={() => jumpTo(2)} />
              <SummaryItem active={stepKey === "details"} done={form.details.trim().length > 2} icon="bi-card-text"
                label="Details" value={form.details} onClick={() => jumpTo(3)} />
              <SummaryItem active={stepKey === "contact" || stepKey === "verify"} done={phoneOk && form.name.length > 1} icon="bi-person-fill"
                label="Your info" value={form.name ? `${form.name} · ${form.countryCode} ${form.phone}` : ""} onClick={() => jumpTo(4)} last />
            </ol>
            <div className="bk-summary-foot">
              <i className="bi bi-shield-lock" /> No payment now — you'll confirm in the app.
            </div>
          </aside>

          {/* ── Step card ───────────────────────────────────────────────── */}
          <div className="bk-card">
            <div className="bk-step-anim" key={step}>
              {stepKey === "service" && (
                <StepShell icon="bi-grid-3x3-gap-fill" title="What do you need done?" sub="Choose the service you're booking.">
                  <div className="bk-search">
                    <i className="bi bi-search" />
                    <input placeholder="Search services…" value={form.serviceQuery} onChange={(e) => set({ serviceQuery: e.target.value })} />
                  </div>
                  <div className="bk-service-grid">
                    {filteredServices.map((s) => (
                      <button key={s.id} type="button"
                        className={`bk-service-tile ${form.serviceId === s.id ? "is-sel" : ""}`}
                        style={{ "--tile": s.accent || "#14b8a6" }}
                        onClick={() => pickService(s.id)}>
                        <span className="bk-service-ic"><i className={`bi ${s.icon || "bi-briefcase"}`} /></span>
                        <span className="bk-service-name">{s.title}</span>
                        {form.serviceId === s.id && <i className="bi bi-check-circle-fill bk-service-check" />}
                      </button>
                    ))}
                    {filteredServices.length === 0 && <p className="bk-empty">No services match “{form.serviceQuery}”.</p>}
                  </div>
                </StepShell>
              )}

              {stepKey === "address" && <AddressStep form={form} set={set} />}

              {stepKey === "schedule" && (
                <StepShell icon="bi-calendar3" title="When works for you?" sub="Pick a preferred date and time window.">
                  <label className="bk-field">
                    <span>Date</span>
                    <div className="bk-input-icon">
                      <i className="bi bi-calendar3" />
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        max={new Date(Date.now() + MAX_ADVANCE_DAYS * 864e5).toISOString().split("T")[0]}
                        value={form.date}
                        onChange={(e) => {
                          const v = e.target.value;
                          // Clear a now-blocked morning slot, exactly like the app.
                          const patch = { date: v };
                          if (form.timeSlot === "9 AM - 1 PM" && isMorningBlocked(v)) patch.timeSlot = "";
                          set(patch);
                        }}
                      />
                    </div>
                  </label>
                  <span className="bk-field-label">Time window</span>
                  <div className="bk-slots">
                    {TIME_SLOTS.map((t) => {
                      const blocked = t.id === "9 AM - 1 PM" && isMorningBlocked(form.date);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          disabled={blocked}
                          className={`bk-slot ${form.timeSlot === t.id ? "is-sel" : ""} ${blocked ? "is-blocked" : ""}`}
                          onClick={() => !blocked && set({ timeSlot: t.id })}
                        >
                          <i className={`bi ${t.icon}`} />
                          <strong>{t.label}</strong>
                          <small>{blocked ? "Unavailable" : t.sub}</small>
                        </button>
                      );
                    })}
                  </div>
                  {isMorningBlocked(form.date) && (
                    <p className="bk-hint bk-slot-note">
                      <i className="bi bi-info-circle" /> Morning (9 AM–1 PM) is unavailable for tomorrow after noon — pick the afternoon slot or a later day.
                    </p>
                  )}
                </StepShell>
              )}

              {stepKey === "details" && (
                <StepShell
                  icon={photoFirst ? "bi-camera-fill" : "bi-card-text"}
                  title={photoFirst ? "Show us the problem" : "Tell the pro about the job"}
                  sub={photoFirst
                    ? "A quick photo helps pros understand the job and quote faster — a note is optional."
                    : "A short description helps them quote accurately."}
                >
                  {photoFirst ? (
                    <>
                      <PhotoGrid photos={form.photos} onAdd={onPickPhotos} onRemove={removePhoto} lead />
                      <label className="bk-field bk-details-note">
                        <span>Add a note <em>(optional)</em></span>
                        <textarea rows={3} placeholder={detailPlaceholder} value={form.details} onChange={(e) => set({ details: e.target.value })} />
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="bk-field">
                        <span>Work details</span>
                        <textarea rows={4} placeholder={detailPlaceholder} value={form.details} onChange={(e) => set({ details: e.target.value })} />
                      </label>
                      <span className="bk-field-label">Photos <em>(optional, up to 4)</em></span>
                      <PhotoGrid photos={form.photos} onAdd={onPickPhotos} onRemove={removePhoto} />
                    </>
                  )}
                </StepShell>
              )}

              {stepKey === "contact" && (
                <StepShell icon="bi-person-fill" title="Almost done" sub="We'll text a code to confirm your number — no password needed.">
                  <label className="bk-field">
                    <span>Your name</span>
                    <div className="bk-input-icon">
                      <i className="bi bi-person" />
                      <input placeholder="Full name" value={form.name} onChange={(e) => set({ name: e.target.value })} />
                    </div>
                  </label>
                  <label className="bk-field">
                    <span>Mobile number</span>
                    <div className="bk-phone">
                      <span className="bk-cc">{form.countryCode}</span>
                      <input inputMode="tel" placeholder="123 456 7890" value={form.phone} onChange={(e) => set({ phone: e.target.value })} />
                    </div>
                    <small className="bk-hint">You'll use this same number to sign in on the app and continue.</small>
                  </label>
                </StepShell>
              )}

              {stepKey === "verify" && (
                <StepShell icon="bi-shield-check" title="Verify your number" sub={`Enter the 6-digit code sent to ${form.countryCode} ${form.phone}.`}>
                  <div className="bk-otp">
                    {form.otp.map((d, i) => (
                      <input key={i} ref={(el) => (otpRefs.current[i] = el)} inputMode="numeric" maxLength={1} value={d}
                        onChange={(e) => setOtpDigit(i, e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Backspace" && !d && i > 0) otpRefs.current[i - 1]?.focus(); }} />
                    ))}
                  </div>
                  <div className="bk-resend">
                    {resendIn > 0 ? <span>Resend code in {resendIn}s</span> : <button type="button" onClick={sendOtp}>Resend code</button>}
                  </div>
                  <p className="bk-demo-note"><i className="bi bi-info-circle" /> Demo: enter any 6 digits.</p>
                </StepShell>
              )}

              {stepKey === "review" && (
                <StepShell icon="bi-check2-circle" title="Review your request" sub="Confirm the details before we notify local pros.">
                  <div className="bk-review">
                    <ReviewRow icon={svc?.icon || "bi-tools"} label="Service" value={svc?.title} />
                    <ReviewRow icon="bi-geo-alt" label="Address" value={form.address} />
                    <ReviewRow icon="bi-calendar3" label="When" value={`${form.date} · ${slot?.sub || form.timeSlot}`} />
                    <ReviewRow icon="bi-card-text" label="Details" value={form.details} />
                    {form.photos.length > 0 && <ReviewRow icon="bi-images" label="Photos" value={`${form.photos.length} attached`} />}
                    <ReviewRow icon="bi-person" label="Name" value={form.name} />
                    <ReviewRow icon="bi-telephone" label="Phone" value={`${form.countryCode} ${form.phone}`} />
                  </div>
                </StepShell>
              )}
            </div>

            {error && <p className="bk-error"><i className="bi bi-exclamation-circle" /> {error}</p>}
          </div>
        </div>
      </main>

      <footer className="bk-nav">
        <div className="bk-nav-inner">
          {step > 0
            ? <button type="button" className="bk-btn bk-btn-ghost" onClick={goBack}><i className="bi bi-arrow-left" /> Back</button>
            : <Link to="/" className="bk-btn bk-btn-ghost">Cancel</Link>}
          {stepKey === "review" ? (
            <button type="button" className="bk-btn bk-btn-primary" disabled={submitting} onClick={submit}>
              {submitting ? <><span className="bk-spin" /> Sending…</> : <>Confirm request <i className="bi bi-check-lg" /></>}
            </button>
          ) : (
            <button type="button" className="bk-btn bk-btn-primary" disabled={!canContinue()} onClick={goNext}>
              {stepKey === "contact" ? "Send code" : "Continue"} <i className="bi bi-arrow-right" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

function SummaryItem({ active, done, icon, label, value, onClick, last }) {
  return (
    <li className={`bk-tl ${active ? "is-active" : ""} ${done ? "is-done" : ""} ${last ? "is-last" : ""}`} onClick={done && !active ? onClick : undefined}>
      <span className="bk-tl-node"><i className={`bi ${done && !active ? "bi-check-lg" : icon}`} /></span>
      <div className="bk-tl-body">
        <span className="bk-tl-label">{label}</span>
        <span className={`bk-tl-value ${value ? "" : "is-empty"}`}>{value || "Not set yet"}</span>
      </div>
    </li>
  );
}

function AddressStep({ form, set }) {
  const { ready, error } = useGoogleMaps();
  const [query, setQuery] = useState(form.address || "");
  const [preds, setPreds] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unsupported, setUnsupported] = useState(""); // city name when not Mississauga
  const placesRef = useRef(null); // google.maps.places namespace (new API)
  const sessionRef = useRef(null);
  const debounceRef = useRef(null);

  // Maps unavailable (ad-blocker / failed load / restricted key) → manual entry.
  const manualMode = error;

  useEffect(() => {
    if (!ready || !window.google?.maps?.places) return;
    try {
      placesRef.current = window.google.maps.places;
      sessionRef.current = new placesRef.current.AutocompleteSessionToken();
    } catch { /* fall back to manual entry */ }
  }, [ready]);

  // Manual fallback: accept the address only if it mentions Mississauga.
  const onManualChange = (v) => {
    setQuery(v);
    const isMiss = v.toLowerCase().includes(SUPPORTED_CITY);
    if (isMiss && v.trim().length > 6) {
      setUnsupported("");
      set({ address: v.trim(), city: "Mississauga", province: "ON", lat: null, lng: null });
    } else {
      set({ address: "", city: "", province: "", lat: null, lng: null });
    }
  };

  const onChange = (v) => {
    setQuery(v);
    setUnsupported("");
    set({ address: "", city: "", province: "", lat: null, lng: null });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const places = placesRef.current;
    if (!places || v.trim().length < 3) { setPreds([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // New Places API — AutocompleteSuggestion (the AutocompleteService replacement).
        // Bias toward the Mississauga area (soft), restrict country to Canada.
        const { suggestions } =
          await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: v.trim(),
            includedRegionCodes: ["ca"],
            locationBias: { north: 43.70, south: 43.47, east: -79.53, west: -79.82 },
            sessionToken: sessionRef.current,
          });
        const list = (suggestions || [])
          .map((s) => s.placePrediction)
          .filter(Boolean);
        setPreds(list);
        setOpen(true);
      } catch {
        setPreds([]); setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const pick = async (p) => {
    setQuery(p.text?.text || "");
    setPreds([]);
    setOpen(false);
    try {
      // New Places API — Place.fetchFields (the PlacesService.getDetails replacement).
      const place = p.toPlace();
      await place.fetchFields({ fields: ["addressComponents", "formattedAddress", "location"] });
      sessionRef.current = new placesRef.current.AutocompleteSessionToken();
      const comp = place.addressComponents || [];
      const g = (type) => comp.find((c) => c.types.includes(type))?.longText || "";
      const city = g("locality") || g("postal_town") || g("sublocality") || "";
      const province = g("administrative_area_level_1");
      const lat = place.location?.lat?.() ?? null;
      const lng = place.location?.lng?.() ?? null;
      if (city.toLowerCase() !== SUPPORTED_CITY) {
        setUnsupported(city || "your area");
        set({ address: "", city: "", province: "", lat: null, lng: null });
        return;
      }
      setUnsupported("");
      set({ address: place.formattedAddress || p.text?.text || "", city, province, lat, lng });
    } catch { /* keep manual value */ }
  };

  const confirmed = form.city.toLowerCase() === SUPPORTED_CITY && form.address;

  return (
    <StepShell icon="bi-geo-alt-fill" title="Where's the job?" sub="We currently operate in Mississauga, ON only — more areas coming soon.">
      <div className="bk-field bk-addr">
        <span>Service address</span>
        <div className="bk-input-icon">
          <i className="bi bi-geo-alt" />
          <input
            placeholder={manualMode ? "Enter your full address in Mississauga, ON…" : ready ? "Start typing your address…" : "Loading address search…"}
            value={query}
            onChange={(e) => (manualMode ? onManualChange(e.target.value) : onChange(e.target.value))}
            onFocus={() => !manualMode && preds.length && setOpen(true)}
            autoComplete="off"
          />
          {loading && !manualMode && <span className="bk-addr-spin" />}
        </div>

        {open && preds.length > 0 && (
          <ul className="bk-addr-list">
            {preds.map((p) => (
              <li key={p.placeId} onMouseDown={() => pick(p)}>
                <i className="bi bi-geo-alt" />
                <span>{p.text?.text || p.mainText?.text || ""}</span>
              </li>
            ))}
          </ul>
        )}

        {confirmed && (
          <>
            <div className="bk-addr-ok"><i className="bi bi-check-circle-fill" /> {form.address}</div>
            <div className="bk-addr-momentum">
              <i className="bi bi-people-fill" />
              <span>You're in our service area — trusted local pros are ready to quote your job.</span>
            </div>
          </>
        )}

        {unsupported && (
          <div className="bk-addr-soon">
            <i className="bi bi-clock-history" />
            <div>
              <strong>Coming soon to {unsupported} 🚧</strong>
              <span>We're currently serving <b>Mississauga, ON</b> only. Get the app and we'll notify you when we launch in your area.</span>
            </div>
          </div>
        )}

        {manualMode && !confirmed && <small className="bk-hint">Address autocomplete is blocked in this browser — type your full Mississauga address to continue.</small>}
        {!manualMode && !confirmed && !unsupported && <small className="bk-hint">Pick a suggestion so we can match you with local pros.</small>}
      </div>
    </StepShell>
  );
}

function PhotoGrid({ photos, onAdd, onRemove, lead }) {
  return (
    <div className={`bk-photos ${lead ? "bk-photos-lead" : ""}`}>
      {photos.map((p, i) => (
        <div className="bk-photo" key={i}>
          <img src={p.url} alt="" />
          <button type="button" onClick={() => onRemove(i)}><i className="bi bi-x" /></button>
        </div>
      ))}
      {photos.length < 4 && (
        <label className={`bk-photo-add ${lead ? "bk-photo-add-lead" : ""}`}>
          <i className="bi bi-camera" />
          <span>{lead ? (photos.length ? "Add another" : "Add a photo") : "Add"}</span>
          <input type="file" accept="image/*" multiple hidden onChange={onAdd} />
        </label>
      )}
    </div>
  );
}

function StepShell({ icon, title, sub, children }) {
  return (
    <div className="bk-step">
      <div className="bk-step-ic"><i className={`bi ${icon}`} /></div>
      <h1 className="bk-title">{title}</h1>
      {sub && <p className="bk-sub">{sub}</p>}
      <div className="bk-body">{children}</div>
    </div>
  );
}

function ReviewRow({ icon, label, value }) {
  return (
    <div className="bk-review-row">
      <i className={`bi ${icon}`} />
      <div>
        <span className="bk-review-label">{label}</span>
        <span className="bk-review-value">{value || "—"}</span>
      </div>
    </div>
  );
}

function SuccessView({ form, svc, appLinks, onHome }) {
  return (
    <div className="bk-page bk-success" style={{ "--bk-accent": svc?.accent || "#14b8a6" }}>
      <Seo title="Request sent | Prolper" description="Your service request was sent." path="/book" noindex />
      <div className="bk-success-card">
        <div className="bk-success-check"><i className="bi bi-check-lg" /></div>
        <h1>Your request is in! 🎉</h1>
        <p className="bk-success-sub">
          We're notifying local pros for <strong>{svc?.title || "your service"}</strong>. You'll get a quote soon.
        </p>
        <div className="bk-next">
          <div className="bk-next-head">
            <i className="bi bi-phone" />
            <div>
              <strong>Next: finish in the Prolper app</strong>
              <span>Download the app and <b>sign up with “Continue with phone number”</b> using the same number — your booking will be waiting for you, ready to chat, quote, and pay.</span>
            </div>
          </div>
          <div className="bk-next-phone">
            <i className="bi bi-telephone-fill" />
            <span>Sign up with <b>{form.countryCode} {form.phone}</b></span>
          </div>
          <p className="bk-next-tip"><i className="bi bi-exclamation-circle" /> Use this exact number so your booking links to your account.</p>
          <div className="bk-stores">
            <a href={appLinks?.customer_ios || "#"} className="bk-store" target="_blank" rel="noopener noreferrer"><i className="bi bi-apple" /> App Store</a>
            <a href={appLinks?.customer_android || "#"} className="bk-store" target="_blank" rel="noopener noreferrer"><i className="bi bi-google-play" /> Google Play</a>
          </div>
        </div>
        <button type="button" className="bk-btn bk-btn-ghost bk-home" onClick={onHome}>Back to home</button>
      </div>
    </div>
  );
}
