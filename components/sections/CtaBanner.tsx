import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { WA_MESSAGES, waLink } from "@/lib/site";

const BUBBLES = [
  { left: "10%", size: 16, duration: 7, delay: 0 },
  { left: "30%", size: 10, duration: 9, delay: 1.5 },
  { left: "55%", size: 20, duration: 8, delay: 0.5 },
  { left: "75%", size: 12, duration: 10, delay: 2 },
  { left: "90%", size: 8, duration: 6.5, delay: 1 },
];

type CtaBannerProps = {
  heading?: React.ReactNode;
  body?: string;
  className?: string;
};

export default function CtaBanner({
  heading = (
    <>
      Ready to secure your{" "}
      <span className="shimmer-gold">water source</span>?
    </>
  ),
  body = "Sixteen tailored packages, built around your property's size and what you need the water for.",
  className = "bg-foam pb-28 lg:pb-32",
}: CtaBannerProps) {
  return (
    <section className={className}>
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-linear-135 from-ocean-soft to-ocean-mid px-8 py-20 text-center sm:px-12">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {BUBBLES.map((bubble, index) => (
                <span
                  key={index}
                  className="absolute -bottom-10 rounded-full bg-white/12 animate-rise"
                  style={{
                    left: bubble.left,
                    width: bubble.size,
                    height: bubble.size,
                    animationDuration: `${bubble.duration}s`,
                    animationDelay: `${bubble.delay}s`,
                  }}
                />
              ))}
            </div>

            <h2 className="relative z-[2] mx-auto max-w-2xl font-display text-[clamp(28px,4vw,44px)] font-normal italic leading-[1.15] text-white">
              {heading}
            </h2>
            <p className="relative z-[2] mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/72">
              {body}
            </p>

            <div className="relative z-[2] mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton href={waLink(WA_MESSAGES.quote)} variant="primary">
                Get Your Custom Quote
              </MagneticButton>
              <MagneticButton href="/pricing" variant="ghost">
                See Pricing
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
