"use client";

import { useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TypewriterProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to type out */
  text: string;
  /** Milliseconds per character */
  speed?: number;
  /** Show a blinking caret while typing */
  cursor?: boolean;
}

/**
 * Typewriter — classic character-by-character typing effect.
 *
 * Types out `text` one character at a time at `speed` ms per char.
 * An optional blinking block cursor is shown while typing.
 *
 * @example
 * <Typewriter text="$ npm install @zmzai/theme" speed={50} />
 * <Typewriter text="No cursor" cursor={false} />
 */
export function Typewriter({
  text,
  speed = 50,
  cursor = true,
  className,
  ...props
}: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!text) return;

    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  const done = count >= text.length;

  return (
    <span className={cn("font-mono", className)} {...props}>
      {text.slice(0, count)}
      {cursor && (
        <span
          className={cn(
            "ml-0.5 inline-block w-[2px] self-stretch bg-ink align-middle",
            !done && "animate-pulse"
          )}
          style={{ height: "1em" }}
        >
          &nbsp;
        </span>
      )}
    </span>
  );
}
