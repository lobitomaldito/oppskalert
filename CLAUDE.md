# Oppskalert

Aleksanders enmannsbyrå som bygger nettsider for norske småbedrifter. Dette
repoet er selskapets egen nettside, `oppskalert.no`.

Stack: Vite + React 19 + React Router + Tailwind, GSAP og three.js for
animasjon, Supabase for leads, PostHog for analyse. Hostet på Vercel.
Serverless-funksjoner ligger i `api/`.

## Dokumenter

| Fil | Hva |
| --- | --- |
| `PRODUCT.md` | Målgruppe, merkevarepersonlighet, anti-referanser |
| `DESIGN.md` | Designsystem og regler |
| `SEO.md` | Søkeordsdata, konkurrenter, backlinks, LLM-synlighet, handlingsliste |
| `content/BLOG-GENERATION.md` | Hvordan nye blogginnlegg lages og registreres |

`README.md` er ubrukt Vite-boilerplate. Ignorer den.

---

## Regler for tekst som går live

Disse er harde krav, ikke forslag. Feil her går rett ut på et kundevendt
nettsted.

- **Aldri tankestrek (—).** Bruk komma, kolon eller punktum. Dette er den
  klareste AI-tellen kunder legger merke til. Gjelder også kodekommentarer og
  commit-meldinger. Trenger norsk tekst en tankestrek, er riktig tegn en
  tankestrek med mellomrom rundt (–), men omskriving er nesten alltid bedre.
- **Aldri særskriving.** «Nettside pris» er feil selv om folk googler det slik.
  Bruk en preposisjon: «pris på nettside». Se SEO.md.
- **Jeg-form, aldri «vi».** Aleksander skriver selv. Byråtonen er en
  anti-referanse i PRODUCT.md.
- **Ingen navngitte konkurrenter** i løpetekst. Heller ikke i
  sammenligningsøyemed.
- **Konkrete tall, ikke adjektiver.** «Under ett sekund» slår «lynrask».
- **Aldri Google Fonts.** Fontene er selvhostet. Se den globale CLAUDE.md.

---

## Arkitektur: tre feller som har bitt før

### 1. Prerendering, ikke SSR

`scripts/prerender.mjs` kjører som `postbuild` og åpner hver rute i en headless
Chromium, så crawlere får ferdig HTML i stedet for `<div id="root"></div>`.

Det er bevisst **ikke** react-dom/server: kodebasen bruker ekte DOM-APIer (GSAP
ScrollTrigger, IntersectionObserver i `useReveal`, three.js-canvas) som en
Node-SSR ikke kan kjøre.

**Legger du til en rute, må den inn i `ROUTES` i `scripts/prerender.mjs` og i
`STATIC_PATHS` i `api/sitemap.xml.js`.** Glemmer du det, serverer Vercel
rot-`index.html` på ruten, altså forsidens innhold med forsidens title. For
Google ser den nye siden da ut som en duplikat av forsiden.

### 2. `import.meta.glob` finnes ikke i Node

`api/sitemap.xml.js` og `api/rss.xml.js` importerer `src/lib/articles.js`. De
kjører som vanlig Node på Vercel, ikke gjennom Vite. Bruker noe i den
importkjeden en Vite-byggtidsfunksjon, kaster modulen ved import og ruten dør
med 500.

Derfor er artikkelregisteret et vanlig ESM-modul i
`src/content/generated/index.js`, ikke en glob. Ikke bytt tilbake.

Test alltid slik etter endringer i den kjeden:

```bash
node --input-type=module -e "import('./src/lib/articles.js').then(m => console.log(m.articles.length))"
```

### 3. Bloggen er lokal nå

Innholdet ble hentet live fra Opinlys API. Det er migrert ut. Kildene er:

- `src/lib/articles.js` for de håndskrevne artiklene
- `src/content/generated/*.js` for genererte og migrerte, registrert i
  `index.js` i samme mappe

`scripts/migrate-opinly.mjs` er engangsskriptet som hentet dem ut. Det virker
fortsatt så lenge abonnementet lever, men henter kun **publiserte** innlegg.

### Den ukentlige bloggrutinen

En cloud routine («Oppskalert weekly blog post», `trig_014HWWNU4oTUDDB6UQwiDn64`)
kjører mandager og torsdager kl. 07 UTC. Den tar neste emne fra
`content/blog-queue.json`, skriver artikkelen etter reglene i
`content/BLOG-GENERATION.md`, lager hero-bilde med `image-gen`-skillen, og
åpner PR mot master. Den pusher aldri til master selv.

**Å legge filen i `src/content/generated/` er ikke nok lenger.** Den må også
registreres med to linjer i `index.js` i samme mappe, en import og en
oppføring i arrayen. Tidligere fant en `import.meta.glob` filene automatisk,
men den måtte vekk fordi den drepte sitemap-ruten. Se felle 2 over.

---

## Verifisering

**Mål mot prod, ikke mot kildekoden.** Kildekoden viser hva som er ment å skje.
Nesten alle reelle funn ligger i forskjellen mellom de to.

Etter enhver SEO-relevant endring:

```bash
~/.claude/skills/seo-synlighet/scripts/diagnose.sh oppskalert.no / /priser /blogg
```

Skillen `seo-synlighet` har hele metodikken. Bruk den framfor å improvisere.

Andre nyttige kontroller:

```bash
npm run build          # inkluderer prerendering, skal si "N routes snapshotted"
npx eslint src api scripts
```

Kjente lint-feil fra før i `BloggKort.jsx` og `LiquidGlass.jsx`. Ikke dine.

---

## Status per 5. august 2026

**Live og verifisert i prod:** prerendering av alle ruter inkludert bloggen,
titler skrevet for søk, `sitemap.xml` og `rss.xml` svarer 200, demosidene under
`/eksempler` er `noindex`, Opinly-pikselen er fjernet, og fem landingssider er
publisert: `/sokemotoroptimalisering`, `/webdesign-oslo`, `/nettside-design`,
`/nettside-til-bedrift`, `/lage-nettbutikk`.

Bloggen er migrert helt ut av Opinly, seks artikler, og hver artikkel har tre
kontaktpunkter i stedet for ett på slutten.

**Blokkert på Aleksander:** be Google Search Console indeksere de fem nye
landingssidene. Sitemapen er sendt inn.

`irmelindrake.no` er en kollegas prosjekt uten vår tilgang, og
alphanegotiations.com krediterer et annet byrå. Begge er utenfor rekkevidde
og skal ikke følges opp videre.

**Kjent gjeld:**

- `alphanegotiations.com` ligger i porteføljen i `src/lib/site.js`, men
  footeren der krediterer et annet byrå. Bør trolig ut.
- Tankestrek finnes i rundt ni kodekommentarer. Ikke i kundevendt tekst.
- Forsidens H1 er «Nettsider som faktisk selger». God copy, null søkevolum.
  Heroen er nøyaktig én skjermhøyde, så et ekstra ord gir en fjerde linje og
  brekker layouten. Endres bare sammen med typografien.
- De tre eldste hero-bildene under `public/blogg/*.jpg` har tekst brent inn i
  bildet over stockfoto, som DESIGN.md advarer mot. De tre nyeste (`.webp`) er
  tekstfrie og abstrakte. Settet er ikke konsistent.

---

## Git

Aleksander godkjenner før noe går live. Jobb på branch, ikke commit rett på
master, og ikke merge eller push uten at han sier fra. Blogginnlegg skal alltid
gå via PR, se `content/BLOG-GENERATION.md`.

**Flere Claude-sesjoner jobber i dette repoet samtidig.** Det betyr at det
nesten alltid ligger ukommittert arbeid i treet som ikke er ditt. Bruk aldri
`git add -A` eller `git commit -a`. Legg til eksplisitte stier, og sjekk
`git status` før du bytter branch. Må du bytte med fremmede endringer i treet,
bruk `git stash push -- <sti>` og legg dem tilbake med en gang.
