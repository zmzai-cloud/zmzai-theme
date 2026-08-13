"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "../../utils/cn";

export interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  /** Spotlight radius in px (default 300) */
  radius?: number;
  /** Spotlight color (default uses accent token via rgba) */
  color?: string;
}

/**
 * CardSpotlight — card with mouse-following radial spotlight.
 *
 * A subtle radial gradient follows the cursor inside the card,
 * revealing a faint highlight. Based on Aceternity's Card Spotlight
 * pattern, adapted to zmzai's monochrome palette.
 *
 * @example
 * <CardSpotlight radius={250}>
 *   <h3>生成 PPT</h3>
 *   <p>自动生成演示文稿</p>
 * </CardSpotlight>
 */
export function CardSpotlight({
  children,
  className,
  radius = 300,
  color = "rgba(0, 0, 0, 0.04)",
}: CardSpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-line bg-bg transition-colors hover:border-line-strong",
        className
      )}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
