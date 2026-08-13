"use client";

import { type ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../utils/cn";

/**
 * TooltipProvider — wrap app root once.
 * Required by Radix Tooltip for delay/positioning context.
 */
export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

/**
 * Tooltip — hover/focus tooltip (Radix UI).
 *
 * Wrap your app in `<TooltipProvider>` (once, at root), then use `<Tooltip>`.
 *
 * @example
 * <Tooltip content="删除">
 *   <button>×</button>
 * </Tooltip>
 */
export function Tooltip({ children, content, side = "top", className }: TooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            "z-50 rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-white shadow-md",
            "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-ink" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
