"use client";

import { type ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../utils/cn";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "inline-flex h-9 items-center justify-between gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-sm font-medium text-ink outline-none transition-colors",
        "hover:border-ink/40 focus:border-ink data-[placeholder]:text-ink-3",
        className
      )}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  children,
  className,
  position = "popper",
}: {
  children: ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={4}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-line bg-bg p-1 shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
      >
        <SelectPrimitive.Viewport className="w-full">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  children,
  value,
  className,
}: {
  children: ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <SelectPrimitive.Item
      value={value}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-7 pr-2 text-sm outline-none transition-colors",
        "focus:bg-surface-2 focus:text-ink data-[state=checked]:font-semibold data-[highlighted]:bg-surface-2",
        "data-[state=unchecked]:text-ink-2",
        className
      )}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-2 py-1.5 text-xs font-semibold text-ink-3">{children}</div>
  );
}

export function SelectSeparator() {
  return <div className="my-1 h-px bg-line" />;
}
