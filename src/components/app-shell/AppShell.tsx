"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";

import { BrandLockup } from "../../brand/brand-lockup";

import { Badge } from "../badge/Badge";
import { Icon, type IconName } from "../icon/Icon";
import { CommandPalette, type AppPaletteItem } from "./CommandPalette";

export type AppNavItem = { label: string; href: string; icon: IconName; keywords?: string };
export type AppNavSection = { label: string; items: AppNavItem[] };
export type { AppPaletteItem } from "./CommandPalette";

/** 消费端注入的链接组件（Next.js 传 next/link 以保持 SPA 导航；缺省用 <a>）。 */
export type AppShellLink = ComponentType<{
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page" | undefined;
}>;

export function appShellIsActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** 无 SPA 需求时的缺省链接：普通 <a>。 */
function DefaultAnchor({ href, className, children, onClick, "aria-current": ariaCurrent }: { href: string; className?: string; children?: ReactNode; onClick?: () => void; "aria-current"?: "page" }) {
  return (
    <a href={href} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}

function SidebarSections({
  sections,
  pathname,
  link: Link,
  onNavigate,
}: {
  sections: AppNavSection[];
  pathname: string;
  link: AppShellLink;
  onNavigate?: () => void;
}) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-0.5">
          <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">{section.label}</p>
          {section.items.map((item) => {
            const active = appShellIsActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors ${
                  active ? "bg-surface-3 font-medium text-ink" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <Icon name={item.icon} size={13} />
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}

/**
 * 全站统一应用外壳（OpenRouter 式交互内核）：
 * 全高左侧 sidebar（分组导航）+ 轻顶栏（标题 + ⌘K）+ 侧栏底部账户块。
 * 站点无关：导航分组、品牌区、账户块、链接组件均由调用方注入；
 * relay 的 RelayShell / sandbox 的 SandboxShell 是它的薄封装。
 */
export function AppShell({
  brand,
  sections,
  pathname,
  link,
  account = null,
  headerExtras = null,
  paletteItems,
  children,
}: {
  /** 品牌区：侧栏顶部与顶栏兜底标题 */
  brand: { label: string; suffix?: string; href?: string };
  /** 侧栏分组导航 */
  sections: AppNavSection[];
  /** 当前路径（消费端传 usePathname() ?? "/"；theme 不依赖 next） */
  pathname: string;
  /** 链接组件（Next.js 站传 next/link） */
  link?: AppShellLink;
  /** 侧栏底部账户块（登录按钮 / 用户信息） */
  account?: ReactNode;
  /** 顶栏右侧扩展（余额、状态等） */
  headerExtras?: ReactNode;
  /** ⌘K 命令面板条目；为空时顶栏不显示搜索按钮 */
  paletteItems?: AppPaletteItem[];
  children: ReactNode;
}) {
  const Link = (link ?? DefaultAnchor) as AppShellLink;
  const hasPalette = Boolean(paletteItems?.length);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // 顶栏标题：当前激活项的 label（取最长匹配，/admin/models 优先于 /admin）
  const currentLabel = useMemo(() => {
    const matches = sections.flatMap((s) => s.items).filter((item) => appShellIsActive(pathname, item.href));
    if (!matches.length) return brand.label;
    return matches.sort((a, b) => b.href.length - a.href.length)[0].label;
  }, [pathname, sections, brand.label]);

  // ⌘K / Ctrl+K 全局快捷键
  useEffect(() => {
    if (!hasPalette) return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasPalette]);

  const brandBlock = (
    <Link href={brand.href ?? "/"} className="flex flex-col gap-1 px-2">
      {/* 品牌区统一走 BrandLockup（2026-08-31 抽出，与 Navbar 共用一份锁标）。
          label 同时是顶栏兜底标题与子站标，两处语义一致。 */}
      <BrandLockup sublabel={brand.label} />
      {brand.suffix ? <span className="font-mono text-[10px] text-ink-3">{brand.suffix}</span> : null}
    </Link>
  );

  return (
    <div className="min-h-dvh bg-bg">
      {hasPalette ? <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={paletteItems!} /> : null}

      {/* 移动端抽屉 */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" role="presentation">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <nav className="absolute inset-y-0 left-0 flex w-64 flex-col gap-5 overflow-y-auto border-r border-line bg-bg px-3 py-4">
            {brandBlock}
            <SidebarSections sections={sections} pathname={pathname} link={Link} onNavigate={() => setDrawerOpen(false)} />
            {account}
          </nav>
        </div>
      ) : null}

      <div className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        {/* 桌面固定侧栏 */}
        <aside className="sticky top-0 hidden h-dvh flex-col gap-5 overflow-y-auto border-r border-line px-3 py-4 lg:flex">
          {brandBlock}
          <SidebarSections sections={sections} pathname={pathname} link={Link} />
          {account}
        </aside>

        <div className="flex min-h-dvh min-w-0 flex-col">
          {/* 轻顶栏 */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/95 px-4 py-2.5 backdrop-blur lg:px-8">
            <button
              type="button"
              aria-label="打开导航"
              onClick={() => setDrawerOpen(true)}
              className="rounded-md p-1 text-ink-2 hover:bg-surface hover:text-accent lg:hidden"
            >
              <Icon name="menu" size={16} />
            </button>
            <span className="text-sm font-medium text-ink-2">{currentLabel}</span>
            <div className="ml-auto flex items-center gap-3">
              {headerExtras}
              {hasPalette ? (
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
                  aria-label="打开命令面板"
                >
                  <Icon name="search" size={12} />
                  <span className="hidden sm:inline">搜索</span>
                  <kbd className="hidden sm:inline">⌘K</kbd>
                </button>
              ) : null}
            </div>
          </header>

          {/* 内容区 */}
          <main className="page-shell flex-1 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

/** 侧栏账户块通用样式辅助：登录后的用户信息行。 */
export function AppShellAccountRow({ name, badge, children }: { name: string; badge?: string; children?: ReactNode }) {
  return (
    <div className="mt-auto flex flex-col gap-2 border-t border-line px-2 pt-3">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-xs text-ink-2">{name}</span>
        {badge ? <Badge variant="outline" size="sm">{badge}</Badge> : null}
      </div>
      {children ? <div className="flex items-center justify-between gap-2 font-mono text-[11px]">{children}</div> : null}
    </div>
  );
}
