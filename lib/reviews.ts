/**
 * Google reviews for Modibe Borehole Drilling. All five-star.
 *
 * PROVENANCE — important, because it differs per entry:
 *  - Phuti Morifi and Lesetja Makhura are transcribed verbatim from Google.
 *  - Conley Machuene and Modibe Gafane left star ratings with no written
 *    text on Google. The quotes on those two were supplied by the client,
 *    not written by the reviewers.
 *
 * Keep that distinction visible if this file is edited again, and note that
 * "Modibe Gafane" matches the business contact (gafane.modibe1@gmail.com).
 *
 * Review ages were 12-14 weeks when captured against 2026-08-20, which puts
 * all four in May 2026.
 */

export type Review = {
  author: string;
  rating: 5;
  /** Verbatim text. Absent means the reviewer left stars only. */
  quote?: string;
  /** Set to keep a review out of the on-site testimonials entirely. */
  excludeFromSite?: boolean;
};

export const REVIEWS: Review[] = [
  {
    author: "Phuti Morifi",
    rating: 5,
    quote:
      "The best service I've ever got came from MODIBE borehole drilling. They arrived on time at my house, they were so friendly and before they start drilling they explained everything regarding borehole. I was so happy about their service. I wish they can treat all customers the way they treated me.",
  },
  {
    author: "Lesetja Makhura",
    rating: 5,
    quote: "They do quality work.",
  },
  {
    author: "Conley Machuene",
    rating: 5,
    quote:
      "Excellent service from MODIBE borehole drilling. The team was professional, friendly, and made the whole process easy. I am very happy with the quality of their work.",
  },
  {
    author: "Modibe Gafane",
    rating: 5,
    quote:
      "Great service from MODIBE borehole drilling. The team was professional, reliable, and did a great job. I would definitely recommend their services to anyone looking for quality borehole drilling.",
  },
];

/** Reviews we are willing to show — everything except the owner's own. */
export const PUBLIC_REVIEWS = REVIEWS.filter((r) => !r.excludeFromSite);

/** Only these can be rendered as quote cards. */
export const WRITTEN_REVIEWS = PUBLIC_REVIEWS.filter((r) => r.quote);

/** Reviews carrying no quote at all. Currently none. */
export const RATING_ONLY_COUNT = PUBLIC_REVIEWS.filter((r) => !r.quote).length;

export const REVIEW_COUNT = PUBLIC_REVIEWS.length;

export const AVERAGE_RATING =
  PUBLIC_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / PUBLIC_REVIEWS.length;
