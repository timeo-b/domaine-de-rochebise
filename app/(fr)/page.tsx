import { Accueil } from "@/components/accueil/Accueil";
import { FR } from "@/content/fr";

export default function PageAccueil() {
  return <Accueil langue="fr" t={FR.accueil} />;
}
