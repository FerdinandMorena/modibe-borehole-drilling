/**
 * PLACEHOLDER CONTENT — NOT CLIENT-VERIFIED.
 *
 * Every export in this file is invented scaffolding standing in for real
 * data Modibe has not supplied yet. Per the project content policy, none of
 * it may be rendered without a visible placeholder flag next to it. The
 * `<PlaceholderNote>` component exists for exactly that purpose.
 *
 * When real figures arrive: move them into `lib/site.ts`, delete the entry
 * here, and remove the flag at the call site.
 *
 * The project case studies that used to live here are gone: the client
 * supplied real site footage, which now drives /projects via `lib/works.ts`.
 * Invented depths and yields sitting beside genuine video would have made
 * fabricated numbers look documented.
 */

export const PLACEHOLDER_STATS = [
  { value: 500, suffix: "+", label: "Boreholes Drilled" },
  { value: 98, suffix: "%", label: "Successful Strike Rate" },
  { value: 15, suffix: "+", label: "Years Combined Experience" },
  { value: 24, suffix: "/7", label: "Emergency Response" },
] as const;

export const STATS_FLAG =
  "Placeholder figures — swap in Modibe's verified numbers before launch.";

export type PlaceholderTestimonial = {
  quote: string;
  attribution: string;
  context: string;
};

export const PLACEHOLDER_TESTIMONIALS: PlaceholderTestimonial[] = [
  {
    quote:
      "This is placeholder testimonial copy showing the length and tone a real client story should carry — a few sentences of narrative rather than a single line.",
    attribution: "Client name pending",
    context: "Residential borehole · location pending",
  },
  {
    quote:
      "This is placeholder testimonial copy showing the length and tone a real client story should carry — a few sentences of narrative rather than a single line.",
    attribution: "Client name pending",
    context: "Agricultural borehole · location pending",
  },
  {
    quote:
      "This is placeholder testimonial copy showing the length and tone a real client story should carry — a few sentences of narrative rather than a single line.",
    attribution: "Client name pending",
    context: "Community water point · location pending",
  },
];

export const TESTIMONIALS_FLAG =
  "Placeholder testimonials — no real client quotes have been supplied yet. Nothing here is attributable to a real person.";

export const PLACEHOLDER_TEAM = [
  {
    name: "Name pending",
    role: "Founder / Lead Driller",
    bio: "Placeholder biography. Real team copy and photographs to be supplied by the client.",
  },
  {
    name: "Name pending",
    role: "Site Supervisor",
    bio: "Placeholder biography. Real team copy and photographs to be supplied by the client.",
  },
  {
    name: "Name pending",
    role: "Pump & Installation Lead",
    bio: "Placeholder biography. Real team copy and photographs to be supplied by the client.",
  },
];

export const TEAM_FLAG =
  "Placeholder team profiles — names, roles and photographs are pending from the client.";
