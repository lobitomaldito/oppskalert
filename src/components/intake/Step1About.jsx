import React from 'react';
import TextInput from '../ui/TextInput';
import URLInput from '../ui/URLInput';

export default function Step1About({ data, onChange, errors }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif italic text-4xl md:text-5xl text-primary mb-1">La oss bli kjent</h1>
      </div>
      <TextInput
        label="Fullt navn"
        required
        placeholder="Ola Nordmann"
        value={data.fullName || ''}
        onChange={set('fullName')}
        error={errors?.fullName}
      />
      <TextInput
        label="E-post"
        required
        type="email"
        placeholder="ola@example.no"
        value={data.email || ''}
        onChange={set('email')}
        error={errors?.email}
      />
      <TextInput
        label="Telefon"
        placeholder="+47 900 00 000"
        value={data.phone || ''}
        onChange={set('phone')}
        error={errors?.phone}
      />
      <URLInput
        label="Talerlisten.no URL"
        required
        placeholder="https://talerlisten.no/foredragsholder/..."
        hint="Vi henter info herfra automatisk"
        value={data.talerlistenUrl || ''}
        onChange={set('talerlistenUrl')}
        error={errors?.talerlistenUrl}
      />
      <URLInput
        label="Eksisterende nettside"
        placeholder="https://dinside.no"
        hint="Har du en? Vi bruker den som kilde."
        value={data.existingWebsite || ''}
        onChange={set('existingWebsite')}
        error={errors?.existingWebsite}
      />
      <URLInput
        label="LinkedIn"
        placeholder="https://linkedin.com/in/..."
        value={data.linkedinUrl || ''}
        onChange={set('linkedinUrl')}
        error={errors?.linkedinUrl}
      />
    </div>
  );
}
