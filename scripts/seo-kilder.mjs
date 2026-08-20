/* Ekstra datakilder til SEO-maskinen: Microsoft Clarity og Google Analytics 4.
 *
 * Begge er valgfrie. Mangler nøkkelen, returnerer modulen { av: true } og
 * maskinen kjører videre uten. Det er med vilje: rutinen skal aldri stoppe
 * fordi en sekundær kilde er nede eller uinnstilt.
 *
 * ARBEIDSDELINGEN mellom de tre kildene, som er hele poenget med å ha dem:
 *   Search Console  hvem som KOM, og på hvilket søk
 *   GA4             hva de gjorde etterpå, per landingsside
 *   Clarity         hvor det RØYK: raseriklikk, døde klikk, hard tilbake
 *
 * Et søk på posisjon 12 med 80 visninger er verdt arbeid. Det samme søket
 * med 80 visninger og raseriklikk på landingssiden er en annen jobb: da er
 * ikke problemet rangeringen, da er problemet siden de lander på.
 */

/* ---------- Microsoft Clarity ---------- */

/* HARDE GRENSER, sjekket 19. august 2026:
 *   - 10 kall per prosjekt per DØGN. Ikke per time.
 *   - numOfDays godtar kun 1, 2 eller 3. Maks 72 timer bakover, punktum.
 *   - maks 1 000 rader per svar, ingen paginering.
 *
 * Konsekvensen for en rutine som kjører mandag og torsdag: et mandagskall
 * med 72 timers vindu dekker fredag til søndag, og torsdagskallet dekker
 * mandag til onsdag. Det finnes ingen måte å hente en hel uke på.
 *
 * Derfor akkumulerer vi selv i seo/historikk.json. Clarity glemmer, vi
 * husker. Etter noen uker har du en trend APIet aldri kunne gitt deg.
 */
export async function hentClarity(token, dager = 3) {
  if (!token) return { av: true, grunn: 'ingen CLARITY_TOKEN satt' };

  const url = new URL('https://www.clarity.ms/export-data/api/v1/project-live-insights');
  url.searchParams.set('numOfDays', String(Math.min(3, Math.max(1, dager))));

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

  if (res.status === 429) return { av: true, grunn: 'kvoten på 10 kall per døgn er brukt opp' };
  if (!res.ok) return { av: true, grunn: `Clarity svarte ${res.status}` };

  let data;
  try {
    data = await res.json();
  } catch {
    /* Kjent oppførsel: Clarity svarer 200 med tom kropp på prosjekter uten
       trafikk i vinduet. Se microsoft/clarity issue #1085. */
    return { av: true, grunn: 'tomt svar, sannsynligvis ingen trafikk siste 72 timer' };
  }

  const finn = (navn) => data.find?.((d) => d.metricName === navn)?.information || [];
  const tall = (rad, felt) => Number(rad?.[felt] ?? 0);

  const trafikk = finn('Traffic')[0] || {};
  const sider = finn('PopularPages').map((r) => ({
    url: r.url,
    besok: tall(r, 'visitsCount'),
  }));

  /* Frustrasjonssignalene. Dette er det Search Console aldri kan fortelle
     deg, og den eneste grunnen til å hente Clarity i det hele tatt. */
  const friksjon = {
    raseriklikk: tall(finn('RageClickCount')[0], 'subTotal'),
    dodeKlikk: tall(finn('DeadClickCount')[0], 'subTotal'),
    hardTilbake: tall(finn('QuickbackClick')[0], 'subTotal'),
    overdrevenRulling: tall(finn('ExcessiveScroll')[0], 'subTotal'),
    skriptfeil: tall(finn('ScriptErrorCount')[0], 'subTotal'),
  };

  return {
    av: false,
    vindu: `siste ${Math.min(3, dager) * 24} timer`,
    okter: tall(trafikk, 'totalSessionCount'),
    brukere: tall(trafikk, 'distantUserCount'),
    botandel: tall(trafikk, 'botSessionCount'),
    sider: sider.slice(0, 10),
    friksjon,
  };
}

/* ---------- Google Analytics 4 ---------- */

/* Krever scopet analytics.readonly. Det ble lagt til i scripts/gsc.mjs
 * 19. august 2026, men et eksisterende refresh-token bærer bare de scopene
 * det ble laget med. Uten `npm run gsc auth` på nytt svarer dette 403
 * ACCESS_TOKEN_SCOPE_INSUFFICIENT selv med et ferskt access-token.
 */
export async function hentGA4(propertyId, accessToken, dager = 28) {
  if (!propertyId) return { av: true, grunn: 'ingen ga4Property i sider.json' };

  const iso = (d) => d.toISOString().slice(0, 10);
  const kropp = {
    dateRanges: [{ startDate: iso(new Date(Date.now() - dager * 864e5)), endDate: 'today' }],
    dimensions: [{ name: 'landingPagePlusQueryString' }],
    metrics: [
      { name: 'sessions' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
      { name: 'keyEvents' },
    ],
    /* Kun organisk søk. Uten dette drukner SEO-tallene i direkte trafikk
       og i e-postskannere fra kald e-post, som allerede har forurenset
       analytikkhistorikken her før. */
    dimensionFilter: {
      filter: {
        fieldName: 'sessionDefaultChannelGroup',
        stringFilter: { matchType: 'EXACT', value: 'Organic Search' },
      },
    },
    limit: 50,
  };

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(kropp),
    }
  );

  if (res.status === 403) {
    return { av: true, grunn: 'mangler analytics.readonly. Kjør: npm run gsc auth' };
  }
  if (!res.ok) return { av: true, grunn: `GA4 svarte ${res.status}` };

  const d = await res.json();
  const rader = (d.rows || []).map((r) => ({
    side: r.dimensionValues[0].value,
    okter: Number(r.metricValues[0].value),
    engasjement: +(Number(r.metricValues[1].value) * 100).toFixed(1),
    snittSekunder: Math.round(Number(r.metricValues[2].value)),
    maal: Number(r.metricValues[3].value),
  }));

  return {
    av: false,
    okter: rader.reduce((s, r) => s + r.okter, 0),
    /* Sider som får organisk trafikk men holder under 40 % engasjement er
       der SEO-en virker og siden ikke gjør det. Google sender folk, siden
       mister dem. Det er en tekstjobb, ikke en rangeringsjobb. */
    svakeLandingssider: rader
      .filter((r) => r.okter >= 5 && r.engasjement < 40)
      .sort((a, b) => b.okter - a.okter)
      .slice(0, 5),
    sider: rader.slice(0, 20),
  };
}
