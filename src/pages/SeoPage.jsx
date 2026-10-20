import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import { Avsnitt } from '../components/Landingsside';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { driftNivaer, lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Dedikert landingsside for søkeordet «søkemotoroptimalisering» (590 søk/mnd,
   KD 9 per SEO.md punkt 4). Mønsteret er hentet fra konkurrentene som faktisk
   rangerer: én side per kommersielt søkeord, med ordet i URL-en, i stedet for
   å håpe at forsiden dekker alt. */

const seoSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Søkemotoroptimalisering',
    serviceType: 'Søkemotoroptimalisering (SEO)',
    description:
      'Teknisk SEO, innhold og lenkebygging for norske bedrifter. Jeg måler først, fikser det som faktisk blokkerer, og rapporterer på synlighet i både Google og AI-assistenter.',
    areaServed: { '@type': 'Country', name: 'Norge' },
    provider: { '@type': 'Organization', name: 'Oppskalert', url: 'https://oppskalert.no' },
    url: 'https://oppskalert.no/sokemotoroptimalisering',
  },
  lagFaqSchema(landingsSporsmal.seo),
];

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
          <p>
            Om det virker, kan måles. Har du SEO-abonnementet, stiller jeg ChatGPT, Google AI
            og Copilot de samme fem spørsmålene hver måned, de kundene dine faktisk stiller, og
            skriver ned om du ble nevnt og hvem som ble nevnt i stedet.
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
              className="flex items-start gap-3 font-body text-[0.95rem] text-room-ink/70 leading-relaxed"
            >
              <Check className="w-4 h-4 text-room-ink mt-1 flex-shrink-0" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* Det abonnementet leverer, måned for måned. Egen seksjon fordi en pris
   uten innhold er et nakent tall (regel 13): kunden skal se hva som kommer
   i innboksen hver måned. Innholdet står også i tilbud/MAL.md, og prisen
   leses fra driftNivaer så den bare finnes ett sted. */
const maanedlig = [
  {
    navn: 'Rapport med vanlige ord',
    tekst: 'Hvem som fant deg, på hvilke søk, og om kurven går riktig vei. Tallene er fra Search Console på ditt eget domene, så du kan sjekke dem selv.',
  },
  {
    navn: 'AI-sjekk',
    tekst: 'Fem spørsmål kundene dine stiller, til ChatGPT, Google AI og Copilot. Du får se om du ble nevnt, og hvem som ble nevnt i stedet.',
  },
  {
    navn: 'En ny side eller artikkel',
    tekst: 'Skrevet om et søk kundene dine har, valgt ut fra det rapporten viser.',
  },
  {
    navn: 'Retting av funnene',
    tekst: 'Det rapporten finner, retter jeg samme måned. Du trenger ikke be om det.',
  },
];

const lenke =
  'text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors';

const Maanedlig = () => {
  const container = useReveal(60);
  const seo = driftNivaer.find((n) => n.id === 'seo');
  return (
    <section ref={container} className="seksjon pt-0">
      <div className="wrap">
        <SeksjonTopp
          tittel="Det du får"
          uthevet="hver måned."
          lede={`SEO-abonnementet koster fra ${seo.fra} ${seo.enhet}, uten binding. Du får alt i serviceavtalen, og i tillegg dette hver måned:`}
        />
        <dl data-reveal className="grid gap-x-12 gap-y-8 md:grid-cols-2 max-w-[62rem]">
          {maanedlig.map((m) => (
            <div key={m.navn} className="border-t border-room-ink/15 pt-5">
              <dt className="font-sans font-bold text-[1.05rem] mb-2">{m.navn}</dt>
              <dd className="font-body text-[0.95rem] text-room-ink/70 leading-relaxed max-w-[48ch]">{m.tekst}</dd>
            </div>
          ))}
        </dl>
        <p data-reveal className="font-body text-[0.95rem] text-room-ink/70 mt-10 max-w-[56ch] leading-relaxed">
          Se <Link to={ruter.drift} className={lenke}>serviceavtale og SEO</Link> for
          resten av vilkårene, eller <Link to={ruter.priser} className={lenke}>prissiden</Link> for
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
    <Maanedlig />
    <FAQ
      tittel="Det folk lurer på"
      uthevet="om søk."
      sporsmal={landingsSporsmal.seo}
    />
    <DemoSkjema
      analyse
      tittel="Gratis"
      uthevet="synlighetsanalyse."
      lede="Skriv inn adressen til nettsiden din. Jeg henter den slik Google og ChatGPT gjør, og sender deg det som står i veien for at du blir funnet, med det viktigste først. Gratis, også om du ikke blir kunde."
    />
  </Shell>
);

export default SeoPage;
