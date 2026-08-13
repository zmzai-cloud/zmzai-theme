"use client";

import { useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text / fallback initials */
  alt?: string;
  /** Size in px (default 32) */
  size?: number;
  /** Shape (default circle) */
  shape?: "circle" | "square";
}

/**
 * Avatar — user/agent avatar with image + initials fallback.
 *
 * If `src` fails to load, shows initials from `alt` on a neutral background.
 *
 * @example
 * <Avatar src="/me.png" alt="牧之" size={32} />
 * <Avatar alt="AI" size={28} shape="square" />
 */
export function Avatar({
  src,
  alt = "",
  size = 32,
  shape = "circle",
  className,
  ...props
}: AvatarProps) {
  const [error, setError] = useState(false);
  const initials = alt.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center overflow-hidden bg-surface-2 text-ink-2 font-semibold",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
