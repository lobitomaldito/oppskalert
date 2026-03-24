import React from 'react';
import TagInput from '../ui/TagInput';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

export default function Step2Profile({ data, onChange, errors }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif italic text-4xl md:text-5xl text-primary mb-1">Hvem er du på scenen?</h1>
      </div>

      <TagInput
        label="Identitetsetiketter"
        required
        max={4}
        placeholder="Skriv én og trykk Enter"
        hint="F.eks. Journalist. Komiker. Overlevende."
        suggestions={['Gründer', 'Overlevende', 'Forfatter', 'Komiker', 'Lege', 'Psykolog']}
        tags={data.identityLabels || []}
        onChange={set('identityLabels')}
        error={errors?.identityLabels}
      />

      <TextArea
        label="Posisjoneringssetning"
        required
        placeholder="Hva gjør du, for hvem, hva skiller deg?"
        hint="Hva gjør du, for hvem, hva skiller deg?"
        value={data.positioning || ''}
        onChange={(e) => set('positioning')(e.target.value)}
        error={errors?.positioning}
      />

      <TextInput
        label="Signaturkonsept"
        placeholder="F.eks. Den Fryktløse Lederen"
        hint="Navngitt metode?"
        value={data.signatureConcept || ''}
        onChange={(e) => set('signatureConcept')(e.target.value)}
        error={errors?.signatureConcept}
      />

      <TagInput
        label="Målgruppe"
        required
        max={6}
        placeholder="Fargen på de du snakker til"
        suggestions={['HR-direktører', 'Toppledere', 'Salgsorganisasjoner']}
        tags={data.targetAudience || []}
        onChange={set('targetAudience')}
        error={errors?.targetAudience}
      />

      <TextArea
        label="Den røde tråden"
        placeholder="Hva binder foredragene sammen? Skriv «lag en» om usikker."
        hint="Hva binder foredragene sammen?"
        value={data.redThread || ''}
        onChange={(e) => set('redThread')(e.target.value)}
        error={errors?.redThread}
      />
    </div>
  );
}
