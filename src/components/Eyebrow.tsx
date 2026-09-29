import type { ReactNode } from "react";
import { Motif } from "./Motif";

type EyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark" | "mint";
  className?: string;
};

// Purple on paper is 7.18:1; mint on aubergine 12.10:1; aubergine on mint 12.10:1.
const text = { light: "text-purple", dark: "text-mint", mint: "text-aubergine" } as const;

export function Eyebrow({ children, tone = "light", className = "" }: EyebrowProps) {
  return (
    <p className={`label flex items-center gap-4 ${text[tone]} ${className}`}>
      <Motif tone={tone} />
      {children}
    </p>
  );
}
