export default {
  slug: "ny-nettside-uten-a-miste-google",
  klynge: "nettside",
  title: "Ny nettside uten å miste Google: slik flytter du riktig",
  description: "Slik beholder du plasseringene i Google når du får ny nettside: kartlegg gamle adresser, sett opp 301-videresendinger, test før lansering og følg opp etterpå.",
  publishDate: "2026-11-12",
  keywords: ["beholde seo ny nettside", "flytte nettside", "ny nettside google"],
  hero: "",
  svar: "Du beholder plasseringene i Google ved å gi hver gammel adresse en permanent videresending (301 eller 308) til siden som erstatter den, og la videresendingene stå i minst ett år. Før lansering fjerner du sperrer fra testmiljøet og sender inn et nytt nettstedskart. Etterpå følger du de samme sidene i Search Console i noen uker.",
  faq: [
    { q: "Hvor lenge skal videresendingene stå?", a: "Google anbefaler så lenge som mulig, og vanligvis minst ett år etter flyttingen." },
    { q: "Kan jeg sende alle gamle sider til forsiden?", a: "Nei. Google fraråder å sende mange gamle adresser til én side som ikke handler om det samme. Gamle sider skal videre til siden som erstatter dem, og innhold uten erstatning skal svare med 404 eller 410." },
    { q: "Hvor lang tid tar det før Google viser de nye adressene?", a: "For et nettsted av middels størrelse sier Google at det kan ta noen uker eller mer. Større nettsteder kan bruke lenger tid." },
  ],
  content: `## Plasseringene ligger på adressene

Google rangerer adresser. Når du bytter nettside, får mange sider nye adresser, og hver gamle adresse som bare forsvinner, tar med seg plasseringen og lenkene som pekte dit. Løsningen er en permanent videresending fra hver gammel adresse til siden som erstatter den.

[Googles veiledning for flytting av nettsted](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) sier at permanente videresendinger på serveren, 301 eller 308, er førstevalget. Google skriver også at en 301 ikke fører til tap av lenkeverdi. Gjøres dette riktig, kan du bytte både design og plattform uten å starte på null.

## Lag listen over gamle adresser først

Før noe nytt tegnes, trenger du en liste over alle adressene dagens side har. Ta med sider som ikke står i menyen: gamle tjenestesider, artikler, PDF-er og kampanjesider. Search Console viser hvilke sider som får klikk fra Google, og det er dem som haster mest.

Gi hver adresse én av tre beslutninger: den beholdes med samme adresse, den flyttes til en ny adresse, eller den fjernes. En side med få besøk kan likevel være viktig hvis besøkene kommer fra folk som skal kjøpe. Når jeg lager en [ny nettside](/ny-nettside) for noen som allerede har en, er denne listen det første jeg gjør, før designet. Den gamle siden står oppe til du har sagt ja til den nye.

Det enkleste er ofte å beholde adressene som allerede beskriver innholdet godt. En ny adresse uten grunn gir bare en videresending mer å holde orden på.

## Hver gammel adresse skal ha et bestemt mål

En videresending skal gå til siden som svarer på det samme spørsmålet. Google fraråder uttrykkelig å sende mange gamle adresser til én side som ikke handler om det samme, for eksempel forsiden. Slår du sammen tre gamle sider til én ny, er det greit at alle tre peker dit.

Fjerner du innhold som ikke har noen erstatning, skal den gamle adressen svare med 404 eller 410. Det er ærligere overfor både Google og den besøkende enn en videresending til noe tilfeldig.

Pass også på kjedene. Går en gammel adresse til en adresse som selv videresender videre, bør den peke rett til målet. Google anbefaler helst ikke mer enn tre ledd. Les mer om hvordan en [301-videresending](/ordliste/redirect-301) virker i ordlisten.

## Test søketilgangen før lansering

En nettside kan se ferdig ut i nettleseren og likevel være stengt for Google. Under bygging står den nye siden ofte med noindex eller en sperre i robots.txt, slik at testversjonen ikke havner i søket. Google sier at slike sperrer skal fjernes når siden går live.

Det er to ulike ting. Noindex ber Google holde siden utenfor søkeresultatene, mens robots.txt hindrer Google i å hente den. Google presiserer at noindex bare virker når siden ikke samtidig er blokkert i robots.txt, fordi Google må hente siden for å se regelen. Sjekk derfor begge på de sidene som skal være synlige.

Sjekk også canonical-taggen, altså hvilken adresse hver side oppgir som sin foretrukne. Etter flyttingen skal den peke på den nye adressen. Prøv til slutt kontaktskjemaet og telefonlenken på den publiserte siden. Mer om det tekniske grunnlaget står i [innlegget om teknisk SEO](/blogg/teknisk-seo).

## Lanseringsdagen

Når den nye siden er live, sender du inn et nytt nettstedskart med de nye adressene i Search Console. Google skriver at det hjelper Google å lære de nye adressene, og at det er normalt at det gamle kartet gir varsler om videresendinger en stund.

Bytter du domene, for eksempel fra et gammelt firmanavn til et nytt, har Search Console et eget verktøy for adresseendring. Google sier det bare trengs når du flytter mellom domener eller underdomener, og at det ikke er nødvendig for flytting innenfor samme domene eller fra http til https.

Test så et utvalg gamle adresser selv. Lim dem inn i nettleseren og se at hver av dem lander på siden som svarer på det samme som før.

## Følg de samme sidene etterpå

Plasseringene kan svinge mens Google leser nettstedet på nytt. For et nettsted av middels størrelse sier Google at det kan ta noen uker eller mer før de nye adressene vises gradvis. Målet er at trafikken på de gamle adressene faller mens den stiger på de nye.

Bruk listen fra starten. Sammenlign de viktigste sidene før og etter, og se på visninger, klikk og henvendelser hver for seg. Faller henvendelsene mens besøkene holder seg, ligger problemet i teksten eller kontaktveien på den nye siden. Hvordan du måler det, står i [innlegget om å måle nettsiden](/blogg/gir-nettsiden-kunder).

La videresendingene stå. Google anbefaler så lenge som mulig, vanligvis minst ett år. Avklar hvem som har ansvaret for dem når prosjektet er ferdig, særlig hvis du bytter leverandør.

## Neste steg

Åpne Search Console, gå til ytelsesrapporten og eksporter sidene som har fått klikk de siste tolv månedene. Det er startlisten din. Skal du bytte nettside, ta med den listen inn i første samtale med den som skal bygge, og be om å få se hvor hver av adressene skal ende. Kan ingen svare på det, er kartleggingen ikke gjort ennå.`,
};
