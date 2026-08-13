"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface KeyboardProps extends HTMLAttributes<HTMLElement> {
  /** Key label(s), e.g. ⌘K */
  children?: ReactNode;
}

/**
 * Keyboard — a single keycap pill (e.g. ⌘K).
 *
 * NOT a full keyboard layout — renders one key with a border, mono font,
 * and a subtle shadow for a physical-key look.
 *
 * @example
 * <Keyboard>⌘K</Keyboard>
 * <Keyboard className="px-3">Shift</Keyboard>
 */
export const Keyboard = forwardRef<HTMLElement, KeyboardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <kbd
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          "inline-flex select-none items-center justify-center whitespace-nowrap rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-xs font-medium text-ink-2 shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Keyboard.displayName = "Keyboard";
