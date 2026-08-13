import { cva } from "class-variance-authority";

/**
 * Button variant styles.
 *
 * Design:
 * - All variants use pill radius (rounded-full)
 * - primary: black fill, white text, hover scale + shadow
 * - secondary: transparent, border, hover fill
 * - ghost: no border, subtle hover bg
 */
export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-colors transition-transform disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white hover:shadow-md active:scale-[0.98]",
        secondary:
          "border border-line text-ink hover:border-ink hover:bg-surface-2",
        ghost:
          "text-ink-2 hover:bg-surface-2 hover:text-ink",
        danger:
          "bg-danger text-white hover:shadow-md active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";
