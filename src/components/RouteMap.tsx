"use client";

import { products } from "@/content/products";
import { processSteps } from "@/content/process";
import { selectProduct, useSelectedProduct } from "@/lib/productSelection";

/**
 * Every product follows the same route: one shared conversation, the same
 * three stops, then ongoing support. Drawn like a transit map. The stage the
 * reader has scrolled to lights up; a chosen product highlights its line.
 *
 * Vertical beside the steps on large screens, horizontal (no labels, the
 * caption names the stage) in the pinned band on small ones.
 */

/** Line colours, in product order. Mint is deepened so the line reads on white. */
const ROUTE_COLOURS: Record<string, string> = {
  onboarding: "var(--color-purple)",
  efficiency: "#3f7a5c",
  transformation: "var(--color-aubergine)",
};

/** `scale` sizes lines and stops: the horizontal map is drawn small, so it needs them heavier. */
type Geometry = { along: number[]; across: number[]; vertical: boolean; scale: number };

const VERTICAL: Geometry = { along: [36, 156, 276, 396, 516], across: [52, 112, 172], vertical: true, scale: 1 };
const HORIZONTAL: Geometry = { along: [50, 280, 500, 720, 950], across: [36, 90, 144], vertical: false, scale: 2 };

function point(g: Geometry, along: number, across: number) {
  return g.vertical ? `${across} ${along}` : `${along} ${across}`;
}

/** The four segments of one route: fan out, two straight runs, fan back in. */
function segments(g: Geometry, lane: number) {
  const [u0, u1, u2, u3, u4] = g.along;
  const mid = g.across[1];
  const w = g.across[lane];
  const half = (a: number, b: number) => a + (b - a) / 2;
  return [
    `M${point(g, u0, mid)} C${point(g, half(u0, u1), mid)} ${point(g, half(u0, u1), w)} ${point(g, u1, w)}`,
    `M${point(g, u1, w)} L${point(g, u2, w)}`,
    `M${point(g, u2, w)} L${point(g, u3, w)}`,
    `M${point(g, u3, w)} C${point(g, half(u3, u4), w)} ${point(g, half(u3, u4), mid)} ${point(g, u4, mid)}`,
  ];
}

function Map({ g, active, selected }: { g: Geometry; active: number; selected: string | null }) {
  const stationFill = (stage: number) =>
    stage < active ? "var(--color-aubergine)" : stage === active ? "var(--color-purple)" : "#fff";
  const stationStroke = (stage: number) => (stage === active ? "var(--color-purple)" : "var(--color-aubergine)");
  const hub = (stage: number) => {
    const [x, y] = point(g, g.along[stage], g.across[1]).split(" ").map(Number);
    return (
      <circle
        cx={x}
        cy={y}
        r={(stage === active ? 15 : 13) * g.scale}
        fill={stationFill(stage)}
        stroke={stationStroke(stage)}
        strokeWidth={4 * g.scale}
        className="transition-all duration-500"
      />
    );
  };

  return (
    <>
      {products.map((product, lane) => {
        const dimmed = selected !== null && selected !== product.id;
        return (
          <g key={product.id} className="transition-opacity duration-500" opacity={dimmed ? 0.12 : 1}>
            {segments(g, lane).map((d, index) => {
              const travelled = index < active;
              const last = index === 3;
              return (
                <path
                  key={index}
                  d={d}
                  fill="none"
                  stroke={ROUTE_COLOURS[product.id]}
                  strokeWidth={8 * g.scale}
                  strokeLinecap="round"
                  strokeDasharray={last ? `${2 * g.scale} ${14 * g.scale}` : undefined}
                  opacity={travelled ? 1 : 0.25}
                  className="transition-opacity duration-700"
                />
              );
            })}
            {[1, 2, 3].map((stage) => {
              const [x, y] = point(g, g.along[stage], g.across[lane]).split(" ").map(Number);
              return (
                <circle
                  key={stage}
                  cx={x}
                  cy={y}
                  r={(stage === active ? 10 : 8) * g.scale}
                  fill={stationFill(stage)}
                  stroke={stationStroke(stage)}
                  strokeWidth={3 * g.scale}
                  className="transition-all duration-500"
                />
              );
            })}
          </g>
        );
      })}
      {hub(0)}
      {hub(4)}
      {g.vertical
        ? processSteps.map((step, stage) => (
            <text
              key={step.id}
              x={g.across[2] + 30}
              y={g.along[stage] + 5}
              className="transition-colors duration-500"
              fill={stage === active ? "var(--color-aubergine)" : "var(--color-muted)"}
              style={{ font: `${stage === active ? 800 : 600} 15px var(--font-sans)` }}
            >
              {step.stop}
            </text>
          ))
        : null}
    </>
  );
}

export function RouteMap({ active }: { active: number }) {
  const selected = useSelectedProduct();

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Highlight a route">
        {products.map((product) => {
          const on = selected === product.id;
          return (
            <button
              key={product.id}
              type="button"
              aria-pressed={on}
              onClick={() => selectProduct(on ? null : product.id)}
              className={[
                "inline-flex min-h-9 items-center gap-2 rounded-full border-2 bg-white px-3 text-sm font-bold transition-colors duration-300",
                on ? "border-aubergine" : "border-divider hover:border-[var(--rule-strong)]",
              ].join(" ")}
            >
              <span aria-hidden="true" className="h-1.5 w-4 rounded-full" style={{ backgroundColor: ROUTE_COLOURS[product.id] }} />
              {product.name}
            </button>
          );
        })}
      </div>

      {/* The steps beside the map carry the words; the map is a picture of them. */}
      <svg
        viewBox="0 0 360 552"
        className="mt-6 hidden h-auto max-h-[min(56vh,520px)] w-full lg:block"
        role="img"
        aria-label="Route map: all three products start with the same conversation, pass the same stops (advice, seeing it working, across the business) and end with ongoing support. You can stop at any point."
      >
        <Map g={VERTICAL} active={active} selected={selected} />
      </svg>
      <svg viewBox="0 0 1000 180" className="mt-3 block h-auto w-full overflow-visible lg:hidden" aria-hidden="true">
        <Map g={HORIZONTAL} active={active} selected={selected} />
      </svg>
    </div>
  );
}
