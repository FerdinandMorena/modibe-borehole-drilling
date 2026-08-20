import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import DepthSelector from "@/components/pricing/DepthSelector";
import PricingTable from "@/components/pricing/PricingTable";
import Faq from "@/components/sections/Faq";
import CtaBanner from "@/components/sections/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import { ADD_ONS, PRICING_TIERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Borehole Prices by Depth",
  description:
    "Modibe Borehole Drilling's full price list: sixteen packages from 30m to 120m, each covering drilling, PVC casing and the pump. From R16,700. Free transport within 65km.",
};

const CHEAPEST = PRICING_TIERS[0];
const DEEPEST = PRICING_TIERS[PRICING_TIERS.length - 1];

/**
 * Product schema for the two ends of the range, so the price band is legible
 * to search engines without publishing sixteen separate offers.
 */
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Borehole drilling",
  provider: {
    "@type": "LocalBusiness",
    name: "Modibe Borehole Drilling",
    areaServed: "Limpopo, South Africa",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "ZAR",
    lowPrice: CHEAPEST.total,
    highPrice: DEEPEST.total,
    offerCount: PRICING_TIERS.length,
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            What a borehole
            <br />
            actually costs.
          </>
        }
        sub="Sixteen packages, priced by depth, published in full. Drilling, PVC casing and the pump are in every one of them — drag through the depths and the figures move with you."
      />

      <DepthSelector />

      <section className="bg-foam py-24 lg:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="Beyond the Package"
            title="The three extras worth knowing about"
            sub="These sit outside the depth packages. All three are real, published rates — not something we work out once we are on your property."
            className="mb-14"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {ADD_ONS.map((addOn, index) => (
              <Reveal key={addOn.label} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-card border border-ocean-mid/8 bg-white p-8 shadow-card">
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-linear-135 from-aqua to-ocean-soft text-white">
                    <Icon name="check" className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <p className="font-display text-[28px] leading-none text-gold">
                    {addOn.value}
                  </p>
                  <p className="mt-3 font-display text-[17px] text-ink">
                    {addOn.label}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    {addOn.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 max-w-4xl">
            <PricingTable />
          </Reveal>

          <p className="mx-auto mt-6 max-w-4xl text-[13px] leading-relaxed text-ink-faint">
            All figures in South African Rand, covering the work listed in each
            package. These sixteen depths are the packages we publish; the one
            that fits your property is confirmed after the survey, before any
            drilling starts.
          </p>
        </div>
      </section>

      <Faq />

      <CtaBanner
        heading={
          <>
            Know your depth? <span className="shimmer-gold">Let&rsquo;s talk.</span>
          </>
        }
        body="Send us your location and what you need the water for, and we will tell you which package we expect to be drilling on your property."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
    </>
  );
}
