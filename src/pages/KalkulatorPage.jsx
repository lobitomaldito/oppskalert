/* Avgrensning i prisklyngen, satt 27. august 2026 etter måling i Search
   Console over 28 dager. Denne siden hadde kapret hele prisklyngen fra
   /priser og lå på posisjon 94 til 100 på nesten hver eneste variant:

     nettside pris        /kalkulator  36 visn.  posisjon 97,3
     hva koster en nettside /kalkulator 22 visn. posisjon 94,3
     kostnad nettside     /kalkulator  15 visn.  posisjon 97,3
     priser hjemmeside    /kalkulator  15 visn.  posisjon 82,3
     pris nettside        /priser       5 visn.  posisjon 90,4

   22 av 39 søk i klyngen traff kalkulatoren, /priser dukket opp to ganger.
   Google hadde altså valgt et verktøy som prisside, og et verktøy svarer
   ikke på «hva koster en nettside», det ber deg fylle ut noe først. Derfor
   posisjon 97 og null klikk på 189 visninger.

   Titlen het «Hva koster en nettside? Regn det ut» og konkurrerte direkte
   med både /priser og /blogg/hva-koster-nettside. Den heter nå
   «Priskalkulator for nettside» og sikter på verktøysøket alene. Arbeids-
   delingen er: /priser eier «nettside pris» og «pris på hjemmeside»,
   /blogg/hva-koster-nettside eier spørsmålsformen, denne eier kalkulatoren.
   Siden hadde heller ingen lenke til /priser, enda det er den siden Google
   burde sendt folk til. Den er lagt inn under kalkulatoren. */

import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import Kalkulator from '../components/Kalkulator';
import DemoSkjema from '../components/DemoSkjema';
import FAQ from '../components/FAQ';
import { lagFaqSchema, ruter } from '../lib/site';
import { faqKalkulator } from '../lib/faq-sider';

const faqLd = lagFaqSchema(faqKalkulator);

const KalkulatorPage = () => (
  <Shell>
    <SEO
      title="Priskalkulator for nettside"
      description="Regn ut hva nettsiden din vil koste, på under ett minutt. Gratis, ingen e-post, og bygget på de samme fastprisene jeg bruker i ekte prosjekter. Hele prislisten står på prissiden."
      keywords={['priskalkulator nettside', 'prisestimat nettside', 'regne ut pris på nettside']}
      canonical="https://oppskalert.no/kalkulator"
      jsonLd={faqLd}
    />
    <SideTopp
      tittel="Hva koster"
      uthevet="en nettside?"
      lede="Svar på noen få spørsmål, så får du et realistisk prisestimat på under ett minutt. Ingen e-post, ingen forpliktelser, bare de samme fastprisene som jeg bruker i ekte prosjekter."
    />
    <Kalkulator />
    <section className="seksjon pt-0">
      <div className="wrap">
        <p className="font-body text-[0.95rem] text-room-ink/70 max-w-[56ch] leading-relaxed">
          Vil du heller se hele prislisten enn å regne? Begge modellene med tall
          står på{' '}
          <Link to={ruter.priser} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            prissiden
          </Link>
          . Skal du bytte ut en side du allerede har, er det{' '}
          <Link to={ruter.nyNettside} className="text-room-ink underline underline-offset-4 decoration-room-ink/40 hover:decoration-room-ink transition-colors">
            ny nettside
          </Link>{' '}
          som gjelder, inkludert hva som skjer med Google underveis.
        </p>
      </div>
    </section>
    <DemoSkjema
      tittel="Klar for en"
      uthevet="konkret pris?"
      lede="Fortell meg kort om bedriften, så får du en fast pris og en gratis demo før du bestemmer deg."
    />
    <FAQ
      tittel="Om kalkulatoren"
      uthevet="og prisen."
      lede="Det folk lurer på når de har sett tallet."
      sporsmal={faqKalkulator}
    />
  </Shell>
);

export default KalkulatorPage;
