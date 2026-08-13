"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface EmptyStateProps {
  /** Optional icon/illustration node (default: a muted dot grid) */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Optional call-to-action node (button, link, etc.) */
  action?: ReactNode;
  className?: string;
}

const defaultIcon = (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="h-12 w-12 text-ink-3"
    aria-hidden
  >
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
    <path
      d="M22 34c2.5 3 5.5 4.5 10 4.5S39.5 37 42 34"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="26" r="2" fill="currentColor" />
    <circle cx="40" cy="26" r="2" fill="currentColor" />
  </svg>
);

/**
 * EmptyState — a designed, centered empty placeholder.
 *
 * Icon + title + description + optional CTA, with generous padding and
 * muted colors. Fades/slides in on mount via framer-motion.
 *
 * @example
 * <EmptyState
 *   title="暂无数据"
 *   description="创建第一条记录后将会显示在这里"
 *   action={<Button>新建</Button>}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex w-full flex-col items-center justify-center px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
        {icon ?? defaultIcon}
      </div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-2">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
