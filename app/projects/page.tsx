import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import WorksGallery from "@/components/projects/WorksGallery";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import WaveDivider from "@/components/ui/WaveDivider";
import SectionHead from "@/components/ui/SectionHead";
import MagneticButton from "@/components/ui/MagneticButton";
import { WA_MESSAGES, waLink } from "@/lib/site";
import { WORKS } from "@/lib/works";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Footage from Modibe Borehole Drilling sites across Limpopo — rigs turning, casing going in, water reaching the surface, and tanks up on their stands.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Filmed on site,
            <br />
            not staged.
          </>
        }
        sub="Every clip below was shot on a Modibe job by the people doing it — rigs turning in tight yards, casing going down, and the moment water finally comes up."
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href={waLink(WA_MESSAGES.quote)} variant="primary">
            Get a quote for your property
          </MagneticButton>
          <MagneticButton href="/pricing" variant="ghost">
            See depth pricing
          </MagneticButton>
        </div>
      </PageHero>

      <section className="bg-foam py-24 lg:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="From the Field"
            title="Seven clips from real jobs"
            sub="Tap any one to play it. They are phone videos from working sites — dust, noise and all — because that is what the job actually looks like."
            className="mb-16"
          />
          <WorksGallery />
        </div>
      </section>

      <WaveDivider fill="#FFFFFF" bg="#EAF6FA" variant={3} />

      <ProcessSteps className="bg-white pb-28 lg:pb-32" />

      <CtaBanner
        heading={
          <>
            Want your property to be{" "}
            <span className="shimmer-gold">the next clip</span>?
          </>
        }
        body={`We have ${WORKS.length} of these and more going up as we work. Send your location and what the water is for, and we will walk the land before we quote a thing.`}
      />
    </>
  );
}
