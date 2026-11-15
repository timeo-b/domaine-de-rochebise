import type { MetadataRoute } from "next";
import { cuvees } from "@/content/pages";
import { LANGUES, ROUTES, SITE, chemin, type ClePage } from "@/content/site";

// Le plan du site, avec les deux langues reliées entre elles. Il existe
// pour montrer une structure complète : le site, lui, reste en noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { cle: ClePage; slug?: string }[] = [
    ...(Object.keys(ROUTES.fr) as ClePage[]).map((cle) => ({ cle })),
    ...cuvees("fr").map((c) => ({ cle: "vins" as ClePage, slug: c.slug })),
  ];
  return pages.flatMap(({ cle, slug }) =>
    LANGUES.map((langue) => ({
      url: SITE.url + chemin(langue, cle, slug),
      alternates: { languages: Object.fromEntries(LANGUES.map((l) => [l, SITE.url + chemin(l, cle, slug)])) },
    })),
  );
}
