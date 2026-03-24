import React from 'react';
import { Check } from 'lucide-react';

const PRESETS = [
  { id: 'A', name: 'Command Stage', colors: ['#0B1120', '#D4A843', '#F8F6F1'], keywords: 'Navy · Gull · Autoritær' },
  { id: 'B', name: 'Challenger Signal', colors: ['#111111', '#E83A2F', '#F0EDE6'], keywords: 'Sort · Rød · Rå energi' },
  { id: 'C', name: 'Luminous', colors: ['#1A1A2E', '#FF6B35', '#FAFAF7'], keywords: 'Midnatt · Oransje · Varm' },
  { id: 'D', name: 'Nordic Edge', colors: ['#F4F4F2', '#00AEEF', '#FFFFFF'], keywords: 'Hvit · Cyan · Skandinavisk' },
];

export default function AestheticPicker({ value, onChange, error }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-3">
        {PRESETS.map((preset) => {
          const selected = value === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              className={`relative rounded-2xl p-4 text-left transition-all duration-200 border-2
                ${selected ? 'border-accent' : 'border-primary/10 hover:border-primary/30'}`}
              style={{ background: preset.colors[0] }}
            >
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-background" />
                </div>
              )}
              <div className="flex gap-1.5 mb-3">
                {preset.colors.map((c) => (
                  <div key={c} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c }} />
                ))}
              </div>
              <p className="font-sans text-xs font-bold mb-0.5" style={{ color: preset.colors[2] }}>
                {preset.id} — {preset.name}
              </p>
              <p className="font-mono text-[10px]" style={{ color: preset.colors[1] }}>{preset.keywords}</p>
            </button>
          );
        })}
      </div>
      {error && <p className="font-mono text-xs text-accent">{error}</p>}
    </div>
  );
}
