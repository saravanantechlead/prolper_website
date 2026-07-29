import { useEffect, useState } from "react";

/*
 * Loads the Google Maps JavaScript API (Places library) once, so we can use
 * AutocompleteService + PlacesService in the browser — the web equivalent of
 * the app's Places REST calls (the REST endpoint is CORS-blocked in browsers).
 *
 * Reads the key from VITE_GOOGLE_PLACES_KEY (see .env, which is gitignored).
 * That key must have "Maps JavaScript API" + "Places API (New)" enabled and
 * allow this site's domain (HTTP referrer) in the Google Cloud console.
 * No key is hardcoded here — if the env var is missing, address search simply
 * falls back to manual entry.
 */
const KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY || "";

let _promise = null;

function loadScript() {
  if (_promise) return _promise;
  if (typeof window !== "undefined" && window.google?.maps?.places) {
    _promise = Promise.resolve();
    return _promise;
  }
  _promise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;
    s.async = true;
    s.defer = true;
    // Only "ready" if the Places library actually initialised.
    s.onload = () =>
      window.google?.maps?.places
        ? resolve()
        : reject(new Error("Google Places unavailable"));
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });
  return _promise;
}

export default function useGoogleMaps() {
  const [ready, setReady] = useState(
    !!(typeof window !== "undefined" && window.google?.maps?.places)
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    loadScript()
      .then(() => alive && setReady(true))
      .catch(() => alive && setError(true));
    return () => { alive = false; };
  }, []);

  return { ready, error };
}
