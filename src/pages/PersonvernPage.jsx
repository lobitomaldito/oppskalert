import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import { kontakt } from '../lib/site';
import { useReveal } from '../lib/useReveal';

/* Personvernerklæring.

   Innholdet her skal alltid stemme med hva koden faktisk gjør. Legger du til
   et sporingsverktøy, en tabell eller et skjemafelt, skal denne siden endres
   i samme slengen. En erklæring som lyver er verre enn ingen erklæring.

   Verktøyene som er beskrevet under, og hvor de står i koden:
   - Supabase `demo_foresporsler`  → api/demo-request.js
   - Supabase `analytics_events`   → src/lib/analytics.js
   - PostHog                       → src/lib/posthog.js
   - Microsoft Clarity + GA4       → index.html
   - Vercel                        → hosting, serverlogger              */

const SIST_OPPDATERT = '23. august 2026';

const Bolk = ({ tittel, children }) => (
  <div data-reveal className="inn" style={{ marginTop: '3.25rem' }}>
    <h2 style={{ marginBottom: '1rem' }}>{tittel}</h2>
    <div className="intro-brod" style={{ marginTop: 0 }}>{children}</div>
  </div>
);

const Rad = ({ hva, hvorfor, hvor }) => (
  <div
    style={{
      padding: '1.15rem 0',
      borderTop: '1px solid var(--felt-kant)',
      display: 'grid',
      gap: '.35rem',
    }}
  >
    <p style={{ fontWeight: 600 }}>{hva}</p>
    <p style={{ color: 'var(--blekk-mykt)' }}>{hvorfor}</p>
    <p style={{ color: 'var(--blekk-mykt)', fontSize: '.875rem' }}>Lagres hos: {hvor}</p>
  </div>
);

const PersonvernPage = () => {
  const toppRef = useReveal(80);
  const brodRef = useReveal(80);

  return (
    <Shell>
      <SEO
        title="Personvernerklæring"
        description="Hva jeg samler inn når du besøker oppskalert.no eller ber om en demo, hvorfor jeg gjør det, hvor lenge det lagres, og hvilke rettigheter du har."
        canonical="https://oppskalert.no/personvern"
      />

      <section ref={toppRef} className="wrap sidetopp">
        <p data-reveal className="etikett inn">Personvern</p>
        <h1 data-reveal className="inn" style={{ '--d': '60ms' }}>Personvern uten småskrift.</h1>
        <p data-reveal className="inn" style={{ '--d': '140ms' }}>
          Her står det hva jeg samler inn, hvorfor, hvor lenge, og hva du kan kreve at jeg
          gjør med det. Sist oppdatert {SIST_OPPDATERT}.
        </p>
      </section>

      <section className="hvit">
        <div ref={brodRef} className="wrap seksjon">
          <div data-reveal className="ramme inn" style={{ padding: '1.75rem' }}>
            <p style={{ fontWeight: 600, marginBottom: '.85rem' }}>Kort fortalt</p>
            <div className="intro-brod" style={{ marginTop: 0 }}>
              <p>Ber du om en demo, lagrer jeg det du skriver i skjemaet, så jeg kan svare deg.</p>
              <p>Jeg måler hvordan siden brukes, for å gjøre den bedre. Ikke for å selge noe videre.</p>
              <p>Jeg selger aldri opplysningene dine, og bruker dem ikke til å bygge profiler hos andre.</p>
              <p>Vil du se hva jeg har om deg, eller ha det slettet, sender du en e-post.</p>
            </div>
          </div>

          <Bolk tittel="Hvem er ansvarlig">
            <p>
              Oppskalert, organisasjonsnummer {kontakt.orgnr}, et datterselskap av{' '}
              {kontakt.morselskap}, er behandlingsansvarlig for opplysningene som beskrives
              her. Vi holder til i {kontakt.sted}.
            </p>
            <p>
              Spørsmål om personvern går til <a href={`mailto:${kontakt.epost}`}>{kontakt.epost}</a>{' '}
              eller {kontakt.telefon}. Det er meg, {kontakt.navn}, som svarer.
            </p>
          </Bolk>

          <Bolk tittel="Hva jeg samler inn, og hvorfor">
            <p>
              Fire ting, og ingenting mer. Det er ingen annonsepiksler på denne siden, og
              ingen deling med annonsenettverk.
            </p>
            <Rad
              hva="Det du skriver i demoskjemaet"
              hvorfor="Navn, e-post, og eventuelt bedriftsnavn eller nettadresse, hva du trenger hjelp til, og om du har nettside i dag. Jeg trenger dette for å kunne svare deg og lage demoen. Behandlingsgrunnlaget er at du har bedt om det, altså tiltak før en avtale inngås."
              hvor="Supabase"
            />
            <Rad
              hva="Hvordan siden brukes"
              hvorfor="Hvilke sider du åpner, hva du klikker på, hvor langt du kommer i skjemaet, og en tilfeldig generert id som ikke sier hvem du er. Jeg bruker det til å se hva som ikke fungerer på siden. Behandlingsgrunnlaget er berettiget interesse i å forbedre et eget nettsted."
              hvor="Supabase og PostHog"
            />
            <Rad
              hva="Sesjonsopptak og varmekart"
              hvorfor="Microsoft Clarity registrerer musebevegelser, klikk, scrolling og skjermstørrelse, og spiller det av som en anonymisert opptaksfilm. Tekst du skriver i skjemafelt maskeres av verktøyet. Jeg bruker det til å se hvor folk står fast."
              hvor="Microsoft Clarity"
            />
            <Rad
              hva="Besøksstatistikk og serverlogger"
              hvorfor="Google Analytics gir meg antall besøk, omtrentlig geografi, enhetstype og hvor besøket kom fra. Serveren logger i tillegg IP-adresse, tidspunkt og hvilken side som ble hentet. Loggene trengs for drift og sikkerhet."
              hvor="Google Analytics og Vercel"
            />
          </Bolk>

          <Bolk tittel="Hvem andre ser opplysningene">
            <p>
              Jeg deler ingenting for at andre skal bruke det til sitt. Men noen leverandører
              behandler data på mine vegne, fordi siden og verktøyene kjører hos dem: Supabase
              (database), Vercel (drift av nettstedet), PostHog (analyse), Microsoft (Clarity)
              og Google (Analytics).
            </p>
            <p>
              Microsoft og Google er amerikanske selskaper. Overføring ut av EØS skjer på
              grunnlag av EUs standard personvernbestemmelser og EU-US Data Privacy Framework.
            </p>
          </Bolk>

          <Bolk tittel="Hvor lenge det lagres">
            <p>
              Demoforespørsler slettes 24 måneder etter siste kontakt, med mindre du blir kunde.
              Blir du kunde, følger opplysningene kundeforholdet, og regnskapsdata beholdes i
              fem år slik bokføringsloven krever.
            </p>
            <p>
              Bruksdata slettes etter 24 måneder. Google Analytics er satt til 14 måneder.
              Sesjonsopptak i Clarity slettes etter 30 dager. Serverlogger beholdes i 30 dager.
            </p>
          </Bolk>

          <Bolk tittel="Informasjonskapsler">
            <p>
              Nettstedet setter informasjonskapsler fra Google Analytics, Microsoft Clarity og
              PostHog. De brukes til å skille et besøk fra et annet, ikke til annonsering.
            </p>
            <p>
              Du kan slette og blokkere informasjonskapsler i nettleseren din. Siden fungerer
              like godt uten dem.
            </p>
          </Bolk>

          <Bolk tittel="Rettighetene dine">
            <p>
              Du kan kreve innsyn i hva jeg har lagret om deg, få det rettet hvis noe er feil,
              få det slettet, be meg begrense bruken, få det utlevert i et maskinlesbart format,
              og protestere mot behandling som bygger på berettiget interesse.
            </p>
            <p>
              Send en e-post til <a href={`mailto:${kontakt.epost}`}>{kontakt.epost}</a>, så
              svarer jeg innen 30 dager, som regel raskere. Du trenger ikke oppgi noen grunn.
            </p>
            <p>
              Mener du at jeg behandler opplysninger i strid med regelverket, kan du klage til
              Datatilsynet på{' '}
              <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">
                datatilsynet.no
              </a>
              .
            </p>
          </Bolk>

          <Bolk tittel="Endringer">
            <p>
              Endrer jeg hvilke verktøy siden bruker, oppdaterer jeg denne siden samtidig.
              Datoen øverst viser når det sist skjedde.
            </p>
          </Bolk>
        </div>
      </section>
    </Shell>
  );
};

export default PersonvernPage;
