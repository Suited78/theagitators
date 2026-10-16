import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { AgitationField } from "./AgitationField";
import { Eyebrow } from "./Eyebrow";

/**
 * The entrance runs on CSS, not JavaScript, so the hero text paints with the
 * first frame instead of waiting for hydration. Reduced motion is handled
 * globally in globals.css.
 */
const delay = (seconds: number) => ({ "--hero-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="flex flex-col pt-[var(--header-h)]">
      {/* Headline sits on its own full-width band so the lines stay unbroken. */}
      <div className="shell pt-14 pb-8 lg:pt-20 lg:pb-10">
        <div className="hero-fade" style={delay(0.05)}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>

        {/* Masks extend past the baseline so descenders survive the reveal. */}
        <h1 className="display-xl mt-6 lg:mt-8">
          {hero.headline.map((text, index) => (
            <span key={text} className="block overflow-hidden pb-[0.18em] -mb-[0.14em]">
              <span className="hero-line block" style={delay(0.15 + index * 0.12)}>
                {text}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Supporting statement and CTAs left; the field bleeds off the right edge,
          sized to the text beside it so neither leaves a gap. */}
      <div className="shell grid grid-cols-1 items-center gap-x-10 gap-y-8 pb-10 lg:grid-cols-12 lg:pb-16">
        <div className="hero-rise lg:col-span-5" style={delay(0.4)}>
          <p className="lede max-w-[44ch] text-aubergine">{hero.supporting}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="relative -mx-[var(--gutter)] h-[clamp(200px,32vh,300px)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:col-span-7 lg:col-start-6 lg:ml-0 lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]">
          <AgitationField variant="hills" interactive className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  );
}
