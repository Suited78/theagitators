import type { CSSProperties } from "react";
import type { FlowStep } from "@/content/types";

/** Waiting is drawn as hatching: present in the elapsed time, but nobody working. */
const hatch: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(135deg, var(--color-ink-faint) 0 1px, transparent 1px 5px)",
};

export function fillFor(kind: FlowStep["kind"]): { className: string; style?: CSSProperties } {
  if (kind === "wait") return { className: "border border-[var(--rule-strong)] bg-bone", style: hatch };
  if (kind === "ai") return { className: "bg-accent" };
  return { className: "bg-ink" };
}

export function Swatch({ kind, className = "" }: { kind: FlowStep["kind"]; className?: string }) {
  const fill = fillFor(kind);
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 shrink-0 ${fill.className} ${className}`}
      style={fill.style}
    />
  );
}

export function Legend({ className = "" }: { className?: string }) {
  const items: { kind: FlowStep["kind"]; label: string }[] = [
    { kind: "work", label: "Work" },
    { kind: "wait", label: "Waiting" },
    { kind: "ai", label: "AI-assisted" },
  ];
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item.kind} className="label flex items-center gap-2 text-ink-faint">
          <Swatch kind={item.kind} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
