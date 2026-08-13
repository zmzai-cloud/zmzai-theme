"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export type BentoSpan = "1x1" | "2x1" | "1x2" | "2x2";

export interface BentoGridItem {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Custom className to override/extend the card styling */
  className?: string;
  /** Grid span control. Default "1x1". Format: "cols x rows" */
  span?: BentoSpan;
}

export interface BentoGridProps {
  items: BentoGridItem[];
  className?: string;
}

/** Map span tokens to Tailwind grid-column / grid-row utilities */
const spanClassMap: Record<BentoSpan, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};

/**
 * BentoGrid — asymmetric grid layout (like Apple's bento).
 *
 * CSS grid with 2 columns + auto-rows. Each item's `span` controls its
 * footprint. Items lift on hover via framer-motion.
 *
 * @example
 * <BentoGrid items={[
 *   { title: "性能", description: "极速响应", span: "2x1" },
 *   { title: "安全", description: "端到端加密", span: "1x1" },
 * ]} />
 */
export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(140px,1fr)] grid-cols-1 gap-3 sm:grid-cols-2",
        className
      )}
    >
      {items.map((item, index) => (
        <BentoCard key={index} item={item} />
      ))}
    </div>
  );
}

function BentoCard({ item }: { item: BentoGridItem }) {
  const span = item.span ?? "1x1";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex flex-col justify-between rounded-xl border border-line bg-bg p-5 shadow-sm transition-colors hover:border-line-strong",
        spanClassMap[span],
        item.className
      )}
    >
      {item.icon && (
        <div className="mb-3 flex h-8 w-8 items-center justify-center text-ink">
          {item.icon}
        </div>
      )}
      <div className="mt-auto">
        <h3 className="text-base font-semibold text-ink">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
