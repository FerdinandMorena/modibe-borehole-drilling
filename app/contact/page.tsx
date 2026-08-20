import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Faq from "@/components/sections/Faq";
import WaveDivider from "@/components/ui/WaveDivider";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import MagneticButton from "@/components/ui/MagneticButton";
import { CONTACT, WA_MESSAGES, waLink } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "WhatsApp 060 710 5939, call 073 804 2476 or 015 001 1340, or email gafane.modibe1@gmail.com. Modibe Borehole Drilling serves Polokwane and greater Limpopo.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Tell us where
            <br />
            the property is.
          </>
        }
        sub="WhatsApp is the fastest way to reach us and the one we answer first — you will be talking to the people who will actually be standing on your land."
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href={waLink(WA_MESSAGES.quote)} variant="primary">
            WhatsApp {CONTACT.whatsappDisplay}
          </MagneticButton>
          <MagneticButton href="#contact-form" variant="ghost">
            Use the form instead
          </MagneticButton>
        </div>
      </PageHero>

      {/* ── Channels ────────────────────────────────────────────── */}
      <section className="bg-foam py-24 lg:py-28">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal>
              <a
                href={waLink(WA_MESSAGES.quote)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-card border border-aqua-deep/25 bg-linear-135 from-ocean-mid to-ocean-deep p-8 text-white transition-transform duration-400 ease-water hover:-translate-y-1.5"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-linear-135 from-aqua to-aqua-deep text-ocean-deep">
                  <Icon name="whatsapp" className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-aqua">
                  Fastest — start here
                </p>
                <p className="mt-3 font-display text-[26px] leading-tight">
                  WhatsApp us
                </p>
                <p className="mt-2 font-display text-[20px] text-gold-light">
                  {CONTACT.whatsappDisplay}
                </p>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/60">
                  Send your location and what the water is for. A photo of the
                  spot helps more than you would think.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-aqua">
                  Open WhatsApp
                  <Icon
                    name="arrow-right"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-card border border-ocean-mid/8 bg-white p-8 shadow-card">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-linear-135 from-aqua to-ocean-soft text-white">
                  <Icon name="phone" className="h-5.5 w-5.5" strokeWidth={1.8} />
                </span>
                <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-aqua-deep">
                  Prefer to talk
                </p>
                <p className="mt-3 font-display text-[22px] leading-tight text-ink">
                  Call us
                </p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {CONTACT.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className="font-display text-[19px] text-ink transition-colors hover:text-aqua-deep"
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">
                  If we are on a rig we may not hear it — leave a message or send
                  a WhatsApp and we will come back to you.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex h-full flex-col rounded-card border border-ocean-mid/8 bg-white p-8 shadow-card">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-linear-135 from-aqua to-ocean-soft text-white">
                  <Icon name="mail" className="h-5.5 w-5.5" strokeWidth={1.8} />
                </span>
                <p className="text-[11.5px] font-semibold uppercase tracking-[2.5px] text-aqua-deep">
                  For paperwork
                </p>
                <p className="mt-3 font-display text-[22px] leading-tight text-ink">
                  Email us
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-4 break-all text-[15px] font-semibold text-ink transition-colors hover:text-aqua-deep"
                >
                  {CONTACT.email}
                </a>

                <div className="mt-6 flex-1 border-t border-ocean-mid/8 pt-5">
                  <p className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                    <Icon
                      name="pin"
                      className="mt-0.5 h-4 w-4 shrink-0 text-aqua-deep"
                      strokeWidth={1.8}
                    />
                    <span>
                      <span className="font-semibold text-ink">
                        {CONTACT.region}
                      </span>
                      <br />
                      We cover greater Limpopo. Transport is free within 65km.
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Form ────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        className="scroll-mt-28 bg-white py-24 lg:py-28"
      >
        <div className="wrap">
          <SectionHead
            eyebrow="Request a Quote"
            title="Send us the details"
            sub="The more you can tell us up front, the closer our first answer will be to the real one."
            className="mb-14"
          />
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <WaveDivider fill="#EAF6FA" bg="#FFFFFF" variant={3} />

      <Faq
        items={FAQ_ITEMS.slice(0, 5)}
        eyebrow="Before You Ask"
        title="The five we get most often"
        sub="If yours is not here, send it through — we would rather answer it than have you guess."
        className="bg-foam pt-4 pb-28 lg:pb-32"
      />
    </>
  );
}
