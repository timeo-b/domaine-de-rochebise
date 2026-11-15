import { PAGES } from "@/content/pages-fr";
import { Tete } from "./Tete";
import { Message } from "./Formulaires";

const t = PAGES.contact;

// Le plan est dessiné en code : il est fictif, comme l'adresse.
function Plan() {
  return (
    <figure className="plan">
      <svg viewBox="0 0 640 400" role="img" aria-label={t.carteAlt}>
        <rect width="640" height="400" fill="#2a1b25" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M ${250 + i * 62} 0 C ${210 + i * 62} 130 ${300 + i * 62} 260 ${240 + i * 62} 400`} fill="none" stroke="#c2a367" strokeOpacity={0.14 + i * 0.03} />
        ))}
        <path d="M 60 0 C 20 120 150 250 90 400 L 190 400 C 250 250 120 120 160 0 Z" fill="#3b2a3a" />
        <path d="M 196 0 C 160 120 286 250 226 400" fill="none" stroke="#b3a9a8" strokeWidth="3" />
        <path d="M 96 210 L 232 196" stroke="#b3a9a8" strokeWidth="5" />
        <path d="M 232 236 C 300 230 300 190 360 196 C 430 204 380 150 450 150 C 520 150 470 100 540 96" fill="none" stroke="#ebe3d5" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="300" cy="222" r="9" fill="#c2a367" />
        <circle cx="300" cy="222" r="16" fill="none" stroke="#c2a367" />
        <g className="plan__texte">
          <text x="112" y="330" transform="rotate(-72 112 330)">{t.carte.fleuve}</text>
          <text x="322" y="246">{t.carte.cave}</text>
          <text x="470" y="84">{t.carte.terrasses}</text>
          <text x="104" y="190">{t.carte.pont}</text>
        </g>
      </svg>
      <figcaption>{t.carteLegende}</figcaption>
    </figure>
  );
}

export function Contact() {
  return (
    <article className="page" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} chapeau={t.chapeau} />

      <div className="duo page__section">
        <div className="contact__infos">
          <section aria-labelledby="adresse">
            <h2 id="adresse" className="chapitre__nom">
              {t.adresseTitre}
            </h2>
            <address>
              {t.adresse.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p className="page__note">{t.adresseNote}</p>
          </section>
          <section aria-labelledby="horaires">
            <h2 id="horaires" className="chapitre__nom">
              {t.horairesTitre}
            </h2>
            <dl className="horaires">
              {t.horaires.map((h) => (
                <div key={h.jours}>
                  <dt>{h.jours}</dt>
                  <dd>{h.heures}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="acces">
            <h2 id="acces" className="chapitre__nom">
              {t.accesTitre}
            </h2>
            <ul className="puces">
              {t.acces.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        </div>
        <section aria-labelledby="ecrire" className="carte-form">
          <h2 id="ecrire" className="carte-form__titre">
            {t.formulaire.titre}
          </h2>
          <Message />
        </section>
      </div>

      <section className="page__section" aria-labelledby="plan">
        <h2 id="plan" className="chapitre__nom">
          {t.carteTitre}
        </h2>
        <Plan />
      </section>
    </article>
  );
}
