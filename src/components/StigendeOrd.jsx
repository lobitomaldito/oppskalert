import { Fragment } from 'react';

/* Overskriftsord som stiger opp bak en maske når siden lastes (Aleksander
   25.11.2026: siden føltes livløs ved siden av vivr.no). Ren CSS, se
   .ord-maske i index.css, så markupen er den samme i den prerendrede
   HTML-en og i nettleseren, og teksten står der uten JavaScript.

   `start` er plassen til det første ordet, så to biter i samme overskrift
   (vanlig tekst og <em>) fortsetter samme rytme. Ord med myk bindestrek
   (&shy;) masker vi ikke: en inline-block kan ikke deles over to linjer,
   og da ville «Nettside­design» sprenge bredden på mobil. */
const StigendeOrd = ({ tekst, start = 0 }) => {
  if (typeof tekst !== 'string') return tekst;
  const ord = tekst.split(' ');
  return ord.map((w, i) => (
    <Fragment key={i}>
      {w.includes('­') ? w : (
        <span className="ord-maske"><span style={{ '--i': start + i }}>{w}</span></span>
      )}
      {i < ord.length - 1 && ' '}
    </Fragment>
  ));
};

export default StigendeOrd;
