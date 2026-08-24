"use client";

import { useEffect, useRef } from "react";
import {
  NODE_COUNT,
  STATE_COUNT,
  accentNodes,
  drift,
  easeInOutCubic,
  systemStates,
} from "@/lib/system";
import { PALETTE_CHANGE_EVENT } from "@/components/PaletteSwitcher";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Tone = "light" | "dark";

type Palette = { edge: string; node: string; accent: string; halo: string };

/** "#1c2b4a" -> "28, 43, 74", for building rgba() strings in canvas fillStyle/strokeStyle. */
function hexToTriplet(hex: string, fallback: string): string {
  const clean = hex.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(clean)) return fallback;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Reads the live design tokens rather than hardcoding colours, so the motif
 * follows the palette switcher (which flips these CSS custom properties)
 * instead of always drawing the default editorial palette.
 */
function readPalette(tone: Tone): Palette {
  const styles = getComputedStyle(document.documentElement);
  const ink = hexToTriplet(styles.getPropertyValue("--color-ink"), "21, 20, 15");
  const bone = hexToTriplet(styles.getPropertyValue("--color-bone"), "246, 243, 236");
  const accent = hexToTriplet(styles.getPropertyValue("--color-accent"), "201, 62, 29");
  const accentBright = hexToTriplet(styles.getPropertyValue("--color-accent-bright"), "255, 106, 61");

  return tone === "dark"
    ? { edge: bone, node: bone, accent: accentBright, halo: accentBright }
    : { edge: ink, node: ink, accent, halo: accent };
}

export type SystemVisualProps = {
  /** 0..1 across the five states. Read from a ref each frame, never re-renders. */
  progressRef: React.RefObject<number>;
  tone?: Tone;
  /** Scales node and line weight — the hero wants a lighter touch than the band. */
  density?: number;
  className?: string;
};

export function SystemVisual({
  progressRef,
  tone = "light",
  density = 1,
  className,
}: SystemVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let palette = readPalette(tone);
    const onPaletteChange = () => {
      palette = readPalette(tone);
    };
    window.addEventListener(PALETTE_CHANGE_EVENT, onPaletteChange);

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    // Eased progress trails the raw scroll value so the system feels weighted.
    let eased = progressRef.current ?? 0;
    let started = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const target = Math.min(1, Math.max(0, progressRef.current ?? 0));
      eased = reduced ? target : eased + (target - eased) * 0.075;

      const scaled = eased * (STATE_COUNT - 1);
      const index = Math.min(STATE_COUNT - 2, Math.floor(scaled));
      const blend = easeInOutCubic(Math.min(1, Math.max(0, scaled - index)));
      const from = systemStates[index];
      const to = systemStates[index + 1];
      const restlessness = from.restlessness + (to.restlessness - from.restlessness) * blend;

      // Nodes ease in on first paint so the hero does not pop.
      const intro = reduced ? 1 : Math.min(1, (time - startTime) / 1400);

      const xs = new Float32Array(NODE_COUNT);
      const ys = new Float32Array(NODE_COUNT);
      const t = time / 1000;
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = from.points[i];
        const b = to.points[i];
        const d = drift[i];
        const wander = reduced ? 0 : restlessness;
        const nx = a.x + (b.x - a.x) * blend + Math.sin(t * d.speed + d.phase) * d.ampX * wander;
        const ny = a.y + (b.y - a.y) * blend + Math.cos(t * d.speed * 0.9 + d.phase) * d.ampY * wander;
        xs[i] = nx * width;
        ys[i] = ny * height;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      const drawEdges = (edges: readonly (readonly [number, number])[], alpha: number) => {
        if (alpha <= 0.004) return;
        ctx.strokeStyle = `rgba(${palette.edge}, ${alpha})`;
        ctx.beginPath();
        for (const [i, j] of edges) {
          ctx.moveTo(xs[i], ys[i]);
          ctx.lineTo(xs[j], ys[j]);
        }
        ctx.stroke();
      };

      const base = 0.2 * density * intro;
      drawEdges(from.edges, base * (1 - blend));
      drawEdges(to.edges, base * blend);

      for (let i = 0; i < NODE_COUNT; i++) {
        const isAccent = accentNodes.has(i);
        const r = (isAccent ? 3.1 : 1.9) * density;
        if (isAccent) {
          ctx.fillStyle = `rgba(${palette.halo}, ${0.14 * intro})`;
          ctx.beginPath();
          ctx.arc(xs[i], ys[i], r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = isAccent
          ? `rgba(${palette.accent}, ${0.95 * intro})`
          : `rgba(${palette.node}, ${0.5 * intro})`;
        ctx.beginPath();
        ctx.arc(xs[i], ys[i], r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let startTime = 0;
    const frame = (time: number) => {
      if (!started) {
        started = true;
        startTime = time;
      }
      draw(time);
      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only burn frames while the motif is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;
        if (visible) {
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener(PALETTE_CHANGE_EVENT, onPaletteChange);
    };
  }, [progressRef, reduced, tone, density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
