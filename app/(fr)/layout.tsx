import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { VARIABLES_POLICES } from "../fonts";
import { Coquille } from "@/components/Coquille";
import { FR } from "@/content/fr";
import { SITE } from "@/content/site";
import { SCRIPT_AMORCE } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════
// Gabarit des pages françaises (lang="fr").
//
// `noindex` : le domaine est fictif, il ne doit pas apparaître dans les
// moteurs de recherche. L'en-tête X-Robots-Tag de next.config.ts dit la
// même chose.
// ═══════════════════════════════════════════════════════════════════

const indexable = process.env.DEMO_INDEXABLE === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: FR.accueil.meta.titre, template: `%s | ${SITE.nom}` },
  description: FR.accueil.meta.description,
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#1a1016", colorScheme: "dark" };

export default function Gabarit({ children }: { children: ReactNode }) {
  return (
    // La classe `motion` est ajoutée par le script ci-dessous, avant le premier
    // affichage : d'où suppressHydrationWarning sur <html>.
    <html lang="fr" className={VARIABLES_POLICES} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_AMORCE }} />
      </head>
      <body>
        <Coquille langue="fr" t={FR.commun}>
          {children}
        </Coquille>
      </body>
    </html>
  );
}
