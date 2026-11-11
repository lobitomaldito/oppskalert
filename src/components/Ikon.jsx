/* Ikoner fra Lucide, hentet med ~/.claude/assets/ikoner/ikon.mjs
   (26.10.2026). Samme sett som lucide-react i Priser.jsx, så strek og
   hjørner stemmer på hele siden. Inline SVG, ingen kall ved sidelast.

   Størrelsen er 1em, så ikonet følger tekststørrelsen der det står.
   Fargen er currentColor. Ikonene er dekor: teksten ved siden av sier
   det samme, derfor aria-hidden. */
const Svg = ({ className, children }) => (
  <svg
    className={className ? `ikon ${className}` : 'ikon'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

// lucide/arrow-up-right
export const PilOpp = (p) => <Svg {...p}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Svg>;

// lucide/arrow-right
export const PilHoyre = (p) => <Svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>;

// lucide/monitor-smartphone
export const Skjermer = (p) => (
  <Svg {...p}>
    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
    <path d="M10 19v-3.96 3.15" />
    <path d="M7 19h5" />
    <rect width="6" height="10" x="16" y="12" rx="2" />
  </Svg>
);

// lucide/search-check
export const SokSjekk = (p) => (
  <Svg {...p}><path d="m8 11 2 2 4-4" /><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>
);

// lucide/pause
export const Pause = (p) => (
  <Svg {...p}><rect x="14" y="3" width="5" height="18" rx="1" /><rect x="5" y="3" width="5" height="18" rx="1" /></Svg>
);

// lucide/play
export const Spill = (p) => (
  <Svg {...p}><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></Svg>
);

// tabler/outline/brand-linkedin. Lucide har ingen merkeikoner. Tabler
// outline har samme strek (2) og runde ender, så det står likt ved siden av.
export const LinkedIn = (p) => (
  <Svg {...p}>
    <path d="M8 11v5" />
    <path d="M8 8v.01" />
    <path d="M12 16v-5" />
    <path d="M16 16v-3a2 2 0 1 0 -4 0" />
    <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
  </Svg>
);

/* Trygghetslisten på forsiden (11.11.2026). Samme Lucide-sett, hentet med
   ikon.mjs. */

// lucide/key-round
export const Nokkel = (p) => (
  <Svg {...p}>
    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
  </Svg>
);


// lucide/lock
export const Hengelas = (p) => (
  <Svg {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Svg>
);

// lucide/shield-check
export const SkjoldSjekk = (p) => (
  <Svg {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

// lucide/lock-open
export const HengelasApen = (p) => (
  <Svg {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></Svg>
);
