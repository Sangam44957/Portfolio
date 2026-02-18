/** Check if running in browser */
export const isBrowser = typeof window !== "undefined";

/** Check if device is mobile based on viewport width */
export function isMobile(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
