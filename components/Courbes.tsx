// Les courbes de niveau du coteau : la signature graphique du site.
// Purement décoratives, donc cachées aux lecteurs d'écran.

const LIGNES: [string, boolean][] = [
  ["M 522 -20 C 470 150, 380 260, 366 410 S 430 660, 380 820", true],
  ["M 478 -20 C 426 150, 342 262, 324 410 S 382 664, 336 820", false],
  ["M 438 -20 C 386 150, 296 260, 282 410 S 346 660, 296 820", false],
  ["M 402 -20 C 354 146, 256 262, 246 410 S 314 656, 260 820", false],
  ["M 370 -20 C 318 150, 228 260, 214 410 S 278 660, 228 820", true],
  ["M 338 -20 C 286 150, 196 260, 182 410 S 246 660, 196 820", false],
  ["M 302 -20 C 246 154, 164 256, 148 410 S 206 664, 160 820", false],
  ["M 260 -20 C 208 150, 118 260, 104 410 S 168 660, 118 820", false],
  ["M 212 -20 C 164 148, 66 264, 56 410 S 124 656, 70 820", true],
  ["M 158 -20 C 106 150, 16 260, 2 410 S 66 660, 16 820", false],
];

export function Courbes({ className }: { className?: string }) {
  return (
    <svg
      className={["courbes", className].filter(Boolean).join(" ")}
      viewBox="0 0 540 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {LIGNES.map(([d, maitresse]) => (
        <path key={d} d={d} fill="none" stroke="currentColor" opacity={maitresse ? 0.7 : 0.34} />
      ))}
    </svg>
  );
}
