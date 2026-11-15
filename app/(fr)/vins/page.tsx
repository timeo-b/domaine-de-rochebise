import type { Metadata } from "next";
import { Vins } from "@/components/pages/Vins";
import { PAGES } from "@/content/pages-fr";

export const metadata: Metadata = { title: PAGES.vins.meta.titre, description: PAGES.vins.meta.description };

export default function Page() {
  return <Vins />;
}
