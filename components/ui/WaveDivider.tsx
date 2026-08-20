type WaveDividerProps = {
  /** Colour of the section *below* the divider. */
  fill: string;
  /**
   * Colour of the section *above* it — the SVG's own ground. Only used in
   * `flow` mode; in `bottom` mode the parent section's background shows
   * through instead, which is why that mode needs no colour matching.
   */
  bg?: string;
  variant?: 1 | 2 | 3;
  /** Mirror vertically, for a divider running the other way. */
  flip?: boolean;
  height?: number;
  /**
   * `flow` — a block between two sections. Needs `bg` set to the colour above
   * it, or the page background shows through the un-filled part of the wave.
   *
   * `bottom` — absolutely pinned to the bottom of the section it sits inside.
   * Preferred after any section with a gradient or image background, where no
   * single `bg` value could match.
   */
  position?: "flow" | "bottom";
  className?: string;
};

/**
 * Never put a hard straight edge between a dark and a light section — the
 * boundary is always water. Three crest shapes keep repeated dividers from
 * reading as a template.
 *
 * The viewBox is deliberately shorter than the paths: they close at y=90 while
 * the viewBox ends at 86, so the fill overshoots and is clipped by the SVG
 * viewport. Landing the fill exactly on the bottom edge left a subpixel
 * hairline at fractional device pixel ratios, which read as a divider rule
 * across the seam. `-mb-px` closes the same gap on the layout side.
 */
const PATHS: Record<1 | 2 | 3, string> = {
  1: "M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,45 L1440,90 L0,90 Z",
  2: "M0,58 C180,18 360,72 600,52 C840,32 1020,78 1200,58 C1320,45 1380,52 1440,38 L1440,90 L0,90 Z",
  3: "M0,26 C300,74 520,10 780,44 C1020,74 1220,34 1440,58 L1440,90 L0,90 Z",
};

export default function WaveDivider({
  fill,
  bg = "transparent",
  variant = 1,
  flip = false,
  height = 90,
  position = "flow",
  className = "",
}: WaveDividerProps) {
  const pinned = position === "bottom";

  return (
    <div
      className={[
        "w-full leading-[0]",
        pinned
          ? "pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
          : "relative -mt-px -mb-px",
        className,
      ].join(" ")}
      style={pinned ? undefined : { backgroundColor: bg }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 86"
        preserveAspectRatio="none"
        style={{
          height,
          width: "100%",
          display: "block",
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}
