import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { kontakt } from '../lib/site';
import { useReveal } from '../lib/useReveal';
import { track } from '../lib/analytics';

const PORTRETT = '/founders/aleksander.webp';

const KontaktPage = () => {
  const toppRef = useReveal(80);
  const portrettRef = useReveal(80);

  return (
    <Shell>
      <SEO
        title="Kontakt"
        description="Be om en gratis demo av din nye nettside. Jeg svarer innen 24 timer. Ingen selgere, ingen kø."
        keywords={['kontakt webutvikler', 'gratis nettside demo', 'bestill nettside']}
        canonical="https://oppskalert.no/kontakt"
      />

      <section ref={toppRef} className="wrap sidetopp">
        <p data-reveal className="etikett inn">Kontakt</p>
        <h1 data-reveal className="inn" style={{ '--d': '60ms' }}>La oss ta en prat.</h1>
        <p data-reveal className="inn" style={{ '--d': '140ms' }}>
          Send meg navnet på bedriften din, så tar jeg det derfra. Du trenger ikke ha
          tenkt ferdig, og du trenger ikke levere noe på forhånd. Jeg svarer innen ett
          døgn, og det er meg du får svar fra.
        </p>
      </section>

      <section ref={portrettRef} className="hvit">
        <div className="wrap seksjon">
          <div data-reveal className="portrettrad inn">
            <div className="portrett">
              <img src={PORTRETT} alt="Aleksander MacKee" width="640" height="640" loading="lazy" />
            </div>
            <div>
              <div className="seksjonstopp" style={{ marginBottom: '1.5rem' }}>
                <h2>Ring, skriv, eller send bare et navn</h2>
                <p>
                  Alt tre funker like bra. Det korteste svaret jeg har fått var to ord, og
                  den siden er i drift nå. Er du i Oslo, tar vi det gjerne over en kaffe
                  i stedet.
                </p>
              </div>
              <ol className="nummerert" style={{ maxWidth: 'none' }}>
                <li>
                  <a href={`tel:${kontakt.tel}`} onClick={() => track('contact_phone_clicked')}>
                    <span className="nr">Ring</span> {kontakt.telefon} <span className="pil" aria-hidden="true">→</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${kontakt.epost}`} onClick={() => track('contact_email_clicked')}>
                    <span className="nr">E-post</span> {kontakt.epost} <span className="pil" aria-hidden="true">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href={kontakt.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('contact_linkedin_clicked')}
                  >
                    <span className="nr">LinkedIn</span> Aleksander MacKee
                    <span className="skjult"> (åpner i ny fane)</span>{' '}
                    <span className="pil" aria-hidden="true">→</span>
                  </a>
                </li>
              </ol>
              <p style={{ marginTop: '2rem', color: 'var(--blekk-mykt)', fontSize: '.9375rem' }}>
                Oppskalert er et selskap i {kontakt.morselskap}, org. {kontakt.orgnr}, Oslo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DemoSkjema
        tittel="Eller bare legg igjen"
        uthevet="navn og e-post."
        lede="Så tar jeg kontakt. Du trenger ikke ha noe klart på forhånd. Jeg finner som regel ut av resten selv."
      />
    </Shell>
  );
};

export default KontaktPage;
