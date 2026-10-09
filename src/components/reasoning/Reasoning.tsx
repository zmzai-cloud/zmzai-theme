"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../../components/icon/Icon";
import "./reasoning.css";

/**
 * Reasoning — 思考过程折叠行（v0.9.12 ZCode 式）。
 *
 * 折叠态是一行灰色弱化文本：`[脑图标] 思考 · 持续了 Ns`，无边框、无背景，
 * 与工具过程行（ToolCard）同层级同形态；进行中为「思考中 Ns」且图标呼吸。
 * 运行中自动展开，完成后收起为标签行，点击回看。
 *
 * @example
 * <Reasoning text={chainOfThought} active={isStreaming} />
 */
export function Reasoning({ text, active = false }: { text: string; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const expanded = active || open;

  // 思考计时：startedAt = 首次收到文本；lastChangeAt = 最近一次文本变化。
  // 「正在思考」= active，或 1.5s 内文本仍在变化（delta 流）。
  const startedAtRef = useRef<number | null>(null);
  const lastChangeRef = useRef<number>(0);
  const [thinking, setThinking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!text) return;
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
    lastChangeRef.current = Date.now();
    setThinking(true);
  }, [text]);

  useEffect(() => {
    if (!thinking) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const settled = now - lastChangeRef.current > 1500 && !active;
      const secs = Math.max(1, Math.round((now - (startedAtRef.current ?? now)) / 1000));
      setSeconds(secs);
      if (settled) setThinking(false);
    }, 500);
    return () => clearInterval(timer);
  }, [thinking, active]);

  return (
    <div className="zmz-reasoning">
      <button type="button" className="zmz-reasoning-toggle" aria-expanded={expanded} onClick={() => setOpen((value) => !value)}>
        <Icon name="brain" size={13} strokeWidth={1.4} className={active || thinking ? "zmz-reasoning-icon live" : "zmz-reasoning-icon"} />
        <span className="zmz-reasoning-label">{thinking ? `思考中${seconds ? ` ${seconds}s` : "…"}` : "思考"}</span>
        {!thinking && seconds > 0 && (
          <>
            <span className="zmz-reasoning-sep" aria-hidden>·</span>
            <span>持续了 {seconds}s</span>
          </>
        )}
        <Icon name="chevron-down" size={11} className={expanded ? "zmz-chevron open" : "zmz-chevron"} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.pre
            className="zmz-reasoning-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {text}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
}
