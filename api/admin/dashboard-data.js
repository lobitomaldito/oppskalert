import { createClient } from '@supabase/supabase-js';

// Samme Supabase-prosjekt som analytics_events skrives til fra klienten,
// men her brukes service-role-nøkkelen (kun server-side) for å kunne lese
// tilbake det anon-nøkkelen bevisst ikke får lov til å se.
const SUPABASE_URL = 'https://zmefwkqhdamdcjnxxfjl.supabase.co';

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

  const byDay = {};
  const byEvent = {};
  const anonIds = new Set();

  for (const row of data) {
    const day = row.created_at.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + 1;
    byEvent[row.event] = (byEvent[row.event] || 0) + 1;
    if (row.anon_id) anonIds.add(row.anon_id);
  }

  const days = Object.entries(byDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const topEvents = Object.entries(byEvent)
    .map(([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    totalEvents: data.length,
    uniqueVisitors: anonIds.size,
    conversions: byEvent.demo_request_submitted || 0,
    days,
    topEvents,
  });
}
