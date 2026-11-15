import { PAGES } from "@/content/pages-fr";
import { Tete } from "./Tete";

const t = PAGES.mentions;

export function Mentions() {
  return (
    <article className="page page--etroite" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} />
      {t.sections.map((s) => (
        <section key={s.titre} className="mentions__section">
          <h2>{s.titre}</h2>
          {s.textes.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {"lien" in s ? (
            <p>
              <a className="lien" href={s.lien.href}>
                {s.lien.libelle}
              </a>
            </p>
          ) : null}
        </section>
      ))}
    </article>
  );
}
