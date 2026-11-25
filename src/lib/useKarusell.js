import { useEffect, useState } from 'react';

/* Delt karusell-tilstand for sitatene: forsidens sitatkort og hero-beviset
   viser de samme omtalene og skal oppføre seg likt.
 *
 * Tre regler ligger her og ikke i komponentene, fordi de er lette å glemme:
 *
 * 1. Står stille ved `prefers-reduced-motion`. En bevegelse brukeren ikke
 *    har bedt om er nøyaktig det den innstillingen finnes for å skru av.
 * 2. Pauser på hover og fokus. Et sitat på 140 tegn rekker ikke å bli lest
 *    på syv sekunder hvis du akkurat har begynt.
 * 3. Går i ring begge veier, så pilene aldri står i en blindvei.
 */
export function useKarusell(antall, ms = 7000, start = 0, av = false) {
  const [i, setI] = useState(start);
  const [pause, settPause] = useState(false);

  useEffect(() => {
    if (antall < 2 || pause || av) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Én timeout per sitat: lange sitater får stå lenger (ms kan være en
    // funksjon av indeksen), og et klikk på pilene starter klokka på nytt.
    const id = setTimeout(() => setI((n) => (n + 1) % antall), typeof ms === 'function' ? ms(i) : ms);
    return () => clearTimeout(id);
  }, [antall, ms, pause, av, i]);

  const gaa = (retning) => setI((n) => (n + retning + antall) % antall);

  /* Legges rett på elementet som skal pause: onMouseEnter/Leave for mus,
     og Capture-variantene for fokus, slik at et tastaturtrykk inne i kortet
     også stopper klokka. */
  const pauseProps = {
    onMouseEnter: () => settPause(true),
    onMouseLeave: () => settPause(false),
    onFocusCapture: () => settPause(true),
    onBlurCapture: () => settPause(false),
  };

  return { i, gaa, pauseProps };
}
