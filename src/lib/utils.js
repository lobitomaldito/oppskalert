import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Norsk tusenskille (mellomrom, ikke komma), avrundet til nærmeste hele krone.
export function formatKr(belop) {
  return Math.round(belop).toLocaleString('nb-NO');
}
