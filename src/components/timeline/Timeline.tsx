"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";

export interface TimelineItem {
  title: string;
  content: ReactNode;
  /** Optional timestamp / meta shown beside title */
  time?: string;
  /** Status dot color override (default: ink) */
  status?: "default" | "active" | "done" | "error";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const statusConfig = {
  default: { dot: "border-line-strong bg-bg", ring: "" },
  active: { dot: "border-accent bg-accent", ring: "ring-2 ring-accent/20" },
  done: { dot: "border-success bg-success", ring: "" },
  error: { dot: "border-danger bg-danger", ring: "" },
};

/**
 * Timeline — vertical event timeline with scroll-fill beam.
 *
 * Features:
 * - Left vertical beam fills from top as you scroll (framer-motion useScroll + useSpring)
 * - Each item has a status dot (default/active/done/error)
 * - Content rendered in a card-like layout with title + optional time
 * - Connecting line uses gradient mask for smooth fade
 *
 * @example
 * <Timeline items={[
 *   { title: "任务创建", time: "14:32", status: "done", content: <p>用户发起请求</p> },
 *   { title: "执行中", time: "14:33", status: "active", content: <p>正在生成代码…</p> },
 *   { title: "等待审批", time: "14:34", status: "default", content: <p>写入 UserList.tsx</p> },
 * ]} />
 */
export function Timeline({ items, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Track — background line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />

      {/* Progress fill — animates with scroll */}
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
  const cfg = statusConfig[status];

  return (
    <div className={cn("relative flex gap-4", isLast ? "pb-0" : "pb-6")}>
      {/* Status dot */}
      <div className="relative z-10 flex-shrink-0 pt-0.5">
        <div
          className={cn(
            "h-3.5 w-3.5 rounded-full border-2 transition-all",
            cfg.dot,
            cfg.ring,
            status === "active" && "animate-pulse"
          )}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              status === "active" ? "text-accent" : "text-ink"
            )}
          >
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
