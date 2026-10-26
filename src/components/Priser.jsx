import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp } from './Layout';
import { cn } from '../lib/utils';
import { alltidMed, prisNotat, prismodeller, ruter } from '../lib/site';

/* Alle tre kortene er hvite på feltet. Driftskortet var tidligere tonet mot
   feltfargen for å skille seg fra engangsprisen, men denne seksjonen står
   selv på feltet: kortet med merkelappen ble dermed det eneste som ikke
   løftet seg fra bakgrunnen, altså det motsatte av jobben badgen har.
   Skillet ligger nå i kanten i stedet, en hårstrek i full blekk mot de
   andres tjue prosent, samme grep som .pris.fremhevet bruker på /priser.
   Ingen av kortene går mørke: mørkt er reservert til bunntekst, sitatkort
   og fylte knapper. className kommer fra den som rendrer kortet, derfor
   cn() i stedet for en ren streng. */
/* Eksportert fordi /priser rendrer nøyaktig det samme kortet. Prissiden
   hadde tidligere sine egne kort i CSS (.pris): serif-tall, punktumliste,
   ingen knapp. Det ga to ulike utgaver av «Driftet av meg» på to ruter.
   Kortet bor ett sted nå. `cta` finnes bare fordi driftsnivåene ikke skal
   si «Få et gratis utkast», de skal si «Velg Serviceavtale». */
/* Lavere kort på mobil: punktlisten er lukket der, bak en knapp, så navn,
   pris og knapp for alle kortene får plass på et par skjermhøyder. Stablet
   med full liste var hvert kort rundt 600 px høyt. Fra md står listen
   alltid åpen. Listen ligger i DOM-en uansett, så den prerendrede HTML-en
   har den med. */
export const Modell = ({ m, visPasserDeg = false, cta = 'Få et gratis utkast', className }) => {
  const [apen, setApen] = useState(false);
  return (
    <div
      data-reveal
      className={cn(
        'relative flex flex-col rounded-kort p-5 md:p-8 bg-room-deep text-room-ink',
        m.fremhevet && 'prisvalg-svart',
        className,
      )}
    >
      {m.fremhevet && (
        /* Den ene flaten aksenten dekker. Punktumfargen fantes bare i
           ordmerket og i noen prikker, og en aksent som aldri dekker noe
           er ikke en aksent. Hvit tekst, ikke kritt: kritt gir 4,3:1 mot
           clay og faller under kravet, hvit gir 4,8:1.

           «Anbefalt», ikke «Mest valgt»: «Mest valgt» er en påstand som
           må kunne dokumenteres med tall. «Anbefalt» er min egen
           anbefaling og kan stå uten. */
        <span className="absolute top-0 right-7 -translate-y-1/2 bg-[var(--prikk)] text-white text-sm font-body px-3.5 py-1 rounded-full font-semibold">
          Anbefalt
        </span>
      )}

      <h3 className="font-sans font-bold text-xl">{m.navn}</h3>
      <p className="font-body text-[0.95rem] mt-1.5 md:mt-2.5 leading-relaxed md:min-h-[3em] text-room-ink/70">
        {m.tagline}
      </p>

      <div className="mt-4 md:mt-6 flex items-baseline gap-1.5 md:min-h-[2.75rem]">
        {!m.fast && <span className="font-body text-base text-room-ink">fra</span>}
        <span className="font-display font-medium text-[2.75rem] leading-none tracking-[-0.03em]">{m.fra}</span>
        <span className="font-body text-sm text-room-ink/70">{m.enhet}</span>
      </div>
      <span className="font-body text-sm mt-1.5 text-room-ink/70">{m.periode}</span>

      {visPasserDeg && (
        <ul className="mt-6 pt-5 border-t flex flex-col gap-2.5 border-room-ink/20">
          <li className="font-body text-sm mb-1 text-room-ink/70">Passer deg som</li>
          {m.passerDeg.map((p) => (
            <li key={p} className="font-body text-[0.95rem] leading-relaxed text-room-ink/70">
              – {p}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setApen((v) => !v)}
        aria-expanded={apen}
        aria-controls={`inkludert-${m.id}`}
        className="md:hidden mt-4 min-h-11 inline-flex items-center gap-1.5 self-start font-body text-sm text-room-ink underline underline-offset-4 decoration-room-ink/30"
      >
        {apen ? 'Skjul hva som er med' : `Se hva som er med (${m.inkludert.length})`}
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', apen && 'rotate-180')} aria-hidden="true" />
      </button>

      <ul id={`inkludert-${m.id}`} className={cn('mt-3 md:mt-6 flex-col gap-3 flex-1', apen ? 'flex' : 'hidden md:flex')}>
        {m.inkludert.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed text-room-ink/70">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-room-ink" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={ruter.kontakt}
        className="mt-4 md:mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] bg-room-ink text-surface"
      >
        {cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

/* Rutenettet for priskortene, her og på /priser. Stablet på mobil.

   Til 17. oktober 2026 lå kortene i en vannrett sveiperad (KortRad) på
   mobil. Folk skjønte ikke at det fantes flere kort til siden, og så
   bare det første. Stablet er siden lengre, men alle tre prisene blir sett. */
export const PrisRad = ({ children, className }) => (
  <div className={cn('grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-[52rem] lg:max-w-[72rem]', className)}>
    {children}
  </div>
);

const Priser = ({ visPasserDeg = false, visAlltidMed = true, midtstilt = false }) => {
  const container = useReveal(90);

  return (
    <section id="priser" ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Tre måter å"
          uthevet="komme i gang på."
          lede="Alle tre starter med et gratis utkast, ferdig innen 48 timer. Du bestemmer deg etterpå, ikke før."
          midtstilt={midtstilt}
        />

        {/* Tre modeller i to spalter ga ett kort alene på en andre rad, med
            halve raden tom. Fra lg står de tre i linje. Mellom md og lg får
            det siste kortet hele bredden, så det ser bevisst ut og ikke som
            et kort som ble til overs. Chatbot eller app er tatt ut av
            prislisten 17. oktober 2026: ingen spurte etter det der.

            Anbefalt kort først på mobil, der kortene står under hverandre.
            Fra md står de i rutenettets egen rekkefølge.

            lg:items-start: med lik høyde fikk Engangspris rundt 250 px
            tomrom over knappen på 1440 og så uferdig ut. */}
        <PrisRad className="lg:items-start">
          {prismodeller.map((m, i) => (
            <Modell
              key={m.id}
              m={m}
              visPasserDeg={visPasserDeg}
              className={cn(
                i === prismodeller.length - 1 && 'md:col-span-2 lg:col-span-1',
                m.fremhevet && 'order-first md:order-none',
              )}
            />
          ))}
        </PrisRad>

        {/* Hva som IKKE er med. Uten denne listen ser fastprisen ut som om
            den dekker alt, og da blir hver samtale en forhandling om hvor
            grensen går. Å si nei på forhånd er også det tydeligste signalet
            om at prisen er regnet på en avgrenset jobb.

            Forsiden (visAlltidMed=false) får bare én linje under kortene.
            Der skal leseren bestemme seg, og fem ting å lese i tillegg
            trakk blikket bort fra knappene. Hele forbeholdet står på
            /priser. */}
        {visAlltidMed && (
          <>
            <div data-reveal className="mt-10 pt-6 border-t border-room-ink/15 max-w-[52rem]">
              <p className="font-sans font-bold text-sm">Dette ligger utenfor fastprisen</p>
              <p className="font-body text-sm text-room-ink/70 mt-2 leading-relaxed">
                Nettbutikk med varianter og lagerstyring, innlogging og kundeportal,
                flerspråklig innhold, og ny visuell identitet. Alt sammen kan jeg gjøre.
                Det får bare sin egen pris, avtalt før jeg begynner, som ellers.
              </p>
            </div>

            <p data-reveal className="font-body text-sm text-room-ink/70 mt-6 max-w-[52rem]">{prisNotat}</p>
            <p data-reveal className="font-body text-sm text-room-ink/70 mt-3 max-w-[52rem]">
              Vil du at jeg gjør endringene, eller jobber med søk hver måned?{' '}
              <Link to={ruter.drift} className="text-room-ink hover:opacity-70 transition-opacity underline underline-offset-2">
                Se serviceavtale og SEO
              </Link>
            </p>
          </>
        )}
        {!visAlltidMed && (
          <p data-reveal className="font-body text-sm text-room-ink/70 mt-10 max-w-[52rem]">{prisNotat}</p>
        )}

        {visAlltidMed ? (
          <div data-reveal className="mt-12 rounded-kort border border-room-ink/20 p-7 md:p-9 max-w-[52rem]">
            <h3 className="font-sans font-bold text-lg mb-6">Alt dette følger med, uansett modell.</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {alltidMed.map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] text-room-ink/70 leading-relaxed">
                  <Check className="w-4 h-4 text-room-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Kompakt variant (forsiden): boksen med alt som følger med er
             skjult, så lenken holder innholdet ett klikk unna i stedet. */
          <Link
            data-reveal
            to={ruter.priser}
            className="mt-4 inline-block font-sans font-bold text-sm text-room-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            <span>
              Se alt som er inkludert, og sammenlign modellene i detalj
              <ArrowRight className="inline w-4 h-4 ml-1.5 -mt-0.5" aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Priser;
