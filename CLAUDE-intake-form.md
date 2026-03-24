# CLAUDE.md — Oppskalert Speaker Intake Form
### Route: oppskalert.no/kom-i-gang  
### Legg til i eksisterende oppskalert Vite/React-prosjekt

---

## Oppgave

Bygg en `IntakePage.jsx`-komponent som legges til som en ny rute i det eksisterende oppskalert-prosjektet. Dette er siden foredragsholdere fyller ut etter at de har sagt ja til å få bygget nettside av Oppskalert.

Siden er et **flerstegs skjema** med sidebar-navigasjon — inspirert av Folio AS sitt stiftelsesflow. Ren, seksjonisert, ingen overflødige elementer. Flyten er produktet.

---

## Kritisk: Bruk eksisterende design-system NØYAKTIG

Ikke oppfinn nye farger, fonter eller komponenter. Alt skal matche det eksisterende oppskalert-nettstedet.

### Tailwind-tokens (fra tailwind.config.js)
```js
colors: {
  background: '#201335',  // Midnight Violet
  surface:    '#4f4789',  // Dusty Grape
  primary:    '#fffded',  // Ivory — all tekst
  accent:     '#ffb17a',  // Sandy Brown — CTAs, aktive states
  highlight:  '#fce762',  // Banana Cream — pulserende dot, highlights
}

fontFamily: {
  sans:  ['Space Grotesk', 'sans-serif'],
  serif: ['DM Serif Display', 'serif'],
  mono:  ['Space Mono', 'monospace'],
}

borderRadius: { '2xl': '2rem', '3xl': '3rem', '4xl': '4rem' }
```

### Eksisterende knapp-pattern (kopier eksakt fra App.jsx)

**Primær knapp:**
```jsx
<button className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
  <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
    Tekst <ArrowRight className="w-4 h-4" />
  </span>
  <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
</button>
```

**Sekundær knapp:**
```jsx
<button className="w-full py-4 rounded-full border border-primary font-sans font-medium text-sm text-center hover:bg-primary hover:text-background transition-colors duration-300">
```

**Kort:**
```jsx
<div className="bg-surface rounded-[3rem] border border-primary/10 p-12">
```

**Seksjonsetikett:**
```jsx
<span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Etikett</span>
```

**cn() finnes allerede i App.jsx — importer eller redeklarer.**

---

## Layout

```
┌──────────────────┬──────────────────────────────────────┐
│  SIDEBAR         │  AKTIVT STEG                          │
│  sticky, 280px   │  maks 680px innhold                   │
│                  │                                       │
│  1 ● Om deg      │  [Tittel — DM Serif Display italic]   │
│  2 ○ Din profil  │  [Spørsmål]                           │
│  3 ○ Foredrag    │  [Fortsett-knapp]                     │
│  4 ○ Medier      │                                       │
│  5 ○ Innspurt    │                                       │
└──────────────────┴──────────────────────────────────────┘
```

**Desktop:** sidebar 280px sticky. Innhold venstrejustert maks 680px.
**Mobil:** sidebar → horisontal progress-bar øverst (5 prikker + aktivt stegnavn).
**Bakgrunn:** `bg-background` hele siden.

### Sidebar-steg
- **Fullført:** `bg-accent` sirkel + hvit hake, `text-primary/70`
- **Aktivt:** `border-2 border-accent` sirkel + `text-accent` tall, `font-bold text-accent`
- **Kommende:** `border border-primary/20` + `text-primary/30`
- Tynn vertikal linje mellom stegene: `border-l border-primary/10`
- Klikk på fullført steg = naviger tilbake

---

## Input-komponenter

Alle inputs: `bg-background border border-primary/20 rounded-xl` focus: `border-accent ring-1 ring-accent/30`

**TextInput** — enkeltlinje, label + hint + input
**TextArea** — flerlinje, `min-h-[96px]`, `resize-none`, auto-resize
**URLInput** — TextInput med Lucide `<Link />` ikon venstre, URL-validering ved blur
**TagInput** — skriv + Enter = pill (`bg-surface font-mono text-xs rounded-full px-3 py-1`), inspirasjon-tags under
**FileUpload** — `border-2 border-dashed border-primary/20 rounded-2xl`, thumbnail-preview med ×-overlay
**AestheticPicker** — 4 kort 2×2 grid, valgt: `border-2 border-accent` + cyan hake øverst høyre
**StarRating** — 5 Lucide `<Star />`, fylt: `text-accent`, tom: `text-primary/20`
**AddMoreGroup** — `border border-primary/20 rounded-full` knapp med Lucide `<Plus />`

---

## De 5 stegene

### STEG 1 — Om deg
**Tittel (DM Serif Display italic):** *La oss bli kjent*

- **Fullt navn** `*` — TextInput
- **E-post** `*` — TextInput (email)
- **Telefon** — TextInput
- **Talerlisten.no URL** `*` — URLInput · hint: «Vi henter info herfra automatisk»
- **Eksisterende nettside** — URLInput · hint: «Har du en? Vi bruker den som kilde.»
- **LinkedIn** — URLInput

---

### STEG 2 — Din profil
**Tittel:** *Hvem er du på scenen?*

- **Identitetsetiketter** `*` — TagInput maks 4 · hint: «Skriv én og trykk Enter. F.eks. Journalist. Komiker. Overlevende.» · inspirasjon: Pilot, Gründer, Overlevende, Forfatter, Komiker, Lege
- **Posisjoneringssetning** `*` — TextArea · hint: «Hva gjør du, for hvem, hva skiller deg?»
- **Signaturkonsept** — TextInput · hint: «Navngitt metode? F.eks. Fighter Pilot's Mindset»
- **Målgruppe** `*` — TagInput maks 6 · inspirasjon: HR-direktører, Toppledere, Salgsorganisasjoner
- **Den røde tråden** — TextArea · hint: «Hva binder foredragene sammen? Skriv «lag en» om usikker.»

---

### STEG 3 — Foredragene dine
**Tittel:** *Hva snakker du om?*
**Undertittel (mono muted):** Legg inn opptil 3 foredragstemaer. Minst ett er påkrevd.

**AddMoreGroup — maks 3 temaer:**

Per tema:
- **Tittel** `*` — TextInput
- **Hva sitter publikum igjen med?** `*` — TextArea · hint: «Start med «Deltakerne forstår...»»
- **Stikkord** — TagInput maks 4 · inspirasjon: Endring, Ledelse, Motivasjon, Innovasjon, Salg, Bærekraft

**[+ Legg til et foredragstema]**

---

### STEG 4 — Innhold og medier
**Tittel:** *La oss vise hvem du er*

**Video** `*`
- Hero-video URL `*` — URLInput · hint: «YouTube/Vimeo. Søk: [Navn] foredrag. Dette er det viktigste feltet.»
- [+ Legg til video] — inntil 2 ekstra URLInput

**Talerlisten-rating** — to side-om-side felt «[X] av [Y]» · hint: «Vises som badge på videoen»

**Bilder** `* minst 1`
- FileUpload — JPG/PNG/WebP, maks 10MB, maks 5 filer

**Statistikk (tre felt i grid)**
- Antall foredrag · Antall publikummere · Fornøydhetsscore

**Medieomtale**
- TagInput · inspirasjon: NRK, Aftenposten, DN, VG, E24, Kapital
- Bok(er) — TextInput

**Anbefalinger (AddMoreGroup maks 3):**
- Sitat `*` — TextArea
- Navn `*` — TextInput
- Tittel + selskap `*` — TextInput
- Stjerner — StarRating default 5

**[+ Legg til en anbefaling]**

---

### STEG 5 — Innspurt
**Tittel:** *Nesten i mål*

**Oppsummeringssjekkliste øverst** (`bg-surface/50 rounded-2xl p-6 border border-primary/10`):
```
✓ Grunnleggende info        → text-highlight hake
✓ Profilbeskrivelse
✓ 2 foredragstemaer
✓ Hero-video lagt til
✗ Minst ett bilde mangler   → text-accent × + klikk → hopp til steg 4
```

**Estetikkvalg** `*` — AestheticPicker 2×2:

| Preset | Farger | Nøkkelord |
|--------|--------|-----------|
| A — Command Stage | `#0B1120` `#D4A843` `#F8F6F1` | Navy · Gull · Autoritær |
| B — Challenger Signal | `#111111` `#E83A2F` `#F0EDE6` | Sort · Rød · Rå energi |
| C — Luminous | `#1A1A2E` `#FF6B35` `#FAFAF7` | Midnatt · Oransje · Varm |
| D — Nordic Edge | `#F4F4F2` `#00AEEF` `#FFFFFF` | Hvit · Cyan · Skandinavisk |

**Din merkefarge** — TextInput · placeholder: «#00AEEF — la stå tom for presetets farger»

**Primær CTA-tekst** `*` — TextInput · placeholder: «Book [ditt fornavn]»
**Live-preview:** ekte accent-knapp under feltet som oppdateres mens de skriver

**Bookinglenke** — URLInput · placeholder: «Calendly, e-post, eller talerlisten-profil»

**Ekstra notater** — TextArea 4 rader

---

## Innsending og backend

### Supabase-tabell
```sql
CREATE TABLE speaker_intake_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  talerlisten_url TEXT NOT NULL,
  existing_website TEXT,
  linkedin_url TEXT,
  identity_labels TEXT[],
  positioning TEXT,
  signature_concept TEXT,
  target_audience TEXT[],
  red_thread TEXT,
  topics JSONB,
  hero_video_url TEXT,
  extra_video_urls TEXT[],
  talerlisten_rating TEXT,
  image_urls TEXT[],
  stat_events TEXT,
  stat_audience TEXT,
  stat_satisfaction TEXT,
  media_mentions TEXT[],
  book TEXT,
  testimonials JSONB,
  aesthetic_preset TEXT,
  brand_color TEXT,
  cta_text TEXT,
  booking_url TEXT,
  extra_notes TEXT,
  status TEXT DEFAULT 'new'
);
```

Bilder → Supabase Storage bucket `speaker-assets`, mappe `{submission_id}/`.
E-post til `hei@oppskalert.no` via Resend etter vellykket insert.

---

## Suksess-visning

Erstatt skjemaet med (samme `bg-background`):

```jsx
<div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
  <div className="w-24 h-24 rounded-full bg-surface border border-accent/30 flex items-center justify-center mb-8">
    <Check className="w-12 h-12 text-accent" />
  </div>
  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Mottatt</span>
  <h1 className="font-serif italic text-5xl md:text-7xl mb-6">Vi er i gang.</h1>
  <p className="font-mono text-primary/50 text-sm max-w-md leading-relaxed mb-12">
    {name}, du hører fra oss på {email} innen 2 virkedager.
  </p>
  <div className="bg-surface rounded-3xl p-8 max-w-md w-full text-left border border-primary/10 mb-12">
    {["Vi gjennomgår informasjonen din", "Vi bygger et førsteutkast", "Du får en forhåndsvisningslenke"].map((s, i) => (
      <div className="flex items-center gap-4 py-4 border-b border-primary/10 last:border-0">
        <span className="font-mono text-accent text-sm font-bold">0{i+1}</span>
        <span className="font-sans text-sm text-primary/70">{s}</span>
      </div>
    ))}
  </div>
  <a href="/" className="font-mono text-xs text-primary/30 hover:text-primary/60 transition-colors uppercase tracking-widest">
    ← Tilbake til oppskalert.no
  </a>
</div>
```

---

## Tekniske krav

- **Legg til i eksisterende prosjekt** — ikke ny Vite-instans
- **Eksisterende deps allerede installert:** gsap, lucide-react, clsx, tailwind-merge — bruk disse
- **Ny dep:** `@supabase/supabase-js` — installer
- **localStorage auto-save** hvert 30 sek
- **Routing:** `/kom-i-gang` — React Router hvis det brukes, ellers betinget rendering i App.jsx
- **Filstruktur:**
```
src/
  pages/IntakePage.jsx
  components/
    intake/
      StepSidebar.jsx
      StepProgressBar.jsx
      Step1About.jsx
      Step2Profile.jsx
      Step3Topics.jsx
      Step4Media.jsx
      Step5Finish.jsx
      SuccessScreen.jsx
      SummaryChecklist.jsx
    ui/
      TextInput.jsx / TextArea.jsx / URLInput.jsx
      TagInput.jsx / FileUpload.jsx
      AestheticPicker.jsx / StarRating.jsx / AddMoreGroup.jsx
  lib/
    supabase.js / uploadImages.js / submitIntake.js / validation.js
```

---

## UX-regler (aldri bryt)

1. Rød `text-accent` asterisk på påkrevde felt
2. Valider ved blur, ikke typing
3. «Fortsett»-knapp sticky bottom på mobil
4. Sidebar sticky på desktop
5. Klikk fullført steg = naviger tilbake
6. localStorage auto-save hvert 30 sek
7. Oppsummeringssjekkliste alltid synlig i steg 5
8. Bilde-preview umiddelbart etter opplasting
9. Live CTA-preview i steg 5
10. Spinner på Send-knapp under innsending
