export default {
  slug: "seo-optimalisert-nettside",
  klynge: "seo",
  title: "SEO-optimalisert nettside: dette må bygges inn fra start",
  description: "Hva gjør en nettside SEO-optimalisert? Dette må være bygget inn før lansering, og disse spørsmålene bør du stille leverandøren før du skriver under.",
  publishDate: "2026-11-12",
  keywords: ["seo-optimalisert nettside", "nettside optimalisert for google", "seo-vennlig nettside"],
  hero: "/blogg/seo-optimalisert-nettside.webp",
  svar: "En SEO-optimalisert nettside har én side per tjeneste med egen tittel og beskrivelse, tekst som står på mobilversjonen, god fart målt med Core Web Vitals, en sitemap og permanente videresendinger fra gamle adresser. Alt dette er billigst å bygge inn før lansering. Spør leverandøren konkret om hvert punkt før du skriver under.",
  faq: [
    { q: "Er alle nye nettsider SEO-optimalisert?", a: "Det avhenger av hvordan de er bygget. Sjekk at hver tjeneste har sin egen side med egen tittel og beskrivelse, at noindex-merkingen fra testversjonen er fjernet, og at Search Console er satt opp på ditt domene." },
    { q: "Hva skjer med Google-plasseringene når jeg bytter nettside?", a: "Endres adressene, må de gamle sendes videre til de nye med permanente videresendinger (301 eller 308). Uten dem havner besøk fra Google og gamle lenker på en feilside." },
    { q: "Hvordan sjekker jeg farten på en nettside?", a: "Lim inn adressen i Googles gratis PageSpeed Insights. Google regner siden som god når hovedinnholdet vises innen 2,5 sekunder, siden svarer på trykk innen 200 millisekunder og innholdet ikke hopper mer enn 0,1." },
  ],
  content: `## Hva betyr det at en nettside er SEO-optimalisert?

En SEO-optimalisert nettside er bygget slik at Google kan finne alle sidene, forstå hva hver av dem handler om og vise dem raskt på mobil. Det meste av dette avgjøres mens siden bygges: strukturen, adressene, hvor teksten står og hvor tung siden er. Å rette det i etterkant koster mer enn å gjøre det riktig første gang.

Google sier det samme i sin egen veiledning om å leie inn SEO-hjelp: et godt tidspunkt er når du planlegger en ny nettside eller et redesign, og jo tidligere jo bedre. Denne artikkelen er skrevet for deg som skal få laget en [ny nettside](/ny-nettside) og vil vite hva du skal kreve av leverandøren.

## Én side per tjeneste, med adresser som sier noe

Strukturen er det første som må på plass. Hver tjeneste du vil bli funnet på, trenger en egen side med en egen adresse, for eksempel /baderom-drammen i stedet for /side?id=14. Google skriver at deler av adressen kan vises i søkeresultatet, og at folk bruker den til å vurdere om treffet er nyttig.

Hver side trenger også sin egen tittel og beskrivelse. Tittelen er den klikkbare overskriften i søkeresultatet, og Google anbefaler at den er unik for siden og beskriver innholdet presist. Det finnes ingen fast lengdegrense, men lange titler kuttes for å passe skjermen. Beskrivelsen, også kalt [metabeskrivelse](/ordliste/metabeskrivelse), brukes av og til som teksten under lenken, så den bør skrives for hver side.

## Tekst som Google kan lese på mobil

Google bruker mobilversjonen av en side når siden indekseres og rangeres. Teksten du vil bli funnet på, må altså stå på mobilversjonen. Skjuler designet halvparten av teksten på små skjermer, eller er overskriftene lagt inn som bilder, mister Google det den skulle lese.

Spør også hvem som skriver tekstene, og ut fra hvilke søk. En ny nettside med de samme tekstene som den gamle, gir Google lite nytt å vurdere. Tekstene bør bruke ordene kundene søker med, og svare på søket i første avsnitt.

## Fart: tre tall du kan kreve

Google oppgir at Core Web Vitals brukes i rangeringen. Det er tre målinger av hvordan siden oppleves: hovedinnholdet skal vises innen 2,5 sekunder, siden skal svare på et trykk innen 200 millisekunder, og innholdet skal ikke hoppe rundt mens det laster (en verdi på 0,1 eller lavere). Google regner siden som god når tre av fire besøk klarer grensene.

Gode tall gir ingen garanti for toppplassering. Google skriver at de alltid prøver å vise det mest relevante innholdet, også når sideopplevelsen er svakere. Fart er likevel et av få punkter du kan få skriftlig fra leverandøren og sjekke selv i PageSpeed Insights. Mer om målingene står under [Core Web Vitals](/ordliste/core-web-vitals) i ordlista.

## Det som må være på plass den dagen siden lanseres

Lanseringen er der mye kan gå galt, fordi den gamle siden byttes ut på én dag. Sjekk disse punktene før du godkjenner:

- Gamle adresser sendes videre til de nye med permanente videresendinger på serveren (301 eller 308). Google anbefaler det når en adresse endres.
- Noindex-merkingen fra testversjonen er fjernet.
- robots.txt sperrer ingen sider du vil ha med i Google.
- En sitemap er laget og sendt inn i Search Console.
- Search Console er satt opp på ditt eget domene, med deg som eier.

Mer om flyttingen står i innlegget om [ny nettside uten å miste Google](/blogg/ny-nettside-uten-a-miste-google), og hele den tekniske lista i innlegget om [teknisk SEO](/blogg/teknisk-seo).

## Spørsmål du bør stille leverandøren

Google har en egen liste over spørsmål å stille en SEO-leverandør, blant annet hvilke resultater de venter seg, på hvor lang tid, og hvordan de måler det. For en ny nettside vil jeg legge til disse:

- Får hver tjeneste sin egen side, med egen tittel og beskrivelse?
- Hvem skriver tekstene, og ut fra hvilke søk?
- Hva viser PageSpeed Insights på mobil for en side dere har levert?
- Hvordan sendes de gamle adressene videre?
- Blir Search Console satt opp i mitt navn?
- Hvem eier domenet og koden etter lansering?

Et ja uten forklaring er lite verdt. Be om å få se det på en side de har levert.

## Slik bygger jeg det

Jeg håndkoder sidene i stedet for å bruke WordPress, fontene er selvhostet, og sidene laster raskt. Struktur, metadata og fart ligger i bunnen fra start, og jeg setter opp Search Console og Analytics så du ser hva som skjer. Du endrer tekst og bilder selv i et redigeringspanel.

Medium koster 12 900 kr eks. mva og gir deg alle sidene du har i dag, med tekstene skrevet for Google og AI-søk. Du får et gratis utkast før du bestemmer deg, som regel klart på 48 timer. Alle nivåene står på [prissiden](/priser). Uansett hvem du velger: ta med spørsmålslista over til neste møte med en leverandør, også om det er meg.`,
};
