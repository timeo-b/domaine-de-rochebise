"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";
import { EVENEMENT, appliquer } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════
// Le mouvement lié au défilement, en deux étages.
//
//   1. Les révélations (titres ligne par ligne, paragraphes, images) :
//      un observateur d'intersection pose une classe, et le CSS fait la
//      transition (voir « Révélations » dans app/globals.css). Aucune
//      bibliothèque : c'est tout ce que reçoit un téléphone.
//   2. Les effets attachés à la position de défilement (scènes
//      épinglées, parallaxe, compteur d'altitude) : GSAP et
//      ScrollTrigger, chargés seulement sur grand écran, après le
//      premier affichage.
//
// Principes :
//   - rien n'est caché d'avance par le CSS : ce composant ne cache que
//     ce qu'il va révéler, et jamais ce qui est déjà à l'écran. Sans
//     script, ou si la bibliothèque ne se charge pas, la page reste
//     entièrement lisible ;
//   - on n'anime que `transform` et `opacity`.
//
// L'ouverture de la page (titre, image) est en CSS pur : elle ne dépend
// pas de ce fichier.
// ═══════════════════════════════════════════════════════════════════

const GRAND_ECRAN = "(min-width: 900px)";

type Gsap = typeof import("gsap").gsap;
type Declencheur = typeof import("gsap/ScrollTrigger").ScrollTrigger;

// ── 1. Révélations ──────────────────────────────────────────────────

function installerRevelations() {
  // On lit toutes les positions d'abord, on écrit ensuite : le navigateur
  // ne recalcule la mise en page qu'une fois.
  const seuil = window.innerHeight * 0.9;
  const blocs = Array.from(document.querySelectorAll<HTMLElement>("[data-lignes], [data-entree]")).filter(
    (el) => el.getBoundingClientRect().top >= seuil,
  );
  const images = Array.from(document.querySelectorAll<HTMLImageElement>(".photo img[loading='lazy']")).filter(
    (img) => !img.complete,
  );

  const observer = (marge: string) =>
    new IntersectionObserver(
      (entrees, observateur) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.classList.add("est-revele");
          observateur.unobserve(entree.target);
        }
      },
      { rootMargin: marge },
    );
  // Les titres se lèvent un peu plus haut dans l'écran que les paragraphes.
  const pourLignes = observer("0px 0px -16% 0px");
  const pourEntrees = observer("0px 0px -12% 0px");
  for (const bloc of blocs) {
    bloc.classList.add("a-reveler");
    (bloc.hasAttribute("data-lignes") ? pourLignes : pourEntrees).observe(bloc);
  }

  // Au clavier, le focus peut arriver avant le défilement : on montre le
  // bloc tout de suite, sans transition, pour que le focus soit visible
  // sans délai.
  const auFocus = (evenement: FocusEvent) => {
    const cible = evenement.target instanceof Element ? evenement.target.closest(".a-reveler:not(.est-revele)") : null;
    cible?.classList.add("est-revele", "sans-attente");
  };
  document.addEventListener("focusin", auFocus);

  // Les images hors écran apparaissent en fondu quand elles arrivent.
  const montrer = (evenement: Event) => (evenement.currentTarget as HTMLElement).classList.add("est-chargee");
  for (const img of images) {
    img.classList.add("en-attente");
    img.addEventListener("load", montrer, { once: true });
    img.addEventListener("error", montrer, { once: true });
  }

  return () => {
    pourLignes.disconnect();
    pourEntrees.disconnect();
    document.removeEventListener("focusin", auFocus);
    for (const bloc of blocs) bloc.classList.remove("a-reveler", "est-revele", "sans-attente");
    for (const img of images) {
      img.removeEventListener("load", montrer);
      img.removeEventListener("error", montrer);
      img.classList.remove("en-attente", "est-chargee");
    }
  };
}

// ── 2. Effets attachés au défilement (grand écran) ──────────────────

function installerDefilement(gsap: Gsap, ScrollTrigger: Declencheur) {
  const remises: (() => void)[] = [];

  const contexte = gsap.context(() => {
    // Parallaxe douce des grandes images.
    gsap.utils.toArray<HTMLElement>("[data-parallaxe]").forEach((el) => {
      const force = Number(el.dataset.parallaxe) || 6;
      gsap.fromTo(
        el,
        { yPercent: -force },
        {
          yPercent: force,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });

    // Scènes épinglées : l'image reste, et change avec le texte qui défile.
    gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((scene) => {
      const etapes = Array.from(scene.querySelectorAll<HTMLElement>("[data-etape]"));
      const medias = Array.from(scene.querySelectorAll<HTMLElement>("[data-media]"));
      const activer = (i: number) => {
        medias.forEach((m, j) => m.classList.toggle("est-actif", i === j));
        etapes.forEach((e, j) => e.classList.toggle("est-actif", i === j));
        const teinte = etapes[i]?.dataset.teinte;
        if (teinte) scene.style.setProperty("--teinte", teinte);
      };
      etapes.forEach((etape, i) => {
        ScrollTrigger.create({
          trigger: etape,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) activer(i);
          },
        });
      });
      remises.push(() => {
        activer(0);
        scene.style.removeProperty("--teinte");
      });
    });

    // Le compteur d'altitude, du pied du coteau au sommet.
    const compteur = document.querySelector<HTMLElement>("[data-altitude]");
    const valeur = compteur?.querySelector<HTMLElement>("[data-altitude-valeur]");
    const debut = document.querySelector<HTMLElement>("[data-altitude-debut]");
    const fin = document.querySelector<HTMLElement>("[data-altitude-fin]");
    if (compteur && valeur && debut && fin) {
      const etat = { v: SITE.altitude.bas as number };
      gsap.to(etat, {
        v: SITE.altitude.haut,
        ease: "none",
        scrollTrigger: {
          trigger: debut,
          start: "top 70%",
          endTrigger: fin,
          end: "bottom 65%",
          scrub: 0.5,
          onToggle: (self) => compteur.classList.toggle("est-visible", self.isActive),
        },
        onUpdate: () => {
          valeur.textContent = String(Math.round(etat.v));
        },
      });
      remises.push(() => {
        compteur.classList.remove("est-visible");
        valeur.textContent = String(SITE.altitude.bas);
      });
    }
  });

  return () => {
    contexte.revert();
    remises.forEach((r) => r());
  };
}

export function Mouvement() {
  const chemin = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const grand = window.matchMedia(GRAND_ECRAN);
    let defaire: (() => void)[] = [];
    let jeton = 0;

    // L'en-tête prend un fond plein dès que la page a défilé. Sans rapport
    // avec les animations : c'est une question de lisibilité.
    const entete = document.querySelector<HTMLElement>("[data-entete]");
    const repere = document.querySelector<HTMLElement>("[data-haut]");
    let observateur: IntersectionObserver | null = null;
    if (entete && repere) {
      observateur = new IntersectionObserver(([entree]) => {
        entete.dataset.defile = entree.isIntersecting ? "non" : "oui";
      });
      observateur.observe(repere);
    }

    const arreter = () => {
      defaire.forEach((d) => d());
      defaire = [];
    };

    const lancer = async () => {
      arreter();
      const moi = ++jeton;
      if (!html.classList.contains("motion")) return;
      defaire.push(installerRevelations());
      // Téléphone, tablette tenue en hauteur : rien d'autre à charger.
      if (!grand.matches) return;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (moi !== jeton) return;
        gsap.registerPlugin(ScrollTrigger);
        defaire.push(installerDefilement(gsap, ScrollTrigger));
      } catch {
        // Bibliothèque indisponible : les scènes épinglées n'auraient plus
        // personne pour les conduire. On repasse en version sans animation,
        // et on prévient le bouton du pied de page.
        if (moi !== jeton) return;
        html.classList.remove("motion");
        window.dispatchEvent(new CustomEvent(EVENEMENT, { detail: { actives: false } }));
      }
    };

    // Safari ne connaît pas requestIdleCallback : on se rabat sur un court délai.
    const avecRepos = typeof window.requestIdleCallback === "function";
    const differe = avecRepos
      ? window.requestIdleCallback(() => void lancer(), { timeout: 1500 })
      : window.setTimeout(() => void lancer(), 200);

    const changement = () => void lancer();
    const systeme = () => appliquer();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener(EVENEMENT, changement);
    media.addEventListener("change", systeme);
    // Passage d'un petit à un grand écran (rotation, fenêtre agrandie) :
    // on réinstalle ce qui convient à la nouvelle largeur.
    grand.addEventListener("change", changement);

    return () => {
      jeton++;
      if (avecRepos) window.cancelIdleCallback(differe);
      else window.clearTimeout(differe);
      arreter();
      observateur?.disconnect();
      window.removeEventListener(EVENEMENT, changement);
      media.removeEventListener("change", systeme);
      grand.removeEventListener("change", changement);
    };
  }, [chemin]);

  return null;
}
