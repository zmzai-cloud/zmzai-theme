"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface FileUploadProps {
  /** Called with each file selected/dropped */
  onChange: (file: File) => void;
  /** Accepted file types, e.g. ".pdf,image/*" */
  accept?: string;
  /** Allow multiple file selection (onChange still fires per file) */
  multiple?: boolean;
  className?: string;
  /** Custom inner content; defaults to the upload prompt */
  children?: ReactNode;
}

/**
 * FileUpload — drag-and-drop upload zone with a dotted grid backdrop.
 *
 * Renders a clickable drop area. Supports drag-over highlight and
 * click-to-browse via a hidden `<input type="file">`. Based on Aceternity's
 * File Upload, adapted to the zmzai monochrome palette.
 *
 * @example
 * <FileUpload accept="image/*" onChange={(f) => upload(f)}>
 *   <span>拖拽或点击上传</span>
 * </FileUpload>
 */
export function FileUpload({
  onChange,
  accept,
  multiple,
  className,
  children,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      if (multiple) {
        Array.from(files).forEach((f) => onChange(f));
      } else {
        onChange(files[0]);
      }
    },
    [onChange, multiple]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // reset so selecting the same file again still fires onChange
      e.target.value = "";
    },
    [handleFiles]
  );

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      className={cn(
        "relative flex min-h-48 w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-200",
        "border-line bg-surface hover:border-ink/40 hover:bg-surface-2",
        dragging && "border-ink bg-surface-2",
        className
      )}
    >
      {/* Dotted grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          color: "rgba(0,0,0,0.05)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {children ?? (
          <>
            <UploadIcon />
            <div className="space-y-1">
              <p className="text-sm font-medium text-ink">
                拖拽文件到此处，或点击浏览
              </p>
              <p className="text-xs text-ink-3">
                {accept ? `支持 ${accept}` : "支持任意类型文件"}
              </p>
            </div>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </motion.div>
  );
}

function UploadIcon() {
  return (
    <svg
      className="h-8 w-8 text-ink-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </svg>
  );
}
