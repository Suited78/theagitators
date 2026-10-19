"use client";

import { useState } from "react";
import type { Industry, Tip } from "@/content/fieldGuide";
import { copyText } from "./copy";

const pad = (n: number) => String(n).padStart(2, "0");

const themeStyle = {
  Efficiency: "bg-paper text-aubergine shadow-[inset_0_0_0_1px_var(--rule)]",
  Opportunity: "bg-mint text-aubergine",
  Guardrails: "bg-aubergine text-paper",
} as const;

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

/**
 * One habit, set as a page of a guide rather than a card: the number and
 * title, the old way struck through and the habit in practice, then why,
 * how and a prompt to copy. Everything is visible; nothing to flip or open.
 */
export function HabitEntry({ tip, industry }: { tip: Tip; industry: Industry }) {
  const [tool, setTool] = useState(0);
  const { copied, copy } = useCopied();

  return (
    <article id={`tip-${tip.n}`} className="scroll-mt-[calc(var(--header-h)+4.5rem)] border-t-2 border-aubergine pt-8 pb-14 lg:pb-20">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[clamp(3rem,7vw,5rem)] leading-none font-extrabold tracking-tighter text-purple tabular-nums" aria-hidden="true">
          {pad(tip.n)}
        </p>
        <span className={`rounded-[4px] px-2 py-0.5 text-[0.7rem] font-extrabold tracking-[0.12em] uppercase ${themeStyle[tip.theme]}`}>
          {tip.theme}
        </span>
      </div>
      <h3 className="display-m mt-3 max-w-[22ch] text-balance">
        <span className="sr-only">Habit {tip.n}: </span>
        {tip.title}
      </h3>
      <p className="lede mt-3 max-w-[48ch] text-aubergine">{tip.what}</p>

      {/* The typographic moment: the old way struck out, the new way set large. */}
      <div data-contrast className="mt-8 grid gap-3">
        <p className="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug font-semibold text-muted">
          <span className="label mr-3 align-middle text-muted">Instead of</span>
          <span className={`contrast-strike ${tip.id === "talk" ? "font-mono lowercase" : ""}`}>“{tip.before}”</span>
        </p>
        <p className="contrast-after text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.12] font-extrabold tracking-tight text-balance text-aubergine">
          <span className="label mr-3 align-middle text-purple">Try</span>“{tip.after}”
        </p>
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <p className="label text-purple">Why it matters</p>
          <p className="body-copy mt-2 text-aubergine">{tip.why}</p>
        </div>
        <div>
          <p className="label text-purple">How</p>
          <p className="body-copy mt-2 text-aubergine">{tip.how}</p>
        </div>
      </div>

      {tip.settings ? (
        <div className="mt-8">
          <p className="label text-purple">Where to find it</p>
          <div role="tablist" aria-label="Tool" className="mt-3 flex flex-wrap gap-1">
            {tip.settings.map((setting, index) => (
              <button
                key={setting.tool}
                role="tab"
                type="button"
                aria-selected={tool === index}
                onClick={() => setTool(index)}
                className="min-h-10 rounded-full px-4 text-sm font-bold text-muted shadow-[inset_0_0_0_1px_var(--rule)] aria-selected:bg-aubergine aria-selected:text-paper aria-selected:shadow-none"
              >
                {setting.tool}
              </button>
            ))}
          </div>
          <div role="tabpanel" aria-label={`${tip.settings[tool].tool} steps`} className="mt-3">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base font-bold text-aubergine">
              {tip.settings[tool].path.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true" className="text-purple">›</span> : null}
                  {step}
                </li>
              ))}
            </ol>
            {tip.settings[tool].note ? <p className="mt-2 text-sm text-muted">{tip.settings[tool].note}</p> : null}
          </div>
        </div>
      ) : null}

      {tip.prompt ? (
        <figure className="mt-8 rounded-[var(--radius-card)] bg-aubergine p-6 text-paper sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <figcaption className="label text-mint">{tip.id === "talk" ? "Try saying" : "Try this"}</figcaption>
            <button type="button" onClick={() => copy("prompt", tip.prompt![industry])} className="btn btn-on-dark min-h-10 px-4 text-sm">
              {copied === "prompt" ? "Copied" : "Copy"}
            </button>
          </div>
          <blockquote className="mt-4 text-lg leading-relaxed">{tip.prompt[industry]}</blockquote>
        </figure>
      ) : null}

      {tip.note ? <p className="mt-6 max-w-[60ch] border-l-4 border-mint pl-4 text-base leading-relaxed font-semibold text-aubergine">{tip.note[industry]}</p> : null}
      {tip.pull ? <p className="mt-6 max-w-[48ch] text-xl leading-snug font-extrabold text-purple">“{tip.pull}”</p> : null}

      <button
        type="button"
        onClick={() => copy("link", `${window.location.origin}${window.location.pathname}#tip-${tip.n}`)}
        className="mt-8 text-sm font-bold text-muted underline decoration-divider underline-offset-4 hover:text-aubergine"
      >
        {copied === "link" ? "Link copied" : `Copy a link to habit ${pad(tip.n)}`}
      </button>
    </article>
  );
}
