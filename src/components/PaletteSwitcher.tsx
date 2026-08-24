"use client";

import { useSyncExternalStore } from "react";

export type Palette = "editorial" | "agitator";

export const PALETTE_STORAGE_KEY = "agitators-palette";

/** Fired on <html> whenever the palette changes — anything that can't just
 *  read the CSS custom properties via a class (e.g. a canvas) listens for
 *  this to know when to re-sample them. See SystemVisual. */
export const PALETTE_CHANGE_EVENT = "agitators:palette-change";

const CHANGE_EVENT = PALETTE_CHANGE_EVENT;

/**
 * Sets `[data-palette]` on <html> before paint, so a stored "agitator"
 * choice survives a reload without a flash back to the editorial default.
 * Rendered by the layout as the first thing in <body>, ahead of page
 * content — inline scripts execute as the parser reaches them, so it must
 * come before the markup it's meant to keep in sync, not after it.
 */
export const paletteBlockingScript = `
try {
  var p = localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)});
  if (p === "agitator") document.documentElement.dataset.palette = "agitator";
} catch (e) {}
`;

/**
 * The DOM attribute is the actual state; this just mutates it and tells
 * useSyncExternalStore's subscribers to re-read it. Kept as a real event
 * (rather than component state) so the blocking script's pre-hydration
 * write and a later click both flow through the same read path.
 */
function applyPalette(palette: Palette) {
  if (palette === "agitator") {
    document.documentElement.dataset.palette = "agitator";
  } else {
    delete document.documentElement.dataset.palette;
  }
  try {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, palette);
  } catch {
    // Private browsing or storage disabled — the toggle still works for this load.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getSnapshot(): Palette {
  return document.documentElement.dataset.palette === "agitator" ? "agitator" : "editorial";
}

// Matches the server-rendered default; the client re-syncs from the real
// DOM value right after hydration, same as usePrefersReducedMotion.
function getServerSnapshot(): Palette {
  return "editorial";
}

const options: { id: Palette; label: string }[] = [
  { id: "editorial", label: "Editorial" },
  { id: "agitator", label: "Agitator" },
];

/**
 * Floating comparison tool, not part of the site's own design language —
 * deliberately styled outside the theme tokens so it reads as a preview
 * control rather than content, and stays legible under either palette.
 * Remove before a real launch.
 */
export function PaletteSwitcher() {
  const palette = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    // A landmark of its own: this floats outside header/main/footer, so it
    // needs one to satisfy "all content is contained by a landmark" — the
    // inner role="group" separately names the toggle for the buttons.
    <aside
      aria-label="Palette preview control"
      className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2"
    >
      <div
        role="group"
        aria-label="Preview colour palette"
        className="flex items-center gap-1 rounded-full border border-white/15 bg-[#15140f]/95 p-1 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
      >
        <span className="pl-3 pr-1 font-mono text-[0.625rem] tracking-[0.14em] text-white/50 uppercase">
          Palette
        </span>
        {options.map((option) => {
          const active = palette === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => applyPalette(option.id)}
              aria-pressed={active}
              className={[
                "rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                active ? "bg-white text-[#15140f]" : "text-white/70 hover:text-white",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
