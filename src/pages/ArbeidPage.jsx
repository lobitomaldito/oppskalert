import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import Arbeider from '../components/Arbeider';
import BransjeEksempler from '../components/BransjeEksempler';
import DemoSkjema from '../components/DemoSkjema';
import SitatKarusell from '../components/SitatKarusell';
import { useReveal } from '../lib/useReveal';
import { kontakt, prosjekter } from '../lib/site';
import { track } from '../lib/analytics';
import { PilHoyre } from '../components/Ikon';

const arbeidSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nettsider bygget av Oppskalert',
  url: 'https://oppskalert.no/arbeid',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: prosjekter.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.navn,
      url: p.url,
    })),
  },
};

const ArbeidPage = () => {
  const container = useReveal(80);

  return (
    <Shell>
      <SEO
        title="Arbeid"
        description="Ekte nettsider i drift for norske bedrifter, pluss konsept-eksempler for ulike bransjer. Se hva jeg har bygget."
        keywords={['nettside portefølje norge', 'webdesign eksempler', 'nettside bedrift']}
        canonical="https://oppskalert.no/arbeid"
        jsonLd={arbeidSchema}
      />

      <div ref={container}>
        {/* Sidetoppen med stor overskrift og ingress er tatt ut: den skjøv
            det første prosjektet under folden, og siden er til for å vise
            prosjektene. H1-en står igjen for skjermlesere og søkemotorer,
            så siden fortsatt har en overskrift over h2-ene i rutenettet. */}
        <h1 className="skjult">Sider jeg har bygget</h1>

        <section className="hvit">
          <div className="wrap seksjon">
            {/* Alle prosjekter med en fangst, ikke bare de seks med case-side.
                h2 fordi seksjonen ikke har noen egen H2 over rutenettet. */}
            <Arbeider antall={prosjekter.length} nivaa={2} reveal />
            {/* Handling rett under rutenettet (25.11.2026). De fleste kommer hit
                fra lenken i purringen, og skjemaet nederst ligger bak sitatet og
                bransjeeksemplene. Knappen hopper ned til skjemaet, telefonen er
                for håndverkerne, som er de fleste som klikker. */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="font-sans font-bold text-lg w-full sm:w-auto">Vil du ha et gratis utkast av din side?</p>
              <a href="#bestill-demo" className="knapp" onClick={() => track('arbeid_cta_klikket', { knapp: 'utkast' })}>
                Få et gratis utkast <PilHoyre className="pil" />
              </a>
              <a
                href={`tel:${kontakt.tel}`}
                onClick={() => track('arbeid_cta_klikket', { knapp: 'ring' })}
                className="min-h-11 inline-flex items-center font-sans text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                eller ring {kontakt.telefon}
              </a>
            </div>
          </div>
        </section>

        <section className="sitatblokk" style={{ paddingTop: 'var(--luft)' }}>
          <div className="wrap">
            <SitatKarusell className="paa-blekk" data-reveal />
          </div>
        </section>
      </div>

      <BransjeEksempler />

      <DemoSkjema
        tittel="Vil du se hvordan"
        uthevet="din kan bli?"
        lede="Jeg bygger et ferdig utkast med ditt innhold, helt uforpliktende. Liker du det ikke, koster det ingenting."
      />
    </Shell>
  );
};

export default ArbeidPage;
