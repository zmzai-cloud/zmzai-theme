"use client";

import { type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export type LoaderVariant = "spinner" | "dots" | "bars" | "ring" | "pulse";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Spinner style */
  variant?: LoaderVariant;
  /** Size in pixels (default 24) */
  size?: number;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Loader — minimal loading indicators.
 *
 * Variants:
 * - `spinner`: rotating arc
 * - `dots`: three bouncing dots
 * - `bars`: four equalizing bars
 * - `ring`: pulsing ring
 * - `pulse`: single pulsing dot
 *
 * Default size 24px, monochrome `text-ink`.
 *
 * @example
 * <Loader variant="dots" size={28} />
 */
export function Loader({
  variant = "spinner",
  size = 24,
  className,
  style,
  ...props
}: LoaderProps) {
  const wrapperStyle = { width: size, height: size, ...style };

  return (
    <div
      className={cn("inline-flex items-center justify-center text-ink", className)}
      style={wrapperStyle}
      role="status"
      aria-label="loading"
      {...props}
    >
      {variant === "spinner" && (
        <motion.svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </motion.svg>
      )}

      {variant === "dots" && (
        <div className="flex h-full w-full items-center justify-center gap-[15%]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block rounded-full bg-current"
              style={{ width: "22%", height: "22%" }}
              animate={{ y: [0, -size * 0.2, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: easeOut,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}

      {variant === "bars" && (
        <div className="flex h-full w-full items-end justify-center gap-[15%]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="block w-[15%] rounded-sm bg-current"
              animate={{ height: ["30%", "100%", "30%"] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: easeOut,
                delay: i * 0.12,
              }}
            />
          ))}
        </div>
      )}

      {variant === "ring" && (
        <motion.div
          className="h-full w-full rounded-full border-[3px] border-current"
          style={{ borderTopColor: "transparent" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      )}

      {variant === "pulse" && (
        <motion.span
          className="block rounded-full bg-current"
          style={{ width: "100%", height: "100%" }}
          animate={{ scale: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: easeOut }}
        />
      )}
    </div>
  );
}
