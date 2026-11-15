// ═══════════════════════════════════════════════════════════════════
// Le réglage des animations.
//
// Une seule règle décide si le site bouge : la classe `motion` sur
// <html>. Elle est posée avant le premier affichage par le script de
// app/(fr)/layout.tsx, et seulement si :
//   - le système ne demande pas de mouvement réduit ;
//   - le visiteur n'a pas coupé les animations avec le bouton du pied
//     de page.
//
// Sans cette classe, rien n'est caché et rien ne bouge : c'est aussi ce
// que voit un visiteur sans JavaScript. Toutes les animations, en CSS
// comme en JavaScript, dépendent de cette classe.
//
// Le choix du visiteur est gardé dans le stockage local du navigateur.
// C'est une préférence d'affichage qu'il a demandée : elle ne sert à
// aucune mesure d'audience et ne sort pas de son appareil.
// ═══════════════════════════════════════════════════════════════════

export const CLE_STOCKAGE = "animations";
export const EVENEMENT = "animations:changement";

/** Script exécuté dans <head>, avant le premier affichage. */
export const SCRIPT_AMORCE = `(function(){var d=document.documentElement;d.classList.add('js');try{var c=localStorage.getItem('${CLE_STOCKAGE}')==='off';var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!c&&!r)d.classList.add('motion')}catch(e){}})();`;

export function systemeReduit(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function coupeesParLeVisiteur(): boolean {
  try {
    return window.localStorage.getItem(CLE_STOCKAGE) === "off";
  } catch {
    return false;
  }
}

/** Recalcule la classe `motion` et prévient les composants qui animent. */
export function appliquer(): boolean {
  const actives = !systemeReduit() && !coupeesParLeVisiteur();
  document.documentElement.classList.toggle("motion", actives);
  window.dispatchEvent(new CustomEvent(EVENEMENT, { detail: { actives } }));
  return actives;
}

export function regler(actives: boolean) {
  try {
    if (actives) window.localStorage.removeItem(CLE_STOCKAGE);
    else window.localStorage.setItem(CLE_STOCKAGE, "off");
  } catch {
    // Stockage indisponible : le réglage vaut pour la page en cours.
    document.documentElement.classList.toggle("motion", actives && !systemeReduit());
    window.dispatchEvent(new CustomEvent(EVENEMENT, { detail: { actives } }));
    return;
  }
  appliquer();
}
