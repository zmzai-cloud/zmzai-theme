"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface CometCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT = 8; // deg

/**
 * CometCard — a 3D-perspective tilt card with a "comet" light streak that
 * shoots across the card on hover.
 *
 * The card tilts toward the cursor (CSS `perspective` + rotateX/rotateY).
 * On each mouse enter a small gradient dot animates diagonally across the
 * surface via framer-motion keyframes, leaving a light trail. A `key`
 * counter remounts the comet so the streak replays on every entry.
 *
 * @example
 * <CometCard className="p-8">
 *   <h3 className="text-white">悬停触发流星</h3>
 * </CometCard>
 */
export function CometCard({ children, className }: CometCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [streakKey, setStreakKey] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    { stiffness: 150, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    { stiffness: 150, damping: 20 }
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseEnter() {
    // Remount the comet so the streak replays on each entry.
    setStreakKey((k) => k + 1);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={cn("group relative", className)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-xl border border-dark-line bg-dark-bg"
      >
        {/* Comet streak — replays on every mouse-enter via streakKey */}
        <motion.span
          key={streakKey}
          className="pointer-events-none absolute z-20 h-24 w-24 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 45%, transparent 70%)",
          }}
          initial={{ x: "-25%", y: "-25%", opacity: 0 }}
          animate={{
            x: ["-25%", "125%"],
            y: ["-25%", "125%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 1.1, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
        />

        <div
          className="relative z-10"
          style={{ transform: "translateZ(40px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
