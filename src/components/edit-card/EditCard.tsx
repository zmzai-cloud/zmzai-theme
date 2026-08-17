"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../../components/icon/Icon";
import { DiffView } from "../../components/diff-view";
import "./edit-card.css";

/**
 * EditCard — 文件改动卡：路径 + 修订号头部，展开看彩色 diff。
 *
 * 展开内容用 theme DiffView 渲染，AnimatePresence 渐显。
 *
 * @example
 * <EditCard path="src/app.ts" revision="rev_abc123" diff={unifiedDiff} />
 */
export function EditCard({ path, revision, diff }: { path: string; revision: string; diff: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="zmz-edit-card">
      <button type="button" className="zmz-edit-head" onClick={() => setOpen((value) => !value)}>
        <Icon name="chevron-down" size={11} className={open ? "zmz-chevron open" : "zmz-chevron"} />
        <span className="zmz-edit-path">{path}</span>
        <small>{revision.slice(0, 12)}</small>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="zmz-edit-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <DiffView diff={diff} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
