---
name: Oppskalert
description: Nettsider som faktisk selger — a warm, founder-led Norwegian web agency.
colors:
  midnight-violet: "#201335"
  dusty-grape: "#4f4789"
  ivory: "#fffded"
  sandy-brown: "#ffb17a"
  banana-cream: "#fce762"
  warm-cream: "#f5e6d8"
  clay-brown: "#8a4d2c"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(48px, 8vw, 120px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Supreme', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.05em"
  title:
    fontFamily: "'Supreme', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Supreme', system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 1.2vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Supreme', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.3em"
  editorial:
    fontFamily: "'DM Serif Display', serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
rounded:
  xl: "0.75rem"
  2xl: "2rem"
  3xl: "3rem"
  4xl: "4rem"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  gutter-lg: "6rem"
  section: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.sandy-brown}"
    textColor: "{colors.midnight-violet}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.dusty-grape}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-nav:
    backgroundColor: "{colors.dusty-grape}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  card:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.ivory}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  input-demo:
    backgroundColor: "rgba(32, 19, 53, 0.05)"
    textColor: "{colors.midnight-violet}"
    rounded: "{rounded.full}"
    padding: "16px 24px"
  input-intake:
    backgroundColor: "{colors.midnight-violet}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: Oppskalert

## 1. Overview

**Creative North Star: "The Midnight Workshop"**

Oppskalert's surface is a workshop after dark: a deep midnight-violet room where one craftsperson builds in the open, lit by warm lamplight — peach and banana glow against the dark. It is premium and confident, but never cold. The warmth is not decoration; it is the whole point. The dark is the focus and the seriousness; the warm accents are the human inside it. The site is the agency's own proof of work, so every detail has to demonstrate the thing they sell — speed, polish, and conversion — while feeling like it was made *by people, for people*.

The system breathes between night and day. Most of the page lives in midnight-violet (`#201335`) with a faint film-grain overlay, but it opens into warm-cream "daylight" rooms (`#f5e6d8`) exactly where the brand gets most human: where you meet the person behind it, and where the process is explained. That rhythm — drop into the dark to feel the craft, step into the light to meet the people — *is* the layout strategy. Type carries the same dual voice: a confident geometric display for the claims, a typewriter mono for the plain-spoken proof, and a single italic serif reserved for the warmest, most personal moments.

This system explicitly rejects **trendy AI-slop**: no glassmorphism as default, no gradient text, no tracked-uppercase eyebrow stamped above every section, no `01 / 02 / 03` numbering used as reflex scaffolding, no endless identical icon-card grids. It also rejects the **generic template / Wix-builder** look it exists to replace, and the **corporate / big-agency** coldness that the two-founders-you-can-call model is built against.

**Key Characteristics:**
- Drenched dark base with warm-glow accents — committed, not tinted-neutral-safe
- A night/day section rhythm: midnight rooms for craft, cream rooms for people
- Tactile, confident interaction — pills that slide-fill, surfaces that lift on photos only
- Mono-forward body voice; a rare serif italic for human warmth
- Film-grain texture over everything (5% opacity) — analog warmth on a digital surface

## 2. Colors

> **Tokens.** Since the 2026-07 restructure the palette lives in `src/index.css`
> as `"R G B"` triples (`--bg`, `--bg-deep`, `--surface`, `--ink`, `--signal`,
> `--signal-hi`, `--room`, `--room-ink`, `--room-signal`) and Tailwind maps to
> them via `rgb(var(--x) / <alpha-value>)`. Change a colour in one place, not
> in forty inline `style={{}}` literals. Layout rhythm shares the same file:
> `.wrap` (max 68rem + fluid gutter) and `.seksjon` are the single measuring
> tape every section uses.
>
> **Measured contrast floors on `#201335`:** ivory must be **≥50%** to clear
> AA (4.5:1); on `--surface` (`#4f4789`) it must be **≥70%**. Hence
> `--ink-muted: 0.72` is safe on both, `--ink-faint: 0.58` is safe on `--bg`
> only. Text below 50% ivory is a bug — it used to be scattered through the
> intake flow and article pages and was swept out.
>
> **Routes.** `/` `/arbeid` `/priser` `/metode` `/om` `/kontakt` `/blogg`
> `/kom-i-gang` `/eksempler/*`. Nav and footer both read `navLenker` from
> `src/lib/site.js`, which is also the single source for pricing, process,
> FAQ, portfolio and testimonials copy.

A drenched, warm-dark palette: a deep violet night carrying peach, banana, and cream lamplight. Saturated and committed — the surface IS the color, not a neutral with an accent dropped on top.

### Primary
- **Midnight Violet** (`#201335`): The body. The default surface for the hero, services, portfolio, testimonials, FAQ, and footer. Everything else is read against this. Also doubles as ink on the cream sections and on the peach buttons.
- **Sandy Brown** (`#ffb17a`): The signature warm accent. Primary CTA fills, the bouncing wordmark dot, eyebrow labels on dark sections, link hovers, active highlights. This is the lamplight — the single warmest gesture, used to point at the one thing that matters (the demo CTA).

### Secondary
- **Dusty Grape** (`#4f4789`): The lifted surface. The frosted scrolled-navbar, the secondary "Bestill Demo" nav button, the stats band, and the color the primary button slides up to reveal on hover. A mid-violet that reads as "raised" against the midnight base.

### Tertiary
- **Banana Cream** (`#fce762`): The rare punctuation. The pulsing "SYSTEM OPERATIONAL" dot, the brightest hover step beyond accent. Used in tiny amounts as the highest-energy note. Never a fill.
- **Warm Cream** (`#f5e6d8`): The daylight. Full-bleed background for the two human sections — "Møt oss" (founders) and "Prosess". Inverts the page to warm paper so the people feel approachable, not nocturnal.
- **Clay Brown** (`#8a4d2c`): The cream-room ink-accent. Labels, secondary text, and links inside the warm-cream sections, where peach would be illegible. The warm sibling of Sandy Brown, deep enough to clear 4.5:1 on cream (its primary job is small text on `#f5e6d8`, so it must).

### Neutral
- **Ivory** (`#fffded`): The primary text color on all dark surfaces — a warm off-white, never pure `#ffffff`. Body, headlines, the wordmark. On dark sections, muted variants (`rgba(255,255,253,0.5)` and lower) carry secondary copy.

### Named Rules
**The Lamplight Rule.** Sandy Brown is the only warm fill on a dark screen, and it belongs to the conversion path — the demo CTA and what leads the eye to it. Its scarcity is what makes it read as a beacon. Don't scatter peach across decorative elements; the moment everything glows, nothing does.

**The Night/Day Rule.** A section is either a midnight room (`#201335`, ivory text, peach accents) or a daylight room (`#f5e6d8`, midnight text, clay accents). Never blend the two palettes inside one section. The warm-cream rooms are reserved for the most human content (founders, process); earning that switch is the point.

## 3. Typography

**Display Font:** Plus Jakarta Sans (geometric sans, weights 700/800) — fallback `sans-serif`
**Body Font:** Supreme (Indian Type Foundry / Fontshare, variable 100–800) — fallback `system-ui, sans-serif`. Self-hosted from `public/fonts/`, one 30 kB variable file for the whole weight range.
**Editorial Accent Font:** DM Serif Display (high-contrast serif, italic) — fallback `serif`

**Character:** Two families on one real contrast axis, plus a rationed serif. Plus Jakarta Sans shouts the headline claims in heavy weights with tight tracking; Supreme handles everything else, splitting body from structural UI by **weight**, not by a second face. Space Grotesk was dropped 2026-07: it sat too close to Supreme in size and weight, so a button label next to body copy read as a mistake rather than a choice. Supreme carries body copy, labels and captions — proportional, quiet, and readable at paragraph length. DM Serif Display italic is the soul: held back for the warmest, most personal moments only.

### Hierarchy
- **Display** (Plus Jakarta Sans, 800, `clamp(48px, 8vw, 120px)`, line-height 1, letter-spacing −0.03em): Hero headline and footer "La oss bygge noe bra sammen." and the giant `oppskalert.` wordmark (−0.04em). The loudest voice; one per view, max.
- **Headline** (Plus Jakarta Sans, 800, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.05, tracking −0.05em / `tracking-tighter`): Section `<h2>`s — "De snakker for oss.", "Alt en side trenger for å selge."
- **Title** (Supreme, 700, `clamp(1.25rem, 2.5vw, 1.875rem)`, line-height 1.15): Card headings, founder names, service titles.
- **Body** (Supreme, 400, `clamp(0.875rem, 1.2vw, 1rem)`, line-height 1.6–1.75): All paragraph copy, descriptions, testimonials. Cap measure at 65–75ch (the project uses `max-w-xl` / `max-w-[18ch]` for tight blocks).
- **Label** (Supreme, 500, 0.75rem, letter-spacing 0.16–0.22em, UPPERCASE): Eyebrows, nav links, captions, the operational-status line.
- **Editorial** (DM Serif Display, 400, *italic*, `clamp(2.25rem, 4vw, 3rem)`, line-height 1.1): Intake-flow headings ("La oss bli kjent", "Nesten i mål"), the success screen ("Vi er i gang."), and single emphasis words ("salgsmaskin.").

### Named Rules
**The Serif-Is-Sacred Rule.** DM Serif Display italic is the warmest voice in the system and it is rationed. It appears only where the brand is at its most human and personal — the intake conversation, the success moment, a single emphasized word. Never use it for a section header on a marketing page, never set a paragraph in it. Overuse cheapens the one gesture that signals "a person is talking to you."

**The Body-Weight Rule (2026-07).** Body text renders at **weight 450**, set once on `body` in `index.css`. Supreme is variable (100–800), so we are not stuck on round hundreds: 400 measured legible but read frail, especially at 14px. Body prose sits at **15.2–16px**, never 14px. Ink levels for running prose: **80–85%** ivory on the aubergine, **85–90%** aubergine in the cream rooms. Reserve 70% for genuinely secondary metadata (timestamps, captions, card meta), not for anything the reader is meant to actually read. Contrast was never the problem here (70% ivory already measures 8.8:1); perceived stroke weight was.

**The Readable-Body Rule (replaces the old Mono-Proof Rule, 2026-07).** Body copy is **Supreme**, not monospace. Space Mono was the body face until it became clear it was unreadable at paragraph length: fixed advance widths flatten every word into the same shape, so the eye can't find the start of the next line, and the same FAQ answer ran 7 lines instead of 4. The "engineered, honest" voice now lives in the *copy* and the layout, not in the letterforms. Do not reintroduce monospace for body, labels or captions. Keep body ≥15px and ≥1.6 line-height.

## 4. Elevation

Flat by default, with depth carried by **tonal layering** and **section-color switches**, not by a shadow scale. On the midnight base, "raised" surfaces are expressed as a 5% white film (`rgba(255,255,255,0.05)`) with a 10% white hairline border — cards and testimonials float by tone, not by shadow. The film-grain noise overlay (5% opacity, fixed, full-viewport) adds a unifying analog texture across the whole page. The only literal shadows are reserved for things that are physically meant to lift off the page.

### Shadow Vocabulary
- **Photo lift** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` — Tailwind `shadow-xl`): The portrait on /om. The only generous shadow, because a photo is a physical object on a paper room.
- **Float chip** (Tailwind `shadow-md`): The floating navbar button and small lifted cards. Subtle separation for genuinely floating UI.

### Named Rules
**The Tonal-Depth Rule.** On dark surfaces, depth is a 5% white wash plus a 10% white border — never a drop shadow. Shadows on the midnight base read as muddy 2014-app depth. If a dark card needs to feel raised, brighten its film or its border, don't shadow it.

**The Earned-Shadow Rule.** A literal `box-shadow` is only for objects that are physically lifted — a photo, a floating pill nav. If you're reaching for a shadow to fake hierarchy on a flat content block, the answer is tonal contrast or spacing instead.

## 5. Components

### Buttons
- **Shape:** Full pill (`border-radius: 9999px`). Every button is a pill; this is non-negotiable brand shape.
- **Primary:** Sandy Brown fill (`#ffb17a`) with Midnight Violet text, padding `16px 32px`, Supreme 700. The conversion button.
- **Hover / Focus:** A Dusty Grape (`#4f4789`) panel slides up from below (`translateY(100%) → 0`) over ~300ms on `cubic-bezier(0.25,0.46,0.45,0.94)`, and the label crossfades to Ivory; the whole button scales to 1.03. Tactile, physical, confident — the signature interaction. Must have a visible `:focus-visible` ring for AA.
- **Secondary (nav "Bestill Demo"):** Dusty Grape fill, Ivory text, smaller padding (`10px 24px`); same slide-fill mechanic revealing Ivory.
- **Reduced motion:** Slide-fill and scale collapse to a simple color/opacity change.

### Cards / Containers
- **Corner Style:** `2rem` radius (`rounded-2xl`, overridden from Tailwind's default to 32px).
- **Background:** 5% white film (`rgba(255,255,255,0.05)`) on dark sections.
- **Border:** 10% white hairline (`rgba(255,255,255,0.1)`), shifting to `accent/30` (Sandy Brown at 30%) on hover.
- **Shadow Strategy:** None on dark — tonal only (see Elevation). Reserve shadow for photos.
- **Internal Padding:** `24px`–`32px` (`p-6` / `p-8`).

### Inputs / Fields
Two contexts, two treatments — both legible, both AA:
- **Demo form (on the warm-cream room):** Full-pill (`rounded-full`), background `rgba(32,19,53,0.05)`, 25% midnight border, Supreme text. Focus deepens the border to 60% midnight. **Placeholder at 70% midnight** — 40% failed AA; 70% measures 6.3:1.
- **Intake form (on dark section):** `0.75rem` radius (`rounded-xl`), solid Midnight Violet fill, Ivory text, 20% ivory border, Space Sans label. Focus shifts border to Sandy Brown plus a `ring-1 ring-accent/30` glow. Error state borders in Sandy Brown.

### Navigation
- **Style:** A floating, centered pill, fixed `1.5rem` from top, 90% width / max 64rem. Transparent at rest over the hero; on scroll past 50px it animates to a frosted Dusty Grape (`rgba(79,71,137,0.90)` + `backdrop-blur(8px)`) with a 10% white border.
- **Typography:** Lowercase extrabold wordmark (`oppskalert.`) in Plus Jakarta Sans; nav links in Supreme uppercase, tracked.
- **Mobile:** Links collapse (hidden below `md`); wordmark + CTA persist. *(Note: a mobile menu is a known gap — see Do's and Don'ts.)*

### Signature: The Wordmark Dot
The `.` in `oppskalert.` is the brand's mascot gesture — a Sandy Brown dot that bounces (`y: -18px`, yoyo, every ~2s) in the hero and pulses as the banana-cream "SYSTEM OPERATIONAL" indicator in the footer. Small, alive, human. Use it as the one moment of playful personality; don't multiply it.

### Motion
Choreographed but controlled. Hero elements stagger in (GSAP `power3.out`, 0.15s stagger). Section content reveals on scroll via IntersectionObserver — `translateY(28px)` + fade over 0.7s on `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart), staggered ~90–120ms. Testimonials marquee horizontally on a continuous loop. **Every reveal enhances an already-visible default** (the armed-hidden state only applies once JS runs, so content never ships blank), and every motion has a `prefers-reduced-motion` off-switch.

## 6. Do's and Don'ts

### Do:
- **Do** keep the surface drenched and committed — Midnight Violet body, warm-glow accents. The dark is the brand; don't dilute it toward a safe tinted neutral.
- **Do** reserve Sandy Brown for the conversion path (the **Lamplight Rule**). One warm beacon per screen, pointed at the demo CTA.
- **Do** switch to a warm-cream room only for the most human content — the person, the process, the demo form (the **Night/Day Rule**).
- **Do** ration DM Serif Display italic to the warmest, most personal moments (the **Serif-Is-Sacred Rule**).
- **Do** keep body copy in Supreme, ≥15px / ≥1.6 line-height. Use `font-body`; `font-mono` now maps to a real system monospace and is reserved for the `/eksempler` demo pages.
- **Do** make buttons tactile pills with the slide-fill + 1.03 scale, and pair every animation with a `prefers-reduced-motion` alternative.
- **Do** carry depth with tonal washes and borders on dark, literal shadow only for photos (the **Tonal-Depth** and **Earned-Shadow** Rules).
- **Do** verify ≥4.5:1 body contrast everywhere — especially muted white text (`white/40`, `white/50`) on midnight and clay/midnight text on `#f5e6d8`. Target WCAG 2.2 AA.

### Don't:
- **Don't** ship trendy AI-slop: no glassmorphism as default, no gradient text (`background-clip: text`), no decorative blur. The frosted nav is the *only* sanctioned glass moment.
- **Don't** stamp a tracked-uppercase eyebrow above every section, and **don't** use `01 / 02 / 03` numbered markers as reflex scaffolding. Numbers earn their place only on a real sequence (the Process steps); the Services list does not need them. *(The current build over-uses both — thin them out, don't add more.)*
- **Don't** fall back to identical icon-card grids repeated endlessly. Vary the section forms.
- **Don't** let the site drift toward the **generic template / Wix-builder** look it exists to replace — stock-photo heroes, drag-and-drop sameness.
- **Don't** go **corporate / big-agency** cold — faceless enterprise stock, jargon. Keep the face, name, and direct phone number front and center; warmth and reachability are the moat. First-person singular ("jeg"), never agency "vi".
- **Don't** use `border-left`/`border-right` greater than 1px as a colored accent stripe; use full borders, tonal fills, or the leading dot instead.
- **Don't** put a literal drop shadow on a dark card to fake hierarchy — brighten the film or border instead.
- **Don't** reintroduce monospace for body, labels or captions — see the Readable-Body Rule.
