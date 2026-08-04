import { useEffect, useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import SEO from '../components/SEO';
import { Navbar, Footer } from '../components/Layout';

const STORAGE_KEY = 'oppskalert_dashboard_pin';

// Fyller inn alle 30 dagene, ikke bare dem med treff, så stolpediagrammet
// blir sammenhengende i stedet for hullete rundt stille dager.
const buildDaySeries = (days) => {
  const byDate = new Map(days.map((d) => [d.date, d.count]));
  const out = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: byDate.get(key) || 0 });
  }
  return out;
};

const StatTile = ({ label, value }) => (
  <div className="bg-surface/30 border border-primary/10 rounded-[2rem] p-6">
    <span className="font-body text-xs uppercase tracking-widest text-primary/60 block mb-2">{label}</span>
    <span className="font-sans font-bold text-3xl md:text-4xl text-primary">{value}</span>
  </div>
);

const DagligeHendelser = ({ days }) => {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <div className="bg-surface/30 border border-primary/10 rounded-[2rem] p-6 md:p-8">
      <h2 className="font-sans font-bold text-lg mb-6">Hendelser siste 30 dager</h2>
      <div className="relative flex items-end gap-1 h-40">
        {days.map((d) => (
          <div
            key={d.date}
            className="group relative flex-1 h-full flex items-end"
            onMouseEnter={() => setHover(d)}
            onMouseLeave={() => setHover((cur) => (cur?.date === d.date ? null : cur))}
          >
            <div
              className="w-full bg-accent/70 group-hover:bg-accent rounded-t-sm transition-colors"
              style={{ height: `${Math.max(2, (d.count / max) * 100)}%` }}
            />
          </div>
        ))}
        {hover && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-primary text-background text-xs font-body px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
            {new Date(hover.date).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })}: {hover.count}
          </div>
        )}
      </div>
    </div>
  );
};

const TopHendelser = ({ topEvents }) => {
  const max = Math.max(1, ...topEvents.map((e) => e.count));
  return (
    <div className="bg-surface/30 border border-primary/10 rounded-[2rem] p-6 md:p-8">
      <h2 className="font-sans font-bold text-lg mb-6">Mest brukte hendelser</h2>
      <div className="flex flex-col gap-3">
        {topEvents.slice(0, 10).map((e) => (
          <div key={e.event} className="flex items-center gap-3">
            <span className="font-body text-xs text-primary/80 w-48 truncate">{e.event}</span>
            <div className="flex-1 bg-primary/5 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${(e.count / max) * 100}%` }} />
            </div>
            <span className="font-body text-xs text-primary/60 w-8 text-right">{e.count}</span>
          </div>
        ))}
        {topEvents.length === 0 && <p className="font-body text-sm text-primary/60">Ingen hendelser enda.</p>}
      </div>
    </div>
  );
};

// Kilde er utm_source hvis lenken er tagget (f.eks. e-postsignaturen),
// ellers henvisende domene (f.eks. "google.com" for organisk søk), ellers
// "direkte" (skrevet inn/bokmerket URL, eller en e-postklient som strippet
// referrer-headeren, som de fleste gjør).
const Trafikkilder = ({ sources }) => {
  const max = Math.max(1, ...sources.map((s) => s.pageviews));
  return (
    <div className="bg-surface/30 border border-primary/10 rounded-[2rem] p-6 md:p-8">
      <h2 className="font-sans font-bold text-lg mb-1">Trafikkilder</h2>
      <p className="font-body text-xs text-primary/60 mb-6">Sidevisninger siste 30 dager, etter kilde.</p>
      <div className="flex flex-col gap-3">
        {sources.slice(0, 10).map((s) => (
          <div key={s.kilde} className="flex items-center gap-3">
            <span className="font-body text-xs text-primary/80 w-32 truncate">{s.kilde}</span>
            <div className="flex-1 bg-primary/5 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${(s.pageviews / max) * 100}%` }} />
            </div>
            <span className="font-body text-xs text-primary/60 w-24 text-right">{s.pageviews} ({s.besokende} bes.)</span>
          </div>
        ))}
        {sources.length === 0 && <p className="font-body text-sm text-primary/60">Ingen data enda.</p>}
      </div>
    </div>
  );
};

const Leads = ({ leads }) => (
  <div className="bg-surface/30 border border-primary/10 rounded-[2rem] p-6 md:p-8">
    <h2 className="font-sans font-bold text-lg mb-6">Nye henvendelser</h2>
    <div className="flex flex-col gap-4">
      {leads.map((l) => (
        <div key={l.id} className="border-b border-primary/10 last:border-b-0 pb-4 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="font-sans font-bold text-base text-primary">{l.navn}</span>
            <span className="font-body text-xs text-primary/50">
              {new Date(l.created_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="font-body text-sm text-primary/80 mt-0.5">
            <a href={`mailto:${l.epost}`} className="text-accent hover:underline">{l.epost}</a>
            {l.firma && <span className="text-primary/60"> · {l.firma}</span>}
          </div>
          {l.melding && <p className="font-body text-sm text-primary/70 mt-1.5 leading-relaxed">{l.melding}</p>}
        </div>
      ))}
      {leads.length === 0 && <p className="font-body text-sm text-primary/60">Ingen henvendelser enda.</p>}
    </div>
  </div>
);

const PinGate = ({ onSubmit, error }) => {
  const [value, setValue] = useState('');
  return (
    <div className="max-w-sm mx-auto text-center">
      <Lock className="w-8 h-8 text-accent mx-auto mb-6" />
      <h1 className="font-sans font-bold text-2xl mb-2">Dashboard</h1>
      <p className="font-body text-sm text-primary/70 mb-8">Skriv inn PIN for å se analytics.</p>
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(value); }}
        className="flex flex-col gap-4"
      >
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
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
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | error | ready
  const [pinError, setPinError] = useState(false);

  const hentData = async (pinValue) => {
    setStatus('loading');
    setPinError(false);
    try {
      const res = await fetch('/api/admin/dashboard-data', { headers: { 'x-dashboard-pin': pinValue } });
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

  useEffect(() => {
    if (pin) hentData(pin);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-background text-primary min-h-screen">
      <SEO title="Dashboard" noindex canonical="https://oppskalert.no/admin/dashboard" />
      <Navbar />

      <section className="pt-40 pb-32 px-6 md:px-12 lg:px-24 min-h-[70vh] flex flex-col justify-center">
        {!pin ? (
          <PinGate onSubmit={(value) => { setPin(value); hentData(value); }} error={pinError} />
        ) : status === 'loading' ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div>
        ) : status === 'error' ? (
          <p className="font-body text-primary/70 text-center">Klarte ikke å hente data. Prøv å laste siden på nytt.</p>
        ) : data ? (
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
            <h1 className="font-sans font-bold text-3xl md:text-4xl tracking-tight">Analytics siste 30 dager</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatTile label="Sidevisninger" value={data.totalPageviews ?? '–'} />
              <StatTile label="Unike besøkende" value={data.uniqueVisitors} />
              <StatTile label="Demo-forespørsler" value={data.conversions} />
            </div>
            {data.totalPageviews === null && (
              <p className="font-body text-xs text-primary/50 -mt-4">
                Fikk ikke hentet sidevisninger fra PostHog akkurat nå. Unike besøkende og grafen under viser derfor egne engasjement-hendelser i stedet, som undertelles sammenlignet med reell trafikk.
              </p>
            )}
            <Leads leads={data.leads ?? []} />
            <DagligeHendelser days={buildDaySeries(data.days)} />
            <Trafikkilder sources={data.sources} />
            <TopHendelser topEvents={data.topEvents} />
          </div>
        ) : null}
      </section>

      <Footer />
    </div>
  );
};

export default DashboardPage;
