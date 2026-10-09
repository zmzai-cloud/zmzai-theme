import type { IconName } from "../icon/Icon";

/** 工具调用状态 — 与 agent-framework ToolState 对齐的通用形状。 */
export type ToolState =
  | { status: "pending"; input: unknown }
  | { status: "running"; input: unknown; title?: string; time: { start: string } }
  | {
      status: "completed";
      input: unknown;
      output: string;
      title: string;
      metadata?: Record<string, unknown>;
      time: { start: string; end: string };
    }
  | { status: "error"; input: unknown; error: string; time: { start: string; end: string } };

/** 单次工具调用（会话事件投影中的 tool part，去掉 message/session 归属字段）。 */
export type ToolCall = {
  id: string;
  tool: string;
  state: ToolState;
};

/** 工具行元数据（ZCode 式过程行「图标 名称 · 摘要」）：
 *  label 是行首人类可读名（中文动词，与 Zcode 的「查阅/执行」一致），
 *  glyph 是语义图标名（默认放大镜——Zcode 对未知工具也归入查阅类）。 */
const TOOL_META: Record<string, { label: string; glyph: IconName }> = {
  read: { label: "读取", glyph: "search" },
  glob: { label: "查找", glyph: "search" },
  grep: { label: "搜索", glyph: "search" },
  search: { label: "检索", glyph: "search" },
  websearch: { label: "检索", glyph: "search" },
  bash: { label: "执行", glyph: "terminal" },
  terminal: { label: "执行", glyph: "terminal" },
  edit: { label: "编辑", glyph: "edit" },
  write: { label: "写入", glyph: "edit" },
  webfetch: { label: "抓取", glyph: "search" },
  web_fetch: { label: "抓取", glyph: "search" },
  task: { label: "子任务", glyph: "users" },
};

export function toolLabel(tool: string): string {
  return TOOL_META[tool]?.label ?? tool;
}

export function toolGlyph(tool: string): string {
  return TOOL_META[tool]?.glyph ?? "search";
}

export function toolDuration(call: ToolCall): string | null {
  const state = call.state;
  if (state.status === "pending") return null;
  if (!state.time || !("end" in state.time)) return null;
  const ms = new Date(state.time.end).getTime() - new Date(state.time.start).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  if (ms < 1000) return `${Math.max(1, Math.round(ms))}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(ms < 10_000 ? 1 : 0)}s`;
  return `${Math.floor(ms / 60_000)}m${Math.round((ms % 60_000) / 1000)}s`;
}

export function formatToolInput(input: unknown): string {
  if (input === null || input === undefined) return "";
  if (typeof input === "string") return input;
  try {
    return JSON.stringify(input, null, 2);
  } catch {
    return String(input);
  }
}

/** 摘要正文（v0.9.12 拆分）：从 input 的关键字段提取一行人类可读正文 ——
 *  路径 / 命令 / pattern…，不含动词前缀（行首动词由 toolLabel 提供）。
 *  字段名与 agent-framework 工具 schema 对齐（path/command/pattern/description…），
 *  未知工具尽力提取，提取不到返回 null（调用方回落工具名/引擎 title）。 */
export function formatToolSummaryBody(tool: string, input: unknown): string | null {
  if (input === null || input === undefined) return null;
  if (typeof input !== "object") return typeof input === "string" ? oneLine(input) : null;
  const o = input as Record<string, unknown>;
  const str = (k: string): string | undefined => (typeof o[k] === "string" && (o[k] as string).trim() ? (o[k] as string).trim() : undefined);
  const path = str("path") ?? str("file_path") ?? str("filePath") ?? str("notebook_path");
  const cmd = str("command") ?? str("cmd");
  const pattern = str("pattern") ?? str("query") ?? str("q");
  const url = str("url");
  const desc = str("description") ?? str("prompt") ?? str("task");
  // grep 的范围字段是 pathPattern（framework builtins），与通用 path 分开取
  const scope = str("pathPattern") ?? str("scope");
  const cap = (s: string): string => (s.length > 80 ? `${s.slice(0, 80)}…` : s);
  switch (tool) {
    case "read":
      return path ? cap(path) : null;
    case "glob":
      return pattern ? `${cap(pattern)}${path ? ` in ${cap(path)}` : ""}` : path ? cap(path) : null;
    case "grep":
      return pattern ? `${cap(pattern)}${scope ? ` in ${cap(scope)}` : path ? ` in ${cap(path)}` : ""}` : path ? cap(path) : null;
    case "edit":
    case "write":
      return path ? cap(path) : null;
    case "bash":
    case "terminal":
      return cmd ? cap(oneLine(cmd)) : null;
    case "webfetch":
    case "web_fetch":
      return url ? cap(url) : null;
    case "task":
      return desc ? cap(oneLine(desc)) : null;
    default: {
      if (path) return cap(path);
      if (cmd) return cap(oneLine(cmd));
      if (url) return cap(url);
      if (desc) return cap(oneLine(desc));
      return null;
    }
  }
}

/** 工具输入摘要（v0.9.8，历史形态保留）：`Read src/foo.ts`、`Edit src/bar.ts`、
 *  `Bash pnpm build`、`Grep "pat" in src/` —— 动词前缀 + 正文。 */
export function formatToolSummary(tool: string, input: unknown): string | null {
  const body = formatToolSummaryBody(tool, input);
  if (!body) return null;
  const verb = tool.charAt(0).toUpperCase() + tool.slice(1);
  return `${verb} ${body}`;
}

export function oneLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}
