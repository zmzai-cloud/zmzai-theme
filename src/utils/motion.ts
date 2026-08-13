/**
 * Shared framer-motion transition presets.
 */

import type { Variants, Transition } from "framer-motion";

export const easeOut: number[] = [0.16, 1, 0.3, 1];
export const easeSpring: number[] = [0.34, 1.56, 0.64, 1];

/** Hover: scale up slightly */
export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.15, ease: easeOut },
};

/** Hover: lift up slightly */
export const hoverLift = {
  y: -2,
  transition: { duration: 0.2, ease: easeOut },
};

/** Entrance: fade in + slide up */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

/** Entrance: fade in + scale from 0.95 */
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easeSpring },
  },
};

/** Spring transition for dialogs / popovers */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};
