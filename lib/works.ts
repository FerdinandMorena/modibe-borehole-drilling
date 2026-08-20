/**
 * REAL FOOTAGE — client-supplied, shot on Modibe sites.
 *
 * These are actual clips from the client's own phone, not stock and not
 * placeholders. That is exactly why the captions below describe only what is
 * visible in each frame and nothing more: no depth, no yield, no location,
 * no client name. None of that was supplied with the footage, and inventing
 * it beside real video would make fabricated data look documented.
 *
 * When the client confirms per-site details, add them here as optional fields
 * and surface them on the card.
 */

export type Work = {
  id: string;
  /** Descriptive title — what the clip actually shows. */
  title: string;
  caption: string;
  /** Seconds, measured with ffprobe. */
  duration: number;
  /** Loose grouping, inferred from what is on screen. */
  stage: "Drilling" | "Casing" | "Water" | "Installation";
};

/** Format seconds as m:ss for the duration badge. */
export function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export const workSrc = (id: string) => `/works/${id}.mp4`;
export const workPoster = (id: string) => `/works/${id}.jpg`;

export const WORKS: Work[] = [
  {
    id: "work-06",
    title: "Rig at work on a home site",
    caption:
      "Drilling in a yard barely wider than the rig, with the crew watching the return come up. Most of our work looks like this — tight spaces, close to the house.",
    duration: 35.6,
    stage: "Drilling",
  },
  {
    id: "work-07",
    title: "Cuttings coming up dry",
    caption:
      "Dry cuttings piling up beside the bore. Reading what comes out of the hole is how we track the ground we are passing through.",
    duration: 48.9,
    stage: "Drilling",
  },
  {
    id: "work-02",
    title: "Water at the surface",
    caption:
      "The moment the bore starts giving water back. This is what the whole job is for.",
    duration: 30.0,
    stage: "Water",
  },
  {
    id: "work-01",
    title: "Tanks up on their stands",
    caption:
      "A finished installation at last light — storage tanks raised on steel stands, plumbed and ready. Height is what gives you pressure with the pump off.",
    duration: 5.4,
    stage: "Installation",
  },
  {
    id: "work-05",
    title: "Drilling alongside the house",
    caption:
      "Wet cuttings spraying out as the bore goes down beside a brick house. The ground here turned over easily once we were through the surface layer.",
    duration: 18.5,
    stage: "Drilling",
  },
  {
    id: "work-03",
    title: "Casing going into the bore",
    caption:
      "Casing entering the hole. It holds the walls open and keeps loose material and surface run-off out of your water.",
    duration: 13.3,
    stage: "Casing",
  },
  {
    id: "work-04",
    title: "Still drilling after dark",
    caption:
      "Work lights on and the rig still turning. When a bore is close to finishing we would rather stay than leave it open overnight.",
    duration: 28.4,
    stage: "Drilling",
  },
];

/** Note shown beside the gallery — the footage is real, the details are not yet supplied. */
export const WORKS_DETAIL_NOTE =
  "This is real footage from Modibe sites. Per-site details — location, final depth and tested yield — have not been supplied yet, so none are shown rather than estimated.";
