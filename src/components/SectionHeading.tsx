import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  headline: ReactNode;
  supporting?: string;
  /** Constrains the headline measure; sections vary. */
  className?: string;
  align?: "left" | "wide";
};

export function SectionHeading({
  eyebrow,
  headline,
  supporting,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <p className="label flex items-center gap-3 text-ink-faint">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal index={1}>
        <h2 className={`display-l mt-6 text-balance ${align === "left" ? "max-w-[18ch]" : "max-w-[26ch]"}`}>
          {headline}
        </h2>
      </Reveal>
      {supporting ? (
        <Reveal index={2}>
          <p className="lede mt-7 max-w-[52ch]">{supporting}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
