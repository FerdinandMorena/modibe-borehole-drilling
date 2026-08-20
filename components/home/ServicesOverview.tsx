import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { SERVICES } from "@/lib/site";

export default function ServicesOverview() {
  return (
    <section id="services" className="bg-foam py-28 lg:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="What We Do"
          title="Full-spectrum water solutions"
          sub="From the first survey to the last drop, every stage is handled in-house — precise, unhurried, and built to last."
          className="mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}

          {/* Eighth cell balances the 3-column grid and carries the through-line. */}
          <Reveal delay={0.16}>
            <Link
              href="/services"
              className="group flex h-full flex-col justify-between rounded-card border border-ocean-soft/15 bg-linear-135 from-ocean-mid to-ocean-deep p-8 text-white shadow-card transition-transform duration-400 ease-water hover:-translate-y-1.5"
            >
              <div>
                <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-aqua">
                  All Seven Services
                </p>
                <p className="mt-4 font-display text-[22px] leading-snug">
                  One team from the survey to the tap.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                  Drilling, casing, pumps, tanks and fittings — nothing gets
                  handed to a subcontractor halfway through.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-light">
                See every service
                <Icon
                  name="arrow-right"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
