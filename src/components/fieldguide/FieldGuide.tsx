"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  briefBuilder,
  checkedOn,
  guideClose,
  guideIntro,
  industries,
  levels,
  quiz,
  quizResults,
  tips,
  type Industry,
  type LevelId,
} from "@/content/fieldGuide";
import { Eyebrow } from "../Eyebrow";
import { copyText } from "./copy";
import { HabitEntry } from "./HabitEntry";

const STORE_KEY = "field-guide-industry";
const pad = (n: number) => String(n).padStart(2, "0");

/** The hero picture: three steps, one per level, climbing like the Opportunity AI bars. */
function Climb() {
  return (
    <nav aria-label="Levels" className="w-full max-w-[26rem]">
      <ol className="relative grid h-56 grid-cols-3 items-end gap-2.5">
        {levels.map((level, index) => {
          const count = tips.filter((tip) => tip.level === level.id).length;
          return (
            <li key={level.id} style={{ height: `${44 + index * 28}%` }}>
              <a
                href={`#level-${level.id}`}
                className={[
                  "group flex h-full flex-col justify-between rounded-lg p-3 transition-transform duration-500 [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-1",
                  index === 2 ? "bg-mint text-aubergine" : index === 1 ? "bg-purple text-white" : "bg-paper/15 text-paper",
                ].join(" ")}
              >
                <span className="text-xs font-bold tabular-nums opacity-80">{count} habits</span>
                <span className="text-xl font-extrabold tracking-tight">{level.name}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Compact, always to hand in the sticky bar. Short labels on phones. */
function IndustrySwitch({ industry, onChange }: { industry: Industry; onChange: (value: Industry) => void }) {
  return (
    <div className="ml-auto flex shrink-0 items-center gap-2">
      <span id="industry-label" className="hidden text-sm font-semibold text-muted md:block">
        Examples for
      </span>
      <div role="group" aria-labelledby="industry-label" className="flex rounded-full bg-paper p-1 shadow-[inset_0_0_0_1px_var(--rule)]">
        {industries.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={industry === option.id}
            onClick={() => onChange(option.id)}
            className="min-h-9 rounded-full px-3 text-sm font-bold text-muted transition-colors aria-pressed:bg-purple aria-pressed:text-white"
          >
            <span className="sm:hidden">{option.short}</span>
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ShareGuide() {
  const [copied, setCopied] = useState(false);
  const url = () => `${window.location.origin}${window.location.pathname}`;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={async () => {
          if (await copyText(url())) {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          }
        }}
        className="btn btn-on-dark min-h-11 px-4 text-sm"
      >
        {copied ? "Link copied" : "Copy link to this guide"}
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

function WhereAreYou() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(quiz.map(() => null));
  const done = answers.every((answer) => answer !== null);
  let result: LevelId | "start" = "start";
  if (answers[0]) result = "ask";
  quiz.forEach((question, index) => {
    if (index > 0 && answers[index]) result = question.yes;
  });
  const outcome = quizResults[result];

  return (
    <section aria-labelledby="where" className="rounded-[var(--radius-card)] border border-[var(--rule)] bg-white p-6 sm:p-8">
      <Eyebrow>Optional · Where are you now?</Eyebrow>
      <h2 id="where" className="display-s mt-4 max-w-[30ch] text-balance">
        Find where to start, or just scroll on.
      </h2>
      <p className="body-copy mt-3 max-w-[60ch]">
        Answer three quick questions and we’ll point you to the habit that will make the most difference now. Or skip them:
        the guide reads top to bottom, from your first question to AI that works on its own.
      </p>
      <a href="#level-ask" className="text-link mt-3 inline-block text-base font-bold text-purple">
        Skip to the first habit ↓
      </a>
      <ol className="mt-6 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {quiz.map((question, index) => (
          <li key={question.q} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <p className="max-w-[40ch] text-base font-semibold text-aubergine">
              <span className="mr-2 text-purple tabular-nums">{index + 1}</span>
              {question.q}
            </p>
            <div role="group" aria-label={`Answer to question ${index + 1}`} className="flex gap-2">
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  aria-pressed={answers[index] === value}
                  onClick={() => setAnswers((current) => current.map((answer, i) => (i === index ? value : answer)))}
                  className="min-h-10 min-w-16 rounded-full border-2 border-aubergine px-4 text-sm font-bold text-aubergine transition-colors aria-pressed:bg-aubergine aria-pressed:text-paper"
                >
                  {value ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div aria-live="polite" className="mt-6 min-h-[5.5rem]">
        {done ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-mint p-5">
            <div className="max-w-[52ch]">
              <p className="text-xl font-extrabold">{outcome.title}</p>
              <p className="mt-1 text-base leading-relaxed text-aubergine">{outcome.body}</p>
            </div>
            <a href={`#tip-${outcome.tip}`} className="btn btn-primary min-h-11 px-4 text-sm">
              Go to habit {pad(outcome.tip)} <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          <p className="text-base text-muted">Answer all three to see where you are.</p>
        )}
      </div>
    </section>
  );
}

/** Sticky strip showing which level the reader is in. */
function LevelBar({ active, industry, onChange }: { active: LevelId; industry: Industry; onChange: (value: Industry) => void }) {
  return (
    <div className="sticky top-[var(--header-h)] z-30 border-b border-[var(--rule)] bg-white/95 backdrop-blur-md">
      <div className="shell flex h-14 items-center gap-2">
      <nav aria-label="Jump to a level" className="flex items-center gap-0.5 sm:gap-2">
        {levels.map((level, index) => (
          <a
            key={level.id}
            href={`#level-${level.id}`}
            aria-current={active === level.id ? "true" : undefined}
            className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-bold text-muted transition-colors aria-[current]:bg-aubergine aria-[current]:text-paper sm:px-3"
          >
            <span className="hidden tabular-nums opacity-70 sm:inline">{index + 1}</span>
            {level.name}
          </a>
        ))}
      </nav>
      <span className="ml-4 hidden text-sm font-semibold text-muted lg:block">{levels.find((l) => l.id === active)?.line}</span>
      <IndustrySwitch industry={industry} onChange={onChange} />
      </div>
    </div>
  );
}

function BriefBuilder({ industry }: { industry: Industry }) {
  const [values, setValues] = useState({ business: "", audience: "", tone: "", proud: "" });
  const [copied, setCopied] = useState(false);
  const fields = briefBuilder.fields;
  const pick = (key: keyof typeof values) => values[key].trim() || fields[key].placeholder[industry];
  const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);
  const brief = `About us: we’re ${lower(pick("business"))}. We serve ${lower(pick("audience"))}. Our tone is ${lower(pick("tone"))}. Here’s an example of work we’re proud of, ${lower(pick("proud"))}: [paste it here]. Keep all of this in mind for everything I ask today.`;
  const typed = Object.values(values).some((value) => value.trim());

  return (
    <section aria-labelledby="brief" className="aubergine-panel rounded-[var(--radius-card)] p-6 sm:p-8">
      <Eyebrow tone="dark">Try it · Habit 01</Eyebrow>
      <h3 id="brief" className="display-m mt-4 text-balance">{briefBuilder.title}</h3>
      <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-paper/85">{briefBuilder.lede}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4">
          {(Object.keys(fields) as (keyof typeof values)[]).map((key) => (
            <label key={key} htmlFor={`brief-${key}`} className="grid gap-1.5">
              <span className="text-sm font-bold text-mint">{fields[key].label}</span>
              <input
                id={`brief-${key}`}
                value={values[key]}
                onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                placeholder={fields[key].placeholder[industry]}
                className="min-h-12 rounded-[var(--radius-control)] border-2 border-paper/25 bg-paper/5 px-3 text-base text-paper placeholder:text-paper/50 focus:border-mint focus:outline-none"
              />
            </label>
          ))}
        </div>
        <div className="flex flex-col rounded-lg bg-paper p-5 text-aubergine">
          <div className="flex items-center justify-between gap-3">
            <p className="label text-purple">Your brief</p>
            <button
              type="button"
              onClick={async () => {
                if (await copyText(brief)) {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
                }
              }}
              className="rounded-md bg-aubergine px-3 py-1.5 text-sm font-extrabold text-paper"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-3 text-base leading-relaxed">{brief}</p>
          <p className="mt-auto pt-4 text-sm text-muted">{typed ? "Edit any field and it updates here." : "Showing an example until you type."}</p>
        </div>
      </div>
    </section>
  );
}

export function FieldGuide() {
  const [industry, setIndustry] = useState<Industry>("cinema");
  const [active, setActive] = useState<LevelId>("ask");
  const [activeTip, setActiveTip] = useState<number | null>(null);

  // Remember the reader's audience, and let a link choose it: ?for=health.
  useEffect(() => {
    let saved: string | null = new URLSearchParams(window.location.search).get("for");
    try {
      saved ??= window.localStorage.getItem(STORE_KEY);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the browser after hydration
    if (saved === "cinema" || saved === "health") setIndustry(saved);
  }, []);
  const chooseIndustry = (value: Industry) => {
    setIndustry(value);
    try {
      window.localStorage.setItem(STORE_KEY, value);
    } catch {}
  };

  useEffect(() => {
    const sections = levels.map((level) => document.getElementById(`level-${level.id}`)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id.replace("level-", "") as LevelId);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    // Which habit is being read, for the level index.
    const entries = tips.map((tip) => document.getElementById(`tip-${tip.n}`)).filter((el): el is HTMLElement => !!el);
    const reading = new IntersectionObserver(
      (items) => {
        const visible = items.filter((item) => item.isIntersecting);
        if (visible[0]) setActiveTip(Number(visible[0].target.id.replace("tip-", "")));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    entries.forEach((entry) => reading.observe(entry));

    // Arm each before-and-after that hasn't been seen, then play it on arrival.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const contrasts = [...document.querySelectorAll<HTMLElement>("[data-contrast]")];
    let play: IntersectionObserver | undefined;
    if (!reduced) {
      play = new IntersectionObserver(
        (items) =>
          items.forEach((item) => {
            if (!item.isIntersecting) return;
            (item.target as HTMLElement).dataset.contrast = "play";
            play?.unobserve(item.target);
          }),
        { rootMargin: "0px 0px -20% 0px" },
      );
      contrasts.forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.8) {
          el.dataset.contrast = "armed";
          play?.observe(el);
        }
      });
    }
    return () => {
      observer.disconnect();
      reading.disconnect();
      play?.disconnect();
    };
  }, []);

  return (
    <>
      <header className="aubergine-panel pt-[calc(var(--header-h)+clamp(2.5rem,7vw,5rem))] pb-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="shell grid items-end gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow tone="dark">{guideIntro.eyebrow}</Eyebrow>
            <h1 className="display-xl mt-6 text-balance">{guideIntro.title}</h1>
            <p className="mt-5 text-xl font-bold text-mint sm:text-2xl">{guideIntro.subtitle}</p>
            <p className="lede mt-5 max-w-[54ch] text-paper/85">{guideIntro.lede}</p>
          </div>
          <Climb />
        </div>
        <div className="shell mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-paper/15 pt-6">
          <p className="max-w-[44ch] text-base font-semibold text-paper">
            Hit the switch in the bar below for examples tailored to your industry: cinema, or health and wellness. It stays with you as you scroll.
          </p>
          <ShareGuide />
        </div>
      </header>

      <LevelBar active={active} industry={industry} onChange={chooseIndustry} />

      <div className="bg-paper">
        <div className="shell py-[clamp(2.5rem,6vw,4.5rem)]">
          <WhereAreYou />
        </div>
      </div>


      {levels.map((level, index) => {
        const levelTips = tips.filter((tip) => tip.level === level.id);
        return (
          <section
            key={level.id}
            id={`level-${level.id}`}
            aria-labelledby={`level-${level.id}-title`}
            className={`scroll-mt-[calc(var(--header-h)+3.5rem)] pt-[clamp(3rem,7vw,5.5rem)] pb-[clamp(1rem,3vw,2rem)] ${index % 2 ? "bg-paper" : "bg-white"}`}
          >
            <div className="shell grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              {/* The level's index: sticks beside its habits on wide screens. */}
              <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)] lg:self-start">
                <p className="text-[clamp(4.5rem,11vw,8rem)] leading-[0.82] font-extrabold tracking-tighter text-purple" aria-hidden="true">
                  {level.name}
                </p>
                <h2 id={`level-${level.id}-title`} className="display-s mt-5 text-balance">
                  <span className="sr-only">{level.name}: </span>
                  {level.line}
                </h2>
                <p className="body-copy mt-3 max-w-[40ch]">{level.scene}</p>
                <ol className="mt-6 hidden border-t border-[var(--rule)] lg:block">
                  {levelTips.map((tip) => (
                    <li key={tip.n} className="border-b border-[var(--rule)]">
                      <a
                        href={`#tip-${tip.n}`}
                        aria-current={activeTip === tip.n ? "true" : undefined}
                        className="flex gap-3 py-2.5 text-[0.95rem] leading-snug font-bold text-muted transition-colors hover:text-aubergine aria-[current]:text-aubergine"
                      >
                        <span className="text-purple tabular-nums">{pad(tip.n)}</span>
                        {tip.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                {levelTips.map((tip) => (
                  <HabitEntry key={tip.n} tip={tip} industry={industry} />
                ))}
                {level.id === "ask" ? (
                  <div className="mb-14 lg:mb-20">
                    <BriefBuilder industry={industry} />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      <section className="mint-panel py-[clamp(3rem,7vw,5rem)]">
        <div className="shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="display-m max-w-[22ch] text-balance">{guideClose.title}</h2>
            <p className="body-copy mt-4 max-w-[56ch] text-aubergine">{guideClose.body}</p>
          </div>
          <Link href="/#contact" className="btn btn-primary">
            {guideClose.action}
          </Link>
        </div>
        <p className="shell mt-10 text-sm text-aubergine/80">
          Tool settings and features checked {checkedOn}. They change often; tell us if one has moved.
        </p>
      </section>
    </>
  );
}
