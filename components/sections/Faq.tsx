import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq";

type FaqProps = {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
  sub?: string;
  className?: string;
};

/**
 * Native <details> accordion — open/close needs no JavaScript, and the
 * answers stay in the DOM for search engines either way.
 */
export default function Faq({
  items = FAQ_ITEMS,
  eyebrow = "Straight Answers",
  title = "The questions people actually ask",
  sub = "Including the one everybody hesitates over. We would rather answer it here than have you wonder.",
  className = "bg-foam py-28 lg:py-32",
}: FaqProps) {
  return (
    <section id="faq" className={className}>
      <div className="wrap">
        <SectionHead
          eyebrow={eyebrow}
          title={title}
          sub={sub}
          className="mb-14"
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index, 4) * 0.05}>
              <details className="group rounded-2xl border border-ocean-mid/10 bg-white px-6 py-1 transition-colors open:border-aqua-deep/25 sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[17px] text-ink transition-colors hover:text-aqua-deep">
                  {item.q}
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ocean-mid/15 text-ink-soft transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-[15px] leading-[1.75] text-ink-soft">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
