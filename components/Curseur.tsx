"use client";

import { useEffect, useRef } from "react";
import { EVENEMENT } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════
// Un anneau discret qui suit la souris, sur ordinateur seulement.
//
// Le vrai curseur reste affiché : l'anneau est un ornement, il ne
// remplace rien et ne gêne ni le clavier ni les lecteurs d'écran. Il
// s'agrandit au survol d'un lien ou d'un bouton. Absent sur écran
// tactile, et dès que les animations sont coupées.
// ═══════════════════════════════════════════════════════════════════

export function Curseur() {
  const anneau = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = anneau.current;
    const html = document.documentElement;
    const souris = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!el) return;

    let image = 0;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let actif = false;

    const suivre = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      image = Math.abs(x - cx) + Math.abs(y - cy) > 0.2 ? requestAnimationFrame(suivre) : 0;
    };
    const bouge = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!el.classList.contains("est-visible")) {
        cx = x;
        cy = y;
        el.classList.add("est-visible");
      }
      el.classList.toggle("est-sur-lien", Boolean((e.target as Element | null)?.closest?.("a, button, select, input, textarea, label")));
      if (!image) image = requestAnimationFrame(suivre);
    };
    const sort = () => el.classList.remove("est-visible");

    const regler = () => {
      const voulu = souris.matches && html.classList.contains("motion");
      if (voulu === actif) return;
      actif = voulu;
      if (voulu) {
        window.addEventListener("pointermove", bouge, { passive: true });
        document.addEventListener("pointerleave", sort);
      } else {
        window.removeEventListener("pointermove", bouge);
        document.removeEventListener("pointerleave", sort);
        cancelAnimationFrame(image);
        image = 0;
        sort();
      }
    };
    regler();
    window.addEventListener(EVENEMENT, regler);
    souris.addEventListener("change", regler);
    return () => {
      window.removeEventListener(EVENEMENT, regler);
      souris.removeEventListener("change", regler);
      window.removeEventListener("pointermove", bouge);
      document.removeEventListener("pointerleave", sort);
      cancelAnimationFrame(image);
    };
  }, []);

  return <div ref={anneau} className="curseur" aria-hidden="true" />;
}
