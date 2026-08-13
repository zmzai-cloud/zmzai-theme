"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface MagneticButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: ReactNode;
  /** How strongly the button drifts toward the cursor (default 0.3 = 30%) */
  magnetism?: number;
}

/**
 * MagneticButton — a button that subtly drifts toward the cursor.
 *
 * Uses framer-motion `useMotionValue` + `useSpring` to translate the
 * button toward the mouse position by a fraction of the distance, then
 * springs back to center on mouse leave. Pure micro-interaction, no
 * layout shift.
 *
 * @example
 * <MagneticButton className="rounded-full bg-ink px-6 py-3 text-white">
 *   立即开始
 * </MagneticButton>
 */
export function MagneticButton({
  children,
  className,
  magnetism = 0.3,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * magnetism);
    y.set(relY * magnetism);
    onMouseMove?.(e);
  }

  function handleMouseLeave(e: MouseEvent<HTMLButtonElement>) {
    x.set(0);
    y.set(0);
    onMouseLeave?.(e);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
