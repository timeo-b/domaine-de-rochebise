// ═══════════════════════════════════════════════════════════════════
// LE SITE EN UN FICHIER
//
// Le nom du domaine fictif n'est écrit qu'ici. Le changer ici le change
// partout : en-tête, textes, étiquettes, métadonnées.
// ═══════════════════════════════════════════════════════════════════

export const SITE = {
  nom: "Domaine de Rochebise",
  /** Forme courte, pour l'étiquette des bouteilles. */
  court: "Rochebise",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://domaine-de-rochebise.vercel.app",
  agence: { nom: "Nexura", url: "https://agence-nexura.fr" },
  /** Altitudes fictives, dans l'ordre de grandeur des coteaux du Rhône. */
  altitude: { bas: 121, haut: 334 },
} as const;

export type Langue = "fr" | "en";

/** Les adresses de chaque page, par langue. */
export const ROUTES = {
  fr: {
    accueil: "/",
    vins: "/vins",
    domaine: "/domaine",
    visites: "/visites",
    boutique: "/boutique",
    contact: "/contact",
    mentions: "/mentions-legales",
  },
  en: {
    accueil: "/en",
    vins: "/en/wines",
    domaine: "/en/estate",
    visites: "/en/visits",
    boutique: "/en/shop",
    contact: "/en/contact",
    mentions: "/en/legal-notice",
  },
} as const;

export type CleRoute = keyof (typeof ROUTES)["fr"];
