"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "../../utils/cn";

export interface CardHoverItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface CardHoverEffectProps {
  items: CardHoverItem[];
  className?: string;
}

/**
 * CardHoverEffect — a grid of cards where hovering one slides a shared
 * highlight background between cards using framer-motion `layoutId`.
 *
 * The highlight is a single shared element animated via layoutId, so it
 * smoothly translates from card to card as the cursor moves across the grid.
 *
 * @example
 * <CardHoverEffect
 *   items={[
 *     { title: "生成", description: "一键生成内容" },
 *     { title: "分析", description: "智能数据分析" },
 *   ]}
 * />
 */
export function CardHoverEffect({ items, className }: CardHoverEffectProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title + idx}
          className="group relative"
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Shared highlight background animated across cards */}
          <AnimatePresence mode="popLayout">
            {hovered === idx && (
              <motion.span
                layoutId="card-hover-highlight"
                className="absolute inset-0 block rounded-xl bg-surface-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 h-full rounded-xl border border-line p-6 transition-colors duration-200 group-hover:border-line-strong">
            {item.icon && (
              <div className="mb-4 text-ink [&>svg]:h-6 [&>svg]:w-6">
                {item.icon}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-2">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
