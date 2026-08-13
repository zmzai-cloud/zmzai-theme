"use client";

import { type ReactNode } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({
  children,
  className,
  align = "start",
  sideOffset = 4,
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[10rem] overflow-hidden rounded-lg border border-line bg-bg p-1 shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  children,
  className,
  onSelect,
  destructive,
}: {
  children: ReactNode;
  className?: string;
  onSelect?: () => void;
  destructive?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-surface-2 focus:text-ink data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        destructive ? "text-danger focus:bg-danger/10" : "text-ink-2",
        className
      )}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-line", className)} />;
}

export function DropdownMenuLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("px-2.5 py-1.5 text-xs font-semibold text-ink-3", className)}>
      {children}
    </div>
  );
}
