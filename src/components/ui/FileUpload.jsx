import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

export default function FileUpload({ label, hint, required, error, files = [], onFiles, maxFiles = 5, maxMB = 10 }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const incoming = Array.from(e.target.files);
    const valid = incoming.filter((f) => f.size <= maxMB * 1024 * 1024);
    const combined = [...files, ...valid].slice(0, maxFiles);
    onFiles(combined);
    e.target.value = '';
  };

  const remove = (index) => onFiles(files.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-sans text-sm text-primary/70">
          {label}{required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      {hint && <p className="font-mono text-xs text-primary/40">{hint}</p>}
      <div
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors duration-200
          ${error ? 'border-accent/50' : 'border-primary/20'}
          hover:border-accent/40`}
      >
        <Upload className="w-8 h-8 text-primary/30" />
        <p className="font-sans text-sm text-primary/50 text-center">
          Slipp filer her eller <span className="text-accent">klikk for å velge</span>
        </p>
        <p className="font-mono text-xs text-primary/30">JPG · PNG · WebP · maks {maxMB}MB · inntil {maxFiles} filer</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-1">
          {files.map((file, i) => (
            <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-primary/20">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <X className="w-5 h-5 text-accent" />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="font-mono text-xs text-accent">{error}</p>}
    </div>
  );
}
