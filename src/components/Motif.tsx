type MotifProps = {
  /**
   * On aubergine the first bar turns paper, matching the reversed logo.
   * On mint the mint bar would vanish, so it turns white.
   */
  tone?: "light" | "dark" | "mint";
  size?: "sm" | "lg";
  className?: string;
};

/**
 * The three-part motif: three distinct perspectives, side by side. Used
 * sparingly — above a heading or as a short divider, never as decoration
 * on every element.
 */
export function Motif({ tone = "light", size = "sm", className = "" }: MotifProps) {
  const bar = size === "lg" ? "h-2 w-[4.5rem]" : "h-1.5 w-7";
  return (
    <span aria-hidden="true" className={`flex shrink-0 ${size === "lg" ? "gap-1.5" : "gap-1"} ${className}`}>
      <span className={`${bar} ${tone === "dark" ? "bg-paper" : "bg-aubergine"}`} />
      <span className={`${bar} bg-purple`} />
      <span className={`${bar} ${tone === "mint" ? "bg-white" : "bg-mint"}`} />
    </span>
  );
}
