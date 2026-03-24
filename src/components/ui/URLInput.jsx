import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { isValidUrl } from '../../lib/validation';

export default function URLInput({ label, hint, required, error: externalError, onBlur, ...props }) {
  const [urlError, setUrlError] = useState('');

  const handleBlur = (e) => {
    const val = e.target.value;
    if (val && !isValidUrl(val)) {
      setUrlError('Ugyldig URL — inkluder https://');
    } else {
      setUrlError('');
    }
    onBlur?.(e);
  };

  const displayError = externalError || urlError;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans text-sm text-primary/70">
          {label}{required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      {hint && <p className="font-mono text-xs text-primary/40">{hint}</p>}
      <div className="relative">
        <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
        <input
          type="url"
          onBlur={handleBlur}
          className={`w-full bg-background border rounded-xl pl-10 pr-4 py-3 font-sans text-sm text-primary placeholder:text-primary/30 outline-none transition-all duration-200
            ${displayError ? 'border-accent' : 'border-primary/20'}
            focus:border-accent focus:ring-1 focus:ring-accent/30`}
          {...props}
        />
      </div>
      {displayError && <p className="font-mono text-xs text-accent">{displayError}</p>}
    </div>
  );
}
