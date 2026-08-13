"use client";

import { type Variants } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface TextHoverEffectProps {
  /** The text to display and animate */
  text: string;
  className?: string;
  /** Per-letter animation duration in seconds (default 0.3) */
  duration?: number;
}

const containerVariants: Variants = {
  rest: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.025 } },
};

function makeLetterVariants(duration: number): Variants {
  return {
    rest: { y: 0, opacity: 1 },
    hover: { y: "-100%", opacity: 0 },
    transition: { duration },
  } as Variants;
}

/**
 * TextHoverEffect — text whose letters slide up and are replaced on hover.
 *
 * Each letter animates upward and out while a duplicate slides in from
 * below (Aceternity-style hover reveal). Uses framer-motion `staggerChildren`
 * so letters cascade rather than moving in lockstep.
 *
 * @example
 * <TextHoverEffect text="开始使用" className="text-2xl font-semibold" />
 */
export function TextHoverEffect({
  text,
  className,
  duration = 0.3,
}: TextHoverEffectProps) {
  const letters = Array.from(text);
  const letterVariants = makeLetterVariants(duration);

  return (
    <motion.span
      className={cn(
        "relative inline-block cursor-pointer overflow-hidden align-bottom text-ink",
        className
      )}
      variants={containerVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* Top row: slides up & fades out on hover */}
      <span className="inline-flex" aria-hidden>
        {letters.map((char, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block whitespace-pre"
            variants={letterVariants}
            transition={{ duration }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      {/* Bottom row: slides up into place on hover */}
      <span className="absolute inset-0 inline-flex" aria-hidden>
        {letters.map((char, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block whitespace-pre text-ink-2"
            variants={{
              rest: { y: "100%", opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      {/* Accessible label for screen readers */}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
