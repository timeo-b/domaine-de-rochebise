import type { Metadata } from "next";
import { Boutique } from "@/components/pages/Boutique";
import { Tete } from "@/components/pages/Tete";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

const t = pages("fr").boutique;
export const metadata: Metadata = meta("fr", "boutique", t.meta);

export default function Page() {
  return (
    <article className="page" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} chapeau={t.chapeau} />
      <Boutique langue="fr" />
    </article>
  );
}
