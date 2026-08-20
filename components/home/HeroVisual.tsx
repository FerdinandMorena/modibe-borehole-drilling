"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import heroVisual from "@/public/hero-visual.png";

/**
 * The hero's explainer image: a photoreal cut-away of a borehole — homestead
 * and tank on the surface, the cased bore descending through topsoil,
 * weathered rock and fractured bedrock, and a submersible pump standing in
 * water at 120m. Its job is to answer "what is this business?" at a glance.
 *
 * This replaced a hand-built SVG diagram of the same composition. The SVG was
 * on-palette and had live, scalable text, but it read as an illustration;
 * this reads as the thing itself. The trade-offs, for whoever picks this up:
 *
 *  - The labels are baked into the pixels. They cannot be restyled, they are
 *    not Manrope, and changing a depth or a layer name means a new render.
 *  - The image is far brighter than the ocean-deep hero around it (luminance
 *    ~98 against ~24), so the framed panel below is load-bearing: it makes the
 *    image read as an inset window rather than something pasted on.
 *  - The source is a 2.79MB PNG, so it must go through `next/image` and never
 *    a raw <img>. Re-encoded at the real display width it is ~a tenth of that.
 *
 * The rising droplets are kept as an overlay because they were the one part
 * of the old diagram doing work a still cannot: showing water actually
 * travelling up out of the ground. Their positions are measured off the
 * image rather than guessed.
 */

/**
 * Measured off the source PNG, as percentages of its box.
 *
 * The pipe was found by its two specular rim highlights — a median luminance
 * profile across x shows bright spikes at 564 and 616 with the dark pipe body
 * between them, giving a centre of 590px on a 1149px image. Earlier attempts
 * used the yellow wellhead cap's centroid (50.13%) and a dark-pixel scan
 * (53.09%); both were wrong, because the cap is wider than the pipe and the
 * dark scan swallowed the shadow falling to the pipe's right.
 *
 *   pipe centre   590 / 1149  = 51.35%
 *   pipe top      424 / 1369  = 30.97%   (emerges below the wellhead cap)
 *   pump top     1187 / 1369  = 86.71%   (luminance jumps 55 -> 146)
 *
 * Re-measure all three if the image is ever re-rendered.
 */
const BORE_X = 51.35;
const PUMP_Y = 86.71;
const WELLHEAD_Y = 30.97;

export default function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-1149/1369 w-full max-w-107.5">
      <div className="absolute inset-0 overflow-hidden rounded-[32px] border border-white/10 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.75)]">
        <Image
          src={heroVisual}
          alt="Cut-away of a borehole on a Limpopo property: a house and a raised green water tank on the surface, a cased bore drilled down through topsoil, weathered rock and fractured bedrock into water-bearing rock at 120 metres, with a submersible pump at the bottom piping water up to the tank."
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 440px, 90vw"
          className="object-cover"
        />

        {/* Water rising up the bore, from the pump to the wellhead. */}
        {!reduced &&
          [0, 1, 2, 3].map((i) => (
            // Two spans on purpose. The outer one is what gets animated, so
            // `top` is a plain position; the inner one carries the -50%/-50%
            // shift that centres the dot on that point. Putting both on one
            // element made `top` anchor the dot's top edge, which sat it half
            // a dot low, and any transform here would fight Framer Motion.
            <motion.span
              key={i}
              aria-hidden
              className="absolute"
              style={{ left: `${BORE_X}%` }}
              initial={{ top: `${PUMP_Y}%`, opacity: 0 }}
              animate={{
                top: [`${PUMP_Y}%`, `${WELLHEAD_Y}%`],
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{
                duration: 4.2,
                delay: i * 1.05,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.12, 0.85, 1],
              }}
            >
              <span
                className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9FEEFB]"
                // Inline rather than a `shadow-[...]` class: Tailwind splits
                // arbitrary shadow values on commas, so the commas inside
                // rgba() stop the utility compiling at all — it silently
                // produced no CSS and the glow never rendered.
                style={{ boxShadow: "0 0 10px 3px rgba(143,230,245,0.55)" }}
              />
            </motion.span>
          ))}
      </div>

      {/*
        Price anchor. Real figure: the 30m package total.

        Overlapping the panel corner, seated low enough to clear the artwork —
        at -bottom-16 only ~28px of the card sits over the image. The hero's
        pb-44 then keeps the card clear of the pinned bottom wave.
      */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute -bottom-16 -left-4 rounded-2xl border border-white/12 bg-ocean-deep/85 px-5 py-4 backdrop-blur-md sm:-left-8"
      >
        <p className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-white/45">
          Packages from
        </p>
        <p className="mt-1 font-display text-2xl text-gold-light">R16,700</p>
        <p className="mt-0.5 text-[11.5px] text-white/45">
          30m · drilling, casing &amp; pump
        </p>
      </motion.div>
    </div>
  );
}
