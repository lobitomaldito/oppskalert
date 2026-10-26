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
