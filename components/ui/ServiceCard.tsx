import Link from "next/link";
import Icon from "./Icon";
import type { Service } from "@/lib/site";

/**
 * Overview card for a single service. Every icon tile is the same aqua
 * gradient — the seven services are presented as equals, and gold is kept for
 * value emphasis (prices, stat numbers) rather than for ranking them.
 */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex h-full flex-col rounded-card border border-ocean-mid/6 bg-white p-8 shadow-card transition-[transform,box-shadow] duration-400 ease-water hover:-translate-y-1.5 hover:shadow-lift"
    >
      <span className="mb-5 grid h-13 w-13 place-items-center rounded-2xl bg-linear-135 from-aqua to-ocean-soft text-white">
        <Icon name={service.icon} className="h-6.5 w-6.5" />
      </span>

      <h3 className="font-display text-[19px] font-medium text-ink">
        {service.title}
      </h3>
      <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-ink-soft">
        {service.blurb}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-aqua-deep">
        Learn more
        <Icon
          name="arrow-right"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
