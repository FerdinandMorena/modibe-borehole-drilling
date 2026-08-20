"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/** Only text-bearing tags make sense here, and it keeps call sites honest. */
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

type SplitHeadingProps = {
  children: ReactNode;
  as?: HeadingTag;
  className?: string;
  /** Words rise line-by-line; chars is heavier and reserved for short heads. */
  splitBy?: "words" | "chars";
  /** Fire immediately on mount (hero) rather than waiting for scroll. */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * Headline reveal. Words rise out from behind a per-line mask, so the text
 * appears to well up rather than fade in — the same gesture as water rising
 * in a bore.
 *
 * `.split-heading` starts hidden in `globals.css` so there is no flash of
 * un-split text between first paint and hydration; the `<noscript>` block in
 * the root layout unhides it for visitors without JavaScript. Every path
 * through the effect below ends by calling `reveal()`.
 */
export default function SplitHeading({
  children,
  as = "h2",
  className = "",
  splitBy = "words",
  immediate = false,
  delay = 0,
  stagger = 0.055,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Whatever happens below, the heading must end up visible.
    const reveal = () => gsap.set(el, { visibility: "visible" });

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    const ctx = gsap.context(() => {
      SplitText.create(el, {
        type: splitBy === "chars" ? "lines,words,chars" : "lines,words",
        mask: "lines",
        // Re-splits itself once webfonts land and on resize.
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          reveal();
          const targets = splitBy === "chars" ? self.chars : self.words;
          return gsap.from(targets, {
            yPercent: 115,
            opacity: 0,
            duration: 1.05,
            ease: "power3.out",
            stagger,
            delay,
            scrollTrigger: immediate
              ? undefined
              : { trigger: el, start: "top 85%", once: true },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [splitBy, immediate, delay, stagger]);

  // Cast through the loose ElementType so the shared ref type lines up across
  // every allowed tag rather than being narrowed to one element interface.
  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={`split-heading ${className}`}>
      {children}
    </Tag>
  );
}
