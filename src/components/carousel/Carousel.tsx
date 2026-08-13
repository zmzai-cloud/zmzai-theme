"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface CarouselProps {
  items: ReactNode[];
  className?: string;
}

/**
 * Carousel — minimal slide carousel with arrow nav + dot indicators.
 *
 * Clean monochrome design: chevron buttons appear on sides,
 * dots at bottom. Slides animate with horizontal slide+fade.
 *
 * @example
 * <Carousel items={[<div>A</div>, <div>B</div>, <div>C</div>]} />
 */
export function Carousel({ items, className }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + items.length) % items.length);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Slide area */}
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>

        {/* Prev */}
        <button
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-bg/80 text-ink-2 backdrop-blur transition-colors hover:border-ink hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        {/* Next */}
        <button
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-bg/80 text-ink-2 backdrop-blur transition-colors hover:border-ink hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all",
              i === index ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-ink-3"
            )}
          />
        ))}
      </div>
    </div>
  );
}
