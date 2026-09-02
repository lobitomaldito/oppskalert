# Google Ads: OPP-Sok-Norge

Søkekampanje mot den kommersielle søkeordsklyngen i `SEO.md` punkt 4. Alt som
kan forberedes utenfor kontoen ligger her. Selve kontoopprettelsen og
betalingskortet må du gjøre selv.

## Filene

| Fil | Hva |
| --- | --- |
| `sokeord.csv` | 30 søkeord i 4 annonsegrupper, med bud og landingsside |
| `negative-sokeord.csv` | 37 negative søkeord på kampanjenivå |
| `annonser.csv` | Én responsiv søkeannonse per gruppe, 11 overskrifter og 4 beskrivelser hver |

Alle tekstfelt er maskinsjekket mot Googles grenser (overskrift 30 tegn,
beskrivelse 90, sti 15) og mot tekstreglene i `CLAUDE.md`: ingen tankestrek,
ingen «vi», ingen særskriving.

**Merk om særskriving:** søkeordene i `sokeord.csv` inneholder «nettside pris»
og «hjemmesider pris». Det er med vilje. Et søkeord er det folk faktisk taster,
ikke tekst vi publiserer. Reglene gjelder annonsetekstene, og der er de fulgt.

## Struktur

| Annonsegruppe | Landingsside | Hvorfor |
| --- | --- | --- |
| Pris | `/priser` | Klyngen med høyest intensjon og lavest CPC, 5,40 til 9,80 kr |
| Ny nettside | `/nettside-til-bedrift` | «ny nettside» har 320 søk i måneden |
| Nettside til bedrift | `/nettside-til-bedrift` | Bredere, litt lavere intensjon |
| Webdesign Oslo | `/webdesign-oslo` | Geografisk, siden finnes allerede |

`/sokemotoroptimalisering` er bevisst holdt utenfor. 590 søk i måneden er det
største enkeltordet i klyngen, men SEO er et annet salg enn en nettside, og en
kampanje som blander de to lærer ingenting om noen av dem. Det er fase to.

## Sånn setter du det opp

1. **Opprett kontoen** på `ads.google.com` med Google-kontoen din, og hopp over
   veiviseren som vil lage en Smart-kampanje. Velg «Bytt til ekspertmodus» før
   du oppgir noe som helst, ellers havner du i et grensesnitt uten søkeord.
2. **Legg inn betalingskort.** Google krever det før noe kan kjøre.
3. **Lag kampanjen manuelt** med innstillingene i tabellen under.
4. **Importer de tre CSV-filene** i Google Ads Editor: Konto, Importer, Fra fil.
   Editor er gratis og lastes ned fra Google. Nettgrensesnittet kan også ta
   masseopplasting, men Editor gir deg forhåndsvisning før noe publiseres.
5. **Koble GA4 til Google Ads** og importer nøkkelhendelsen (se under).

### Kampanjeinnstillinger

| Innstilling | Verdi | Hvorfor |
| --- | --- | --- |
| Kampanjetype | Søk | Ikke Display, ikke Performance Max |
| Mål | Ingen målveiledning | Veiledningen skrur på ting du ikke ba om |
| Dagsbudsjett | 120 kr | Volumet er taket her, ikke budsjettet |
| Budstrategi | Maksimer klikk, maks CPC 25 kr | Kontoen har null konverteringsdata. «Maksimer konverteringer» uten historikk leverer dårlig. Bytt etter ca. 30 konverteringer |
| Nettverk | Kun søk | **Skru av søkepartnere og Display.** Display er standard på, og det er der budsjettet forsvinner |
| Sted | Norge | «Personer i eller regelmessig i» dette stedet, ikke «interessert i» |
| Språk | Norsk og engelsk | Mange norske brukere har engelsk nettleser |
| Annonserotasjon | Optimaliser | |
| Automatiske utvidelser | Av | Google skriver om annonsetekst hvis den står på. Samme problem som Advantage+ på Meta |

### Utvidelser (legges inn i grensesnittet)

**Nettstedslenker**

| Tekst | Beskrivelse 1 | Beskrivelse 2 | URL |
| --- | --- | --- | --- |
| Se alle priser | Engangspris eller drift | Fast pris, ingen binding | `/priser` |
| Regn ut din pris | Kalkulator med fast pris | Svar på under ett minutt | `/kalkulator` |
| Se sider jeg har bygget | Ekte kundeprosjekter | Med tall fra hver lansering | `/arbeid` |
| Slik jobber jeg | Demo ferdig på 48 timer | Ingen timepris som løper | `/metode` |

**Forklaringer:** Fast pris · Ingen bindingstid · Du eier alt · Gratis demo på 48 timer · Bygget i Norge

## Konverteringssporing

Dette er delen folk hopper over, og da er kontoen blind etter en måned.

GA4-taggen ligger allerede i `index.html` (`G-ZK79YPLLX8`), men fram til nå
sendte den bare sidevisninger. Skjemainnsendinger gikk kun til PostHog og
Supabase. Jeg har lagt inn en bro i `src/lib/analytics.js` som sender alle
`track()`-hendelser videre til GA4 også.

Etter at den er deployet:

1. GA4, Administrator, Hendelser: vent til `demo_request_submitted` dukker opp
   i listen. Det tar opptil 24 timer etter første ekte innsending.
2. Merk den som **nøkkelhendelse**.
3. Google Ads, Verktøy, Konverteringer, Importer, Google Analytics 4:
   velg `demo_request_submitted`.
4. Sett den som **primær** konverteringshandling. Alt annet settes til sekundær,
   ellers byr Google mot feil signal.

Andre hendelser verdt å importere som sekundære, de finnes allerede i koden:
`demo_form_steg1_fullfort`, `kalkulator_demo_klikket`, `contact_phone_clicked`.

## Hva du skal se etter, og når

| Når | Hva |
| --- | --- |
| Dag 1 til 3 | Søkeordsrapporten. Alt som ikke er kjøpsintensjon legges til som negativt |
| Uke 1 | Kvalitetspoeng per søkeord. Under 5 betyr at landingssiden ikke matcher søket |
| Uke 2 til 4 | Første konverteringer. Med 50 til 150 klikk i måneden tar det tid |
| Etter 30 konverteringer | Bytt budstrategi til Maksimer konverteringer |

Ikke rør noe de første ti dagene utover negative søkeord. Google trenger data,
og hyppige endringer nullstiller læringen på samme måte som på Meta.

## Forventning

Hele den kommersielle klyngen er rundt 2 000 søk i måneden i hele Norge, delt
på alle som konkurrerer om dem. Realistisk snakker vi 50 til 150 klikk i
måneden til deg. Det er en dryppekran med god intensjon, ikke en vekstkanal.
Den erstatter ikke Meta, den fanger opp de som allerede leter.
