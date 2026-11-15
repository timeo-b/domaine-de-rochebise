import type { Metadata } from "next";
import { Domaine } from "@/components/pages/Domaine";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("en", "domaine", pages("en").domaine.meta);

export default function Page() {
  return <Domaine langue="en" />;
}
