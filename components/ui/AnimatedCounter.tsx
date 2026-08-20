"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type AnimatedCounterProps = {
  value: number;
  /** Rendered straight after the number — "+", "%", "/7". */
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts a stat up when it scrolls into view. The final value is what renders
 * on the server, so the real number is in the HTML for crawlers and for
 * anyone on reduced motion.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const counter = { n: 0 };
    setDisplay(0);

    const tween = gsap.to(counter, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(counter.n)),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-ZA")}
      {suffix}
    </span>
  );
}
