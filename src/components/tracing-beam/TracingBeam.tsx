"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface TracingBeamProps {
  children: ReactNode;
  className?: string;
}

/**
 * TracingBeam — vertical SVG beam that traces scroll progress.
 *
 * A thin vertical line sits on the left of the content. As the user
 * scrolls through the section, the beam fills (gray -> ink) to indicate
 * reading progress. Based on Aceternity's Tracing Beam, adapted to the
 * zmzai monochrome palette.
 *
 * @example
 * <TracingBeam>
 *   <article>…long-form content…</article>
 * </TracingBeam>
 */
export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 10%", "end 70%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (ref.current) {
      setSvgHeight(ref.current.offsetHeight);
    }
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto h-full w-full max-w-2xl",
        className
      )}
    >
      {/* SVG beam */}
      <div className="absolute -left-8 top-3 hidden h-full w-[2px] md:block">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          {/* Track */}
          <path
            d={`M 1 0 L 1 ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-line"
            strokeOpacity={1}
          />
          {/* Progress */}
          <motion.path
            d={`M 1 0 L 1 ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-ink"
            style={{ scaleY, transformOrigin: "top" }}
          />
        </svg>
        {/* Dot at the top of the beam */}
        <motion.div
          className="absolute -left-[7px] top-0 h-4 w-4 rounded-full border border-line bg-surface"
          animate={{
            boxShadow:
              progress > 0
                ? "0 0 0 2px rgba(0,0,0,0.05)"
                : "none",
          }}
        >
          <div className="h-full w-full rounded-full bg-ink" />
        </motion.div>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
