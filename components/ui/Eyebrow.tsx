type EyebrowProps = {
  children: React.ReactNode;
  /** `light` sits on dark sections, `dark` on foam/white ones. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/**
 * Section eyebrow: Manrope semibold, wide tracking, uppercase, with the
 * small gold gradient rule underneath. Aqua carries the label, gold carries
 * the emphasis — that split is the whole colour logic of the brand.
 */
export default function Eyebrow({
  children,
  tone = "dark",
  align = "left",
  className = "",
}: EyebrowProps) {
  return (
    <span
      className={[
        "relative inline-block pb-2.5 text-[12.5px] font-bold uppercase tracking-[3px]",
        tone === "light" ? "text-aqua" : "text-aqua-deep",
        "after:absolute after:bottom-0 after:h-0.5 after:w-7 after:rounded-full",
        "after:bg-linear-to-r after:from-gold-light after:to-gold",
        align === "center"
          ? "after:left-1/2 after:-translate-x-1/2"
          : "after:left-0",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
