import type { Metadata } from "next";
import { Mentions } from "@/components/pages/Mentions";
import { pages } from "@/content/pages";
import { meta } from "@/lib/meta";

export const metadata: Metadata = meta("en", "mentions", pages("en").mentions.meta);

export default function Page() {
  return <Mentions langue="en" />;
}
