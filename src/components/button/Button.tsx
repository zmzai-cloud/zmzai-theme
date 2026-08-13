"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";
import { buttonVariants, type ButtonVariant, type ButtonSize } from "./button.styles";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: React.ReactNode;
}

/**
 * Button — primary interactive element.
 *
 * - Uses framer-motion for hover/active micro-interactions
 * - Pill radius on all variants
 * - `loading` prop shows a spinner and disables
 *
 * @example
 * <Button variant="primary" size="md">发送</Button>
 * <Button variant="secondary" loading>保存中…</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={disabled || loading ? undefined : { scale: 1.03 }}
        whileTap={disabled || loading ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
