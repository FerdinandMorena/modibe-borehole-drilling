"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { formatRand } from "@/lib/site";

type TallyProps = {
  value: number;
  className?: string;
  /** Rands by default; `plain` for depths and other bare numbers. */
  format?: "rand" | "plain";
  suffix?: string;
};

/**
 * A number that counts to its new value whenever it changes.
 *
 * The text node is owned by GSAP, not React: the rendered children are a
 * constant captured on first render, so React never diffs them and never
 * snaps the display to the final figure mid-tween.
 */
export default function Tally({
  value,
  className = "",
  format = "rand",
  suffix = "",
}: TallyProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const render = (n: number) =>
    (format === "rand" ? formatRand(Math.round(n)) : String(Math.round(n))) +
    suffix;
  // Captured once. React therefore sees the same children on every render and
  // never overwrites the text node that GSAP is tweening.
  const [initial] = useState(() => render(value));

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || previous.current === value) {
      el.textContent = render(value);
      previous.current = value;
      return;
    }

    const proxy = { n: previous.current };
    const tween = gsap.to(proxy, {
      n: value,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = render(proxy.n);
      },
    });
    previous.current = value;

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
}
