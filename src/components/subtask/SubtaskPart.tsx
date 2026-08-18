"use client";

import "./subtask.css";

import { Badge } from "../badge/Badge";
import { Icon } from "../icon/Icon";

export interface SubtaskPartProps {
  /** 子任务描述；缺省时回退显示 agent 名 */
  description?: string;
  /** 执行该子任务的智能体名 */
  agent?: string;
  /** 子任务 prompt（mono 小字显示） */
  prompt?: string;
}

/**
 * SubtaskPart — 执行树中的子任务行（分支线样式与 ToolCard 一致）。
 *
 * 上下文增强（执行树 ::before 分支线）依赖消费端容器留出左侧空间，
 * 与 ToolCard 的执行树用法相同。
 */
export function SubtaskPart({ description, agent, prompt }: SubtaskPartProps) {
  return (
    <div className="subtask-row">
      <span className="subtask-icon" aria-hidden>
        <Icon name="chevron-down" size={12} />
      </span>
      <span className="subtask-copy">
        <strong>{description || agent}</strong>
        {prompt ? <small>{prompt}</small> : null}
      </span>
      <Badge variant="outline" size="sm">子任务</Badge>
    </div>
  );
}
