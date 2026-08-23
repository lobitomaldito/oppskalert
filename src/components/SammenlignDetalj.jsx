import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SideTopp } from './Layout';
import { ruter } from '../lib/site';

/* Delt visning for hver sammenlign-underside. Data (rader, intro,
   konklusjon) bor i site.js, dette er bare presentasjonen. */
const SammenlignDetalj = ({ data }) => {
  const container = useReveal(80);
  return (
    <>
      <SideTopp
        tittel="Meg vs."
        uthevet={data.navn}
        lede={data.intro}
      />
      <section ref={container} className="seksjon pt-0">
        <div className="wrap">
          <div data-reveal className="overflow-x-auto rounded-kort border border-room-ink/10">
            <table className="w-full border-collapse min-w-[38rem]">
              <caption className="sr-only">Sammenligning av meg og {data.navn}</caption>
              <thead>
                <tr className="border-b border-room-ink/15 bg-room-ink/5">
                  <th scope="col" className="text-left font-body text-xs uppercase tracking-widest text-room-ink/70 py-3.5 px-4 font-semibold">Punkt</th>
                  <th scope="col" className="text-left font-sans font-bold text-sm py-3.5 px-4 w-[15rem]">{data.navn}</th>
                  {/* Ingen aksentfarge på "Meg"-kolonnen lenger. Understreken
                      bærer uthevingen typografisk, cellene under er allerede
                      differensiert med full vs. dempet blekk-opasitet. */}
                  <th scope="col" className="text-left font-sans font-bold text-sm py-3.5 px-4 w-[15rem] underline underline-offset-4">Meg</th>
                </tr>
              </thead>
              <tbody>
                {data.rader.map(([navn, dem, meg]) => (
                  <tr key={navn} className="border-b border-room-ink/10 last:border-b-0">
                    <th scope="row" className="text-left font-body text-[0.9rem] text-room-ink/70 py-3.5 px-4 font-normal">{navn}</th>
                    <td className="font-body text-[0.88rem] text-room-ink/70 py-3.5 px-4">{dem}</td>
                    <td className="font-body text-[0.88rem] text-room-ink py-3.5 px-4">{meg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div data-reveal className="mt-8 rounded-kort border border-room-ink/10 bg-room-ink/5 p-7 md:p-8 max-w-[52rem]">
            <h2 className="font-sans font-bold text-lg mb-3">Så hva passer deg?</h2>
            <p className="font-body text-[0.95rem] text-room-ink/70 leading-relaxed">{data.konklusjon}</p>
            <Link
              to={ruter.kontakt}
              className="mt-6 inline-flex items-center gap-2 bg-room-ink text-room px-6 py-3.5 rounded-full font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03]"
            >
              Bestill gratis demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SammenlignDetalj;
