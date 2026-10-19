/**
 * Writes every word on the site to docs/site-copy.md, in page order, for the
 * founders to review in their own tools. Re-run after any copy change:
 *
 *   node --experimental-strip-types scripts/export-copy.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { caseStudies, workIntro } from "../src/content/caseStudies.ts";
import { outcomeIntro, outcomes } from "../src/content/outcomes.ts";
import { processIntro, processSteps } from "../src/content/process.ts";
import { engageIntro, productNote, products } from "../src/content/products.ts";
import { finalCta, hero, nav, site } from "../src/content/site.ts";
import { team, teamIntro } from "../src/content/team.ts";
import { why } from "../src/content/why.ts";

const out = [];
const h = (level, text) => out.push("", `${"#".repeat(level)} ${text}`, "");
const p = (text) => out.push(text, "");
const field = (name, value) => out.push(`**${name}:** ${value}`, "");
const list = (items) => { items.forEach((item) => out.push(`- ${item}`)); out.push(""); };

out.push(`# ${site.name}: website copy`, "", `_Generated from the site’s content files on ${new Date().toISOString().slice(0, 10)}. Edit the content files, not this document._`);

h(2, "Navigation");
field("Links", nav.map((n) => n.label).join(" · "));
field("Header button", finalCta.action.label);

h(2, "Hero");
field("Eyebrow", hero.eyebrow);
field("Headline", hero.headline.join(" "));
field("Supporting line", hero.supporting);
field("Buttons", `${hero.primaryCta.label} · ${hero.secondaryCta.label}`);
p("**Headline options under discussion:**");
list(hero.headlineAlternates.map((lines) => lines.join(" ")));

h(2, why.eyebrow);
field("Headline", why.headline.join(" "));
field("Lede", why.lede);
why.body.forEach(p);
p("**What nobody has time to work out:**");
list(why.questions);
field(why.gap.label, `${why.gap.headline} ${why.gap.body}`);
field("Closing line", why.closer);

h(2, outcomeIntro.eyebrow);
field("Headline", outcomeIntro.headline.join(" "));
field("Supporting line", outcomeIntro.supporting);
list(outcomes.map((o) => `**${o.title}:** ${o.description}`));
field("Guardrails", outcomeIntro.guardrails);

h(2, engageIntro.eyebrow);
field("Headline", engageIntro.headline);
field("Supporting line", engageIntro.supporting);
field("Chooser prompt", productNote.prompt);
for (const product of products) {
  h(3, `“${product.quote}” (${product.name})`);
  p(product.summary);
  list(product.includes);
}
field("Under the chooser", productNote.unsure);
h(3, processIntro.headline);
p(processIntro.supporting);
for (const step of processSteps) {
  p(`**${step.step} ${step.title}.** ${step.description}${step.keep ? ` _If you stop here, you leave with:_ ${step.keep}` : ""}`);
}

h(2, workIntro.eyebrow);
field("Headline", workIntro.headline);
field("Supporting line", workIntro.supporting);
for (const study of caseStudies) {
  h(3, `${study.headline} (${study.sector})`);
  field("Sign-off", study.status === "approved" ? "Approved" : "Draft, not yet signed off (shown on the preview only)");
  p(study.summary);
  field("Headline result", `${study.result.value} ${study.result.label}`);
  field("At a glance", Object.values(study.glance).join(" · "));
  p("**The situation**"); study.situation.forEach(p);
  if (study.quote) p(`> ${study.quote.text} (${study.quote.attribution})`);
  p("**The approach**"); study.approach.forEach(p);
  list(study.stageTable.map((s) => `**${s.stage}:** ${s.happened.replace(/\.$/, "")}. _Keeps:_ ${s.keeps}`));
  p(`**What it exposed: ${study.exposed.headline}**`); study.exposed.body.forEach(p);
  p("**Where we drew the line**");
  list([...study.line.system.map((l) => `System: ${l.item} (${l.note})`), ...study.line.person.map((l) => `Person: ${l.item} (${l.note})`)]);
  p("**Results**");
  list([...study.results.stats.map((s) => `${s.value}: ${s.label}`), ...study.results.outcomes]);
  field("How we measured this", study.results.evidence);
  field(`What transfers: ${study.insight.headline}`, study.insight.body);
}

h(2, teamIntro.eyebrow);
field("Headline", teamIntro.headline);
field("Supporting line", teamIntro.supporting);
for (const member of team) {
  h(3, `${member.name}, ${member.role}`);
  p(member.bio);
  field("Tags", member.expertise.join(" · "));
}

h(2, finalCta.eyebrow);
field("Headline", finalCta.headline);
field("Supporting line", finalCta.supporting);
field("Button", finalCta.action.label);

h(2, "Footer");
field("Positioning line", site.positioningLine);
field("Search description", site.description);

const file = path.resolve(import.meta.dirname, "../docs/site-copy.md");
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n");
console.log("wrote docs/site-copy.md");
