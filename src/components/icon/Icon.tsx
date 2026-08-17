"use client";

/**
 * 规范图标集 — 16px 网格、1.5px 描边、currentColor、圆角端。
 * 替代 Unicode 字符（+、✓、→）实现的按钮/状态图标。
 * 命名 kebab-case；语义含义命名（grid 四宫格=目录、key=Token…）。
 */
const paths: Record<string, { d: string; fill?: boolean }> = {
  // === 基础操作 ===
  plus: { d: "M8 3.5v9M3.5 8h9" },
  stop: { d: "M4.5 4.5h7v7h-7z", fill: true },
  "new-session": { d: "M4 3.5h8a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V4A.5.5 0 0 1 4 3.5zM8 6v4M6 8h4" },
  check: { d: "M3.5 8.5l3 3 6-7" },
  cross: { d: "M4.5 4.5l7 7M11.5 4.5l-7 7" },
  download: { d: "M8 3v7M5 7.5L8 10.5 11 7.5M4 12.5h8" },
  "arrow-down": { d: "M8 3.5v8M5 8.5L8 11.5 11 8.5" },
  "arrow-right": { d: "M3 8h9.5M8.5 4.5L12 8l-3.5 3.5" },
  "chevron-right": { d: "M6 4l4 4-4 4" },
  "chevron-left": { d: "M10 4l-4 4 4 4" },
  "chevron-down": { d: "M4 6l4 4 4-4" },
  refresh: { d: "M13 8a5 5 0 1 1-1.5-3.6M13 3.5v2.8h-2.8" },
  retry: { d: "M13 8a5 5 0 1 1-1.5-3.6M13 3.5v2.8h-2.8" },
  logout: { d: "M6 4.5h7a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H6M8 8h4.5M10.5 6l2 2-2 2" },
  edit: { d: "M8.8 4.2l3 3L6.5 12.5H3.5v-3zM8 5.5l2.5 2.5" },
  trash: { d: "M4 4.5h8M6.5 4.5V3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1M5 4.5l.5 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.5-8M6.8 7v3.5M9.2 7v3.5" },
  settings: { d: "M8 5.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM8 2.5v1.6M8 11.9v1.6M2.5 8h1.6M11.9 8h1.6M4 4l1.1 1.1M10.9 10.9L12 12M12 4l-1.1 1.1M5.1 10.9L4 12" },
  copy: { d: "M5.5 5.5h7.5v8H5.5zM3.5 3.5h7.5" },
  external: { d: "M4 12V4h4M4 12L12 4M8 3.5h4.5V8" },

  // === 导航/语义 ===
  home: { d: "M2.5 7.5L8 3l5.5 4.5M4 6.5V13.5h8V6.5" },
  grid: { d: "M3.5 3.5h3.5v3.5H3.5zM9 3.5h3.5v3.5H9zM3.5 9h3.5v3.5H3.5zM9 9h3.5v3.5H9z" },
  key: { d: "M11 3.5a3.5 3.5 0 1 1-2 6.3L5.5 13.3 4 11.8l1.4-1.4L4 8.9 5 8l2.2 2.2A3.5 3.5 0 0 1 11 3.5zM11.8 6.2v.01" },
  book: { d: "M4 3h8v10.5H5.8A1.8 1.8 0 0 0 4 15.3zM6.5 6.5h3" },
  wallet: { d: "M2.5 5.5h11v7h-11zM2.5 5.5L10.5 3.2V5.5M10.5 9.5h.01" },
  activity: { d: "M2 8h3l2-4 3 8 2-4h2" },
  receipt: { d: "M4 3.5h8v9l-1.5-1-1 1-1.5-1-1 1-1.5-1-1 1zM6.5 6.5h3M6.5 8.5h3" },
  link: { d: "M6.2 9.8l3.6-3.6M5 11.5l-1 1a2.4 2.4 0 0 1 3.4-3.4l1.4 1.4M11 4.5l1-1a2.4 2.4 0 0 1 3.4 3.4l-1.4 1.4" },
  users: { d: "M5.5 6.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM2.5 12.5c.5-2 1.8-3 3-3s2.5 1 3 3M10.5 4.2a1.8 1.8 0 1 1 0 3.6M10 9.8c1.7.2 3 1.3 3.5 2.7" },
  sliders: { d: "M3 5h4.5M10.5 5H13M3 11h2M8 11h5M7.5 3v4M5 9v4" },
  coins: { d: "M8 3.5c2.5 0 4.5.7 4.5 1.5s-2 1.5-4.5 1.5S3.5 5.8 3.5 5 5.5 3.5 8 3.5zM3.5 8c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5M3.5 5v6c0 .8 2 1.5 4.5 1.5s4.5-.7 4.5-1.5V5" },
  alert: { d: "M8 3l5.5 9.5h-11zM8 7v2.5M8 11.4v.01" },
  "trend-up": { d: "M2.5 11.5l4-4 2.5 2.5L13 5.5M10 5.5h3v3" },
  "check-circle": { d: "M8 2.8a5.2 5.2 0 1 1 0 10.4A5.2 5.2 0 0 1 8 2.8zM5.4 8.2l2 2 3.2-4" },
  gauge: { d: "M13.5 8a5.5 5.5 0 1 1-11 0M8 8l2.4-3.2" },
  bolt: { d: "M9 2.5L4 9h3.5L7 13.5 12 7H8.5z" },
  shield: { d: "M8 2.5l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6v-4zM6 8.5l1.5 1.5L10 7.5" },
  sparkle: { d: "M8 2.5l1.3 4.2L13.5 8l-4.2 1.3L8 13.5l-1.3-4.2L2.5 8l4.2-1.3z" },
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 14, className = "" }: { name: IconName; size?: number; className?: string }) {
  const icon = paths[name];
  if (!icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      fill={icon.fill ? "currentColor" : "none"}
      stroke={icon.fill ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icon.d} />
    </svg>
  );
}
