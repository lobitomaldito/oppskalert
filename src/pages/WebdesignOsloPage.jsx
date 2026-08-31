import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import { Avsnitt } from '../components/Landingsside';
import Portfolio from '../components/Portfolio';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { useReveal } from '../lib/useReveal';
import { lagFaqSchema, landingsSporsmal, ruter } from '../lib/site';

/* Bygget på faktiske Search Console-data, ikke på søkeordslisten. Forsiden
   fikk i uke 31 visninger på «webdesign i oslo», «webdesigner oslo»,
   «webdesign firma» og «webdesign bedrift» uten at noen side var laget for
   dem, og denne siden ble laget for å ta dem.

   Det slo ikke til. Målt 24. august 2026, 28 dager: forsiden 17,7 på
   «webdesign i oslo», denne siden 61,6, til sammen 110 visninger og null
   klikk. Google valgte forsiden også på «webdesigner oslo» (12,3 mot 43,7)
   og «web designer oslo» (23,8 mot 50,6). På førstesiden for «webdesign i
   Oslo» ligger byråene med rotdomenet sitt, ikke med en underside. Forsiden
   er derfor Oslo-siden nå, og fikk «i Oslo» inn i title samme dag.

   Denne siden er støtte, ikke konkurrent: den utdyper det lokale for den
   som allerede er her, og har sluppet foretaksnoden sin. Ikke skjerp title
   eller H1 her mot hodesøket igjen uten å måle først.

   Avgrensning mot naboinnhold: /blogg/webutvikler-oslo eier «webutvikler
   oslo» (informasjonssøk, priser og leverandørtyper). Denne eier «webdesign
   oslo» og bedriftsvariantene, altså kommersielt søk. Ikke skriv prisguide
   her, lenk til /priser i stedet.

   31. august 2026: den avgrensningen sto bare i denne kommentaren. I HTML-en
   fantes den ikke, for ingen side lenket til artikkelen, mens denne siden
   lenket tre ganger til seg selv fra den. Ordet «webutvikler» sto null
   ganger i tekst her, bare i kommentaren over. Nå står avgrensningen som en
   lenke i «Hvorfor Oslo faktisk spiller inn», med «webutvikler i Oslo» som
   anker. Tallene ligger ved lenken. */

const CANONICAL = 'https://oppskalert.no/webdesign-oslo';

/* Ingen ProfessionalService her. Den sto her fram til 24. august 2026, med
   samme adresse, samme geo og samme grunnlegger som forsidens. To URL-er
   som melder seg som det samme foretaket deler de lokale signalene i to, og
   målingen viste nøyaktig det: forsiden 17,7 og denne siden 61,6 på
   «webdesign i oslo», 110 visninger og null klikk til sammen. Samme mønster
   på «webdesigner oslo» (12,3 mot 43,7) og «web designer oslo» (23,8 mot
   50,6). Foretaksnoden bor nå bare på forsiden, med areaServed og
   priceRange flyttet med. Denne siden beholder brødsmulene og FAQ-en, som
   hører til siden og ikke til foretaket. Ikke legg den tilbake. */
const webdesignOsloSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://oppskalert.no/' },
      { '@type': 'ListItem', position: 2, name: 'Webdesign i Oslo', item: CANONICAL },
    ],
  },
  lagFaqSchema(landingsSporsmal.oslo),
];

const Innhold = () => {
  const container = useReveal(70);
  return (
    <section ref={container} className="seksjon pt-0">
      <div className="wrap flex flex-col gap-14 md:gap-20">
        <Avsnitt tittel="Design som" uthevet="skaffer kunder.">
          <p>
            Et pent design som ingen handler av er en dyr plakat. Jeg tegner ikke
            nettsider for å vinne priser, jeg tegner dem for at en besøkende skal
            skjønne hva du gjør innen to sekunder og vite hva neste steg er.
          </p>
          <p>
            I praksis betyr det færre valg per skjerm, tydelig hierarki, og at
            kontaktpunktet aldri er mer enn ett klikk unna. Alt er håndkodet, uten
            tunge maler og plugins, så siden laster på under ett sekund. Over
            halvparten av de som besøker en norsk bedriftsside kommer fra mobil,
            og de venter ikke.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Hvorfor Oslo" uthevet="faktisk spiller inn.">
          <p>
            Søker noen «webdesign i Oslo» leter de sjelden etter det beste byrået i
            verden. De leter etter noen de kan møte, ringe og holde ansvarlig.
          </p>
          <p>
            Jeg holder til på Røa og tar gjerne en kaffe før vi begynner. Du
            snakker med meg gjennom hele prosjektet, fra første skisse til
            lansering. Ingen prosjektkoordinator som videreformidler til en
            utvikler du aldri møter.
          </p>
          <p>
            Lokalt betyr også noe teknisk. En bedrift som skal finnes av folk i
            Oslo trenger Google Bedriftsprofil koblet riktig, konsistent
            adresseinformasjon på tvers av oppføringer, og struktur på siden som
            gjør det tydelig for søkemotorene hvor du holder til. Det bygger jeg
            inn fra starten, ikke som et tillegg etterpå.
          </p>
          {/* Lenken ut hit er hele poenget med denne setningen, ikke teksten.
              Målt 31. august 2026, 90 dager: /blogg/webutvikler-oslo eier
              webutvikler-klyngen alene på «webutvikling oslo» (394 visninger,
              36,2), «bra webutviklere» (24, 17,5) og «oslo webutvikler» (6,
              14,5), men hadde null interne lenker inn fra noen side. Denne
              siden hadde tre lenker ut til /webdesign-oslo og ingen tilbake.
              På «webutvikler oslo» sto de to sidene mot hverandre med 181
              visninger til sammen, artikkelen best på 36,5 og denne siden på
              45,2. Anker-teksten sier «webutvikler i Oslo» med vilje: det er
              den frasen artikkelen skal eie, og som denne siden ikke skal
              konkurrere om. Speilvending av b5c32c4, som flyttet
              /webdesign-oslo fra 64,5 til 45,2 på elleve dager. */}
          <p>
            Skal du sammenligne leverandører før du velger, har jeg skrevet en
            gjennomgang av hva en{' '}
            <Link to="/blogg/webutvikler-oslo" className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
              webutvikler i Oslo
            </Link>{' '}
            koster, hva som skiller frilanser fra byrå, og de fem spørsmålene
            det lønner seg å stille før du signerer.
          </p>
        </Avsnitt>

        <Avsnitt tittel="Du ser resultatet" uthevet="før du betaler.">
          <p>
            De fleste byråer ber om en signatur før de viser deg noe. Jeg gjør det
            motsatte: du får en ferdig demo av din egen side, med ditt innhold, helt
            uforpliktende. Liker du den ikke, koster den ingenting.
          </p>
          <p>
            Det er mulig fordi jeg jobber alene med moderne verktøy, uten
            møterekker og interne godkjenningsrunder. Leveringstiden måles i dager,
            ikke måneder.
          </p>
          <p>
            Prisen er fast og oppgitt på forhånd. Se{' '}
            <Link to={ruter.priser} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
              hva en nettside koster
            </Link>{' '}
            eller regn det ut selv i{' '}
            <Link to={ruter.kalkulator} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
              kalkulatoren
            </Link>
            .
          </p>
        </Avsnitt>
      </div>
    </section>
  );
};

const punkter = [
  'Design og utvikling av hele siden, håndkodet fra bunnen',
  'Mobil først, med lastetid under ett sekund',
  'Tekst skrevet for det kundene dine faktisk søker på',
  'Google Bedriftsprofil og lokale oppføringer satt opp riktig',
  'Strukturerte data, så du er lesbar for Google og AI-assistenter',
  'Du eier koden, innholdet og domenet, fra dag én',
];

const Inkludert = () => {
  const container = useReveal(60);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Hva du"
          uthevet="får levert."
          lede="Samme leveranse uansett om du sitter på Grünerløkka eller i Bærum."
        />
        <ul data-reveal className="grid gap-3.5 md:grid-cols-2 max-w-[62rem]">
          {punkter.map((p) => (
            <li key={p} className="flex items-start gap-3 font-body text-[0.95rem] text-room-ink/70 leading-relaxed">
              <Check className="w-4 h-4 text-room-ink mt-1 flex-shrink-0" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p data-reveal className="font-body text-[0.95rem] text-room-ink/70 mt-8 max-w-[56ch] leading-relaxed">
          Trenger du hjelp til å bli synlig i søk på toppen av selve siden, se{' '}
          <Link to={ruter.seo} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            søkemotoroptimalisering
          </Link>
          . Vil du at jeg tar det tekniske løpende, se{' '}
          <Link to={ruter.drift} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            drift og support
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

const WebdesignOsloPage = () => (
  <Shell>
    {/* Beskrivelsen var 159 tegn og ble kuttet til 152 den 24. august 2026.
        Title og H1 står med vilje urørt denne runden: forsiden fikk «i Oslo»
        i sin title samtidig, og skal måles alene før denne siden også
        skrives om. Se kommentaren øverst i fila. */}
    <SEO
      title="Webdesign i Oslo til fast pris"
      description="Webdesign i Oslo for små bedrifter. Håndkodede nettsider som laster på under ett sekund, fast pris fra 9 999 kr, og en gratis demo før du bestemmer deg."
      keywords={['webdesign oslo', 'webdesigner oslo', 'webdesign firma', 'webdesign bedrift']}
      canonical={CANONICAL}
      jsonLd={webdesignOsloSchema}
    />
    <SideTopp
      tittel="Webdesign i Oslo,"
      uthevet="til fast pris."
      lede="Håndkodede nettsider for små bedrifter i Oslo-området. Du snakker med meg hele veien, og du ser en ferdig demo før du bestemmer deg for noe som helst."
    />
    <Innhold />
    <Portfolio tittel="Sider jeg" uthevet="har levert." limit={6} visAlleLenke />
    <Inkludert />
    <FAQ
      tittel="Det folk lurer på"
      uthevet="før de tar kontakt."
      sporsmal={landingsSporsmal.oslo}
    />
    <DemoSkjema
      tittel="Vil du se hvordan"
      uthevet="din kan bli?"
      lede="Fortell meg kort om bedriften, så bygger jeg et utkast med ditt innhold. Uforpliktende, og du hører fra meg innen 24 timer."
    />
  </Shell>
);

export default WebdesignOsloPage;
