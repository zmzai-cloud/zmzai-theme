"use client";

import { useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Language label shown in header (e.g. "typescript", "bash") */
  language?: string;
  /** File name shown in header (e.g. "useUsers.ts") */
  filename?: string;
  /** Show copy button (default true) */
  copyable?: boolean;
  /** Max height before scroll (default none) */
  maxHeight?: string;
  className?: string;
}

/**
 * CodeBlock — dark surface code display with syntax highlighting + copy.
 *
 * Uses a monochrome syntax highlight scheme (灰阶 + 粗细 + 斜体),
 * matching zmzai's black-white design language. No rainbow colors.
 *
 * @example
 * <CodeBlock code={`const x = 1;`} language="typescript" filename="index.ts" />
 */
export function CodeBlock({
  code,
  language = "text",
  filename,
  copyable = true,
  maxHeight,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-dark-line bg-dark-bg shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-line bg-dark-surface px-3.5 py-2">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-1 font-mono text-xs font-medium text-dark-ink/70">
            {filename || language}
          </span>
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="font-mono text-[11px] text-ink-3 transition-colors hover:text-dark-ink"
          >
            {copied ? "已复制 ✓" : "复制"}
          </button>
        )}
      </div>

      {/* Body */}
      <div
        className="overflow-x-auto p-3.5"
        style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
      >
        <pre className="font-mono text-[13px] leading-relaxed text-dark-ink">
          <code>{highlightCode(code, language)}</code>
        </pre>
      </div>
    </div>
  );
}

/**
 * Lightweight monochrome syntax highlighter.
 * Uses spans with Tailwind classes: keyword=bold white, string=light gray,
 * comment=medium gray italic, function=light gray italic.
 * Falls back to plain text for unrecognized languages.
 */
function highlightCode(code: string, _language: string): ReactNode {
  // Simple regex-based highlighting for common patterns
  // keyword detection
  const keywordRe =
    /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|async|await|try|catch|throw|typeof|instanceof|void|null|undefined|true|false|this|super|default|switch|case|break|continue|do|in|of|as|enum|public|private|protected|readonly|static|get|set|namespace|declare|abstract|yield|delete|with)\b/g;
  const stringRe = /(["'`])((?:\\.|(?!\1).)*)\1/g;
  const commentRe = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

  // Escape HTML first
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply highlights with placeholder tokens to avoid overlap
  const tokens: { type: string; text: string }[] = [];
  let working = escaped;

  // Comments first (highest priority)
  working = working.replace(commentRe, (match) => {
    tokens.push({ type: "comment", text: match });
    return `\x00${tokens.length - 1}\x00`;
  });

  // Strings
  working = working.replace(stringRe, (match) => {
    tokens.push({ type: "string", text: match });
    return `\x00${tokens.length - 1}\x00`;
  });

  // Keywords
  working = working.replace(keywordRe, (match) => {
    tokens.push({ type: "keyword", text: match });
    return `\x00${tokens.length - 1}\x00`;
  });

  // Rebuild with spans
  const parts = working.split(/\x00(\d+)\x00/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const token = tokens[parseInt(part, 10)];
      const cls =
        token.type === "keyword"
          ? "font-semibold text-dark-ink"
          : token.type === "string"
            ? "text-dark-ink/50"
            : "text-dark-ink/40 italic";
      return (
        <span key={i} className={cls}>
          {token.text}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
