import { site } from "@/content/site";

type WordmarkProps = {
  className?: string;
  /** Reveals the AGI on hover of the nearest `.group` ancestor. */
  interactive?: boolean;
};

/**
 * The brand device: "AGI" sits inside "AGItators" at a slightly heavier weight
 * and, on hover, picks up the accent. Discoverable, not explained.
 */
export function Wordmark({ className = "", interactive = true }: WordmarkProps) {
  const { before, agi, after } = site.wordmark;
  return (
    <span className={`inline-block tracking-[-0.02em] ${className}`}>
      <span className="font-normal">{before}</span>
      <span
        className={[
          "font-semibold",
          interactive
            ? "transition-colors duration-500 [transition-timing-function:var(--ease-out-quint)] group-hover:text-accent"
            : "",
        ].join(" ")}
      >
        {agi}
      </span>
      <span className="font-normal">{after}</span>
    </span>
  );
}
