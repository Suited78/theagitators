/**
 * The adoption gap, for one agency: what AI can do, what most agencies have
 * put to work, and Agent99's line if it moves now. Conceptual, not plotted
 * from data, so there are no axis values or years. Same curves and drawing
 * approach as the homepage chart: a stretched 0–100 box, non-scaling
 * strokes, HTML labels placed by percentage.
 */

const NOW = 3 / 7; // 2026 on a 2023–2030 span, as on the homepage chart.
const capability = (t: number) => 0.4 + 0.55 * ((Math.exp(2.7 * t) - 1) / (Math.exp(2.7) - 1));
const absorption = (t: number) => 0.14 + 0.08 * t;
// From now, Agent99 closes much of the gap: most of the way by the far end.
const agent99 = (t: number) => {
  if (t <= NOW) return absorption(t);
  const s = (t - NOW) / (1 - NOW);
  return absorption(t) + (capability(t) - absorption(t)) * 0.62 * s ** 1.6;
};

const SAMPLES = 60;
const sample = (fn: (t: number) => number, from = 0) =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = from + (i / SAMPLES) * (1 - from);
    return [t * 100, (1 - fn(t)) * 100] as const;
  });
const toPath = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
const area = (upper: (t: number) => number, lower: (t: number) => number, from = 0) =>
  `${toPath(sample(upper, from))} ${toPath([...sample(lower, from)].reverse()).replace(/^M/, "L")} Z`;

const top = (value: number) => `${(1 - value) * 100}%`;

const series = [
  { label: "What AI can do", note: null, colour: "var(--color-purple)", end: capability(1) },
  { label: "Agent99, if it moves now", note: "One platform, shared habits, first wins in weeks", colour: "var(--color-purple)", end: agent99(1) },
  { label: "What most agencies have put to work", note: null, colour: "var(--color-aubergine)", end: absorption(1) },
] as const;

export function AdvantageChart() {
  const nowX = NOW * 100;
  return (
    <div
      role="img"
      aria-label="Conceptual chart. What AI can do rises ever faster. What most agencies have put to work barely rises. From now, Agent99's line climbs away from the agencies' line towards what AI can do: the space between Agent99 and everyone else is the advantage, before everyone catches up."
      className="grid gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,1fr)_12rem]"
    >
      <div aria-hidden="true" className="relative aspect-[4/3] sm:aspect-[16/10]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <g stroke="var(--color-divider)" strokeWidth="1">
            {[0, 25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <line x1="0" x2="100" y1="100" y2="100" stroke="var(--color-muted)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          {/* The gap above Agent99's line in mint, the advantage below it in lavender, so the two never overlap. */}
          <path d={area(capability, agent99)} fill="var(--color-mint)" fillOpacity="0.6" />
          <path d={area(agent99, absorption, NOW)} fill="var(--color-purple)" fillOpacity="0.22" />
          <line x1={nowX} x2={nowX} y1="0" y2="100" stroke="var(--color-aubergine)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d={toPath(sample(absorption))} fill="none" stroke="var(--color-aubergine)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={toPath(sample(agent99, NOW))} fill="none" stroke="var(--color-purple)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={toPath(sample(capability))} fill="none" stroke="var(--color-purple)" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        <span className="label absolute top-1 -translate-x-1/2 rounded-[4px] bg-aubergine px-2 py-0.5 text-paper" style={{ left: `${nowX}%` }}>
          Now
        </span>
        <p className="absolute left-[2%] max-w-[38%] leading-snug" style={{ top: "40%" }}>
          <span className="block text-sm font-extrabold sm:text-base">The adoption gap</span>
          <span className="hidden text-sm text-muted md:block">Every year the tools can do more. What a business takes on moves far more slowly.</span>
        </p>
        <p className="absolute left-[62%] leading-snug" style={{ top: "62%" }}>
          <span className="block text-sm font-extrabold text-purple sm:text-base">Your advantage</span>
          <span className="hidden text-sm text-muted md:block">before everyone catches up</span>
        </p>
      </div>

      {/* Line labels: beside each line's end on wider screens, a key underneath on phones. */}
      <div aria-hidden="true" className="relative grid gap-3 sm:block">
        {series.map((item) => (
          <p
            key={item.label}
            className="flex items-start gap-2.5 leading-snug sm:absolute sm:left-0 sm:-translate-y-1/2"
            style={{ top: top(item.end) }}
          >
            <span className="mt-[0.45em] h-1 w-4 shrink-0 rounded-full sm:hidden" style={{ backgroundColor: item.colour }} />
            <span>
              <span className="block text-sm font-extrabold sm:text-base" style={{ color: item.label.startsWith("Agent99") ? "var(--color-purple)" : undefined }}>
                {item.label}
              </span>
              {item.note ? <span className="block text-sm text-muted">{item.note}</span> : null}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
