"use client";

import { type ReactNode, useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { Logo } from "../../brand/logo";
import { Wordmark } from "../../brand/wordmark";
import { Icon } from "../icon/Icon";

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
  /** 品牌区点击链接（通常回首页，如 "/"）；不传则品牌区不可点击 */
  brandHref?: string;
  /** 开启移动端菜单：<md 断点时导航与操作区收进汉堡下拉（默认 false 保持横向滚动） */
  mobileMenu?: boolean;
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
export function Navbar({ sublabel, brand, children, actions, badge, brandHref, mobileMenu = false, className }: NavbarProps) {
  const [open, setOpen] = useState(false);

  // Esc 关闭面板
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const brandNode = brand ?? (
    <span className="inline-flex items-center gap-2">
      <Logo size={22} />
      <Wordmark size={16} sublabel={sublabel} />
    </span>
  );
  const nav = children ? (
    <nav
      className="flex min-w-0 items-center gap-1 overflow-x-auto"
      aria-label="主导航"
    >
      {children}
    </nav>
  ) : null;
  const actionBox = actions ? (
    <div className="flex shrink-0 items-center gap-2.5">{actions}</div>
  ) : null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-line bg-paper/80 px-5 backdrop-blur-md",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        {brandHref ? (
          <a href={brandHref} className="inline-flex items-center">
            {brandNode}
          </a>
        ) : (
          brandNode
        )}
        {badge}
      </div>

      {mobileMenu ? (
        <>
          {/* 桌面端：导航 + 操作区原样 */}
          <div className="hidden min-w-0 items-center gap-2.5 md:flex">
            {nav}
            {actionBox}
          </div>

          {/* 移动端：汉堡按钮 + 下拉面板（点击面板内任意处关闭） */}
          <div className="relative md:hidden">
            <button
              type="button"
              aria-label={open ? "关闭菜单" : "打开菜单"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <Icon name={open ? "cross" : "menu"} size={16} />
            </button>
            {open ? (
              <div
                onClick={() => setOpen(false)}
                className="absolute right-0 top-full mt-2 flex w-60 flex-col gap-1 rounded-xl border border-line bg-paper p-2 shadow-lg"
              >
                {children ? (
                  <nav
                    className="flex flex-col items-stretch gap-1"
                    aria-label="主导航"
                  >
                    {children}
                  </nav>
                ) : null}
                {actions ? (
                  <div className="mt-1 flex flex-col items-stretch gap-1 border-t border-line pt-2">
                    {actions}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          {nav}
          {actionBox}
        </>
      )}
    </header>
  );
}
