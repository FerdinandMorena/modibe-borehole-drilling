import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServiceSection from "@/components/services/ServiceSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import MagneticButton from "@/components/ui/MagneticButton";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Borehole drilling, testing, PVC and steel casing, electric and pressure pumps, tanks and stands, pipes and fittings — all seven services handled in-house across Polokwane and greater Limpopo.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        waveVariant={2}
        title={
          <>
            Seven services,
            <br />
            one team.
          </>
        }
        sub="Drilling is where it starts, not where it ends. Everything between the survey and the tap running is ours to get right — and none of it gets handed to somebody else halfway through."
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/pricing" variant="primary">
            See depth pricing
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost">
            Talk to us
          </MagneticButton>
        </div>
      </PageHero>

      {SERVICES.map((service, index) => (
        <ServiceSection key={service.slug} service={service} index={index} />
      ))}

      {/* Last service section is foam, so no divider is needed here. */}
      <ProcessSteps className="bg-foam pt-10 pb-28 lg:pb-32" />

      <CtaBanner
        heading={
          <>
            Not sure which of these you{" "}
            <span className="shimmer-gold">actually need</span>?
          </>
        }
        body="Tell us what the water is for — a household, a herd, an orchard — and we will tell you which of the seven apply and which you can skip."
      />
    </>
  );
}
