import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import { Avsnitt } from '../components/Landingsside';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { ruter } from '../lib/site';

/* Dedikert landingsside for søkeordet «søkemotoroptimalisering» (590 søk/mnd,
   KD 9 per SEO.md punkt 4). Mønsteret er hentet fra konkurrentene som faktisk
   rangerer: én side per kommersielt søkeord, med ordet i URL-en, i stedet for
   å håpe at forsiden dekker alt. */

const seoSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Søkemotoroptimalisering',
  serviceType: 'Søkemotoroptimalisering (SEO)',
  description:
    'Teknisk SEO, innhold og lenkebygging for norske bedrifter. Jeg måler først, fikser det som faktisk blokkerer, og rapporterer på synlighet i både Google og AI-assistenter.',
  areaServed: { '@type': 'Country', name: 'Norge' },
  provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
  url: 'https://oppskalert.no/sokemotoroptimalisering',
};

const Innhold = () => {
  const container = useReveal(70);
  return (
    <section ref={container} className="seksjon pt-0">
      <div className="wrap flex flex-col gap-14 md:gap-20">
        <Avsnitt tittel="Det tekniske" uthevet="kommer først.">
          <p>
            De fleste som selger søkemotoroptimalisering begynner med søkeord. Jeg begynner med
            å sjekke om Google i det hele tatt får se nettsiden din, for det er der de fleste
            norske småbedriftssider faller.
          </p>
          <p>
            Et vanlig funn: siden er bygget slik at innholdet settes inn av JavaScript etter at
            selve siden er lastet. Mennesker merker det ikke. Men henter du siden slik en robot
            gjør, sitter du igjen med 46 ord, ingen overskrift og ingen brødtekst. Jeg har målt
            akkurat det tallet på en side som så helt normal ut i nettleseren.
          </p>
          <p>
            Det andre klassiske funnet er en sitemap som svarer med feilmelding. Da har Google
            ingen liste over sidene dine og finner bare det den snubler over. Begge deler er
            usynlige fra utsiden, og begge deler gjør alt annet arbeid verdiløst så lenge de står.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Ord folk" uthevet="faktisk søker på.">
          <p>
            Neste steg er å skrive om det kundene dine googler, ikke om hvordan bedriften liker
            å beskrive seg selv. «Skreddersydde helhetsløsninger» har null søk i måneden. «Hva
            koster en nettside» har flere hundre.
          </p>
          <p>
            Jeg henter faktiske søkevolum for bransjen din, sorterer bort søkene som gir trafikk
            uten kjøpere, og fordeler resten på sider. Én side per søk kunden din har, ikke én
            side som prøver å dekke alt.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Lenker fra" uthevet="andre nettsteder.">
          <p>
            Google bruker lenker som stemmer. Hver lenke fra et annet nettsted er noen som går
            god for deg, og det som teller er antall ulike domener, ikke antall lenker. Femhundre
            lenker fra samme sted teller omtrent som én anbefaling.
          </p>
          <p>
            Jeg kjøper aldri lenker. Det gir mer skade enn nytte, og det tar Google igjen på.
            I stedet henter vi de gratis kildene som faktisk finnes: bedriftsprofil, bransje- og
            firmaregistre, lokale foreninger, og omtale hos folk du allerede jobber med.
          </p>
        </Avsnitt>

        <Avsnitt tittel="AI-søk er" uthevet="en egen kanal nå.">
          <p>
            Stadig flere spør ChatGPT i stedet for å google. Det endrer kravene, for de fleste
            AI-crawlere kjører ikke JavaScript i det hele tatt. En side som Google så vidt klarer
            å tolke, er helt tom for dem.
          </p>
          <p>
            Praktisk betyr det at det tekniske arbeidet i første avsnitt gjør dobbel nytte. Får
            robotene ferdig lest tekst, kan de også sitere deg. Jeg legger i tillegg inn
            strukturerte data og en llms.txt, så det er tydelig hva bedriften gjør og hvor den
            holder til.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Hva du" uthevet="kan forvente.">
          <p>
            Ingen seriøs leverandør kan love deg førsteplass, og alle som gjør det selger deg
            noe annet enn de sier. Google er ikke en knapp noen kan trykke på.
          </p>
          <p>
            Det jeg kan love er at du får se målingene. Vi setter opp Google Search Console på
            ditt eget domene, så ser du selv hvilke søk du dukker opp på, hvor mange som klikker,
            og om kurven peker riktig vei. Realistisk tidsramme på et nytt domene er noen uker
            før de første visningene, og et par måneder før posisjonene setter seg.
          </p>
        </Avsnitt>
      </div>
    </section>
  );
};

const punkter = [
  'Teknisk gjennomgang: hva robotene faktisk ser når de henter siden',
  'Sitemap, robots.txt og indeksering satt opp og verifisert',
  'Søkeordsanalyse med reelle søkevolum for din bransje',
  'Titler, beskrivelser og overskrifter skrevet for søk, ikke for merkevare',
  'Strukturerte data og llms.txt, så du er lesbar for AI-assistenter',
  'Google Search Console satt opp på ditt domene, med tilgang til deg',
  'Plan for lenker fra gratis, troverdige kilder',
];

const Inkludert = () => {
  const container = useReveal(60);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Hva som"
          uthevet="inngår."
          lede="Samme jobb jeg har gjort på denne siden, gjort på din."
        />
        <ul data-reveal className="grid gap-3.5 md:grid-cols-2 max-w-[62rem]">
          {punkter.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 font-body text-[0.95rem] text-primary/85 leading-relaxed"
            >
              <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p data-reveal className="font-body text-[0.95rem] text-primary/80 mt-8 max-w-[54ch] leading-relaxed">
          Søkemotoroptimalisering inngår som en kvartalsvis gjennomgang i det øverste
          driftsnivået. Se <Link to={ruter.drift} className="text-accent hover:text-highlight transition-colors">drift og support</Link> for
          hva de tre nivåene koster, eller <Link to={ruter.priser} className="text-accent hover:text-highlight transition-colors">prissiden</Link> for
          nye nettsider.
        </p>
      </div>
    </section>
  );
};

const SeoPage = () => (
  <Shell>
    <SEO
      title="Søkemotoroptimalisering for norske bedrifter"
      description="Søkemotoroptimalisering som starter med det tekniske: hva robotene faktisk ser. Jeg måler, fikser det som blokkerer, og setter opp Search Console så du ser tallene selv."
      keywords={['søkemotoroptimalisering', 'seo norge', 'seo bedrift', 'synlighet i google']}
      canonical="https://oppskalert.no/sokemotoroptimalisering"
      jsonLd={seoSchema}
    />
    <SideTopp
      /* Myk bindestrek (U+00AD): ordet er 23 tegn uten naturlig brytepunkt og
         klippet ut av skjermen på mobil. Tegnet er usynlig til linjen faktisk
         må brytes, og søkemotorer normaliserer det bort ved indeksering. */
      tittel={'Søkemotor­optimalisering'}
      uthevet="som starter med målinger."
      lede="De fleste SEO-tilbud begynner med en liste over søkeord. Jeg begynner med å sjekke om Google i det hele tatt får se nettsiden din, for det er som regel der problemet ligger."
    />
    <Innhold />
    <Inkludert />
    <DemoSkjema
      tittel="Vil du vite hva"
      uthevet="som blokkerer deg?"
      lede="Fortell meg kort om bedriften, så henter jeg siden din slik en robot gjør og sier hva jeg finner. Uforpliktende."
    />
  </Shell>
);

export default SeoPage;
