"use client";

import { type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "../../utils/cn";

export interface GlareCardProps {
  children: ReactNode;
  className?: string;
  /** Color of the glare highlight (default rgba(255,255,255,0.8)) */
  glareColor?: string;
}

/**
 * GlareCard — a dark card with a light "glare" reflection that follows the
 * cursor across its surface.
 *
 * A radial gradient is positioned at the mouse coordinates via
 * `useMotionValue` + `useMotionTemplate`, producing a moving specular
 * highlight. Defaults to the dark palette so the glare reads clearly.
 *
 * @example
 * <GlareCard className="p-8">
 *   <h3 className="text-white">悬停查看反光</h3>
 * </GlareCard>
 */
export function GlareCard({
  children,
  className,
  glareColor = "rgba(255, 255, 255, 0.8)",
}: GlareCardProps) {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const glare = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, ${glareColor}, transparent 60%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-200);
    mouseY.set(-200);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-dark-line bg-dark-bg",
        className
      )}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
      {/* Content sits above the glare */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
