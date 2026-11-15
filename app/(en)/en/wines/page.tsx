import type { Metadata } from "next";
import { Vins } from "@/components/pages/Vins";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("en", "vins", pages("en").vins.meta);

export default function Page() {
  return <Vins langue="en" />;
}
