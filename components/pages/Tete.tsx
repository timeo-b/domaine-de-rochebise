import "@/components/accueil/accueil.css";
import "./pages.css";

// L'en-tête commun des pages intérieures : nom de la page, grand titre, chapeau.
type Props = { id: string; nom: string; titre: readonly string[]; chapeau?: string };

export function Tete({ id, nom, titre, chapeau }: Props) {
  return (
    <header className="page__tete">
      <p className="chapitre__nom">{nom}</p>
      <h1 id={id} className="phrase page__titre" data-lignes>
        {titre.map((ligne, i) => (
          <span key={ligne} className="ligne" style={{ "--i": i } as React.CSSProperties}>
            <span className="ligne__in">{ligne}</span>{" "}
          </span>
        ))}
      </h1>
      {chapeau ? <p className="page__chapeau">{chapeau}</p> : null}
    </header>
  );
}
