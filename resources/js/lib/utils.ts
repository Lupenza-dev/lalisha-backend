import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTZS(amount: number | string | null | undefined): string {
    const num = Number(amount ?? 0);
    return `TZS ${num.toLocaleString('en-TZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
