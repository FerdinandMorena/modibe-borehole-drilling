"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import MagneticButton from "@/components/ui/MagneticButton";
import { lockScroll } from "@/components/layout/SmoothScroll";
import { NAV_LINKS, WA_MESSAGES, waLink } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  // The header changes height with the logo size and the scrolled state, so
  // the drawer measures it rather than assuming a fixed offset.
  const [headerHeight, setHeaderHeight] = useState(88);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(([entry]) =>
      setHeaderHeight(entry.contentRect.height),
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Close the drawer whenever the route changes under it. Adjusting state
  // during render rather than in an effect avoids a second render pass with
  // the drawer still open over the new page.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // The drawer covers the page; the page behind it should not scroll.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    lockScroll(open);
    return () => {
      document.body.style.overflow = "";
      lockScroll(false);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-aqua focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ocean-deep"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={[
          "fixed inset-x-0 top-0 z-[100] border-b border-white/8",
          "backdrop-blur-[14px] backdrop-saturate-[140%]",
          "transition-[background-color,padding] duration-400 ease-water",
          scrolled || open
            ? "bg-ocean-deep/85 py-3.5"
            : "bg-ocean-deep/28 py-5",
        ].join(" ")}
      >
        <nav
          className="wrap-wide flex items-center justify-between"
          aria-label="Primary"
        >
          <Logo tone="light" size={scrolled ? "md" : "lg"} />

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative text-sm font-medium transition-colors duration-250",
                    active ? "text-white" : "text-white/78 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    className={[
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-linear-to-r from-gold-light to-gold transition-transform duration-400 ease-water",
                      active ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <MagneticButton
                href={waLink(WA_MESSAGES.quote)}
                variant="primary"
                className="px-6 py-3 text-[13.5px]"
              >
                Request a Quote
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-light lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ top: headerHeight }}
            className="fixed inset-x-0 z-[99] border-b border-white/10 bg-ocean-deep/97 backdrop-blur-xl lg:hidden"
          >
            <div className="wrap flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/6 py-4 font-display text-2xl text-white/85 transition-colors hover:text-aqua"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-col gap-3 pb-4">
                <MagneticButton
                  href={waLink(WA_MESSAGES.quote)}
                  variant="primary"
                  className="w-full"
                >
                  WhatsApp us for a quote
                </MagneticButton>
                <p className="text-center text-xs text-white/45">
                  Or call 060 710 5939 — Polokwane &amp; greater Limpopo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
