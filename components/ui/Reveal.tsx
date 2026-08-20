"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay — use to stagger siblings by hand where a list is short. */
  delay?: number;
  /** Distance travelled, in px. Larger values read as heavier. */
  y?: number;
  /** Fade in from the side instead — used for the alternating service rows. */
  x?: number;
};

/**
 * The calm-page motion primitive: a single fade-and-rise on entry, once.
 * Services, Projects, Pricing, About and Contact use only this. The heavy
 * pinned/scrubbed motion is reserved for the Surface to Source narrative.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
