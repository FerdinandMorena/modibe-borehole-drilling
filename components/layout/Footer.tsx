import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { CONTACT, SERVICES, WA_MESSAGES, waLink } from "@/lib/site";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ocean-deep pt-24 pb-8">
      <div className="wrap">
        <div className="grid gap-12 border-b border-white/8 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" size={"xl"} />
            <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-white/55">
              Precision borehole drilling and full water-supply care across
              Polokwane and greater Limpopo. Family-run, and answerable to the
              people we drill for.
            </p>
            <a
              href={waLink(WA_MESSAGES.quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-aqua/35 bg-aqua/10 px-4 py-2.5 text-[13px] font-semibold text-aqua transition-colors hover:border-aqua hover:bg-aqua/18"
            >
              <Icon name="whatsapp" className="h-4 w-4" strokeWidth={1.7} />
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
          </div>

          <nav aria-label="Company">
            <h2 className="mb-5 text-[12px] font-semibold tracking-[1.8px] text-white/45">
              COMPANY
            </h2>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-aqua"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="mb-5 text-[12px] font-semibold tracking-[1.8px] text-white/45">
              SERVICES
            </h2>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-aqua"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-[12px] font-semibold tracking-[1.8px] text-white/45">
              CONTACT
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/60">
                <Icon
                  name="pin"
                  className="mt-0.5 h-4 w-4 shrink-0 text-aqua/70"
                  strokeWidth={1.7}
                />
                {CONTACT.region}
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="flex items-center gap-2.5 text-white/60 transition-colors hover:text-aqua"
                  >
                    <Icon
                      name="phone"
                      className="h-4 w-4 shrink-0 text-aqua/70"
                      strokeWidth={1.7}
                    />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 break-all text-white/60 transition-colors hover:text-aqua"
                >
                  <Icon
                    name="mail"
                    className="h-4 w-4 shrink-0 text-aqua/70"
                    strokeWidth={1.7}
                  />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-7">
          <p className="text-[12.5px] text-white/35">
            © {new Date().getFullYear()} Modibe Borehole Drilling. All rights
            reserved.
          </p>
          <p className="text-[12.5px] text-white/35">
            Surface to Source · Polokwane, Limpopo
          </p>
        </div>
      </div>
    </footer>
  );
}
