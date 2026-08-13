"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

export interface NotchProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  /** Notification content */
  children?: ReactNode;
  /** Whether the notch is visible */
  visible?: boolean;
}

/**
 * Notch — a floating notification bar pinned to the top center.
 *
 * Inspired by the macOS Dynamic Island: a pill that slides down from the
 * top of the viewport when `visible` becomes true and slides up on hide.
 * Rendered in a fixed overlay so it floats above page content.
 *
 * @example
 * const [open, setOpen] = useState(true)
 * <Notch visible={open} onClose={() => setOpen(false)}>新消息</Notch>
 */
export function Notch({ children, visible = false, className, ...props }: NotchProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 24, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-ink px-4 py-2 text-sm text-white shadow-lg",
              className
            )}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
