import type { NextConfig } from "next";

// ═══════════════════════════════════════════════════════════════════
// En-têtes de sécurité et d'indexation.
//
// La politique de sécurité du contenu est strictement de même origine :
// polices et images sont servies par le site lui-même, aucun script
// tiers, aucune requête vers un autre domaine.
//
// 'unsafe-inline' reste nécessaire pour les scripts d'amorçage de
// Next.js et pour le petit script qui décide, avant le premier
// affichage, si les animations sont actives.
// ═══════════════════════════════════════════════════════════════════

const isDev = process.env.NODE_ENV === "development";

// La démo porte le nom d'un domaine fictif : elle ne doit pas apparaître
// dans Google. DEMO_INDEXABLE=1 ne sert qu'à mesurer le score SEO de
// Lighthouse en local, hors `noindex`.
const indexable = process.env.DEMO_INDEXABLE === "1";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Images et polices portent une empreinte dans leur nom : cache long.
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
