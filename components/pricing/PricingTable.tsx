import { PRICING_TIERS, formatRand } from "@/lib/site";

const COLUMNS = [
  { key: "depth", label: "Depth" },
  { key: "drilling", label: "Drilling" },
  { key: "casing", label: "PVC Casing" },
  { key: "pump", label: "Pump" },
  { key: "total", label: "Total" },
] as const;

/**
 * The plain table, kept deliberately secondary to the depth selector but
 * always present in the DOM — inside a <details>, so it is collapsed for
 * sighted visitors yet still crawlable and reachable by assistive tech.
 */
export default function PricingTable() {
  return (
    <details className="group rounded-card border border-ocean-mid/10 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink transition-colors hover:text-aqua-deep sm:px-8">
        <span className="text-[15px]">
          View the full price list — all {PRICING_TIERS.length} depths
        </span>
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ocean-mid/15 text-ink-soft transition-transform duration-300 group-open:rotate-180"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>

      <div className="overflow-x-auto border-t border-ocean-mid/10">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">
            Modibe Borehole Drilling package prices by depth, in South African
            Rand. Each total covers drilling, PVC casing and the pump.
          </caption>
          <thead>
            <tr className="bg-foam/70">
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-5 py-4 text-[11.5px] font-semibold uppercase tracking-[1.6px] text-ink-soft sm:px-7"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICING_TIERS.map((tier) => (
              <tr
                key={tier.depth}
                className="border-t border-ocean-mid/8 transition-colors hover:bg-foam/50"
              >
                <th
                  scope="row"
                  className="px-5 py-4 font-display text-[16px] font-medium text-ink sm:px-7"
                >
                  {tier.depth}m
                </th>
                <td className="px-5 py-4 text-[14.5px] text-ink-soft tabular-nums sm:px-7">
                  {formatRand(tier.drilling)}
                </td>
                <td className="px-5 py-4 text-[14.5px] text-ink-soft tabular-nums sm:px-7">
                  {formatRand(tier.casing)}
                </td>
                <td className="px-5 py-4 text-[14.5px] text-ink-soft tabular-nums sm:px-7">
                  {formatRand(tier.pump)}
                </td>
                <td className="px-5 py-4 font-semibold text-[14.5px] text-ink tabular-nums sm:px-7">
                  {formatRand(tier.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
