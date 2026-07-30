/* ──────────────────────────────────────────────────────────
   Mississauga neighbourhood pages for local SEO — service × area.

   Each neighbourhood carries GENUINELY DISTINCT context (housing stock,
   character) so the generated pages are real local content, not thin
   "doorway" duplicates that Google penalises. The distinct `context`
   paragraph is rendered into the page body, not just the title.
   ────────────────────────────────────────────────────────── */

export const NEIGHBORHOODS = {
  "port-credit": {
    name: "Port Credit",
    postal: "L5G",
    blurb: "lakeside condos and older waterfront homes",
    context:
      "Port Credit is Mississauga's waterfront village on Lake Ontario — a walkable mix of heritage houses, low-rise condos, and the shops and marinas along Lakeshore Road East.",
  },
  streetsville: {
    name: "Streetsville",
    postal: "L5M",
    blurb: "heritage houses and village-core properties",
    context:
      "Known as 'the village in the city,' Streetsville keeps its historic main street and older detached homes alongside newer family subdivisions north of the Credit River.",
  },
  "erin-mills": {
    name: "Erin Mills",
    postal: "L5L",
    blurb: "large family homes and master-planned crescents",
    context:
      "Erin Mills is one of Mississauga's big master-planned communities — mostly detached family homes and townhouses, anchored by Erin Mills Town Centre and the University of Toronto Mississauga nearby.",
  },
  "city-centre": {
    name: "City Centre",
    postal: "L5B",
    blurb: "high-rise condos and rental towers around Square One",
    context:
      "Mississauga City Centre is the downtown core around Square One — a dense cluster of high-rise condominiums and rental towers where apartment-friendly, quick-turnaround service matters most.",
  },
  meadowvale: {
    name: "Meadowvale",
    postal: "L5N",
    blurb: "townhomes and tree-lined planned streets",
    context:
      "Meadowvale is a green, planned community in the northwest — a mix of townhomes and detached houses wrapped around conservation land and Lake Aquitaine.",
  },
  "lorne-park": {
    name: "Lorne Park",
    postal: "L5H",
    blurb: "mature, large-lot custom homes",
    context:
      "Lorne Park is an established, leafy neighbourhood of large lots and custom homes between the QEW and the lake — properties where trusted, quality trades are in steady demand.",
  },
};

export const NEIGHBORHOOD_SLUGS = Object.keys(NEIGHBORHOODS);

// Services location-specific enough to warrant per-area pages.
export const LOCAL_SERVICE_IDS = [
  "handyman", "painting", "cleaning", "car-detailing", "pet-care",
];

// Every service × neighbourhood path — consumed by the sitemap + prerenderer.
export const AREA_ROUTES = LOCAL_SERVICE_IDS.flatMap((sid) =>
  NEIGHBORHOOD_SLUGS.map((slug) => `/service/${sid}/${slug}`)
);
