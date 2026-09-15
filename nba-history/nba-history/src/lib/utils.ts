import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Data unavailable';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Data unavailable';
  }
}

export function formatHeight(cm: number | null): string {
  if (cm == null) return 'Data unavailable';
  const inches = Math.round(cm / 2.54);
  const feet = Math.floor(inches / 12);
  const rem = inches % 12;
  return `${feet}'${rem}" (${cm} cm)`;
}

export function formatWeight(kg: number | null): string {
  if (kg == null) return 'Data unavailable';
  const lbs = Math.round(kg * 2.20462);
  return `${kg} kg (${lbs} lbs)`;
}
