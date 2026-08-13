"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BannerVariant = "info" | "warning" | "danger";

export interface StickyBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Banner content */
  children?: ReactNode;
  /** Visual severity */
  variant?: BannerVariant;
  /** Called when the X button is clicked */
  onDismiss?: () => void;
}

const variantStyles: Record<BannerVariant, string> = {
  info: "bg-surface text-ink border-line",
  warning: "bg-ink text-white border-ink",
  danger: "bg-bg text-ink border-ink border-2",
};

/**
 * StickyBanner — a dismissible banner that sticks to the top.
 *
 * Renders a full-width bar pinned to the top of the viewport with an
 * X button. Use `variant` to convey severity. Stays in place on scroll.
 *
 * @example
 * <StickyBanner variant="warning" onDismiss={() => setGone(true)}>
 *   系统将于今晚维护
 * </StickyBanner>
 */
export const StickyBanner = forwardRef<HTMLDivElement, StickyBannerProps>(
  ({ children, variant = "info", onDismiss, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="banner"
        className={cn(
          "sticky top-0 z-40 flex w-full items-center justify-between gap-3 border-b px-4 py-2.5 text-sm",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {onDismiss && (
          <button
            type="button"
            aria-label="dismiss"
            onClick={onDismiss}
            className="shrink-0 rounded-md p-1 text-current opacity-60 transition-opacity hover:opacity-100"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

StickyBanner.displayName = "StickyBanner";
