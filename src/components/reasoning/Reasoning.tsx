"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../../components/icon/Icon";
import "./reasoning.css";

/**
 * Reasoning — 思考过程折叠块。
 *
 * 运行中自动展开（呼吸圆点），完成后收起为标签行，点击回看。
 * 展开内容渐显（AnimatePresence）。
 *
 * @example
 * <Reasoning text={chainOfThought} active={isStreaming} />
 */
export function Reasoning({ text, active = false }: { text: string; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const expanded = active || open;
  return (
    <div className="zmz-reasoning">
      <button type="button" className="zmz-reasoning-toggle" aria-expanded={expanded} onClick={() => setOpen((value) => !value)}>
        <span className={`zmz-reasoning-dot ${active ? "live" : ""}`} aria-hidden />
        <span>思考过程</span>
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
