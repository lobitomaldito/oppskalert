import React from 'react';
import URLInput from '../ui/URLInput';
import FileUpload from '../ui/FileUpload';
import TagInput from '../ui/TagInput';
import TextInput from '../ui/TextInput';
import TextArea from '../ui/TextArea';
import StarRating from '../ui/StarRating';
import AddMoreGroup from '../ui/AddMoreGroup';

export default function Step4Media({ data, onChange, errors }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });

  const extraVideos = data.extraVideoUrls || [];
  const testimonials = data.testimonials || [];

  const updateExtraVideo = (index, value) => {
    const newVideos = [...extraVideos];
    newVideos[index] = value;
    set('extraVideoUrls')(newVideos);
  };

  const addExtraVideo = () => {
    if (extraVideos.length < 2) {
      set('extraVideoUrls')([...extraVideos, '']);
    }
  };

  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    set('testimonials')(newTestimonials);
  };

  const addTestimonial = () => {
    if (testimonials.length < 3) {
      set('testimonials')([...testimonials, { quote: '', name: '', role: '', stars: 5 }]);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif italic text-4xl md:text-5xl text-primary mb-1">La oss vise hvem du er</h1>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Video</h2>
        <URLInput
          label="Hero-video URL"
          required
          placeholder="https://youtube.com/..."
          hint="YouTube/Vimeo. Søk: [Navn] foredrag. Dette er det viktigste feltet."
          value={data.heroVideoUrl || ''}
          onChange={(e) => set('heroVideoUrl')(e.target.value)}
          error={errors?.heroVideoUrl}
        />
        
        {extraVideos.map((url, i) => (
          <URLInput
            key={i}
            label={`Ekstra video #${i + 1}`}
            value={url}
            onChange={(e) => updateExtraVideo(i, e.target.value)}
          />
        ))}

        {extraVideos.length < 2 && (
          <AddMoreGroup label="Legg til video" onClick={addExtraVideo} />
        )}

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Rating"
            placeholder="4.9"
            value={data.ratingValue || ''}
            onChange={(e) => set('ratingValue')(e.target.value)}
            hint="Verdi"
          />
          <TextInput
            label="Av totalt"
            placeholder="5"
            value={data.ratingTotal || ''}
            onChange={(e) => set('ratingTotal')(e.target.value)}
            hint="Total f.eks 5"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Bilder</h2>
        <FileUpload
          label="Last opp bilder"
          required
          max={5}
          files={data.imageFiles || []}
          onFiles={(files) => set('imageFiles')(files)}
          error={errors?.imageFiles}
        />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Statistikk</h2>
        <div className="grid grid-cols-3 gap-4">
          <TextInput label="Foredrag" placeholder="200+" value={data.statEvents || ''} onChange={(e) => set('statEvents')(e.target.value)} />
          <TextInput label="Publikummer" placeholder="50k+" value={data.statAudience || ''} onChange={(e) => set('statAudience')(e.target.value)} />
          <TextInput label="Score" placeholder="9.4" value={data.statSatisfaction || ''} onChange={(e) => set('statSatisfaction')(e.target.value)} />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Referanser & Omtale</h2>
        <TagInput
          label="Medieomtale"
          suggestions={['NRK', 'Aftenposten', 'DN', 'VG', 'E24', 'Kapital']}
          tags={data.mediaMentions || []}
          onChange={set('mediaMentions')}
        />
        <TextInput
          label="Bok(er)"
          placeholder="Tittel på dine utgivelser"
          value={data.books || ''}
          onChange={(e) => set('books')(e.target.value)}
        />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Anbefalinger</h2>
        {testimonials.map((test, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-surface/5 border border-primary/10">
            <TextArea label="Sitat" required value={test.quote} onChange={(e) => updateTestimonial(i, 'quote', e.target.value)} />
            <TextInput label="Navn" required value={test.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} />
            <TextInput label="Tittel + selskap" required value={test.role} onChange={(e) => updateTestimonial(i, 'role', e.target.value)} />
            <StarRating label="Stjerner" value={test.stars} onChange={(val) => updateTestimonial(i, 'stars', val)} />
          </div>
        ))}
        {testimonials.length < 3 && (
          <AddMoreGroup label="Legg til en anbefaling" onClick={addTestimonial} />
        )}
      </section>
    </div>
  );
}
