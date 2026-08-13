"use client";

import { forwardRef, type ImgHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import logoSrc from "./zmzai-logo.png";

export interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Size in pixels (width = height, logo is square-cropped) */
  size?: number;
  /** Invert for dark backgrounds (black → white) */
  inverted?: boolean;
}

/**
 * Logo — zmzai 云朵品牌标志.
 *
 * - 亮色背景用黑色 logo（默认）
 * - 暗色背景用 `inverted`（CSS filter 反白）
 *
 * @example
 * <Logo size={28} />            // 黑色，用于白底导航
 * <Logo size={28} inverted />   // 白色，用于黑底 footer
 */
export const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ className, size = 28, inverted, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={logoSrc}
        alt="zmzai"
        width={size}
        height={size}
        className={cn(
          "object-contain",
          inverted && "[filter:invert(1)]",
          className
        )}
        {...props}
      />
    );
  }
);

Logo.displayName = "Logo";
