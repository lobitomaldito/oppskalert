import { omtaler } from '../lib/demo-innhold';
import { heroBevis } from '../lib/site';

/* Omtalene side om side, uten karusell.

   Fram til 17. oktober 2026 var dette en karusell med én omtale synlig av
   gangen. Den byttet selv hvert syvende sekund, men leseren så likevel
   bare den som tilfeldigvis sto framme, og på desktop sto halve kortet
   tomt. Nå står alle samtidig, korte nok til å leses i ett blikk.

   `utenom` er indeksen til omtalen som allerede står i heroen, så samme
   sitat ikke dukker opp to ganger på samme side. Mobil viser to omtaler
   og lenken (regel 20 i byggereglene), se .omtale:nth-child(n+3). */
const Sitatkort = ({ utenom }) => {
  const liste = omtaler.filter((_, n) => n !== utenom);

  return (
    <div className="omtaler" data-reveal>
      <div className="omtaler-topp">
        <p className="etikett">Fra kundene</p>
        {heroBevis?.url && (
          <a href={heroBevis.url} target="_blank" rel="noopener noreferrer" className="omtaler-lenke">
            Se omtalene på Google <span aria-hidden="true">↗</span>
            <span className="skjult"> (åpnes i ny fane)</span>
          </a>
        )}
      </div>
      <ul className="omtaler-rad">
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
