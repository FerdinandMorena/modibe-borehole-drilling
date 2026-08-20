import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import MagneticButton from "@/components/ui/MagneticButton";
import { WA_MESSAGES, waLink, type Service } from "@/lib/site";

/**
 * One full section per service, alternating side to side so the page reads as
 * a descent rather than a stack of identical rows. Scroll-reveal only — this
 * page stays calm on purpose.
 */
export default function ServiceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const flipped = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className={[
        "scroll-mt-28 py-20 lg:py-24",
        index % 2 === 0 ? "bg-foam" : "bg-white",
      ].join(" ")}
    >
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal
          className={flipped ? "lg:order-2" : ""}
          x={flipped ? 28 : -28}
          y={0}
        >
          <Eyebrow>
            {String(index + 1).padStart(2, "0")} · {service.title}
          </Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] leading-[1.16] text-ink">
            {service.blurb}
          </h2>

          {service.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-5 max-w-xl text-[15.5px] leading-[1.75] text-ink-soft"
            >
              {paragraph}
            </p>
          ))}

          <ul className="mt-7 space-y-2.5">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[14.5px] text-ink"
              >
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-aqua-deep"
                  strokeWidth={2.4}
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <MagneticButton
              href={waLink(WA_MESSAGES.service(service.title))}
              variant="outline"
            >
              Ask about {service.title.toLowerCase()}
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal
          className={flipped ? "lg:order-1" : ""}
          x={flipped ? -28 : 28}
          y={0}
        >
          <ServicePanel service={service} />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The visual side. Vector rather than photography for now — the geological
 * language is the brand's own, and these slots take real site photographs
 * cleanly once the client supplies them.
 */
function ServicePanel({ service }: { service: Service }) {
  return (
    <div
      className="relative aspect-4/3 overflow-hidden rounded-panel border border-ocean-soft/15 bg-linear-135 from-ocean-soft/95 to-ocean-deep p-9"
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      >
        <path
          d="M0 70 C90 44 240 96 400 62"
          stroke="#3FD0E8"
          strokeOpacity="0.35"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M0 140 C110 168 250 112 400 146"
          stroke="#3FD0E8"
          strokeOpacity="0.28"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M0 214 C120 186 260 240 400 208"
          stroke="#3FD0E8"
          strokeOpacity="0.22"
          strokeWidth="1.6"
          fill="none"
        />
      </svg>

      <div className="relative flex h-full flex-col justify-between">
        <span className="grid h-16 w-16 place-items-center rounded-3xl bg-white/10 text-white ring-1 ring-white/15">
          <Icon name={service.icon} className="h-8 w-8" strokeWidth={1.6} />
        </span>

        <div>
          <p className="font-display text-[clamp(24px,3vw,34px)] leading-tight text-white">
            {service.title}
          </p>
          <p className="mt-2 text-[12.5px] uppercase tracking-[2.5px] text-aqua">
            Polokwane &amp; greater Limpopo
          </p>
        </div>
      </div>
    </div>
  );
}
