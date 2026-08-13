"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface CarouselProps {
  /** Items to display, one at a time */
  items: ReactNode[];
  className?: string;
}

/**
 * Carousel — a single-item slider with side arrow buttons and dot
 * indicators.
 *
 * Uses framer-motion `AnimatePresence` with a slide transition for the
 * active item. Arrow buttons wrap around at the ends. Dots reflect the
 * current index and are clickable.
 *
 * @example
 * <Carousel
 *   items={[
 *     <div key="a">第一张</div>,
 *     <div key="b">第二张</div>,
 *   ]}
 * />
 */
export function Carousel({ items, className }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const count = items.length;

  function paginate(next: number) {
    if (count === 0) return;
    setDirection(next > index ? 1 : -1);
    setIndex((next + count) % count);
  }

  function prev() {
    paginate(index - 1);
  }

  function next() {
    paginate(index + 1);
  }

  if (count === 0) return null;

  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* Slide viewport */}
      <div className="relative overflow-hidden rounded-xl border border-line bg-bg">
        <div className="relative min-h-[16rem]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              {items[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / next arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="上一项"
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-ink backdrop-blur transition-colors hover:bg-surface-2"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="下一项"
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-ink backdrop-blur transition-colors hover:bg-surface-2"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => paginate(i)}
              aria-label={`跳转到第 ${i + 1} 项`}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === index
                  ? "w-5 bg-ink"
                  : "w-2 bg-line hover:bg-ink-3"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
