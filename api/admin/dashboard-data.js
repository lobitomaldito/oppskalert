import { createClient } from '@supabase/supabase-js';

// Samme Supabase-prosjekt som analytics_events skrives til fra klienten,
// men her brukes service-role-nøkkelen (kun server-side) for å kunne lese
// tilbake det anon-nøkkelen bevisst ikke får lov til å se.
const SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';

// PostHog-prosjektet er ikke hemmelig (VITE_POSTHOG_TOKEN er allerede
// offentlig i klienten), men POSTHOG_API_KEY (en personal API key) er det,
// og hentes derfor kun server-side her.
const POSTHOG_PROJECT_ID = '239572';
const POSTHOG_HOST = 'https://eu.posthog.com';

// analytics_events (Supabase) inneholder kun de navngitte hendelsene vi
// selv kaller track() på (demo-forespørsler, kontakt-klikk osv). PostHog
// sin autocapture av $pageview/$autocapture går rett til PostHog og
// havner aldri i den tabellen, så reelt besøkstall må hentes herfra i
// stedet for å telles fra Supabase.
async function hentPosthogTrafikk() {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return null;

  const query = `
    SELECT
      toDate(timestamp) AS dag,
      multiIf(
        properties.utm_source IS NOT NULL AND properties.utm_source != '', properties.utm_source,
        properties.$referring_domain IS NOT NULL AND properties.$referring_domain != '' AND properties.$referring_domain != '$direct', properties.$referring_domain,
        'direkte'
      ) AS kilde,
      distinct_id
    FROM events
    WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY
    LIMIT 20000
  `;

  let results;
  try {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
    });
    if (!res.ok) {
      console.error('dashboard-data: PostHog-spørring feilet', res.status, await res.text());
      return null;
    }
    ({ results } = await res.json());
  } catch (err) {
    console.error('dashboard-data: PostHog-spørring feilet', err);
    return null;
  }

  const byDay = {};
  const bySource = {};
  const uniqueVisitors = new Set();
  for (const [dag, kilde, distinctId] of results || []) {
    byDay[dag] = (byDay[dag] || 0) + 1;
    if (!bySource[kilde]) bySource[kilde] = { pageviews: 0, visitors: new Set() };
    bySource[kilde].pageviews += 1;
    bySource[kilde].visitors.add(distinctId);
    uniqueVisitors.add(distinctId);
  }

  return {
    totalPageviews: (results || []).length,
    uniqueVisitors: uniqueVisitors.size,
    days: Object.entries(byDay).map(([date, count]) => ({ date, count })),
    sources: Object.entries(bySource)
      .map(([kilde, v]) => ({ kilde, pageviews: v.pageviews, besokende: v.visitors.size }))
      .sort((a, b) => b.pageviews - a.pageviews),
  };
}

// Mest besøkte sider siste 30 dager — særlig for å se om nyere sider
// (kalkulator, drift, sammenlign) faktisk får trafikk.
async function hentTopSider() {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return null;

  const query = `
    SELECT
      properties.$pathname AS sti,
      count() AS visninger
    FROM events
    WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY AND properties.$pathname IS NOT NULL
    GROUP BY sti
    ORDER BY visninger DESC
    LIMIT 15
  `;

  try {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
    });
    if (!res.ok) {
      console.error('dashboard-data: topsider-spørring feilet', res.status, await res.text());
      return null;
    }
    const { results } = await res.json();
    return (results || []).map(([sti, visninger]) => ({ sti, visninger }));
  } catch (err) {
    console.error('dashboard-data: topsider-spørring feilet', err);
    return null;
  }
}

// JS-feil siste 30 dager. posthog-js sin exception-autocapture
// (capture_exceptions: true i lib/posthog.js) skriver til $exception med
// $exception_list — en liste av {type, value, ...}, ikke et flatt
// $exception_message-felt (det gamle formatet, avviklet). Hvis
// skjemaet skulle avvike fra dette, faller spørringen bare tilbake
// til tom liste under, ikke en knekt dashboard-last.
async function hentSisteFeil() {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return null;

  const query = `
    SELECT
      properties.$exception_list[1].value AS melding,
      properties.$exception_list[1].type AS type,
      count() AS antall,
      max(timestamp) AS sist
    FROM events
    WHERE event = '$exception' AND timestamp > now() - INTERVAL 30 DAY
    GROUP BY melding, type
    ORDER BY sist DESC
    LIMIT 15
  `;

  try {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
    });
    if (!res.ok) {
      console.error('dashboard-data: feil-spørring feilet', res.status, await res.text());
      return null;
    }
    const { results } = await res.json();
    return (results || []).map(([melding, type, antall, sist]) => ({ melding, type, antall, sist }));
  } catch (err) {
    console.error('dashboard-data: feil-spørring feilet', err);
    return null;
  }
}

export default async function handler(req, res) {
  const expectedPin = process.env.DASHBOARD_PIN;
  if (!expectedPin) {
    res.status(500).json({ error: 'DASHBOARD_PIN er ikke satt' });
    return;
  }

  const pin = req.headers['x-dashboard-pin'];
  if (pin !== expectedPin) {
    res.status(401).json({ error: 'Feil PIN' });
    return;
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY er ikke satt' });
    return;
  }

  const supabase = createClient(SUPABASE_URL, serviceKey);

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data, error } = await supabase
    .from('analytics_events')
    .select('event, path, anon_id, created_at')
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: false })
    .limit(5000);

  if (error) {
    console.error('dashboard-data:', error);
    res.status(500).json({ error: 'Kunne ikke hente data' });
    return;
  }

  // Leads leses kun her, med service-role-nøkkelen — anon-nøkkelen i
  // klienten har bevisst ingen SELECT-policy på denne tabellen (se
  // demoRequest.js), så dette er det eneste stedet innsendte skjema kan
  // leses tilbake fra.
  const { data: leadsData, error: leadsError } = await supabase
    .from('demo_foresporsler')
    .select('id, navn, epost, firma, melding, status, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (leadsError) {
    console.error('dashboard-data: kunne ikke hente leads', leadsError);
  }

  // Skrevet av en ukentlig cloud-agent (se /reports i repoet for historikk
  // og den fulle rapporten som markdown). Samme lese-mønster som leads:
  // anon kan bare INSERT, så dette er eneste sted de kan leses tilbake fra.
  const { data: reportsData, error: reportsError } = await supabase
    .from('weekly_reports')
    .select('id, week_start, week_end, summary, report_markdown, stats, created_at')
    .order('week_start', { ascending: false })
    .limit(12);

  if (reportsError) {
    console.error('dashboard-data: kunne ikke hente ukentlige rapporter', reportsError);
  }

  const byDay = {};
  const byEvent = {};
  const anonIds = new Set();

  for (const row of data) {
    const day = row.created_at.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + 1;
    byEvent[row.event] = (byEvent[row.event] || 0) + 1;
    if (row.anon_id) anonIds.add(row.anon_id);
  }

  const engagementDays = Object.entries(byDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const topEvents = Object.entries(byEvent)
    .map(([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count);

  // Reelt besøkstall kommer fra PostHog, ikke Supabase (se
  // hentPosthogTrafikk over). Hvis PostHog-spørringen feiler (f.eks.
  // manglende nøkkel), faller vi tilbake til de gamle, undervurderte
  // engasjement-baserte tallene i stedet for å knekke dashbordet. Kjøres
  // parallelt med topsider/feil siden de er tre uavhengige HogQL-kall.
  const [trafikk, topSider, sisteFeil] = await Promise.all([
    hentPosthogTrafikk(),
    hentTopSider(),
    hentSisteFeil(),
  ]);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    totalPageviews: trafikk?.totalPageviews ?? null,
    uniqueVisitors: trafikk?.uniqueVisitors ?? anonIds.size,
    sources: trafikk?.sources ?? [],
    days: trafikk?.days ?? engagementDays,
    engagementEvents: data.length,
    conversions: byEvent.demo_request_submitted || 0,
    topEvents,
    leads: leadsData || [],
    reports: reportsData || [],
    topSider: topSider ?? [],
    sisteFeil: sisteFeil ?? [],
  });
}
