import { Photo } from "@/components/Photo";
import { euros, pages } from "@/content/pages";
import type { Langue } from "@/content/site";
import { Tete } from "./Tete";
import { Reservation } from "./Formulaires";

export function Visites({ langue }: { langue: Langue }) {
  const t = pages(langue).visites;
  return (
    <article className="page" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} chapeau={t.chapeau} />

      <section className="page__section" aria-labelledby="formules">
        <h2 id="formules" className="chapitre__nom">
          {t.formulesTitre}
        </h2>
        <ul className="formules">
          {t.formules.map((f) => (
            <li key={f.id} data-entree>
              <h3>{f.nom}</h3>
              <p className="formules__duree">{f.duree}</p>
              <p>{f.texte}</p>
              <p className="formules__prix">
                {euros(f.prix, langue)} <span>{t.parPersonne}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="duo page__section">
        <section aria-labelledby="pratique">
          <h2 id="pratique" className="chapitre__nom">
            {t.pratiqueTitre}
          </h2>
          <ul className="puces">
            {t.pratique.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <figure className="visites__image" data-entree>
            <div className="cadre cadre--paysage">
              <Photo nom="degustation" alt={t.alt} sizes="(min-width: 900px) 40vw, 90vw" />
            </div>
          </figure>
        </section>
        <section aria-labelledby="reservation" className="carte-form">
          <h2 id="reservation" className="carte-form__titre">
            {t.reservation.titre}
          </h2>
          <Reservation langue={langue} />
        </section>
      </div>
    </article>
  );
}
