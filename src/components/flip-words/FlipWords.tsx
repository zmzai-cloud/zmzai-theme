"use client";

import { useEffect, useState, type HTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface FlipWordsProps extends HTMLAttributes<HTMLSpanElement> {
  /** Words to cycle through */
  words: string[];
  /** Milliseconds each word stays before flipping */
  duration?: number;
}

/**
 * FlipWords — cycles through words with a 3D flip animation.
 *
 * The current word rotates up and out on the X axis while the next word
 * rotates in from the bottom. Keep this container inline for natural flow.
 *
 * @example
 * <FlipWords words={["faster", "smoother", "minimal"]} duration={3000} />
 */
export function FlipWords({
  words,
  duration = 3000,
  className,
  ...props
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(id);
  }, [words.length, duration]);

  // keep `index` in sync with `current` for exit animations
  useEffect(() => {
    setIndex(current);
  }, [current]);

  return (
    <span
      className={cn("relative inline-block", className)}
      style={{ perspective: "1000px" }}
      {...props}
    >
      <span className="invisible whitespace-pre">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <span className="absolute inset-0 inline-flex items-center justify-start">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            className="inline-block will-change-transform"
            initial={{ rotateX: -90, opacity: 0, transformOrigin: "bottom" }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0, transformOrigin: "top" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
