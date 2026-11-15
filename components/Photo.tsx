import { PHOTOS, type Declinaison, type NomPhoto } from "@/lib/images.gen";

// ═══════════════════════════════════════════════════════════════════
// Une photo du site.
//
// Les fichiers sont préparés à l'avance par scripts/images.mjs : AVIF
// pour les navigateurs récents, WebP pour les autres, en plusieurs
// largeurs. Le navigateur choisit le plus petit fichier suffisant.
//
// Largeur et hauteur sont toujours écrites, pour réserver la place avant
// l'arrivée de l'image : rien ne saute pendant le chargement.
// ═══════════════════════════════════════════════════════════════════

export const jeu = (d: Declinaison) => d.map(([largeur, fichier]) => `${fichier} ${largeur}w`).join(", ");

type Props = {
  nom: NomPhoto;
  alt: string;
  /** Place occupée à l'écran, pour que le navigateur choisisse le bon fichier. */
  sizes: string;
  /** Vrai pour l'image du premier écran : chargée tout de suite, en priorité. */
  prioritaire?: boolean;
  /** Amplitude de la parallaxe, en pourcentage de la hauteur. Absent : image fixe. */
  parallaxe?: number;
  className?: string;
};

export function Photo({ nom, alt, sizes, prioritaire = false, parallaxe, className }: Props) {
  const p = PHOTOS[nom];
  const portrait = "portrait" in p ? p.portrait : null;
  const repli = p.webp[Math.min(1, p.webp.length - 1)][1];

  return (
    <picture
      className={["photo", className].filter(Boolean).join(" ")}
      style={{ backgroundImage: `url(${p.flou})` }}
      data-parallaxe={parallaxe}
    >
      {portrait ? (
        <>
          <source
            media="(max-width: 700px)"
            type="image/avif"
            srcSet={jeu(portrait.avif)}
            sizes="100vw"
            width={portrait.largeur}
            height={portrait.hauteur}
          />
          <source
            media="(max-width: 700px)"
            type="image/webp"
            srcSet={jeu(portrait.webp)}
            sizes="100vw"
            width={portrait.largeur}
            height={portrait.hauteur}
          />
        </>
      ) : null}
      <source type="image/avif" srcSet={jeu(p.avif)} sizes={sizes} />
      {/* Images déjà optimisées et dimensionnées : le composant next/image n'apporterait rien ici. */}
      <img
        src={repli}
        srcSet={jeu(p.webp)}
        sizes={sizes}
        width={p.largeur}
        height={p.hauteur}
        alt={alt}
        loading={prioritaire ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={prioritaire ? "high" : "auto"}
      />
    </picture>
  );
}

/** Préchargement de l'image du premier écran, dans le bon format et la bonne taille. */
export function PrechargePhoto({ nom }: { nom: NomPhoto }) {
  const p = PHOTOS[nom];
  const portrait = "portrait" in p ? p.portrait : null;
  return (
    <>
      {portrait ? (
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet={jeu(portrait.avif)}
          imageSizes="100vw"
          media="(max-width: 700px)"
          fetchPriority="high"
        />
      ) : null}
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet={jeu(p.avif)}
        imageSizes="100vw"
        media={portrait ? "(min-width: 700.02px)" : undefined}
        fetchPriority="high"
      />
    </>
  );
}
