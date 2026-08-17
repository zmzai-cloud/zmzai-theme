"use client";

import { useState } from "react";

import { Badge } from "../../components/badge";
import { Icon } from "../../components/icon/Icon";
import { formatToolInput, toolDuration, type ToolCall } from "./types";
import "./tool-card.css";

/**
 * ToolCard — 单次工具调用卡：状态色左边条 + 展开/收起的输入输出详情。
 *
 * 运行中卡常开；进入终态后收起，点标题可再看输出。
 * `sessionIdle=true` 时非终态工具渲染为「失败（中断）」——
 * 会话空闲却停在 running 是崩溃/重启的遗留，不该永远转圈。
 *
 * @example
 * <ToolCard call={toolCall} sessionIdle={idle} />
 */
export function ToolCard({ call, sessionIdle = false }: { call: ToolCall; sessionIdle?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const state = call.state;
  const running = state.status === "running" || state.status === "pending";
  const interrupted = running && sessionIdle;
  const title = state.status === "completed" ? state.title : state.status === "running" ? (state.title ?? call.tool) : call.tool;
  const output = state.status === "completed" ? state.output : state.status === "error" ? state.error : null;
  const statusClass = state.status === "completed" ? "completed" : interrupted ? "failed" : state.status === "error" ? "failed" : "running";
  const isOpen = running || expanded;

  return (
    <div className={`tool-card ${statusClass}`}>
      <button type="button" className="tool-card-trigger" aria-expanded={isOpen} onClick={() => setExpanded((value) => !value)}>
        <span className="tool-card-glyph" aria-hidden><Icon name={state.status === "completed" ? "check" : interrupted || state.status === "error" ? "cross" : "chevron-down"} size={12} /></span>
        <span className="tool-card-label">{title}</span>
        {(state.status === "error" || interrupted) && <Badge variant="danger" size="sm">失败</Badge>}
        {running && !interrupted && <Badge variant="warning" size="sm">运行中</Badge>}
        {toolDuration(call) && <span className="tool-card-duration">{toolDuration(call)}</span>}
        <Icon name="chevron-down" size={12} className={isOpen ? "tool-card-chevron open" : "tool-card-chevron"} />
      </button>
      {isOpen && (
        <div className="tool-card-detail">
          <div className="tool-card-detail-section">
            <span className="tool-card-detail-label">输入</span>
            <pre>{formatToolInput(state.input)}</pre>
          </div>
          {output !== null && (
            <div className="tool-card-detail-section">
              <span className="tool-card-detail-label">输出</span>
              <pre>{output}</pre>
            </div>
          )}
          {running && <span className="tool-card-live-note">{interrupted ? "运行已中断（服务重启），可在同一会话继续。" : "正在等待工具返回结果…"}</span>}
        </div>
      )}
    </div>
  );
}

/**
 * ToolGroup — 连续工具调用的折叠组（G1 防淹没）。
 *
 * 运行中/有失败/单条时自动展开；多条完成时折叠为一条摘要行。
 *
 * @example
 * <ToolGroup calls={toolCalls} sessionIdle={idle} />
 */
export function ToolGroup({ calls, sessionIdle = false }: { calls: ToolCall[]; sessionIdle?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const running = calls.filter((c) => c.state.status === "running" || c.state.status === "pending");
  const failed = calls.filter((c) => c.state.status === "error" || (sessionIdle && (c.state.status === "running" || c.state.status === "pending")));
  const done = calls.filter((c) => c.state.status === "completed");
  const autoExpand = running.length > 0 || failed.length > 0 || calls.length <= 1;
  const open = expanded || autoExpand;
  const glyph = failed.length > 0 ? "cross" : running.length > 0 ? "chevron-down" : "check";
  const summary = [
    running.length > 0 && `${running.length} 个进行中`,
    failed.length > 0 && `${failed.length} 个失败`,
    done.length > 0 && `${done.length} 个完成`,
  ].filter(Boolean).join(" · ");
  return (
    <div className="zmz-tool-group">
      <button type="button" className="zmz-tool-group-trigger" aria-expanded={open} onClick={() => setExpanded((value) => !value)} disabled={autoExpand}>
        <span className="tool-card-glyph" aria-hidden><Icon name={glyph} size={12} /></span>
        <span className="zmz-tool-group-label">运行了 {calls.length} 个工具</span>
        {!autoExpand && <small>{summary}</small>}
        <Icon name="chevron-down" size={12} className={open ? "tool-card-chevron open" : "tool-card-chevron"} />
      </button>
      {open && (
        <div className="zmz-tool-group-body">
          {calls.map((call) => <ToolCard key={`${call.id}:${call.state.status}`} call={call} sessionIdle={sessionIdle} />)}
        </div>
      )}
    </div>
  );
}
