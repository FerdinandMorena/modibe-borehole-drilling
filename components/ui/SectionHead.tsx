import Eyebrow from "./Eyebrow";
import SplitHeading from "./SplitHeading";

type SectionHeadProps = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  /** Italic Fraunces — used where a section wants narrative weight. */
  italic?: boolean;
};

export default function SectionHead({
  eyebrow,
  title,
  sub,
  tone = "dark",
  align = "center",
  className = "",
  italic = false,
}: SectionHeadProps) {
  const centered = align === "center";

  return (
    <div
      className={[
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      ].join(" ")}
    >
      <Eyebrow tone={tone} align={align}>
        {eyebrow}
      </Eyebrow>
      <SplitHeading
        as="h2"
        className={[
          "mt-4 font-display font-normal leading-[1.12] tracking-[-0.01em]",
          "text-[clamp(30px,4vw,46px)]",
          italic ? "italic" : "",
          tone === "light" ? "text-white" : "text-ink",
        ].join(" ")}
      >
        {title}
      </SplitHeading>
      {sub && (
        <p
          className={[
            "mt-4 text-[16.5px] leading-relaxed",
            centered ? "mx-auto" : "",
            tone === "light" ? "text-white/68" : "text-ink-soft",
          ].join(" ")}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
