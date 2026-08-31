import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateParcelId(from: string = 'DEL', to: string = 'PAT'): string {
  const fromCode = from.substring(0, 3).toUpperCase();
  const toCode = to.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `BL24-${fromCode}-${toCode}-${randomNum}`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}
