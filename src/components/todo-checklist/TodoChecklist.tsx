"use client";

import { useState } from "react";

import { Badge } from "../../components/badge";
import { Icon } from "../../components/icon/Icon";
import { ToolCard, type ToolCall } from "../../components/tool-card";
import "./todo-checklist.css";

export type TodoItem = {
  content: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority?: "high" | "medium" | "low";
};

/** 从 todo 工具调用的 completed metadata 读进度游标（约定：N 表示第 N+1 步进行中）。 */
function metadataCount(call: ToolCall): number | null {
  if (call.state.status !== "completed") return null;
  const value = call.state.metadata?.completed;
  return typeof value === "number" && Number.isInteger(value) ? value : null;
}

/** 把工具调用按 todo 进度游标分配到各步骤名下（分支渲染）。 */
function assignToolsToTodos(todos: TodoItem[], calls: ToolCall[]): ToolCall[][] {
  const branches = todos.map(() => [] as ToolCall[]);
  let branchIndex = 0;
  for (const call of calls) {
    if (call.tool === "todo") {
      const completed = metadataCount(call);
      if (completed !== null) branchIndex = Math.min(Math.max(completed, 0), todos.length - 1);
      continue;
    }
    branches[branchIndex]?.push(call);
  }
  return branches;
}

function TaskPlanNode({ todo, index, calls }: { todo: TodoItem; index: number; calls: ToolCall[] }) {
  const [expanded, setExpanded] = useState(false);
  const active = todo.status === "in_progress";
  const canExpand = calls.length > 0;
  const open = canExpand && (active || expanded);
  const state = active ? "当前执行" : todo.status === "completed" ? "已完成" : todo.status === "cancelled" ? "已跳过" : "待执行";
  const stateVariant = active ? "accent" : todo.status === "completed" ? "success" : todo.status === "cancelled" ? "danger" : "outline";
  return (
    <li className={`zmz-task-node ${todo.status}`}>
      <button type="button" className="zmz-task-node-trigger" aria-expanded={open} disabled={!canExpand} onClick={() => setExpanded((value) => !value)}>
        <span className="zmz-task-node-marker" aria-hidden>{todo.status === "completed" ? <Icon name="check" size={10} /> : active ? <span className="zmz-todo-spinner" /> : null}</span>
        <span className="zmz-task-node-copy"><span className="zmz-task-node-index">{String(index + 1).padStart(2, "0")}</span><strong>{todo.content}</strong></span>
        {canExpand ? <Badge variant="outline" size="sm">{calls.length} 次执行</Badge> : <Badge variant={stateVariant} size="sm">{state}</Badge>}
        {canExpand && <Icon name="chevron-down" size={12} className={open ? "zmz-chevron open" : "zmz-chevron"} />}
      </button>
      {open && calls.length > 0 && <div className="zmz-task-executions">{calls.map((call) => <ToolCard key={`${call.id}:${call.state.status}`} call={call} />)}</div>}
    </li>
  );
}

/**
 * TodoChecklist — Task Plan 卡：进度摘要 + 步骤清单，每步可展开看工具执行。
 *
 * `calls` 可选：传入会话的工具调用后，按 todo 进度游标自动分配到各步骤
 * 名下（约定 tool 名为 "todo" 的调用、其 completed metadata 为游标）。
 *
 * @example
 * <TodoChecklist todos={todos} calls={toolCalls} />
 */
export function TodoChecklist({ todos, calls = [] }: { todos: TodoItem[]; calls?: ToolCall[] }) {
  if (!todos.length) return null;
  const done = todos.filter((todo) => todo.status === "completed").length;
  const current = todos.find((todo) => todo.status === "in_progress");
  const progress = Math.round((done / todos.length) * 100);
  const branches = assignToolsToTodos(todos, calls);
  return (
    <section className="zmz-todo">
      <div className="zmz-todo-head">
        <div className="zmz-todo-heading"><span className="zmz-todo-kicker">Task Plan</span><Badge variant={current ? "accent" : done === todos.length ? "success" : "outline"} size="sm">{current ? "执行中" : done === todos.length ? "已完成" : "待执行"}</Badge></div>
        <span className="zmz-todo-progress"><b>{done}</b>/{todos.length}</span>
      </div>
      <div className="zmz-todo-summary"><span>{current?.content ?? (done === todos.length ? "所有步骤已完成" : "等待 Agent 开始执行")}</span><span>{progress}%</span></div>
      <div className="zmz-todo-progressbar" aria-hidden><span style={{ width: `${progress}%` }} /></div>
      <ol className="zmz-todo-list">
        {todos.map((todo, index) => (
          <TaskPlanNode key={`${todo.content}-${index}`} todo={todo} index={index} calls={branches[index] ?? []} />
        ))}
      </ol>
    </section>
  );
}
