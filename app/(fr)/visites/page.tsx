import type { Metadata } from "next";
import { Visites } from "@/components/pages/Visites";
import { PAGES } from "@/content/pages-fr";

export const metadata: Metadata = { title: PAGES.visites.meta.titre, description: PAGES.visites.meta.description };

export default function Page() {
  return <Visites />;
}
