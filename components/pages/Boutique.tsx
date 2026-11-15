"use client";

import { useEffect, useState } from "react";
import { Bouteille } from "@/components/Bouteille";
import { cuvees, euros as enEuros, pages } from "@/content/pages";
import { SITE, type Langue } from "@/content/site";

// ═══════════════════════════════════════════════════════════════════
// La boutique de démonstration.
//
// Le panier vit dans le navigateur du visiteur (stockage local) : il ne
// part vers aucun serveur. Aucune commande, aucun paiement.
// ═══════════════════════════════════════════════════════════════════

const CLE = "panier";
const PORT = 12;
type Panier = Record<string, number>;

export function Boutique({ langue }: { langue: Langue }) {
  const t = pages(langue).boutique;
  const CUVEES = cuvees(langue);
  const euros = (n: number) => enEuros(n, langue);
  const bouteilleAlt = pages(langue).vins.bouteilleAlt;
  const [panier, setPanier] = useState<Panier>({});
  const [annonce, setAnnonce] = useState("");
  const [commande, setCommande] = useState(false);

  // Le panier gardé sur l'appareil n'est lu qu'après l'affichage : le serveur n'en sait rien.
  useEffect(() => {
    try {
      const garde = JSON.parse(window.localStorage.getItem(CLE) || "{}") as Panier;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPanier(Object.fromEntries(Object.entries(garde).filter(([slug, n]) => cuvees("fr").some((c) => c.slug === slug) && Number.isInteger(n) && n > 0 && n <= 60)));
    } catch {
      // Stockage indisponible : le panier vaut pour la page en cours.
    }
  }, []);

  const changer = (slug: string, nom: string, ecart: number) => {
    setCommande(false);
    setPanier((avant) => {
      const n = Math.max(0, Math.min(60, (avant[slug] || 0) + ecart));
      const apres = { ...avant, [slug]: n };
      if (!n) delete apres[slug];
      try {
        window.localStorage.setItem(CLE, JSON.stringify(apres));
      } catch {}
      setAnnonce(t.ajoute(nom, n));
      return apres;
    });
  };

  const vider = () => {
    setPanier({});
    setCommande(false);
    try {
      window.localStorage.removeItem(CLE);
    } catch {}
    setAnnonce(t.vide);
  };

  const lignes = CUVEES.filter((c) => panier[c.slug]);
  const nombre = lignes.reduce((s, c) => s + panier[c.slug], 0);
  const sousTotal = lignes.reduce((s, c) => s + panier[c.slug] * c.prix, 0);
  const port = nombre >= 12 || nombre === 0 ? 0 : PORT;

  return (
    <div className="boutique">
      <p className="formulaire__demo">{t.demo}</p>
      <p className="sr-only" role="status">
        {annonce}
      </p>
      <div className="boutique__grille">
        <ul className="boutique__vins">
          {CUVEES.map((c) => {
            const n = panier[c.slug] || 0;
            return (
              <li key={c.slug} className="boutique__vin">
                <div className="boutique__bouteille">
                  <Bouteille etiquette={c.etiquette} cepage={c.cepage} domaine={SITE.court.toUpperCase()} capsule={c.capsule} titre={`${bouteilleAlt} ${c.nom}`} />
                </div>
                <div>
                  <h2 className="gamme__nom">{c.nom}</h2>
                  <p className="gamme__cepage">
                    {c.couleur}, {c.cepage}, {c.millesime}
                  </p>
                  <p className="gamme__prix">{euros(c.prix)}</p>
                  {n === 0 ? (
                    <button type="button" className="bouton bouton--contour" onClick={() => changer(c.slug, c.nom, 1)}>
                      {t.ajouter} <span className="sr-only">: {c.nom}</span>
                    </button>
                  ) : (
                    <div className="quantite" role="group" aria-label={`${t.quantite} : ${c.nom}`}>
                      <button type="button" onClick={() => changer(c.slug, c.nom, -1)} aria-label={`${t.retirerUne} ${c.nom}`}>
                        −
                      </button>
                      <span aria-hidden="true">{n}</span>
                      <button type="button" onClick={() => changer(c.slug, c.nom, 1)} aria-label={`${t.ajouterUne} ${c.nom}`}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <section className="panier carte-form" aria-labelledby="panier-titre">
          <h2 id="panier-titre" className="carte-form__titre">
            {t.panier}
          </h2>
          {nombre === 0 ? (
            <p>{t.vide}</p>
          ) : (
            <>
              <ul className="panier__lignes">
                {lignes.map((c) => (
                  <li key={c.slug}>
                    <span>
                      {c.nom} <span className="panier__nombre">× {panier[c.slug]}</span>
                    </span>
                    <span>{euros(panier[c.slug] * c.prix)}</span>
                  </li>
                ))}
              </ul>
              <dl className="panier__totaux">
                <div>
                  <dt>
                    {t.sousTotal}, {t.bouteilles(nombre)}
                  </dt>
                  <dd>{euros(sousTotal)}</dd>
                </div>
                <div>
                  <dt>{t.port}</dt>
                  <dd>{port ? euros(port) : t.portOffert}</dd>
                </div>
                <div className="panier__total">
                  <dt>{t.total}</dt>
                  <dd>{euros(sousTotal + port)}</dd>
                </div>
              </dl>
              <p className="champ__aide">{t.portNote}</p>
              <div className="actions">
                <button type="button" className="bouton" onClick={() => setCommande(true)}>
                  {t.commander}
                </button>
                <button type="button" className="lien panier__vider" onClick={vider}>
                  {t.vider}
                </button>
              </div>
              <p className="champ__aide">{t.majorite}</p>
              {commande ? (
                <div className="fin" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
                  <h3>{t.commandeTitre}</h3>
                  <p>{t.commande}</p>
                </div>
              ) : null}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
