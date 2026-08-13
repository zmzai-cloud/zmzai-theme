"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface AceternitySidebarItem {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
}

export interface AceternitySidebarProps {
  items: AceternitySidebarItem[];
  className?: string;
  /** Called when an item is clicked (item index passed) */
  onNavigate?: (item: AceternitySidebarItem, index: number) => void;
}

const COLLAPSED_WIDTH = 64; // ~60px narrow
const EXPANDED_WIDTH = 240;

/**
 * AceternitySidebar — collapsible sidebar that expands on hover.
 *
 * Collapsed state shows icons only (~60px); hovering expands to show full
 * labels (~240px). Smooth width transition via framer-motion layout animation.
 *
 * @example
 * const items = [
 *   { icon: <HomeIcon />, label: "首页", active: true },
 *   { icon: <SettingsIcon />, label: "设置" },
 * ];
 * <AceternitySidebar items={items} onNavigate={(item) => console.log(item)} />
 */
export function AceternitySidebar({
  items,
  className,
  onNavigate,
}: AceternitySidebarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 flex h-screen flex-col overflow-hidden border-r border-line bg-bg py-3",
        className
      )}
    >
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            expanded={expanded}
            onClick={() => onNavigate?.(item, index)}
          />
        ))}
      </nav>
    </motion.aside>
  );
}

function SidebarItem({
  item,
  expanded,
  onClick,
}: {
  item: AceternitySidebarItem;
  expanded: boolean;
  onClick: () => void;
}) {
  const content = (
    <>
      {/* Active indicator bar */}
      {item.active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-ink"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
          item.active ? "text-ink" : "text-ink-2"
        )}
      >
        {item.icon}
      </span>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "overflow-hidden whitespace-nowrap text-sm font-medium",
              item.active ? "text-ink" : "text-ink-2"
            )}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  const baseClass = cn(
    "relative flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-2",
    item.active && "bg-surface-2"
  );

  if (item.href) {
    return (
      <a href={item.href} className={baseClass} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={baseClass} onClick={onClick}>
      {content}
    </button>
  );
}
