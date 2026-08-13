"use client";

import { type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * DialogContent — animated modal content (Radix + framer-motion spring).
 *
 * Uses Radix for focus trap / escape / portal, framer-motion for
 * scale+fade spring animation on open/close.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger asChild><Button>打开</Button></DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>确认操作</DialogTitle>
 *       <DialogDescription>此操作不可撤销。</DialogDescription>
 *     </DialogHeader>
 *     <p>内容…</p>
 *     <DialogFooter>
 *       <DialogClose asChild><Button variant="secondary">取消</Button></DialogClose>
 *       <DialogClose asChild><Button>确认</Button></DialogClose>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */
export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
            "rounded-xl border border-line bg-bg p-6 shadow-xl",
            className
          )}
        >
          {children}
        </motion.div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4 flex flex-col gap-1", className)}>{children}</div>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-6 flex justify-end gap-2", className)}>{children}</div>;
}

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;
