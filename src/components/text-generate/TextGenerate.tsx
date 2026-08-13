"use client";

import { type HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface TextGenerateProps
  extends Omit<HTMLMotionProps<"span">, "ref"> {
  /** Text content to animate */
  text: string;
  /** Duration of each word's fade-in (seconds) */
  duration?: number;
}

/**
 * TextGenerate — text that fades in word by word on mount.
 *
 * Splits `text` by spaces and staggers each word's opacity 0→1.
 * Preserves inline layout via a wrapping span.
 *
 * @example
 * <TextGenerate text="Hello world from zmzai" duration={0.5} />
 */
export function TextGenerate({
  text,
  duration = 0.5,
  className,
  ...props
}: TextGenerateProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 4 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration,
            delay: i * (duration * 0.4),
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
