import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FicheVin } from "@/components/pages/Vins";
import { CUVEES } from "@/content/pages-fr";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CUVEES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cuvee = CUVEES.find((c) => c.slug === slug);
  if (!cuvee) return {};
  return { title: `${cuvee.nom}, ${cuvee.cepage}`, description: `${cuvee.recit} Cuvée fictive, exemple de site réalisé par Nexura.` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cuvee = CUVEES.find((c) => c.slug === slug);
  if (!cuvee) notFound();
  return <FicheVin cuvee={cuvee} />;
}
