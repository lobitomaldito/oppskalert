# Product

## Register

brand

## Users

Norwegian small-business owners — tradespeople, consultants, coaches, local service firms (think *Berg Elektro*, *Nilsen Regnskap*, *Solberg Coaching*). They are busy, non-technical, and time-poor. Most have either no website or a stale one that brings in nothing, and they're skeptical: burned before by cost, lock-in contracts, or builders who delivered something pretty that never produced a single customer.

The job they're trying to get done: *get a website that actually brings in business* — without risk, jargon, or a long sales dance. They want to see proof before they commit, talk to a real person, and not be locked in. The single conversion the whole site drives toward is **Bestill gratis demo**: a free, no-obligation demo of their future site, built before they pay anything.

## Product Purpose

Oppskalert is a Norwegian web agency (a subsidiary of PotentialAIze AS, Oslo) that designs and builds fast, conversion-optimized websites for small Norwegian businesses. The product is the service, and the site is its own proof of work — an agency that can't make its own site sell can't be trusted to make yours.

The model is "show, don't tell": rather than pitching, Oppskalert builds a finished demo of the prospect's new site *before* any payment, removing the risk that keeps SMBs from saying yes. Differentiators: sub-1-second load times, SEO and mobile-first from day one, no binding contracts ("du eier alt selv"), and one reachable person you can phone directly.

Success looks like a steady flow of qualified demo requests (and intake-form completions at `/kom-i-gang`) that convert into clients — measured by booked demos, not vanity traffic.

## Brand Personality

**Warm, human, founder-led.** Three words: *warm, direct, trustworthy.*

The voice is plain-spoken Norwegian — confident without corporate stiffness, technical without jargon. It speaks like a capable person you'd actually want to hire, not a faceless agency: "Ingen binding, ingen risiko," "Du ser resultatet, ikke et tilbud." One named person — Aleksander MacKee — with a phone number and a face, anchors the trust. Oppskalert is a one-person studio; the voice is first-person singular ("jeg"), warm and jovial, never corporate "vi". Inclusive "vi" (me + the customer: "la oss bygge noe sammen") is correct and stays. The emotional goal is *relief and confidence* — the sense that this is finally someone who gets what a small business needs and will deliver it without fuss.

The craft (fast, polished, well-built) is in service of the warmth, not a substitute for it. The site should feel like it was made by people, for people — premium, but never cold.

## Anti-references

- **Trendy AI-slop (the primary one to avoid).** Glassmorphism everywhere, gradient text, a tiny tracked-uppercase eyebrow above every section, numbered `01 / 02 / 03` markers used as reflex scaffolding, identical icon-card grids, overdesign for its own sake. The current build already leans on some of these (eyebrows on most sections, numbered markers) — future work should thin them out, not add more.
- **Generic template / Wix-builder look** — drag-and-drop sameness, stock-photo heroes, the layout every other SMB site has. Oppskalert sells *better than that*, so its own site can't look like the thing it replaces.
- **Corporate / big-agency** — stiff, faceless, enterprise-stock, jargon-heavy. Includes the agency "vi" when there is only one person behind it. The opposite of one person you can call. Warmth and reachability are the moat.

## Design Principles

1. **The site is the proof.** Every detail is a live demonstration of what Oppskalert sells — speed, polish, conversion. A slow, sloppy, or off-brand moment isn't a blemish, it's a counter-argument. Practice what you preach.
2. **Show, don't tell.** Lead with evidence (real client sites, real founders, real numbers), not adjectives. The "free demo before you pay" ethos applies to the design too: demonstrate competence rather than claim it.
3. **Warm beats slick.** When a choice trades a touch of agency-cool for human approachability, take the human side. Faces, direct phone numbers, plain language, and a confident-but-friendly tone outrank another clever effect.
4. **Earn every flourish.** Motion, noise, shaders, and dark drama are part of the brand — but each must do a job. No eyebrow, numbered marker, or animation that's there only because "landing pages do this." Conversion clarity wins ties.
5. **Lower the risk at every step.** Mirror the no-binding, no-risk promise in the UX: short paths to the demo CTA, no dead ends, frictionless intake, nothing that makes a skeptical small-business owner hesitate.

## Accessibility & Inclusion

Target **WCAG 2.2 AA**. Concretely: body text ≥4.5:1 contrast (≥3:1 for large/bold text) against its actual background — watch the light cream sections (`#f5e6d8`) and muted white-on-dark (`text-white/40`, `text-white/50`) where contrast gets thin; visible keyboard focus states on all interactive elements; full keyboard operability of the nav, forms, and intake flow; and a `prefers-reduced-motion` alternative for every animation (the global noise overlay, GSAP reveals, and marquee testimonials included). Norwegian-language primary (`lang="no"`).
