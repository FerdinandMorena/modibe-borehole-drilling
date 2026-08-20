"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Variant = "primary" | "ghost" | "gold" | "outline";

type MagneticButtonProps = {
  children: ReactNode;
  /** Internal route, external URL, tel: or mailto: — all handled. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  /** How far the button leans toward the cursor, in px. */
  strength?: number;
  disabled?: boolean;
  ariaLabel?: string;
};

const BASE =
  "relative inline-flex items-center justify-center overflow-hidden rounded-full " +
  // max-w-full so a long label wraps inside the pill instead of pushing the
  // button wider than its container on narrow screens.
  "max-w-full px-6 py-[15px] text-center text-[14.5px] font-semibold tracking-[0.01em] sm:px-7 " +
  "transition-[box-shadow,background-color,border-color,color] duration-300 " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-linear-135 from-aqua to-aqua-deep text-ocean-deep shadow-aqua hover:shadow-[0_16px_44px_-10px_rgba(63,208,232,0.7)]",
  ghost:
    "border border-white/35 bg-white/6 text-white hover:border-gold-light hover:bg-white/12",
  gold: "bg-linear-135 from-gold-light to-gold text-ocean-deep shadow-gold hover:shadow-[0_16px_44px_-12px_rgba(201,162,39,0.65)]",
  outline:
    "border border-ocean-soft/25 bg-white text-ocean-mid hover:border-aqua-deep hover:text-aqua-deep",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  strength = 14,
  disabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMove(event: MouseEvent<HTMLElement>) {
    const host = hostRef.current;
    if (!host || reduced) return;
    // Coarse pointers have no hover state to speak of; leave them alone.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = host.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mx.set((dx / (rect.width / 2)) * strength);
    my.set((dy / (rect.height / 2)) * strength);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  /** Water-ripple feedback on press, echoing the droplet motif. */
  function spawnRipple(event: MouseEvent<HTMLElement>) {
    const host = event.currentTarget;
    if (reduced) return;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "btn-ripple";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${event.clientX - rect.left - size / 2}px`;
    span.style.top = `${event.clientY - rect.top - size / 2}px`;
    host.appendChild(span);
    window.setTimeout(() => span.remove(), 650);
  }

  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  const isExternal =
    !!href && /^(https?:|tel:|mailto:|wa\.me)/.test(href);

  const inner = <span className="relative z-[2]">{children}</span>;

  const shared = {
    className: classes,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onMouseDown: spawnRipple,
    "aria-label": ariaLabel,
  };

  return (
    <motion.span
      ref={hostRef}
      style={{ x, y }}
      // max-w-full here as well as on the button: the inner element's
      // max-width resolves against this wrapper, so leaving the wrapper
      // content-sized makes the inner constraint a no-op.
      className="inline-flex max-w-full will-change-transform"
    >
      {href ? (
        isExternal ? (
          <a
            {...shared}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {inner}
          </a>
        ) : (
          <Link {...shared} href={href}>
            {inner}
          </Link>
        )
      ) : (
        <button
          {...shared}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          {inner}
        </button>
      )}
    </motion.span>
  );
}
