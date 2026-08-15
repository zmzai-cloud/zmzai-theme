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
          "border border-line rounded-sm px-4 py-2.5 text-sm focus:border-ink",
        brutal:
          "border-2 border-ink rounded-sm px-4 py-3 text-sm",
      },
      size: {
        sm: "text-xs py-2 px-3",
        md: "text-sm py-2.5 px-4",
        lg: "text-base py-3 px-5",
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
