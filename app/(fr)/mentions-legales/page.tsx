import type { Metadata } from "next";
import { Mentions } from "@/components/pages/Mentions";
import { PAGES } from "@/content/pages-fr";

export const metadata: Metadata = { title: PAGES.mentions.meta.titre, description: PAGES.mentions.meta.description };

export default function Page() {
  return <Mentions />;
}
