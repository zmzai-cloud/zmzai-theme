"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Skeleton — a shimmering placeholder block.
 *
 * Renders a neutral block sized by `className` (width/height/radius) with
 * a subtle pulse animation between `bg-surface-2` and `bg-surface`.
 *
 * @example
 * <Skeleton className="h-4 w-48 rounded-md" />
 * <Skeleton className="h-32 w-full rounded-xl" />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "animate-pulse rounded-md bg-surface-2",
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
