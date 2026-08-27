import { cva } from "class-variance-authority";

/**
 * Input variant styles.
 *
 * Design:
 * - default: light border, hover 提示可交互，focus turns border to ink
 * - brutal: 2px ink border + hard offset shadow (neobrutalism)
 *
 * States discipline (v0.6.1 起，见 docs/states-discipline.md):
 * - disabled: 灰化 + not-allowed 光标
 * - aria-invalid: 边框转 danger（与 Radix/shadcn 惯例一致，业务层无需传额外 prop）
 */
export const inputVariants = cva(
  [
    "w-full bg-bg font-sans text-ink placeholder:text-ink-3 outline-none transition-all",
    "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink-3",
    "aria-invalid:border-danger aria-invalid:focus:border-danger",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "h-10 border border-line rounded-sm px-4 text-sm hover:border-ink/40 focus:border-ink focus-visible:ring-ink",
        brutal:
          "h-10 border-2 border-ink rounded-sm px-4 text-sm focus-visible:ring-line-strong",
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
