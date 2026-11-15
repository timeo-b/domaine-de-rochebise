import type { Metadata } from "next";
import { Accueil } from "@/components/accueil/Accueil";
import { DonneesDomaine } from "@/components/Donnees";
import { FR } from "@/content/fr";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("fr", "accueil", FR.accueil.meta);

export default function Page() {
  return (
    <>
      <DonneesDomaine langue="fr" />
      <Accueil langue="fr" t={FR.accueil} />
    </>
  );
}
