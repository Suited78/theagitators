# The Agitators — concept website

A single-page concept site for a prospective consultancy, built as both a design
prototype and a strategic conversation artefact. It is deliberately opinionated:
the point is to have something specific enough to argue with.

**Nothing on this site is final.** Copy, case studies, team members and even the
positioning are placeholders written to test the format.

---

## Running it locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

---

## Where to change things

All copy lives in `src/content/` as typed data, separate from the components, so
messaging can be rewritten without touching layout. Types are in
`src/content/types.ts`.

| File | Controls |
| --- | --- |
| `site.ts` | Brand name and wordmark split, nav items, hero headline (plus alternates), final CTA, email |
| `why.ts` | The opening argument and the list of unanswered questions |
| `audiences.ts` | Who we help — add, remove or rename sectors freely |
| `outcomes.ts` | "What changes" index |
| `capabilities.ts` | The six capability areas |
| `process.ts` | The five-step way of working |
| `caseStudies.ts` | Case studies (homepage cards and `/work/[slug]` pages) and the held third slot |
| `team.ts` | The three founders |
| `manifesto.ts` | Point-of-view statements |

Some specifics worth knowing:

- **Hero headline.** `hero.headline` is an array — one entry per rendered line.
  Three alternates are parked in `hero.headlineAlternates`; swap one in to try it.
- **Navigation.** `nav` in `site.ts` drives the header, the mobile menu, the
  footer and the scroll-spy. Each `id` must match a section `id` in
  `src/app/page.tsx`.
- **Capabilities and audiences** are plain arrays. Adding a seventh capability or
  a fourth audience needs no layout changes.
- **Case studies** share one format, whatever the source material looks like:
  sector, outcome-led headline, one-line summary and a single headline
  result for the homepage card; then at a glance, the situation (with an
  optional quote), the approach with a Discover / Design / Deliver / What's
  next table, what the work exposed, where the line sits between the system
  and a person, results (stats are optional, an evidence note is not) and
  what transfers. Each gets a static page at `/work/[slug]`. Until a third
  study is cleared, `workPlaceholder` holds the slot.
- **Team members** support `photo`, `linkedin` and `expertise`. Without a photo
  they render a numbered "portrait pending" plate.

Section order is the argument the page makes, and lives in `src/app/page.tsx`.

---

## Design system

Implements **The Agitators Brand Guidelines v1.1** (29 September 2026).
Tokens are defined once in `src/app/globals.css`, under `@theme` (Tailwind v4).
The pre-brand editorial design is preserved on the `design/editorial-v1` branch.

- **Name.** "The Agitators", standard title case. Never "AGI" in capitals and
  never a recoloured "Agi": the only nod to AGI is the three-part underline
  built into the logo.
- **Logo.** The supplied master artwork in `public/brand/`, used untouched via
  `Logo.tsx`: primary on paper (header), reversed on aubergine (footer). The
  full horizontal lockup is kept at or above its 180px minimum. Favicons in
  `src/app/` come from the same export pack.
- **Colour.** Aubergine `#2D163B` (text, structure, dark sections), purple
  `#7B319B` (buttons, emphasis), mint `#BEE8CC` (fills, signals on dark), paper
  `#FAF8F3` (canvas), muted `#625469` (secondary text). White is a utility
  surface. `#D9D0DE` is used only for decorative dividers. Aubergine sections
  (`aubergine-panel`) are punctuation; mint appears as one section
  (`mint-panel`) and one callout.
- **Type.** Manrope only, self-hosted through `next/font`. 800 for headlines
  (display tops out at 80px), 700 for labels, 400 for 18px body text.
- **Layout.** 1200px container, 20–64px gutters, 56–112px section spacing,
  6px corners on controls and 12px on cards, rules rather than shadows.
- **Motif.** The three-part bar (`Motif.tsx`) marks section labels and card
  tops. On the team section, each placeholder portrait brings one piece of
  the supplied symbol forward: three perspectives, three founders.
- **Controls.** `btn` plus `btn-primary` (white on purple, hover aubergine),
  `btn-secondary` (outlined aubergine) or `btn-on-dark` (aubergine on mint,
  hover paper). All at least 48px tall. Inline links stay underlined
  (`text-link`).
- **Scale.** `display-xl` / `display-l` / `display-m` / `display-s`, `lede`,
  `body-copy` and `label` are custom utilities. Every size is fluid, so changing
  a clamp changes the whole site.

## The agitation field

The page's one visual device (`src/components/AgitationField.tsx`): stacked
ridgelines, drawn to a canvas, that the visitor stirs as the pointer
passes through, then settle. It's the brand name made literal, and it's
there for atmosphere rather than explanation. The `variant` prop sets how
it's drawn; the motion is the same in all three:

- **Hero** (`hills`): fewer, heavier lines with rounded peaks, moving
  slowly. Restless on its own, stirred by the pointer (or a tap).
- **How we work** (`crowd`): the same hills drawn as rows of dots, a few in
  purple and mint: a team rather than a signal. Pinned beside the steps (a
  band above them on small screens), going from turbulent to one
  coordinated swell as you scroll.
- **Contact** (`classic`): the original fine hairlines with sharp ridges, as
  a full-width band on the dark panel to close the page.

Each ridge is filled with the section's background colour, so nearer lines
hide the ones behind them; that is what gives the field its depth, and why
the `background` prop must match the section it sits in. Colours come from
the brand tokens: aubergine lines with a purple accent on light sections,
paper lines with a mint accent on aubergine. The shapes are
seeded, so the landscape is the same on every visit. Amplitude, stir
strength and line spacing are the numbers to adjust in the component.

## Accessibility and motion

- Semantic landmarks, a skip link, and a visible focus ring throughout.
- Case studies are real `<button>` elements with `aria-expanded` /
  `aria-controls`; the mobile menu traps scroll, closes on `Escape` and returns
  focus to its trigger.
- `prefers-reduced-motion` is respected by every animated component — reveals
  render statically, the accordion opens instantly, and the agitation field is
  drawn once as a still image that ignores the pointer.
- Audited with axe-core at desktop and mobile widths, with
  every case study expanded and every section scrolled into view: zero
  violations. Every button measures at least 48px tall. De-emphasis is done
  with colour rather than opacity, so dimmed text still meets contrast
  minimums.

---

## Holding page

`holding/` is a standalone, single-file holding page for the live domain
while the full site is still in review: plain HTML and CSS, no build step,
Manrope self-hosted, logo and favicons from the brand export pack. It is
deployed as its **own Vercel project**, so the domain can never show the
unfinished concept site by accident.

1. In Vercel: **Add New → Project**, import this repository again.
2. Set **Root Directory** to `holding` and **Framework Preset** to *Other*.
   Leave the build and output settings empty.
3. Deploy, then add your domain under **Settings → Domains** and follow the
   DNS instructions Vercel shows.

To launch the full site later, remove the domain from the holding project and
add it to the main project. Moving it back is equally quick.

The contact address appears twice in `holding/index.html`, in the two
`mailto:` links.

## Deploying to Vercel

The project is zero-config for Vercel — no `vercel.json` is needed. From the
repository root:

```bash
npm i -g vercel
vercel login
vercel link          # create or link the project
vercel               # deploy a preview build
vercel --prod        # promote to production
```

Or from the dashboard: **Add New → Project → import this repository**. Vercel
detects Next.js and needs no build settings. Framework preset `Next.js`, build
command `next build`, install command `npm install`, output handled
automatically.

There are no environment variables and no external services — the contact CTA is
a `mailto:` link built from `site.email` in `src/content/site.ts`.

Note that `metadata.robots` in `src/app/layout.tsx` is set to `noindex` while
this is a concept site. Remove it before any real launch.

---

## Known scope of this build

- One main page, plus a static page per case study under `/work/`.
- No CMS. Content is TypeScript modules.
- No real imagery. The agitation field is drawn in code, so nothing needs
  licensing or art direction yet.
- The LinkedIn links are placeholders. Case study clients are de-identified;
  the travel and tourism study is pending partner sign-off.
