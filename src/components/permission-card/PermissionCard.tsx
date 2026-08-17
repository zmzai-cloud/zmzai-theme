"use client";

import { useState } from "react";

import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import "./permission-card.css";

export type PermissionRequestData = {
  id: string;
  permission: string;
  patterns: string[];
  metadata?: unknown;
};

export type PermissionReply = "once" | "always" | "reject";

/**
 * PermissionCard — 内联审批卡：Agent 请求授权时在消息流中渲染。
 *
 * 印章红描边 + 说明文案 + 三档操作（允许一次 / 始终允许 / 拒绝），
 * 拒绝可附理由（会反馈给 Agent）。
 *
 * @example
 * <PermissionCard request={req} busy={replying} onReply={(reply, feedback) => …} />
 */
export function PermissionCard({ request, busy = false, onReply }: {
  request: PermissionRequestData;
  busy?: boolean;
  onReply: (reply: PermissionReply, feedback?: string) => void;
}) {
  const [feedback, setFeedback] = useState("");
  const command = typeof (request.metadata as { command?: unknown } | undefined)?.command === "string" ? (request.metadata as { command: string }).command : null;
  return (
    <article className="zmz-permission-card">
      <div className="zmz-permission-head">
        <Badge variant="solid" size="sm">{request.permission}</Badge>
        <strong>{command ?? request.patterns.join("、")}</strong>
      </div>
      <p className="zmz-permission-note">
        {request.permission === "bash" ? "Agent 请求在隔离沙箱中执行这条命令。批准后本次运行一次有效；选择「始终允许」则同任务内同类命令不再询问。" : "Agent 请求执行此操作。"}
      </p>
      <div className="zmz-permission-actions">
        <Input
          className="zmz-permission-feedback"
          placeholder="拒绝理由（可选，会反馈给 Agent）"
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
        />
        <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={() => onReply("reject", feedback || undefined)}>
          拒绝
        </Button>
        <Button type="button" variant="secondary" size="sm" disabled={busy} onClick={() => onReply("always")}>
          始终允许
        </Button>
        <Button type="button" size="sm" disabled={busy} onClick={() => onReply("once")}>
          允许一次
        </Button>
      </div>
    </article>
  );
}
