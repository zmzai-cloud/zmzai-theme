"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";

export interface CompareProps extends HTMLAttributes<HTMLDivElement> {
  /** Shown on the left (the "before") */
  before: ReactNode;
  /** Shown on the right (the "after") */
  after: ReactNode;
  /** Initial position of the handle as a percentage (0–100) */
  initial?: number;
}

/**
 * Compare — a draggable before/after slider.
 *
 * Renders `before` and `after` layered in the same box. A vertical drag
 * handle clips the `before` layer to the left of the handle; the `after`
 * layer shows through on the right. The `before` content is sized to the
 * full container width so it does not squish as the handle moves.
 *
 * @example
 * <Compare before={<img src="/old.png" />} after={<img src="/new.png" />} />
 */
export function Compare({
  before,
  after,
  initial = 50,
  className,
  ...props
}: CompareProps) {
  const [pos, setPos] = useState(initial);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className={cn(
        "relative select-none overflow-hidden rounded-xl border border-line",
        className
      )}
      style={{ touchAction: "none" }}
      {...props}
    >
      {/* After (base layer, full width) */}
      <div className="absolute inset-0">{after}</div>

      {/* Before (clipped to the left of handle) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div className="h-full" style={{ width: width ? `${width}px` : "100%" }}>
          {before}
        </div>
      </div>

      {/* Drag handle */}
      <div
        className="absolute inset-y-0 z-10 flex w-0.5 cursor-ew-resize items-center justify-center bg-ink"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
