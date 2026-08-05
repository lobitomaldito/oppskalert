import { useEffect, useState } from 'react';
import { ChevronDown, Loader2, Lock, TrendingDown, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components/Layout';

const STORAGE_KEY = 'oppskalert_dashboard_pin';
const PERIODER = [7, 30, 90];

const kort = 'bg-surface/30 border border-primary/10 rounded-[2rem] p-6 md:p-8';

const nb = (n) => new Intl.NumberFormat('nb-NO').format(n);
const prosent = (andel) => `${Math.round(andel * 100)} %`;
const datoKort = (d) => new Date(d).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
const datoTid = (d) =>
  new Date(d).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

// Fyller inn alle dagene i perioden, ikke bare dem med treff, så
// stolpediagrammet blir sammenhengende i stedet for hullete rundt stille dager.
const byggDagsserie = (dager, antallDager) => {
  const perDato = new Map(dager.map((d) => [d.dato, d]));
  const ut = [];
  for (let i = antallDager - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const nokkel = d.toISOString().slice(0, 10);
    ut.push(perDato.get(nokkel) || { dato: nokkel, visninger: 0, personer: 0 });
  }
  return ut;
};

// Endring vises bare når forrige periode faktisk hadde noe å sammenligne
// med. «+100 %» fra null er en tom påstand, og «uendret» fra 0 til 0 er
// verre enn ingenting.
const Endring = ({ na, forrige }) => {
  if (forrige === null || forrige === undefined) return null;
  if (forrige === 0) {
    return (
      <span className="font-body text-xs text-primary/50">
        {na === 0 ? 'ingen forrige periode heller' : 'ingenting forrige periode'}
      </span>
    );
  }
  const endring = (na - forrige) / forrige;
  const opp = endring >= 0;
  const Ikon = opp ? TrendingUp : TrendingDown;
  return (
    <span className={`font-body text-xs flex items-center gap-1 ${opp ? 'text-emerald-400' : 'text-red-400'}`}>
      <Ikon className="w-3.5 h-3.5" aria-hidden="true" />
      {opp ? '+' : ''}{Math.round(endring * 100)} % mot forrige periode
    </span>
  );
};

const Nokkeltall = ({ etikett, verdi, forrige, forklaring }) => (
  <div className={`${kort} p-6`}>
    <span className="font-body text-xs uppercase tracking-widest text-primary/60 block mb-2">{etikett}</span>
    <span className="font-sans font-bold text-3xl md:text-4xl text-primary block">
      {verdi === null || verdi === undefined ? '–' : nb(verdi)}
    </span>
    <div className="mt-2 flex flex-col gap-1">
      <Endring na={verdi} forrige={forrige} />
      {forklaring && <span className="font-body text-xs text-primary/50">{forklaring}</span>}
    </div>
  </div>
);

// Aksen viser topp, midt og null, slik at en stolpe kan leses av uten å
// måtte holde musen over den. Datoene under er første, midterste og siste
// dag i perioden.
const Trafikkgraf = ({ dager, antallDager }) => {
  const [hover, setHover] = useState(null);
  const serie = byggDagsserie(dager, antallDager);
  const maks = Math.max(1, ...serie.map((d) => d.visninger));
  const merker = [0, Math.floor(serie.length / 2), serie.length - 1];

  return (
    <div className={kort}>
      <h2 className="font-sans font-bold text-lg mb-1">Sidevisninger per dag</h2>
      <p className="font-body text-xs text-primary/60 mb-6">
        Ditt eget besøk på /admin er holdt utenfor. Hold over en stolpe for tallene.
      </p>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between h-40 font-body text-[0.65rem] text-primary/40 text-right w-8 shrink-0">
          <span>{nb(maks)}</span>
          <span>{nb(Math.round(maks / 2))}</span>
          <span>0</span>
        </div>
        <div className="flex-1">
          <div className="relative flex items-end gap-px h-40 border-l border-b border-primary/10 pl-1">
            {/* Hjelpelinjer på topp og midt, så høyden kan leses av mot aksen. */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-primary/10" aria-hidden="true" />
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-primary/10" aria-hidden="true" />
            {serie.map((d) => (
              <div
                key={d.dato}
                className="group relative flex-1 h-full flex items-end"
                onMouseEnter={() => setHover(d)}
                onMouseLeave={() => setHover((n) => (n?.dato === d.dato ? null : n))}
              >
                <div
                  className="w-full bg-accent/70 group-hover:bg-accent rounded-t-sm transition-colors"
                  style={{ height: `${Math.max(1, (d.visninger / maks) * 100)}%` }}
                />
              </div>
            ))}
            {hover && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-primary text-background text-xs font-body px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10">
                {datoKort(hover.dato)}: {nb(hover.visninger)} visninger, {nb(hover.personer)} ekte besøkende
              </div>
            )}
          </div>
          <div className="flex justify-between font-body text-[0.65rem] text-primary/40 mt-2 pl-1">
            {merker.map((i) => (
              <span key={i}>{datoKort(serie[i].dato)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// «Hvor mange gjorde dette», ikke en streng sekvens: kalkulatoren er en
// sidevei, og skjemaet har en «hopp over»-lenke som lar noen sende inn uten
// å fullføre steg 1. Frafall vises derfor bare mellom de to stegene der det
// faktisk er en rekkefølge, ellers leses et lavt kalkulatortall som at folk
// forsvant, når de bare aldri gikk den veien.
const FRAFALL_ETTER = 'Åpnet skjemaet';

const Trakt = ({ steg }) => {
  const topp = Math.max(1, steg[0]?.personer || 0);
  return (
    <div className={kort}>
      <h2 className="font-sans font-bold text-lg mb-1">Veien til en henvendelse</h2>
      <p className="font-body text-xs text-primary/60 mb-6">
        Målt mot ekte besøkende, ikke mot skannerne. Kalkulatoren er en sidevei, ikke et krav for å sende inn.
      </p>
      <div className="flex flex-col gap-4">
        {steg.map((s, i) => {
          const forrige = i > 0 ? steg[i - 1] : null;
          const frafall =
            forrige?.navn === FRAFALL_ETTER && forrige.personer > s.personer
              ? forrige.personer - s.personer
              : 0;
          return (
            <div key={s.navn}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-1.5">
                <span className="font-body text-sm text-primary/90">{s.navn}</span>
                <span className="font-body text-xs text-primary/60">
                  <span className="font-sans font-bold text-sm text-primary">{nb(s.personer)}</span>
                  {i > 0 && ` · ${prosent(s.andel)} av besøkende`}
                </span>
              </div>
              <div className="bg-primary/5 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(s.personer / topp) * 100}%` }} />
              </div>
              {frafall > 0 && (
                <span className="font-body text-[0.7rem] text-primary/40 mt-1 block">
                  {nb(frafall)} åpnet skjemaet uten å sende inn
                </span>
              )}
            </div>
          );
        })}
        {steg.length === 0 && <p className="font-body text-sm text-primary/60">Ingen data enda.</p>}
      </div>
    </div>
  );
};

// Stolpen måler ekte personer, ikke sidevisninger. Skanneren som henter
// /kontakt én gang skal ikke gi en like lang stolpe som noen som faktisk
// leste siden. Den dempede teksten viser hvor mange økter kilden hadde
// totalt, så en kilde som bare er roboter synes som nettopp det: mange
// økter, null personer.
const Kildeliste = ({ tittel, lede, rader, nokkel, tomtekst }) => {
  const maks = Math.max(1, ...rader.map((r) => r.personer));
  return (
    <div className={kort}>
      <h2 className="font-sans font-bold text-lg mb-1">{tittel}</h2>
      <p className="font-body text-xs text-primary/60 mb-6">{lede}</p>
      <div className="flex flex-col gap-3.5">
        {rader.slice(0, 12).map((r) => (
          <div key={r[nokkel]} className="flex items-center gap-3">
            <span className="font-body text-xs text-primary/80 w-32 sm:w-44 truncate" title={r[nokkel]}>{r[nokkel]}</span>
            <div className="flex-1 bg-primary/5 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${(r.personer / maks) * 100}%` }} />
            </div>
            <span className="font-body text-xs w-32 text-right tabular-nums shrink-0">
              <span className={r.personer > 0 ? 'text-primary/80' : 'text-primary/35'}>
                {nb(r.personer)} {r.personer === 1 ? 'person' : 'personer'}
              </span>
              <span className="text-primary/35"> · {nb(r.okter ?? r.visninger)} økt{(r.okter ?? r.visninger) === 1 ? '' : 'er'}</span>
            </span>
          </div>
        ))}
        {rader.length === 0 && <p className="font-body text-sm text-primary/60">{tomtekst}</p>}
      </div>
    </div>
  );
};

// En feil uten adresse, nettleser og antall rammede er ikke til å gjøre noe
// med. Kjent støy (Outlook sin lenkeskanner, chunk-feil etter deploy) er
// skilt ut, ellers drukner de to som faktisk betyr noe.
const Feilrad = ({ f, dempet }) => (
  <div className="border-b border-primary/10 last:border-b-0 pb-4 last:pb-0">
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <span className={`font-sans font-bold text-sm ${dempet ? 'text-primary/60' : 'text-red-400'}`}>
        {f.type || 'Feil'}
      </span>
      <span className="font-body text-xs text-primary/50 tabular-nums">
        {nb(f.antall)}× · {nb(f.rammede)} {f.rammede === 1 ? 'person' : 'personer'} · {datoKort(f.forst)}–{datoKort(f.sist)}
      </span>
    </div>
    <p className="font-body text-xs text-primary/70 mt-1 leading-relaxed break-words">{f.melding}</p>
    <div className="font-body text-[0.7rem] text-primary/45 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
      {f.url && <span className="break-all">{f.url.replace(/^https?:\/\/[^/]+/, '') || '/'}</span>}
      {f.nettleser && <span>{f.nettleser}{f.os ? ` · ${f.os}` : ''}</span>}
    </div>
    {f.hvorfor && <p className="font-body text-[0.7rem] text-primary/60 mt-1.5 italic">{f.hvorfor}</p>}
  </div>
);

const Feil = ({ feil }) => {
  const [visStoy, setVisStoy] = useState(false);
  return (
    <div className={kort}>
      <h2 className="font-sans font-bold text-lg mb-1">Feil som er verdt å se på</h2>
      <p className="font-body text-xs text-primary/60 mb-6">
        Fanget automatisk av PostHog, med adressen de skjedde på og hvor mange som ble rammet.
      </p>
      <div className="flex flex-col gap-4">
        {feil.ekte.map((f, i) => <Feilrad key={`${f.type}-${i}`} f={f} />)}
        {feil.ekte.length === 0 && (
          <p className="font-body text-sm text-primary/60">Ingen feil som krever noe av deg. Det er et godt tegn.</p>
        )}
      </div>

      {feil.stoy.length > 0 && (
        <div className="mt-6 pt-5 border-t border-primary/10">
          <button
            type="button"
            onClick={() => setVisStoy((v) => !v)}
            className="font-body text-xs text-primary/60 hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${visStoy ? 'rotate-180' : ''}`} aria-hidden="true" />
            {feil.stoy.length} kjent støyfeil som ikke er din å fikse
          </button>
          {visStoy && (
            <div className="flex flex-col gap-4 mt-4">
              {feil.stoy.map((f, i) => <Feilrad key={`stoy-${f.type}-${i}`} f={f} dempet />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Henvendelser = ({ leads, spam }) => {
  const [visSpam, setVisSpam] = useState(false);
  return (
    <div className={kort}>
      <h2 className="font-sans font-bold text-lg mb-6">Nye henvendelser</h2>
      <div className="flex flex-col gap-4">
        {leads.map((l) => (
          <div key={l.id} className="border-b border-primary/10 last:border-b-0 pb-4 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="font-sans font-bold text-base text-primary">{l.navn}</span>
              <span className="font-body text-xs text-primary/50">{datoTid(l.created_at)}</span>
            </div>
            <div className="font-body text-sm text-primary/80 mt-0.5">
              <a href={`mailto:${l.epost}`} className="text-accent hover:underline">{l.epost}</a>
              {l.firma && <span className="text-primary/60"> · {l.firma}</span>}
            </div>
            {l.melding && <p className="font-body text-sm text-primary/70 mt-1.5 leading-relaxed">{l.melding}</p>}
          </div>
        ))}
        {leads.length === 0 && <p className="font-body text-sm text-primary/60">Ingen ekte henvendelser i perioden.</p>}
      </div>

      {spam.length > 0 && (
        <div className="mt-6 pt-5 border-t border-primary/10">
          <button
            type="button"
            onClick={() => setVisSpam((v) => !v)}
            className="font-body text-xs text-primary/60 hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${visSpam ? 'rotate-180' : ''}`} aria-hidden="true" />
            {spam.length} skjult som spam
          </button>
          {visSpam && (
            <div className="flex flex-col gap-3 mt-4">
              {spam.map((l) => (
                <div key={l.id} className="font-body text-xs text-primary/45 flex flex-wrap gap-x-2">
                  <span className="text-primary/60">{l.navn}</span>
                  <span>{l.epost}</span>
                  <span className="italic">({l.spamGrunn})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Skrevet av en ukentlig cloud-agent (schedule-rutine), som også committer
// samme rapport som markdown til reports/ i repoet. Ingen markdown-rendering
// her med vilje: whitespace-pre-wrap er nok og unngår en ny avhengighet.
const UkentligeRapporter = ({ rapporter }) => {
  const [apen, setApen] = useState(null);
  return (
    <div className={kort}>
      <h2 className="font-sans font-bold text-lg mb-1">Ukentlige rapporter</h2>
      <p className="font-body text-xs text-primary/60 mb-6">Trafikk, kilder og innsikt, oppsummert hver uke.</p>
      <div className="flex flex-col gap-4">
        {rapporter.map((r) => {
          const erApen = apen === r.id;
          return (
            <div key={r.id} className="border-b border-primary/10 last:border-b-0 pb-4 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="font-sans font-bold text-base text-primary">
                  {datoKort(r.week_start)} – {datoKort(r.week_end)}
                </span>
                <button
                  type="button"
                  onClick={() => setApen(erApen ? null : r.id)}
                  className="font-body text-xs text-accent hover:underline"
                >
                  {erApen ? 'Skjul full rapport' : 'Vis full rapport'}
                </button>
              </div>
              <p className="font-body text-sm text-primary/80 mt-1.5 leading-relaxed">{r.summary}</p>
              {erApen && (
                <pre className="font-body text-xs text-primary/70 mt-3 leading-relaxed whitespace-pre-wrap bg-primary/5 rounded-2xl p-4">
                  {r.report_markdown}
                </pre>
              )}
            </div>
          );
        })}
        {rapporter.length === 0 && (
          <p className="font-body text-sm text-primary/60">Ingen rapporter enda. Første kommer etter neste kjøring.</p>
        )}
      </div>
    </div>
  );
};

const Periodevelger = ({ valgt, onVelg, laster }) => (
  <div className="flex gap-2" role="group" aria-label="Velg periode">
    {PERIODER.map((d) => (
      <button
        key={d}
        type="button"
        disabled={laster}
        onClick={() => onVelg(d)}
        aria-pressed={valgt === d}
        className={`font-body text-xs px-4 py-2 rounded-full border transition-colors disabled:opacity-50 ${
          valgt === d
            ? 'bg-accent text-background border-accent font-semibold'
            : 'border-primary/20 text-primary/70 hover:border-primary/40'
        }`}
      >
        {d} dager
      </button>
    ))}
  </div>
);

const PinGate = ({ onSubmit, error }) => {
  const [value, setValue] = useState('');
  return (
    <div className="max-w-sm mx-auto text-center">
      <Lock className="w-8 h-8 text-accent mx-auto mb-6" />
      <h1 className="font-sans font-bold text-2xl mb-2">Dashboard</h1>
      <p className="font-body text-sm text-primary/70 mb-8">Skriv inn PIN for å se analytics.</p>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(value); }} className="flex flex-col gap-4">
        <input
          type="password" inputMode="numeric" autoFocus value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-primary/5 border border-primary/20 rounded-full px-6 py-4 font-body text-sm text-primary text-center tracking-[0.3em] focus:outline-none focus:border-accent transition-colors"
          placeholder="PIN"
        />
        <button type="submit" className="bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.02]">
          Lås opp
        </button>
        {error && <p className="font-body text-sm text-red-500" role="alert">Feil PIN, prøv igjen.</p>}
      </form>
    </div>
  );
};

const DashboardPage = () => {
  const [pin, setPin] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [dager, setDager] = useState(30);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | error | ready
  const [pinError, setPinError] = useState(false);

  const hentData = async (pinValue, antallDager) => {
    setStatus('loading');
    setPinError(false);
    try {
      const res = await fetch(`/api/admin/dashboard-data?dager=${antallDager}`, {
        headers: { 'x-dashboard-pin': pinValue },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        setPin('');
        setPinError(true);
        setStatus('idle');
        return;
      }
      if (!res.ok) throw new Error(`Uventet svar (${res.status})`);
      const json = await res.json();
      sessionStorage.setItem(STORAGE_KEY, pinValue);
      setData(json);
      setStatus('ready');
    } catch (err) {
      console.error('Dashboard: kunne ikke hente data', err);
      setStatus('error');
    }
  };

  const velgPeriode = (nyeDager) => {
    setDager(nyeDager);
    hentData(pin, nyeDager);
  };

  useEffect(() => {
    if (pin) hentData(pin, dager);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-background text-primary min-h-screen">
      <SEO title="Dashboard" noindex canonical="https://oppskalert.no/admin/dashboard" />
      <Navbar />

      <section className="pt-40 pb-32 px-6 md:px-12 lg:px-24 min-h-[70vh] flex flex-col justify-center">
        {!pin ? (
          <PinGate onSubmit={(value) => { setPin(value); hentData(value, dager); }} error={pinError} />
        ) : status === 'error' ? (
          <p className="font-body text-primary/70 text-center">Klarte ikke å hente data. Prøv å laste siden på nytt.</p>
        ) : !data ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div>
        ) : (
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="font-sans font-bold text-3xl md:text-4xl tracking-tight">
                Siste {dager} dager
              </h1>
              <div className="flex items-center gap-3">
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-accent" aria-label="Laster" />}
                <Periodevelger valgt={dager} onVelg={velgPeriode} laster={status === 'loading'} />
              </div>
            </div>

            {!data.posthogTilgjengelig && (
              <p className="font-body text-sm text-red-400 bg-red-400/5 border border-red-400/20 rounded-2xl px-5 py-4">
                PostHog svarte ikke. Trafikktall, sider og feil er tomme fordi de hentes derfra, ikke fordi det ikke
                skjedde noe. Henvendelsene under er hentet fra Supabase og stemmer.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Nokkeltall
                etikett="Ekte besøkende" verdi={data.engasjerte?.na} forrige={data.engasjerte?.forrige}
                forklaring={
                  data.besokende?.na
                    ? `av ${nb(data.besokende.na)} registrerte. Resten er e-postskannere og crawlere.`
                    : null
                }
              />
              <Nokkeltall
                etikett="Sidevisninger" verdi={data.sidevisninger?.na} forrige={data.sidevisninger?.forrige}
                forklaring="Alle, uten /admin. Ikke filtrert for roboter."
              />
              <Nokkeltall
                etikett="Henvendelser" verdi={data.henvendelser?.na} forrige={data.henvendelser?.forrige}
                forklaring="Spam holdt utenfor"
              />
            </div>

            <p className="font-body text-xs text-primary/50 -mt-4 leading-relaxed">
              «Ekte besøkende» teller bare økter med minst ett klikk eller minst{' '}
              {data.periode?.engasjertSekunder ?? 60} sekunder på siden. Grunnen: når du sender e-post, åpner
              mottakernes sikkerhetsskannere (Outlook Safe Links og liknende) hver lenke automatisk fra
              datasentre i Irland og Nederland. De ser ut som besøkende, men klikker aldri og blir aldri.
            </p>

            <Henvendelser leads={data.leads ?? []} spam={data.spam ?? []} />
            <Feil feil={data.feil ?? { ekte: [], stoy: [] }} />
            <Trafikkgraf dager={data.dager ?? []} antallDager={dager} />
            <Trakt steg={data.trakt ?? []} />
            <Kildeliste
              tittel="Hvor folk kommer fra"
              lede="Kilden til hver økt, målt i ekte personer. En kilde med mange økter og null personer er roboter."
              rader={data.kilder ?? []} nokkel="kilde" tomtekst="Ingen trafikk i perioden."
            />
            <Kildeliste
              tittel="Hvor folk lander"
              lede="Første side i økten. Der folk kommer inn, ikke alt de klikket seg videre til."
              rader={data.sider ?? []} nokkel="sti" tomtekst="Ingen sidevisninger i perioden."
            />
            <UkentligeRapporter rapporter={data.rapporter ?? []} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default DashboardPage;
