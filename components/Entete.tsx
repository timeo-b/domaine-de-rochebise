"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { equivalent, type Langue } from "@/content/site";

// ═══════════════════════════════════════════════════════════════════
// L'en-tête et le menu du téléphone.
//
// Le menu s'ouvre et se ferme au clavier, la touche Échap le ferme et
// rend le focus au bouton. Tant qu'il est ouvert, le reste de la page
// est rendu inerte : la tabulation reste dans le menu.
// ═══════════════════════════════════════════════════════════════════

type Lien = { href: string; libelle: string };

type Props = {
  nom: string;
  accueil: string;
  liens: Lien[];
  libelles: { navigation: string; menu: string; fermer: string };
  /** Le lien vers la même page dans l'autre langue. */
  autre: { libelle: string; description: string; lang: string };
};

export function Entete({ nom, accueil, liens, libelles, autre }: Props) {
  const courant = usePathname();
  // Un lien ordinaire, pas un lien interne : changer de langue recharge la page avec son propre gabarit.
  const langue = (
    <a className="entete__langue" href={equivalent(courant, autre.lang as Langue)} lang={autre.lang} hrefLang={autre.lang} aria-label={autre.description}>
      {autre.libelle}
    </a>
  );
  const [ouvert, setOuvert] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const panneau = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;

    const autres = Array.from(document.querySelectorAll<HTMLElement>("[data-hors-menu]"));
    autres.forEach((el) => {
      el.inert = true;
    });
    document.documentElement.classList.add("menu-ouvert");
    panneau.current?.querySelector<HTMLElement>("a")?.focus();

    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        bouton.current?.focus();
      }
    };
    // Si la fenêtre s'élargit, le menu du téléphone n'a plus lieu d'être.
    const large = window.matchMedia("(min-width: 900px)");
    const elargie = () => {
      if (large.matches) setOuvert(false);
    };

    document.addEventListener("keydown", touche);
    large.addEventListener("change", elargie);

    return () => {
      autres.forEach((el) => {
        el.inert = false;
      });
      document.documentElement.classList.remove("menu-ouvert");
      document.removeEventListener("keydown", touche);
      large.removeEventListener("change", elargie);
    };
  }, [ouvert]);

  return (
    <header className="entete" data-entete>
      <Link className="entete__nom" href={accueil} onClick={() => setOuvert(false)}>
        {nom}
      </Link>

      <nav className="entete__nav" aria-label={libelles.navigation}>
        <ul>
          {liens.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.libelle}</Link>
            </li>
          ))}
          <li>{langue}</li>
        </ul>
      </nav>

      <button
        ref={bouton}
        type="button"
        className="entete__bouton"
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
        onClick={() => setOuvert((o) => !o)}
      >
        {ouvert ? libelles.fermer : libelles.menu}
      </button>

      <div ref={panneau} id="menu-mobile" className="menu-mobile" hidden={!ouvert}>
        <nav aria-label={libelles.navigation}>
          <ul>
            {liens.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOuvert(false)}>
                  {l.libelle}
                </Link>
              </li>
            ))}
            <li>{langue}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
