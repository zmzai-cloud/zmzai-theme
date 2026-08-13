"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface AnimatedTooltipProps {
  /** Tooltip body content */
  content: ReactNode;
  /** The trigger element */
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedTooltip — a custom tooltip that slides in following the cursor.
 *
 * Unlike the Radix-based tooltip, this is built purely with framer-motion:
 * on hover, a small card slides in from the side with spring physics and
 * tracks the mouse X position. Based on Aceternity's Animated Tooltip,
 * adapted to the zmzai monochrome palette.
 *
 * @example
 * <AnimatedTooltip content="复制到剪贴板">
 *   <button>复制</button>
 * </AnimatedTooltip>
 */
export function AnimatedTooltip({
  content,
  children,
  className,
}: AnimatedTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 22 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("relative inline-flex", className)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              x,
              // position above the cursor, centered horizontally
              translateY: "-120%",
              translateX: "-50%",
            }}
            className="pointer-events-none z-50 whitespace-nowrap rounded-lg border border-line bg-bg px-3 py-1.5 text-xs font-medium text-ink shadow-md"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
