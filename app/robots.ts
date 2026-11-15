import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

// Le domaine est fictif : les robots sont priés de ne rien indexer. Les
// pages portent aussi `noindex` (balise et en-tête HTTP), ce qui est la
// vraie barrière. `DEMO_INDEXABLE=1` ne sert qu'aux mesures locales.
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.DEMO_INDEXABLE === "1";
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
