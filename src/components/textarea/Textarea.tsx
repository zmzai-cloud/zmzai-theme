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
            "border border-line rounded-sm px-4 py-2.5 text-sm focus:border-ink",
          variant === "brutal" &&
            "border-2 border-ink rounded-sm px-4 py-3 text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
