import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value = 5, onChange }) {
  const [hovered, setHovered] = useState(null);
  const display = hovered ?? value;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="transition-transform hover:scale-110 duration-150"
        >
          <Star
            className={`w-5 h-5 transition-colors duration-150 ${star <= display ? 'text-accent fill-accent' : 'text-primary/20'}`}
          />
        </button>
      ))}
    </div>
  );
}
