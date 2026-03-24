import React from 'react';
import AestheticPicker from '../ui/AestheticPicker';
import TextInput from '../ui/TextInput';
import TextArea from '../ui/TextArea';
import URLInput from '../ui/URLInput';
import SummaryChecklist from './SummaryChecklist';
import { ArrowRight } from 'lucide-react';

export default function Step5Finish({ data, onChange, onJumpToStep, errors, isSubmitting }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif italic text-4xl md:text-5xl text-primary mb-1">Nesten i mål</h1>
      </div>

      <SummaryChecklist data={data} onJumpToStep={onJumpToStep} />

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Estetikkvalg *</h2>
        <AestheticPicker 
          value={data.aestheticPreset} 
          onChange={(val) => set('aestheticPreset')(val)} 
          error={errors?.aestheticPreset}
        />
        <TextInput
          label="Din merkefarge"
          placeholder="#00AEEF — la stå tom for presetets farger"
          value={data.brandColor || ''}
          onChange={(e) => set('brandColor')(e.target.value)}
        />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Booking & CTA</h2>
        <TextInput
          label="Primær CTA-tekst *"
          required
          placeholder="Book [ditt fornavn]"
          value={data.ctaText || ''}
          onChange={(e) => set('ctaText')(e.target.value)}
          error={errors?.ctaText}
        />
        
        {/* Live Preview */}
        <div className="p-8 rounded-3xl bg-surface/5 border border-primary/10 flex flex-col items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/30">Live Preview</span>
          <button className="group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-bold transition-transform hover:scale-[1.03] duration-300">
            <span className="relative z-10 transition-colors duration-300 flex items-center gap-2">
              {data.ctaText || 'Book [navn]'} <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-surface translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>

        <URLInput
          label="Bookinglenke"
          placeholder="Calendly, e-post, eller talerlisten-profil"
          value={data.bookingUrl || ''}
          onChange={(e) => set('bookingUrl')(e.target.value)}
        />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">Ekstra</h2>
        <TextArea
          label="Ekstra notater"
          placeholder="Noe annet vi bør vite?"
          rows={4}
          value={data.extraNotes || ''}
          onChange={(e) => set('extraNotes')(e.target.value)}
        />
      </section>
    </div>
  );
}
