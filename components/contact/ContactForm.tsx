"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import {
  CONTACT,
  PRICING_TIERS,
  SERVICES,
  WA_MESSAGES,
  formatRand,
  waLink,
} from "@/lib/site";

/**
 * EmailJS credentials. All three are public by design — EmailJS keys are
 * meant to ship to the browser — but they still live in env so the client's
 * account is not baked into the repository.
 */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-2xl border border-ocean-mid/12 bg-white px-4 py-3.5 text-[15px] text-ink " +
  "placeholder:text-ink-faint transition-colors duration-250 " +
  "focus:border-aqua-deep focus:outline-none";

const LABEL =
  "mb-2 block text-[12px] font-semibold uppercase tracking-[1.6px] text-ink-soft";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current || !CONFIGURED) return;

    setStatus("sending");
    setError(null);

    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, {
        publicKey: PUBLIC_KEY!,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error
          ? cause.message
          : "Something went wrong sending your message.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-panel border border-aqua-deep/25 bg-white p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-linear-135 from-aqua to-aqua-deep text-white">
          <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-[24px] text-ink">
          Message sent. Thank you.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
          We will come back to you as soon as we can. If it is urgent, a
          WhatsApp on {CONTACT.whatsappDisplay} will always reach us faster.
        </p>
        <div className="mt-7 flex justify-center">
          <MagneticButton href={waLink(WA_MESSAGES.quote)} variant="primary">
            WhatsApp us instead
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-panel border border-ocean-mid/10 bg-white p-7 shadow-card sm:p-10"
      noValidate={false}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="cf-name">
            Your name
          </label>
          <input
            id="cf-name"
            name="from_name"
            type="text"
            required
            autoComplete="name"
            placeholder="Gafane Modibe"
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-phone">
            Phone / WhatsApp
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="060 710 5939"
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-email">
            Email{" "}
            <span className="font-normal normal-case tracking-normal text-ink-faint">
              (optional)
            </span>
          </label>
          <input
            id="cf-email"
            name="reply_to"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-location">
            Where is the property?
          </label>
          <input
            id="cf-location"
            name="location"
            type="text"
            required
            placeholder="Town or area in Limpopo"
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-service">
            What do you need?
          </label>
          <select
            id="cf-service"
            name="service"
            defaultValue="Borehole Drilling"
            className={FIELD}
          >
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — advise me</option>
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-depth">
            Depth package of interest
          </label>
          <select
            id="cf-depth"
            name="depth_package"
            defaultValue="Not sure yet"
            className={FIELD}
          >
            <option value="Not sure yet">Not sure yet</option>
            {PRICING_TIERS.map((tier) => (
              <option
                key={tier.depth}
                value={`${tier.depth}m — ${formatRand(tier.total)}`}
              >
                {tier.depth}m — {formatRand(tier.total)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="cf-message">
          Anything else we should know?
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="What the water is for, whether there is power on site, how far you are from Polokwane — anything helps."
          className={`${FIELD} resize-y`}
        />
      </div>

      {!CONFIGURED && (
        <p className="mt-6 rounded-2xl border border-gold/30 bg-gold-light/12 px-5 py-4 text-[13.5px] leading-relaxed text-ink-soft">
          <strong className="font-semibold text-ink">
            Form not yet connected.
          </strong>{" "}
          EmailJS credentials are missing, so this form cannot send yet. Add{" "}
          <code className="rounded bg-ocean-mid/8 px-1.5 py-0.5 text-[12.5px]">
            NEXT_PUBLIC_EMAILJS_SERVICE_ID
          </code>
          ,{" "}
          <code className="rounded bg-ocean-mid/8 px-1.5 py-0.5 text-[12.5px]">
            NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
          </code>{" "}
          and{" "}
          <code className="rounded bg-ocean-mid/8 px-1.5 py-0.5 text-[12.5px]">
            NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          </code>{" "}
          to <code>.env.local</code> — see <code>.env.example</code>. WhatsApp
          works right now regardless.
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-[13.5px] leading-relaxed text-red-800"
        >
          We could not send that. {error} Please try again, or WhatsApp us on{" "}
          {CONTACT.whatsappDisplay}.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <MagneticButton
          type="submit"
          variant="primary"
          disabled={!CONFIGURED || status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send this to Modibe"}
        </MagneticButton>

        <a
          href={waLink(WA_MESSAGES.quote)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-aqua-deep transition-colors hover:text-ocean-soft"
        >
          <Icon name="whatsapp" className="h-4 w-4" strokeWidth={1.7} />
          Or WhatsApp us — it is faster
        </a>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
