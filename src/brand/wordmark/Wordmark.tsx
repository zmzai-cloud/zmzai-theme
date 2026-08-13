"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface WordmarkProps extends HTMLAttributes<HTMLSpanElement> {
  /** Font weight 100-900, default 600 */
  weight?: number;
  /** Font size in px, default 16 */
  size?: number;
  /** Append a sub-label (e.g. "relay", "agent") after ZMZAI */
  sublabel?: string;
}

/**
 * Wordmark — `ZMZAI` 文字标.
 *
 * Sans-serif, negative letter-spacing, optional sublabel.
 *
 * @example
 * <Wordmark />                    // "ZMZAI"
 * <Wordmark sublabel="relay" />   // "ZMZAI · relay"
 * <Wordmark size={24} weight={700} />
 */
export const Wordmark = forwardRef<HTMLSpanElement, WordmarkProps>(
  ({ className, weight = 600, size = 16, sublabel, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-baseline gap-1.5 select-none", className)}
        style={{ fontWeight: weight, fontSize: size, letterSpacing: "-0.02em", ...style }}
        {...props}
      >
        ZMZAI
        {sublabel && (
          <span
            className="font-normal text-ink-3"
            style={{ fontSize: size * 0.7, letterSpacing: 0 }}
          >
            · {sublabel}
          </span>
        )}
      </span>
    );
  }
);

Wordmark.displayName = "Wordmark";
