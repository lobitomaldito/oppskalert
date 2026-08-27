/* 2026-08-27, ukentlig SEO-rutine. Målt i Search Console over 28 dager:
   denne artikkelen lå på snittposisjon 9,3 på «responsiv nettside» med 116
   visninger, og 8,4 på «responsiv hjemmeside oslo» med 12 visninger. 128
   visninger på førstesiden, null klikk. Tre ting sto i veien:

   Titlen var 64 tegn, 77 med «| Oppskalert», og ble kuttet i SERP-en
   nøyaktig der løftet lå. Den er nå 44 tegn, 57 med suffikset, med
   eksaktfrasen først og en grunn til å klikke etter kolonet.

   Artikkelen hadde null interne lenker i brødteksten, enda den er den eneste
   siden på nettstedet som står på førstesiden. Tre lenker er lagt inn, én per
   seksjon, mot /nettside-design, /priser og /kontakt. Ingen lenke til
   /webdesign-oslo med vilje: forsidens Oslo-title fra 24. august måles alene
   fram til neste kjøring, og en ny intern lenke ville forurenset den.

   Fortsatt åpent: hero-feltet er tomt, så siden har ingen og:image og ingen
   miniatyr i mobilsøk. Fire av åtte artikler mangler det samme. */

export default {
  slug: "responsiv-nettside",
  title: "Responsiv nettside: slik tester du siden din",
  description: "Responsiv nettside betyr at den tilpasser seg mobilen av seg selv. Her er de tre tegnene på at din ikke gjør det, og testen du kjører på egen telefon.",
  publishDate: "2026-08-10",
  keywords: ["responsiv nettside", "mobiltilpasset nettside"],
  hero: "",
  content: `## Hva "responsiv nettside" faktisk betyr

En responsiv nettside tilpasser layout, tekststørrelse og bilder automatisk til skjermen den vises på, enten det er en mobil på 375 piksler bred eller en skjerm på 1920. Det er ikke det samme som å ha en egen "mobilversjon" av siden. God responsiv design bruker én kodebase som endrer seg fleksibelt, i stedet for to separate sider som må vedlikeholdes hver for seg. Uten dette må mobilbrukere pinsje, zoome og skrolle sidelengs for å lese teksten, og de fleste gir opp før de kommer gjennom hele siden.

## Hvorfor mobil kommer først, ikke sist

Over 60 % av trafikken til de fleste norske bedriftssider kommer i dag fra mobil. Likevel designer mange fortsatt for skjerm først og tilpasser mobil etterpå, som en ettertanke. Det snur prioriteringene feil vei. Når du designer mobil først, tvinger du deg selv til å bestemme hva som faktisk er viktigst på siden, fordi det ikke er plass til alt på en liten skjerm. Det resultatet, en tydelig prioritert side, fungerer som regel bedre på desktop også, ikke bare på mobil. Det er den samme rekkefølgen jeg jobber etter når jeg tegner [design av nettside](/nettside-design).

## Vanlige tegn på at siden din ikke er responsiv

Sjekk om du må zoome for å lese teksten på mobilen din. Sjekk om knapper er så små at du bommer på dem med tommelen. Sjekk om menyen dekker hele skjermen uten en tydelig måte å lukke den på. Disse tre tingene er de vanligste symptomene på en side som ikke faktisk er bygget for mobil, selv om den kanskje "ser grei ut" på en datamaskin. Google straffer dessuten sider som ikke er mobilvennlige med lavere rangering i søk, så problemet er ikke bare kosmetisk. Kjenner du igjen alle tre, er siden moden for å bygges om, og da står [prisene mine åpent](/priser).

## Mobil-først handler om mer enn skjermstørrelse

Mobilbrukere har ofte dårligere nettforbindelse enn de med fiber hjemme, og de bruker siden med én tommel mens de gjør noe annet samtidig. Det betyr at knapper bør være minst 44 piksler høye for å være enkle å treffe, og at hver side bør laste raskt selv på 4G. Et bilde på 5 MB som ser fint ut på en bred skjerm, kan alene bruke flere sekunder å laste på mobil. Responsiv design handler derfor like mye om ytelse som om hvordan ting ser ut visuelt.

## Testene som avslører de virkelige problemene

Du trenger ikke gjette om siden din fungerer på mobil. Google PageSpeed Insights gir deg en konkret score og peker på nøyaktig hvilke elementer som er for trege eller for små. Test også siden på en ekte telefon, ikke bare ved å gjøre nettleservinduet smalere på skjermen din, fordi berøringsflater og skriftstørrelse oppleves annerledes i hånden. Fem minutter med disse to testene avdekker som regel de samme problemene en betalt konsulent ville brukt en hel rapport på å beskrive.

## Hva det koster å ikke være responsiv

En besøkende bruker under to sekunder på å bestemme seg for om de blir eller forlater en side. Er teksten uleselig eller knappene umulige å treffe på mobilen, er den avgjørelsen tatt før du i det hele tatt fikk vist frem tilbudet ditt. For en bedrift som får det meste av trafikken sin fra Google-søk på mobil, betyr en dårlig mobilopplevelse rett og slett tapte kunder hver eneste dag siden er live, uavhengig av hvor godt selve produktet eller tjenesten er.

## Hva du bør gjøre denne uken

Åpne nettsiden din på telefonen og gå gjennom den som om du var en ny kunde. Noter hvert sted du må zoome, bommer på en knapp, eller venter mer enn et par sekunder på at noe laster. Kjør deretter adressen gjennom Google PageSpeed Insights og se hvilken score du får for mobil spesifikt. Disse to stegene tar under 20 minutter og gir deg en konkret liste å jobbe videre med.\n\nEr listen lengre enn du hadde håpet, [ta kontakt](/kontakt), så ser jeg på siden din og sier hva som faktisk må gjøres.`,
};
