import type { Metadata } from "next";
import { Contact } from "@/components/pages/Contact";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("en", "contact", pages("en").contact.meta);

export default function Page() {
  return <Contact langue="en" />;
}
