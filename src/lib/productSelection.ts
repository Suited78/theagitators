"use client";

import { useSyncExternalStore } from "react";

/**
 * Which product the visitor has picked, shared between "What we do" (where
 * they choose) and "How we work" (where the route map highlights it).
 */
let selected: string | null = null;
const listeners = new Set<() => void>();

export function selectProduct(id: string | null) {
  selected = id;
  listeners.forEach((listener) => listener());
}

export function useSelectedProduct() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => selected,
    () => null,
  );
}
