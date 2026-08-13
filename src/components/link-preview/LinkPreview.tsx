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

export interface LinkPreviewProps {
  /** The trigger element — typically an <a> or text */
  children: ReactNode;
  url: string;
  title: string;
  description: string;
  /** Optional preview image URL */
  image?: string;
  className?: string;
}

/**
 * LinkPreview — hover a link to reveal a floating preview card.
 *
 * On hover, a card (image + title + description) fades/scales in and
 * follows the cursor horizontally. Based on Aceternity's Link Preview,
 * adapted to the zmzai monochrome palette.
 *
 * @example
 * <LinkPreview
 *   url="https://example.com"
 *   title="示例标题"
 *   description="一段描述文字"
 *   image="/og.png"
 * >
 *   <a href="https://example.com">悬停查看</a>
 * </LinkPreview>
 */
export function LinkPreview({
  children,
  url,
  title,
  description,
  image,
  className,
}: LinkPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // raw mouse position (relative to viewport)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // spring-smoothed for the card
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("relative inline-block", className)}
    >
      {children}

      {/* Floating preview card — portal-free, fixed to viewport */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              // offset so the card sits above the cursor; translate to center
              x: springX,
              y: springY,
              // shift card up & left so it doesn't sit under the cursor
              translateX: "-50%",
              translateY: "-130%",
            }}
            className="pointer-events-none z-50 w-72 origin-bottom overflow-hidden rounded-xl border border-line bg-bg shadow-lg"
          >
            {image && (
              <div className="aspect-video w-full overflow-hidden bg-surface">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1.5 p-4">
              <h4 className="text-sm font-semibold text-ink">{title}</h4>
              <p className="line-clamp-2 text-xs text-ink-2">
                {description}
              </p>
              <p className="truncate text-[11px] text-ink-3">{url}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
