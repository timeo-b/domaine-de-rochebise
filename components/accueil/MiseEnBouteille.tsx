import Link from "next/link";
import { SITE } from "@/content/site";

// ═══════════════════════════════════════════════════════════════════
// La mise en bouteille : une scène qui reste en place pendant que l'on
// défile. Le verre se dessine, le vin monte, le bouchon descend,
// l'étiquette s'enroule, puis la bouteille tourne. Le texte, à côté,
// change à chaque temps.
//
// La bouteille est dessinée en code (SVG) : aucune photo, aucun fichier
// lourd. À plat (sans animation), on voit la bouteille finie et les cinq
// textes à la suite. Le mouvement est réglé dans components/Mouvement.tsx.
// ═══════════════════════════════════════════════════════════════════

export type EtapeMise = { titre: string; texte: string };

type Props = {
  t: { nom: string; description: string; etapes: readonly EtapeMise[]; lien: string; cuvee: string; cepage: string; dos: readonly string[] };
  href: string;
};

const VERRE =
  "M86 40 H114 V165 C114 215 160 225 160 285 V545 Q160 565 140 565 H60 Q40 565 40 545 V285 C40 225 86 215 86 165 Z";

export function MiseEnBouteille({ t, href }: Props) {
  return (
    <section className="mise" aria-labelledby="mise-nom" data-mise>
      <div className="mise__scene">
        <div className="mise__dessin">
          <svg viewBox="0 0 200 600" role="img" aria-label={t.description} data-mise-bouteille>
            <defs>
              <clipPath id="mise-verre">
                <path d={VERRE} />
              </clipPath>
              <clipPath id="mise-etiquette">
                <rect x="40" y="335" width="120" height="160" data-mise-masque />
              </clipPath>
              <linearGradient id="mise-ombre" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.62" />
                <stop offset="0.22" stopColor="#000" stopOpacity="0.08" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="0.78" stopColor="#000" stopOpacity="0.1" />
                <stop offset="1" stopColor="#000" stopOpacity="0.66" />
              </linearGradient>
            </defs>

            <g clipPath="url(#mise-verre)">
              <rect x="40" y="40" width="120" height="530" fill="#ebe3d5" opacity="0.07" />
              <rect x="40" y="96" width="120" height="474" fill="#2b0c17" data-mise-vin />
              <rect x="90" y="44" width="20" height="40" rx="2" fill="#c9a97a" data-mise-bouchon />
              <g clipPath="url(#mise-etiquette)">
                <g data-mise-bande>
                  <rect x="40" y="335" width="240" height="160" fill="#ebe3d5" />
                  <line x1="56" x2="144" y1="352" y2="352" stroke="#8c3246" strokeWidth="1.5" />
                  <text x="100" y="402" textAnchor="middle" className="mise__nom">
                    {t.cuvee}
                  </text>
                  <text x="100" y="428" textAnchor="middle" className="mise__petit">
                    {t.cepage}
                  </text>
                  <text x="100" y="476" textAnchor="middle" className="mise__domaine">
                    {SITE.court.toUpperCase()}
                  </text>
                  <line x1="160" x2="160" y1="335" y2="495" stroke="#b3a9a8" strokeWidth="0.75" />
                  {t.dos.map((ligne, i) => (
                    <text key={ligne} x="220" y={382 + i * 20} textAnchor="middle" className="mise__petit">
                      {ligne}
                    </text>
                  ))}
                </g>
              </g>
              <rect x="40" y="40" width="120" height="530" fill="url(#mise-ombre)" />
              <rect x="52" y="250" width="7" height="290" rx="3.5" fill="#fff" opacity="0.16" data-mise-reflet />
            </g>
            <path d={VERRE} fill="none" stroke="#ebe3d5" strokeOpacity="0.55" strokeWidth="1.5" pathLength={1} data-mise-trait />
            <path d="M84 34 H116 V112 H84 Z" fill="#8c3246" data-mise-capsule />
          </svg>
        </div>

        <div className="mise__textes">
          <h2 id="mise-nom" className="chapitre__nom">
            {t.nom}
          </h2>
          <ol className="mise__etapes">
            {t.etapes.map((e, i) => (
              <li key={e.titre} className="mise__etape" data-mise-etape>
                <p className="mise__titre">{e.titre}</p>
                <p className="mise__texte">{e.texte}</p>
                {i === t.etapes.length - 1 ? (
                  <p className="mise__lien">
                    <Link className="lien" href={href}>
                      {t.lien}
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
