"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { cn } from "../../utils/cn";

export interface TooltipCardProps {
  /** The trigger element */
  children: ReactNode;
  /** Avatar image URL */
  avatarSrc?: string;
  /** Person / entity name */
  name: string;
  /** Role / subtitle (e.g. job title) */
  role: string;
  /** Body description */
  description: string;
  className?: string;
}

/**
 * TooltipCard — a richer hover card with avatar + title + description.
 *
 * On hover, a card appears below the trigger and follows the mouse X
 * position with spring physics. Aceternity-style, adapted to the zmzai
 * monochrome palette.
 *
 * @example
 * <TooltipCard
 *   name="张三"
 *   role="前端工程师"
 *   description="负责组件库与设计系统。"
 *   avatarSrc="/avatar.png"
 * >
 *   <span className="underline">@zhangsan</span>
 * </TooltipCard>
 */
export function TooltipCard({
  children,
  avatarSrc,
  name,
  role,
  description,
  className,
}: TooltipCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const translateX = useSpring(mouseX, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("relative inline-flex", className)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              x: translateX,
              translateX: "-50%",
              marginTop: "12px",
            }}
            className="pointer-events-none z-50 w-64 origin-top overflow-hidden rounded-xl border border-line bg-bg shadow-lg"
          >
            {/* accent top border */}
            <div className="h-0.5 w-full bg-ink" />
            <div className="flex gap-3 p-4">
              {/* Avatar */}
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line bg-surface">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-ink-2">
                    {name.charAt(0)}
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="min-w-0 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-ink">
                    {name}
                  </p>
                  <p className="shrink-0 text-[11px] text-ink-3">{role}</p>
                </div>
                <p className="text-xs leading-relaxed text-ink-2">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
