"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface WobbleCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_ROTATE = 6; // deg
const MAX_TRANSLATE = 10; // px
const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * WobbleCard — a card that wobbles (translates + rotates + skews slightly)
 * based on the cursor position.
 *
 * Two `useMotionValue`s track the normalized mouse position (-1..1). They
 * are fed through `useTransform` into rotation / translation targets, then
 * smoothed with `useSpring` and composed via `useMotionTemplate` into the
 * final transform string.
 *
 * @example
 * <WobbleCard className="rounded-xl bg-surface p-8">
 *   <h3>悬停我</h3>
 * </WobbleCard>
 */
export function WobbleCard({ children, className }: WobbleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateXRaw = useSpring(useTransform(my, [-0.5, 0.5], [MAX_ROTATE, -MAX_ROTATE]), SPRING);
  const rotateYRaw = useSpring(useTransform(mx, [-0.5, 0.5], [-MAX_ROTATE, MAX_ROTATE]), SPRING);
  const translateXRaw = useSpring(useTransform(mx, [-0.5, 0.5], [-MAX_TRANSLATE, MAX_TRANSLATE]), SPRING);
  const translateYRaw = useSpring(useTransform(my, [-0.5, 0.5], [-MAX_TRANSLATE, MAX_TRANSLATE]), SPRING);

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateXRaw}deg) rotateY(${rotateYRaw}deg) translateX(${translateXRaw}px) translateY(${translateYRaw}px)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX);
    my.set(relY);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={cn(
        "relative rounded-xl border border-line bg-surface p-8 transition-colors duration-200 hover:border-line-strong",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
