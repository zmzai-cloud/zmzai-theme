"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "brutal";
}

/**
 * Textarea — multi-line text input.
 *
 * - `default`: light border, focus border turns ink
 * - `brutal`: 2px ink border + hard offset shadow
 *
 * @example
 * <Textarea placeholder="描述任务…" rows={4} />
 * <Textarea variant="brutal" placeholder="描述任务…" />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-none bg-bg font-sans text-ink placeholder:text-ink-3 outline-none transition-all",
          variant === "default" &&
            "border border-line rounded-lg px-4 py-2.5 text-sm focus:border-ink",
          variant === "brutal" &&
            "border-2 border-ink rounded-xl px-4 py-3 text-sm shadow-[4px_4px_0_var(--color-ink)] focus:shadow-[6px_6px_0_var(--color-accent)] focus:border-accent focus:-translate-x-px focus:-translate-y-px",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
