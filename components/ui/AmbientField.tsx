/**
 * The ambient hero treatment used on every page: a deep ocean gradient, an
 * aqua bloom in the upper right, and a slowly drifting speck field. Light
 * enough to sit under text on calm pages — the cinematic motion budget stays
 * with the Surface to Source section.
 */
export default function AmbientField({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 600px at 82% 8%, rgba(63,208,232,0.20), transparent 60%), linear-gradient(165deg, #041B2D 0%, #0A3A5C 62%, #14588A 100%)",
        }}
      />
      <div
        className="absolute inset-0 animate-drift"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0, transparent 3%)",
            "radial-gradient(circle at 60% 70%, rgba(255,255,255,0.04) 0, transparent 2.4%)",
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0, transparent 2%)",
            "radial-gradient(circle at 38% 82%, rgba(255,255,255,0.035) 0, transparent 2.2%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
