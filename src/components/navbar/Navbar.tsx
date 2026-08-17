"use client";

import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Logo } from "../../brand/logo";
import { Wordmark } from "../../brand/wordmark";

/**
 * navItemClass — 导航项统一样式（全域导航一致）。
 *
 * active 时深墨 pill 高亮（bg-ink text-white），其余 hover 浮现。
 * 链接本身由调用方渲染（Next.js 用 next/link，保持 SPA 导航），
 * 只要都套这个 className，任何站点的导航观感就完全一致。
 */
export function navItemClass(active: boolean): string {
  return cn(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "bg-ink text-white"
      : "text-ink-2 hover:bg-surface-2 hover:text-ink"
  );
}

export interface NavbarProps {
  /** Wordmark 后缀，如 "agent" / "relay"（品牌区自动 Logo + Wordmark） */
  sublabel?: string;
  /** 品牌区自定义（默认 Logo + Wordmark）；传了则忽略 sublabel */
  brand?: ReactNode;
  /** 中间导航区（建议用 next/link 包 navItemClass(active)） */
  children?: ReactNode;
  /** 右侧操作区（用户信息 / 退出 / 入口按钮等） */
  actions?: ReactNode;
  /** 品牌区右侧的附属徽章（如域名 a.zmzai.cloud） */
  badge?: ReactNode;
  className?: string;
}

/**
 * Navbar — 全域统一顶栏。
 *
 * 左：品牌区（Logo + Wordmark）；中：导航；右：操作区。
 * 固定高度 3.5rem，paper 底色 + 模糊，底部细线。
 * 各站（agent / relay / auth / hub）都消费这一个组件，保证导航一致。
 *
 * @example
 * <Navbar sublabel="agent" badge={<span>a.zmzai.cloud</span>} actions={<LogoutButton />}>
 *   <Link href="/fw" className={navItemClass(pathname === "/fw")}>新任务</Link>
 *   <Link href="/audit" className={navItemClass(pathname === "/audit")}>运行审计</Link>
 * </Navbar>
 */
export function Navbar({ sublabel, brand, children, actions, badge, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-line bg-paper/80 px-5 backdrop-blur-md",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        {brand ?? (
          <span className="inline-flex items-center gap-2">
            <Logo size={22} />
            <Wordmark size={16} sublabel={sublabel} />
          </span>
        )}
        {badge}
      </div>
      {children ? (
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto" aria-label="主导航">
          {children}
        </nav>
      ) : null}
      {actions ? <div className="flex shrink-0 items-center gap-2.5">{actions}</div> : null}
    </header>
  );
}
