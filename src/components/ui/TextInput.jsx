import React from 'react';

export default function TextInput({ label, hint, required, error, type = 'text', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans text-sm text-primary/70">
          {label}{required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      {hint && <p className="font-mono text-xs text-primary/40">{hint}</p>}
      <input
        type={type}
        className={`bg-background border rounded-xl px-4 py-3 font-sans text-sm text-primary placeholder:text-primary/30 outline-none transition-all duration-200
          ${error ? 'border-accent' : 'border-primary/20'}
          focus:border-accent focus:ring-1 focus:ring-accent/30`}
        {...props}
      />
      {error && <p className="font-mono text-xs text-accent">{error}</p>}
    </div>
  );
}
