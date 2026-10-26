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
        // Switzer til tekst, Cabinet Grotesk til overskrifter. Byttet fra
        // Suisse Int'l 26.10.2026, se SKRIFT øverst i src/index.css.
        body: ['Switzer', 'system-ui', 'sans-serif'],
        sans: ['Switzer', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Switzer', 'system-ui', 'sans-serif'],
        // GT Sectra Fine, bare for demosiden under /eksempler.
        serif: ['SectraFine', 'Georgia', 'serif'],
        // Ordmerket, og kun det. Plus Jakarta Sans 800.
        merke: ['Merke', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Skallet har tre radier, ikke seks: liten til klikkflater, kort til
      // kort og rammer, flate til store paneler. Piller bruker rounded-full.
      // 2xl/3xl/4xl står igjen fordi demosidene under /eksempler bruker dem
      // som sin egen stil, og de skal ikke arve skallets hjørner.
      borderRadius: {
        liten: '8px',
        kort: '14px',
        flate: '22px',
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
