import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/* Maps the app's Material icon names (stored in Firestore) to the
   Bootstrap Icons the website uses. Unknown icons fall back to a briefcase. */
export const MATERIAL_TO_BI = {
  handyman:           "bi-tools",
  format_paint:       "bi-brush-fill",
  cleaning_services:  "bi-house-heart-fill",
  car_wash:           "bi-car-front-fill",
  pets:               "bi-heart-fill",
  calculate:          "bi-calculator",
  menu_book:          "bi-book-half",
  fitness_center:     "bi-heart-pulse-fill",
  bolt:               "bi-lightning-charge-fill",
  ac_unit:            "bi-snow",
  local_shipping:     "bi-truck",
};

export const biIcon = (materialName) =>
  MATERIAL_TO_BI[materialName] || "bi-briefcase-fill";

/* Accent palette applied to categories by position so the grid stays colourful
   regardless of how many categories the manifest returns. */
export const CATEGORY_ACCENTS = [
  "#14b8a6", "#0ea5e9", "#6366f1", "#f59e0b", "#ec4899", "#22c55e",
  "#8b5cf6", "#ef4444", "#0d9488", "#f43f5e", "#eab308", "#64748b",
];

const EMPTY = { categories: [], services: [] };

/**
 * Loads services/services_manifest LIVE from Firestore and exposes only the
 * pieces the marketing site needs: curated categories and the list of *enabled*
 * services (which power the hero search). No hardcoded fallback — the data is
 * always the live manifest. The successful result is memoised in module state
 * so the hero search + category grid share a single read.
 *
 * Requires a public read rule on `services/services_manifest`; without it the
 * read is denied and the site shows an empty/error state (see `error`).
 */
let _cache = null;

export default function useServiceManifest() {
  const [data, setData] = useState(_cache);
  const [loading, setLoading] = useState(!_cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (_cache) return;
    let alive = true;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "services", "services_manifest"));
        if (!snap.exists()) throw new Error("services_manifest missing");
        const raw = snap.data() || {};

        // Curated categories shown to customers in the app.
        const categories = Array.isArray(raw.categories) ? raw.categories : [];

        // Only enabled services are bookable → only these are searchable.
        const services = Object.values(raw.services || {})
          .filter((s) => s && s.enabled === true)
          .map((s) => ({
            id:          s.id,
            title:       s.title || s.id,
            category:    s.category || "",
            description: s.description || "",
            tags:        Array.isArray(s.tags) ? s.tags : [],
            iconName:    s.iconName || "",
            recommended: s.recommendation === true,
          }))
          .sort((a, b) => a.title.localeCompare(b.title));

        const payload = { categories, services };
        _cache = payload; // cache successful reads only, so failures retry
        if (alive) { setData(payload); setLoading(false); }
      } catch (err) {
        console.error("services_manifest fetch failed:", err);
        if (alive) { setError(true); setLoading(false); }
      }
    })();
    return () => { alive = false; };
  }, []);

  const resolved = data || EMPTY;
  return { ...resolved, loading, error };
}
