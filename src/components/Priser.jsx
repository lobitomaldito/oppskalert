import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import { SeksjonTopp, KortRad } from './Layout';
import { cn } from '../lib/utils';
import { alltidMed, prisNotat, prismodeller, ruter } from '../lib/site';

/* Alle tre kortene er hvite på feltet. Driftskortet var tidligere tonet mot
   feltfargen for å skille seg fra engangsprisen, men denne seksjonen står
   selv på feltet: kortet med «Mest valgt» ble dermed det eneste som ikke
   løftet seg fra bakgrunnen, altså det motsatte av jobben badgen har.
   Skillet ligger nå i kanten i stedet, en hårstrek i full blekk mot de
   andres tjue prosent, samme grep som .pris.fremhevet bruker på /priser.
   Ingen av kortene går mørke: mørkt er reservert til bunntekst, sitatkort
   og fylte knapper. className kommer fra KortRad (bredden på mobil),
   derfor cn() i stedet for en ren streng. */
/* Eksportert fordi /priser rendrer nøyaktig det samme kortet. Prissiden
   hadde tidligere sine egne kort i CSS (.pris): serif-tall, punktumliste,
   ingen knapp. Det ga to ulike utgaver av «Driftet av meg» på to ruter.
   Kortet bor ett sted nå. `cta` finnes bare fordi driftsnivåene ikke skal
   si «Bestill gratis demo», de skal si «Velg Grunndrift». */
export const Modell = ({ m, visPasserDeg = false, cta = 'Bestill gratis demo', className }) => {
  return (
    <div
      data-reveal
      className={cn(
        'relative flex flex-col rounded-kort p-7 md:p-8 border bg-surface text-room-ink',
        m.fremhevet ? 'border-room-ink' : 'border-room-ink/20',
        className,
      )}
    >
      {m.fremhevet && (
        /* Den ene flaten aksenten dekker. Punktumfargen fantes bare i
           ordmerket og i noen prikker, og en aksent som aldri dekker noe
           er ikke en aksent. Hvit tekst, ikke kritt: kritt gir 4,3:1 mot
           clay og faller under kravet, hvit gir 4,8:1. */
        <span className="absolute top-0 right-7 -translate-y-1/2 bg-[var(--prikk)] text-white text-sm font-body px-3.5 py-1 rounded-full font-semibold">
          Mest valgt
        </span>
      )}

      <h3 className="font-sans font-bold text-xl">{m.navn}</h3>
      <p className="font-body text-[0.95rem] mt-2.5 leading-relaxed min-h-[3em] text-room-ink/70">
        {m.tagline}
      </p>

      {/* «Forespør pris» er tekst, ikke et beløp. Uten dette skillet leste
          kortet «fra Forespør pris», som er en setning ingen kan lese, og
          «fra» lovet dessuten et startbeløp jeg ikke oppgir her. Samme
          skille som på /priser, se erForesporsel i site.js. */}
      <div className="mt-6 flex items-baseline gap-1.5 min-h-[2.75rem]">
        {m.erForesporsel ? (
          <span className="font-display font-normal text-[1.5rem] leading-none tracking-[-0.018em]">{m.fra}</span>
        ) : (
          <>
            <span className="font-body text-sm text-room-ink/70">fra</span>
            <span className="font-display font-light text-[2.75rem] leading-none tracking-[-0.022em]">{m.fra}</span>
            <span className="font-body text-sm text-room-ink/70">{m.enhet}</span>
          </>
        )}
      </div>
      <span className="font-body text-sm mt-1.5 text-room-ink/70">{m.periode}</span>

      {/* Kun på engangspris-kortet: kalkulatoren regner ut et scope-basert
          engangsestimat, ikke et månedsbeløp, så den hører hjemme her og
          ikke på driftskortet ved siden av. */}
      {m.id === 'engangs' && (
        <Link
          to={ruter.kalkulator}
          className="font-body text-sm text-room-ink hover:opacity-70 transition-opacity underline underline-offset-2 mt-2 inline-block w-fit"
        >
          Regn ut prisen for din side →
        </Link>
      )}

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

      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {m.inkludert.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-body text-[0.95rem] leading-relaxed text-room-ink/70">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-room-ink" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={ruter.kontakt}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans font-bold text-sm transition-transform duration-300 hover:scale-[1.03] bg-room-ink text-surface"
      >
        {cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

const Priser = ({ visPasserDeg = false, visAlltidMed = true, midtstilt = false }) => {
  const container = useReveal(90);

  return (
    <section id="priser" ref={container} className="seksjon">
      <div className="wrap">
        <SeksjonTopp
          tittel="Tre måter å"
          uthevet="komme i gang på."
          lede="Alle tre starter med en gratis demo, ferdig innen 48 timer. Du bestemmer deg etterpå, ikke før."
          midtstilt={midtstilt}
        />

        {/* Tre modeller i to spalter ga ett kort alene på en tredje rad, med
            halve raden tom. Fra lg står de tre i linje. Mellom md og lg får
            forespørselskortet hele bredden i stedet, så det ser bevisst ut
            og ikke som et kort som ble til overs. */}
        <KortRad
          gridKlasser="md:grid-cols-2 lg:grid-cols-3"
          kortBredde="w-[86%]"
          className="gap-5 items-stretch max-w-[52rem] lg:max-w-[72rem]"
        >
          {prismodeller.map((m) => (
            <Modell
              key={m.id}
              m={m}
              visPasserDeg={visPasserDeg}
              className={m.erForesporsel ? 'md:col-span-2 lg:col-span-1' : undefined}
            />
          ))}
        </KortRad>

        {/* Hva som IKKE er med. Uten denne listen ser fastprisen ut som om
            den dekker alt, og da blir hver samtale en forhandling om hvor
            grensen går. Å si nei på forhånd er også det tydeligste signalet
            om at prisen er regnet på en avgrenset jobb. */}
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
          Vil du redigere selv, eller ha enda raskere respons?{' '}
          <Link to={ruter.drift} className="text-room-ink hover:opacity-70 transition-opacity underline underline-offset-2">
            Se alle driftsnivåer
          </Link>
        </p>

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
            className="mt-10 inline-flex items-center gap-2 font-sans font-bold text-sm text-room-ink underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Se alt som er inkludert, og sammenlign modellene i detalj <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Priser;
