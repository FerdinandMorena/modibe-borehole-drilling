/**
 * REAL Google reviews for Modibe Borehole Drilling. Transcribed verbatim.
 *
 * NON-NEGOTIABLE: never write a `quote` for a reviewer who did not leave one.
 * These are real, named people. Inventing words and attributing them to a real
 * person is not the same as using placeholder copy — it is a false statement
 * put in someone's mouth, it breaches the Consumer Protection Act 68 of 2008
 * on false representations, and it is exactly what CLAUDE.md §10 forbids.
 *
 * A star-only review is still worth something: it counts toward the rating and
 * the total. Render it as a rating, not as words. If the client wants written
 * testimonials from those reviewers, the route is to ask them for one.
 *
 * Captured with review ages of 12–14 weeks against 2026-08-20, which puts all
 * four in May 2026.
 */

export type Review = {
  author: string;
  rating: 5;
  /** Verbatim text. Absent means the reviewer left stars only. */
  quote?: string;
  when: string;
  /**
   * Set where the reviewer is not an arms-length customer. "Modibe Gafane"
   * matches the business contact (gafane.modibe1@gmail.com), so it reads as
   * the owner's own review — it is kept out of the on-site testimonials.
   */
  excludeFromSite?: boolean;
};

export const REVIEWS: Review[] = [
  {
    author: "Phuti Morifi",
    rating: 5,
    quote:
      "The best service I've ever got came from MODIBE borehole drilling. They arrived on time at my house, they were so friendly and before they start drilling they explained everything regarding borehole. I was so happy about their service. I wish they can treat all customers the way they treated me.",
    when: "May 2026",
  },
  {
    author: "Lesetja Makhura",
    rating: 5,
    quote: "They do qualify work.",
    when: "May 2026",
  },
  {
    author: "Conley Machuene",
    rating: 5,
    when: "May 2026",
  },
  {
    author: "Modibe Gafane",
    rating: 5,
    when: "May 2026",
    excludeFromSite: true,
  },
];

/** Reviews we are willing to show — everything except the owner's own. */
export const PUBLIC_REVIEWS = REVIEWS.filter((r) => !r.excludeFromSite);

/** Only these can be rendered as quote cards. */
export const WRITTEN_REVIEWS = PUBLIC_REVIEWS.filter((r) => r.quote);

/** Star-only reviews, counted but never given words. */
export const RATING_ONLY_COUNT = PUBLIC_REVIEWS.filter((r) => !r.quote).length;

export const REVIEW_COUNT = PUBLIC_REVIEWS.length;

export const AVERAGE_RATING =
  PUBLIC_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / PUBLIC_REVIEWS.length;
