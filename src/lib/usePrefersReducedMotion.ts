"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Subscribes to the media query directly rather than mirroring it into state,
 * so there is no extra render on mount. The server snapshot is `false`, which
 * matches the first client render; every animated component reads this and
 * degrades to a static end state when it flips true.
 */
export function usePrefersReducedMotion() {
  const subscribe = useCallback((onChange: () => void) => {
    const mql = window.matchMedia(QUERY);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
