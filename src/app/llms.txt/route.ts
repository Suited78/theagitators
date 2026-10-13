import { caseStudies } from "@/content/caseStudies";
import { capabilities } from "@/content/capabilities";
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
    ...capabilities.map((c) => `- ${c.title}: ${c.summary}`),
    "",
    "## Case studies",
    ...caseStudies.map((s) => `- [${s.headline}](${site.url}/work/${s.slug}): ${s.summary}`),
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
