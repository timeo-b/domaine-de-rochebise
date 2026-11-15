// ═══════════════════════════════════════════════════════════════════
// Polices auto-hébergées.
//
// Les fichiers sont dans app/fonts, sous licence SIL Open Font License
// (textes de licence à côté). Aucune requête vers Google Fonts, ni au
// build ni à l'affichage.
//
// Quatre familles plutôt que deux, pour ne précharger que ce qui sert au
// premier écran : le Cormorant léger du titre et le Jost du texte. Les
// autres graisses arrivent quand la page en a besoin.
// ═══════════════════════════════════════════════════════════════════

import localFont from "next/font/local";

/** Cormorant Garamond 300 : les grands titres et le nom du domaine. */
export const titre = localFont({
  src: "./fonts/cormorant-garamond-latin-300-normal.woff2",
  weight: "300",
  style: "normal",
  variable: "--font-titre",
  display: "swap",
  preload: true,
  fallback: ["Garamond", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

/** Cormorant Garamond 400, romain et italique : intertitres, étiquettes. */
export const serif = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: false,
  fallback: ["Garamond", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

/** Jost 400 : le texte courant. */
export const sans = localFont({
  src: "./fonts/jost-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["Century Gothic", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Jost 500 : boutons et libellés. */
export const sansFort = localFont({
  src: "./fonts/jost-latin-500-normal.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-sans-fort",
  display: "swap",
  preload: false,
  fallback: ["Century Gothic", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const VARIABLES_POLICES = [titre.variable, serif.variable, sans.variable, sansFort.variable].join(" ");
