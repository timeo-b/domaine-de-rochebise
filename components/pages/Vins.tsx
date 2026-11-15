import Link from "next/link";
import { Bouteille } from "@/components/Bouteille";
import { cuvees, euros, pages, type CuveeComplete } from "@/content/pages";
import { ROUTES, SITE, type Langue } from "@/content/site";
import { Tete } from "./Tete";

export function Vins({ langue }: { langue: Langue }) {
  const t = pages(langue).vins;
  const CUVEES = cuvees(langue);
  const r = ROUTES[langue];
  return (
    <article className="page" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} chapeau={t.chapeau} />
      <ul className="gamme">
        {CUVEES.map((c) => (
          <li key={c.slug} className="gamme__vin" data-entree style={{ "--teinte": c.teinte } as React.CSSProperties}>
            <div className="gamme__bouteille">
              <Bouteille etiquette={c.etiquette} cepage={c.cepage} domaine={SITE.court.toUpperCase()} capsule={c.capsule} titre={`${t.bouteilleAlt} ${c.nom}`} />
            </div>
            <div className="gamme__texte">
              <p className="gamme__couleur">
                {c.couleur}, {c.millesime}
              </p>
              <h2 className="gamme__nom">{c.nom}</h2>
              <p className="gamme__cepage">{c.cepage}</p>
              <p>{c.notes}</p>
              <p className="gamme__prix">{euros(c.prix, langue)}</p>
              <p>
                <Link className="lien" href={`${r.vins}/${c.slug}`}>
                  {t.voir} <span className="sr-only">{c.nom}</span>
                </Link>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="page__note">{t.note}</p>
    </article>
  );
}

export function FicheVin({ cuvee, langue }: { cuvee: CuveeComplete; langue: Langue }) {
  const t = pages(langue).vins;
  const r = ROUTES[langue];
  const f = t.fiche;
  const autres = cuvees(langue).filter((c) => c.slug !== cuvee.slug);
  return (
    <article className="page fiche" aria-labelledby="page-titre" style={{ "--teinte": cuvee.teinte } as React.CSSProperties}>
      <div className="fiche__grille">
        <div className="fiche__bouteille">
          <Bouteille etiquette={cuvee.etiquette} cepage={cuvee.cepage} domaine={SITE.court.toUpperCase()} capsule={cuvee.capsule} titre={`${t.bouteilleAlt} ${cuvee.nom}`} />
        </div>
        <div>
          <p className="chapitre__nom">
            {cuvee.couleur}, {cuvee.millesime}
          </p>
          <h1 id="page-titre" className="phrase page__titre">
            {cuvee.nom}
          </h1>
          <p className="page__chapeau">{cuvee.recit}</p>
          <dl className="fiche__liste">
            {(
              [
                [f.cepage, cuvee.cepage],
                [f.parcelle, cuvee.parcelle],
                [f.elevage, cuvee.elevage],
                [f.garde, cuvee.garde],
                [f.table, cuvee.table],
              ] as const
            ).map(([terme, valeur]) => (
              <div key={terme}>
                <dt>{terme}</dt>
                <dd>{valeur}</dd>
              </div>
            ))}
          </dl>
          <p className="fiche__prix">
            <strong>{euros(cuvee.prix, langue)}</strong> {f.bouteille}
          </p>
          <div className="actions">
            <Link className="bouton" href={r.boutique}>
              {f.acheter}
            </Link>
            <Link className="lien" href={r.vins}>
              {f.retour}
            </Link>
          </div>
          <p className="page__note">{t.note}</p>
        </div>
      </div>
      <nav className="fiche__autres" aria-label={f.autres}>
        <h2 className="chapitre__nom">{f.autres}</h2>
        <ul>
          {autres.map((c) => (
            <li key={c.slug}>
              <Link href={`${r.vins}/${c.slug}`}>
                <span className="fiche__autre-nom">{c.nom}</span>
                <span>
                  {c.couleur}, {c.cepage}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
