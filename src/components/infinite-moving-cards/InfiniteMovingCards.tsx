"use client";

import { type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface InfiniteMovingCardsProps extends HTMLAttributes<HTMLDivElement> {
  /** Cards to render in the marquee */
  items: ReactNode[];
  /** Scroll speed */
  speed?: "slow" | "normal" | "fast";
  /** Pause the animation on hover */
  pauseOnHover?: boolean;
  /** Scroll direction */
  direction?: "left" | "right";
}

const speedMap: Record<NonNullable<InfiniteMovingCardsProps["speed"]>, string> = {
  slow: "80s",
  normal: "40s",
  fast: "20s",
};

/**
 * InfiniteMovingCards — a horizontal marquee that loops forever.
 *
 * Renders `items` twice back-to-back inside a CSS keyframe animation so the
 * loop is seamless. Pure CSS (no JS frame loop). The keyframes are injected
 * once via a scoped style tag to keep the component self-contained.
 *
 * @example
 * <InfiniteMovingCards items={logos} speed="slow" direction="left" />
 */
export function InfiniteMovingCards({
  items,
  speed = "normal",
  pauseOnHover = true,
  direction = "left",
  className,
  ...props
}: InfiniteMovingCardsProps) {
  const duration = speedMap[speed];

  const trackStyle: CSSProperties = {
    animationDuration: duration,
    animationDirection: direction === "right" ? "reverse" : "normal",
    animationPlayState: "running",
  };

  return (
    <>
      <style>{`
        @keyframes zmzai-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .zmzai-marquee-track {
          animation: zmzai-marquee var(--marquee-duration, 40s) linear infinite;
        }
      `}</style>

      <div
        className={cn(
          "group relative flex overflow-hidden",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "zmzai-marquee-track flex w-max shrink-0 flex-nowrap items-stretch gap-4",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{ ...trackStyle, ["--marquee-duration" as string]: duration }}
        >
          {[...items, ...items].map((item, i) => (
            <div key={i} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
