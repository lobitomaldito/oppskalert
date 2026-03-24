import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ label, hint, required, error, tags = [], onChange, max, suggestions = [] }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    if (max && tags.length >= max) return;
    onChange([...tags, trimmed]);
    setInput('');
  };

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans text-sm text-primary/70">
          {label}{required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      {hint && <p className="font-mono text-xs text-primary/40">{hint}</p>}
      <div className={`bg-background border rounded-xl px-3 py-2 flex flex-wrap gap-2 min-h-[48px] transition-all duration-200
        ${error ? 'border-accent' : 'border-primary/20'}
        focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30`}>
        {tags.map((tag) => (
          <span key={tag} className="bg-surface font-mono text-xs rounded-full px-3 py-1 flex items-center gap-1.5 text-primary">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-primary/50 hover:text-primary transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={max && tags.length >= max}
          placeholder={max && tags.length >= max ? `Maks ${max}` : 'Skriv og trykk Enter'}
          className="bg-transparent font-sans text-sm text-primary placeholder:text-primary/30 outline-none flex-1 min-w-[120px] py-0.5"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {suggestions.filter((s) => !tags.includes(s)).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              disabled={max && tags.length >= max}
              className="font-mono text-xs text-primary/40 hover:text-accent border border-primary/10 hover:border-accent/30 rounded-full px-2.5 py-0.5 transition-colors disabled:opacity-30"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
      {error && <p className="font-mono text-xs text-accent">{error}</p>}
    </div>
  );
}
