"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import type { Industry, Tip } from "@/content/fieldGuide";
import { copyText } from "./copy";
import { TipVisual } from "./TipVisual";

const themeStyle = {
  Efficiency: "bg-paper text-aubergine",
  Opportunity: "bg-mint text-aubergine",
  Guardrails: "bg-aubergine text-paper",
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** Cards flip from the md breakpoint up; on phones the back opens beneath the front. */
function useWide() {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia("(min-width: 768px)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return useSyncExternalStore(subscribe, () => window.matchMedia("(min-width: 768px)").matches, () => true);
}

/** A short-lived "Copied" label for any copy button. */
function useCopied() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    if (await copyText(text)) {
      setCopied(key);
      window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 1800);
    }
  };
  return { copied, copy };
}

function CardTop({ tip }: { tip: Tip }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-extrabold tracking-tight text-purple tabular-nums">{pad(tip.n)}</span>
      <span className={`rounded-[4px] px-2 py-0.5 text-[0.7rem] font-extrabold tracking-[0.12em] uppercase ${themeStyle[tip.theme]}`}>
        {tip.theme}
      </span>
    </div>
  );
}

/**
 * One habit as a two-sided card. The front shows the habit and its
 * before-and-after picture; the back has why, how and a prompt to copy.
 * Both faces share one grid cell, so the card is as tall as its longer side.
 */
export function TipCard({ tip, industry }: { tip: Tip; industry: Industry }) {
  const [flipped, setFlipped] = useState(false);
  const [side, setSide] = useState<"before" | "after">("before");
  const [tool, setTool] = useState(0);
  const wide = useWide();
  const { copied, copy } = useCopied();
  // Move focus with the flip, so keyboard users land on the side they asked for.
  const backButton = useRef<HTMLButtonElement>(null);
  const frontButton = useRef<HTMLButtonElement>(null);
  const flip = (to: boolean) => {
    setFlipped(to);
    window.setTimeout(() => {
      const target = (to ? backButton : frontButton).current;
      target?.focus({ preventScroll: wide });
      if (!wide && to) target?.closest("[data-back]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };
  const link = () => `${window.location.origin}${window.location.pathname}#tip-${tip.n}`;

  const linkButton = (
    <button type="button" onClick={() => copy("link", link())} className="text-sm font-bold text-muted underline decoration-divider underline-offset-4 hover:text-aubergine">
      {copied === "link" ? "Link copied" : "Copy link"}
    </button>
  );

  return (
    <article id={`tip-${tip.n}`} className="scroll-mt-[calc(var(--header-h)+5rem)] [perspective:1600px]">
      <div
        className={[
          "grid gap-3 md:gap-0 md:transition-transform md:duration-700 md:[transform-style:preserve-3d] md:[transition-timing-function:var(--ease-out-quint)] motion-reduce:transition-none",
          flipped ? "md:[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        {/* Front */}
        <div
          inert={flipped && wide}
          className="flex flex-col md:col-start-1 md:row-start-1 rounded-[var(--radius-card)] border border-[var(--rule)] bg-white p-6 [backface-visibility:hidden]"
        >
          <CardTop tip={tip} />
          <h3 className="display-s mt-4 text-balance">{tip.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-aubergine">{tip.what}</p>

          <div className="mt-5 rounded-lg bg-paper p-4">
            <div className="flex min-h-[9.5rem] items-center justify-center" aria-hidden="true">
              <TipVisual tip={tip} side={side} industry={industry} />
            </div>
            <p className="mt-3 min-h-[2.6em] text-center text-sm leading-snug font-semibold text-muted">
              {side === "before" ? tip.before : tip.after}
            </p>
            <div role="group" aria-label="Compare" className="mx-auto mt-3 flex w-fit rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--rule)]">
              {(["before", "after"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={side === value}
                  onClick={() => setSide(value)}
                  className="min-h-9 rounded-full px-4 text-sm font-bold text-muted transition-colors aria-pressed:bg-aubergine aria-pressed:text-paper"
                >
                  {value === "before" ? "Without the habit" : "With it"}
                </button>
              ))}
            </div>
          </div>

          {tip.pull ? <p className="mt-5 border-l-4 border-mint pl-3 text-sm leading-snug font-semibold text-muted">“{tip.pull}”</p> : null}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            <button ref={frontButton} type="button" onClick={() => flip(true)} aria-expanded={wide ? undefined : flipped} className={`btn btn-primary min-h-11 px-4 text-sm ${flipped ? "max-md:hidden" : ""}`}>
              How to do it <span aria-hidden="true">→</span>
            </button>
            {linkButton}
          </div>
        </div>

        {/* Back */}
        <div
          inert={!flipped}
          data-back
          className={`scroll-mt-[calc(var(--header-h)+4rem)] flex-col rounded-[var(--radius-card)] border border-aubergine bg-white p-6 md:col-start-1 md:row-start-1 md:flex md:[backface-visibility:hidden] md:[transform:rotateY(180deg)] ${flipped ? "flex" : "hidden"}`}
        >
          <CardTop tip={tip} />
          <h3 className="mt-3 text-xl font-extrabold">{tip.title}</h3>

          <p className="label mt-5 text-purple">Why it matters</p>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-aubergine">{tip.why}</p>

          <p className="label mt-5 text-purple">How</p>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-aubergine">{tip.how}</p>

          {tip.settings ? (
            <div className="mt-4">
              <div role="tablist" aria-label="Tool" className="flex gap-1">
                {tip.settings.map((setting, index) => (
                  <button
                    key={setting.tool}
                    role="tab"
                    type="button"
                    aria-selected={tool === index}
                    onClick={() => setTool(index)}
                    className="min-h-9 rounded-md px-3 text-sm font-bold text-muted aria-selected:bg-aubergine aria-selected:text-paper"
                  >
                    {setting.tool}
                  </button>
                ))}
              </div>
              <div role="tabpanel" aria-label={`${tip.settings[tool].tool} steps`}>
              <ol className="mt-2 space-y-1 rounded-lg bg-paper p-3 text-sm font-semibold text-aubergine">
                {tip.settings[tool].path.map((step, index) => (
                  <li key={step} className="flex gap-2">
                    <span className="text-purple tabular-nums">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              </div>
              {tip.settings[tool].note ? <p className="mt-2 text-xs leading-snug text-muted">{tip.settings[tool].note}</p> : null}
            </div>
          ) : null}

          {tip.prompt ? (
            <div className="mt-5 rounded-lg bg-aubergine p-4 text-paper">
              <div className="flex items-center justify-between gap-3">
                <p className="label text-mint">{tip.id === "talk" ? "Try saying" : "Try this"}</p>
                <button
                  type="button"
                  onClick={() => copy("prompt", tip.prompt![industry])}
                  className="rounded-md bg-mint px-2.5 py-1 text-xs font-extrabold text-aubergine"
                >
                  {copied === "prompt" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{tip.prompt[industry]}</p>
            </div>
          ) : null}

          {tip.note ? <p className="mt-4 border-l-4 border-purple pl-3 text-sm leading-snug font-semibold text-aubergine">{tip.note[industry]}</p> : null}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            <button ref={backButton} type="button" onClick={() => flip(false)} className="btn btn-secondary min-h-11 px-4 text-sm">
              <span aria-hidden="true">←</span> Back to the habit
            </button>
            {linkButton}
          </div>
        </div>
      </div>
    </article>
  );
}
