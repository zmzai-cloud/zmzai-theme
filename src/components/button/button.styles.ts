import { cva } from "class-variance-authority";

/**
 * Button variant styles.
 *
 * Design:
 * - 锐角 2px（v0.2 暖纸风沿用的锐利语言），hover 阴影 / active 微缩
 * - primary: black fill, white text, hover scale + shadow
 * - secondary: transparent, border, hover fill
 * - ghost: no border, subtle hover bg
 * - danger: red fill
 *
 * States discipline (v0.6.1 起，见 docs/states-discipline.md):
 * - focus-visible: 2px ink ring + offset，立即可见不做动画（键盘可达性硬性要求）
 * - active: 所有可按压 variant 统一 scale 反馈（此前仅 primary/danger 有）
 * - disabled: opacity-40 + pointer-events-none
 * - loading/error/success 语义态由 StatefulButton 承担（error 呈现待补）
 */
export const buttonVariants = cva(
  [
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-semibold transition-colors transition-transform select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          // 反色按钮：交互结构挂 accent（v0.8.4 收敛，与 ink 值同），文字用 accent-ink 而非硬编码 text-white
          "bg-accent text-accent-ink hover:shadow-md active:scale-[0.98]",
        secondary:
          "border border-line text-ink hover:border-ink hover:bg-surface-2 active:scale-[0.98]",
        ghost:
          "text-ink-2 hover:bg-surface-2 hover:text-ink active:scale-[0.98]",
        danger:
          "bg-danger text-accent-ink hover:shadow-md active:scale-[0.98]",
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
