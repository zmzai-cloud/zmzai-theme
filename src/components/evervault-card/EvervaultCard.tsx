"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface EvervaultCardProps {
  children: ReactNode;
  className?: string;
  /** Text shown scrambled as random chars until hovered (default "ENCRYPTED") */
  encryptedText?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

/**
 * EvervaultCard — a dark "encrypted" card whose label shows random chars
 * that resolve into the real text on hover.
 *
 * On mount the label scrambles through random characters. When hovered, the
 * scramble resolves character-by-character into `encryptedText` (kept even
 * when not hovered, so the label is meaningful — the scramble is the
 * effect). Children are revealed/focused on hover.
 *
 * @example
 * <EvervaultCard encryptedText="DECRYPTED">
 *   <div className="text-white">隐藏内容</div>
 * </EvervaultCard>
 */
export function EvervaultCard({
  children,
  className,
  encryptedText = "ENCRYPTED",
}: EvervaultCardProps) {
  const [hovered, setHovered] = useState(false);
  const [display, setDisplay] = useState(() => scramble(encryptedText.length));
  const frame = useRef<number | null>(null);

  useEffect(() => {
    function tick(progress: number) {
      const revealed = Math.floor(progress * encryptedText.length);
      const next = encryptedText
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          return i < revealed ? ch : randomChar();
        })
        .join("");
      setDisplay(next);
    }

    if (hovered) {
      // Resolve: animate reveal from 0 → 1 over ~600ms
      cancelAnimationFrame(frame.current ?? 0);
      const start = performance.now();
      const duration = 600;
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        tick(p);
        if (p < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    } else {
      // Scramble: keep cycling random chars
      cancelAnimationFrame(frame.current ?? 0);
      const interval = setInterval(() => {
        setDisplay(scramble(encryptedText.length));
      }, 60);
      return () => clearInterval(interval);
    }

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [hovered, encryptedText]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative flex flex-col items-center gap-6 overflow-hidden rounded-xl border border-dark-line bg-dark-bg p-8",
        className
      )}
    >
      {/* The encrypted / resolving label */}
      <div className="font-mono text-sm tracking-widest text-dark-ink/70 select-none">
        {display}
      </div>

      {/* Children — fade up on hover */}
      <motion.div
        className="relative z-10 w-full"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0.4, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function scramble(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += randomChar();
  return out;
}
