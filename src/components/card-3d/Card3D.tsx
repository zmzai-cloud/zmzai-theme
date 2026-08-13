"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface Card3DProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT = 10; // deg

/**
 * Card3D — a card that tilts in 3D space following the cursor, with
 * depth-shifted content and a slight lift on hover.
 *
 * The container sets CSS `perspective`; on mouse move the cursor's
 * normalized position maps to `rotateX`/`rotateY` (max ±10°) smoothed via
 * `useSpring`. Children are wrapped in a layer translated along Z for a
 * parallax pop, and the whole card scales up slightly on hover.
 *
 * @example
 * <Card3D className="p-8">
 *   <h3>立体卡片</h3>
 * </Card3D>
 */
export function Card3D({ children, className }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    { stiffness: 150, damping: 18 }
  );
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    { stiffness: 150, damping: 18 }
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative rounded-xl border border-line bg-surface"
      >
        {/* Depth-shifted content layer */}
        <div
          className="relative z-10 p-8"
          style={{ transform: "translateZ(50px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
