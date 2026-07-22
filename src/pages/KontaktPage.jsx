import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { kontakt } from '../lib/site';
import { useReveal } from '../lib/useReveal';

const Direkte = () => {
  const container = useReveal(80);
  return (
    <section ref={container} className="pb-4">
      <div className="wrap grid gap-5 sm:grid-cols-3 max-w-[52rem]">
        <a data-reveal href={`tel:${kontakt.tel}`} className="rounded-2xl border border-primary/12 bg-primary/[0.03] p-6 hover:border-accent/50 transition-colors">
          <Phone className="w-5 h-5 text-accent mb-3" aria-hidden="true" />
          <span className="font-body text-xs uppercase tracking-widest text-primary/70 block">Ring meg</span>
          <span className="font-sans font-bold text-lg mt-1 block">{kontakt.telefon}</span>
        </a>
        <a data-reveal href={`mailto:${kontakt.epost}`} className="rounded-2xl border border-primary/12 bg-primary/[0.03] p-6 hover:border-accent/50 transition-colors">
          <Mail className="w-5 h-5 text-accent mb-3" aria-hidden="true" />
          <span className="font-body text-xs uppercase tracking-widest text-primary/70 block">Skriv til meg</span>
          <span className="font-sans font-bold text-base mt-1 block break-all">{kontakt.epost}</span>
        </a>
        <a data-reveal href={kontakt.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-primary/12 bg-primary/[0.03] p-6 hover:border-accent/50 transition-colors">
          <Linkedin className="w-5 h-5 text-accent mb-3" aria-hidden="true" />
          <span className="font-body text-xs uppercase tracking-widest text-primary/70 block">Finn meg på</span>
          <span className="font-sans font-bold text-lg mt-1 block">LinkedIn</span>
        </a>
      </div>

      <div className="wrap mt-8">
        <p data-reveal className="font-body text-[0.95rem] text-primary/80 leading-relaxed max-w-[52ch]">
          Du trenger ikke ha noe klart på forhånd. Har du bare et bedriftsnavn, finner jeg som regel ut av resten selv.
        </p>
      </div>
    </section>
  );
};

const KontaktPage = () => (
  <Shell>
    <SEO
      title="Kontakt"
      description="Be om en gratis demo av din nye nettside. Jeg svarer innen 24 timer. Ingen selgere, ingen kø."
      keywords={['kontakt webutvikler', 'gratis nettside demo', 'bestill nettside']}
      canonical="https://oppskalert.no/kontakt"
    />
    <SideTopp
      tittel="La oss ta"
      uthevet="en prat."
      lede="Fortell meg kort om bedriften din, så bygger jeg et ferdig utkast av den nye siden, gratis og uforpliktende. Jeg svarer innen 24 timer."
    />
    <Direkte />
    <DemoSkjema
      tittel="Eller bare legg igjen"
      uthevet="navn og e-post."
      lede="Så tar jeg kontakt. Du trenger ikke ha noe klart på forhånd. Jeg finner som regel ut av resten selv."
    />
  </Shell>
);

export default KontaktPage;
