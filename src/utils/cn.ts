import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conditional logic.
 * Uses clsx for conditionals + tailwind-merge for dedup.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-ink text-white", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
