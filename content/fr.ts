// ═══════════════════════════════════════════════════════════════════
// TEXTES FRANÇAIS
//
// Règles de rédaction :
//   - vouvoiement, ton littéraire mais sobre ;
//   - aucun tiret long dans les textes visibles ;
//   - rien que des généralités vraies de la vallée du Rhône : terrasses,
//     granite, murs de pierre sèche, échalas, vendange à la main ;
//   - des cépages, jamais d'appellation.
//
// Tout ce qui est propre au domaine (famille, surfaces, altitudes, prix)
// est fictif, et le site le dit sur chaque page.
// ═══════════════════════════════════════════════════════════════════

import { SITE } from "./site";
import type { NomPhoto } from "@/lib/images.gen";

export type Cuvee = {
  slug: string;
  nom: string;
  /** Le nom coupé en deux lignes, pour l'étiquette. */
  etiquette: [string, string];
  cepage: string;
  parcelle: string;
  notes: string;
  /** Couleur de la capsule et teinte de fond de la scène. */
  capsule: string;
  teinte: string;
};

export type Saison = {
  saison: string;
  titre: string;
  texte: string;
  photo: NomPhoto;
  alt: string;
};

export const FR = {
  langue: "fr" as const,

  commun: {
    evitement: "Aller au contenu",
    navigation: "Navigation principale",
    menu: "Menu",
    fermer: "Fermer",
    nav: [
      { cle: "vins", libelle: "Les vins" },
      { cle: "domaine", libelle: "Le domaine" },
      { cle: "visites", libelle: "Visites" },
      { cle: "boutique", libelle: "Boutique" },
      { cle: "contact", libelle: "Contact" },
    ] as const,
    bandeau: {
      etiquette: "À propos de cette démonstration",
      texte: "Exemple de site réalisé par",
      suite: "Domaine fictif.",
    },
    pied: {
      adresse: "Chemin des Terrasses, en Ardèche.",
      adresseNote: "Adresse fictive.",
      rappel:
        "Ce site est un exemple réalisé par Nexura. Le domaine, la famille, les vins et les prix sont fictifs. Aucune commande, aucune réservation et aucun message ne sont enregistrés.",
      sanitaire: "L’abus d’alcool est dangereux pour la santé. À consommer avec modération.",
      mineurs: "La vente d’alcool est interdite aux mineurs.",
      mentions: "Mentions légales",
      liens: "Liens du pied de page",
      animations: {
        actives: "Désactiver les animations",
        inactives: "Activer les animations",
        systeme: "Votre appareil demande moins de mouvement : les animations sont coupées.",
      },
      signature: { avant: "Exemple de site réalisé par", apres: ", 2026." },
    },
    enAttente: {
      texte: "Cette page arrive à la prochaine étape. Pour l’instant, seul l’accueil est construit.",
      retour: "Revenir à l’accueil",
    },
  },

  accueil: {
    meta: {
      titre: `${SITE.nom}, vins de la vallée du Rhône`,
      description:
        "Sept hectares de terrasses en granite au-dessus du Rhône, travaillés à la main depuis quatre générations. Exemple de site réalisé par Nexura, domaine fictif.",
    },

    hero: {
      titre: ["La pente", "décide", "de tout."],
      chapeau:
        "Au-dessus du Rhône, sept hectares de terrasses en granite, travaillés à la main depuis quatre générations.",
      vins: "Découvrir les vins",
      visite: "Réserver une dégustation",
      suite: "Commencer la montée",
      murs: ["Sept hectares,", "tenus par des murs", "de pierre sèche."],
      sommet: "Mètres d'altitude au dernier rang. On y monte à pied, comme chaque matin.",
      alt: "Vignes en terrasses sur un coteau abrupt, dans la lumière du soir.",
    },

    mise: {
      nom: "La mise en bouteille",
      description: "Une bouteille de vin rouge du domaine, cuvée Premier Palier, avec son bouchon, sa capsule et son étiquette.",
      cuvee: "Premier Palier",
      cepage: "Syrah",
      dos: ["Vin rouge", "Mis en bouteille", "au domaine", "75 cl", "Exemple fictif"],
      lien: "Découvrir les quatre vins",
      etapes: [
        { titre: "Le verre", texte: "Tout commence par une bouteille vide, lourde et sombre, qui gardera le vin à l'abri de la lumière." },
        { titre: "Le vin", texte: "Douze mois de fût, puis la mise en bouteille au domaine, sans hâte, un matin de printemps." },
        { titre: "Le bouchon", texte: "Du liège naturel, d'un seul tenant. Il laissera le vin vieillir dix ans s'il le faut." },
        { titre: "L'étiquette", texte: "Posée à la main, une à une. Chaque cuvée porte le nom d'une terrasse du coteau." },
        { titre: "Premier Palier", texte: "La syrah des premières terrasses, au-dessus du fleuve. Un rouge franc et poivré, celui que l'on ouvre en premier." },
      ],
    },

    lieu: {
      nom: "Le lieu",
      phrase: ["Ici, on ne cultive pas", "la pente. On la tient."],
      textes: [
        "Le coteau monte d’un seul élan, du fleuve jusqu’au plateau. Pour y planter la vigne, il a fallu le découper en terrasses, et retenir chaque terrasse par un mur de pierre sèche, monté sans mortier.",
        "Le granite affleure partout. Il boit la chaleur du jour et la rend la nuit, et la vigne y plonge loin pour trouver l’eau.",
      ],
      altitudes: `Les vignes s’étagent de ${SITE.altitude.bas} à ${SITE.altitude.haut} mètres d’altitude.`,
      lien: "Lire l’histoire du domaine",
      alt: "Vue du ciel : des terrasses de vigne et une route en lacets sur un coteau.",
    },

    vigne: {
      nom: "La vigne",
      phrase: ["Quatre saisons,", "les mêmes mains."],
      saisons: [
        {
          saison: "Hiver",
          titre: "La taille",
          texte:
            "De décembre à mars, on taille cep par cep. Chaque pied est ensuite attaché à son échalas, le piquet de bois qui le tient droit dans le vent.",
          photo: "hiver",
          alt: "Gros plan sur un sarment fraîchement taillé, en hiver.",
        },
        {
          saison: "Printemps",
          titre: "Les murs, puis les bourgeons",
          texte:
            "L’hiver défait toujours quelques murs. On les remonte pierre à pierre avant que la vigne reparte, puis on trie les jeunes pousses à la main pour ne garder que les plus fortes.",
          photo: "printemps",
          alt: "Jeune pousse de vigne au printemps.",
        },
        {
          saison: "Été",
          titre: "Le travail en vert",
          texte:
            "On attache les rameaux à mesure qu’ils poussent. Aucun tracteur ne passe ici : tout se porte à dos d’homme, ou se hisse au treuil.",
          photo: "ete",
          alt: "Rangs de vigne en fin d’été, dans une lumière dorée.",
        },
        {
          saison: "Automne",
          titre: "La vendange",
          texte:
            "On vendange à la main, en petites caisses, et l’on trie sur place. Ce qui descend à la cave a déjà été choisi deux fois.",
          photo: "automne",
          alt: "Deux mains coupent une grappe de raisin noir au sécateur.",
        },
      ] satisfies Saison[],
    },

    cave: {
      nom: "La cave",
      phrase: ["Le temps", "fait le reste."],
      texte:
        "À la cave, on intervient peu. Les raisins fermentent avec les levures qu’ils portent déjà, puis le vin repose en fûts et en demi-muids, de douze à dix-huit mois selon les cuvées. On goûte, on attend, et l’on met en bouteille quand le vin est prêt.",
      alt: "Rangées de fûts de chêne dans la pénombre d’une cave.",
    },

    vins: {
      nom: "Les vins",
      phrase: ["Quatre vins,", "un seul coteau."],
      intro: "Deux rouges de syrah et deux blancs, tous nés sur ces terrasses.",
      voir: "Voir la cuvée",
      tous: "Voir tous les vins",
      liste: "Les quatre cuvées",
      bouteille: "Bouteille de la cuvée",
      cuvees: [
        {
          slug: "premier-palier",
          nom: "Premier Palier",
          etiquette: ["Premier", "Palier"],
          cepage: "Syrah",
          parcelle: "Jeunes vignes du bas du coteau.",
          notes: "Fruits noirs, poivre, une bouche franche.",
          capsule: "#8C3246",
          teinte: "#1E1118",
        },
        {
          slug: "le-fruit-du-mur",
          nom: "Le Fruit du Mur",
          etiquette: ["Le Fruit", "du Mur"],
          cepage: "Syrah",
          parcelle: "Vieilles vignes, au cœur de la pente.",
          notes: "Violette, olive noire, des tanins serrés.",
          capsule: "#C2A367",
          teinte: "#150C13",
        },
        {
          slug: "pierre-blonde",
          nom: "Pierre Blonde",
          etiquette: ["Pierre", "Blonde"],
          cepage: "Marsanne et roussanne",
          parcelle: "Les terrasses les plus chaudes.",
          notes: "Fleurs blanches, amande, une finale saline.",
          capsule: "#D9C48A",
          teinte: "#211A12",
        },
        {
          slug: "dernier-mur",
          nom: "Dernier Mur",
          etiquette: ["Dernier", "Mur"],
          cepage: "Viognier",
          parcelle: "La parcelle la plus haute.",
          notes: "Abricot, fleur d’acacia, de la fraîcheur.",
          capsule: "#A9B58C",
          teinte: "#141B17",
        },
      ] satisfies Cuvee[],
    },

    visite: {
      nom: "La visite",
      phrase: ["La vue", "se mérite."],
      texte:
        "On vous reçoit sur rendez-vous, du mardi au samedi. La visite commence dans les vignes, par les terrasses, et se termine à la cave, autour des quatre vins. Comptez une heure et demie, et de bonnes chaussures.",
      reserver: "Réserver une dégustation",
      venir: "Trouver le domaine",
      altVue: "Vignes au crépuscule, sous un ciel chargé.",
      altVerres: "Verres de vin alignés sur un comptoir, dans une lumière chaude.",
    },

    altitude: { unite: "m", legende: "d’altitude" },
  },
};

export type Dictionnaire = typeof FR;
