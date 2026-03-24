import React from 'react';
import { Plus } from 'lucide-react';

export default function AddMoreGroup({ label, children, onAdd, canAdd = true }) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      {canAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 self-start border border-primary/20 rounded-full px-5 py-2.5 font-sans text-sm text-primary/60 hover:text-primary hover:border-primary/40 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          {label}
        </button>
      )}
    </div>
  );
}
