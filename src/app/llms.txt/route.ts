import { caseStudies } from "@/content/published";
import { guideIntro } from "@/content/fieldGuide";
import { outcomes } from "@/content/outcomes";
import { products } from "@/content/products";
import { hero, site } from "@/content/site";
import { team } from "@/content/team";

export const dynamic = "force-static";

/** A plain-text summary for AI assistants (llmstxt.org), built from the site content. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.positioningLine}`,
    "",
    hero.supporting,
    "",
    "## What we do",
    "Three products. Each starts with advice and can go further: proven on the client's own work, then taken across the business.",
    ...products.map((p) => `- ${p.name} ("${p.quote}"): ${p.summary}`),
    "",
    "## Outcomes",
    ...outcomes.map((o) => `- ${o.title}: ${o.description}`),
    "",
    "## Case studies",
    ...caseStudies.map((s) => `- [${s.headline}](${site.url}/work/${s.slug}): ${s.summary}`),
    "",
    "## Guides",
    `- [${guideIntro.title}](${site.url}/field-guide): ${guideIntro.subtitle}`,
    "",
    "## Founders",
    ...team.map((m) => `- ${m.name}, ${m.role}${m.linkedin && /linkedin\.com\/in\//.test(m.linkedin) ? ` (${m.linkedin})` : ""}`),
    "",
    "## Contact",
    `- Email: ${site.email}`,
    `- Website: ${site.url}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
