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
