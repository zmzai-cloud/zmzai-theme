import { cva } from "class-variance-authority";

/**
 * Card variant styles.
 *
 * Design:
 * - default: white bg, light border, no hover
 * - interactive: hover lifts up + shadow + border darkens
 */
export const cardVariants = cva(
  "bg-bg border rounded-xl transition-colors transition-transform duration-200",
  {
    variants: {
      variant: {
        default: "border-line",
        interactive:
          "border-line hover:border-ink hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer",
        surface: "bg-surface border-line",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export type CardVariant = "default" | "interactive" | "surface";
export type CardPadding = "none" | "sm" | "md" | "lg";
