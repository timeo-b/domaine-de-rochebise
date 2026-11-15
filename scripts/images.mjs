// ═══════════════════════════════════════════════════════════════════
// Préparation des photos.
//
// Entrée  : sources/*.jpg, les originaux téléchargés sur Unsplash
//           (voir CREDITS.md, le dossier n'est pas versionné).
// Sortie  : public/images/*.avif et *.webp, en plusieurs largeurs, et
//           lib/images.gen.ts, la table que lit le composant <Photo>.
//
// Chaque photo reçoit le même traitement léger (un peu moins de lumière
// et de saturation) pour que des images de photographes différents
// tiennent ensemble sur le fond sombre du site.
//
// Usage : npm run images
// ═══════════════════════════════════════════════════════════════════

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCES = "sources";
const SORTIE = "public/images";
const TABLE = "lib/images.gen.ts";

const PLEIN_ECRAN = [640, 960, 1280, 1920, 2560];
const DEMI_ECRAN = [480, 720, 960, 1200, 1440];
// 750 px : un écran de 375 points à densité 2. 880 px : toute la largeur disponible dans l'original.
const PORTRAIT = [480, 750, 880];

/**
 * `cadre` : zone gardée dans l'original, en fractions (gauche, haut,
 * largeur, hauteur). `lumiere` et `saturation` : 1 = inchangé.
 */
const PHOTOS = [
  {
    nom: "hero",
    source: "hero-terrasses.jpg",
    // On coupe le haut de l'image : des bâtiments y sont reconnaissables.
    cadre: [0, 0.13, 1, 0.87],
    largeurs: PLEIN_ECRAN,
    lumiere: 0.8,
    saturation: 0.85,
    // Recadrage vertical pour le téléphone, centré sur les terrasses, aux
    // proportions d'un écran (9:16) : tout ce qui est téléchargé est affiché.
    portrait: { cadre: [0.3925, 0.13, 0.275, 0.87], largeurs: PORTRAIT },
  },
  // On garde le haut de l'image, où la route prend moins de place, aux
  // proportions de son cadre vertical (parallaxe comprise).
  { nom: "lieu", source: "lieu-terrasses.jpg", cadre: [0.17, 0, 0.3, 0.5], largeurs: DEMI_ECRAN, lumiere: 0.98, saturation: 0.85 },
  // Cadrage serré sous l'horizon : le ciel, très clair, jurait avec le reste.
  { nom: "hiver", source: "hiver-taille.jpg", cadre: [0.1, 0.36, 0.85, 0.62], largeurs: DEMI_ECRAN, lumiere: 0.85, saturation: 0.78 },
  { nom: "printemps", source: "printemps-b.jpg", cadre: [0.06, 0.08, 0.88, 0.88], largeurs: DEMI_ECRAN, lumiere: 0.82, saturation: 0.9 },
  { nom: "ete", source: "ete-rangs.jpg", cadre: [0, 0.2, 1, 0.8], largeurs: DEMI_ECRAN, lumiere: 0.76, saturation: 0.8 },
  { nom: "automne", source: "automne-vendange.jpg", cadre: [0.1, 0, 0.8, 1], largeurs: DEMI_ECRAN, lumiere: 0.9, saturation: 0.9 },
  { nom: "cave", source: "cave-futs-a.jpg", cadre: [0, 0.05, 1, 0.9], largeurs: PLEIN_ECRAN, lumiere: 1.35, saturation: 0.9 },
  { nom: "visite", source: "visite-soir.jpg", cadre: [0, 0, 1, 1], largeurs: PLEIN_ECRAN, lumiere: 1, saturation: 0.9 },
  { nom: "degustation", source: "degustation.jpg", cadre: [0.05, 0.1, 0.9, 0.85], largeurs: DEMI_ECRAN, lumiere: 0.98, saturation: 0.9 },
];

const empreinte = (buf) => createHash("md5").update(buf).digest("hex").slice(0, 8);

async function preparer(source, cadre, lumiere, saturation) {
  const meta = await sharp(path.join(SOURCES, source)).metadata();
  const [g, h, l, ht] = cadre;
  const zone = {
    left: Math.round(g * meta.width),
    top: Math.round(h * meta.height),
    width: Math.round(l * meta.width),
    height: Math.round(ht * meta.height),
  };
  const base = await sharp(path.join(SOURCES, source))
    .extract(zone)
    .modulate({ brightness: lumiere, saturation })
    .toBuffer();
  return { base, largeur: zone.width, hauteur: zone.height };
}

async function decliner(nom, base, largeurOrigine, largeurs) {
  const avif = [];
  const webp = [];
  for (const w of largeurs.filter((x) => x <= largeurOrigine)) {
    const a = await sharp(base).resize({ width: w }).avif({ quality: 50, effort: 5 }).toBuffer();
    const b = await sharp(base).resize({ width: w }).webp({ quality: 70 }).toBuffer();
    const fa = `${nom}-${w}.${empreinte(a)}.avif`;
    const fb = `${nom}-${w}.${empreinte(b)}.webp`;
    await fs.writeFile(path.join(SORTIE, fa), a);
    await fs.writeFile(path.join(SORTIE, fb), b);
    avif.push([w, `/images/${fa}`, a.length]);
    webp.push([w, `/images/${fb}`, b.length]);
  }
  return { avif, webp };
}

async function flou(base) {
  const buf = await sharp(base).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

await fs.rm(SORTIE, { recursive: true, force: true });
await fs.mkdir(SORTIE, { recursive: true });

const table = {};
let total = 0;

for (const p of PHOTOS) {
  const { base, largeur, hauteur } = await preparer(p.source, p.cadre, p.lumiere, p.saturation);
  const { avif, webp } = await decliner(p.nom, base, largeur, p.largeurs);
  const entree = {
    largeur,
    hauteur,
    avif: avif.map(([w, f]) => [w, f]),
    webp: webp.map(([w, f]) => [w, f]),
    flou: await flou(base),
  };
  total += [...avif, ...webp].reduce((s, x) => s + x[2], 0);

  if (p.portrait) {
    const v = await preparer(p.source, p.portrait.cadre, p.lumiere, p.saturation);
    const d = await decliner(`${p.nom}-portrait`, v.base, v.largeur, p.portrait.largeurs);
    entree.portrait = {
      largeur: v.largeur,
      hauteur: v.hauteur,
      avif: d.avif.map(([w, f]) => [w, f]),
      webp: d.webp.map(([w, f]) => [w, f]),
    };
    total += [...d.avif, ...d.webp].reduce((s, x) => s + x[2], 0);
  }

  table[p.nom] = entree;
  const poids = avif.map(([w, , o]) => `${w}px ${Math.round(o / 1024)} Ko`).join(", ");
  console.log(`${p.nom.padEnd(12)} ${largeur}x${hauteur}  avif : ${poids}`);
}

const ts = `// Fichier généré par scripts/images.mjs. Ne pas modifier à la main.

export type Declinaison = readonly (readonly [number, string])[];

export type PhotoTable = {
  largeur: number;
  hauteur: number;
  avif: Declinaison;
  webp: Declinaison;
  /** Aperçu de quelques octets, affiché pendant le chargement. */
  flou: string;
  portrait?: { largeur: number; hauteur: number; avif: Declinaison; webp: Declinaison };
};

export const PHOTOS = ${JSON.stringify(table, null, 2)} as const satisfies Record<string, PhotoTable>;

export type NomPhoto = keyof typeof PHOTOS;
`;

await fs.mkdir(path.dirname(TABLE), { recursive: true });
await fs.writeFile(TABLE, ts);
console.log(`\n${Object.keys(table).length} photos, ${Math.round(total / 1024)} Ko au total dans ${SORTIE}`);
