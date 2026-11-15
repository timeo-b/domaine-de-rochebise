// ═══════════════════════════════════════════════════════════════════
// ENGLISH TEXTS (British English)
//
// Same rules as the French file: sober literary tone, no long dashes,
// grape varieties but never an appellation. Cuvée names stay in French:
// they are proper names. Everything about the estate is fictional.
// ═══════════════════════════════════════════════════════════════════

import type { Dictionnaire } from "./fr";
import { SITE } from "./site";

export const EN: Dictionnaire = {
  langue: "en",

  commun: {
    evitement: "Skip to content",
    navigation: "Main navigation",
    menu: "Menu",
    fermer: "Close",
    nav: [
      { cle: "vins", libelle: "Wines" },
      { cle: "domaine", libelle: "The estate" },
      { cle: "visites", libelle: "Visits" },
      { cle: "boutique", libelle: "Shop" },
      { cle: "contact", libelle: "Contact" },
    ],
    autreLangue: { libelle: "Français", description: "Lire ce site en français", lang: "fr" },
    bandeau: {
      etiquette: "About this demonstration",
      texte: "Sample website made by",
      suite: "Fictional estate.",
    },
    pied: {
      adresse: "Chemin des Terrasses, Ardèche, France.",
      adresseNote: "Fictional address.",
      rappel:
        "This website is a sample made by Nexura. The estate, the family, the wines and the prices are fictional. No order, booking or message is recorded.",
      sanitaire: "Alcohol abuse is dangerous for your health. Please drink responsibly.",
      mineurs: "The sale of alcohol to minors is prohibited.",
      mentions: "Legal notice",
      liens: "Footer links",
      animations: {
        actives: "Turn animations off",
        inactives: "Turn animations on",
        systeme: "Your device asks for reduced motion: animations are off.",
      },
      signature: { avant: "Sample website made by", apres: ", 2026." },
    },
  },

  accueil: {
    meta: {
      titre: `${SITE.nom}, wines from the Rhône valley`,
      description:
        "Seven hectares of granite terraces above the Rhône, worked by hand for four generations. Sample website made by Nexura, fictional estate.",
    },

    hero: {
      titre: ["The slope", "decides", "everything."],
      chapeau: "Above the Rhône, seven hectares of granite terraces, worked by hand for four generations.",
      vins: "Discover the wines",
      visite: "Book a tasting",
      suite: "Start the climb",
      murs: ["Seven hectares,", "held by walls", "of dry stone."],
      sommet: "Metres above sea level at the last row. We walk up, as we do every morning.",
      alt: "Terraced vineyards on a steep hillside in evening light.",
    },

    mise: {
      nom: "Bottling",
      description: "A bottle of red wine from the estate, cuvée Premier Palier, with its cork, capsule and label.",
      cuvee: "Premier Palier",
      cepage: "Syrah",
      dos: ["Red wine", "Bottled", "at the estate", "75 cl", "Fictional sample"],
      lien: "Discover the four wines",
      etapes: [
        { titre: "The glass", texte: "It all starts with an empty bottle, heavy and dark, to keep the wine away from the light." },
        { titre: "The wine", texte: "Twelve months in barrel, then bottling at the estate, unhurried, on a spring morning." },
        { titre: "The cork", texte: "Natural cork, in one piece. It will let the wine age for ten years if need be." },
        { titre: "The label", texte: "Applied by hand, one by one. Each cuvée is named after a terrace on the hillside." },
        { titre: "Premier Palier", texte: "Syrah from the first terraces, above the river. A frank, peppery red, the one we open first." },
      ],
    },

    lieu: {
      nom: "The place",
      phrase: ["Here, you do not farm", "the slope. You hold it."],
      textes: [
        "The hillside rises in one sweep, from the river up to the plateau. To plant vines here, it had to be cut into terraces, each one held by a dry stone wall, built without mortar.",
        "Granite shows everywhere. It drinks the heat of the day and gives it back at night, and the vines dig deep to find water.",
      ],
      altitudes: `The vines climb from ${SITE.altitude.bas} to ${SITE.altitude.haut} metres above sea level.`,
      lien: "Read the story of the estate",
      alt: "Seen from the sky: terraced vines and a winding road on a hillside.",
    },

    vigne: {
      nom: "The vines",
      phrase: ["Four seasons,", "the same hands."],
      saisons: [
        {
          saison: "Winter",
          titre: "Pruning",
          texte:
            "From December to March, we prune vine by vine. Each one is then tied to its échalas, the wooden stake that keeps it upright in the wind.",
          photo: "hiver",
          alt: "Close-up of a freshly pruned vine shoot in winter.",
        },
        {
          saison: "Spring",
          titre: "The walls, then the buds",
          texte:
            "Winter always brings a few walls down. We rebuild them stone by stone before the vines wake, then thin the young shoots by hand to keep only the strongest.",
          photo: "printemps",
          alt: "Young vine shoot in spring.",
        },
        {
          saison: "Summer",
          titre: "Working the green",
          texte:
            "We tie up the shoots as they grow. No tractor comes through here: everything is carried on our backs, or hauled up by winch.",
          photo: "ete",
          alt: "Rows of vines in late summer, in golden light.",
        },
        {
          saison: "Autumn",
          titre: "The harvest",
          texte:
            "We pick by hand, into small crates, and sort on the spot. What goes down to the cellar has already been chosen twice.",
          photo: "automne",
          alt: "Two hands cutting a bunch of black grapes with secateurs.",
        },
      ],
    },

    cave: {
      nom: "The cellar",
      phrase: ["Time does", "the rest."],
      texte:
        "In the cellar, we do very little. The grapes ferment with the yeasts they already carry, then the wine rests in barrels and demi-muids, for twelve to eighteen months depending on the cuvée. We taste, we wait, and we bottle when the wine is ready.",
      alt: "Rows of oak barrels in the half-light of a cellar.",
    },

    vins: {
      nom: "The wines",
      phrase: ["Four wines,", "one hillside."],
      intro: "Two Syrah reds and two whites, all born on these terraces.",
      voir: "See the cuvée",
      tous: "See all the wines",
      liste: "The four cuvées",
      bouteille: "Bottle of the cuvée",
      cuvees: [
        {
          slug: "premier-palier",
          nom: "Premier Palier",
          etiquette: ["Premier", "Palier"],
          cepage: "Syrah",
          parcelle: "Young vines at the foot of the slope.",
          notes: "Black fruit, pepper, a frank palate.",
          capsule: "#8C3246",
          teinte: "#1E1118",
        },
        {
          slug: "le-fruit-du-mur",
          nom: "Le Fruit du Mur",
          etiquette: ["Le Fruit", "du Mur"],
          cepage: "Syrah",
          parcelle: "Old vines, in the heart of the slope.",
          notes: "Violet, black olive, tight tannins.",
          capsule: "#C2A367",
          teinte: "#150C13",
        },
        {
          slug: "pierre-blonde",
          nom: "Pierre Blonde",
          etiquette: ["Pierre", "Blonde"],
          cepage: "Marsanne and Roussanne",
          parcelle: "The warmest terraces.",
          notes: "White flowers, almond, a saline finish.",
          capsule: "#D9C48A",
          teinte: "#211A12",
        },
        {
          slug: "dernier-mur",
          nom: "Dernier Mur",
          etiquette: ["Dernier", "Mur"],
          cepage: "Viognier",
          parcelle: "The highest plot.",
          notes: "Apricot, acacia blossom, freshness.",
          capsule: "#A9B58C",
          teinte: "#141B17",
        },
      ],
    },

    visite: {
      nom: "The visit",
      phrase: ["The view", "is earned."],
      texte:
        "We welcome you by appointment, Tuesday to Saturday. The visit starts in the vines, on the terraces, and ends in the cellar, around the four wines. Allow an hour and a half, and wear good shoes.",
      reserver: "Book a tasting",
      venir: "Find the estate",
      altVue: "Vines at dusk under a heavy sky.",
      altVerres: "Wine glasses lined up on a counter, in warm light.",
    },

    altitude: { unite: "m", legende: "above sea level" },
  },
};
