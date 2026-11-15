import Link from "next/link";
import { Photo } from "@/components/Photo";
import { PAGES } from "@/content/pages-fr";
import { ROUTES } from "@/content/site";
import { Tete } from "./Tete";

const t = PAGES.domaine;

export function Domaine() {
  return (
    <article className="page" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} chapeau={t.chapeau} />

      <div className="duo">
        <div className="texte" data-entree>
          {t.histoire.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <figure className="duo__image" data-entree>
          <div className="cadre cadre--portrait">
            <Photo nom="lieu" alt={t.altLieu} sizes="(min-width: 900px) 34vw, 90vw" />
          </div>
        </figure>
      </div>

      <section className="page__section" aria-labelledby="generations">
        <h2 id="generations" className="chapitre__nom">
          {t.generationsTitre}
        </h2>
        <ol className="generations">
          {t.generations.map((g, i) => (
            <li key={g.prenom} data-entree>
              <span className="generations__rang" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{g.prenom}</h3>
              <p>{g.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="page__section" aria-labelledby="chiffres">
        <h2 id="chiffres" className="chapitre__nom">
          {t.chiffresTitre}
        </h2>
        <ul className="chiffres">
          {t.chiffres.map((c) => (
            <li key={c.unite} data-entree>
              <p className="chiffres__valeur">
                {c.valeur} <span>{c.unite}</span>
              </p>
              <p>{c.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="page__section duo duo--inverse" aria-labelledby="travail">
        <figure className="duo__image" data-entree>
          <div className="cadre cadre--paysage">
            <Photo nom="cave" alt={t.altCave} sizes="(min-width: 900px) 46vw, 90vw" />
          </div>
        </figure>
        <div>
          <h2 id="travail" className="phrase page__sous-titre">
            {t.travailTitre.join(" ")}
          </h2>
          <div className="texte" data-entree>
            {t.travail.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <Link className="lien" href={ROUTES.fr.visites}>
                {t.suite}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
