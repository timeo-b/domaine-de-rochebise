import Link from "next/link";
import type { CSSProperties, ElementType } from "react";
import type { Dictionnaire } from "@/content/fr";
import { MiseEnBouteille } from "./MiseEnBouteille";
import { ROUTES, SITE, type Langue } from "@/content/site";
import { Bouteille } from "@/components/Bouteille";
import { Courbes } from "@/components/Courbes";
import { Photo, PrechargePhoto } from "@/components/Photo";
import "./accueil.css";

// ═══════════════════════════════════════════════════════════════════
// L'accueil : un récit qui se lit comme on monte au coteau.
//
// Le fleuve, le lieu, la vigne, la cave, les vins, la visite. L'altitude
// monte avec le défilement.
//
// Tout le contenu est dans la page dès le départ, dans l'ordre de
// lecture. Les animations ne font que le mettre en scène : sans elles,
// rien ne manque.
// ═══════════════════════════════════════════════════════════════════

const rang = (i: number) => ({ "--i": i }) as CSSProperties;

/** Un texte découpé en lignes, que l'animation révèle une à une. */
function Lignes({
  lignes,
  className,
  balise: Balise = "p",
  id,
}: {
  lignes: readonly string[];
  className: string;
  balise?: ElementType;
  id?: string;
}) {
  return (
    <Balise id={id} className={className} data-lignes>
      {lignes.map((ligne, i) => (
        <span className="ligne" key={ligne} style={rang(i)}>
          <span className="ligne__in">{ligne}</span>{" "}
        </span>
      ))}
    </Balise>
  );
}

type Props = { langue: Langue; t: Dictionnaire["accueil"] };

export function Accueil({ langue, t }: Props) {
  const r = ROUTES[langue];

  return (
    <>
      <PrechargePhoto nom="hero" />

      {/* ── Le fleuve : ouverture ─────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-titre" data-montee>
       <div className="hero__scene">
        <div className="hero__image" data-montee-image>
          <Photo nom="hero" alt={t.hero.alt} sizes="100vw" prioritaire />
        </div>
        <div className="hero__voile" data-montee-voile aria-hidden="true" />
        <div className="hero__contenu" data-montee-debut>
          <Lignes balise="h1" id="hero-titre" className="hero__titre" lignes={t.hero.titre} />
          <p className="hero__chapeau">{t.hero.chapeau}</p>
          <div className="actions hero__actions">
            <Link className="bouton" href={r.vins}>
              {t.hero.vins}
            </Link>
            <Link className="lien" href={r.visites}>
              {t.hero.visite}
            </Link>
          </div>
        </div>
        <div className="hero__pied" data-montee-debut>
          <a className="hero__suite" href="#lieu">
            {t.hero.suite}
          </a>
        </div>
        <div className="hero__temps" data-montee-temps>
          <p className="hero__phrase">
            {t.hero.murs.map((ligne) => (
              <span key={ligne} className="ligne">
                {ligne}{" "}
              </span>
            ))}
          </p>
        </div>
        <div className="hero__temps hero__temps--altitude" data-montee-temps>
          <p className="hero__chiffre">
            <span className="sr-only">{SITE.altitude.haut}</span>
            <span aria-hidden="true" data-montee-valeur>
              {SITE.altitude.haut}
            </span>
            <small>{t.altitude.unite}</small>
          </p>
          <p className="hero__legende">{t.hero.sommet}</p>
        </div>
       </div>
      </section>

      <MiseEnBouteille t={t.mise} href={r.vins} />

      {/* ── Le lieu ───────────────────────────────────────────────── */}
      <section id="lieu" className="chapitre lieu" aria-labelledby="lieu-nom" data-altitude-debut>
        <div className="chapitre__interieur lieu__grille">
          <div className="lieu__texte">
            <h2 id="lieu-nom" className="chapitre__nom">
              {t.lieu.nom}
            </h2>
            <Lignes className="phrase" lignes={t.lieu.phrase} />
            <div className="texte" data-entree>
              {t.lieu.textes.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>{t.lieu.altitudes}</p>
            </div>
            <p className="lieu__lien" data-entree>
              <Link className="lien" href={r.domaine}>
                {t.lieu.lien}
              </Link>
            </p>
          </div>
          <figure className="lieu__figure" data-entree>
            <Courbes className="lieu__courbes" />
            <div className="cadre cadre--portrait">
              <Photo nom="lieu" alt={t.lieu.alt} sizes="(min-width: 1440px) 480px, (min-width: 900px) 34vw, 78vw" parallaxe={6} />
            </div>
          </figure>
        </div>
      </section>

      {/* ── La vigne : l'image reste, les saisons passent ─────────── */}
      <section id="vigne" className="chapitre vigne" aria-labelledby="vigne-nom" data-altitude-fin>
        <div className="chapitre__interieur">
          <h2 id="vigne-nom" className="chapitre__nom">
            {t.vigne.nom}
          </h2>
          <Lignes className="phrase" lignes={t.vigne.phrase} />

          <div className="saisons" data-scene>
            {t.vigne.saisons.map((s, i) => (
              <div className="saison" key={s.saison}>
                <figure className={`saison__media${i === 0 ? " est-actif" : ""}`} data-media>
                  <div className="cadre">
                    <Photo nom={s.photo} alt={s.alt} sizes="(min-width: 1440px) 1200px, (min-width: 900px) 84vw, 91vw" />
                  </div>
                </figure>
                <div className={`saison__texte${i === 0 ? " est-actif" : ""}`} data-etape style={rang(i)}>
                  <p className="saison__saison">{s.saison}</p>
                  <h3 className="saison__titre">{s.titre}</h3>
                  <p>{s.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── La cave ───────────────────────────────────────────────── */}
      <section id="cave" className="pleine cave" aria-labelledby="cave-nom">
        <div className="pleine__image">
          <Photo nom="cave" alt={t.cave.alt} sizes="100vw" parallaxe={5} />
        </div>
        <div className="pleine__contenu cave__contenu">
          <h2 id="cave-nom" className="chapitre__nom">
            {t.cave.nom}
          </h2>
          <Lignes className="phrase" lignes={t.cave.phrase} />
          <p className="texte" data-entree>
            {t.cave.texte}
          </p>
        </div>
      </section>

      {/* ── Les vins : la bouteille reste, l'étiquette change ─────── */}
      <section id="vins" className="chapitre vins" aria-labelledby="vins-nom" data-scene>
        <div className="chapitre__interieur">
          <h2 id="vins-nom" className="chapitre__nom">
            {t.vins.nom}
          </h2>
          <Lignes className="phrase" lignes={t.vins.phrase} />
          <p className="texte" data-entree>
            {t.vins.intro}
          </p>

          <div className="cuvees" role="group" aria-label={t.vins.liste}>
            {t.vins.cuvees.map((c, i) => (
              <div className="cuvee" key={c.slug}>
                <div className={`cuvee__media${i === 0 ? " est-actif" : ""}`} data-media>
                  <Bouteille
                    etiquette={c.etiquette}
                    cepage={c.cepage}
                    domaine={SITE.nom}
                    capsule={c.capsule}
                    titre={`${t.vins.bouteille} ${c.nom}`}
                  />
                </div>
                <div
                  className={`cuvee__texte${i === 0 ? " est-actif" : ""}`}
                  data-etape
                  data-teinte={c.teinte}
                  style={rang(i)}
                >
                  <h3 className="cuvee__nom">{c.nom}</h3>
                  <p className="cuvee__cepage">{c.cepage}</p>
                  <p>{c.parcelle}</p>
                  <p>{c.notes}</p>
                  <p className="cuvee__lien">
                    <Link className="lien" href={`${r.vins}/${c.slug}`}>
                      {t.vins.voir}
                      <span className="sr-only"> {c.nom}</span>
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="vins__tous" data-entree>
            <Link className="bouton bouton--contour" href={r.vins}>
              {t.vins.tous}
            </Link>
          </p>
        </div>
      </section>

      {/* ── La visite ─────────────────────────────────────────────── */}
      <section id="visite" className="pleine visite" aria-labelledby="visite-nom">
        <div className="pleine__image">
          <Photo nom="visite" alt={t.visite.altVue} sizes="100vw" parallaxe={5} />
        </div>
        <div className="pleine__contenu visite__contenu">
          <div className="visite__texte">
            <h2 id="visite-nom" className="chapitre__nom">
              {t.visite.nom}
            </h2>
            <Lignes className="phrase" lignes={t.visite.phrase} />
            <p className="texte" data-entree>
              {t.visite.texte}
            </p>
            <div className="actions" data-entree>
              <Link className="bouton" href={r.visites}>
                {t.visite.reserver}
              </Link>
              <Link className="lien" href={r.contact}>
                {t.visite.venir}
              </Link>
            </div>
          </div>
          <figure className="visite__verres" data-entree>
            <div className="cadre cadre--paysage">
              <Photo nom="degustation" alt={t.visite.altVerres} sizes="(min-width: 1440px) 540px, (min-width: 900px) 37vw, 100vw" />
            </div>
          </figure>
        </div>
      </section>

      {/* Le compteur d'altitude. Décoratif : la même information est écrite
          en toutes lettres dans le chapitre « Le lieu ». */}
      <div className="altitude" data-altitude aria-hidden="true">
        <span className="altitude__valeur">
          <span data-altitude-valeur>{SITE.altitude.bas}</span> {t.altitude.unite}
        </span>
        <span className="altitude__legende">{t.altitude.legende}</span>
      </div>
    </>
  );
}
