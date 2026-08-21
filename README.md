# The AGItators — concept website

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
| `process.ts` | The five-step way of working, and the state each step maps to in the signature visual |
| `caseStudies.ts` | Case studies, including the standing "illustrative" notice |
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
- **Case studies** support `image` (swaps out the generated glyph), `metric`,
  `tags` and a multi-paragraph `detail`. Set `illustrative: false` once an entry
  describes real, cleared work — that removes the "Illustrative" chip. The
  standing notice above the list is `workIntro.notice`.
- **Team members** support `photo`, `linkedin` and `expertise`. Without a photo
  they render a numbered "portrait pending" plate.

Section order is the argument the page makes, and lives in `src/app/page.tsx`.

---

## Design system

Tokens are defined once in `src/app/globals.css`, under `@theme` (Tailwind v4).

- **Palette.** Warm bone paper (`--color-bone`), near-black ink, a single
  vermilion accent (`--color-accent`), and a brighter accent for inverted
  sections. Dark sections use the `ink-panel` utility, which also flips the
  hairline colour.
- **Type.** Fraunces for editorial display, Inter for text, IBM Plex Mono for
  labels and figure captions. Loaded through `next/font`, so they are
  self-hosted at build time with no layout shift.
- **Scale.** `display-xl` / `display-l` / `display-m` / `display-s`, `lede`,
  `body-copy` and `label` are custom utilities. Every size is fluid, so changing
  a clamp changes the whole site.

## The signature visual

`src/components/SystemVisual.tsx` renders a canvas of 44 nodes that reorganise
through five states as you scroll:

**Complexity → Understanding → Redesign → Capability → Momentum**

The geometry for each state lives in `src/lib/system.ts` — each state supplies a
position for the same node index, so the system appears to reorganise rather
than redraw, and the edge sets crossfade while the nodes glide. It appears twice:
faintly in the hero (which only travels a fraction into the second state), and in
the "How we work" section, where it is pinned and driven by the active step. The
`Fig. 0N` caption names the state.

The same scroll handler drives both the motif and the step highlighting, so they
cannot disagree. Under `prefers-reduced-motion` the ambient drift stops and the
motif snaps to the scroll position rather than easing toward it.

## Accessibility and motion

- Semantic landmarks, a skip link, and a visible focus ring throughout.
- Case studies are real `<button>` elements with `aria-expanded` /
  `aria-controls`; the mobile menu traps scroll, closes on `Escape` and returns
  focus to its trigger.
- `prefers-reduced-motion` is respected by every animated component — reveals
  render statically, the accordion opens instantly, and the canvas stops drifting.
- Audited with axe-core at desktop and mobile widths, with every case study
  expanded: zero violations.

---

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

- One page, no routes. Case studies expand in place rather than on their own pages.
- No CMS. Content is TypeScript modules.
- No real imagery. Visuals are generated SVG and canvas so nothing needs
  licensing or art direction yet.
- The email address, LinkedIn links and every case study are placeholders.
