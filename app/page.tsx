import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import SurfaceToSource from "@/components/home/SurfaceToSource";
import PricingTeaser from "@/components/home/PricingTeaser";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialPreview from "@/components/sections/TestimonialPreview";
import CtaBanner from "@/components/sections/CtaBanner";
import WaveDivider from "@/components/ui/WaveDivider";

export default function HomePage() {
  return (
    <>
      <Hero />

      <StatsBar />
      <WaveDivider fill="#EAF6FA" bg="#0A3A5C" variant={2} />

      <ServicesOverview />
      <WaveDivider fill="#041B2D" bg="#EAF6FA" variant={3} />

      <SurfaceToSource />
      <WaveDivider fill="#EAF6FA" bg="#031423" variant={1} />

      <ProcessSteps />
      <TestimonialPreview />

      <PricingTeaser />

      <CtaBanner />
    </>
  );
}
