"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Eyebrow from "@/components/ui/Eyebrow";
import GeoCrossSection from "./GeoCrossSection";
import { STRATA } from "@/lib/site";

/**
 * How far below the viewport top the pinned frame sits, clearing the fixed
 * nav. These MUST stay in step with the `top-[88px]` / `lg:top-[104px]`
 * classes on the sticky element below — the scrub begins at the moment the
 * frame pins, and if they drift the first stretch of scroll does nothing.
 */
const NAV_OFFSET = { base: 88, lg: 104 } as const;
const isLg = () => window.matchMedia("(min-width: 1024px)").matches;
const navOffset = () => (isLg() ? NAV_OFFSET.lg : NAV_OFFSET.base);

/** The illustration's own coordinate system. */
const VIEWBOX = { w: 600, h: 1040 } as const;
/** Where the bore starts and ends inside it. */
const BIT_FROM = 56;
const BIT_TO = 900;

/**
 * Where the bit should sit within the visible frame, as a fraction of frame
 * height, at the start and end of the scrub.
 *
 * Below lg the copy is overlaid across the bottom of the panel, so the bit
 * stays in the upper third to keep clear of it. At lg the copy moves down the
 * left-hand side and the bit can use the full height.
 */
const BIT_TRACK = {
  base: { start: 0.1, end: 0.38 },
  lg: { start: 0.16, end: 0.72 },
} as const;

/** Where each stratum boundary sits along the bore, as scroll progress. */
const EDGE_AT = [0.03, 0.23, 0.51, 0.81];
/** Depth ruler marks, in the same units. */
const TICK_AT = [0.03, 0.28, 0.53, 0.78, 1.0];

/**
 * The Surface to Source narrative — the one place on this site where the
 * motion budget goes heavy.
 *
 * The copy lives *inside* the illustration rather than beside it. A split
 * layout made the two halves compete for vertical space, which could only
 * ever be tuned per breakpoint; overlaying them removes the competition, so
 * one composition serves every screen.
 *
 * Sticky positioning rather than a GSAP pin: with Lenis driving scroll,
 * native `position: sticky` stays glued where a pinned spacer can drift.
 */
export default function SurfaceToSource() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    /**
     * `preserveAspectRatio="slice"` means the panel crops the tall viewBox,
     * and how much it crops depends entirely on the panel's shape — the
     * visible window runs from about 290 viewBox units on a short laptop to
     * the full 1040 on a tall phone. So the camera range is measured off the
     * live geometry rather than hardcoded, and recomputed on every refresh.
     */
    const cameraRange = () => {
      const el = frameRef.current;
      const fallback = { from: 210, to: -130 };
      if (!el) return fallback;

      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return fallback;

      const scale = Math.max(width / VIEWBOX.w, height / VIEWBOX.h);
      const visible = height / scale;
      const top = VIEWBOX.h / 2 - visible / 2;
      const band = isLg() ? BIT_TRACK.lg : BIT_TRACK.base;

      return {
        from: top + visible * band.start - BIT_FROM,
        to: top + visible * band.end - BIT_TO,
      };
    };

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          // Re-evaluated on every refresh, so a resize across the lg
          // breakpoint keeps the pin and the scrub aligned.
          start: () => `top ${navOffset()}px`,
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Written straight to the DOM — a React state update per scroll
            // frame would be far more work than this readout is worth.
            if (depthRef.current) {
              depthRef.current.textContent = `${Math.round(
                self.progress * 120,
              )}`;
            }
          },
        },
        defaults: { ease: "none" },
      });

      // The camera travels down through the ground, keeping the bit inside the
      // cropped frame and clear of the overlaid copy at every panel shape.
      timeline.fromTo(
        ".geo-camera",
        { y: () => cameraRange().from },
        { y: () => cameraRange().to, duration: 1 },
        0,
      );

      // The bore and its casing draw down together.
      timeline.fromTo(
        "#geo-bore",
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 1 },
        0,
      );
      timeline.fromTo(
        ".geo-casing",
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 1 },
        0,
      );
      timeline.fromTo(
        "#geo-bit",
        { y: BIT_FROM },
        { y: BIT_TO, duration: 1 },
        0,
      );

      // Each boundary resolves as the bit reaches it.
      gsap.utils.toArray<SVGPathElement>(".geo-edge").forEach((edge, index) => {
        timeline.fromTo(
          edge,
          { drawSVG: "50% 50%" },
          { drawSVG: "0% 100%", duration: 0.14, ease: "power2.out" },
          EDGE_AT[index],
        );
      });

      // Texture within each band arrives just behind its boundary.
      gsap.utils.toArray<SVGGElement>(".geo-texture").forEach((layer, index) => {
        const base = Number(layer.dataset.band ?? index);
        timeline.fromTo(
          layer,
          { opacity: 0 },
          { opacity: 1, duration: 0.12 },
          EDGE_AT[base] + 0.02,
        );
      });

      gsap.utils.toArray<SVGGElement>(".geo-tick").forEach((tick, index) => {
        timeline.fromTo(
          tick,
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.08 },
          TICK_AT[index],
        );
      });

      // The aquifer blooms only once the bore actually reaches it.
      timeline.fromTo(
        "#geo-glow",
        { opacity: 0, scale: 0.55, transformOrigin: "300px 900px" },
        { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" },
        0.82,
      );

      // Copy hands over from one stratum to the next.
      const panels = gsap.utils.toArray<HTMLElement>(".strata-panel");
      panels.forEach((panel, index) => {
        const start = index * 0.24 + 0.02;
        if (index > 0) {
          timeline.fromTo(
            panel,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.07 },
            start,
          );
        }
        if (index < panels.length - 1) {
          timeline.to(
            panel,
            { opacity: 0, y: -26, duration: 0.07 },
            start + 0.21,
          );
        }
      });

      timeline.fromTo(
        ".strata-rail-fill",
        { scaleY: 0 },
        { scaleY: 1, duration: 1 },
        0,
      );

      ScrollTrigger.refresh();
    }, track);

    return () => ctx.revert();
  }, []);

  /* ── Reduced motion: a plain, unpinned telling of the same story ──── */
  if (reduced) {
    return (
      <section
        id="surface-to-source"
        className="relative bg-linear-to-b from-ocean-deep to-[#031423] py-24"
        aria-labelledby="narrative-heading"
      >
        <div className="wrap grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Eyebrow tone="light">Our Approach</Eyebrow>
            <h2
              id="narrative-heading"
              className="mt-4 font-display text-[clamp(30px,4.4vw,50px)] font-normal italic leading-[1.1] text-white"
            >
              From surface to source.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-white/65">
              Every property tells a different story underground. We read it
              first — the land, the soil, the rock beneath it — before a single
              drill bit touches the earth.
            </p>
            <ul className="mt-10 space-y-7">
              {STRATA.map((stratum) => (
                <li key={stratum.label} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: stratum.tone }}
                  />
                  <div>
                    <p className="font-display text-xl text-white">
                      {stratum.label}
                      <span className="ml-3 font-sans text-xs tracking-[2px] text-aqua">
                        {stratum.depth}
                      </span>
                    </p>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/60">
                      {stratum.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-ocean-deep">
            <GeoCrossSection
              variant="static"
              className="h-[520px] w-full lg:h-[680px]"
            />
          </div>
        </div>
      </section>
    );
  }

  /* ── The pinned composition ───────────────────────────────────────── */
  return (
    <section
      id="surface-to-source"
      className="relative bg-linear-to-b from-ocean-deep to-[#031423]"
      aria-labelledby="narrative-heading"
    >
      <div ref={trackRef} className="relative h-[320vh] lg:h-[440vh]">
        <div className="sticky top-[88px] h-[calc(100svh-88px)] overflow-hidden py-4 lg:top-[104px] lg:h-[calc(100svh-104px)] lg:py-8">
          <div className="wrap h-full">
            <div
              ref={frameRef}
              className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-ocean-deep shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)] lg:rounded-[40px]"
            >
              <GeoCrossSection className="absolute inset-0 h-full w-full" />

              {/* Scrim, sized to the copy and nothing more.
                  An earlier version ran `via-ocean-deep/72` across the whole
                  panel, which laid 72% of the section background over every
                  band — all four collapsed to within ~25 RGB of --ocean-deep
                  and the descent looked like one flat colour. The stops below
                  go fully transparent well before the middle of the frame, so
                  the strata read at their true colours. */}
              <div
                aria-hidden
                className="absolute inset-0 lg:hidden"
                style={{
                  background:
                    "linear-gradient(to top, #041B2D 0%, rgba(4,27,45,0.92) 20%, rgba(4,27,45,0.5) 40%, rgba(4,27,45,0) 58%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(to right, #041B2D 0%, rgba(4,27,45,0.88) 22%, rgba(4,27,45,0.35) 42%, rgba(4,27,45,0) 60%)",
                }}
              />

              {/* Depth readout, sitting in the frame like an instrument. */}
              <p
                aria-hidden
                className="absolute right-5 top-5 rounded-full border border-white/12 bg-ocean-deep/60 px-3.5 py-2 text-[11px] tracking-[2px] text-white/45 backdrop-blur-sm lg:right-8 lg:top-8"
              >
                DEPTH{" "}
                <span ref={depthRef} className="font-display text-gold-light">
                  0
                </span>
                <span className="font-display text-gold-light">m</span>
              </p>

              {/* Copy, inside the illustration. */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:justify-center lg:p-14">
                <div className="max-w-md">
                  <Eyebrow tone="light">Our Approach</Eyebrow>
                  <h2
                    id="narrative-heading"
                    className="mt-3 font-display text-[clamp(26px,3.6vw,46px)] font-normal italic leading-[1.08] text-white lg:mt-4"
                  >
                    From surface to source.
                  </h2>
                  <p className="mt-4 hidden max-w-sm text-[15.5px] leading-[1.7] text-white/65 [@media(min-width:1024px)_and_(min-height:760px)]:block">
                    Every property tells a different story underground. We read
                    it first — the land, the soil, the rock beneath it — before
                    a single drill bit touches the earth.
                  </p>

                  <div className="mt-5 flex gap-5 lg:mt-8 lg:gap-6">
                    {/* Progress rail — how far down the bore we are. */}
                    <div
                      aria-hidden
                      className="relative w-px shrink-0 bg-white/15"
                    >
                      <span className="strata-rail-fill absolute inset-x-0 top-0 h-full origin-top bg-linear-to-b from-aqua to-gold-light" />
                    </div>

                    <div className="relative min-h-[124px] flex-1 sm:min-h-[136px] lg:min-h-[150px]">
                      {STRATA.map((stratum, index) => (
                        <div
                          key={stratum.label}
                          className="strata-panel absolute inset-x-0 top-0"
                          style={{ opacity: index === 0 ? 1 : 0 }}
                        >
                          <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[3px] text-aqua">
                            {/* Swatch of the band currently on screen, so the
                                copy and the layer are unmistakably the same
                                thing. */}
                            <span
                              aria-hidden
                              className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/15"
                              style={{ backgroundColor: stratum.tone }}
                            />
                            {stratum.depth}
                          </p>
                          <p className="mt-1.5 font-display text-[clamp(20px,2.4vw,28px)] leading-tight text-white">
                            {stratum.label}
                          </p>
                          <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/60">
                            {stratum.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
