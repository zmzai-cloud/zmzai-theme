import { cva } from "class-variance-authority";

/**
 * Card variant styles.
 *
 * Design:
 * - default: white bg, light border, no hover
 * - interactive: hover lifts up + shadow + border darkens
 */
export const cardVariants = cva(
  "bg-bg border rounded-xl transition-all",
  {
    variants: {
      variant: {
        default: "border-line",
        interactive:
          "border-line hover:border-line-strong hover:shadow-md cursor-pointer",
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
