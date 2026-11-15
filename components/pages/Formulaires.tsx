"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { PAGES } from "@/content/pages-fr";

// ═══════════════════════════════════════════════════════════════════
// Les deux formulaires de démonstration : réservation et contact.
//
// Ils vérifient la saisie comme un vrai formulaire, puis s'arrêtent là :
// aucune requête ne part, rien n'est gardé, pas même dans le navigateur.
//
// Accessibilité : chaque champ a son étiquette, les erreurs sont
// résumées en tête avec un lien vers chaque champ, reliées au champ
// (aria-describedby) et annoncées ; le focus va au résumé, puis au
// message de fin.
// ═══════════════════════════════════════════════════════════════════

type Erreurs = Record<string, string>;
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Champ({ id, libelle, aide, erreur, children }: { id: string; libelle: string; aide?: string; erreur?: string; children: ReactNode }) {
  return (
    <div className="champ">
      <label htmlFor={id}>{libelle}</label>
      {aide ? (
        <p id={`${id}-aide`} className="champ__aide">
          {aide}
        </p>
      ) : null}
      {children}
      {erreur ? (
        <p id={`${id}-erreur`} className="champ__erreur">
          {erreur}
        </p>
      ) : null}
    </div>
  );
}

const decrit = (id: string, aide: boolean, erreur?: string) => [aide ? `${id}-aide` : "", erreur ? `${id}-erreur` : ""].filter(Boolean).join(" ") || undefined;

function Resume({ titre, erreurs, refResume }: { titre: string; erreurs: Erreurs; refResume: React.RefObject<HTMLDivElement | null> }) {
  const cles = Object.keys(erreurs);
  if (!cles.length) return null;
  return (
    <div className="resume" role="alert" tabIndex={-1} ref={refResume}>
      <p>{titre}</p>
      <ul>
        {cles.map((c) => (
          <li key={c}>
            <a href={`#${c}`}>{erreurs[c]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Fin({ titre, texte, bouton, surRetour }: { titre: string; texte: string; bouton: string; surRetour: () => void }) {
  return (
    <div className="fin" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
      <h3>{titre}</h3>
      <p>{texte}</p>
      <button type="button" className="bouton bouton--contour" onClick={surRetour}>
        {bouton}
      </button>
    </div>
  );
}

function useFormulaire(valider: (donnees: FormData) => Erreurs) {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [fini, setFini] = useState(false);
  const refResume = useRef<HTMLDivElement | null>(null);
  const soumettre = (evenement: FormEvent<HTMLFormElement>) => {
    evenement.preventDefault();
    const trouvees = valider(new FormData(evenement.currentTarget));
    setErreurs(trouvees);
    if (Object.keys(trouvees).length) {
      requestAnimationFrame(() => refResume.current?.focus());
      return;
    }
    // Démonstration : on s'arrête ici. Rien n'est envoyé ni conservé.
    setFini(true);
  };
  return { erreurs, fini, refResume, soumettre, recommencer: () => setFini(false) };
}

export function Reservation() {
  const t = PAGES.visites.reservation;
  const formules = PAGES.visites.formules;
  const f = useFormulaire((d) => {
    const e: Erreurs = {};
    const demain = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const date = String(d.get("date") || "");
    const personnes = Number(d.get("personnes"));
    if (!date || date < demain) e["res-date"] = t.erreurs.date;
    if (!Number.isInteger(personnes) || personnes < 2 || personnes > 10) e["res-personnes"] = t.erreurs.personnes;
    if (!String(d.get("nom") || "").trim()) e["res-nom"] = t.erreurs.nom;
    if (!COURRIEL.test(String(d.get("courriel") || "").trim())) e["res-courriel"] = t.erreurs.courriel;
    return e;
  });
  if (f.fini) return <Fin titre={t.succesTitre} texte={t.succes} bouton={t.recommencer} surRetour={f.recommencer} />;
  const e = f.erreurs;
  return (
    <form className="formulaire" noValidate onSubmit={f.soumettre}>
      <p className="formulaire__demo">{t.demo}</p>
      <p className="champ__aide">{t.intro}</p>
      <Resume titre={t.erreurs.resume} erreurs={e} refResume={f.refResume} />
      <Champ id="res-formule" libelle={t.formule}>
        <select id="res-formule" name="formule" defaultValue={formules[1].id}>
          {formules.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nom}, {o.duree}
            </option>
          ))}
        </select>
      </Champ>
      <div className="formulaire__rang">
        <Champ id="res-date" libelle={t.date} erreur={e["res-date"]}>
          <input id="res-date" name="date" type="date" required aria-invalid={e["res-date"] ? true : undefined} aria-describedby={decrit("res-date", false, e["res-date"])} />
        </Champ>
        <Champ id="res-personnes" libelle={t.personnes} aide={t.personnesAide} erreur={e["res-personnes"]}>
          <input id="res-personnes" name="personnes" type="number" inputMode="numeric" min={2} max={10} defaultValue={2} required aria-invalid={e["res-personnes"] ? true : undefined} aria-describedby={decrit("res-personnes", true, e["res-personnes"])} />
        </Champ>
      </div>
      <Champ id="res-nom" libelle={t.nom} erreur={e["res-nom"]}>
        <input id="res-nom" name="nom" type="text" autoComplete="name" required aria-invalid={e["res-nom"] ? true : undefined} aria-describedby={decrit("res-nom", false, e["res-nom"])} />
      </Champ>
      <Champ id="res-courriel" libelle={t.courriel} aide={t.courrielAide} erreur={e["res-courriel"]}>
        <input id="res-courriel" name="courriel" type="email" autoComplete="email" required aria-invalid={e["res-courriel"] ? true : undefined} aria-describedby={decrit("res-courriel", true, e["res-courriel"])} />
      </Champ>
      <Champ id="res-message" libelle={t.message}>
        <textarea id="res-message" name="message" rows={3} />
      </Champ>
      <button type="submit" className="bouton">
        {t.envoyer}
      </button>
    </form>
  );
}

export function Message() {
  const t = PAGES.contact.formulaire;
  const f = useFormulaire((d) => {
    const e: Erreurs = {};
    if (!String(d.get("nom") || "").trim()) e["msg-nom"] = t.erreurs.nom;
    if (!COURRIEL.test(String(d.get("courriel") || "").trim())) e["msg-courriel"] = t.erreurs.courriel;
    if (!String(d.get("message") || "").trim()) e["msg-message"] = t.erreurs.message;
    return e;
  });
  if (f.fini) return <Fin titre={t.succesTitre} texte={t.succes} bouton={t.recommencer} surRetour={f.recommencer} />;
  const e = f.erreurs;
  return (
    <form className="formulaire" noValidate onSubmit={f.soumettre}>
      <p className="formulaire__demo">{t.demo}</p>
      <p className="champ__aide">{t.intro}</p>
      <Resume titre={t.erreurs.resume} erreurs={e} refResume={f.refResume} />
      <Champ id="msg-nom" libelle={t.nom} erreur={e["msg-nom"]}>
        <input id="msg-nom" name="nom" type="text" autoComplete="name" required aria-invalid={e["msg-nom"] ? true : undefined} aria-describedby={decrit("msg-nom", false, e["msg-nom"])} />
      </Champ>
      <Champ id="msg-courriel" libelle={t.courriel} aide={t.courrielAide} erreur={e["msg-courriel"]}>
        <input id="msg-courriel" name="courriel" type="email" autoComplete="email" required aria-invalid={e["msg-courriel"] ? true : undefined} aria-describedby={decrit("msg-courriel", true, e["msg-courriel"])} />
      </Champ>
      <Champ id="msg-message" libelle={t.message} erreur={e["msg-message"]}>
        <textarea id="msg-message" name="message" rows={5} required aria-invalid={e["msg-message"] ? true : undefined} aria-describedby={decrit("msg-message", false, e["msg-message"])} />
      </Champ>
      <button type="submit" className="bouton">
        {t.envoyer}
      </button>
    </form>
  );
}
