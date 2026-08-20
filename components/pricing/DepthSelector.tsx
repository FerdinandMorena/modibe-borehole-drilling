"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tally from "@/components/ui/Tally";
import MagneticButton from "@/components/ui/MagneticButton";
import Eyebrow from "@/components/ui/Eyebrow";
import { PRICING_TIERS, WA_MESSAGES, formatRand, waLink } from "@/lib/site";

const MAX_INDEX = PRICING_TIERS.length - 1;
const DEEPEST = PRICING_TIERS[MAX_INDEX];

/** Depths worth labelling under the track — all sixteen would be a mess. */
const LABELLED = new Set([30, 60, 90, 120]);

const LINES = [
  { key: "drilling", label: "Drilling" },
  { key: "casing", label: "PVC Casing" },
  { key: "pump", label: "Pump" },
] as const;

/**
 * The pricing page's centrepiece. Drag through the sixteen real depth
 * packages and every figure moves with you.
 *
 * The control is a native range input — it is the only way to get correct
 * keyboard stepping, touch handling and screen-reader announcement for free.
 * Everything else here is painted around it. The full table lives below this
 * in a <details> element so the data stays in the DOM for crawlers.
 */
export default function DepthSelector() {
  const [index, setIndex] = useState(5); // 60m — a typical Limpopo borehole.
  const tier = PRICING_TIERS[index];
  const progress = index / MAX_INDEX;

  return (
    <section className="relative overflow-hidden bg-ocean-deep py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 0%, rgba(63,208,232,0.16), transparent 62%)",
        }}
      />

      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="light" align="center">
            Depth Selector
          </Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.14] text-white">
            Find your depth. Watch the price follow.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-white/60">
            These are our real, published package prices — drilling, PVC casing
            and the pump, all in. Nothing here is an estimate.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* ── The bore: a literal read of how deep you are going ── */}
          <div className="relative hidden overflow-hidden rounded-panel border border-white/10 bg-linear-to-b from-[#0B2E4B] to-[#031423] p-7 lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[2.5px] text-white/40">
              Bore Depth
            </p>

            <div className="relative mt-6 h-[340px]">
              {/* Casing walls. */}
              <span className="absolute left-1/2 top-0 h-full w-11 -translate-x-1/2 rounded-b-2xl border-x border-white/10 bg-white/3" />
              {/* Water column, rising with depth. */}
              <motion.span
                className="absolute left-1/2 top-0 w-11 -translate-x-1/2 rounded-b-2xl bg-linear-to-b from-aqua/45 to-aqua/5"
                animate={{ height: `${8 + progress * 92}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              />
              {/* The bit, sitting at the current depth. */}
              <motion.span
                className="absolute left-1/2 z-[2] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-light bg-ocean-deep shadow-[0_0_18px_4px_rgba(63,208,232,0.45)]"
                animate={{ top: `${8 + progress * 92}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              />

              {/* Depth ruler down the right-hand side. */}
              <div className="absolute right-1 top-0 h-full">
                {[30, 60, 90, 120].map((metres) => (
                  <span
                    key={metres}
                    className="absolute right-0 flex -translate-y-1/2 items-center gap-2 text-[11px] text-white/35"
                    style={{ top: `${((metres - 30) / 90) * 92 + 8}%` }}
                  >
                    <span className="h-px w-3 bg-white/20" />
                    {metres}m
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 border-t border-white/8 pt-5 text-center font-display text-4xl text-white">
              <Tally value={tier.depth} format="plain" suffix="m" />
            </p>
          </div>

          {/* ── Figures ─────────────────────────────────────────── */}
          <div className="rounded-panel border border-white/10 bg-white/4 p-7 backdrop-blur-sm sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[2.5px] text-aqua">
                  Selected Package
                </p>
                <p className="mt-2 font-display text-[clamp(34px,5vw,56px)] leading-none text-white lg:hidden">
                  <Tally value={tier.depth} format="plain" suffix="m" />
                </p>
              </div>
              <p className="text-[12.5px] text-white/45">
                Package {index + 1} of {PRICING_TIERS.length}
              </p>
            </div>

            <dl className="mt-8 space-y-5">
              {LINES.map((line) => {
                const amount = tier[line.key];
                const share = amount / DEEPEST.total;
                return (
                  <div key={line.key}>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[14.5px] text-white/65">
                        {line.label}
                      </dt>
                      <dd className="font-display text-[20px] text-white">
                        <Tally value={amount} />
                      </dd>
                    </div>
                    <div
                      aria-hidden
                      className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/8"
                    >
                      <motion.span
                        className="block h-full rounded-full bg-linear-to-r from-aqua-deep to-aqua"
                        animate={{ width: `${share * 100}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 22,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t border-white/12 pt-6">
                <dt className="font-display text-[18px] text-white/80">
                  Total, installed
                </dt>
                <dd className="font-display text-[clamp(32px,4.6vw,48px)] leading-none text-gold-light">
                  <Tally value={tier.total} />
                </dd>
              </div>
            </dl>

            {/* ── The control ───────────────────────────────────── */}
            <div className="mt-10">
              <label
                htmlFor="depth-slider"
                className="mb-3 block text-[12.5px] font-semibold uppercase tracking-[2px] text-white/45"
              >
                Drag to change depth
              </label>
              <div className="relative">
{/* Track and fill are ours; the native input above them stays
                    transparent so keyboard and touch behaviour is untouched. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/12"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-linear-to-r from-aqua to-gold-light transition-[width] duration-300 ease-water"
                  style={{ width: `${progress * 100}%` }}
                />
                <input
                  id="depth-slider"
                  className="depth-range relative"
                  type="range"
                  min={0}
                  max={MAX_INDEX}
                  step={1}
                  value={index}
                  onChange={(event) => setIndex(Number(event.target.value))}
                  aria-valuetext={`${tier.depth} metres, ${formatRand(
                    tier.total,
                  )} total`}
                />
              </div>

              {/*
                Sixteen ticks, four of them labelled.

                The labels are absolutely positioned and only rendered for the
                depths in LABELLED. Previously every tick rendered its label
                and hid the unwanted ones with `opacity-0` — which hides a
                thing visually but leaves it occupying layout width. Sixteen
                labels forced a ~317px minimum row, overflowing every phone
                (46px over on a 375px screen, 101px on a 320px one). Out of
                flow, the row's minimum is just the sixteen 1px ticks.
              */}
              <div className="mt-1 flex justify-between" aria-hidden>
                {PRICING_TIERS.map((step, stepIndex) => (
                  <button
                    key={step.depth}
                    type="button"
                    tabIndex={-1}
                    onClick={() => setIndex(stepIndex)}
                    className="group relative flex min-w-0 flex-1 cursor-pointer flex-col items-center pb-5"
                  >
                    <span
                      className={[
                        "h-2 w-px transition-colors duration-300",
                        stepIndex <= index ? "bg-aqua/60" : "bg-white/15",
                      ].join(" ")}
                    />
                    {LABELLED.has(step.depth) && (
                      <span
                        className={[
                          "absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap",
                          "text-[10.5px] tabular-nums transition-colors duration-300",
                          stepIndex === index ? "text-aqua" : "text-white/35",
                        ].join(" ")}
                      >
                        {step.depth}m
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={waLink(
                  WA_MESSAGES.pricing(tier.depth, formatRand(tier.total)),
                )}
                variant="primary"
              >
                {/* The selected depth is already displayed at ~32px directly
                    above, so the long form is redundant on a phone. */}
                <span className="sm:hidden">WhatsApp this package</span>
                <span className="hidden sm:inline">
                  WhatsApp about the {tier.depth}m package
                </span>
              </MagneticButton>
              <p className="text-[12.5px] leading-relaxed text-white/45">
                Free transport within 65km. Drilling, PVC casing
                <br className="hidden sm:block" /> and the pump are all in this
                figure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
