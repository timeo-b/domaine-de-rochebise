import type { Metadata } from "next";
import { PageEnAttente } from "@/components/PageEnAttente";
import { FR } from "@/content/fr";
import { ROUTES } from "@/content/site";

export const metadata: Metadata = { title: "Le domaine" };

export default function Page() {
  const t = FR.commun.enAttente;
  return <PageEnAttente titre="Le domaine" texte={t.texte} retour={t.retour} accueil={ROUTES.fr.accueil} />;
}
