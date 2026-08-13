"use client";

import { type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "../../utils/cn";

export interface GlowingEffectProps {
  children: ReactNode;
  className?: string;
  /** Glow color (default "rgba(0,0,0,0.05)") */
  color?: string;
  /** Glow radius in px (default 300) */
  radius?: number;
}

/**
 * GlowingEffect — container with a mouse-following glowing border on hover.
 *
 * A radial gradient glow follows the cursor, lighting up the border region
 * of the container. Unlike CardSpotlight (which tints the surface), this
 * effect emphasizes the border edge with a soft glow. Based on Aceternity's
 * Glowing Effect pattern, adapted to zmzai's monochrome palette.
 *
 * @example
 * <GlowingEffect radius={300}>
 *   <div className="p-6">
 *     <h3>智能生成</h3>
 *     <p>一键创建内容</p>
 *   </div>
 * </GlowingEffect>
 */
export function GlowingEffect({
  children,
  className,
  color = "rgba(0, 0, 0, 0.05)",
  radius = 300,
}: GlowingEffectProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const glow = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-line bg-bg transition-colors hover:border-line-strong",
        className
      )}
    >
      {/* Glow overlay — follows cursor, reveals on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {/* Inner border highlight for the "glowing border" feel */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-ink/0 transition-shadow duration-300 group-hover:ring-ink/5" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
