import { useState } from 'react';
import SEO from '../components/SEO';
import { Shell } from '../components/Layout';
import Arbeider from '../components/Arbeider';
import BransjeEksempler from '../components/BransjeEksempler';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { omtaler } from '../lib/demo-innhold';
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

/* Sitatkortet fra studio-mal-demoen (mal3.src.html rundt linje 1425).
   Teksten kommer fra demo-innhold.js sin omtaler-liste, ordrett. Kortet
   sykler gjennom listen med de to rundknappene, akkurat som i demoen. */
const SitatKort = () => {
  const [indeks, setIndeks] = useState(0);
  const n = ((indeks % omtaler.length) + omtaler.length) % omtaler.length;
  const o = omtaler[n];
  const initial = o.navn.split(' ').map((d) => d[0]).slice(0, 2).join('');

  return (
    <div className="sitatkort paa-blekk" data-reveal>
      <div className="sitat-topp">
        <div className="sitat-styring">
          <button type="button" onClick={() => setIndeks((i) => i - 1)} aria-label="Forrige omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M14 5 7 12l7 7" />
            </svg>
          </button>
          <button type="button" onClick={() => setIndeks((i) => i + 1)} aria-label="Neste omtale">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="m10 5 7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="sitat-teller">{n + 1} / {omtaler.length}</p>
        <p className="etikett" style={{ marginLeft: 'auto' }}>Fra kundene</p>
      </div>
      <blockquote>«{o.sitat}»</blockquote>
      <div className="sitat-kilde">
        <span className="initial" aria-hidden="true">{initial}</span>
        <div>
          <p className="navn">{o.navn}</p>
          <p className="rolle">{o.rolle}</p>
        </div>
      </div>
    </div>
  );
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
            <SitatKort />
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
