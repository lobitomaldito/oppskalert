import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'Om deg' },
  { n: 2, label: 'Din profil' },
  { n: 3, label: 'Foredrag' },
  { n: 4, label: 'Medier' },
  { n: 5, label: 'Innspurt' },
];

export default function StepSidebar({ current, onStepClick }) {
  return (
    <aside className="hidden md:flex flex-col gap-0 w-[280px] shrink-0 sticky top-8 self-start">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8">Oppskalert</span>
      {STEPS.map((step, i) => {
        const done = step.n < current;
        const active = step.n === current;
        return (
          <div key={step.n} className="flex flex-col">
            <button
              type="button"
              onClick={() => done && onStepClick(step.n)}
              className={`flex items-center gap-3 py-3 text-left transition-colors duration-200 ${done ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
                ${done ? 'bg-accent' : active ? 'border-2 border-accent' : 'border border-primary/20'}`}>
                {done
                  ? <Check className="w-4 h-4 text-background" />
                  : <span className={`font-mono text-xs font-bold ${active ? 'text-accent' : 'text-primary/30'}`}>{step.n}</span>
                }
              </div>
              <span className={`font-sans text-sm transition-colors duration-200
                ${done ? 'text-primary/50' : active ? 'font-bold text-accent' : 'text-primary/30'}`}>
                {step.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="ml-4 h-4 border-l border-primary/10" />
            )}
          </div>
        );
      })}
    </aside>
  );
}
