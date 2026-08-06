import { useState } from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { kontakt } from '../lib/site';
import { useReveal } from '../lib/useReveal';

const Portrett = () => {
  const [feilet, setFeilet] = useState(false);
  if (feilet) return <div className="absolute inset-0 bg-surface/30" />;
  return (
    <img
      src="/founders/aleksander.webp"
      alt={`Portrett av ${kontakt.navn}`}
      onError={() => setFeilet(true)}
      className="w-full h-full object-cover"
      style={{ objectPosition: 'center 55%' }}
    />
  );
};

const avsnitt = [
  {
    tittel: 'Hvorfor ett menneske er en fordel',
    tekst: 'Når du sender meg en e-post, leses den av personen som designet siden din, skrev koden og satte opp serveren. Det betyr raske svar, ingen misforståelser gjennom tre ledd, og at den som lovet deg noe også er den som leverer det. Du slipper å forklare deg på nytt for hver ny person i prosjektet.',
  },
  {
    tittel: 'Jeg bygger med AI, og det merker du på prisen',
    tekst: 'Jeg bruker moderne verktøy til å gjøre på dager det byråene bruker måneder på. Det er ikke en snarvei på kvalitet. Alt blir gjennomgått og håndjustert av meg, men det betyr at jeg kan levere ordentlig håndverk til en pris en liten bedrift faktisk kan forsvare.',
  },
  {
    tittel: 'Digitalt, for bedrifter i hele Norge',
    tekst: 'Jeg holder til i Oslo, men jobber heldigitalt og tar oppdrag fra hele landet. Hvor du sitter spiller ingen rolle. Jobben blir den samme, og du snakker uansett direkte med den som bygger.',
  },
];

const OmPage = () => {
  const container = useReveal(100);

  return (
    <Shell>
      <SEO
        title="Om meg"
        description="Oppskalert er Aleksander MacKee. Ingen mellomledd, ingen prosjektkoordinatorer. Du snakker med den som faktisk bygger nettsiden din."
        keywords={['om oppskalert', 'norsk webutvikler', 'frilans nettside']}
        canonical="https://oppskalert.no/om"
      />
      <SideTopp
        tittel="Ett lite studio."
        uthevet="Korte linjer."
        lede="Oppskalert er meg, Aleksander. Ingen mellomledd, ingen prosjektkoordinatorer, ingen ventetid i kø."
      />

      <section ref={container} className="seksjon pt-4">
        <div className="wrap grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16 items-start">
          <div data-reveal className="lg:sticky lg:top-32">
            <div className="w-full max-w-[20rem] aspect-[3/4] rounded-2xl relative overflow-hidden shadow-xl bg-surface/20">
              <Portrett />
            </div>
            <h2 className="font-sans font-bold text-2xl mt-6">{kontakt.navn}</h2>
            <p className="font-body text-sm text-primary/70 mt-1">Designer, utvikler og den som svarer</p>

            <div className="flex flex-col gap-2.5 mt-5 font-body text-sm">
              <a href={`tel:${kontakt.tel}`} className="inline-flex items-center gap-2.5 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" aria-hidden="true" />{kontakt.telefon}
              </a>
              <a href={`mailto:${kontakt.epost}`} className="inline-flex items-center gap-2.5 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" aria-hidden="true" />{kontakt.epost}
              </a>
              <a href={kontakt.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-accent transition-colors">
                <Linkedin className="w-4 h-4 text-accent" aria-hidden="true" />LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {avsnitt.map((a) => (
              <div key={a.tittel} data-reveal>
                <h3 className="font-display font-extrabold text-[clamp(1.4rem,2.6vw,1.9rem)] tracking-[-0.02em] leading-tight">
                  {a.tittel}
                </h3>
                <p className="font-body text-[0.95rem] md:text-base text-primary/85 mt-3.5 leading-[1.8] max-w-[62ch]">
                  {a.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSkjema
        tittel="Skal vi bygge noe"
        uthevet="sammen?"
        lede="Send meg noen linjer om bedriften din, så bygger jeg en gratis demo. Det er den enkleste måten å bli kjent på."
      />
    </Shell>
  );
};

export default OmPage;
