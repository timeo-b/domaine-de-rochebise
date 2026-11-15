import { cuvees, type CuveeComplete } from "@/content/pages";
import { EN } from "@/content/en";
import { FR } from "@/content/fr";
import { SITE, chemin, type Langue } from "@/content/site";

// ═══════════════════════════════════════════════════════════════════
// Données structurées (schema.org), comme sur un vrai site de domaine :
// l'établissement sur l'accueil, le produit et son offre sur chaque
// fiche. Chaque bloc dit en toutes lettres que tout est fictif, et le
// site entier est exclu des moteurs de recherche (noindex).
// ═══════════════════════════════════════════════════════════════════

const FICTIF = { fr: "Domaine fictif : exemple de site réalisé par l'agence Nexura.", en: "Fictional estate: sample website made by the Nexura agency." };

function Bloc({ donnees }: { donnees: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }} />;
}

export function DonneesDomaine({ langue }: { langue: Langue }) {
  const t = (langue === "en" ? EN : FR).accueil.meta;
  return (
    <Bloc
      donnees={{
        "@context": "https://schema.org",
        "@type": "Winery",
        "@id": `${SITE.url}/#domaine`,
        name: SITE.nom,
        description: t.description,
        disambiguatingDescription: FICTIF[langue],
        url: SITE.url + chemin(langue, "accueil"),
        inLanguage: langue,
        address: { "@type": "PostalAddress", addressRegion: "Ardèche", addressCountry: "FR" },
        makesOffer: cuvees(langue).map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: c.nom, url: SITE.url + chemin(langue, "vins", c.slug) } })),
      }}
    />
  );
}

export function DonneesVin({ langue, cuvee }: { langue: Langue; cuvee: CuveeComplete }) {
  return (
    <Bloc
      donnees={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: cuvee.nom,
        description: `${cuvee.recit} ${FICTIF[langue]}`,
        category: `${cuvee.couleur}, ${cuvee.cepage}`,
        brand: { "@type": "Brand", name: SITE.nom, disambiguatingDescription: FICTIF[langue] },
        url: SITE.url + chemin(langue, "vins", cuvee.slug),
        offers: {
          "@type": "Offer",
          price: cuvee.prix.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/Discontinued",
          description: FICTIF[langue],
          seller: { "@id": `${SITE.url}/#domaine` },
        },
      }}
    />
  );
}
