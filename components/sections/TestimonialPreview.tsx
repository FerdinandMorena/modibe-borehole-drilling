import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import {
  AVERAGE_RATING,
  REVIEW_COUNT,
  WRITTEN_REVIEWS,
  type Review,
} from "@/lib/reviews";

/**
 * How many copies of the review list the marquee renders.
 *
 * The track translates by exactly one set width, so the loop is seamless as
 * long as `SETS - 1` sets are wider than the viewport. Three sets of four
 * ~360px cards covers roughly 3000px of screen, which is every display this
 * site will realistically meet.
 *
 * MUST stay in step with the -33.3333% in the `marquee-x` keyframe.
 */
const SETS = 3;

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-gold">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-80 shrink-0 flex-col rounded-card border border-ocean-mid/8 bg-foam/60 p-7 sm:w-90 sm:p-8">
      <Stars className="mb-4" />
      <blockquote className="flex-1 text-[15.5px] leading-[1.7] text-ink-soft">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-ocean-mid/8 pt-5">
        <p className="font-display text-[16px] text-ink">{review.author}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Google reviews, drifting horizontally and pausing on hover or keyboard
 * focus. See `lib/reviews.ts` for where each quote came from.
 *
 * The rail is full-bleed rather than inside `.wrap`: a marquee that starts and
 * stops at the page gutter reads as a broken carousel, whereas one running off
 * both edges reads as continuous.
 */
export default function TestimonialPreview() {
  return (
    <section className="bg-white py-28 lg:py-32" aria-label="Client reviews">
      <div className="wrap">
        <SectionHead
          eyebrow="Client Reviews"
          title="What people say once the water is running"
          className="mb-10"
        />

        <Reveal>
          <div className="mx-auto mb-14 flex w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-ocean-mid/10 bg-foam/70 px-6 py-3">
            <Stars />
            <p className="font-display text-[19px] text-ink">
              {AVERAGE_RATING.toFixed(1)} out of 5
            </p>
            <p className="text-[13.5px] text-ink-soft">
              from {REVIEW_COUNT} Google reviews
            </p>
          </div>
        </Reveal>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: SETS }).map((_, set) => (
            <div
              key={set}
              className="flex shrink-0 gap-6 pr-6"
              /* Only the first set is exposed; the copies exist purely to
                 make the loop seamless and would otherwise be read out
                 three times over. */
              aria-hidden={set > 0}
            >
              {WRITTEN_REVIEWS.map((review) => (
                <ReviewCard key={`${set}-${review.author}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
