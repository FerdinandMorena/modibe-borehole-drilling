import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import {
  AVERAGE_RATING,
  RATING_ONLY_COUNT,
  REVIEW_COUNT,
  WRITTEN_REVIEWS,
} from "@/lib/reviews";

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

/**
 * Real Google reviews. Only reviewers who actually wrote something get a quote
 * card — see `lib/reviews.ts` for why star-only reviews are never given words.
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

        {/* Rating summary — real, and true of the star-only reviews too. */}
        <Reveal>
          <div className="mx-auto mb-12 flex w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-ocean-mid/10 bg-foam/70 px-6 py-3">
            <Stars />
            <p className="font-display text-[19px] text-ink">
              {AVERAGE_RATING.toFixed(1)} out of 5
            </p>
            <p className="text-[13.5px] text-ink-soft">
              from {REVIEW_COUNT} Google reviews
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {WRITTEN_REVIEWS.map((review, index) => (
            <Reveal key={review.author} delay={index * 0.1}>
              <figure className="flex h-full flex-col rounded-card border border-ocean-mid/8 bg-foam/60 p-8">
                <Stars className="mb-4" />
                <blockquote className="flex-1 text-[15.5px] leading-[1.7] text-ink-soft">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-ocean-mid/8 pt-5">
                  <p className="font-display text-[16px] text-ink">
                    {review.author}
                  </p>
                  <p className="mt-1 text-[12.5px] text-ink-faint">
                    Google review · {review.when}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {RATING_ONLY_COUNT > 0 && (
          <p className="mt-8 text-center text-[13px] text-ink-faint">
            Plus {RATING_ONLY_COUNT} more five-star{" "}
            {RATING_ONLY_COUNT === 1 ? "rating" : "ratings"} on Google without a
            written review.
          </p>
        )}
      </div>
    </section>
  );
}
