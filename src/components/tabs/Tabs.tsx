"use client";

import { cn } from "../../utils/cn";

export type TabItem = { value: string; label: React.ReactNode; count?: number };

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/**
 * Tabs — 下划线激活态的水平标签栏（锐角风）。
 *
 * @example
 * <Tabs items={[{value:"a",label:"产物",count:2},{value:"b",label:"改动"}]} value={tab} onValueChange={setTab} />
 */
export function Tabs({ items, value, onValueChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-0 border-b border-line", className)} role="tablist">
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={cn(
              "cursor-pointer border-b-2 px-3 py-2.5 text-xs font-medium transition-colors",
              active ? "border-ink text-ink" : "border-transparent text-ink-3 hover:text-ink-2",
            )}
            onClick={() => onValueChange(item.value)}
          >
            {item.label}
            {typeof item.count === "number" && (
              <span className="ml-1 rounded-full bg-surface-2 px-1.5 text-[10px]">{item.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
