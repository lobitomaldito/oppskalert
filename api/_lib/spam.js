// Delt spam-vurdering. Brukes to steder:
//
//   1. api/demo-request.js, som stempler nye innsendinger ved skriving.
//   2. api/admin/dashboard-data.js, som må klassifisere radene som allerede
//      lå i tabellen da anon-INSERT var åpen og botene skrev rett på
//      PostgREST. De har status 'ny' og kan ikke rettes med mindre vi
//      kjenner dem igjen på innholdet.
//
// Vurderingen skjuler aldri noe permanent: en treff gir status 'spam', og
// dashbordet viser fortsatt raden bak en «vis skjulte»-knapp. Terskelen er
// derfor satt for å ta det åpenbare, ikke for å være altomfattende.

// Bot-navnene ser ut som «VnwsNQNgFLqGpRnjyyrK»: lange, uten mellomrom, med
// store bokstaver inni og nesten ingen vokaler. Kravet om en stor bokstav
// inne i ordet er det som holder ekte norske ettordsfirma unna, siden
// «Byggmesterkompaniet» aldri har det. Strenger med punktum, bindestrek
// eller siffer hoppes over, fordi det som regel er nettadresser og orgnr.
const erTilfeldigStreng = (verdi) => {
  const s = (verdi || '').trim();
  if (s.length < 12) return false;
  if (/[\s.\-_0-9@/]/.test(s)) return false;
  if (!/[a-zæøå]/.test(s)) return false;
  if (!/[A-ZÆØÅ]/.test(s.slice(1))) return false;

  const vokaler = (s.match(/[aeiouyæøåAEIOUYÆØÅ]/g) || []).length;
  const vokalandel = vokaler / s.length;
  const langKonsonantrekke = /[^aeiouyæøåAEIOUYÆØÅ]{4,}/.test(s);

  return vokalandel < 0.35 || langKonsonantrekke;
};

// Gmail ignorerer punktum i lokaldelen, så «d.j.o.s.k.an.e.i@gmail.com» og
// «djoskanei@gmail.com» er samme innboks. Botene bruker det til å lage
// tilsynelatende unike avsendere fra én konto. Ekte folk skriver sjelden
// adressen sin med fire eller flere punktum.
const erPunktumtriks = (epost) => {
  const [lokal, domene] = (epost || '').toLowerCase().split('@');
  if (!lokal || !domene) return false;
  if (!/^(gmail|googlemail)\./.test(`${domene}.`)) return false;
  return (lokal.match(/\./g) || []).length >= 4;
};

/**
 * Vurderer bare innholdet. Gjelder både nye innsendinger og rader som
 * allerede ligger i tabellen, siden de gamle verken har honeypot eller
 * tidsstempel å gå på.
 */
export function spamGrunnForLagretRad({ navn, epost, firma, melding }) {
  const navnTilfeldig = erTilfeldigStreng(navn);
  const firmaTilfeldig = erTilfeldigStreng(firma);

  if (navnTilfeldig && erTilfeldigStreng(firma)) return 'navn og firma er tilfeldige tegn';
  if (navnTilfeldig && erPunktumtriks(epost)) return 'tilfeldig navn og gmail-punktumtriks';
  if (navnTilfeldig && !melding) return 'tilfeldig navn uten melding';
  if (firmaTilfeldig && erPunktumtriks(epost)) return 'tilfeldig firma og gmail-punktumtriks';

  return null;
}

/**
 * Returnerer en grunn (streng) hvis innsendingen ser ut som spam, ellers null.
 * Grunnen lagres og vises i dashbordet, så du kan se hvorfor noe ble skjult
 * og justere terskelen hvis den tar feil.
 */
export function spamGrunn({ navn, epost, firma, melding, honeypot, msPaSkjema }) {
  if (honeypot) return 'honeypot utfylt';

  // Skjemaet sender hvor lenge det stod åpent. Under to sekunder er ingen
  // som har lest spørsmålene, og et POST uten feltet i det hele tatt har
  // aldri hatt siden oppe.
  if (msPaSkjema === undefined || msPaSkjema === null) return 'sendt utenom skjemaet';
  if (msPaSkjema < 2000) return 'utfylt på under to sekunder';

  return spamGrunnForLagretRad({ navn, epost, firma, melding });
}
