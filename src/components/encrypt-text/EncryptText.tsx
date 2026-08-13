"use client";

import { useCallback, useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface EncryptTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** The final decrypted text */
  text: string;
  /** Total decrypt duration in seconds */
  duration?: number;
  /** When to trigger the effect */
  trigger?: "mount" | "hover";
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

/**
 * EncryptText — text that starts scrambled and "decrypts" to the real text.
 *
 * Uses requestAnimationFrame to cycle random characters, then settles each
 * character to its real value progressively over `duration`.
 *
 * - `trigger="mount"` (default): decrypts on mount
 * - `trigger="hover"`: waits until hovered, then decrypts
 *
 * @example
 * <EncryptText text="ACCESS_GRANTED" duration={2} />
 * <EncryptText text="Hover me" trigger="hover" />
 */
export function EncryptText({
  text,
  duration = 2,
  trigger = "mount",
  className,
  ...props
}: EncryptTextProps) {
  const [display, setDisplay] = useState(
    trigger === "mount" ? text : text
  );
  const [active, setActive] = useState(trigger === "mount");
  const rafRef = useRef<number | null>(null);

  const run = useCallback(() => {
    const totalChars = text.length;
    const startTime = performance.now();
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      const revealedCount = Math.floor(progress * totalChars);

      let out = "";
      for (let i = 0; i < totalChars; i++) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
        } else if (i < revealedCount) {
          out += ch;
        } else {
          out += randomChar();
        }
      }
      setDisplay(out);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        rafRef.current = null;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (active) run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, run]);

  const handleMouseEnter = () => {
    if (trigger === "hover" && !active) setActive(true);
  };

  return (
    <span
      className={cn("font-mono", trigger === "hover" && "cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {display}
    </span>
  );
}
