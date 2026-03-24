import React from 'react';

const STEPS = ['Om deg', 'Din profil', 'Foredrag', 'Medier', 'Innspurt'];

export default function StepProgressBar({ current }) {
  return (
    <div className="md:hidden flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-2 justify-center">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <div key={n} className={`w-2.5 h-2.5 rounded-full transition-all duration-300
              ${done ? 'bg-accent' : active ? 'bg-accent w-4' : 'bg-primary/20'}`} />
          );
        })}
      </div>
      <p className="font-mono text-xs text-center text-accent uppercase tracking-[0.2em]">
        Steg {current} — {STEPS[current - 1]}
      </p>
    </div>
  );
}
