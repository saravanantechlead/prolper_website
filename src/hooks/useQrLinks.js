import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/* QR images live in Firestore at qr_links/current_qrs:
   { customer_qr_url, business_qr_url }. Publicly readable. Cached per session. */
let _cache = null;

export default function useQrLinks() {
  const [qr, setQr] = useState(_cache || { customer: null, business: null, loading: !_cache });

  useEffect(() => {
    if (_cache) return;
    let alive = true;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "qr_links", "current_qrs"));
        const d = snap.exists() ? snap.data() : {};
        const resolved = {
          customer: d.customer_qr_url || null,
          business: d.business_qr_url || null,
          loading: false,
        };
        _cache = resolved;
        if (alive) setQr(resolved);
      } catch (err) {
        console.error("qr_links fetch failed:", err);
        if (alive) setQr({ customer: null, business: null, loading: false });
      }
    })();
    return () => { alive = false; };
  }, []);

  return qr;
}
