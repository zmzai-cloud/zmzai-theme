"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface ExpandableCardProps {
  title: string;
  /** Collapsed content (always visible) */
  children?: ReactNode;
  /** Content revealed when expanded */
  expandedContent?: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * ExpandableCard — card that expands on click to reveal more content.
 *
 * Uses framer-motion `AnimatePresence` with a height "auto" animation so the
 * card smoothly grows. A chevron icon rotates to indicate state.
 *
 * @example
 * <ExpandableCard title="详情" expandedContent={<p>更多内容…</p>}>
 *   摘要文字
 * </ExpandableCard>
 */
export function ExpandableCard({
  title,
  children,
  expandedContent,
  defaultExpanded = false,
  className,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-bg transition-colors hover:border-line-strong",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold text-ink">{title}</span>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-4 w-4 flex-shrink-0 text-ink-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      {/* Collapsed (always-visible) content */}
      {children && (
        <div className="px-4 pb-3 text-sm leading-relaxed text-ink-2">
          {children}
        </div>
      )}

      {/* Expanded content with height auto animation */}
      <AnimatePresence initial={false}>
        {expanded && expandedContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-4 py-3 text-sm leading-relaxed text-ink-2">
              {expandedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
