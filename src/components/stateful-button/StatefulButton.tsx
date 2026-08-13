"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { buttonVariants, type ButtonVariant, type ButtonSize } from "../button/button.styles";

export interface StatefulButtonProps {
  children: ReactNode;
  /** Async function called on click. Button shows loading then success. */
  onClick?: () => Promise<void> | void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Success message shown briefly after completion (default "完成") */
  successText?: string;
  /** Duration of success state before resetting (default 1500ms) */
  successDuration?: number;
  disabled?: boolean;
}

type State = "idle" | "loading" | "success";

/**
 * StatefulButton — auto-manages idle → loading → success lifecycle.
 *
 * Wrap any async action: the button shows a spinner during execution,
 * then briefly displays a checkmark + success text before resetting.
 * Built on zmzai Button variants + framer-motion state transitions.
 *
 * @example
 * <StatefulButton onClick={async () => { await deploy(); }}>
 *   部署
 * </StatefulButton>
 */
export function StatefulButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  successText = "完成",
  successDuration = 1500,
  disabled,
}: StatefulButtonProps) {
  const [state, setState] = useState<State>("idle");

  const handleClick = async () => {
    if (state !== "idle" || disabled) return;
    setState("loading");
    try {
      await onClick?.();
      setState("success");
      setTimeout(() => setState("idle"), successDuration);
    } catch {
      setState("idle");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || state === "loading"}
      whileHover={disabled || state !== "idle" ? undefined : { scale: 1.03 }}
      whileTap={disabled || state !== "idle" ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(buttonVariants({ variant, size }), "overflow-hidden", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            处理中…
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {successText}
          </motion.span>
        )}
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
