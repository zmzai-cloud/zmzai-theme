"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../../components/icon/Icon";
import "./reasoning.css";

/**
 * Reasoning — 思考过程折叠块（v0.9.8 计时）。
 *
 * 标签行显示思考时长：文本持续增长时「思考中 Ns」，停止增长 1.5s 后
 * 「已思考 Ns」——流式体验与主流（Claude / o3 的 Thought for Xs）对齐。
 * 运行中自动展开（呼吸圆点），完成后收起为标签行，点击回看。
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

  const label = thinking
    ? `思考中 ${seconds ? `${seconds}s` : "…"}`
    : seconds > 0
      ? `已思考 ${seconds}s`
      : "思考过程";

  return (
    <div className="zmz-reasoning">
      <button type="button" className="zmz-reasoning-toggle" aria-expanded={expanded} onClick={() => setOpen((value) => !value)}>
        <span className={`zmz-reasoning-dot ${active || thinking ? "live" : ""}`} aria-hidden />
        <span>{label}</span>
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
