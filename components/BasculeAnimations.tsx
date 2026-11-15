"use client";

import { useSyncExternalStore } from "react";
import { EVENEMENT, regler } from "@/lib/animations";

// Le bouton du pied de page qui coupe ou rétablit les animations.
// L'offre le promet : « une version sans animation est proposée à ceux
// qui la préfèrent ». Le réglage du système, lui, est suivi d'office.

type Etat = "actives" | "inactives" | "systeme";

function lire(): Etat {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "systeme";
  return document.documentElement.classList.contains("motion") ? "actives" : "inactives";
}

function abonner(rappel: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener(EVENEMENT, rappel);
  media.addEventListener("change", rappel);
  return () => {
    window.removeEventListener(EVENEMENT, rappel);
    media.removeEventListener("change", rappel);
  };
}

type Props = {
  libelles: { actives: string; inactives: string };
  /** Affiché quand le système demande déjà moins de mouvement. */
  noteSysteme: string;
};

export function BasculeAnimations({ libelles, noteSysteme }: Props) {
  // Côté serveur, on ne sait rien du visiteur : le bouton apparaît après le chargement.
  const etat = useSyncExternalStore<Etat | null>(abonner, lire, () => null);

  if (etat === null) return null;
  if (etat === "systeme") return <p className="bascule__note">{noteSysteme}</p>;

  return (
    <button type="button" className="bascule" onClick={() => regler(etat !== "actives")}>
      {etat === "actives" ? libelles.actives : libelles.inactives}
    </button>
  );
}
