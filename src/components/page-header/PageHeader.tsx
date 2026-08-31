"use client";

/**
 * PageHeader — 页面标题统一组件
 *
 * v0.9.4 引入。此前 agent / relay 两站共 38 个页面各自手写 h1：
 * 标题旁 0 图标、字号分 4~5 档（text-sm / text-lg / text-2xl / text-3xl /
 * text-4xl / CSS clamp）、间距与颜色 token 各有偏差（text-muted-foreground
 * 等旧变量混用）、部分页面缺 text-ink。
 *
 * 纪律：
 *   · 只有两个 variant —— hero（落地页）与 page（其余全部）
 *   · page 一律 text-2xl + 内联图标，不再区分公开页与控制台
 *   · 图标取 currentColor，不引入新色；hero 徽章用 accent 载体（墨底白图）
 *   · 描述统一 text-sm text-ink-2 —— ink-3 只有 3.69:1，副文案不用它
 *
 * v0.9.5 追加 centered（居中 Hero，/quill 首页用）。
 */

import type { ReactNode } from "react";
import { Icon, type IconName } from "../icon/Icon";

export interface PageHeaderProps {
  /** 眉标：页面所属分区，如「控制台」「长期上下文」。hero 变体下作为统计/kicker 行。 */
  eyebrow?: ReactNode;
  /** 页面标题，渲染为 h1 */
  title: ReactNode;
  /** 标题左侧内联图标（page 变体）或墨底徽章内容（hero 变体） */
  icon?: IconName;
  /** 标题下方描述 */
  description?: ReactNode;
  /** 右侧操作区（按钮、筛选器等） */
  actions?: ReactNode;
  /** hero = 落地页（44px 墨底徽章 + text-4xl）；page = 其余全部（内联图标 + text-2xl） */
  variant?: "page" | "hero";
  /** 居中构图，仅 hero 生效（/quill 首页这类居中 Hero） */
  centered?: boolean;
  /** 追加到根元素 */
  className?: string;
  /** 追加到 h1（详情页标题过长时用 truncate） */
  titleClassName?: string;
}

export function PageHeader({
  eyebrow,
  title,
  icon,
  description,
  actions,
  variant = "page",
  centered = false,
  className = "",
  titleClassName = "",
}: PageHeaderProps) {
  if (variant === "hero") {
    const align = centered ? "items-center text-center" : "";
    return (
      <header className={`flex flex-col ${align} ${className}`}>
        {icon ? (
          <span
            className={`mb-4 grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-ink ${centered ? "mx-auto" : ""}`}
          >
            <Icon name={icon} size={22} strokeWidth={1.25} />
          </span>
        ) : null}
        {eyebrow ? (
          <small className="mb-2 block font-mono text-xs tracking-wide text-ink-3">{eyebrow}</small>
        ) : null}
        <h1
          className={`font-serif text-4xl font-bold leading-tight tracking-tight text-ink ${titleClassName}`}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={`mt-4 max-w-2xl text-lg leading-8 text-ink-2 ${centered ? "mx-auto" : ""}`}
          >
            {description}
          </p>
        ) : null}
        {actions ? (
          <div
            className={`mt-7 flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}
          >
            {actions}
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <header className={`flex flex-wrap items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        {eyebrow ? (
          <small className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-3">
            {eyebrow}
          </small>
        ) : null}
        <div className="flex min-w-0 items-center gap-2">
          {icon ? <Icon name={icon} size={20} className="shrink-0 text-ink" /> : null}
          <h1
            className={`font-serif text-2xl font-semibold tracking-tight text-ink ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
        {description ? <p className="mt-2 text-sm leading-6 text-ink-2">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
