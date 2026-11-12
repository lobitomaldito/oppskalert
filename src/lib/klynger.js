import { prismodeller, driftNivaer, ruter } from './site.js';

/* Klyngene fra seo/seo-klynger.md. Hvert innlegg har `klynge`, som gir
   kategorien over tittelen, avslutningen med lenke til pengesiden, og «Les
   også». Formatet står i ~/.claude/assets/seo/artikkel-format.md.
   Prisene leses fra site.js, så avslutningene følger med når de endres. */
const pris = (p) => `${p.navn} ${p.fast ? '' : 'fra '}${p.fra} kr`;
const [enkel, medium, komplett] = prismodeller;
const [service, seo] = driftNivaer;
const UTKAST = 'Jeg bygger et ferdig utkast med ditt innhold før du bestemmer deg. Liker du det ikke, koster det ingenting.';

/* CTA-ene inne i teksten følger klyngen (12.11.2026). Før sto «Leter du
   egentlig bare etter en pris? Se hva en nettside koster» også midt i
   innlegg om Google Ads og sosiale medier, der leseren ikke ser etter
   en nettside. `tidlig` er tekstlenken etter introen, `midt` boksen
   halvveis. Den fylte knappen til slutt er avslutningen under. */
const UTKAST_LENKE = { tekst: 'be om et gratis utkast', rute: ruter.kontakt };
const SJEKK_LENKE = { tekst: 'sjekk siden din gratis', rute: ruter.nettsidesjekk };
const MIDT_UTKAST = { tittel: 'Vil du se dette gjort på din egen side?', tekst: UTKAST, knapp: 'Få et gratis utkast', rute: ruter.kontakt };
const MIDT_SJEKK = {
  tittel: 'Hvordan står det til med din side?',
  tekst: 'Skriv inn adressen, så får du en karakter fra A til F på noen sekunder. Gratis, uten e-post.',
  knapp: 'Sjekk siden din gratis',
  rute: ruter.nettsidesjekk,
};

export const klynger = {
  pris: {
    navn: 'Pris',
    pengeside: ruter.priser,
    tittel: 'Vil du vite hva din side koster?',
    tekst: `${pris(enkel)}, ${pris(medium)} og ${pris(komplett)}, alle eks. mva. Du får fast pris før jeg begynner.`,
    knapp: 'Se prisene',
    tidlig: { tekst: 'Leter du egentlig bare etter en pris?', lenke: { tekst: 'Se prisene', rute: ruter.priser }, ogsa: UTKAST_LENKE },
    midt: MIDT_UTKAST,
  },
  nettside: {
    navn: 'Ny nettside',
    pengeside: ruter.nyNettside,
    tittel: 'Vil du se hvordan din nye side kan bli?',
    tekst: UTKAST,
    knapp: 'Slik lager jeg ny nettside',
    tidlig: { tekst: 'Leter du egentlig bare etter en pris?', lenke: { tekst: 'Se hva en nettside koster', rute: ruter.priser }, ogsa: UTKAST_LENKE },
    midt: MIDT_UTKAST,
  },
  design: {
    navn: 'Design',
    pengeside: ruter.nettsideDesign,
    tittel: 'Vil du ha en side som ser ut som bedriften din?',
    tekst: UTKAST,
    knapp: 'Se hvordan jeg designer',
    tidlig: { tekst: 'Vil du heller se hva jeg ville laget for deg?', lenke: { tekst: 'Be om et gratis utkast', rute: ruter.kontakt }, ogsa: { tekst: 'se sider jeg har laget', rute: ruter.arbeid } },
    midt: MIDT_UTKAST,
  },
  seo: {
    navn: 'Synlighet',
    pengeside: ruter.seo,
    tittel: 'Vil du bli funnet på flere søk?',
    tekst: `SEO hos meg koster fra ${seo.fra} kr i måneden eks. mva, uten binding, med en rapport hver måned om hvem som fant deg.`,
    knapp: 'Les om søkemotoroptimalisering',
    tidlig: { tekst: 'Vil du heller at jeg gjør jobben?', lenke: { tekst: `SEO fra ${seo.fra} kr i måneden`, rute: ruter.seo }, ogsa: SJEKK_LENKE },
    midt: MIDT_SJEKK,
  },
  drift: {
    navn: 'Drift',
    pengeside: ruter.drift,
    tittel: 'Vil du slippe å passe på siden selv?',
    tekst: `Serviceavtalen koster ${service.fra} kr i måneden eks. mva, uten binding: endringer, backup, oppdateringer og support fra meg.`,
    knapp: 'Se drift og hosting',
    tidlig: { tekst: 'Vil du slippe å passe på siden selv?', lenke: { tekst: `Serviceavtale fra ${service.fra} kr i måneden`, rute: ruter.drift }, ogsa: SJEKK_LENKE },
    midt: MIDT_SJEKK,
  },
  markedsforing: {
    navn: 'Markedsføring',
    pengeside: ruter.kontakt,
    tittel: 'Vil du heller ha annonser som gir henvendelser?',
    /* Facebook-annonsering fra ~/.claude/assets/tilbud/MAL.md. Ingen egen
       side ennå, så knappen går til kontakt. */
    tekst: 'Jeg setter opp Facebook- og Instagram-annonser for 2 990 kr, og passer på dem for 1 990 kr i måneden uten binding, eks. mva. Annonsebudsjettet betaler du selv, rett til Meta.',
    knapp: 'Spør om annonser',
    tidlig: { tekst: 'Vil du heller at noen andre tar annonsene?', lenke: { tekst: 'Spør meg om Facebook-annonser', rute: ruter.kontakt }, ogsa: SJEKK_LENKE },
    midt: MIDT_SJEKK,
  },
};

/* Tre innlegg fra samme klynge, nyeste først. Har klyngen færre enn tre
   andre, fylles det opp med de nyeste fra resten av bloggen. */
export function lesOgsa(article, liste, antall = 3) {
  const andre = liste.filter((a) => a.slug !== article.slug);
  return [
    ...andre.filter((a) => a.klynge === article.klynge),
    ...andre.filter((a) => a.klynge !== article.klynge),
  ].slice(0, antall);
}
