"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  /** 尺寸：sm=h-6 md=h-7 lg=h-8（密集工具条场景，不做 hover 缩放） */
  size?: "sm" | "md" | "lg";
  /** 视觉：ghost=透明 hover 背景；quiet=无 hover 背景只有颜色变化 */
  tone?: "ghost" | "quiet";
  label?: string;
}

/**
 * IconButton — 密集场景的纯图标按钮。
 *
 * 与 Button 的区别：不做 framer-motion hover 缩放（工具条里会跳），
 * 尺寸更小（6/7/8），tone=quiet 时连背景都没有（纯颜色 hover）。
 *
 * @example
 * <IconButton label="重命名"><Icon name="edit" size={12} /></IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "md", tone = "ghost", label, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-ink-3 transition-colors disabled:pointer-events-none disabled:opacity-40",
          size === "sm" && "h-6 w-6",
          size === "md" && "h-7 w-7",
          size === "lg" && "h-8 w-8",
          tone === "ghost" && "hover:bg-surface-2 hover:text-ink",
          tone === "quiet" && "hover:text-ink",
          className,
        )}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
