"use client";

import { useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface FloatingNavbarProps {
  /** Nav items rendered inside the pill container */
  children?: ReactNode;
  className?: string;
  /** Position from top in pixels when visible (default 16) */
  topOffset?: number;
}

const visible: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * FloatingNavbar — sticky top navbar that hides on scroll down, shows on scroll up.
 *
 * Fixed position, centered, pill-shaped container with backdrop-blur and shadow.
 * Uses framer-motion `useScroll` + `useMotionValueEvent` to detect scroll direction.
 *
 * @example
 * <FloatingNavbar>
 *   <a href="#home">Home</a>
 *   <a href="#about">About</a>
 * </FloatingNavbar>
 */
export function FloatingNavbar({
  children,
  className,
  topOffset = 16,
}: FloatingNavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down (past a small threshold), show when scrolling up
    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={visible}
      animate={hidden ? "hidden" : "visible"}
      style={{ top: topOffset }}
      className={cn(
        "fixed inset-x-0 z-50 mx-auto flex w-fit max-w-[95%] items-center justify-center gap-1 rounded-full border border-line bg-bg/80 px-2 py-2 shadow-lg backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
