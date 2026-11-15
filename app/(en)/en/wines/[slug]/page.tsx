import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DonneesVin } from "@/components/Donnees";
import { FicheVin } from "@/components/pages/Vins";
import { cuvees } from "@/content/pages";
import { meta } from "@/lib/meta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cuvees("en").map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cuvee = cuvees("en").find((c) => c.slug === slug);
  if (!cuvee) return {};
  return meta("en", "vins", { titre: `${cuvee.nom}, ${cuvee.cepage}`, description: `${cuvee.recit} Fictional cuvée, sample website made by Nexura.` }, slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cuvee = cuvees("en").find((c) => c.slug === slug);
  if (!cuvee) notFound();
  return (
    <>
      <DonneesVin langue="en" cuvee={cuvee} />
      <FicheVin cuvee={cuvee} langue="en" />
    </>
  );
}
