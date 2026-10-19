import { caseStudies } from "@/content/published";
import { site } from "@/content/site";
import { team } from "@/content/team";
import type { CaseStudy } from "@/content/types";

/** Only real profile URLs, not the bare-domain placeholders. */
const realProfile = (url?: string) => (url && /linkedin\.com\/(in|company)\/.+/.test(url) ? [url] : undefined);

const organisationId = `${site.url}/#organization`;

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organisationId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.png`,
    email: site.email,
    description: site.positioningLine,
    areaServed: "AU",
    sameAs: realProfile(site.linkedin),
    founder: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      image: member.photo ? `${site.url}${member.photo.src}` : undefined,
      sameAs: realProfile(member.linkedin),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@id": organisationId },
    hasPart: caseStudies.map((study) => ({ "@type": "Article", url: `${site.url}/work/${study.slug}` })),
  };
}

export function caseStudySchema(study: CaseStudy) {
  const url = `${site.url}/work/${study.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: study.headline,
    description: study.summary,
    url,
    image: `${site.url}/og/${study.slug}.png`,
    about: study.sector,
    author: { "@id": organisationId, "@type": "Organization", name: site.name },
    publisher: { "@id": organisationId, "@type": "Organization", name: site.name },
    isPartOf: { "@type": "WebSite", url: site.url },
  };
}
