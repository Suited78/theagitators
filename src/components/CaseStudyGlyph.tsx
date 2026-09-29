/**
 * Placeholder visual for a case study. Deterministic, drawn rather than
 * photographed, and swapped out by supplying `study.image`.
 *
 * Deliberately abstract: no rising lines or upward curves, because a
 * results-shaped graphic on illustrative content would read as a claim.
 */
export function CaseStudyGlyph({ variant, className = "" }: { variant: number; className?: string }) {
  const v = variant % 3;
  return (
    <svg viewBox="0 0 240 160" className={className} role="presentation" aria-hidden="true" fill="none">
      <rect width="240" height="160" fill="#ffffff" />

      {/* Tangle resolving into a single ordered row. */}
      {v === 0 ? (
        <g>
          <g stroke="var(--color-aubergine)" strokeOpacity="0.2" strokeWidth="1">
            <path d="M28 34 L96 118 L54 62 L118 40 L36 96 L110 88" />
            <path d="M28 118 L112 34" />
          </g>
          <g stroke="var(--color-aubergine)" strokeOpacity="0.26" strokeWidth="1">
            <path d="M140 76 L212 76" />
            {[140, 158, 176, 194, 212].map((x) => (
              <path key={x} d={`M${x} 64 L${x} 88`} />
            ))}
          </g>
          <circle cx="176" cy="76" r="4" fill="var(--color-purple)" />
        </g>
      ) : null}

      {/* A field of equivalent options with one chosen. */}
      {v === 1 ? (
        <g>
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => {
              const chosen = row === 2 && col === 5;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={28 + col * 26}
                  cy={28 + row * 26}
                  r={chosen ? 4.5 : 2}
                  fill={chosen ? "var(--color-purple)" : "var(--color-aubergine)"}
                  fillOpacity={chosen ? 1 : 0.3}
                />
              );
            }),
          )}
          <circle cx="158" cy="80" r="13" stroke="var(--color-purple)" strokeOpacity="0.45" strokeWidth="1" />
        </g>
      ) : null}

      {/* A process rerouted: the old path faint, the new one direct. */}
      {v === 2 ? (
        <g fill="none">
          <path
            d="M28 122 L70 122 L70 88 L112 88 L112 122 L154 122 L154 62 L212 62"
            stroke="var(--color-aubergine)"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <path d="M28 122 L96 92 L212 62" stroke="var(--color-purple)" strokeOpacity="0.9" strokeWidth="1.5" />
          <circle cx="28" cy="122" r="3" fill="var(--color-aubergine)" fillOpacity="0.4" />
          <circle cx="212" cy="62" r="4" fill="var(--color-purple)" />
        </g>
      ) : null}
    </svg>
  );
}
