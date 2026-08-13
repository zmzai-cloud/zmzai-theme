"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface LayoutGridItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

export interface LayoutGridProps {
  items: LayoutGridItem[];
  className?: string;
}

/**
 * LayoutGrid — grid where clicking an item animates it to fullscreen.
 *
 * Uses framer-motion `layoutId` so the clicked card smoothly morphs into a
 * fullscreen overlay. Clicking the overlay (or close button) collapses it back.
 *
 * @example
 * <LayoutGrid items={[
 *   { id: "1", title: "项目 A", content: <p>详情…</p> },
 *   { id: "2", title: "项目 B", content: <p>详情…</p> },
 * ]} />
 */
export function LayoutGrid({ items, className }: LayoutGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = items.find((item) => item.id === activeId) ?? null;

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {items.map((item) => (
          <motion.button
            type="button"
            key={item.id}
            layoutId={`layout-card-${item.id}`}
            onClick={() => setActiveId(item.id)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex min-h-[160px] flex-col rounded-xl border border-line bg-bg p-5 text-left shadow-sm transition-colors hover:border-line-strong"
            )}
          >
            {item.icon && (
              <div className="mb-3 flex h-8 w-8 items-center justify-center text-ink">
                {item.icon}
              </div>
            )}
            <h3 className="mt-auto text-base font-semibold text-ink">
              {item.title}
            </h3>
          </motion.button>
        ))}
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              layoutId={`layout-card-${activeItem.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-bg p-6 shadow-2xl"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="关闭"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
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

              {activeItem.icon && (
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-ink">
                  {activeItem.icon}
                </div>
              )}
              <h2 className="mb-4 pr-10 text-xl font-bold text-ink">
                {activeItem.title}
              </h2>
              <div className="text-sm leading-relaxed text-ink-2">
                {activeItem.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
