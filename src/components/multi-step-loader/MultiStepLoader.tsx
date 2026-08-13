"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface MultiStepLoaderStep {
  /** Display text for this step */
  text: string;
}

export interface MultiStepLoaderProps {
  /** Steps to display. Each shows sequentially. */
  steps: MultiStepLoaderStep[];
  /** Currently active step index (0-based). Steps before are completed. */
  currentIndex: number;
  className?: string;
}

/**
 * MultiStepLoader — sequential step loader for long-running tasks.
 *
 * Each step has 3 states: completed (checkmark), active (spinner), pending (dot).
 * Perfect for Agent task execution feedback.
 *
 * @example
 * const steps = [{ text: "分析需求" }, { text: "生成代码" }, { text: "运行测试" }];
 * <MultiStepLoader steps={steps} currentIndex={1} />
 */
export function MultiStepLoader({
  steps,
  currentIndex,
  className,
}: MultiStepLoaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <div key={index} className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-ink"
                >
                  <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
              {isActive && (
                <svg className="h-5 w-5 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isPending && (
                <div className="h-2 w-2 rounded-full border border-line" />
              )}
            </div>

            {/* Text */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`${index}-${isCompleted}-${isActive}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "text-sm transition-colors",
                  isCompleted && "text-ink-3 line-through",
                  isActive && "font-medium text-ink",
                  isPending && "text-ink-3"
                )}
              >
                {step.text}
              </motion.span>
            </AnimatePresence>

            {/* Step number */}
            <span className="ml-auto font-mono text-xs text-ink-3">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
