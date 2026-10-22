import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  headline: ReactNode;
  supporting?: string;
  /** A bold line between the headline and the supporting paragraph. */
  lead?: string;
  /** Constrains the headline measure; sections vary. */
  className?: string;
  align?: "left" | "wide";
};

export function SectionHeading({
  eyebrow,
  headline,
  supporting,
  lead,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal index={1}>
        <h2 className={`display-l mt-5 text-balance ${align === "left" ? "max-w-[18ch]" : "max-w-[26ch]"}`}>
          {headline}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal index={2}>
          <p className="lede mt-6 max-w-[52ch] font-bold text-aubergine">{lead}</p>
        </Reveal>
      ) : null}
      {supporting ? (
        <Reveal index={2}>
          <p className={`lede max-w-[52ch] ${lead ? "mt-3" : "mt-6"}`}>{supporting}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
