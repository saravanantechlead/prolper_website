import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/* App store links live in Firestore at config/links:
   { customer_ios, customer_android, business_ios, business_android }.
   Read once and shared across the site — never hardcode store URLs.
   Until the doc loads (or if it's unreachable) we fall back to the internal
   /app and /get-app pages, which already route users to the right download. */
const FALLBACK = {
  customer_ios:     "/app",
  customer_android: "/app",
  business_ios:     "/get-app",
  business_android: "/get-app",
};

let _cache = null;

export default function useAppLinks() {
  const [links, setLinks] = useState(_cache || FALLBACK);

  useEffect(() => {
    if (_cache) return;
    let alive = true;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "config", "links"));
        if (!snap.exists()) throw new Error("config/links missing");
        const d = snap.data() || {};
        const resolved = {
          customer_ios:     d.customer_ios     || FALLBACK.customer_ios,
          customer_android: d.customer_android || FALLBACK.customer_android,
          business_ios:     d.business_ios     || FALLBACK.business_ios,
          business_android: d.business_android || FALLBACK.business_android,
        };
        _cache = resolved;
        if (alive) setLinks(resolved);
      } catch (err) {
        console.error("config/links fetch failed:", err);
        // keep FALLBACK
      }
    })();
    return () => { alive = false; };
  }, []);

  return links;
}
