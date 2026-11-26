import { Check, X } from 'lucide-react';
import SEO from '../components/SEO';
import { Foto, Shell } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import Metode from '../components/Metode';
import SitatKarusell from '../components/SitatKarusell';
import { useReveal } from '../lib/useReveal';

/* De to listene under er ordrett fra den gamle MetodePage.jsx (før
   studio-mal-redesignet), git show origin/master:src/pages/MetodePage.jsx.
   Ikke omskrevet, bare flyttet inn i det nye designsystemet. */
const vanlig = [
  'Møter og tilbudsrunder før du ser noe som helst',
  'Forskudd og bindingstid',
  'Skisser og «mockups» i PowerPoint',
  'Timepris som løper mens dere prater',
];

const mitt = [
  'Et ferdig, klikkbart utkast først',
  'Ingen forpliktelse før du sier ja',
  'En ekte side du kan åpne på mobilen',
  'Fast pris, avtalt før jeg gjør ferdig',
];

/* Kontrastblokken fra den gamle MetodePage.jsx, gjenoppbygd med
   .tjeneste-kortene fra designsystemet (samme klasse .tjeneste-rad-
   seksjonen på denne siden bruker for stegene) i stedet for den gamle
   aubergine-stilingen. Ingen aksentfarge i skallet: forskjellen mellom
   kolonnene vises med Check/X og opasitet, ikke farge. */
const Kontrast = () => {
  const container = useReveal(90);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <div data-reveal className="seksjonstopp inn">
          <h2>Hvorfor jeg gjør det motsatt vei.</h2>
          <p>De fleste vil ha betalt for å tenke. Jeg vil heller bygge noe du kan se på, og la det avgjøre.</p>
        </div>
        <div data-reveal className="grid gap-5 md:grid-cols-2 max-w-[52rem] farget omvendt inn" style={{ '--d': '80ms' }}>
          <div className="tjeneste">
            <h3>Den vanlige veien</h3>
            <ul className="flex flex-col gap-3">
              {vanlig.map((v) => (
                <li key={v} className="flex items-start gap-2.5 font-body text-[0.95rem] text-room-ink/70 leading-relaxed">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-room-ink/40" aria-hidden="true" />{v}
                </li>
              ))}
            </ul>
          </div>
          <div className="tjeneste">
            <h3>Slik jeg gjør det</h3>
            <ul className="flex flex-col gap-3">
              {mitt.map((v) => (
                <li key={v} className="flex items-start gap-2.5 font-body text-[0.95rem] text-room-ink/80 leading-relaxed">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-room-ink" aria-hidden="true" />{v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetodePage = () => (
  <Shell>
    <SEO
      title="Metode"
      description="Slik jobber jeg: jeg bygger et ferdig utkast til din nye nettside gratis, du gir tilbakemelding, jeg lanserer. Du betaler ingenting før du har sett resultatet."
      keywords={['gratis nettside demo', 'prosess webutvikling', 'nettside uten binding']}
      canonical="https://oppskalert.no/metode"
    />

    <section className="wrap sidetopp sidetopp-med-bilde">
      <div>
        <p className="etikett inn">Metode</p>
        <h1 className="inn" style={{ '--d': '60ms' }}>Du ser resultatet før du betaler.</h1>
        <p className="inn" style={{ '--d': '140ms' }}>
          Fire steg. De tre første koster deg ingenting, og det første er ferdig innen
          48 timer. Slik viser jeg at jobben er verdt pengene, i stedet for å påstå
          det.
        </p>
      </div>
      <figure className="sidetopp-bilde farget-ramme inn" style={{ '--d': '200ms' }}>
        <Foto navn="metode" alt="En notatbok med skisser av nettsider ved siden av en mobil og to penner." />
      </figure>
    </section>

    {/* Den utdypede stegvisningen, ikke demoens korte liste.

       Demoen hadde fire steg på én linje hver. Prod har de samme fire
       stegene, men med `desc` og `punkter` i tillegg, altså rundt 100 ord
       mer om hva som faktisk skjer i hvert steg. Målt mot prod var det
       hele forskjellen på denne ruta.

       Metode-komponenten leser den rike lista fra site.js og eier begge
       visningene: kort på forsiden, utdypet her. Å bygge en tredje
       variant her ville betydd at stegteksten fantes to steder og kunne
       komme ut av synk. */}
    <Metode utdypet />

    <section className="sitatblokk" style={{ paddingTop: 'var(--luft)' }}>
      <div className="wrap">
        <SitatKarusell className="paa-blekk inn" />
      </div>
    </section>

    <Kontrast />

    <DemoSkjema
      tittel="Klar for"
      uthevet="steg én?"
      lede="Fortell meg hvem du er, så bygger jeg utkastet. Det er hele jobben din i første omgang."
    />
  </Shell>
);

export default MetodePage;
