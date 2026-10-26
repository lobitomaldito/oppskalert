import { omtaler } from '../lib/demo-innhold';
import { heroBevis } from '../lib/site';
import { PilOpp } from './Ikon';

/* Omtalene side om side, uten karusell.

   Fram til 17. oktober 2026 var dette en karusell med én omtale synlig av
   gangen. Den byttet selv hvert syvende sekund, men leseren så likevel
   bare den som tilfeldigvis sto framme, og på desktop sto halve kortet
   tomt. Nå står alle samtidig, korte nok til å leses i ett blikk.

   `utenom` er indeksen til omtalen som allerede står i heroen, så samme
   sitat ikke dukker opp to ganger på samme side. Mobil viser to omtaler
   og lenken (regel 20 i byggereglene), se .omtale:nth-child(n+3). */
const Sitatkort = ({ utenom }) => {
  // Tre i bredden på desktop. En fjerde ville stått alene på en ny rad.
  const liste = omtaler.filter((_, n) => n !== utenom).slice(0, 3);

  return (
    <div className="omtaler" data-reveal>
      <div className="omtaler-topp">
        <p className="etikett">Fra kundene</p>
        {heroBevis?.url && (
          <a href={heroBevis.url} target="_blank" rel="noopener noreferrer" className="omtaler-lenke">
            Se omtalene på Google <PilOpp />
            <span className="skjult"> (åpnes i ny fane)</span>
          </a>
        )}
      </div>
      {/* tabIndex: på mobil er lista en sveipbar rad uten lenker i, så
          tastaturbrukere trenger fokus på selve raden for å kunne rulle. */}
      <ul className="omtaler-rad" tabIndex={0} aria-label="Omtaler fra kunder">
        {liste.map((o) => (
          <li className="omtale" key={o.navn}>
            <blockquote>«{o.sitat}»</blockquote>
            <div className="sitat-kilde">
              <span className="initial" aria-hidden="true">
                {o.navn.split(' ').map((d) => d[0]).slice(0, 2).join('')}
              </span>
              <div>
                <p className="navn">{o.navn}</p>
                <p className="rolle">{o.rolle}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitatkort;
