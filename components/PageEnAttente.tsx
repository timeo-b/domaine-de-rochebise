import Link from "next/link";

// Page provisoire : seul l'accueil est construit à cette étape. Les
// autres pages arrivent après validation de l'accueil.

type Props = { titre: string; texte: string; retour: string; accueil: string };

export function PageEnAttente({ titre, texte, retour, accueil }: Props) {
  return (
    <section className="attente" aria-labelledby="attente-titre">
      <h1 id="attente-titre">{titre}</h1>
      <p>{texte}</p>
      <p>
        <Link className="lien" href={accueil}>
          {retour}
        </Link>
      </p>
    </section>
  );
}
