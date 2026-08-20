import AnimatedCounter from "@/components/ui/AnimatedCounter";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import Reveal from "@/components/ui/Reveal";
import { PLACEHOLDER_STATS, STATS_FLAG } from "@/lib/placeholders";

export default function StatsBar() {
  return (
    <section className="bg-ocean-mid pb-24" aria-label="Company figures">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {PLACEHOLDER_STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="h-full rounded-[20px] border border-white/10 bg-white/6 px-6 py-8 text-center backdrop-blur-[6px]">
                <p className="font-display text-[38px] font-medium leading-none text-gold-light">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2.5 text-[12.5px] tracking-[0.4px] text-white/65">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <PlaceholderNote tone="light" className="mt-6">
          {STATS_FLAG}
        </PlaceholderNote>
      </div>
    </section>
  );
}
