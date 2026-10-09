"use client";

import { useState } from "react";

import { Icon, type IconName } from "../../components/icon/Icon";
import { formatToolInput, formatToolSummaryBody, oneLine, toolDuration, toolGlyph, toolLabel, type ToolCall } from "./types";
import "./tool-card.css";

/**
 * ToolCard — 单次工具调用过程行（v0.9.12 ZCode 式）。
 *
 * 折叠态是一行灰色弱化文本：`[语义图标] 名称 · 摘要`，无边框、无背景、
 * 无徽标——与正文的层级差全部由颜色深浅承担（正文 ink，过程行 muted）。
 * 图标按工具类型选取（读取/搜索=放大镜、执行=终端、编辑=铅笔），运行中
 * 图标呼吸；失败整行转 danger 并在行尾标「失败」。
 * 点标题行展开输入输出详情（运行中也保持单行折叠，Zcode 式）。
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
  const failed = state.status === "error" || interrupted;
  const errorText = state.status === "error" ? state.error : null;
  // 摘要：引擎 title（如 bash 的 description）优先，回落 input 字段提取；失败且无摘要时给错误一句话
  const engineTitle = "title" in state && state.title ? state.title : null;
  const body = formatToolSummaryBody(call.tool, state.input);
  const summary = engineTitle ?? body ?? (errorText ? oneLine(errorText) : null);
  const isMono = !engineTitle && !!body; // 摘要是路径/命令 → 等宽更可读
  const output = state.status === "completed" ? state.output : errorText;
  const statusClass = failed ? "failed" : running ? "running" : "completed";
  // 运行中也保持单行折叠（Zcode 式）：呼吸图标 + 摘要行即实时反馈，点击才看输入
  const isOpen = expanded;
  const duration = toolDuration(call);

  return (
    <div className={`tool-card ${statusClass}`}>
      <button type="button" className="tool-card-trigger" aria-expanded={isOpen} onClick={() => setExpanded((value) => !value)}>
        <span className="tool-card-glyph" aria-hidden>
          <Icon name={failed ? "cross" : (toolGlyph(call.tool) as IconName)} size={13} strokeWidth={1.4} />
        </span>
        <span className="tool-card-label">{toolLabel(call.tool)}</span>
        {summary && (
          <>
            <span className="tool-card-sep" aria-hidden>·</span>
            <span className={isMono ? "tool-card-summary tool-card-summary-mono" : "tool-card-summary"} title={summary}>{summary}</span>
          </>
        )}
        {failed && <span className="tool-card-flag">失败</span>}
        <Icon name="chevron-down" size={11} className={isOpen ? "tool-card-chevron open" : "tool-card-chevron"} />
      </button>
      {/* 展开/收起走 CSS grid 0fr→1fr（tool-card.css）：framer 的 height:"auto"
          在此组件实测不动画（首帧即全高），grid 过渡与消费端工作流程组同机制
          同参数，三种展开一个手感。内容常驻 DOM（收起时 0fr + inert）。 */}
      <div className={isOpen ? "tool-card-detail-wrap open" : "tool-card-detail-wrap"} inert={!isOpen}>
        <div className="tool-card-detail">
          {/* 纵向 padding 放垫片层：grid 折叠项（detail）带纵向 padding 会残漏
              高度（0fr 压不掉 padding），收起态必须精确归零。 */}
          <div className="tool-card-detail-pad">
            <div className="tool-card-detail-section">
              <span className="tool-card-detail-label">输入{duration ? ` · ${duration}` : ""}</span>
              <pre>{formatToolInput(state.input)}</pre>
            </div>
            {output !== null && (
              <div className="tool-card-detail-section">
                <span className="tool-card-detail-label">{failed ? "错误" : "输出"}</span>
                <pre>{output}</pre>
              </div>
            )}
            {/* 展开态不再放「正在等待工具返回结果…」：运行状态由消费端的单一
                状态行（Composer 上方）负责，这里第二份只会各说各话。中断提示
                是恢复语义的真实信息，保留。 */}
            {running && interrupted && <span className="tool-card-live-note">运行已中断（服务重启），可在同一会话继续。</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ToolGroup — 连续工具调用的折叠组（G1 防淹没，v0.9.12 同步弱化为裸行形态）。
 *
 * 仅运行中自动展开；失败/单条/历史组一律折叠为一条可点击的摘要行。
 * Lectern 会话流已改为逐工具一行（ZCode 式），此组件保留给需要聚合展示的消费方。
 *
 * @example
 * <ToolGroup calls={toolCalls} sessionIdle={idle} />
 */
export function ToolGroup({ calls, sessionIdle = false }: { calls: ToolCall[]; sessionIdle?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const running = calls.filter((c) => c.state.status === "running" || c.state.status === "pending");
  const failed = calls.filter((c) => c.state.status === "error" || (sessionIdle && (c.state.status === "running" || c.state.status === "pending")));
  const done = calls.filter((c) => c.state.status === "completed");
  const autoExpand = running.length > 0;
  const open = expanded || autoExpand;
  const glyph = failed.length > 0 ? "cross" : running.length > 0 ? "chevron-down" : "check";
  const single = calls.length === 1 ? calls[0] : undefined;
  const singleTitle = single
    ? ("title" in single.state && single.state.title) ||
      formatToolSummaryBody(single.tool, single.state.input) ||
      (single.state.status === "error" ? oneLine(single.state.error) : null)
    : null;
  const summary = [
    running.length > 0 && `${running.length} 个进行中`,
    failed.length > 0 && `${failed.length} 个失败`,
    done.length > 0 && `${done.length} 个完成`,
  ].filter(Boolean).join(" · ");
  return (
    <div className="zmz-tool-group">
      <button type="button" className="zmz-tool-group-trigger" aria-expanded={open} onClick={() => setExpanded((value) => !value)} disabled={autoExpand}>
        <span className="tool-card-glyph" aria-hidden><Icon name={glyph as IconName} size={13} strokeWidth={1.4} /></span>
        <span className="zmz-tool-group-label">{single ? singleTitle : `运行了 ${calls.length} 个工具`}</span>
        <small>{single ? (single.state.status === "completed" ? "完成" : single.state.status === "error" ? "失败" : "进行中") : summary}</small>
        <Icon name="chevron-down" size={11} className={open ? "tool-card-chevron open" : "tool-card-chevron"} />
      </button>
      {open && (
        <div className="zmz-tool-group-body">
          {calls.map((call) => <ToolCard key={`${call.id}:${call.state.status}`} call={call} sessionIdle={sessionIdle} />)}
        </div>
      )}
    </div>
  );
}
