import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/**
 * Everything is open to crawlers, AI answer engines included (GPTBot,
 * ClaudeBot, PerplexityBot): being quoted in AI answers is part of being
 * found. While `prelaunch` is true, pages still carry a noindex tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
