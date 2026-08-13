"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface AnimatedTabsProps {
  tabs: { label: string; content: ReactNode }[];
  className?: string;
  /** Initial active tab index (default 0) */
  defaultIndex?: number;
}

/**
 * AnimatedTabs — tabs with sliding underline indicator.
 *
 * Uses framer-motion's layoutId for a smooth sliding underline
 * that moves between tabs on click. Minimal monochrome styling.
 *
 * @example
 * <AnimatedTabs tabs={[
 *   { label: "产物", content: <Artifacts /> },
 *   { label: "文件", content: <Files /> },
 * ]} />
 */
export function AnimatedTabs({ tabs, className, defaultIndex = 0 }: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-line">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              active === index ? "text-ink" : "text-ink-3 hover:text-ink-2"
            )}
          >
            {tab.label}
            {active === index && (
              <motion.div
                layoutId="animated-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-4">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
