// Fichier généré par scripts/images.mjs. Ne pas modifier à la main.

export type Declinaison = readonly (readonly [number, string])[];

export type PhotoTable = {
  largeur: number;
  hauteur: number;
  avif: Declinaison;
  webp: Declinaison;
  /** Aperçu de quelques octets, affiché pendant le chargement. */
  flou: string;
  portrait?: { largeur: number; hauteur: number; avif: Declinaison; webp: Declinaison };
};

export const PHOTOS = {
  "hero": {
    "largeur": 3200,
    "hauteur": 1566,
    "avif": [
      [
        640,
        "/images/hero-640.13f0d55f.avif"
      ],
      [
        960,
        "/images/hero-960.c6978571.avif"
      ],
      [
        1280,
        "/images/hero-1280.5b02b841.avif"
      ],
      [
        1920,
        "/images/hero-1920.8339713a.avif"
      ],
      [
        2560,
        "/images/hero-2560.5204eef7.avif"
      ]
    ],
    "webp": [
      [
        640,
        "/images/hero-640.a6ae7f5d.webp"
      ],
      [
        960,
        "/images/hero-960.510a4c3c.webp"
      ],
      [
        1280,
        "/images/hero-1280.db1278eb.webp"
      ],
      [
        1920,
        "/images/hero-1920.346ca1bd.webp"
      ],
      [
        2560,
        "/images/hero-2560.799497f4.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAwCdASoYAAwAPu1iqU2ppaOiMAgBMB2JYwCdACHZ41dXRcGSmvAAAP6gSKpQt2DfF1yfq4uOZuRlgbO9H6LJs+0qOAAA",
    "portrait": {
      "largeur": 1280,
      "hauteur": 1566,
      "avif": [
        [
          480,
          "/images/hero-portrait-480.e19be2be.avif"
        ],
        [
          720,
          "/images/hero-portrait-720.8f30aac6.avif"
        ],
        [
          1080,
          "/images/hero-portrait-1080.39acc651.avif"
        ]
      ],
      "webp": [
        [
          480,
          "/images/hero-portrait-480.ba11f548.webp"
        ],
        [
          720,
          "/images/hero-portrait-720.ccc39e2a.webp"
        ],
        [
          1080,
          "/images/hero-portrait-1080.ece833ff.webp"
        ]
      ]
    }
  },
  "lieu": {
    "largeur": 3200,
    "hauteur": 2388,
    "avif": [
      [
        480,
        "/images/lieu-480.09391136.avif"
      ],
      [
        720,
        "/images/lieu-720.4c148e38.avif"
      ],
      [
        960,
        "/images/lieu-960.e589d7c4.avif"
      ],
      [
        1440,
        "/images/lieu-1440.f8e4a36a.avif"
      ]
    ],
    "webp": [
      [
        480,
        "/images/lieu-480.346a1df2.webp"
      ],
      [
        720,
        "/images/lieu-720.c2625c00.webp"
      ],
      [
        960,
        "/images/lieu-960.e2d36b38.webp"
      ],
      [
        1440,
        "/images/lieu-1440.fb31b900.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAABwBACdASoYABIAPu1mqk2ppaQiMAgBMB2JZwC0NCHfzr08ymKCFHzd7hbcAAD+8NBjSph28BGOEra7ugASsjLyCbIRb2WaHEOJSrRiOwAAAA=="
  },
  "hiver": {
    "largeur": 2944,
    "hauteur": 1968,
    "avif": [
      [
        480,
        "/images/hiver-480.d5fb25c0.avif"
      ],
      [
        720,
        "/images/hiver-720.9221fc8e.avif"
      ],
      [
        960,
        "/images/hiver-960.ea668ea0.avif"
      ],
      [
        1440,
        "/images/hiver-1440.89785a85.avif"
      ]
    ],
    "webp": [
      [
        480,
        "/images/hiver-480.a1bf6b8a.webp"
      ],
      [
        720,
        "/images/hiver-720.f916da42.webp"
      ],
      [
        960,
        "/images/hiver-960.6d515840.webp"
      ],
      [
        1440,
        "/images/hiver-1440.80f425f0.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADwAwCdASoYABAAPu1iqk2ppaQiMAgBMB2JYwCdABX5rVbVcrn5wGgAAMLNVYzSCIjjVgctnNrbVdMzdfj63lUjaMusvqmKGPb/UHQlkLYqGV7wYwAAAA=="
  },
  "printemps": {
    "largeur": 2816,
    "hauteur": 1877,
    "avif": [
      [
        480,
        "/images/printemps-480.3c0688cf.avif"
      ],
      [
        720,
        "/images/printemps-720.385de0ad.avif"
      ],
      [
        960,
        "/images/printemps-960.2d78ca33.avif"
      ],
      [
        1440,
        "/images/printemps-1440.be483b0a.avif"
      ]
    ],
    "webp": [
      [
        480,
        "/images/printemps-480.5c35f7d4.webp"
      ],
      [
        720,
        "/images/printemps-720.f95ab641.webp"
      ],
      [
        960,
        "/images/printemps-960.e91ee4ad.webp"
      ],
      [
        1440,
        "/images/printemps-1440.caa65635.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACwAwCdASoYABAAPu1iqk4ppaQiMAgBMB2JQBdgA6et6oiDuBMAAAD+r3UCqQGiunJE7ahO9EzneMz3SZZncmhYvYDubHZ/ms/DtwwAAAA="
  },
  "ete": {
    "largeur": 3200,
    "hauteur": 1707,
    "avif": [
      [
        480,
        "/images/ete-480.242e26f5.avif"
      ],
      [
        720,
        "/images/ete-720.877794ef.avif"
      ],
      [
        960,
        "/images/ete-960.c6a1fe20.avif"
      ],
      [
        1440,
        "/images/ete-1440.ad7526d0.avif"
      ]
    ],
    "webp": [
      [
        480,
        "/images/ete-480.7c0b0999.webp"
      ],
      [
        720,
        "/images/ete-720.a01739f1.webp"
      ],
      [
        960,
        "/images/ete-960.7b96e671.webp"
      ],
      [
        1440,
        "/images/ete-1440.67e445bb.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAwCdASoYAA0APu1iqU2ppaOiMAgBMB2JZgCdACKqyu129tAygAD94lSHiacuSjDd+SfCphkDENnwd1xJY37mwoTEDbMZx+R+78EDzSGgAA=="
  },
  "automne": {
    "largeur": 2560,
    "hauteur": 1801,
    "avif": [
      [
        480,
        "/images/automne-480.6cf6bf93.avif"
      ],
      [
        720,
        "/images/automne-720.420c52fe.avif"
      ],
      [
        960,
        "/images/automne-960.d2561a6e.avif"
      ],
      [
        1440,
        "/images/automne-1440.9e83de59.avif"
      ]
    ],
    "webp": [
      [
        480,
        "/images/automne-480.c888e874.webp"
      ],
      [
        720,
        "/images/automne-720.18c145b0.webp"
      ],
      [
        960,
        "/images/automne-960.cb2beab1.webp"
      ],
      [
        1440,
        "/images/automne-1440.7805cba9.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQBACdASoYABEAPu1kq0+ppSOiMBgIATAdiUAWI9oYEGw/V8GrLu/szAZq+gAA/uk6Fl2oOrmRyn1jlHBeuSI3LMyMTUNcnOL9gKhOR1xHGKmdanf9snvqjfeWUhbdoxMpC9Y3w0IMQuoA"
  },
  "cave": {
    "largeur": 3200,
    "hauteur": 1920,
    "avif": [
      [
        640,
        "/images/cave-640.35fc1fc9.avif"
      ],
      [
        960,
        "/images/cave-960.fd902aa6.avif"
      ],
      [
        1280,
        "/images/cave-1280.c703c7c8.avif"
      ],
      [
        1920,
        "/images/cave-1920.5b32fd4f.avif"
      ],
      [
        2560,
        "/images/cave-2560.59ec5f1b.avif"
      ]
    ],
    "webp": [
      [
        640,
        "/images/cave-640.37009b5b.webp"
      ],
      [
        960,
        "/images/cave-960.cb33021c.webp"
      ],
      [
        1280,
        "/images/cave-1280.f40222a0.webp"
      ],
      [
        1920,
        "/images/cave-1920.8192459a.webp"
      ],
      [
        2560,
        "/images/cave-2560.e444645b.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAgCdASoYAA4APu1kqk4ppaQiMAgBMB2JZ2jZADe2AAD+8I3HglNsQtmg4+R+4dGAVCtC9AAAAA=="
  },
  "visite": {
    "largeur": 3200,
    "hauteur": 1546,
    "avif": [
      [
        640,
        "/images/visite-640.dee8653a.avif"
      ],
      [
        960,
        "/images/visite-960.b7bd2fd4.avif"
      ],
      [
        1280,
        "/images/visite-1280.d09b7b8f.avif"
      ],
      [
        1920,
        "/images/visite-1920.1c1a9434.avif"
      ],
      [
        2560,
        "/images/visite-2560.47fa1ad2.avif"
      ]
    ],
    "webp": [
      [
        640,
        "/images/visite-640.adfc7a8e.webp"
      ],
      [
        960,
        "/images/visite-960.f900fd09.webp"
      ],
      [
        1280,
        "/images/visite-1280.0720fc19.webp"
      ],
      [
        1920,
        "/images/visite-1920.deff8f96.webp"
      ],
      [
        2560,
        "/images/visite-2560.ccc4df45.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAwCdASoYAAwAPu1iqU2ppaOiMAgBMB2JYwCdABwufSGu38rpiSlAAMrgc7fROW54EfeNQodidaph6oCPI6xjLpttYTEY+qmAAA=="
  },
  "degustation": {
    "largeur": 2880,
    "hauteur": 1815,
    "avif": [
      [
        480,
        "/images/degustation-480.c0971da0.avif"
      ],
      [
        720,
        "/images/degustation-720.b3695988.avif"
      ],
      [
        960,
        "/images/degustation-960.66833ec2.avif"
      ],
      [
        1440,
        "/images/degustation-1440.e31910c6.avif"
      ]
    ],
    "webp": [
      [
        480,
        "/images/degustation-480.b2293422.webp"
      ],
      [
        720,
        "/images/degustation-720.675bf7e0.webp"
      ],
      [
        960,
        "/images/degustation-960.3a58713e.webp"
      ],
      [
        1440,
        "/images/degustation-1440.3388a4b9.webp"
      ]
    ],
    "flou": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAwCdASoYAA8APu1krU2ppaSiMAgBMB2JZQDImB3Fv57MaYuYgAD+5naq1QHsYW1dg/xk6qD9k1TvPtZL9GYoeZKUCAAA"
  }
} as const satisfies Record<string, PhotoTable>;

export type NomPhoto = keyof typeof PHOTOS;
