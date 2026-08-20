type PlaceholderNoteProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/**
 * Every piece of unverified content on this site renders next to one of these.
 * Content policy: nothing invented is ever presented as if it were real, so
 * the flag is part of the component contract, not an optional garnish.
 */
export default function PlaceholderNote({
  children,
  tone = "dark",
  align = "center",
  className = "",
}: PlaceholderNoteProps) {
  return (
    <p
      className={[
        "flex items-start gap-2 text-[12px] leading-relaxed",
        align === "center" ? "justify-center text-center" : "text-left",
        tone === "light" ? "text-white/45" : "text-ink-faint",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "mt-[3px] inline-block h-2 w-2 shrink-0 rounded-full",
          tone === "light" ? "bg-gold-light/70" : "bg-gold/70",
        ].join(" ")}
      />
      <span>
        <span className="sr-only">Placeholder content: </span>
        {children}
      </span>
    </p>
  );
}
