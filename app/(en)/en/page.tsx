import type { Metadata } from "next";
import { Accueil } from "@/components/accueil/Accueil";
import { DonneesDomaine } from "@/components/Donnees";
import { EN } from "@/content/en";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("en", "accueil", EN.accueil.meta);

export default function Page() {
  return (
    <>
      <DonneesDomaine langue="en" />
      <Accueil langue="en" t={EN.accueil} />
    </>
  );
}
