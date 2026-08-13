"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface FocusCardItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FocusCardsProps {
  items: FocusCardItem[];
  className?: string;
}

/**
 * FocusCards — grid of cards where hovering one focuses it (full opacity)
 * and blurs the others (opacity 30%).
 *
 * The hover state is tracked at the container level so siblings react to the
 * hovered card. Uses framer-motion for the opacity transition.
 *
 * @example
 * <FocusCards items={[
 *   { title: "速度", description: "毫秒级响应" },
 *   { title: "稳定", description: "99.9% 可用" },
 * ]} />
 */
export function FocusCards({ items, className }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, index) => (
        <FocusCard
          key={index}
          item={item}
          isHovered={hovered === index}
          isAnyHovered={hovered !== null}
          onHover={() => setHovered(index)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
}

function FocusCard({
  item,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  item: FocusCardItem;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  // Blurred when another card is hovered and this one is not
  const dimmed = isAnyHovered && !isHovered;

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{ opacity: dimmed ? 0.3 : 1, scale: isHovered ? 1.02 : 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex flex-col rounded-xl border border-line bg-bg p-5 shadow-sm transition-colors",
        isHovered && "border-line-strong shadow-md"
      )}
    >
      {item.icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-ink">
          {item.icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">
        {item.description}
      </p>
    </motion.div>
  );
}
