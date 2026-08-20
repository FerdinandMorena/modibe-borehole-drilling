"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` on the client, `useEffect` on the server — GSAP setup
 * needs to run before paint to avoid a flash of un-animated content, but
 * React warns if `useLayoutEffect` runs during SSR.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
