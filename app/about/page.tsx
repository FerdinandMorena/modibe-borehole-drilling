import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import GeoCrossSection from "@/components/home/GeoCrossSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Faq from "@/components/sections/Faq";
import CtaBanner from "@/components/sections/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Eyebrow from "@/components/ui/Eyebrow";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import Icon from "@/components/ui/Icon";
import { CONTACT, STRATA } from "@/lib/site";
import { PLACEHOLDER_TEAM, TEAM_FLAG } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Modibe Borehole Drilling is a family-run water business in Polokwane, Limpopo. Surface to Source is how we work: read the ground first, then drill.",
};

const VALUES = [
  {
    icon: "pin" as const,
    title: "We are from here",
    body: "Polokwane is home. The people we drill for are neighbours, and that shapes how we quote, how we work, and what we say when the news is not good.",
  },
  {
    icon: "gauge" as const,
    title: "We measure before we promise",
    body: "Nobody can see through rock. We survey, we drill, we test — and we report what we actually found rather than what we hoped for.",
  },
  {
    icon: "droplet" as const,
    title: "One team, start to finish",
    body: "Survey, drilling, casing, pump, tank, pipework. It is the same people from the first walk of the land to the day the tap opens.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        waveVariant={2}
        title={
          <>
            A family business,
            <br />
            working downward.
          </>
        }
        italic
        sub="Modibe Borehole Drilling is a family-run water business based in Polokwane, Limpopo. We drill boreholes, and we stay for the rest of it — the casing, the pump, the tank, the pipe that finally reaches the tap."
      />

      {/* ── Surface to Source, told in full ─────────────────────── */}
      <section className="bg-foam py-24 lg:py-28">
        <div className="wrap">
          <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal>
              <Eyebrow>Surface to Source</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,44px)] font-normal italic leading-[1.14] text-ink">
                The whole business is one idea.
              </h2>
              <div className="mt-6 space-y-5 text-[16px] leading-[1.78] text-ink-soft">
                <p>
                  Water in Limpopo is not lying about waiting to be found. It
                  sits under everything, held in fractures a hundred metres
                  down, and the only way to it is straight through the ground
                  that is in the way.
                </p>
                <p>
                  Surface to Source is the shape of that journey, and it is also
                  how we work. We start at the surface — the land, what you need
                  the water for, what the neighbours&rsquo; boreholes have done.
                  Then we go down through it layer by layer, and we tell you
                  what we find at each one.
                </p>
                <p>
                  It is slower than guessing. It is also the only way we know
                  to hand over a borehole we are willing to put our name on.
                </p>
              </div>

              <ul className="mt-10 space-y-6">
                {STRATA.map((stratum) => (
                  <li key={stratum.label} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: stratum.tone }}
                    />
                    <div>
                      <p className="font-display text-[19px] text-ink">
                        {stratum.label}
                        <span className="ml-3 font-sans text-[11.5px] font-semibold tracking-[2px] text-aqua-deep">
                          {stratum.depth}
                        </span>
                      </p>
                      <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
                        {stratum.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="overflow-hidden rounded-panel border border-ocean-mid/10 bg-ocean-deep shadow-card">
                <GeoCrossSection
                  variant="static"
                  className="h-[560px] w-full lg:h-[720px]"
                />
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint">
                The ground under a Limpopo property, in cross-section. Depths
                shown correspond to our published 30m–120m packages.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="How We Work"
            title="Three things we will not trade away"
            className="mb-14"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-card border border-ocean-mid/8 bg-foam/60 p-8">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-linear-135 from-aqua to-ocean-soft text-white">
                    <Icon name={value.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="font-display text-[19px] text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team (placeholder) ──────────────────────────────────── */}
      <section className="bg-foam py-24 lg:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="The People"
            title="Who will be on your property"
            sub="The same faces from the first site walk to handover. Real names, roles and photographs go here once the family has chosen them."
            className="mb-14"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {PLACEHOLDER_TEAM.map((person, index) => (
              <Reveal key={person.role} delay={index * 0.08}>
                <div className="h-full rounded-card border border-ocean-mid/8 bg-white p-8">
                  <span
                    aria-hidden
                    className="grid h-16 w-16 place-items-center rounded-full border border-dashed border-ocean-mid/25 bg-foam text-ink-faint"
                  >
                    <Icon name="droplet" className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <p className="mt-5 font-display text-[19px] text-ink">
                    {person.name}
                  </p>
                  <p className="mt-1 text-[12.5px] font-semibold uppercase tracking-[2px] text-aqua-deep">
                    {person.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {person.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <PlaceholderNote className="mt-8">{TEAM_FLAG}</PlaceholderNote>
        </div>
      </section>

      <ProcessSteps className="bg-white py-24 lg:py-28" />

      <Faq />

      <CtaBanner
        heading={
          <>
            Come and meet us{" "}
            <span className="shimmer-gold">on your land</span>.
          </>
        }
        body={`We cover ${CONTACT.region} and greater Limpopo. Send a WhatsApp with your location and we will arrange a time to walk the property.`}
      />
    </>
  );
}
