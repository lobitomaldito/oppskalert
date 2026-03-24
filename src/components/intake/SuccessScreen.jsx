import React from 'react';
import { Check } from 'lucide-react';

export default function SuccessScreen({ name, email }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-background text-primary">
      <div className="w-24 h-24 rounded-full bg-surface border border-accent/30 flex items-center justify-center mb-8">
        <Check className="w-12 h-12 text-accent" />
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Mottatt</span>
      <h1 className="font-serif italic text-5xl md:text-7xl mb-6">Vi er i gang.</h1>
      <p className="font-mono text-primary/50 text-sm max-w-md leading-relaxed mb-12">
        {name}, du hører fra oss på {email} innen 2 virkedager.
      </p>
      <div className="bg-surface rounded-3xl p-8 max-w-md w-full text-left border border-primary/10 mb-12">
        {["Vi gjennomgår informasjonen din", "Vi bygger et førsteutkast", "Du får en forhåndsvisningslenke"].map((s, i) => (
          <div key={i} className="flex items-center gap-4 py-4 border-b border-primary/10 last:border-0 text-white">
            <span className="font-mono text-accent text-sm font-bold">0{i+1}</span>
            <span className="font-sans text-sm text-primary/70">{s}</span>
          </div>
        ))}
      </div>
      <a href="/" className="font-mono text-xs text-primary/30 hover:text-primary/60 transition-colors uppercase tracking-widest">
        ← Tilbake til oppskalert.no
      </a>
    </div>
  );
}
