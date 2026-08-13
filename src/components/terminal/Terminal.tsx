"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  /** Title shown in the title bar */
  title?: string;
  /** Command-line content */
  children?: ReactNode;
}

/**
 * Terminal — a Mac-style terminal window.
 *
 * Renders a dark window with a title bar (traffic lights + title) and a
 * mono-font command area. A green prompt symbol prefixes the children.
 *
 * @example
 * <Terminal title="bash">
 *   <span>npm run dev</span>
 * </Terminal>
 */
export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ title = "bash", children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border border-dark-line bg-dark-bg shadow-lg",
          className
        )}
        {...props}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-dark-line bg-dark-surface px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 font-mono text-xs text-dark-ink/60">{title}</span>
        </div>

        {/* Body */}
        <div className="p-4 font-mono text-[13px] leading-relaxed text-dark-ink">
          <span className="mr-2 select-none text-[#27c93f]">$</span>
          {children}
        </div>
      </div>
    );
  }
);

Terminal.displayName = "Terminal";
