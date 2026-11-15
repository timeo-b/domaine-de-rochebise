"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";
import { EVENEMENT, appliquer } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════
// Les animations liées au défilement.
//
// Principes :
//   - GSAP et ScrollTrigger ne sont chargés qu'après le premier
//     affichage, et seulement si les animations sont actives ;
//   - rien n'est caché d'avance par le CSS : ce composant ne cache que
//     ce qu'il va révéler, et jamais ce qui est déjà à l'écran. Si la
//     bibliothèque ne se charge pas, la page reste entièrement lisible ;
//   - sur téléphone, pas d'épinglage ni de parallaxe : seulement les
//     révélations, peu coûteuses ;
//   - on n'anime que `transform` et `opacity`.
//
// L'ouverture de la page (titre, image) est en CSS pur : elle ne dépend
// pas de ce fichier.
// ═══════════════════════════════════════════════════════════════════

type Gsap = typeof import("gsap").gsap;
type Declencheur = typeof import("gsap/ScrollTrigger").ScrollTrigger;

function installer(gsap: Gsap, ScrollTrigger: Declencheur) {
  const nettoyages: (() => void)[] = [];
  const mm = gsap.matchMedia();

  mm.add({ large: "(min-width: 900px)", etroit: "(max-width: 899.98px)" }, (contexte) => {
    const large = Boolean(contexte.conditions?.large);
    const dejaVisible = (el: Element) => el.getBoundingClientRect().top < window.innerHeight * 0.9;
    const remises: (() => void)[] = [];

    // 1. Les grandes phrases se révèlent ligne par ligne.
    gsap.utils.toArray<HTMLElement>("[data-lignes]").forEach((bloc) => {
      if (dejaVisible(bloc)) return;
      gsap.from(bloc.querySelectorAll(".ligne__in"), {
        yPercent: 108,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.13,
        scrollTrigger: { trigger: bloc, start: "top 84%", once: true },
      });
    });

    // 2. Les paragraphes et les images montent doucement.
    // On ne joue que sur l'opacité, jamais sur `visibility` : un lien encore
    // transparent doit rester atteignable à la tabulation.
    gsap.utils.toArray<HTMLElement>("[data-entree]").forEach((el) => {
      if (dejaVisible(el)) return;
      const entree = gsap.from(el, {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      // Au clavier, le focus peut arriver avant le défilement : on montre le
      // bloc tout de suite, pour que le focus soit visible sans délai.
      const montrer = () => entree.progress(1);
      el.addEventListener("focusin", montrer);
      remises.push(() => el.removeEventListener("focusin", montrer));
    });

    if (large) {
      // 3. Parallaxe douce des grandes images.
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

      // 4. Scènes épinglées : l'image reste, et change avec le texte qui défile.
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

      // 5. Le compteur d'altitude, du pied du coteau au sommet.
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
    }

    return () => remises.forEach((r) => r());
  });

  // 6. Les images hors écran apparaissent en fondu quand elles arrivent.
  document.querySelectorAll<HTMLImageElement>(".photo img[loading='lazy']").forEach((img) => {
    if (img.complete) return;
    img.style.opacity = "0";
    const montrer = () => {
      img.style.transition = "opacity 600ms ease";
      img.style.opacity = "1";
    };
    img.addEventListener("load", montrer, { once: true });
    img.addEventListener("error", montrer, { once: true });
    nettoyages.push(() => {
      img.removeEventListener("load", montrer);
      img.removeEventListener("error", montrer);
      img.style.opacity = "";
      img.style.transition = "";
    });
  });

  return () => {
    mm.revert();
    nettoyages.forEach((n) => n());
  };
}

export function Mouvement() {
  const chemin = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    let defaire: (() => void) | null = null;
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
      defaire?.();
      defaire = null;
    };

    const lancer = async () => {
      arreter();
      const moi = ++jeton;
      if (!html.classList.contains("motion")) return;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (moi !== jeton || !html.classList.contains("motion")) return;
        gsap.registerPlugin(ScrollTrigger);
        defaire = installer(gsap, ScrollTrigger);
      } catch {
        // Bibliothèque indisponible : on repasse en version sans animation.
        html.classList.remove("motion");
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

    return () => {
      jeton++;
      if (avecRepos) window.cancelIdleCallback(differe);
      else window.clearTimeout(differe);
      arreter();
      observateur?.disconnect();
      window.removeEventListener(EVENEMENT, changement);
      media.removeEventListener("change", systeme);
    };
  }, [chemin]);

  return null;
}
