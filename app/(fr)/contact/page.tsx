import type { Metadata } from "next";
import { Contact } from "@/components/pages/Contact";
import { PAGES } from "@/content/pages-fr";

export const metadata: Metadata = { title: PAGES.contact.meta.titre, description: PAGES.contact.meta.description };

export default function Page() {
  return <Contact />;
}
