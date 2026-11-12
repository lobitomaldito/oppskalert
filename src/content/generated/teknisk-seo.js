export default {
  slug: "teknisk-seo",
  klynge: "seo",
  title: "Teknisk SEO: sjekkliste med forklaring for bedriftseiere",
  description: "Teknisk SEO forklart som en sjekkliste: indeksering, Core Web Vitals, mobil, HTTPS, videresendinger, sitemap, robots.txt og strukturerte data.",
  publishDate: "2026-11-12",
  keywords: ["teknisk seo", "teknisk seo sjekkliste"],
  hero: "",
  svar: "Teknisk SEO er det som avgjør om Google kan finne, lese og lagre sidene dine, og hvor raskt de vises. De viktigste punktene er indeksering, fart målt med Core Web Vitals, mobilvisning, HTTPS, videresendinger, sitemap og robots.txt. Med Search Console og PageSpeed Insights, begge gratis fra Google, finner du de fleste feilene selv.",
  faq: [
    { q: "Hva er forskjellen på teknisk SEO og annen SEO?", a: "Teknisk SEO handler om at Google kan finne, lese og lagre sidene, og at de laster raskt. Resten av SEO handler om hva tekstene sier og hvilke søk de svarer på." },
    { q: "Hva er gode Core Web Vitals-tall?", a: "Hovedinnholdet skal vises innen 2,5 sekunder, siden skal svare på trykk innen 200 millisekunder, og innholdet skal ikke flytte seg mer enn 0,1. Google regner det som godt når tre av fire besøk klarer grensene." },
    { q: "Gir FAQ-merking fortsatt ekstra plass i Google?", a: "Nei. Google sluttet å vise FAQ-utvidelser i søkeresultatene fra 7. mai 2026. Merking av åpningstider og andre bedriftsopplysninger er fortsatt i bruk." },
  ],
  content: `## Hva er teknisk SEO?

Teknisk SEO er alt som avgjør om Google kan finne, lese og lagre sidene dine, og hvor raskt de vises for den som søker. Tekstene bestemmer hva du blir funnet på. Det tekniske bestemmer om du kan bli funnet i det hele tatt. Lista under har de punktene jeg sjekker først på en nettside, med hva hvert av dem betyr for deg som eier bedriften.

Det meste kan du sjekke selv med to gratis verktøy fra Google: Search Console og PageSpeed Insights. Det som krever endringer i koden, er en del av det jeg gjør under [søkemotoroptimalisering](/sokemotoroptimalisering).

## Indeksering: er sidene med i Google?

Indeksering betyr at Google har lagret siden og kan vise den i et søk. En side som ikke er indeksert, finnes ikke for kundene, uansett hvor god den er. Google skriver selv at indeksering aldri er garantert.

Slik sjekker du: lim inn adressen i URL-inspeksjonen i Search Console. Er siden ikke indeksert, oppgir Google grunnen. En vanlig grunn er en noindex-merking som ble glemt igjen fra testversjonen. Hele fremgangsmåten står i innlegget om [å bli synlig på Google](/blogg/synlig-i-google).

## Fart: Core Web Vitals i tre tall

Google oppgir at Core Web Vitals brukes i rangeringen. Det er tre målinger:

- Hovedinnholdet skal vises innen 2,5 sekunder (LCP).
- Siden skal svare på et trykk innen 200 millisekunder (INP).
- Innholdet skal ikke hoppe rundt mens siden laster, med en verdi på 0,1 eller lavere (CLS).

Google regner siden som god når tre av fire besøk klarer grensene. PageSpeed Insights viser to slags tall: målinger fra ekte Chrome-brukere de siste 28 dagene, og en simulert test på en mellomklasse mobil. Les mer i ordlista under [Core Web Vitals](/ordliste/core-web-vitals), og om poengsummen i innlegget om [PageSpeed-score](/blogg/pagespeed-score-forklart).

Gode tall gir ingen toppplassering alene. Google skriver at de alltid prøver å vise det mest relevante innholdet, også når sideopplevelsen er svakere.

## Mobil og HTTPS

Google bruker mobilversjonen av siden når den indekseres og rangeres. Tekst som mangler på mobil, teller derfor ikke. Åpne siden på telefonen og sjekk at teksten kan leses uten å zoome, at knappene er lette å treffe, og at ingen tekst er borte. Innlegget om [responsiv nettside](/blogg/responsiv-nettside) går gjennom testen.

HTTPS betyr at forbindelsen mellom nettleseren og siden er kryptert. Google spør om sidene leveres sikkert i sin egen sjekkliste for sideopplevelse. Sjekk at alle adressene åpner med https, og at http-versjonen sendes videre dit. Det krever et [SSL-sertifikat](/ordliste/ssl-sertifikat).

## Videresendinger, sitemap og robots.txt

Videresendinger trengs hver gang en adresse endres, for eksempel når du bytter nettside. Google anbefaler permanente videresendinger på serveren, med kode 301 eller 308. Da forstår Google at den nye adressen har tatt over, og besøkende som kommer via gamle lenker, havner riktig. Se [301-videresending](/ordliste/redirect-301) i ordlista.

Sitemapen er en fil med alle adressene du vil ha med i Google, og den sendes inn i Search Console. Google skriver at et nettsted på rundt 500 sider eller færre, med gode lenker mellom sidene, ikke nødvendigvis trenger en, men de fleste har nytte av den.

robots.txt styrer hvilke adresser søkeroboter får hente. Google skriver at fila ikke er laget for å holde sider ute av søket. Skal en side holdes ute, bruker du noindex eller passord. Sjekk at fila ikke sperrer sider du vil bli funnet på.

## Strukturerte data: hva som fortsatt gir noe

Strukturerte data er merking i koden som forteller Google hva innholdet er, for eksempel at en tekst er en adresse eller en åpningstid. Mange sjekklister anbefaler fortsatt FAQ-merking for å få spørsmål og svar rett i søkeresultatet. Den funksjonen er borte: ifølge [Googles dokumentasjon](https://developers.google.com/search/docs/appearance/structured-data/faqpage) vises ikke FAQ-utvidelser lenger fra 7. mai 2026.

Merking av bedriften gjelder derimot fortsatt. Med LocalBusiness-merking kan du blant annet fortelle Google om åpningstider og avdelinger. For en lokal bedrift er det den merkingen som er verdt å ha på plass.

## Slik går du gjennom lista på en kveld

Lim inn forsiden og den viktigste tjenestesiden i URL-inspeksjonen i Search Console, og noter om de er indeksert. Kjør de samme to adressene gjennom PageSpeed Insights på mobil, og skriv ned de tre tallene. Åpne siden på telefonen, og skriv http:// foran domenet for å se om du sendes til https. Finner du noe som ikke stemmer, har du nå en liste med konkrete feil, og det er det første en utvikler trenger for å rette dem.`,
};
