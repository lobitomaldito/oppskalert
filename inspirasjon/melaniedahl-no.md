# melaniedahl.com

Analysert 17. august 2026. Din egen leveranse, kreditert i bunnen med «Laget
med kjærlighet av oppskalert». Statisk HTML, egne filer per side
(`index.html`, `coaching.html`, `scene.html`, `om.html`, `kontakt.html`), ikke
React-appen.

Tatt inn som referanse fordi den viser hva du faktisk lager når du står fritt,
ikke bare hva du sier i `DESIGN.md`.

## Grepet som er verdt å stjele

**Forsiden er et veivalg, ikke en presentasjon.** H1 er et spørsmål, «Hva kan
jeg hjelpe deg med?», og under står to fullhøyde fotografier side om side, ett
per halvdel av virksomheten. Den besøkende sorterer seg selv før hun har sett
et eneste salgsargument.

Det løser et problem Oppskalert også har: to helt ulike kjøpere kommer inn på
samme forside. Den som vil ha en ny side fra bunnen, og den som har en side som
ikke gjør noe. I dag får begge samme hero.

Andre ting som funker:

1. **Spørsmålsformet H1.** Leseren blir tiltalt direkte i første setning.
2. **Fotografiene er designet.** Ingen illustrasjoner, ingen ikoner som bærer
   noe. Bildene fyller flatene helt ut, og teksten ligger nede i en mørk
   gradient over dem.
3. **Én pille i korallfarge** øverst til høyre, «Book gratis samtale». Samme
   disiplin som studio-malen: alt annet er nøytralt.
4. **Bunnteksten er kort og menneskelig:** «Basert i Oslo. Snakker fem språk.»
   To fakta som gjør mer for tilliten enn et avsnitt om verdier.

## Målt

| | Verdi |
| --- | --- |
| Grunn | `#f7f2ea` krem |
| Blekk | `#2a2622` |
| H1 | Cormorant Garamond 400, 57,6 / 60,5 px, sperring -0,02em |
| Brødtekst | Mulish 17 px |
| Dokumenthøyde forside | 2858 px |
| Tredjeparter | cdnjs.cloudflare.com |

## Tre ting jeg ville fikset på den

Dette er din egen side, så det er ment som en huskeliste, ikke kritikk.

1. **To tankestrek i synlig tekst.** I `<title>` («Melanie Dahl — Skuespiller»)
   og i ingressen («Jeg jobber på to scener — den fysiske»). Det er nøyaktig
   tegnet som er bannlyst i `CLAUDE.md`, og det står på en levert kundeside.
   Bytt til komma eller punktum.
2. **Emoji som seksjonsmarkør** (🧠 og 🎭 over de to panelene). Står som
   anti-referanse i `PRODUCT.md`. To ordentlige ikoner, eller ingenting, ville
   løftet den.
3. **Seks fontfamilier lastes** (Cormorant Garamond, DM Serif Display,
   Fraunces, Mulish, Newsreader, Syne). Det ser ut som rester fra en
   font-velger i byggeprosessen. Bare to av dem brukes i synlig tekst. Kutt de
   fire andre, det er gratis fart.

Ingen `prefers-reduced-motion`-regler heller, men siden har lite bevegelse, så
det haster ikke.

## Hva jeg tar med videre

Veivalgs-heroen er den eneste av de tre referansene så langt som løser
segmenteringsproblemet. Increo og Mammut antar begge at det finnes én kjøper.
Det gjør det ikke hos oss.

Se [README.md](README.md) for hele referansesettet.
