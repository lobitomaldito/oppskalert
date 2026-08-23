import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Shell, SideTopp } from '../components/Layout';
import DemoSkjema from '../components/DemoSkjema';
import { useReveal } from '../lib/useReveal';
import { sammenlignOversikt } from '../lib/site';
import FAQ from '../components/FAQ';
import { lagFaqSchema } from '../lib/site';
import { faqSammenlign } from '../lib/faq-sider';

const faqLd = lagFaqSchema(faqSammenlign);

const SammenlignPage = () => {
  const container = useReveal(90);
  return (
    <Shell>
      <SEO
        title="Sammenlign"
        description="Wix, WordPress eller en skreddersydd nettside: ærlig sammenlignet på pris, eierskap, hastighet og tidsbruk."
        keywords={['wix eller webdesigner', 'wordpress eller webdesigner', 'sammenlign nettsideleverandør']}
        canonical="https://oppskalert.no/sammenlign"
      jsonLd={faqLd}
      />
      <SideTopp
        tittel="Meg, sammenlignet"
        uthevet="med alternativene."
        lede="Jeg tror på å være ærlig, også om når noe annet passer deg bedre. Her sammenligner jeg meg åpent med de vanligste alternativene, så du kan ta et informert valg."
      />
      <section ref={container} className="seksjon pt-0">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 gap-5 max-w-[46rem]">
            {sammenlignOversikt.map((s) => (
              <Link
                key={s.slug}
                to={s.rute}
                data-reveal
                className="group flex flex-col justify-between rounded-kort border border-room-ink/10 bg-room-ink/[0.03] hover:border-room-ink/40 transition-colors duration-300 p-7"
              >
                <div>
                  <h2 className="font-sans font-bold text-xl">Meg vs. {s.navn}</h2>
                  <p className="font-body text-[0.95rem] text-room-ink/70 mt-2.5 leading-relaxed">{s.kort}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-sans font-bold text-sm text-room-ink underline underline-offset-4 decoration-room-ink/40 group-hover:decoration-room-ink transition-colors">
                  Se sammenligningen
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <DemoSkjema
        tittel="Fortsatt usikker på"
        uthevet="hva som passer?"
        lede="Fortell meg kort om bedriften og hva du trenger, så gir jeg deg et ærlig råd, uansett om svaret er meg eller noe annet."
      />
      <FAQ
      tittel="Før du velger"
      uthevet="leverandør."
      lede="Fire spørsmål det lønner seg å stille alle du vurderer, ikke bare meg."
      sporsmal={faqSammenlign}
    />
  </Shell>
  );
};

export default SammenlignPage;
