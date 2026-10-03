import { team, teamIntro } from "@/content/team";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// The three pieces of the supplied symbol (brand/the-agitators-symbol-primary-web.svg),
// kept whole on every plate: the symbol stands for distinct perspectives
// coming together, so each founder's plate brings one piece forward.
const SYMBOL_VIEWBOX = "-28.338235 -8 185.338235 137";
const symbolPieces = [
  { colour: "var(--color-purple)", d: "M49 5 Q51 1 56 1 H94 L59 58 Q58 61 54 62 L10 77 Q6 78 8 73 Z" },
  {
    colour: "var(--color-mint)",
    d: "M-18.789196 117.430861 L-5.922383 96.090782 Q-4.373343 93.521643 -1.533813 92.553621 L59.286192 71.819528 Q62.125723 70.851506 63.400444 73.567217 L83.920703 117.284289 Q85.195424 120.000000 82.195424 120.000000 L-17.338235 120.000000 Q-20.338235 120.000000 -18.789196 117.430861 Z",
  },
  { colour: "var(--color-aubergine)", d: "M72 66 Q69 60 72 54 L95 17 Q98 12 101 18 L149 120 H103 Q97 120 95 115 Z" },
];

/** Stand-in plate used until real headshots exist. Swap in `member.photo`. */
function PortraitPlaceholder({ index }: { index: number }) {
  const focus = index % symbolPieces.length;
  return (
    <div className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white">
      <svg
        className="absolute -right-[18%] -bottom-[6%] h-auto w-[118%]"
        viewBox={SYMBOL_VIEWBOX}
        aria-hidden="true"
      >
        {symbolPieces.map((piece, i) => (
          <path key={i} d={piece.d} fill={i === focus ? piece.colour : "var(--color-paper)"} />
        ))}
      </svg>
      <span className="label relative p-5 text-muted">Portrait pending</span>
    </div>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="section-pad scroll-mt-[var(--header-h)]">
      <div className="shell">
        <SectionHeading
          eyebrow={teamIntro.eyebrow}
          headline={teamIntro.headline}
          supporting={teamIntro.supporting}
          align="wide"
        />

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3 lg:mt-16">
          {team.map((member, index) => (
            <Reveal as="li" key={member.id} index={index} className="flex flex-col">
              {member.photo?.offset ? (
                <div className="relative aspect-[4/5] w-full">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 top-3.5 left-3.5 rounded-[var(--radius-card)]"
                    style={{ backgroundColor: `var(--color-${member.photo.offset})` }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo.src}
                    alt={member.photo.alt}
                    width={960}
                    height={1200}
                    className="absolute inset-0 right-3.5 bottom-3.5 h-[calc(100%-0.875rem)] w-[calc(100%-0.875rem)] rounded-[var(--radius-card)] object-cover"
                  />
                </div>
              ) : member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.photo.src}
                  alt={member.photo.alt}
                  width={960}
                  height={1200}
                  className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover"
                />
              ) : (
                <PortraitPlaceholder index={index} />
              )}

              <h3 className="display-s mt-6">{member.name}</h3>
              <p className="label mt-1.5 text-purple">{member.role}</p>
              <p className="body-copy mt-4 flex-1 text-base">{member.bio}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {member.expertise.map((item) => (
                  <li key={item} className="rounded-[var(--radius-control)] bg-white px-3 py-1.5 text-sm font-semibold text-muted">
                    {item}
                  </li>
                ))}
              </ul>

              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-link mt-6 w-fit text-base font-semibold text-purple"
                >
                  LinkedIn
                </a>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
