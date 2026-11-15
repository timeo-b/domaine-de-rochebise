# Crédits

Tout ce qui n'a pas été écrit pour ce site est listé ici, avec sa source et sa licence.

## Photographies

Toutes les photos viennent d'[Unsplash](https://unsplash.com) et sont placées sous la
[licence Unsplash](https://unsplash.com/license) : utilisation gratuite, y compris commerciale,
sans autorisation à demander. Aucune ne vient de l'offre payante Unsplash+.

Elles ont été téléchargées le 14 novembre 2026 par le connecteur Unsplash, qui enregistre chaque
téléchargement auprès d'Unsplash. Les fichiers servis par le site sont dans `public/images`,
recadrés et légèrement assombris par `scripts/images.mjs`. Les originaux ne sont pas dans le dépôt.

Ce sont des images d'illustration : elles ne montrent ni le domaine, qui est fictif, ni la vallée
du Rhône. Aucune ne montre un visage, une enseigne ou une étiquette reconnaissable.

| Sur le site | Ce qu'on y voit | Photographe | Page de la photo |
|---|---|---|---|
| `hero` (ouverture) | Vignes en terrasses sur un coteau abrupt | [Weliton Soranzo](https://unsplash.com/@welframes) | [x_qnbEbXTBg](https://unsplash.com/photos/terraced-vineyards-on-a-steep-hillside-x_qnbEbXTBg) |
| `lieu` (Le lieu) | Terrasses et route en lacets vues du ciel | [Cosmin Andrei Buzamat](https://unsplash.com/@cos592) | [ulZFvNjtReQ](https://unsplash.com/photos/aerial-view-of-winding-roads-through-terraced-vineyards-ulZFvNjtReQ) |
| `hiver` (La vigne) | Sarment fraîchement taillé | [Árpád Czapp](https://unsplash.com/@czapp_arpad) | [mXYqpypfjns](https://unsplash.com/photos/a-close-up-of-a-piece-of-wood-on-a-tree-mXYqpypfjns) |
| `printemps` (La vigne) | Jeune pousse de vigne | [Mostafa Qasemi](https://unsplash.com/@mstf1987) | [dk_V8ZTVJz0](https://unsplash.com/photos/a-new-green-sprout-emerges-from-a-bare-branch-dk_V8ZTVJz0) |
| `ete` (La vigne) | Rangs de vigne en fin d'été | [Lucas Gallone](https://unsplash.com/@lucasgallone) | [gM3K8cDFr-Q](https://unsplash.com/photos/vineyard-rows-bathed-in-golden-sunlight-on-a-hill-gM3K8cDFr-Q) |
| `automne` (La vigne) | Mains qui coupent une grappe au sécateur | [Andrea Cairone](https://unsplash.com/@kaicaironejpg) | [lzM3pbQim70](https://unsplash.com/photos/black-round-fruit-on-brown-wooden-stick-lzM3pbQim70) |
| `cave` (La cave) | Fûts de chêne dans la pénombre | [Daniel Vogel](https://unsplash.com/@vogel11) | [PUDQGDlM_V8](https://unsplash.com/photos/round-photo-frame-lot-on-wall-PUDQGDlM_V8) |
| `visite` (La visite) | Vignes au crépuscule | [Tim Mossholder](https://unsplash.com/@timmossholder) | [-r3ARWNHekk](https://unsplash.com/photos/sun-rays-through-clouds-at-orchard--r3ARWNHekk) |
| `degustation` (La visite) | Verres alignés sur un comptoir | [Ambitious Studio, Rick Barrett](https://unsplash.com/@weareambitious) | [qRfjRzzily0](https://unsplash.com/photos/a-group-of-glasses-with-liquid-in-them-qRfjRzzily0) |

## Dessins

Les bouteilles, leurs étiquettes, les courbes de niveau et l'icône du site sont dessinées en code
pour ce projet (`components/Bouteille.tsx`, `components/Courbes.tsx`, `app/icon.svg`).

## Polices

Les fichiers sont dans `app/fonts`, servis par le site lui-même. Aucune requête vers Google Fonts.

| Police | Usage | Auteur | Licence |
|---|---|---|---|
| Cormorant Garamond | Titres, nom du domaine, étiquettes | Christian Thalmann, Catharsis Fonts | SIL Open Font License 1.1 (`app/fonts/LICENCE-cormorant-garamond.txt`) |
| Jost | Texte courant, boutons | Owen Earl, indestructible type* | SIL Open Font License 1.1 (`app/fonts/LICENCE-jost.txt`) |

Fichiers issus des paquets `@fontsource/cormorant-garamond` et `@fontsource/jost`.

## Bibliothèques

| Bibliothèque | Usage | Licence |
|---|---|---|
| Next.js, React | Structure du site | MIT |
| GSAP et ScrollTrigger | Animations liées au défilement | Licence standard « no charge » de GSAP, gratuite pour un usage commercial : https://gsap.com/standard-license |
| sharp | Préparation des photos, hors ligne | Apache 2.0 |
