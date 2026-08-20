import AmbientField from "@/components/ui/AmbientField";
import WaveDivider from "@/components/ui/WaveDivider";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  /** Extra content — usually a CTA pair or a stat strip. */
  children?: React.ReactNode;
  italic?: boolean;
  /** Colour of the section that follows, for the built-in bottom wave. */
  waveFill?: string;
  waveVariant?: 1 | 2 | 3;
};

/**
 * Shared hero for the five calm pages. Light ambient treatment only: the one
 * cinematic moment on this site is the Surface to Source narrative, and every
 * other hero deliberately stays quieter than it.
 */
export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
  italic = false,
  waveFill = "#EAF6FA",
  waveVariant = 1,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-32">
      <AmbientField />
      <div className="wrap relative z-[2]">
        <div className="max-w-3xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <SplitHeading
            as="h1"
            immediate
            className={[
              "mt-5 font-display font-normal leading-[1.06] tracking-[-0.5px] text-white",
              "text-[clamp(38px,5.4vw,72px)]",
              italic ? "italic" : "",
            ].join(" ")}
          >
            {title}
          </SplitHeading>
          {sub && (
            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-white/70">
              {sub}
            </p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>

      {/* Pinned inside the hero rather than stacked after it: the ambient
          background is a gradient, so no single `bg` colour could match it
          and a flow divider always left a visible seam. */}
      <WaveDivider fill={waveFill} variant={waveVariant} position="bottom" />
    </section>
  );
}
