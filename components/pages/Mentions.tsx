import { pages } from "@/content/pages";
import type { Langue } from "@/content/site";
import { Tete } from "./Tete";

export function Mentions({ langue }: { langue: Langue }) {
  const t = pages(langue).mentions;
  return (
    <article className="page page--etroite" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} />
      {t.sections.map((s) => (
        <section key={s.titre} className="mentions__section">
          <h2>{s.titre}</h2>
          {s.textes.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {"lien" in s && s.lien ? (
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
