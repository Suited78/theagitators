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
    default:
      return null;
  }
}
