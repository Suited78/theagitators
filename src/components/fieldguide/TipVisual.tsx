import type { Industry, Tip } from "@/content/fieldGuide";

/**
 * Each habit's before-and-after picture, drawn in type and simple brand
 * shapes rather than illustration: the repository's metaphors, made literal.
 * Purely decorative; the caption under it carries the meaning.
 */
export function TipVisual({ tip, side, industry }: { tip: Tip; side: "before" | "after"; industry: Industry }) {
  const after = side === "after";
  switch (tip.id) {
    case "context":
      return (
        <div className="flex items-center gap-5">
          <div className="relative w-28 shrink-0 rounded-lg border-2 border-aubergine bg-white px-3 pt-6 pb-3 text-center">
            <span className="absolute top-1.5 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-divider" />
            <span className={`block rounded px-1 py-0.5 text-[0.7rem] font-extrabold tracking-[0.14em] ${after ? "bg-purple text-white" : "bg-mint text-aubergine"}`}>
              {after ? "TEAM" : "VISITOR"}
            </span>
            <span className="mt-2 block text-xs font-semibold text-muted">{after ? "Inducted" : "Day one"}</span>
          </div>
          <ul className="space-y-1.5 text-sm font-semibold">
            {["Your audience", "Your tone", "What good looks like"].map((item) => (
              <li key={item} className={`flex items-center gap-2 ${after ? "text-aubergine" : "text-muted line-through decoration-divider"}`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] ${after ? "bg-purple text-white" : "bg-divider text-transparent"}`}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "talk":
      return after ? (
        <p className="relative max-w-[34ch] rounded-2xl rounded-bl-sm bg-purple px-4 py-3 text-sm leading-snug text-white">
          {tip.prompt?.[industry].slice(0, 150)}…
        </p>
      ) : (
        <p className="max-w-[30ch] border-y-2 border-dashed border-aubergine/40 bg-white px-4 py-3 font-mono text-sm leading-relaxed tracking-wide text-aubergine uppercase">
          SEND REPORT <b>STOP</b> NEED BY FRIDAY <b>STOP</b>
        </p>
      );
    case "confirm":
      return after ? (
        <div className="w-full max-w-[17rem] rounded-md border border-divider bg-white px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-aubergine shadow-[3px_3px_0_var(--color-mint)]">
          <p className="font-bold">Reading that back:</p>
          <p>2 × flat white, 1 oat</p>
          <p>1 × long black</p>
          <p>Banana bread, warmed</p>
          <p className="mt-1 font-bold text-purple">That right?</p>
        </div>
      ) : (
        <div className="flex items-end gap-4">
          <p className="rounded-2xl rounded-br-sm bg-aubergine px-4 py-2 text-lg font-extrabold text-paper">“Got it.”</p>
          <div className="w-24 rounded-md border border-dashed border-divider bg-white px-3 py-4 text-center text-xs font-semibold text-muted">
            Order pad: blank
          </div>
        </div>
      );
    case "persona":
      return (
        <div className="w-full max-w-[17rem] rotate-[-1.5deg] border-2 border-aubergine bg-white px-4 py-3 text-center">
          <p className="text-[0.7rem] font-extrabold tracking-[0.3em] text-purple">CASTING CALL</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-aubergine">WANTED</p>
          <p className={`mt-1 leading-snug font-semibold ${after ? "text-sm text-aubergine" : "text-base text-muted"}`}>
            {after ? "A gruff 60-year-old detective who knows the city." : "An actor."}
          </p>
        </div>
      );
    case "training":
      return after ? (
        <div className="relative h-28 w-44 overflow-hidden rounded-md border-2 border-aubergine bg-white">
          <span className="absolute inset-x-0 top-0 h-0 border-x-[86px] border-t-[56px] border-x-transparent border-t-paper" />
          <span className="absolute inset-x-0 top-0 h-0 border-x-[86px] border-t-[58px] border-x-transparent border-t-aubergine opacity-20" />
          <span className="absolute top-[42px] left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-purple text-[0.6rem] font-extrabold text-white">
            SEALED
          </span>
        </div>
      ) : (
        <div className="grid h-28 w-48 grid-cols-[1fr_auto] gap-3 rounded-md border-2 border-aubergine bg-white p-3 text-[0.7rem] leading-snug text-aubergine">
          <p>
            Hi team, this month’s numbers: takings up 12%, three staff leaving, new supplier rates attached…
          </p>
          <span className="h-9 w-8 border-2 border-dashed border-purple" />
        </div>
      );
    case "check":
      return after ? (
        <ul className="space-y-1.5 text-base font-bold text-aubergine">
          {["Names", "Numbers", "Dates"].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple text-[0.7rem] text-white">✓</span>
              {item} checked
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full max-w-[16rem]">
          <div className="rounded-lg bg-aubergine px-4 py-3 text-paper">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] text-mint">IN 50 M</p>
            <p className="text-lg font-extrabold">Turn left ↰</p>
          </div>
          <svg viewBox="0 0 200 26" className="mt-2 h-6 w-full" aria-hidden="true">
            <path d="M0 14 Q 12.5 4 25 14 T 50 14 T 75 14 T 100 14 T 125 14 T 150 14 T 175 14 T 200 14" fill="none" stroke="var(--color-purple)" strokeWidth="2.5" />
          </svg>
        </div>
      );
    case "knowledge":
      return after ? (
        <div className="w-full max-w-[16rem] rounded-md border border-divider bg-white px-4 py-3 text-aubergine shadow-[3px_3px_0_var(--color-mint)]">
          <p className="text-[0.7rem] font-extrabold tracking-[0.14em] text-purple">RECIPE CARD</p>
          <p className="mt-1 font-extrabold">House stock</p>
          <ol className="mt-1 space-y-0.5 text-[0.8rem]">
            <li>1. Salt: one teaspoon per litre</li>
            <li>2. Simmer four hours</li>
            <li>3. Taste before it goes out</li>
          </ol>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-aubergine text-[0.65rem] font-extrabold tracking-[0.1em] text-paper">CHEF</span>
          <p className="rounded-2xl rounded-bl-sm bg-white px-4 py-2 text-base font-bold text-aubergine shadow-[inset_0_0_0_1px_var(--rule)]">
            “A pinch. You just know.”
          </p>
        </div>
      );
    case "forecast":
      return after ? (
        <div className="w-full max-w-[15rem]">
          <div className="flex h-24 items-end gap-2 border-b-2 border-aubergine">
            {[45, 60, 52, 88, 70, 64].map((h, i) => (
              <span key={i} className={`flex-1 rounded-t-sm ${i === 3 ? "bg-purple" : "bg-mint"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-muted">
            <span className="font-extrabold text-purple">Week 4 up:</span> school holidays start
          </p>
        </div>
      ) : (
        <div className="text-center">
          <svg viewBox="0 0 120 60" className="mx-auto h-14 w-28" aria-hidden="true">
            <path d="M6 30 C 30 10, 40 50, 64 30 S 100 14, 114 30" fill="none" stroke="var(--color-divider)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
            <path d="M104 22 L114 30 L104 38" fill="none" stroke="var(--color-divider)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="mt-1 text-lg font-extrabold text-muted">“Feels like a big week?”</p>
        </div>
      );
    case "newsletter": {
      const groups = industry === "cinema" ? ["Families", "Seniors", "Film buffs", "Students", "Members"] : ["New mums", "Over-60s", "Athletes", "Desk workers", "Members"];
      return after ? (
        <div className="flex max-w-[17rem] flex-wrap justify-center gap-2">
          {groups.map((group) => (
            <span key={group} className="rounded-full bg-purple px-3 py-1.5 text-xs font-bold text-white">
              {group}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-aubergine px-3 py-2 text-xs font-extrabold tracking-[0.12em] text-paper">ONE VERSION</span>
          <span className="text-2xl font-extrabold text-divider" aria-hidden="true">→</span>
          <span className="rounded-full bg-divider px-4 py-2 text-xs font-bold text-muted">Everyone</span>
        </div>
      );
    }
    case "build":
      return after ? (
        <div className="w-full max-w-[15rem] rounded-md border-2 border-aubergine bg-white p-3">
          <p className="text-[0.7rem] font-extrabold tracking-[0.12em] text-purple">THIS WEEK, BY SITE</p>
          <div className="mt-2 space-y-1.5">
            {[80, 62, 47].map((w, i) => (
              <span key={i} className="block h-2.5 rounded-full bg-mint" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="mt-2 text-[0.7rem] font-semibold text-muted">Built Tuesday afternoon</p>
        </div>
      ) : (
        <div className="w-full max-w-[14rem] rounded-md border border-divider bg-white px-4 py-3 text-aubergine">
          <p className="text-[0.7rem] font-extrabold tracking-[0.2em] text-muted">QUOTE</p>
          <div className="mt-2 space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-divider" />
            <span className="block h-1.5 w-4/5 rounded-full bg-divider" />
          </div>
          <p className="mt-3 text-sm font-extrabold">Delivery: 12 weeks</p>
        </div>
      );
    case "day-one":
      return (
        <div className="w-36 overflow-hidden rounded-md border-2 border-aubergine bg-white text-center">
          <p className={`py-1 text-[0.7rem] font-extrabold tracking-[0.14em] ${after ? "bg-mint text-aubergine" : "bg-aubergine text-paper"}`}>
            {after ? "TUESDAY" : "SATURDAY"}
          </p>
          <p className="pt-2 text-sm font-extrabold text-aubergine">{after ? "Quiet shift" : "Busiest night"}</p>
          <p className="pb-3 text-xs font-semibold text-muted">{after ? "Shadowing a pro" : "On their own"}</p>
        </div>
      );
    case "schedule":
      return after ? (
        <div className="w-full max-w-[15rem] rotate-[-2deg] rounded-sm border-2 border-aubergine bg-white px-4 py-3 text-aubergine">
          <p className="border-b-2 border-aubergine pb-1 text-center text-sm font-extrabold tracking-[0.12em]">MONDAY BRIEFING</p>
          <p className="mt-2 text-xs font-semibold text-muted">Three things to know this week</p>
          <p className="mt-1 text-xs font-extrabold text-purple">Delivered 7:00am</p>
        </div>
      ) : (
        <ol className="space-y-1.5 text-sm font-semibold text-muted">
          <li><span className="mr-2 font-extrabold text-aubergine tabular-nums">6:45</span>Shoes on</li>
          <li><span className="mr-2 font-extrabold text-aubergine tabular-nums">6:50</span>Walk to the newsagent</li>
          <li><span className="mr-2 font-extrabold text-aubergine tabular-nums">7:20</span>Back, still to read it</li>
        </ol>
      );
    case "research":
      return after ? (
        <div className="w-full max-w-[14rem] rounded-md border border-divider bg-white px-4 py-3 text-aubergine shadow-[3px_3px_0_var(--color-mint)]">
          <p className="text-[0.7rem] font-extrabold tracking-[0.14em] text-purple">REPORT</p>
          <div className="mt-2 space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-divider" />
            <span className="block h-1.5 w-11/12 rounded-full bg-divider" />
            <span className="block h-1.5 w-3/4 rounded-full bg-divider" />
          </div>
          <p className="mt-2 text-xs font-extrabold">Sources cited ✓</p>
        </div>
      ) : (
        <div className="flex w-full max-w-[16rem] flex-wrap gap-1">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="h-6 w-[22%] rounded-t-md border border-b-0 border-divider bg-white" />
          ))}
        </div>
      );
    default:
      return null;
  }
}
