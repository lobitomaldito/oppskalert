import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

/* Regel 2 i nettside-reglene (26.11.2026): mobilhøyden skal være lavere
   enn desktophøyden. Alle åtte undersidene var høyere på 390 px enn på
   1440 px, fordi desktopinnholdet bare ble stablet i én kolonne.

   Innholdet her ligger alltid i DOM-en og vises som før fra md. Under md
   skjules det bak en knapp til den blir trykket. Google leser skjult
   innhold på mobil fullt ut, og prerenderingen får med alt.

   `forhand` er en kort versjon som står i stedet for innholdet på mobil
   mens det er lukket (stegene på /metode: kort tekst, så hele). */
const MerPaaMobil = ({ children, etikett = 'Les mer', className = '', forhand = null }) => {
  const [apen, setApen] = useState(false);
  const id = useId();
  return (
    <>
      {forhand && !apen && <div className="md:hidden">{forhand}</div>}
      <div id={id} className={cn(className, !apen && 'max-md:hidden')}>
        {children}
      </div>
      <button
        type="button"
        className="mer-knapp md:hidden"
        aria-expanded={apen}
        aria-controls={id}
        onClick={() => setApen(!apen)}
      >
        {apen ? 'Vis mindre' : etikett}
        <Plus aria-hidden="true" className={apen ? 'rotate-45' : ''} />
      </button>
    </>
  );
};

export default MerPaaMobil;
