import type { Metadata } from "next";
import { Visites } from "@/components/pages/Visites";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("fr", "visites", pages("fr").visites.meta);

export default function Page() {
  return <Visites langue="fr" />;
}
