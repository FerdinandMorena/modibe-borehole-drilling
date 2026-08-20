import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/site";

export default function ProcessSteps({
  className = "bg-foam py-28 lg:py-32",
}: {
  className?: string;
}) {
  return (
    <section id="process" className={className}>
      <div className="wrap">
        <SectionHead
          eyebrow="How It Works"
          title="Our drilling process"
          sub="Four stages, in this order, every time. You will know which one you are in."
          className="mb-16"
        />

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* The line connecting the steps — water finding its way across. */}
          <span
            aria-hidden
            className="absolute inset-x-[12%] top-7 hidden h-px bg-linear-to-r from-transparent via-aqua-deep/25 to-transparent lg:block"
          />

          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.1} className="relative">
              <div className="text-center">
                <span className="droplet mx-auto grid h-14 w-14 place-items-center border-2 border-gold-light bg-linear-135 from-aqua to-ocean-soft shadow-[0_16px_30px_-14px_rgba(20,88,138,0.55)]">
                  <span className="font-display text-[17px] font-semibold text-white">
                    {step.n}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-[16.5px] font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[15rem] text-[13.5px] leading-[1.55] text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
