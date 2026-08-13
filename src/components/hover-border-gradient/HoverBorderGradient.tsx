"use client";

import {
  createElement,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";

export interface HoverBorderGradientProps<T extends ElementType = "div">
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
  className?: string;
  /** Element type to render (default "div") */
  as?: T;
  /** Outer container className (the element that receives hover) */
  containerClassName?: string;
}

/**
 * HoverBorderGradient — container/badge whose border sweeps a gradient on hover.
 *
 * Pure CSS (no JS animation). The border is a conic-gradient mask that sits
 * transparent until hover, then sweeps from transparent to ink. Based on
 * Aceternity's Hover Border Gradient, adapted to zmzai's monochrome palette —
 * the sweep uses the ink token rather than a rainbow gradient.
 *
 * @example
 * <HoverBorderGradient as="button" className="rounded-full">
 *   <span className="px-6 py-2">开始体验</span>
 * </HoverBorderGradient>
 */
export function HoverBorderGradient<T extends ElementType = "div">({
  children,
  className,
  containerClassName,
  as,
  ...props
}: HoverBorderGradientProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <>
      {/* Scoped keyframes + mask rules (no global @property needed) */}
      <style>{`
        @keyframes hbg-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Component
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-full border border-line bg-bg transition-colors duration-300 hover:border-transparent",
          containerClassName
        )}
        {...props}
      >
        {/* Gradient sweep layer — sits behind content, masked to the border ring.
            Transparent at rest, fades in + spins on hover. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-[100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            className
          )}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, var(--color-ink) 320deg, transparent 360deg)",
            animation: "hbg-spin 2s linear infinite",
          }}
        />
        {/* Inner content with solid background so only the 1px ring shows the sweep */}
        <span className="relative z-10 block rounded-full bg-bg px-6 py-2.5">
          {children}
        </span>
      </Component>
    </>
  );
}
