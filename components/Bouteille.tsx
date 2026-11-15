// ═══════════════════════════════════════════════════════════════════
// Une bouteille, dessinée en code.
//
// Aucune photo de bouteille : l'étiquette d'un domaine fictif n'existe
// pas. La silhouette est celle des bouteilles de la vallée du Rhône, à
// épaules tombantes. Le texte de l'étiquette est du vrai texte, il reste
// net à toutes les tailles.
// ═══════════════════════════════════════════════════════════════════

type Props = {
  /** Le nom de la cuvée, sur deux lignes. */
  etiquette: [string, string];
  cepage: string;
  domaine: string;
  capsule: string;
  /** Description lue par les lecteurs d'écran. */
  titre: string;
};

const VERRE =
  "M 66 4 h 28 a 4 4 0 0 1 4 4 v 14 h -4 v 92 c 0 44 52 56 52 110 v 214 a 12 12 0 0 1 -12 12 h -108 a 12 12 0 0 1 -12 -12 v -214 c 0 -54 52 -66 52 -110 v -92 h -4 v -14 a 4 4 0 0 1 4 -4 z";
const CAPSULE = "M 62 8 a 4 4 0 0 1 4 -4 h 28 a 4 4 0 0 1 4 4 v 14 h -4 v 66 h -28 v -66 h -4 z";

export function Bouteille({ etiquette, cepage, domaine, capsule, titre }: Props) {
  return (
    <svg className="bouteille" viewBox="0 0 160 456" role="img" aria-label={titre}>
      <path d={VERRE} fill="#0F090D" stroke="#6F6468" />
      <path d={CAPSULE} fill={capsule} />
      <rect x="14.5" y="262" width="131" height="136" fill="#EBE3D5" />
      <text x="80" y="304" textAnchor="middle" className="bouteille__nom">
        {etiquette[0]}
      </text>
      <text x="80" y="328" textAnchor="middle" className="bouteille__nom">
        {etiquette[1]}
      </text>
      <line x1="66" y1="343" x2="94" y2="343" stroke="#1A1016" />
      <text x="80" y="362" textAnchor="middle" className="bouteille__cepage">
        {cepage}
      </text>
      <text x="80" y="384" textAnchor="middle" className="bouteille__domaine">
        {domaine}
      </text>
    </svg>
  );
}
