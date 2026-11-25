# Redesign-demo, runde 2: studio-malen

**Lenke:** https://claude.ai/code/artifact/89b4ef0b-db8c-4f45-a2d0-7b11225224a3
(privat til du deler den selv)

Laget 17. august 2026. Malen er hentet fra **mammutstudios.com**, et nederlandsk
designstudio. Runde 1 (increo-malen) ligger i [demo-notat.md](demo-notat.md) og
er ikke erstattet, de to er ment å sammenlignes.

Increo-designretningen og `DESIGN.md` sin «Midnight Workshop» er bevisst lagt
til side her, etter instruks. Ordmerket er det eneste som er beholdt.

## Grepene fra malen

1. **Blekt fargefelt som merkevare.** Hele siden veksler mellom ett blekt
   periwinkle-felt og rent hvitt. Ingen aksentflater, ingen gradienter.
2. **Sentrert, tung hero.** Liten pille over, feit overskrift i tre linjer,
   kort ingress under. Ikke venstrestilt, ikke full skjermhøyde.
3. **Eget ordmerke blåst opp til vannmerke** bak overskriften, beskåret av
   seksjonskanten.
4. **Statuslinje** rett under heroen: kapasitet til venstre, «bla videre» til
   høyre, begge som tynne piller helt ute ved kantene.
5. **Nummerert inngangsliste** (01) (02) (03) i introduksjonen. Her er
   nummereringen forsvarlig fordi den er en rangert inngang, ikke pynt.
6. **Asymmetrisk arbeidsrutenett** med forskjøvne kolonner og radvis
   toppmarg, ikke et jevnt kortrutenett.
7. **Ordmerket i full bredde nederst**, beskåret av sidekanten. Det sterkeste
   enkeltgrepet på hele malen.

## Valg jeg tok

**Skallet er fargeløst med vilje.** To nøytraler og ett blekk:

| Rolle | Verdi | Kontrast |
| --- | --- | --- |
| Felt | `#e6e5f6` | |
| Vannmerke | `#dcdaf1` | |
| Hvit | `#ffffff` | |
| Blekk | `#12111d` | 15,0:1 på felt |
| Dempet tekst | `#5c5a70` | 5,4:1 på felt |
| Kritt på blekk | `#f3f2fb` | 16,8:1 |
| Dempet kritt | `#a09eb8` | 7,2:1 |

Ingen aksentfarge. All farge på siden kommer fra kundearbeidet, som er den
eneste fargen som beviser noe. Det er også grunnen til at referansebildene
slår så hardt: de har ingenting å konkurrere med.

**Ordmerket står urørt.** «oppskalert» med liten forbokstav, Plus Jakarta Sans
ExtraBold, punktum i signalfargen, akkurat som i `Layout.jsx`. Eneste tillegg
er at punktumet har to verdier: `#ffb17a` på blekk (som i dag) og `#b8551a` på
det blekke feltet, der originalen faller til 1,4:1 og forsvinner. Merket er
også den eneste plassen Plus Jakarta Sans brukes.

**Resten står i Suisse Int'l** (400 / 600 / 700). GT Sectra Fine slipper til
ett sted, i sitatet, og aldri mer.

**Ordmerket nederst måles av JavaScript** og skaleres til containerbredden
nøyaktig, med `width:max-content` så tekstbredden faktisk kan måles. Fast
`vw`-verdi treffer bare ved én skjermbredde.

## Stemmen

Teksten er skrevet om til en mer muntlig jeg-form enn runde 1.

| | Runde 1 | Runde 2 |
| --- | --- | --- |
| H1 | «Du ser den ferdige nettsiden din før du betaler noe.» | «Jeg bygger nettsiden ferdig først. Så bestemmer du deg.» |
| Om meg | «Oppskalert er meg, Aleksander MacKee, og jeg bygger nettsider for norske småbedrifter.» | «Hei, jeg heter Aleksander. Oppskalert er meg, og ingen andre.» |
| Tjenester | «Dette gjør jeg» | «Dette kan jeg hjelpe deg med» |
| Omtaler | «Hva kundene sier» | «Ord fra folk jeg har jobbet for» |
| Arbeid | «Norske småbedrifter som trengte en side som faktisk gjør en jobb.» | «Alle sammen oppe og går. Klikk deg gjerne innom, de tåler et besøk.» |

Grepet er det samme hele veien: bytt substantiv mot verb, sett inn «jeg» der
det før sto en passiv konstruksjon, og legg inn én setning som bare et menneske
ville skrevet. «De tåler et besøk» og «det er lettere enn du tror» gjør mer for
troverdigheten enn et adjektiv ville gjort.

Tilbudsgrammatikken fra Designjoy ligger fortsatt i bunn: si hva du gir, fjern
risikoen i samme åndedrag. Se [demo-notat.md](demo-notat.md) for grunnlaget.

## Rullende referanserammer

Kortene viser ekte fullsides-fangster av kundesidene som ruller sakte inni en
nettleserramme. To feller jeg gikk i, begge verdt å huske:

1. **Sett aldri viewport-høyden til hele sidehøyden før skjermbildet.** Gjør du
   det, blir hver `100vh`-hero like høy som hele siden, og fangsten blir ett
   eneste bilde uten innhold. Bruk vanlig 1280 × 900 og `fullPage: true`.
2. **Rullelengden må settes per side, ikke likt for alle.** Steinar Husby og
   Progressive Diplomacy har innhold bare ned til 62 % av fangsten og er blanke
   under. Ruller de like langt som de andre, står kortet tomt i halve runden.
   De stopper derfor på 40 %, resten på 79 %.
3. **`position: fixed` og `sticky` må håndteres før fangst, men ikke likt.**
   En fast navigasjonslinje blir stående der scroll-tilstanden etterlot den,
   ofte midt i heroen. Den skal settes til `static` så den havner øverst i
   flyten. Lukkede mobilmenyer er derimot også `fixed`, gjemt utenfor skjermen
   eller på `opacity: 0`. Setter man dem til `static` også, folder de seg ut
   midt i fangsten. De må skjules med `display: none`.

   Skillet som virker: mål elementet før du rører det. Er det usynlig eller
   utenfor skjermen, skjul det. Er det synlig og under 220 px høyt, er det en
   navlinje og skal i flyten. Alt annet får stå.

Regnestykket: fangstene beskjæres til 1280 × 5000, altså forholdet 3,906.
Vinduet står i 4:3 og viser 0,75 / 3,906 = 19,2 % av bildet av gangen. Full
rullelengde blir 80,8 %. Endres fangsthøyden eller vindusformatet, må dette
regnes om.

Rammene pauses utenfor skjermen med IntersectionObserver, men **standard er at
de ruller**. Fyrer ikke observeren, ruller alt, som er riktig feilmodus. Motsatt
oppsett gir kort som står stille for alltid.

## Funn fra /impeccable, og hva som ble gjort

Kjørt 17. august. Elleve reelle funn, alle fikset. De fem som er verdt å ta
med videre til den ekte siden:

1. **Referansekortene var ikke klikkbare.** De løftet seg på hover og teksten
   sa «klikk deg gjerne innom», men det fantes ingen lenke. Nå går hvert kort
   til kundens egen side, i ny fane, med `rel="noopener noreferrer"`.
2. **`lang` var tom.** Skjermlesere leste norsk tekst med engelsk uttale.
   Artefakten eier `<html>`, så språket settes ved kjøring.
3. **Navlenkene var 21 til 22 px høye.** Under minstemålet i WCAG 2.2 AA
   2.5.8 (24 × 24). Løst med padding, ikke med større skrift.
4. **`/arbeid` hoppet fra h1 til h3.** Kortoverskriftene var alltid h3, uten
   noen h2 imellom. Nivået settes nå per rute: h2 på arbeidssiden, h3 på
   forsiden der de ligger under «Sider som er i drift nå».
5. **`(01) (02) (03)` var reflekstillas.** Detektoren tok den, og den har rett:
   det står som anti-referanse i `PRODUCT.md`. Listen var navigasjon, ikke en
   sekvens. Tallene er byttet med ord som bærer informasjon: Bevis, Pris,
   Prosess, Neste. Metode-siden beholder markørene sine, for der *er* det en
   sekvens, og markørene er varigheter.

Resten: `transition: padding` på tre steder ga omlegging hver frame og er byttet
til `transform`; `will-change` lå permanent på ti bilder og er begrenset til den
ruten som vises; karusellknappene gikk fra 36 til 44 px; Escape lukker
mobilmenyen; hopp-til-innhold lagt inn; eksterne lenker har fått `rel` og
varsel til skjermleser om at de åpner i ny fane.

Verifisert etterpå: null berøringsmål under 24 × 24, null eksterne lenker uten
`rel`, null overskriftshopp, ingen horisontal scroll på 375, 768 eller 1440,
detektoren rapporterer ingen funn.

## Teknisk

- 463 kB totalt, alt inline. Fem fontfiler på 212 kB, seks kundebilder.
- Ingen horisontal scroll på 375, 768 eller 1440.
- `prefers-reduced-motion` slår av all bevegelse.
- Spørsmålene er `details`/`summary`, altså tastaturvennlige uten JavaScript.
- Omtalekarusellen går rundt begge veier.
- `font-synthesis: none`, ingen falsk halvfet noe sted.

## Ikke bygget

Prisside, blogg, case-mal, skjema. Demoen er én side.

Fontene er fortsatt ulisensierte kommersielle snitt. Se lisensavsnittet i
[demo-notat.md](demo-notat.md).

## AI-posisjoneringen

Oppskalert skal også være et AI-byrå. Måten det er løst i demoen er bevisst
ikke et sjette ikonkort ved siden av de andre, for da blir AI et buzzword på
linje med alle andres.

I stedet er AI gjort til **begrunnelsen for tilbudet**. Egen seksjon på
forsiden, «Hvordan én person rekker dette på tre dager»:

> Fordi jeg bygger med AI. Ikke for å ta snarveier, men fordi den fjerner
> delene som pleide å ta uker. Det er derfor prisen står på 7 990 og ikke
> 40 000, og derfor demoen er ferdig på tre virkedager og ikke fire uker.

Det er den eneste AI-vinklingen som er både sann og vanskelig å kopiere. Alle
kan skrive «vi bruker AI». Ingen andre kan bruke det til å forklare hvorfor én
person leverer på tre dager til under en tredjedel av konkurrentprisen.

Tre nye tjenester ble lagt til under det:

- **Chatbot som svarer for deg**, trent på kundens egen bedrift
- **Få bort det du gjør manuelt**, automatikk mellom verktøy kunden har fra før
- **App, hvis du faktisk trenger en**, med «de fleste trenger det ikke» sagt rett ut

**Følger opp:** `PRODUCT.md` beskriver fortsatt Oppskalert som et rent
nettsidebyrå. Skal AI-posisjonen stå, må den filen oppdateres, siden den
styrer den ekte siden og leses av alle sesjoner. Det er en posisjoneringsbeslutning,
ikke en tekstendring, så den ligger til Aleksander.
