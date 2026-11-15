import type { Metadata } from "next";
import { Domaine } from "@/components/pages/Domaine";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("fr", "domaine", pages("fr").domaine.meta);

export default function Page() {
  return <Domaine langue="fr" />;
}
