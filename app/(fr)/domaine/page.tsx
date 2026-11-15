import type { Metadata } from "next";
import { Domaine } from "@/components/pages/Domaine";
import { PAGES } from "@/content/pages-fr";

export const metadata: Metadata = { title: PAGES.domaine.meta.titre, description: PAGES.domaine.meta.description };

export default function Page() {
  return <Domaine />;
}
