"use client";

import { useState } from "react";
import Link from "next/link";
import { checkedOn, tips, tipsClose, tipsIntro, topics, type Tip, type Topic } from "@/content/tips";
import { Eyebrow } from "../Eyebrow";
import { copyText } from "./copy";

const pad = (n: number) => String(n).padStart(2, "0");

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

/** Prompts mark the parts to fill in with [square brackets]; show those as highlights. */
function PromptText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, index) =>
        part.startsWith("[") ? (
          <span key={index} className="rounded-[3px] bg-mint px-1 font-semibold text-aubergine [box-decoration-break:clone]">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function TipEntry({ tip, hidden }: { tip: Tip; hidden: boolean }) {
  const [tool, setTool] = useState(0);
  const { copied, copy } = useCopied();

  return (
    <article id={`tip-${tip.n}`} hidden={hidden} className="flex scroll-mt-[calc(var(--header-h)+5rem)] flex-col border-t-2 border-aubergine pt-5 pb-10">
      <div className="flex items-center justify-between gap-4">
        <span className="text-2xl leading-none font-extrabold tracking-tight text-purple tabular-nums" aria-hidden="true">
          {pad(tip.n)}
        </span>
        <span className="label text-muted">{tip.topic}</span>
      </div>
      <h2 className="display-s mt-3 text-balance">
        <span className="sr-only">Tip {tip.n}: </span>
        {tip.title}
      </h2>
      <p className="body-copy mt-2 max-w-[56ch] text-aubergine">{tip.line}</p>

      {tip.settings ? (
        <div className="mt-5 rounded-lg bg-paper p-4">
          <div role="tablist" aria-label="Tool" className="flex flex-wrap gap-1">
            {tip.settings.map((setting, index) => (
              <button
                key={setting.tool}
                role="tab"
                type="button"
                aria-selected={tool === index}
                onClick={() => setTool(index)}
                className="min-h-9 rounded-full px-3.5 text-sm font-bold text-muted aria-selected:bg-aubergine aria-selected:text-paper"
              >
                {setting.tool}
              </button>
            ))}
          </div>
          <div role="tabpanel" aria-label={`${tip.settings[tool].tool} steps`} className="mt-3">
            <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.95rem] font-bold text-aubergine">
              {tip.settings[tool].path.map((step, index) => (
                <li key={step} className="flex items-center gap-2.5">
                  {index > 0 ? <span aria-hidden="true" className="text-purple">›</span> : null}
                  {step}
                </li>
              ))}
            </ol>
            {tip.settings[tool].note ? <p className="mt-1.5 text-sm text-muted">{tip.settings[tool].note}</p> : null}
          </div>
        </div>
      ) : null}

      {tip.prompt ? (
        <figure className="mt-5 rounded-lg bg-paper p-4">
          <div className="flex items-center justify-between gap-3">
            <figcaption className="label text-purple">{tip.spoken ? "Try saying" : "Try this"}</figcaption>
            <button
              type="button"
              onClick={() => copy("prompt", tip.prompt!)}
              className="btn btn-primary min-h-9 px-3.5 text-sm"
            >
              {copied === "prompt" ? "Copied" : "Copy"}
            </button>
          </div>
          <blockquote className="mt-2.5 text-base leading-relaxed text-aubergine">
            <PromptText text={tip.prompt} />
          </blockquote>
        </figure>
      ) : null}

      <button
        type="button"
        onClick={() => copy("link", `${window.location.origin}${window.location.pathname}#tip-${tip.n}`)}
        className="mt-4 w-fit text-sm font-bold text-muted underline decoration-divider underline-offset-4 hover:text-aubergine"
      >
        {copied === "link" ? "Link copied" : "Copy a link to this tip"}
      </button>
    </article>
  );
}

function ShareButtons() {
  const { copied, copy } = useCopied();
  const url = () => `${window.location.origin}${window.location.pathname}`;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => copy("page", url())} className="btn btn-on-dark min-h-11 px-4 text-sm">
        {copied === "page" ? "Link copied" : "Copy link to these tips"}
      </button>
      <button
        type="button"
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`, "_blank", "noopener")}
        className="min-h-11 rounded-[var(--radius-control)] border-2 border-paper/40 px-4 text-sm font-bold text-paper hover:border-mint"
      >
        Share on LinkedIn
      </button>
    </div>
  );
}

export function Tips() {
  const [topic, setTopic] = useState<Topic | "All">("All");
  const count = (value: Topic) => tips.filter((tip) => tip.topic === value).length;
  const shown = topic === "All" ? tips.length : count(topic);

  return (
    <>
      <header className="aubergine-panel pt-[calc(var(--header-h)+clamp(2.5rem,7vw,5rem))] pb-[clamp(2.5rem,6vw,4rem)]">
        <div className="shell">
          <Eyebrow tone="dark">{tipsIntro.eyebrow}</Eyebrow>
          <h1 className="display-xl mt-6 max-w-[16ch] text-balance">{tipsIntro.title}</h1>
          <p className="lede mt-5 max-w-[52ch] text-paper/85">{tipsIntro.lede}</p>
          <div className="mt-8">
            <ShareButtons />
          </div>
        </div>
      </header>

      {/* Topic filter: always to hand. Scrolls sideways on phones rather than wrapping. */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-[var(--rule)] bg-white/95 backdrop-blur-md">
        <div className="shell flex h-14 items-center gap-3">
          <span id="topic-label" className="hidden shrink-0 text-sm font-semibold text-muted sm:block">
            Topic
          </span>
          <div role="group" aria-labelledby="topic-label" aria-label="Filter by topic" className="-mx-1 flex gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
            {(["All", ...topics] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={topic === value}
                onClick={() => setTopic(value)}
                className="min-h-9 shrink-0 rounded-full px-3.5 text-sm font-bold whitespace-nowrap text-muted shadow-[inset_0_0_0_1px_var(--rule)] transition-colors aria-pressed:bg-aubergine aria-pressed:text-paper aria-pressed:shadow-none"
              >
                {value}
                {value === "All" ? null : <span className="ml-1.5 tabular-nums opacity-60">{count(value)}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section aria-label="Tips" className="bg-white py-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="shell">
          <p aria-live="polite" className="sr-only">
            Showing {shown} {shown === 1 ? "tip" : "tips"}
            {topic === "All" ? "" : ` about ${topic}`}.
          </p>
          <div className="grid gap-x-12 md:grid-cols-2">
            {tips.map((tip) => (
              <TipEntry key={tip.n} tip={tip} hidden={topic !== "All" && tip.topic !== topic} />
            ))}
          </div>
          {topic !== "All" ? (
            <button type="button" onClick={() => setTopic("All")} className="text-link text-base font-bold text-purple">
              Show all {tips.length} tips
            </button>
          ) : null}
        </div>
      </section>

      <section className="mint-panel py-[clamp(3rem,7vw,5rem)]">
        <div className="shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="display-m max-w-[22ch] text-balance">{tipsClose.title}</h2>
            <p className="body-copy mt-4 max-w-[56ch] text-aubergine">{tipsClose.body}</p>
          </div>
          <Link href="/#contact" className="btn btn-primary">
            {tipsClose.action}
          </Link>
        </div>
        <p className="shell mt-10 text-sm text-aubergine/80">
          Tool settings and features checked {checkedOn}. They change often; tell us if one has moved.
        </p>
      </section>
    </>
  );
}
