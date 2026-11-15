import type { Metadata } from "next";
import { Boutique } from "@/components/pages/Boutique";
import { Tete } from "@/components/pages/Tete";
import { PAGES } from "@/content/pages-fr";

const t = PAGES.boutique;
export const metadata: Metadata = { title: t.meta.titre, description: t.meta.description };

export default function Page() {
  return (
    <article className="page" aria-labelledby="page-titre">
      <Tete id="page-titre" nom={t.nom} titre={t.titre} chapeau={t.chapeau} />
      <Boutique />
    </article>
  );
}
