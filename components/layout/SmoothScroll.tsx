"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Module-level handle on the running Lenis instance so overlays (the mobile
 * nav drawer) can pause scrolling properly rather than fighting it with
 * `overflow: hidden` on the body.
 */
let instance: Lenis | null = null;

export function lockScroll(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

/**
 * Site-wide smooth scroll. Lenis drives the scroll position and GSAP's ticker
 * drives Lenis, so ScrollTrigger and Lenis share one clock — driving them from
 * two separate rAF loops causes pinned sections to jitter.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Gentle exponential out — reads as water settling rather than a snap.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      anchors: true,
      // We drive rAF ourselves through the GSAP ticker below.
      autoRaf: false,
    });

    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP hands us milliseconds; Lenis wants milliseconds too, but the ticker
    // reports seconds — hence the conversion.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
