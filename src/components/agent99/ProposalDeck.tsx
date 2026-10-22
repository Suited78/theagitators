"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { advantage, nextStep, pathway, people, proposal, squeeze, valueShift, workshop } from "@/content/agent99";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Eyebrow } from "../Eyebrow";
import { Logo } from "../Logo";
import { Motif } from "../Motif";
import { AdvantageChart } from "./AdvantageChart";

/**
 * The Agent99 proposal as a presentation: one slide at a time, tabs along the
 * top, previous and next along the bottom. Same content as the one-page
 * version (src/content/agent99.ts), laid out to fit a laptop screen.
 *
 * Arrow keys, Page Up/Down, Home/End and swipes move between slides. The
 * slide is kept in the URL hash (#workshop), so a link can open on any slide.
 * Printing gives every slide, one per page.
 */

type Tone = "white" | "paper" | "aubergine";
type Slide = { id: string; tab: string; tone: Tone; render: (go: (id: string) => void) => ReactNode };

const pad = (n: number) => String(n).padStart(2, "0");
const totalMinutes = workshop.agenda.reduce((sum, item) => sum + item.minutes, 0);

/** Slide heading: the website's eyebrow and display type, a size down so a slide fits a screen. */
function Heading({ eyebrow, headline, tone = "light" }: { eyebrow: string; headline: string; tone?: "light" | "dark" }) {
  return (
    <>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="display-m mt-4 max-w-[24ch] text-balance">{headline}</h2>
    </>
  );
}

const slides: Slide[] = [
  {
    id: "proposal",
    tab: "The proposal",
    tone: "white",
    render: (go) => (
      <div className="max-w-[60rem]">
        <Eyebrow>{proposal.eyebrow}</Eyebrow>
        <h2 className="display-xl mt-6 text-balance">
          {proposal.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="lede mt-8 max-w-[52ch] text-aubergine">{proposal.lede}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={() => go("change")} className="btn btn-primary">
            Begin
          </button>
          <button type="button" onClick={() => go("workshop")} className="btn btn-secondary">
            Skip to the workshop
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "change",
    tab: "What’s changing",
    tone: "white",
    render: () => (
      <>
        <Heading eyebrow={squeeze.eyebrow} headline={squeeze.headline} />
        <ol className="mt-10 grid gap-x-10 md:grid-cols-3">
          {squeeze.points.map((point, index) => (
            <li key={point.title} className="border-t-2 border-aubergine pt-5 pb-8">
              <span className="text-[2.5rem] leading-none font-extrabold text-purple tabular-nums">{index + 1}</span>
              <h3 className="display-s mt-3 text-balance">{point.title}</h3>
              <p className="body-copy mt-3">{point.body}</p>
            </li>
          ))}
        </ol>
      </>
    ),
  },
  {
    id: "value",
    tab: "Where the value is",
    tone: "paper",
    render: () => (
      <>
        <Heading eyebrow={valueShift.eyebrow} headline={valueShift.headline} />
        <p className="label mt-8 text-muted">{valueShift.label}</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {valueShift.stages.map((stage) => (
            <div
              key={stage.name}
              className={`rounded-[var(--radius-card)] p-5 ${stage.valuable ? "aubergine-panel" : "border border-dashed border-divider bg-white"}`}
            >
              <p className={`label ${stage.valuable ? "text-mint" : "text-muted"}`}>{stage.zone}</p>
              <p className={`display-s mt-1.5 ${stage.valuable ? "" : "text-muted"}`}>{stage.name}</p>
              <ul className="mt-3 space-y-1.5">
                {stage.items.map((item) => (
                  <li key={item} className={`text-base leading-snug ${stage.valuable ? "text-paper/85" : "text-muted"}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {[valueShift.automated, valueShift.valuable].map((group, index) => (
            <div key={group.title}>
              <h3 className={`text-xl font-extrabold ${index === 0 ? "text-muted" : "text-purple"}`}>
                {group.title} <span className="text-base font-semibold text-aubergine">· {group.note}</span>
              </h3>
              <ul className="mt-3 border-t border-[var(--rule)]">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-[var(--rule)] py-2 text-base leading-snug text-aubergine">
                    <span aria-hidden="true" className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? "bg-divider" : "bg-purple"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "advantage",
    tab: "Your advantage",
    tone: "white",
    render: () => (
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading eyebrow={advantage.eyebrow} headline={advantage.headline} />
        </div>
        <p className="body-copy lg:col-span-6 lg:self-end">{advantage.body}</p>
        <div className="lg:col-span-8">
          <AdvantageChart compact />
        </div>
        <ol className="grid content-start gap-5 lg:col-span-4">
          {advantage.moves.map((move, index) => (
            <li key={move.title} className="border-t-2 border-aubergine pt-4">
              <h3 className="text-xl leading-tight font-extrabold text-balance">
                <span className="mr-2 text-purple tabular-nums">{index + 1}</span>
                {move.title}
              </h3>
              <p className="mt-1.5 text-base leading-snug text-muted">{move.body}</p>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "workshop",
    tab: "The workshop",
    tone: "paper",
    render: () => (
      <>
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Heading eyebrow={workshop.eyebrow} headline={workshop.headline} />
          </div>
          <p className="body-copy lg:col-span-6 lg:self-end">{workshop.body}</p>
        </div>
        <p className="label mt-8 text-muted">The morning, to scale · {Math.round((totalMinutes / 60) * 10) / 10} hours</p>
        {/* Each block's width is its share of the time. */}
        <ol className="mt-3 grid gap-3 md:flex md:gap-2">
          {workshop.agenda.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--rule)] bg-white p-4 md:min-w-0"
              style={{ flex: `${item.minutes} 1 0%` }}
            >
              <span aria-hidden="true" className={`block h-2 rounded-full ${["bg-aubergine", "bg-purple", "bg-mint", "bg-aubergine/60"][index]}`} />
              <p className="label mt-3 text-purple">{item.minutes} min</p>
              <h3 className="mt-1.5 text-lg leading-snug font-extrabold text-balance">{item.title}</h3>
              <p className="mt-1.5 text-base leading-snug text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <div className="aubergine-panel rounded-[var(--radius-card)] p-6 md:col-span-7">
            <p className="label text-mint">The investment</p>
            <p className="display-m mt-2">{workshop.price}</p>
            <p className="mt-2 max-w-[48ch] text-base leading-relaxed text-paper/85">{workshop.priceNote}</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--rule)] bg-white p-6 md:col-span-5">
            <p className="label text-purple">{workshop.before.label}</p>
            <p className="mt-2 text-base leading-relaxed text-aubergine">{workshop.before.body}</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "pathway",
    tab: "After the workshop",
    tone: "white",
    render: () => (
      <>
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Heading eyebrow={pathway.eyebrow} headline={pathway.headline} />
          </div>
          <p className="body-copy lg:col-span-6 lg:self-end">{pathway.body}</p>
        </div>
        <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {pathway.steps.map((step, index) => (
            <li
              key={step.name}
              className={`flex flex-col rounded-[var(--radius-card)] p-5 ${index === 0 ? "mint-panel" : "border border-[var(--rule)] bg-white"}`}
            >
              <p className={`label ${index === 0 ? "text-aubergine" : "text-purple"}`}>{step.step}</p>
              <h3 className="mt-1.5 text-xl leading-tight font-extrabold text-balance">{step.name}</h3>
              <p className="mt-2 text-base leading-snug font-bold text-aubergine">{step.line}</p>
              {step.body ? <p className="mt-2 text-[0.9375rem] leading-snug text-muted">{step.body}</p> : null}
            </li>
          ))}
        </ol>
        {/* Pricing stated plainly at heading size, not as a footnote. */}
        <div className="mt-8 border-l-4 border-purple pl-5 md:pl-6">
          <p className="display-s max-w-[40ch] text-balance">{pathway.pricing}</p>
          <p className="body-copy mt-2">{pathway.pricingNote}</p>
        </div>
      </>
    ),
  },
  {
    id: "people",
    tab: "Who you’d work with",
    tone: "paper",
    render: () => (
      <>
        <Heading eyebrow={people.eyebrow} headline={people.headline} />
        <ul className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {people.members.map((member) => (
            <li key={member.name}>
              <div className="flex items-end gap-5">
                <div className="relative aspect-[4/5] w-28 shrink-0 lg:w-36">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 top-2.5 left-2.5 rounded-[var(--radius-card)]"
                    style={{ backgroundColor: `var(--color-${member.offset})` }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    width={800}
                    height={1000}
                    className="absolute inset-0 right-2.5 bottom-2.5 h-[calc(100%-0.625rem)] w-[calc(100%-0.625rem)] rounded-[var(--radius-card)] object-cover"
                  />
                </div>
                <div className="pb-1">
                  <h3 className="text-xl leading-tight font-extrabold">{member.name}</h3>
                  <p className="label mt-1.5 text-purple">{member.role}</p>
                </div>
              </div>
              <p className="body-copy mt-5 text-base">{member.bio}</p>
              <p className="mt-4 text-base text-aubergine">
                <span className="label mr-2 text-muted">Focus</span>
                {member.focus}
              </p>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "next",
    tab: "Next step",
    tone: "aubergine",
    render: () => (
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="dark">{nextStep.eyebrow}</Eyebrow>
          <h2 className="display-xl mt-6 text-balance">
            {nextStep.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="lede text-paper/85">{nextStep.body}</p>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent(nextStep.subject)}`} className="btn btn-on-dark mt-8">
            {nextStep.action}
          </a>
          <p className="mt-8 flex items-center gap-3 text-base text-paper/80">
            <Motif tone="dark" />
            <span>
              {nextStep.signoff} ·{" "}
              <a href={`mailto:${site.email}`} className="text-link text-paper">
                {site.email}
              </a>
            </span>
          </p>
        </div>
      </div>
    ),
  },
];

const toneClass: Record<Tone, string> = { white: "bg-white", paper: "bg-paper", aubergine: "aubergine-panel" };

export function ProposalDeck({ onePageHref }: { onePageHref: string }) {
  // Which slide, which way we came, and whether a tab had focus (so focus follows the arrow keys).
  const [{ index, direction, fromTab }, setNav] = useState({ index: 0, direction: 1, fromTab: false });
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((to: number | ((current: number) => number), { fromTab = false } = {}) => {
    setNav((nav) => {
      const next = Math.max(0, Math.min(slides.length - 1, typeof to === "function" ? to(nav.index) : to));
      return { index: next, direction: next >= nav.index ? 1 : -1, fromTab };
    });
  }, []);
  const goToId = useCallback((id: string) => goTo(slides.findIndex((slide) => slide.id === id)), [goTo]);

  // Open on the slide named in the URL, and follow the hash if it's edited.
  useEffect(() => {
    const fromHash = () => {
      const found = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
      if (found >= 0) goTo(found);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [goTo]);

  // Keep the URL on the current slide, start each slide at its top, and keep its tab in view.
  useEffect(() => {
    window.history.replaceState(null, "", index === 0 ? window.location.pathname : `#${slides[index].id}`);
    stageRef.current?.scrollTo({ top: 0 });
    const tab = tabRefs.current[index];
    tab?.scrollIntoView({ block: "nearest", inline: "center" });
    if (fromTab) tab?.focus();
  }, [index, fromTab]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      const fromTab = target?.getAttribute("role") === "tab";
      const moves: Record<string, () => void> = {
        ArrowRight: () => goTo((i) => i + 1, { fromTab }),
        ArrowLeft: () => goTo((i) => i - 1, { fromTab }),
        PageDown: () => goTo((i) => i + 1, { fromTab }),
        PageUp: () => goTo((i) => i - 1, { fromTab }),
        Home: () => goTo(0, { fromTab }),
        End: () => goTo(slides.length - 1, { fromTab }),
      };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      move();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  const current = slides[index];
  const previous = slides[index - 1];
  const next = slides[index + 1];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white print:block print:h-auto print:overflow-visible">
      <h1 className="sr-only">Agent99: discovery workshop proposal</h1>
      {/* A slim header: the brand, and a way back to the one-page version. No site nav, so nothing pulls away from the proposal. */}
      <header className="shrink-0 border-b border-[var(--rule)] bg-white print:hidden">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Link href="/" className="-m-1 rounded-sm p-1" aria-label={`${site.name}, home`}>
            <Logo className="w-[180px]" />
          </Link>
          <Link href={onePageHref} className="text-sm font-bold text-muted underline decoration-divider underline-offset-4 hover:text-aubergine">
            View as one page
          </Link>
        </div>
      </header>

      <nav aria-label="Slides" className="shrink-0 border-b border-[var(--rule)] bg-white print:hidden">
        <div role="tablist" aria-label="Proposal" className="shell flex gap-1 overflow-x-auto [scrollbar-width:none] lg:justify-between lg:gap-0">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${slide.id}`}
              role="tab"
              type="button"
              aria-selected={i === index}
              aria-controls={`slide-${slide.id}`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => goTo(i)}
              className="group relative flex h-12 shrink-0 items-center gap-2 px-2.5 text-sm font-bold whitespace-nowrap text-muted transition-colors hover:text-aubergine aria-selected:text-aubergine lg:px-0"
            >
              <span className="text-purple tabular-nums">{pad(i + 1)}</span>
              {slide.tab}
              <span
                aria-hidden="true"
                className="absolute inset-x-2.5 bottom-0 h-[3px] origin-left scale-x-0 bg-purple transition-transform duration-500 [transition-timing-function:var(--ease-out-quint)] group-aria-selected:scale-x-100 lg:inset-x-0"
              />
            </button>
          ))}
        </div>
      </nav>

      <div
        ref={stageRef}
        // Focusable so the slide can be scrolled from the keyboard when it runs longer than the screen.
        tabIndex={0}
        aria-label="Slide"
        className={`min-h-0 flex-1 overflow-y-auto transition-colors duration-500 print:overflow-visible ${toneClass[current.tone]}`}
        onTouchStart={(event) => {
          touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }}
        onTouchEnd={(event) => {
          const start = touch.current;
          touch.current = null;
          if (!start) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(index + (dx < 0 ? 1 : -1));
        }}
      >
        {slides.map((slide, i) => (
          <section
            key={slide.id}
            id={`slide-${slide.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${slide.id}`}
            className={`min-h-full flex-col justify-center print:flex print:min-h-0 print:break-after-page ${i === index ? "flex" : "hidden"} ${toneClass[slide.tone]}`}
          >
            {i === index ? (
              <motion.div
                key={slide.id}
                className="shell w-full py-[clamp(2rem,5vh,4rem)]"
                initial={reduced ? false : { opacity: 0, x: 28 * direction }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.render(goToId)}
              </motion.div>
            ) : (
              // Only rendered for print, where every slide shows.
              <div className="shell w-full py-10">{slide.render(goToId)}</div>
            )}
          </section>
        ))}
      </div>

      <div className="shrink-0 border-t border-[var(--rule)] bg-white print:hidden">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={!previous}
            className="btn btn-secondary min-h-11 px-4 text-sm disabled:invisible"
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="hidden gap-1 sm:flex">
              {slides.map((slide, i) => (
                <span key={slide.id} className={`h-1.5 w-5 rounded-full ${i <= index ? "bg-purple" : "bg-divider"}`} />
              ))}
            </span>
            <p className="text-sm font-bold text-aubergine tabular-nums" aria-live="polite">
              <span className="sr-only">Slide </span>
              {index + 1} <span className="text-muted">of {slides.length}</span>
              <span className="sr-only">: {current.tab}</span>
            </p>
          </div>
          {next ? (
            <button type="button" onClick={() => goTo(index + 1)} className="btn btn-primary min-h-11 px-4 text-sm">
              <span>
                Next<span className="hidden md:inline">: {next.tab}</span>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(nextStep.subject)}`} className="btn btn-primary min-h-11 px-4 text-sm">
              {nextStep.action}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
