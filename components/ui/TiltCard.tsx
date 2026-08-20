"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
};

/**
 * Parallax tilt on hover, plus an aqua sheen that tracks the cursor.
 *
 * Per the motion budget this belongs to the Projects gallery only — using it
 * more widely would push the site toward flashy, which is the opposite of the
 * tone we want everywhere else.
 */
export default function TiltCard({
  children,
  className = "",
  max = 7,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionValue(0);

  const springs = { stiffness: 200, damping: 20, mass: 0.5 };
  const rotateX = useSpring(rx, springs);
  const rotateY = useSpring(ry, springs);
  const glareOpacity = useSpring(glare, { stiffness: 120, damping: 22 });

  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(63,208,232,0.22), transparent 62%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * max * 2);
    ry.set((px - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
    glare.set(1);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
    glare.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className={`relative transform-3d will-change-transform ${className}`}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ backgroundImage: sheen, opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </motion.div>
  );
}
