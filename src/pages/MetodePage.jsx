import { Check, X } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp, SeksjonTopp } from '../components/Layout';
import Metode from '../components/Metode';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';

const vanlig = [
  'Møter og tilbudsrunder før du ser noe som helst',
  'Forskudd og bindingstid',
  'Skisser og «mockups» i PowerPoint',
  'Timepris som løper mens dere prater',
];

const mitt = [
  'En ferdig, klikkbar demo først',
  'Ingen forpliktelse før du sier ja',
  'En ekte side du kan åpne på mobilen',
  'Fast pris, avtalt før jeg gjør ferdig',
];

const Kontrast = () => {
  const container = useReveal(90);
  return (
    <section ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Hvorfor jeg gjør det"
          uthevet="motsatt vei."
          lede="De fleste vil ha betalt for å tenke. Jeg vil heller bygge noe du kan se på, og la det avgjøre."
        />
        <div className="grid gap-5 md:grid-cols-2 max-w-[52rem]">
          <div data-reveal className="rounded-2xl border border-primary/10 p-7">
            <h3 className="font-sans font-bold text-lg mb-5 text-primary/75">Den vanlige veien</h3>
            <ul className="flex flex-col gap-3">
              {vanlig.map((v) => (
                <li key={v} className="flex items-start gap-2.5 font-body text-[0.95rem] text-primary/80 leading-relaxed">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/50" aria-hidden="true" />{v}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-2xl border border-ink/40 bg-surface/25 p-7">
            <h3 className="font-sans font-bold text-lg mb-5">Slik jeg gjør det</h3>
            <ul className="flex flex-col gap-3">
              {mitt.map((v) => (
                <li key={v} className="flex items-start gap-2.5 font-body text-[0.95rem] text-primary/85 leading-relaxed">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-ink" aria-hidden="true" />{v}
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
      description="Slik jobber jeg: jeg bygger en ferdig demo av din nye nettside gratis, du gir tilbakemelding, jeg lanserer. Null risiko før du har sett resultatet."
      keywords={['gratis nettside demo', 'prosess webutvikling', 'nettside uten binding']}
      canonical="https://oppskalert.no/metode"
    />
    <SideTopp
      tittel="Du ser resultatet"
      uthevet="før du betaler."
      lede="Prosessen min er kort: jeg bygger demoen, du sier hva du synes, jeg lanserer. Ingenting av det koster noe før du har sagt ja."
    />
    <Kontrast />
    <Metode utdypet />
    <DemoSkjema
      tittel="Klar for"
      uthevet="steg én?"
      lede="Fortell meg hvem du er, så bygger jeg demoen. Det er hele jobben din i første omgang."
    />
  </Shell>
);

export default MetodePage;
