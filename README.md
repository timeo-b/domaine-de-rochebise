# Démo « Vitrine d'exception »

Exemple de site réalisé par [Nexura](https://agence-nexura.fr) pour l'offre « Vitrine d'exception » :
un domaine viticole **fictif** de la vallée du Rhône. Le domaine, la famille, les vins, les prix,
l'adresse et les horaires sont inventés, et le site le dit sur chaque page. Aucun formulaire
n'enregistre de données.

Le site n'est pas indexé par les moteurs de recherche (`noindex`), pour ne pas être pris pour un
vrai domaine.

## Lancer le site

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Où changer quoi

| Pour changer | Fichier |
|---|---|
| Le nom du domaine, partout d'un coup | `content/site.ts` |
| Les textes français | `content/fr.ts` |
| Les couleurs, les tailles de texte, le rythme des animations | `app/globals.css` |
| La page d'accueil | `components/accueil/` |
| Les photos | `scripts/images.mjs`, puis `npm run images` |

## Les animations

Une seule règle décide si le site bouge : la classe `motion` sur `<html>` (voir `lib/animations.ts`).
Elle est absente si l'appareil demande un mouvement réduit, si le visiteur coupe les animations
avec le bouton du pied de page, ou si JavaScript ne fonctionne pas. Dans ces trois cas, le site
s'affiche à plat, complet et lisible.

## Crédits

Photos, polices et bibliothèques : voir `CREDITS.md`.

## État au 15 novembre 2026

Pages : accueil, les vins et quatre fiches, le domaine, visites, boutique, contact, mentions légales, en français et en anglais (`/en`). Le néerlandais a sa place réservée (`LANGUES_A_VENIR` dans `content/site.ts`).

Contrôles sur le build de production servi en local :

- build et lint : aucune erreur ;
- axe-core (WCAG 2.0 et 2.1, niveaux A et AA, bonnes pratiques) : 0 violation sur les 16 pages, ordinateur et téléphone, avec et sans animation, formulaires en erreur et panier rempli compris ;
- Lighthouse téléphone : accueil 96, 99 et 100 en performance sur trois passages ; vins, fiche, boutique, visites et accueil anglais entre 99 et 100 ; accessibilité, bonnes pratiques et SEO à 100 partout. Le SEO est mesuré avec `DEMO_INDEXABLE=1`, c'est-à-dire sans le `noindex` que porte le site en ligne ;
- Lighthouse ordinateur : 100 sur les quatre axes (accueil, le domaine).
