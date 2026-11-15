import type { Metadata } from "next";
import { LANGUES, SITE, chemin, type ClePage, type Langue } from "@/content/site";

// Les métadonnées d'une page : titre, description, adresse de référence et
// liens vers les autres langues (hreflang), aperçu pour les réseaux sociaux.
export function meta(langue: Langue, cle: ClePage, t: { titre: string; description: string }, slug?: string): Metadata {
  const adresse = chemin(langue, cle, slug);
  return {
    title: cle === "accueil" ? { absolute: t.titre } : t.titre,
    description: t.description,
    alternates: {
      canonical: adresse,
      languages: { ...Object.fromEntries(LANGUES.map((l) => [l, chemin(l, cle, slug)])), "x-default": chemin("fr", cle, slug) },
    },
    openGraph: {
      type: "website",
      siteName: SITE.nom,
      title: t.titre,
      description: t.description,
      url: adresse,
      locale: langue === "en" ? "en_GB" : "fr_FR",
    },
    twitter: { card: "summary_large_image", title: t.titre, description: t.description },
  };
}
