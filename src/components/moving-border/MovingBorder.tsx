"use client";

import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  /** Border rotation duration in seconds (default 5) */
  duration?: number;
  /** Border color (default accent blue) */
  borderColor?: string;
  /** Inner background color (default bg) */
  backgroundColor?: string;
  /** Border radius (default rounded-xl = 12px) */
  borderRadius?: string;
}

/**
 * MovingBorder — container with rotating conic-gradient border beam.
 *
 * Uses CSS `@property --angle` for a smooth rotating light beam around
 * the border. Based on Aceternity's Moving Border, adapted to zmzai's
 * blue accent. Only the border moves — inner content stays static.
 *
 * @example
 * <MovingBorder duration={5}>
 *   <input placeholder="聚焦看边框光束…" />
 * </MovingBorder>
 */
export function MovingBorder({
  children,
  className,
  duration = 5,
  borderColor = "var(--color-accent)",
  backgroundColor = "var(--color-bg)",
  borderRadius = "12px",
}: MovingBorderProps) {
  return (
    <>
      {/* @property must be in global scope — inject once */}
      <style>{`
        @property --mb-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes mb-rotate { to { --mb-angle: 360deg; } }
      `}</style>

      <div
        className={cn("relative", className)}
        style={{
          borderRadius,
          padding: "1px",
          background: `conic-gradient(from var(--mb-angle), transparent 0%, transparent 60%, ${borderColor} 80%, transparent 95%)`,
          animation: `mb-rotate ${duration}s linear infinite`,
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            borderRadius: `calc(${borderRadius} - 1px)`,
            background: backgroundColor,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
