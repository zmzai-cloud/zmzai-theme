"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";

export interface TimelineItem {
  title: string;
  content: ReactNode;
  /** Optional timestamp shown beside title */
  time?: string;
  /** Status: default (gray), active (filled black), done (filled black + check) */
  status?: "default" | "active" | "done";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

/**
 * Timeline — scroll-reveal timeline with progress beam.
 *
 * Minimal black-gray design: thin line fills as you scroll,
 * dots are black/gray only (no green/blue).
 *
 * @example
 * <Timeline items={[
 *   { title: "任务创建", time: "14:32", status: "done", content: <p>用户发起请求</p> },
 *   { title: "执行中", time: "14:34", status: "active", content: <p>正在生成…</p> },
 *   { title: "等待审批", status: "default", content: <p>写入文件</p> },
 * ]} />
 */
export function Timeline({ items, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Track */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />

      {/* Progress fill */}
      <motion.div
        className="absolute left-[7px] top-2 w-px origin-top bg-ink"
        style={{ scaleY, height: "calc(100% - 1rem)" }}
      />

      {/* Items */}
      <div className="flex flex-col">
        {items.map((item, index) => (
          <TimelineItemRow key={index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
    </div>
  );
}

function TimelineItemRow({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  const status = item.status ?? "default";

  return (
    <div className={cn("relative flex gap-4", isLast ? "pb-0" : "pb-6")}>
      {/* Dot — black/gray only */}
      <div className="relative z-10 flex-shrink-0 pt-0.5">
        {status === "done" && (
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink">
            <svg className="h-2 w-2 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="10 3 5 8 2 5" />
            </svg>
          </div>
        )}
        {status === "active" && (
          <div className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-ink animate-pulse" />
        )}
        {status === "default" && (
          <div className="h-3.5 w-3.5 rounded-full border-2 border-line bg-bg" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className={cn(
            "text-sm font-semibold",
            status === "default" ? "text-ink-3" : "text-ink"
          )}>
            {item.title}
          </span>
          {item.time && (
            <span className="ml-auto font-mono text-xs text-ink-3">{item.time}</span>
          )}
        </div>
        <div className="text-sm leading-relaxed text-ink-2">{item.content}</div>
      </div>
    </div>
  );
}
