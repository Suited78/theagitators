# The Agitators — concept website

A single-page concept site for a prospective transformation agency, built as both a design
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
| `products.ts` | "How we engage": the section intro, the three products (led by the client's own words) and the guardrails line |
| `process.ts` | "How we engage": the route every engagement follows, from first conversation to ongoing support |
| `caseStudies.ts` | Case studies (homepage cards and `/work/[slug]` pages) |
| `team.ts` | The three founders |

Some specifics worth knowing:

- **Hero headline.** `hero.headline` is an array, one entry per rendered line.
  The hero makes the promise; The change (`why.ts`) makes the case.
- **Navigation.** `nav` in `site.ts` drives the header, the mobile menu, the
  footer and the scroll-spy. Each `id` must match a section `id` in
  `src/app/page.tsx`.
- **Products and audiences** are plain arrays. Adding a product or an audience
  needs no layout changes.
- **Case studies** share one format, whatever the source material looks like:
  sector, outcome-led headline, one-line summary and a single headline
  result for the homepage card; then at a glance, the situation (with an
  optional quote), the approach with a Discover / Design / Deliver / What's
  next table, what the work exposed, where the line sits between the system
  and a person, results (stats are optional, an evidence note is not) and
  what transfers. Each gets a static page at `/work/[slug]`.
- **Case study sign-off.** Each study has a `status`, `"draft"` or
  `"approved"`. The site reads studies through `src/content/published.ts`:
  while `prelaunch` is true it shows them all, so drafts can be reviewed on
  the preview; once the site launches, only approved studies appear (on the
  homepage, their pages, the sitemap and llms.txt).
- **Team members** support `photo`, `linkedin` and `expertise`. Without a photo
  they render a numbered "portrait pending" plate.

Section order is the argument the page makes, and lives in `src/app/page.tsx`:
the change, how we engage, work, team, contact. (Two kinds of AI was
removed in the 21 October review; it lives in git history if it returns.)

**Copy for review.** `docs/site-copy.md` holds every word on the site in page
order, generated from the content files. Regenerate it after any copy change
with `node --experimental-strip-types scripts/export-copy.mjs`, and share that
file (or a Google Doc made from it) for review instead of a hand-kept copy.

**Earlier versions.** The site as it stood before the V2 restructure (October
2026, with separate Who, What and How sections and the point-of-view list) is
preserved on the `archive/v1` branch. Cloudflare Pages builds a preview of it
at `archive-v1.theagitators.pages.dev` if branch previews are enabled.

---

## Design system

Implements **The Agitators Brand Guidelines v1.1** (29 September 2026).
Tokens are defined once in `src/app/globals.css`, under `@theme` (Tailwind v4).
The pre-brand editorial design is preserved on the `design/editorial-v1` branch.

- **Name.** "The Agitators", standard title case. Never "AGI" in capitals and
  never a recoloured "Agi": the only nod to AGI is the three-part underline
  built into the logo.
- **Logo.** The supplied master artwork in `public/brand/` (logo pack v1.2,
  with the enlarged wordmark), used untouched via `Logo.tsx`: primary on
  paper (header), reversed on aubergine (footer). The full horizontal lockup
  is kept above its 180px minimum, sized so the symbol matches its earlier
  height. Favicons in `src/app/` come from the same export pack. The holding
  page has its own copy in `holding/logo.svg`.
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
it's drawn; the motion is the same in both:

- **Hero** (`hills`): fewer, heavier lines with rounded peaks, moving
  slowly. Restless on its own, stirred by the pointer (or a tap).
- **Contact** (`classic`): the original fine hairlines with sharp ridges, as
  a full-width band on the dark panel to close the page.

Each ridge is filled with the section's background colour, so nearer lines
hide the ones behind them; that is what gives the field its depth, and why
the `background` prop must match the section it sits in. Colours come from
the brand tokens: aubergine lines with a purple accent on light sections,
paper lines with a mint accent on aubergine. The shapes are
seeded, so the landscape is the same on every visit. Amplitude, stir
strength and line spacing are the numbers to adjust in the component.

## How we engage

One section (`EngageSection.tsx`) in place of the old Who, What and How:

- **The chooser** (`ProductChooser.tsx`) asks "Which sounds most like you?":
  three of the client's own sentences, each opening its product beneath it.
  All three panels are in the page from the start, so search engines and AI
  tools read them even when collapsed.
- **The route** (`ProcessRoute.tsx`, `RouteMap.tsx`) pins a route map beside
  the five stages: every product starts at the same conversation, passes the
  same stops and ends with ongoing support. The stage being read lights up as
  you scroll, and each stage says what you leave with if you stop there. All
  three routes advance together: product-specific stops can be added once the
  contents of each core and pack are settled.

## Top tips

`/tips` (`src/content/tips.ts`, `src/components/tips/`) is Top tips on
Getting Ahead with AI: short tips, each with a prompt to copy and a
topic to filter by. It's linked from the footer, not the top nav, and is in
the sitemap and llms.txt. Earlier addresses (`/tips-and-tricks`,
`/field-guide`, `/ai-field-guide`) redirect to it (`public/_redirects`).

- Prompts mark the parts to fill in with [square brackets]; the page shows
  them highlighted.
- Tool settings and features (tips 05, 12, 13) were checked on the date in
  `checkedOn`. Recheck them before each event, and monthly.
- A print QR code for the page is in `public/qr/`.

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

## Deploying to Cloudflare Pages

The site is a static export (`output: "export"` in `next.config.ts`): `npm run
build` writes the finished site to `out/`, and `npm start` serves that folder
locally. Production runs on Cloudflare Pages, which serves static sites on its
free plan.

1. Cloudflare dashboard: **Workers & Pages → Create application → Pages →
   Import an existing Git repository**, and choose this repository.
2. Framework preset **Next.js (Static HTML Export)**: build command
   `npx next build`, build output directory `out`. Set the production branch
   to the branch you launch from.
3. Under **Settings → Variables**, add `NODE_VERSION` = `22` (matches
   `.nvmrc`).
4. Deploy. Every push rebuilds; other branches get their own preview URLs.
5. On launch day, add `theagitators.com.au` under **Custom domains**. The DNS
   is already on Cloudflare, so it creates the record itself; delete the old
   Vercel records. Add a redirect rule sending `www.theagitators.com.au` to
   `https://theagitators.com.au`. Leave the email (MX, SPF, DKIM, DMARC)
   records alone.

Security and caching headers live in `public/_headers`. There are no
environment variables, server functions or external services: the contact CTA
is a `mailto:` link built from `site.email` in `src/content/site.ts`. The same
`out/` folder would deploy unchanged to any other static host, Vercel included.

## Launch switch, search and AI visibility

- **`prelaunch`** in `src/content/site.ts` is the launch switch, now `false`.
  Set it back to `true` to put noindex on every page, show the prelaunch
  notice in the footer and show draft case studies (`status: "draft"`) again.
- **pages.dev stays out of search.** `public/_headers` sends
  `X-Robots-Tag: noindex` on theagitators.pages.dev and every preview
  deployment, so only theagitators.com.au is indexed.
- **Cutover checklist** (October 2026):
  - [x] Case studies approved; tagline set to "Practical AI for businesses"
    (the share image pairs it with the hero headline); `prelaunch` off.
  - [ ] Cloudflare Pages: production branch is the launch branch and its
    latest deployment succeeded.
  - [ ] Cloudflare DNS: note the apex and `www` records that point at Vercel
    (for rollback), then delete them. Leave MX, SPF, DKIM, DMARC and the
    google-site-verification TXT record alone.
  - [ ] Cloudflare Pages → Custom domains: add `theagitators.com.au` and
    `www.theagitators.com.au`.
  - [ ] Cloudflare → Rules → Redirect Rules: `www.theagitators.com.au` →
    `https://theagitators.com.au`, 301, path and query kept.
  - [ ] Vercel: remove the domain from the holding project (keep the project
    for rollback).
  - [ ] Check: the domain serves the site, `www` and `http` redirect, /tips and
    the tips QR code work, a test email reaches info@.
  - [ ] Afterwards: submit `/sitemap.xml` in Google Search Console; point the
    LinkedIn company page at the domain and set its tagline to match.
  - Rollback: remove the custom domains from Pages, restore the noted DNS
    records, and add the domain back to the Vercel holding project.
- **Metadata.** Each page has a canonical URL, title, description and a
  1200×630 share image from `public/og/`. Regenerate the images after changing
  a case study headline or adding one:
  `npx -y -p playwright@1 node --experimental-strip-types scripts/generate-og-images.mjs`
- **Structured data** (`src/lib/structuredData.ts`): Organization with the
  founders on every page, WebSite on the home page, Article on each case study.
  LinkedIn URLs are only included once they're real profile or company links.
- **`/sitemap.xml`, `/robots.txt` and `/llms.txt`** are generated from the
  content at build time. robots.txt admits all crawlers, AI answer engines
  included.
- **`/privacy`** is a plain-language statement. Update it if analytics, forms
  or cookies are ever added.

---

## Known scope of this build

- One main page, a static page per case study under `/work/`, a privacy page and a branded 404.
- No CMS. Content is TypeScript modules.
- No real imagery. The agitation field is drawn in code, so nothing needs
  licensing or art direction yet.
- The LinkedIn links are placeholders. Case study clients are de-identified;
  all three studies are drafts pending sign-off, and the television quote needs client approval.
