"use client";

import { cn } from "../../utils/cn";
import { Logo } from "../logo";
import { Wordmark } from "../wordmark";

/**
 * BrandLockup — 全站统一的品牌锁标：云朵 Logo + ZMZAI wordmark + 子站标。
 *
 * 背景（2026-08-31）：theme 有两套骨架，品牌区 API 不对称 ——
 * Navbar 内置 Logo + Wordmark，AppShell 的 brand 只吃 {label, suffix} 文本。
 * 结果走 Navbar 的站（Folio / Quill / Index / auth）有云朵标，
 * 走 AppShell 的站（Tome / Plate / Margin）没有。抽成一处，谁都不许自造。
 *
 * 纪律（BRAND §7.7）：
 *   · 云朵 Logo 只出现在品牌锁标里，不单独当装饰散落在页面各处
 *   · 子站标是站点对外的品牌名（书写系列），不是技术仓库名
 *
 * @example
 * <BrandLockup sublabel="tome" />                     // 白底（默认）
 * <BrandLockup sublabel="auth" tone="dark" />          // 墨底叙事区
 */
export interface BrandLockupProps {
  /** 云朵标直径（px），默认 22 —— 全站统一，不要按场景私调 */
  logoSize?: number;
  /** wordmark 字号（px），默认 16 */
  markSize?: number;
  /** ZMZAI 后的子站标，如 "tome" / "quill" / "auth" */
  sublabel?: string;
  /** 墨底载体：云朵标反白、文字转暗底配色，默认 "light" */
  tone?: "light" | "dark";
  className?: string;
}

export function BrandLockup({
  logoSize = 22,
  markSize = 16,
  sublabel,
  tone = "light",
  className,
}: BrandLockupProps) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 select-none",
        dark && "text-dark-ink",
        className,
      )}
    >
      <Logo size={logoSize} inverted={dark} />
      <Wordmark
        size={markSize}
        sublabel={sublabel}
        // 墨底时压掉 Wordmark 子标自带的 text-ink-3（暗底上不可读）。
        // 任意变体选择器特异性高于单类名，能可靠覆盖。
        className={dark ? "[&>span]:text-dark-ink/45" : undefined}
      />
    </span>
  );
}
