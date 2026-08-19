import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp } from './Layout';
import { cn } from '../lib/utils';
import { sporsmal as standardSporsmal } from '../lib/site';

/* Ingen kort, ingen rammer, bare hårfine linjer, slik at spørsmålene
   leses som en liste og ikke som enda et rutenett med bokser.

   `sporsmal` er en prop fordi hver rute skal ha sitt eget sett. To ruter
   med samme FAQ er duplisert FAQPage-schema, og da forkaster Google den
   ene. Setter du et eget sett her, husk å sende det samme settet gjennom
   lagFaqSchema() i sidens jsonLd, ellers svarer schemaet på andre
   spørsmål enn de som står på siden. */
const FAQ = ({
  tittel = 'Det folk lurer på',
  uthevet = 'før de sier ja.',
  lede = null,
  flate = '',
  sporsmal = standardSporsmal,
}) => {
  const [apen, setApen] = useState(null);
  const container = useReveal(70);
  const uid = useId();

  return (
    <section id="faq" ref={container} className={cn('seksjon', flate)}>
      <div className="wrap">
        <SeksjonTopp tittel={tittel} uthevet={uthevet} lede={lede} />

        <div className="max-w-[46rem]">
          {sporsmal.map((item, i) => {
            const open = apen === i;
            const panelId = `${uid}-panel-${i}`;
            const knappId = `${uid}-knapp-${i}`;
            return (
              <div key={item.q} data-reveal className={`border-primary/20 ${i === 0 ? 'border-y' : 'border-b'}`}>
                <h3>
                  <button
                    id={knappId}
                    type="button"
                    onClick={() => setApen(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left font-sans font-medium text-[1.02rem] md:text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
                  >
                    {item.q}
                    <Plus
                      className={`w-5 h-5 flex-shrink-0 text-ink transition-transform duration-300 ease-lett ${open ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={knappId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-lett ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  {/* invisible + overflow-hidden holder teksten ute av
                      tabrekkefølgen og skjermleseren når panelet er lukket,
                      uten å ofre animasjonen. */}
                  <div className={`overflow-hidden ${open ? 'visible' : 'invisible'}`}>
                    <p className="font-body text-[0.95rem] md:text-base leading-[1.75] text-primary/80 pb-6 pr-4 md:pr-12 max-w-[62ch]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
