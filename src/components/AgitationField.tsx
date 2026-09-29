"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Tone = "light" | "dark";

export type AgitationFieldProps = {
  tone?: Tone;
  /**
   * Custom property for the colour behind the canvas. Each ridge is filled
   * with it, so nearer lines hide the ones behind them — that occlusion is
   * what gives the field its depth. Must match the section's background.
   */
  background?: string;
  /** 0..1, read each frame: 0 is turbulent, 1 is every line moving as one. Omit for a permanently restless field. */
  progressRef?: React.RefObject<number>;
  /** The pointer stirs the lines, and the field stirs itself when left alone. */
  interactive?: boolean;
  /** Distance between lines, in CSS pixels. */
  spacing?: number;
  className?: string;
};

const MAX_LINES = 160;
const STEP = 5;
const MAX_DISTURBANCES = 16;
const DISTURBANCE_LIFE_MS = 2600;

type Wave = { freq: number; phase: number; speed: number; amp: number };
type Disturbance = { u: number; line: number; born: number; amp: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded, so the landscape is the same on every visit and every machine.
const lineWaves: Wave[][] = (() => {
  const rand = mulberry32(7331);
  return Array.from({ length: MAX_LINES }, () => [
    { freq: 1.2 + rand() * 1.6, phase: rand() * Math.PI * 2, speed: 0.15 + rand() * 0.25, amp: 1 },
    { freq: 4 + rand() * 4, phase: rand() * Math.PI * 2, speed: 0.3 + rand() * 0.4, amp: 0.45 },
    { freq: 10 + rand() * 8, phase: rand() * Math.PI * 2, speed: 0.5 + rand() * 0.6, amp: 0.18 },
  ]);
})();

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function triplet(value: string, fallback: string) {
  let hex = value.trim().replace("#", "");
  // Tailwind stores some tokens in shorthand (white is #fff).
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.replace(/./g, (c) => c + c);
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  return `${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}`;
}

/** Colours come from the brand tokens, so the field can't drift from the palette. */
function readColours(tone: Tone, background: string) {
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string) => styles.getPropertyValue(name);
  if (tone === "dark") {
    return {
      line: triplet(token("--color-paper"), "250, 248, 243"),
      accent: triplet(token("--color-mint"), "190, 232, 204"),
      fill: `rgb(${triplet(token(background), "45, 22, 59")})`,
      lineAlpha: 0.42,
    };
  }
  return {
    line: triplet(token("--color-aubergine"), "45, 22, 59"),
    accent: triplet(token("--color-purple"), "123, 49, 155"),
    fill: `rgb(${triplet(token(background), "250, 248, 243")})`,
    lineAlpha: 0.5,
  };
}

export function AgitationField({
  tone = "light",
  background,
  progressRef,
  interactive = false,
  spacing = 9,
  className,
}: AgitationFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const backgroundVar = background ?? (tone === "dark" ? "--color-aubergine" : "--color-paper");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colours = readColours(tone, backgroundVar);
    let dirty = true;

    let width = 0;
    let height = 0;
    let lines = 0;
    // Headroom above the first line, so its peaks aren't clipped.
    const top = spacing * 5;
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);

    let raf = 0;
    let startTime = -1;
    let eased = progressRef?.current ?? 0;
    let lastDrawnProgress = -1;
    const disturbances: Disturbance[] = [];
    let lastPointer = { x: -1e4, y: -1e4, at: 0 };
    let lastActivity = 0;
    let nextIdle = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = Math.min(MAX_LINES, Math.max(4, Math.floor((height - top - spacing) / spacing) + 1));
      xs = new Float32Array(Math.ceil(width / STEP) + 2);
      ys = new Float32Array(xs.length);
      dirty = true;
    };

    const displacement = (i: number, u: number, t: number, p: number, now: number) => {
      // Turbulent: each line its own ridges, peaking towards the middle.
      let n = 0;
      for (const wave of lineWaves[i]) n += wave.amp * Math.sin(u * wave.freq * Math.PI * 2 + wave.phase + t * wave.speed);
      n /= 1.63;
      const turbulentEnvelope = 0.12 + 0.88 * Math.exp(-(((u - 0.5) / 0.26) ** 2));
      const turbulent = -Math.pow(Math.max(0, n), 1.3) * turbulentEnvelope * spacing * 4.2;

      // Aligned: every line rides the same slow swell, each a beat behind the last.
      const aligned = -Math.sin(u * Math.PI * 2 * 1.3 - i * 0.16 + t * 0.7) * Math.sin(Math.PI * u) * spacing * 1.1;

      let y = turbulent + (aligned - turbulent) * p;

      for (const d of disturbances) {
        const age = (now - d.born) / 1000;
        const dx = (u - d.u) * width;
        const gx = Math.exp(-((dx / (70 + age * 170)) ** 2));
        if (gx < 0.01) continue;
        const gl = Math.exp(-(((i - d.line) / (2.6 + age * 4)) ** 2));
        if (gl < 0.01) continue;
        const ripple = 0.55 + 0.45 * Math.cos(age * 8 - Math.abs(dx) * 0.045);
        y -= d.amp * spacing * 4.6 * Math.exp(-age * 1.1) * gx * gl * ripple;
      }
      return y;
    };

    const draw = (now: number) => {
      if (startTime < 0) startTime = now;
      const t = reduced ? 0 : now / 1000;
      const p = progressRef ? eased : 0;
      // Lines draw in from the left the first time the field is seen.
      const reveal = reduced ? 1 : 1 - Math.pow(1 - clamp01((now - startTime) / 1600), 3);
      const drawWidth = width * reveal;
      const count = Math.min(xs.length, Math.ceil(drawWidth / STEP) + 1);
      for (let k = 0; k < count; k++) xs[k] = Math.min(drawWidth, k * STEP);

      ctx.clearRect(0, 0, width, height);
      if (count < 2) return;
      const accentLine = Math.round((lines - 1) * 0.62);

      for (let i = 0; i < lines; i++) {
        const base = top + i * spacing;
        for (let k = 0; k < count; k++) ys[k] = base + displacement(i, xs[k] / width, t, p, now);

        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (let k = 1; k < count; k++) ctx.lineTo(xs[k], ys[k]);
        ctx.lineTo(xs[count - 1], height);
        ctx.lineTo(xs[0], height);
        ctx.closePath();
        ctx.fillStyle = colours.fill;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (let k = 1; k < count; k++) ctx.lineTo(xs[k], ys[k]);
        const isAccent = i === accentLine;
        ctx.lineWidth = isAccent ? 1.5 : 1;
        ctx.strokeStyle = isAccent ? `rgba(${colours.accent}, 0.95)` : `rgba(${colours.line}, ${colours.lineAlpha})`;
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (progressRef) {
        const target = clamp01(progressRef.current ?? 0);
        eased = reduced ? target : eased + (target - eased) * 0.06;
      }
      while (disturbances.length && now - disturbances[0].born > DISTURBANCE_LIFE_MS) disturbances.shift();

      // Left alone, it keeps agitating itself — which is also what touch screens see.
      if (interactive && !reduced && now - lastActivity > 3500 && now > nextIdle) {
        disturbances.push({ u: 0.2 + Math.random() * 0.6, line: lines * (0.25 + Math.random() * 0.5), born: now, amp: 0.8 });
        nextIdle = now + 2400 + Math.random() * 1400;
      }

      // With reduced motion the field is a still image: redraw only when something changed.
      if (reduced && !dirty && Math.abs(eased - lastDrawnProgress) < 0.0005) return;
      draw(now);
      dirty = false;
      lastDrawnProgress = eased;
    };

    const onPointer = (event: PointerEvent) => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const margin = 40;
      if (x < -margin || y < -margin || x > rect.width + margin || y > rect.height + margin) return;
      const now = performance.now();
      lastActivity = now;
      const moved = Math.hypot(x - lastPointer.x, y - lastPointer.y);
      if (event.type === "pointermove" && (moved < 16 || now - lastPointer.at < 50)) return;
      lastPointer = { x, y, at: now };
      disturbances.push({
        u: clamp01(x / Math.max(1, width)),
        line: (y - top) / spacing,
        born: now,
        amp: event.type === "pointerdown" ? 1.3 : Math.min(1.1, 0.35 + moved / 90),
      });
      if (disturbances.length > MAX_DISTURBANCES) disturbances.shift();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Only run while on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "120px" },
    );
    visibility.observe(canvas);

    if (interactive) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [tone, backgroundVar, progressRef, interactive, spacing, reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
