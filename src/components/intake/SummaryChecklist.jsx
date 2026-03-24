import React from 'react';
import { Check, X } from 'lucide-react';

export default function SummaryChecklist({ data, onJumpToStep }) {
  const checks = [
    { label: 'Grunnleggende info', done: !!(data.fullName && data.email && data.talerlistenUrl), step: 1 },
    { label: 'Profilbeskrivelse', done: !!(data.identityLabels?.length && data.positioning), step: 2 },
    { label: `${data.topics?.length || 0} foredragstemaer`, done: !!(data.topics?.length > 0 && data.topics[0]?.title), step: 3 },
    { label: 'Hero-video lagt til', done: !!data.heroVideoUrl, step: 4 },
    { label: 'Minst ett bilde mangler', done: !!(data.imageUrls?.length > 0), step: 4, type: 'image' },
  ];

  return (
    <div className="bg-surface/50 rounded-2xl p-6 border border-primary/10 flex flex-col gap-3">
      {checks.map((check, i) => {
        const isImageCheck = check.type === 'image';
        const displayDone = isImageCheck ? check.done : check.done;
        const Icon = displayDone ? Check : X;
        const color = displayDone ? 'text-highlight' : 'text-accent';

        if (isImageCheck && displayDone) return null;

        return (
          <div 
            key={i} 
            onClick={() => !displayDone && onJumpToStep(check.step)}
            className={`flex items-center gap-3 text-sm font-mono ${!displayDone ? 'cursor-pointer hover:opacity-80' : ''}`}
          >
            <Icon className={`w-4 h-4 ${color}`} />
            <span className={displayDone ? 'text-primary' : 'text-accent underline decoration-accent/30'}>
              {isImageCheck && !displayDone ? 'Minst ett bilde mangler' : check.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
