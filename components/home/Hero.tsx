"use client";

import { motion, useReducedMotion } from "framer-motion";
import AmbientField from "@/components/ui/AmbientField";
import WaveDivider from "@/components/ui/WaveDivider";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroVisual from "./HeroVisual";
import { WA_MESSAGES, waLink } from "@/lib/site";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Two lines, each masked so the words rise out of the line above them.
 * Hand-built rather than run through SplitHeading: the shimmer gradient on
 * "Source" needs to stay on one unbroken element.
 */
function HeroLine({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean | null;
}) {
  if (reduced) return <span className="block">{children}</span>;
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    // pb-44 rather than pb-24: the price card hangs 64px below the visual and
    // the pinned bottom wave is 90px tall, so anything less lets the wave cut
    // across the card.
    <section className="relative flex min-h-screen items-center overflow-hidden pt-36 pb-44">
      <AmbientField />

      <div className="wrap relative z-[2] grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            {...fade(0.1)}
            className="mb-6 text-[12.5px] font-bold uppercase tracking-[3px] text-aqua"
          >
            Polokwane · Limpopo · Water Solutions
          </motion.p>

          <h1 className="font-display text-[clamp(42px,6vw,84px)] font-normal italic leading-[1.02] tracking-[-0.5px] text-white">
            <HeroLine delay={0.15} reduced={reduced}>
              From Surface
            </HeroLine>
            <HeroLine delay={0.28} reduced={reduced}>
              to <span className="shimmer-aqua">Source</span>
            </HeroLine>
          </h1>

          <motion.p
            {...fade(0.5)}
            className="mt-7 max-w-lg text-[18px] leading-[1.65] text-white/75"
          >
            We follow the water down — precision borehole drilling and full
            water-supply care, worked gently into the ground beneath Limpopo.
          </motion.p>

          <motion.div {...fade(0.62)} className="mt-9 flex flex-wrap gap-4">
            <MagneticButton
              href={waLink(WA_MESSAGES.assessment)}
              variant="primary"
            >
              Book a Site Assessment
            </MagneticButton>
            <MagneticButton href="/pricing" variant="ghost">
              See Depth Pricing
            </MagneticButton>
          </motion.div>

          <motion.p
            {...fade(0.74)}
            className="mt-8 text-[12.5px] leading-relaxed text-white/45"
          >
            Limpopo-wide coverage · Free transport within 65km
          </motion.p>
        </div>

        <motion.div
          {...fade(0.4)}
          className="flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll cue — a drop falling into the section below. */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute inset-x-0 bottom-28 z-[2] hidden justify-center lg:flex"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-white/40">
              Surface
            </span>
            <span className="relative block h-14 w-px bg-white/15">
              <motion.span
                className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aqua"
                animate={{ top: ["-4px", "52px"], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </div>
        </motion.div>
      )}

      {/* Pinned inside the hero, over its own gradient — see PageHero. */}
      <WaveDivider fill="#0A3A5C" variant={1} position="bottom" />
    </section>
  );
}
