import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { ArbeidSeksjon } from '../components/Arbeider';
import { ruter } from '../lib/site';
import { tjenester } from '../lib/demo-innhold';
import { useReveal } from '../lib/useReveal';
import { Oye, Penn, PilOpp, Telefon } from '../components/Ikon';

const PORTRETT = '/founders/aleksander.webp';

const OM_KORT = [
  {
    Ikon: Telefon,
    tittel: 'Ingen mellomledd',
    tekst: 'Ingen prosjektkoordinatorer, ingen som skal videreformidle hva du sa i forrige møte. Ringer du klokka ni på en tirsdag, er det jeg som tar den.',
  },
  {
    Ikon: Penn,
    tittel: 'Jeg gjør alt selv',
    tekst: 'Jeg tegner, koder, skriver tekstene og setter opp serveren selv. Det gjør at jeg kan si ja til små jobber uten at det blir dyrt.',
  },
  {
    Ikon: Oye,
    tittel: 'Utkastet først',
    tekst: 'Det jeg liker best er å ta en side som ikke gjør noe, og gjøre den om til noe som faktisk ringer telefonen. Det er derfor jeg bygger utkastet først. Jeg vil heller vise deg forskjellen enn å forklare den.',
  },
];

const OmPage = () => {
  const toppRef = useReveal(80);
  const portrettRef = useReveal(80);
  const tjenesteRef = useReveal(80);

  return (
    <Shell>
      <SEO
        title="Om meg"
        description="Oppskalert er Aleksander MacKee. Ingen mellomledd, ingen prosjektkoordinatorer. Du snakker med den som faktisk bygger nettsiden din."
        keywords={['om oppskalert', 'norsk webutvikler', 'frilans nettside']}
        canonical="https://oppskalert.no/om"
      />

      <section ref={toppRef} className="wrap sidetopp">
        <p data-reveal className="etikett inn">Om meg</p>
        <h1 data-reveal className="inn" style={{ '--d': '60ms' }}>Ett lite studio. Korte linjer.</h1>
      </section>

      <section ref={portrettRef} className="hvit">
        <div className="wrap seksjon">
          <div data-reveal className="portrettrad inn">
            <div className="portrett">
              <img src={PORTRETT} alt="Aleksander MacKee" width="640" height="640" loading="lazy" />
            </div>
            <div>
              <p className="om-ingress">
                Jeg heter Aleksander MacKee og driver Oppskalert fra Oslo. Det er ingen
                andre her.
              </p>
              <div className="signatur">
                <div className="portrett portrett-rund">
                  <img src={PORTRETT} alt="" width="640" height="640" loading="lazy" />
                </div>
                <div>
                  <p className="navn">Aleksander MacKee</p>
                  <p className="rolle">Grunnlegger · Oslo · 974 09 897</p>
                </div>
              </div>
            </div>
          </div>

          {/* Teksten sto som tre avsnitt på hvit bunn. Fra 12.11.2026 står de
              som tre kort (Aleksander: «bare tekst og hvit bakgrunn, jeg vil
              bruke mer kort»). Ordene er de samme, bare fordelt på kortene. */}
          <ul data-reveal className="tjenester om-kort inn" style={{ '--d': '80ms' }}>
            {OM_KORT.map((k) => {
              const Ikon = k.Ikon;
              return (
                <li key={k.tittel} className="tjeneste">
                  <Ikon className="tjeneste-ikon" />
                  <h3>{k.tittel}</h3>
                  <p>{k.tekst}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Portrett-teksten slutter med at jeg heller vil vise enn forklare.
          Da skal det som vises, stå rett under. */}
      <ArbeidSeksjon hvit={false} kompakt />

      <section ref={tjenesteRef} className="seksjon">
        <div className="wrap tjeneste-rad">
          <div data-reveal className="tjeneste-side inn">
            <p className="etikett">Tjenester</p>
            <Link className="knapp" to={ruter.kontakt}>
              Ta kontakt <PilOpp className="pil" />
            </Link>
          </div>
          <div>
            <div data-reveal className="seksjonstopp inn">
              <h2>Dette kan jeg hjelpe deg med</h2>
            </div>
            <div data-reveal className="tjenester inn" style={{ '--d': '80ms' }}>
              {tjenester.map((t) => (
                <article className="tjeneste" key={t.navn}>
                  <div className="tjeneste-topp">
                    <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: t.ikon }} />
                    <h3>{t.navn}</h3>
                  </div>
                  <p>{t.tekst}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DemoSkjema
        tittel="Skal vi bygge noe"
        uthevet="sammen?"
        lede="Send meg noen linjer om bedriften din, så bygger jeg et gratis utkast. Det er den enkleste måten å bli kjent på."
      />
    </Shell>
  );
};

export default OmPage;
