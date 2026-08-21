import { team, teamIntro } from "@/content/team";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Stand-in plate used until real headshots exist. Swap in `member.photo`. */
function PortraitPlaceholder({ index }: { index: number }) {
  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden border border-[var(--rule)] bg-bone-deep">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 250"
        aria-hidden="true"
        fill="none"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 8 }, (_, row) => (
          <line
            key={row}
            x1="0"
            y1={26 + row * 30}
            x2="200"
            y2={26 + row * 30 - 10 - index * 8}
            stroke="var(--color-ink)"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}
        <circle cx={132 - index * 34} cy={104 + index * 20} r="4" fill="var(--color-accent)" />
        <circle
          cx={132 - index * 34}
          cy={104 + index * 20}
          r="14"
          stroke="var(--color-accent)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </svg>

      <span className="label relative p-5 text-ink-faint">Portrait pending</span>
      <span
        aria-hidden="true"
        className="relative p-5 font-[family-name:var(--font-display)] text-[clamp(4rem,8vw,6rem)] leading-[0.75] tabular-nums text-ink/12"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
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

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal as="li" key={member.id} index={index} className="flex flex-col">
              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.photo.src}
                  alt={member.photo.alt}
                  className="aspect-[4/5] w-full border border-[var(--rule)] object-cover"
                />
              ) : (
                <PortraitPlaceholder index={index} />
              )}

              <h3 className="display-s mt-6">{member.name}</h3>
              <p className="label mt-2 text-accent">{member.role}</p>
              <p className="body-copy mt-4 flex-1 text-sm">{member.bio}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {member.expertise.map((item) => (
                  <li key={item} className="rounded-full bg-bone-deep px-2.5 py-1 text-xs text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>

              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label group mt-6 inline-flex w-fit items-center gap-2 text-ink-soft transition-colors duration-400 hover:text-ink"
                >
                  LinkedIn
                  <span
                    aria-hidden="true"
                    className="block h-px w-5 bg-current transition-all duration-500 [transition-timing-function:var(--ease-out-quint)] group-hover:w-8"
                  />
                </a>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
