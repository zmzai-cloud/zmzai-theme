"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { cn } from "../../utils/cn";

export interface VanishInputProps {
  /** Rotating placeholder strings */
  placeholders: string[];
  /** Called on submit (Enter) */
  onSubmit: (value: string) => void;
  className?: string;
}

/**
 * VanishInput — search input with a rotating placeholder that "vanishes".
 *
 * While idle, placeholders cycle. Each character of the current placeholder
 * animates upward and fades out (the vanish effect) before the next
 * placeholder appears. Typing hides the placeholder. Based on Aceternity's
 * Vanish Input, adapted to the zmzai palette.
 *
 * @example
 * <VanishInput
 *   placeholders={["搜索文档…", "输入关键词…"]}
 *   onSubmit={(v) => search(v)}
 * />
 */
export function VanishInput({
  placeholders,
  onSubmit,
  className,
}: VanishInputProps) {
  const [value, setValue] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cyclingRef = useRef(true);

  const nextPlaceholder = useCallback(() => {
    setCurrentPlaceholder((prev) =>
      prev === placeholders.length - 1 ? 0 : prev + 1
    );
  }, [placeholders.length]);

  const startVanishing = useCallback(async () => {
    if (!cyclingRef.current || placeholders.length === 0) return;
    cyclingRef.current = false;
    try {
      // vanish: each char moves up & fades out
      await animate(
        "span",
        { y: -20, opacity: 0 },
        { duration: 0.3, delay: staggerDelay() }
      );
      // swap to next placeholder
      nextPlaceholder();
      // reset chars below + hidden, then animate in
      await animate(
        "span",
        { y: 20, opacity: 0 },
        { duration: 0 }
      );
      await animate(
        "span",
        { y: 0, opacity: 1 },
        { duration: 0.3, delay: staggerDelay() }
      );
    } finally {
      cyclingRef.current = true;
    }
  }, [animate, nextPlaceholder, placeholders.length]);

  // cycle placeholders while idle
  useEffect(() => {
    if (!placeholders.length) return;
    intervalRef.current = setInterval(() => {
      if (value.length === 0) {
        startVanishing();
      }
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [placeholders.length, value.length, startVanishing]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    onSubmit(value);
    setValue("");
  };

  const showPlaceholder = value.length === 0 && placeholders.length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex w-full max-w-xl items-center overflow-hidden rounded-full border border-line bg-surface px-5 py-2.5 transition-colors focus-within:border-ink/50",
        className
      )}
    >
      {/* Placeholder */}
      {showPlaceholder && (
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPlaceholder}
              ref={scope}
              className="truncate text-sm text-ink-3"
            >
              {placeholders[currentPlaceholder]
                .split("")
                .map((ch, i) => (
                  <motion.span
                    key={`ch-${i}`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block whitespace-pre"
                  >
                    {ch}
                  </motion.span>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="relative z-10 w-full bg-transparent text-sm text-ink outline-none placeholder:text-transparent"
      />

      {/* Submit button */}
      <button
        type="submit"
        aria-label="提交"
        className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105 active:scale-95"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}

/** Stagger helper: returns a stagger function usable as the `delay` option. */
function staggerDelay() {
  return (i: number) => i * 0.03;
}
