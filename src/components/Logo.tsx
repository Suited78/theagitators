import { site } from "@/content/site";

type LogoProps = {
  /**
   * Choose for the surface (guidelines p.5): primary on paper or white,
   * reversed on aubergine, mono-aubergine on mint, mono-white on dark.
   */
  variant?: "primary" | "reversed" | "mono-aubergine" | "mono-white";
  className?: string;
};

/**
 * The supplied master artwork (logo exports v1.1), used as-is: the
 * guidelines forbid redrawing, recolouring or rebuilding it in live type.
 * Minimum width for the full horizontal lockup is 180px.
 */
export function Logo({ variant = "primary", className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/the-agitators-${variant}-web.svg`}
      alt={site.name}
      width={627}
      height={137}
      className={`block h-auto ${className}`}
      draggable={false}
    />
  );
}
