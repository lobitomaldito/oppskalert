/** @type {import('tailwindcss').Config} */

// Fargene bor i src/index.css som "R G B"-tripler, så Tailwind kan sette
// alpha selv (bg-background/60, text-ink/70 osv.). Navnene under er de samme
// som før — background/surface/primary/accent/highlight — så eksisterende
// klasser fortsetter å virke. De semantiske (deep, room) er nye.
const tok = (v) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: tok('--bg'),
        deep: tok('--bg-deep'),
        surface: tok('--surface'),
        primary: tok('--ink'),
        ink: tok('--ink'),
        accent: tok('--signal'),
        highlight: tok('--signal-hi'),
        darkText: tok('--ink'),
        room: tok('--room'),
        'room-deep': tok('--room-deep'),
        'room-ink': tok('--room-ink'),
        'room-signal': tok('--room-signal'),
      },
      // Semantisk z-skala. Ingen vilkårlige 999/9999.
      zIndex: {
        nav: '50',
        meny: '40',
        flyt: '60',
      },
      fontFamily: {
        // To familier, ikke fire. Supreme bærer både brødtekst (font-body) og
        // strukturell UI (font-sans) — kontrasten mellom dem gjøres med VEKT,
        // ikke med enda en sans. Space Grotesk lå for nær Supreme i størrelse
        // og vekt: "Se arbeidet" ved siden av "Svar innen 24 timer" leste som
        // en feil, ikke som et valg.
        body: ['Supreme', 'system-ui', 'sans-serif'],
        sans: ['Supreme', 'system-ui', 'sans-serif'],
        // Display er den ene ekte kontrasten: mye tyngre, mye større.
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        // Sjeldent aksentgrep — kun i intake-flyten. Se Serif-Is-Sacred-regelen.
        serif: ['"DM Serif Display"', 'serif'],
        // Beholdt for demo-sidene under /eksempler, som har egen typografi.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
      transitionTimingFunction: {
        lett: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
