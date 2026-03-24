import React, { useRef, useEffect } from 'react';

export default function TextArea({ label, hint, required, error, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resize = () => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    };
    el.addEventListener('input', resize);
    resize();
    return () => el.removeEventListener('input', resize);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans text-sm text-primary/70">
          {label}{required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      {hint && <p className="font-mono text-xs text-primary/40">{hint}</p>}
      <textarea
        ref={ref}
        className={`bg-background border rounded-xl px-4 py-3 font-sans text-sm text-primary placeholder:text-primary/30 outline-none transition-all duration-200 resize-none min-h-[96px]
          ${error ? 'border-accent' : 'border-primary/20'}
          focus:border-accent focus:ring-1 focus:ring-accent/30`}
        {...props}
      />
      {error && <p className="font-mono text-xs text-accent">{error}</p>}
    </div>
  );
}
