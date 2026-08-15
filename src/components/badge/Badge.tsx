"use client";

import { type HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm font-medium text-xs whitespace-nowrap",
  {
    variants: {
      variant: {
        solid: "bg-ink text-white",
        outline: "border border-line text-ink-2",
        success: "border border-success/30 bg-success/10 text-success",
        warning: "border border-warning/30 bg-warning/10 text-warning",
        danger: "border border-danger/30 bg-danger/10 text-danger",
        accent: "border border-accent/30 bg-accent/10 text-accent",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent";
  size?: "sm" | "md";
}

/**
 * Badge — small status/label indicator.
 *
 * @example
 * <Badge variant="solid">活跃</Badge>
 * <Badge variant="success">● 完成</Badge>
 * <Badge variant="accent">需要审批</Badge>
 */
export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
