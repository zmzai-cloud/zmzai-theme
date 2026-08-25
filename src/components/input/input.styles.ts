import { cva } from "class-variance-authority";

/**
 * Input variant styles.
 *
 * Design:
 * - default: light border, focus turns border to ink
 * - brutal: 2px ink border + hard offset shadow (neobrutalism), focus shifts
 */
export const inputVariants = cva(
  "w-full bg-bg font-sans text-ink placeholder:text-ink-3 outline-none transition-all",
  {
    variants: {
      variant: {
        default:
          "h-10 border border-line rounded-sm px-4 text-sm focus:border-ink",
        brutal:
          "h-10 border-2 border-ink rounded-sm px-4 text-sm",
      },
      size: {
        sm: "h-8 text-xs px-3",
        md: "h-10 text-sm px-4",
        lg: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type InputVariant = "default" | "brutal";
export type InputSize = "sm" | "md" | "lg";
