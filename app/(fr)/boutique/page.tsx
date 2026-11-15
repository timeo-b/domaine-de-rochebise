import type { Metadata } from "next";
import { PageEnAttente } from "@/components/PageEnAttente";
import { FR } from "@/content/fr";
import { ROUTES } from "@/content/site";

export const metadata: Metadata = { title: "Boutique" };

export default function Page() {
  const t = FR.commun.enAttente;
  return <PageEnAttente titre="Boutique" texte={t.texte} retour={t.retour} accueil={ROUTES.fr.accueil} />;
}
