"use client";

import { motion } from "framer-motion";

import { Icon } from "../../components/icon/Icon";
import "./artifact-card.css";

export interface ArtifactCardProps {
  /** 产物路径（文件名） */
  path: string;
  /** 元信息行（如 "pptx · 1.2 MiB"） */
  meta: string;
  /** 有预览时显示的提示角标 */
  previewHint?: boolean;
  /** 下载直链（无则不渲染下载按钮） */
  downloadUrl?: string;
  /** 点击卡片（打开预览） */
  onOpen?: () => void;
}

/** MIME → 卡片短类型名；未知长类型取 subtype 末段。 */
export function shortContentType(contentType: string): string {
  const type = contentType.split(";")[0]!.trim().toLowerCase();
  const known: Record<string, string> = {
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/pdf": "pdf",
    "application/json": "json",
    "application/zip": "zip",
    "text/html": "html",
    "text/markdown": "md",
    "text/plain": "txt",
    "text/css": "css",
  };
  if (known[type]) return known[type]!;
  const sub = type.split("/").pop() ?? "file";
  if (sub.length <= 14) return sub;
  const tail = sub.split(".").pop() ?? sub;
  return tail.length <= 14 ? tail : "file";
}

export function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KiB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MiB`;
}

/**
 * ArtifactCard — 产物卡：路径 + 类型/大小 meta + 预览角标 + 下载。
 *
 * hover 抬升 + 印章红描边渐现（炫酷），入场淡入。
 * 显式 grid 定位防超长 MIME 撑爆布局。
 *
 * @example
 * <ArtifactCard path="报告.pptx" meta={`${shortContentType(m)} · ${formatBytes(b)}`} previewHint onOpen={open} downloadUrl={url} />
 */
export function ArtifactCard({ path, meta, previewHint, downloadUrl, onOpen }: ArtifactCardProps) {
  return (
    <motion.button
      type="button"
      className="zmz-artifact-card"
      onClick={onOpen}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      <span className="zmz-artifact-name">{path}</span>
      <span className="zmz-artifact-meta">{meta}</span>
      <span className="zmz-artifact-actions">
        {previewHint && <span className="zmz-artifact-preview-hint">预览</span>}
        {downloadUrl && (
          <a className="zmz-artifact-download" href={downloadUrl} onClick={(event) => event.stopPropagation()}>
            <Icon name="download" size={12} />
          </a>
        )}
      </span>
    </motion.button>
  );
}
