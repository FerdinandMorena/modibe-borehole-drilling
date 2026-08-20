import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { ADD_ONS, PRICING_TIERS, formatRand } from "@/lib/site";

const FIRST = PRICING_TIERS[0];
const LAST = PRICING_TIERS[PRICING_TIERS.length - 1];

export default function PricingTeaser() {
  return (
    <section className="bg-foam pt-28 pb-16 lg:pt-32">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-10 overflow-hidden rounded-panel border border-ocean-mid/8 bg-white p-9 shadow-card lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div>
              <Eyebrow>Transparent Pricing</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] text-ink">
                Sixteen packages, priced by depth.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
                Every package covers drilling, PVC casing and the pump. Drag
                through the depths on our pricing page and watch the figures
                move — no forms, no callback required to see a number.
              </p>

              <ul className="mt-7 space-y-3">
                {ADD_ONS.map((addOn) => (
                  <li
                    key={addOn.label}
                    className="flex items-start gap-3 text-[14px] text-ink-soft"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-aqua-deep"
                      strokeWidth={2.4}
                    />
                    <span>
                      <span className="font-semibold text-ink">
                        {addOn.value}
                      </span>{" "}
                      — {addOn.label.toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <MagneticButton href="/pricing" variant="primary">
                  Open the depth selector
                </MagneticButton>
              </div>
            </div>

            {/* A compressed read of the range, anchoring both ends. */}
            <div className="rounded-card bg-linear-135 from-ocean-mid to-ocean-deep p-8 text-white lg:p-10">
              <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-aqua">
                The Range
              </p>

              <div className="mt-7 space-y-6">
                {[FIRST, LAST].map((tier, index) => (
                  <div key={tier.depth}>
                    <div className="flex items-end justify-between gap-4">
                      <span className="font-display text-[15px] text-white/70">
                        {tier.depth}m package
                      </span>
                      <span className="font-display text-[clamp(26px,3vw,34px)] text-gold-light">
                        {formatRand(tier.total)}
                      </span>
                    </div>
                    <div
                      aria-hidden
                      className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10"
                    >
                      <span
                        className="block h-full rounded-full bg-linear-to-r from-aqua to-gold-light"
                        style={{ width: index === 0 ? "25%" : "100%" }}
                      />
                    </div>
                    <p className="mt-2 text-[12.5px] text-white/45">
                      Drilling {formatRand(tier.drilling)} · Casing{" "}
                      {formatRand(tier.casing)} · Pump {formatRand(tier.pump)}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-t border-white/10 pt-5 text-[13px] leading-relaxed text-white/55">
                Fourteen more depths sit between these two. The selector on the
                pricing page walks you through all of them.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
