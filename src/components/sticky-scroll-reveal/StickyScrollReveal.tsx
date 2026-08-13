"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

export interface StickyScrollItem {
  title: string;
  description: string;
  content?: ReactNode;
}

export interface StickyScrollRevealProps {
  items: StickyScrollItem[];
  className?: string;
  /** Tailwind text token applied to the active title accent underline */
  contentClassName?: string;
}

/**
 * StickyScrollReveal — content blocks that stick and swap on scroll.
 *
 * The left column holds a sticky title + description that changes as the
 * user scrolls through each item; the right column shows optional content.
 * Each item reveals with a fade/slide driven by scroll progress. Based on
 * Aceternity's Sticky Scroll Reveal, adapted to the zmzai monochrome palette.
 *
 * @example
 * <StickyScrollReveal items={[
 *   { title: "步骤一", description: "上传文件", content: <Preview /> },
 *   { title: "步骤二", description: "生成内容" },
 * ]} />
 */
export function StickyScrollReveal({
  items,
  className,
  contentClassName,
}: StickyScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col",
        className
      )}
    >
      {items.map((item, idx) => (
        <StickyItem
          key={idx}
          item={item}
          index={idx}
          total={items.length}
          progress={scrollYProgress}
          contentClassName={contentClassName}
        />
      ))}
    </div>
  );
}

interface StickyItemProps {
  item: StickyScrollItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  contentClassName?: string;
}

function StickyItem({
  item,
  index,
  total,
  progress,
  contentClassName,
}: StickyItemProps) {
  const segment = 1 / total;
  // active window for this item
  const start = index * segment;
  const end = start + segment;

  // opacity/scale for left column based on scroll position within segment
  const opacity = useTransform(
    progress,
    [Math.max(0, start - segment * 0.4), start, end, end + segment * 0.4],
    [0.3, 1, 1, 0.3]
  );
  const translateY = useTransform(
    progress,
    [start - segment * 0.4, start, end, end + segment * 0.4],
    [20, 0, 0, -20]
  );

  return (
    <div className="flex min-h-screen items-start gap-6 md:gap-10 lg:gap-16">
      {/* Left: sticky text column */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center md:w-1/2">
        <motion.div style={{ opacity, y: translateY }}>
          {/* Index marker */}
          <span className="mb-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-line text-xs text-ink-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-4xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-md text-sm text-ink-2 md:text-base">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Right: content column */}
      <div className="flex w-full items-center py-24 md:w-1/2">
        {item.content ? (
          <div
            className={cn(
              "w-full rounded-xl border border-line bg-surface p-6",
              contentClassName
            )}
          >
            {item.content}
          </div>
        ) : (
          <div
            className={cn(
              "flex h-72 w-full items-center justify-center rounded-xl border border-line bg-surface text-sm text-ink-3",
              contentClassName
            )}
          >
            {item.title}
          </div>
        )}
      </div>
    </div>
  );
}
