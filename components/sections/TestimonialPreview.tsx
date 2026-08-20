import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import {
  PLACEHOLDER_TESTIMONIALS,
  TESTIMONIALS_FLAG,
} from "@/lib/placeholders";

export default function TestimonialPreview() {
  return (
    <section className="bg-white py-28 lg:py-32" aria-label="Client stories">
      <div className="wrap">
        <SectionHead
          eyebrow="Client Stories"
          title="What people say once the water is running"
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {PLACEHOLDER_TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <figure className="flex h-full flex-col rounded-card border border-ocean-mid/8 bg-foam/60 p-8">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-gold/35"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-[15px] leading-[1.7] text-ink-soft">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-ocean-mid/8 pt-5">
                  <p className="font-display text-[16px] text-ink">
                    {testimonial.attribution}
                  </p>
                  <p className="mt-1 text-[12.5px] text-ink-faint">
                    {testimonial.context}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <PlaceholderNote className="mt-8">{TESTIMONIALS_FLAG}</PlaceholderNote>
      </div>
    </section>
  );
}
