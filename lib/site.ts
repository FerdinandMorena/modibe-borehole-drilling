/**
 * Single source of truth for Modibe's real, client-supplied content.
 * Everything in here came off the client's flyer / brief — do not invent
 * alternatives. Unverified content lives in `lib/placeholders.ts` and is
 * flagged at the point of render.
 */

export const CONTACT = {
  /** Primary channel. This audience WhatsApps far more than it emails. */
  whatsapp: "27607105939",
  whatsappDisplay: "060 710 5939",
  phones: [
    { display: "060 710 5939", tel: "+27607105939" },
    { display: "073 804 2476", tel: "+27738042476" },
    { display: "015 001 1340", tel: "+27150011340" },
  ],
  email: "gafane.modibe1@gmail.com",
  /** Region only — no street address on file. Do not fabricate one. */
  region: "Polokwane, Limpopo",
  regionLong: "Polokwane, Limpopo, South Africa",
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(message?: string): string {
  const base = "https://wa.me/" + CONTACT.whatsapp;
  return message ? base + "?text=" + encodeURIComponent(message) : base;
}

export const WA_MESSAGES = {
  quote:
    "Hi Modibe Borehole Drilling, I would like a quote for a borehole. My property is in ",
  assessment:
    "Hi Modibe Borehole Drilling, I would like to book a site assessment. My property is in ",
  service: (name: string) =>
    "Hi Modibe Borehole Drilling, I would like a quote for " +
    name.toLowerCase() +
    ". My property is in ",
  pricing: (depth: number, total: string) =>
    "Hi Modibe Borehole Drilling, I am interested in the " +
    depth +
    "m package (" +
    total +
    "). Could you confirm this for my property?",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export type IconName =
  | "droplet"
  | "gauge"
  | "casing"
  | "bolt"
  | "pressure"
  | "tank"
  | "pipes";

export type Service = {
  slug: string;
  title: string;
  /** Short card copy — homepage overview. */
  blurb: string;
  /** Long-form copy — /services detail sections. */
  body: string[];
  points: string[];
  icon: IconName;
};

/** The seven real offerings, in the order the client lists them. */
export const SERVICES: Service[] = [
  {
    slug: "borehole-drilling",
    title: "Borehole Drilling",
    blurb:
      "Rotary drilling matched to Limpopo's geology, priced by depth from 30m to 120m.",
    body: [
      "This is the heart of what we do. We drill from 30 metres down to 120 metres, and the depth we recommend comes out of what the ground tells us — not out of a price list we are trying to hit.",
      "Limpopo's geology changes quickly. A property on the edge of Polokwane can sit on weathered granite while the farm ten kilometres out sits on fractured quartzite. We read the site first, then we drill.",
    ],
    points: [
      "Depths from 30m to 120m",
      "Sixteen fixed packages, no surprise line items",
      "Free transport within 65km",
    ],
    icon: "droplet",
  },
  {
    slug: "borehole-testing",
    title: "Borehole Testing",
    blurb:
      "We test before we promise. Yield and quality get measured, never estimated.",
    body: [
      "Once the hole is down, we test it properly — yield over time, how fast the water level recovers, and a clear picture of what the borehole will actually give you day to day.",
      "We would rather give you a hard number than a hopeful one. Testing is what turns a hole in the ground into a water supply you can plan a household or a season around.",
    ],
    points: [
      "Yield and recovery testing",
      "Honest reporting, including bad news",
      "Results explained in plain language",
    ],
    icon: "gauge",
  },
  {
    slug: "pvc-steel-casing",
    title: "PVC & Steel Casing",
    blurb:
      "Casing sized to depth, keeping the bore clean and structurally sound for the long run.",
    body: [
      "Casing is the part nobody sees and everybody depends on. It holds the walls of the borehole open, keeps surface run-off and loose material out, and protects the pump sitting below it.",
      "PVC casing is included in every one of our depth packages. Where the ground calls for it we fit steel instead — charged separately at R850 per metre, so you are never paying for steel you did not need.",
    ],
    points: [
      "PVC casing included in every package",
      "Extra steel casing at R850/m",
      "Sized to the depth of your bore",
    ],
    icon: "casing",
  },
  {
    slug: "electric-pumps",
    title: "Electric Pumps",
    blurb:
      "Submersible electric pumps sized to your borehole's depth and yield.",
    body: [
      "A pump that is too small starves your tank. One that is too big pulls the borehole down faster than it can recover. We size the pump against the yield we measured, not against a catalogue.",
      "Pump supply and installation is built into every depth package on our pricing page — the figure you see there is the figure you pay.",
    ],
    points: [
      "Submersible pumps included in all packages",
      "Sized against your tested yield",
      "Supplied and installed by our own team",
    ],
    icon: "bolt",
  },
  {
    slug: "pressure-pumps",
    title: "Pressure Pumps",
    blurb:
      "Steady household and irrigation pressure, from R5,000 for the pump alone.",
    body: [
      "Getting water out of the ground is one job. Getting it to a shower head or a sprinkler line with real pressure behind it is another one entirely.",
      "A pressure pump on its own is R5,000. Most households add one when the tank sits close to the house, or when the run out to the taps is a long one.",
    ],
    points: [
      "R5,000 for the pressure pump alone",
      "Household and irrigation pressure",
      "Fitted to existing tank setups too",
    ],
    icon: "pressure",
  },
  {
    slug: "tanks-and-stands",
    title: "Tank & Stands",
    blurb:
      "Storage tanks and stands built to hold your supply once the water is up.",
    body: [
      "Storage is what carries you through a pump failure, a power cut, or a dry week. We supply the tanks and we build the stands they sit on.",
      "Height matters more than most people expect. A properly raised stand gives you usable gravity pressure even with the pump switched off.",
    ],
    points: [
      "Tanks supplied and positioned",
      "Stands built to carry a full tank",
      "Gravity-fed pressure without power",
    ],
    icon: "tank",
  },
  {
    slug: "pipes-and-fittings",
    title: "Pipes & Fittings",
    blurb:
      "Everything to connect borehole to tank to tap, supplied and fitted.",
    body: [
      "The last stretch — bore to tank, tank to house, tank to the land — is where a lot of installations quietly leak away their pressure.",
      "We supply and fit the pipework and fittings so the whole run is one system, done by one team, with one number to call if something ever needs attention.",
    ],
    points: [
      "Bore-to-tank and tank-to-tap runs",
      "Supplied and fitted in-house",
      "One team accountable end to end",
    ],
    icon: "pipes",
  },
];

export type PricingTier = {
  depth: number;
  drilling: number;
  casing: number;
  pump: number;
  total: number;
};

/** Real 16-tier price list, in Rands. Do not interpolate between rows. */
export const PRICING_TIERS: PricingTier[] = [
  { depth: 30, drilling: 8100, casing: 3800, pump: 4800, total: 16700 },
  { depth: 35, drilling: 10440, casing: 4400, pump: 5600, total: 20440 },
  { depth: 40, drilling: 12180, casing: 4900, pump: 6400, total: 23480 },
  { depth: 50, drilling: 13920, casing: 5600, pump: 8000, total: 27520 },
  { depth: 55, drilling: 15660, casing: 6600, pump: 8800, total: 31060 },
  { depth: 60, drilling: 17400, casing: 6900, pump: 9000, total: 33300 },
  { depth: 65, drilling: 19140, casing: 7300, pump: 9500, total: 35940 },
  { depth: 70, drilling: 20880, casing: 7300, pump: 10000, total: 38180 },
  { depth: 80, drilling: 22620, casing: 9200, pump: 11300, total: 43120 },
  { depth: 85, drilling: 24360, casing: 9800, pump: 12000, total: 46160 },
  { depth: 90, drilling: 26100, casing: 10000, pump: 12400, total: 48500 },
  { depth: 95, drilling: 27840, casing: 10900, pump: 13700, total: 52440 },
  { depth: 100, drilling: 29580, casing: 12000, pump: 15000, total: 56580 },
  { depth: 105, drilling: 31320, casing: 12800, pump: 15700, total: 59820 },
  { depth: 110, drilling: 33060, casing: 13500, pump: 16500, total: 63060 },
  { depth: 120, drilling: 34800, casing: 15000, pump: 17000, total: 66800 },
];

export const ADD_ONS = [
  {
    label: "Pressure pump on its own",
    value: "R5,000",
    note: "Added to any package, or fitted to a borehole you already have.",
  },
  {
    label: "Extra steel casing",
    value: "R850 / m",
    note: "Only where the ground calls for steel rather than PVC.",
  },
  {
    label: "Transport, 0–65km",
    value: "Free",
    note: "Past 65km we quote the travel up front, before anything is agreed.",
  },
] as const;

/**
 * Real policy line from the flyer. Framed as transparency, inside an FAQ.
 *
 * "No money, no drilling" is CONFIRMED BY THE CLIENT to mean payment terms —
 * drilling is arranged and paid for before the rig comes out. It is NOT a
 * no-water-no-charge guarantee, and must never be written up as one.
 */
export const POLICY_LINE =
  "No water quality can be guaranteed before drilling. No money, no drilling.";

/** The two halves of the policy line, so each can be answered on its own. */
export const POLICY_QUALITY =
  "No water quality can be guaranteed before drilling.";
export const POLICY_PAYMENT = "No money, no drilling.";

export const PROCESS_STEPS = [
  {
    n: 1,
    title: "Site Assessment",
    body: "We walk the land with you and talk through what you actually need the water for.",
  },
  {
    n: 2,
    title: "Geological Survey",
    body: "A ground survey reads the rock beneath the property before we commit to a spot.",
  },
  {
    n: 3,
    title: "Drilling & Casing",
    body: "Monitored drilling to the agreed depth, then full casing for a clean, stable bore.",
  },
  {
    n: 4,
    title: "Test & Handover",
    body: "Yield tested, pump installed, and the tap is yours to open.",
  },
] as const;

/** The four geological bands of the Surface to Source narrative. */
export const STRATA = [
  {
    label: "Topsoil",
    depth: "0 – 6m",
    body: "Where we start. Loose ground and roots — the layer you could turn over with a spade.",
    tone: "#C89055",
  },
  {
    label: "Weathered Rock",
    depth: "6 – 30m",
    body: "The rock has begun to break down. Water moves through it, but rarely enough of it.",
    tone: "#A9AC90",
  },
  {
    label: "Fractured Bedrock",
    depth: "30 – 80m",
    body: "Hard rock, split by ancient stress. Those fractures are the roads water travels.",
    tone: "#6FA8C8",
  },
  {
    label: "The Aquifer",
    depth: "80 – 120m",
    body: "Where the fractures hold water under pressure. This is the source we drill for.",
    tone: "#3FD0E8",
  },
] as const;

export function formatRand(value: number): string {
  return "R" + value.toLocaleString("en-ZA").replace(/ /g, ",");
}
