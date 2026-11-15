import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionnaire } from "@/content/fr";
import { ROUTES, SITE, type Langue } from "@/content/site";
import { BasculeAnimations } from "./BasculeAnimations";
import { Entete } from "./Entete";
import { Mouvement } from "./Mouvement";

// ═══════════════════════════════════════════════════════════════════
// Ce qui entoure chaque page : lien d'évitement, bandeau de
// démonstration, en-tête, pied de page.
//
// Le bandeau est permanent et placé tôt dans la page : un lecteur
// d'écran apprend dès le début que le domaine est fictif.
// ═══════════════════════════════════════════════════════════════════

type Props = { langue: Langue; t: Dictionnaire["commun"]; children: ReactNode };

export function Coquille({ langue, t, children }: Props) {
  const r = ROUTES[langue];
  const liens = t.nav.map((n) => ({ href: r[n.cle], libelle: n.libelle }));

  return (
    <>
      <a className="evitement" href="#contenu" data-hors-menu>
        {t.evitement}
      </a>

      <aside className="bandeau" aria-label={t.bandeau.etiquette} data-hors-menu>
        <p>
          {t.bandeau.texte} <a href={SITE.agence.url}>{SITE.agence.nom}</a>. {t.bandeau.suite}
        </p>
      </aside>

      <Entete
        nom={SITE.nom}
        accueil={r.accueil}
        liens={liens}
        libelles={{ navigation: t.navigation, menu: t.menu, fermer: t.fermer }}
      />

      <main id="contenu" tabIndex={-1} data-hors-menu>
        <span className="repere-haut" data-haut aria-hidden="true" />
        {children}
      </main>

      <footer className="pied" data-hors-menu>
        <div className="pied__interieur">
          <div className="pied__domaine">
            <p className="pied__nom">{SITE.nom}</p>
            <p>
              {t.pied.adresse} <span className="pied__note">{t.pied.adresseNote}</span>
            </p>
          </div>

          <nav aria-label={t.pied.liens}>
            <ul className="pied__liens">
              {liens.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.libelle}</Link>
                </li>
              ))}
              <li>
                <Link href={r.mentions}>{t.pied.mentions}</Link>
              </li>
            </ul>
          </nav>

          <div className="pied__legal">
            <p>{t.pied.rappel}</p>
            <p>{t.pied.sanitaire}</p>
            <p>{t.pied.mineurs}</p>
          </div>
        </div>

        <div className="pied__bas">
          <BasculeAnimations libelles={t.pied.animations} noteSysteme={t.pied.animations.systeme} />
          <p>
            {t.pied.signature.avant} <a href={SITE.agence.url}>{SITE.agence.nom}</a>
            {t.pied.signature.apres}
          </p>
        </div>
      </footer>

      <Mouvement />
    </>
  );
}
