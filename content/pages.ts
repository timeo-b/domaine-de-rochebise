import { CUVEES_EN, PAGES_EN } from "./pages-en";
import { CUVEES_FR, PAGES_FR } from "./pages-fr";
import type { Langue } from "./site";

// Le point d'entrée des pages intérieures : textes et cuvées dans la langue demandée.
export const pages = (langue: Langue) => (langue === "en" ? PAGES_EN : PAGES_FR);
export const cuvees = (langue: Langue) => (langue === "en" ? CUVEES_EN : CUVEES_FR);
export type CuveeComplete = (typeof CUVEES_FR)[number];

export const euros = (n: number, langue: Langue) => (langue === "en" ? `€${n.toLocaleString("en-GB")}` : `${n.toLocaleString("fr-FR")} €`);
