import Image from "next/image";
import Link from "next/link";
import logoLockup from "@/public/logo-lockup.png";

type LogoProps = {
  /** `light` for dark backgrounds, `dark` for foam/white ones. */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Skip the <Link> wrapper where the logo is already inside one. */
  asLink?: boolean;
};

/**
 * The client's real logo lockup — droplet, drill bit, and the MODIBE /
 * BOREHOLE DRILLING wordmark are all part of the artwork, so no typographic
 * wordmark is drawn alongside it.
 *
 * The lockup's "MODIBE" is a deep blue that sits at roughly 1.2:1 against the
 * ocean-deep nav — invisible on its own. The artwork also ships on a solid
 * white background with no alpha, and keying that white out would take the
 * white water-splash inside the droplet with it. So the logo sits on a white
 * plate: the artwork's own background merges into it seamlessly, and the
 * client's file is used exactly as supplied.
 *
 * `logo-lockup.png` is `public/logo-backup.png` with its white margin trimmed.
 */
const HEIGHTS = { sm: 26, md: 34, lg: 44, xl: 56 } as const;

/** Intrinsic ratio of the trimmed lockup, 1352 × 521. */
const RATIO = 1352 / 521;

export default function Logo({
  tone = "light",
  size = "md",
  className = "",
  asLink = true,
}: LogoProps) {
  const height = HEIGHTS[size];
  const width = Math.round(height * RATIO);

  const mark = (
    <span
      className={[
        "inline-flex items-center overflow-hidden rounded-xl bg-white",
        "transition-[padding,box-shadow] duration-400 ease-water",
        tone === "light"
          ? "px-2.5 py-1.5 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.55)] ring-1 ring-white/25"
          : "px-2.5 py-1.5 ring-1 ring-ocean-mid/10",
      ].join(" ")}
    >
      <Image
        src={logoLockup}
        alt="Modibe Borehole Drilling"
        height={height}
        width={width}
        priority
        sizes="320px"
        style={{ height, width: "auto" }}
        className="block"
      />
    </span>
  );

  if (!asLink) {
    return <span className={className}>{mark}</span>;
  }

  return (
    <Link
      href="/"
      aria-label="Modibe Borehole Drilling — home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      {mark}
    </Link>
  );
}
