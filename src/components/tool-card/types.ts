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

/** 工具输入摘要（v0.9.8）：从 input 的关键字段生成人类可读一行 ——
 *  `Read src/foo.ts`、`Edit src/bar.ts`、`Bash pnpm build`、`Grep "pat" in src/`。
 *  字段名与 agent-framework 工具 schema 对齐（path/command/pattern/description…），
 *  未知工具尽力提取，提取不到返回 null（调用方回落工具名）。 */
export function formatToolSummary(tool: string, input: unknown): string | null {
  if (input === null || input === undefined) return null;
  if (typeof input !== "object") return typeof input === "string" ? oneLine(input) : null;
  const o = input as Record<string, unknown>;
  const str = (k: string): string | undefined => (typeof o[k] === "string" && (o[k] as string).trim() ? (o[k] as string).trim() : undefined);
  const path = str("path") ?? str("file_path") ?? str("filePath") ?? str("notebook_path");
  const cmd = str("command") ?? str("cmd");
  const pattern = str("pattern") ?? str("query") ?? str("q");
  const url = str("url");
  const desc = str("description") ?? str("prompt") ?? str("task");
  const cap = (s: string): string => (s.length > 80 ? `${s.slice(0, 80)}…` : s);
  const verb = tool.charAt(0).toUpperCase() + tool.slice(1);
  switch (tool) {
    case "read":
      return path ? `Read ${cap(path)}` : null;
    case "glob":
      return pattern ? `Glob ${cap(pattern)}${path ? ` in ${cap(path)}` : ""}` : path ? `Glob ${cap(path)}` : null;
    case "grep":
      return pattern ? `Grep ${cap(pattern)}${path ? ` in ${cap(path)}` : ""}` : path ? `Grep ${cap(path)}` : null;
    case "edit":
    case "write":
      return path ? `${tool === "edit" ? "Edit" : "Write"} ${cap(path)}` : null;
    case "bash":
    case "terminal":
      return cmd ? `Bash ${cap(oneLine(cmd))}` : null;
    case "webfetch":
    case "web_fetch":
      return url ? `Fetch ${cap(url)}` : null;
    case "task":
      return desc ? `Task ${cap(oneLine(desc))}` : null;
    default: {
      if (path) return `${cap(tool)} ${cap(path)}`;
      if (cmd) return `${cap(tool)} ${cap(oneLine(cmd))}`;
      if (url) return `${cap(tool)} ${cap(url)}`;
      if (desc) return `${cap(tool)} ${cap(oneLine(desc))}`;
      return null;
    }
  }
}

function oneLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}
