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
