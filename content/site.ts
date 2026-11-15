// ═══════════════════════════════════════════════════════════════════
// LE SITE EN UN FICHIER
//
// Le nom du domaine fictif n'est écrit qu'ici. Le changer ici le change
// partout : en-tête, textes, étiquettes, métadonnées.
// ═══════════════════════════════════════════════════════════════════

export const SITE = {
  nom: "Domaine de Costeroche",
  /** Forme courte, pour l'étiquette des bouteilles. */
  court: "Costeroche",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://domaine-de-costeroche.vercel.app",
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

/** Langues prévues. Le néerlandais a sa place réservée : il suffira d'ajouter
 *  ses routes ci-dessus, ses textes dans content/, et un gabarit app/(nl)/nl. */
export const LANGUES: readonly Langue[] = ["fr", "en"];
export const LANGUES_A_VENIR = ["nl"] as const;

export type ClePage = keyof (typeof ROUTES)["fr"];

/** Le chemin d'une page dans une langue, avec la fiche d'un vin le cas échéant. */
export const chemin = (langue: Langue, cle: ClePage, slug?: string) => (slug ? `${ROUTES[langue][cle]}/${slug}` : ROUTES[langue][cle]);

/** La même page dans l'autre langue, à partir du chemin courant. */
export function equivalent(courant: string, vers: Langue): string {
  const depuis: Langue = courant === "/en" || courant.startsWith("/en/") ? "en" : "fr";
  const net = courant.replace(/\/$/, "") || "/";
  const cles = Object.keys(ROUTES[depuis]) as ClePage[];
  // Les routes les plus longues d'abord, pour ne pas confondre l'accueil avec le reste.
  for (const cle of cles.sort((a, b) => ROUTES[depuis][b].length - ROUTES[depuis][a].length)) {
    const base = ROUTES[depuis][cle];
    if (net === base) return ROUTES[vers][cle];
    if (cle !== "accueil" && net.startsWith(base + "/")) return ROUTES[vers][cle] + net.slice(base.length);
  }
  return ROUTES[vers].accueil;
}
