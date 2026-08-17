"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

import { Badge } from "../../components/badge";
import "./message.css";

export interface MessageItemProps {
  /** 发送方角色：决定头像配色与气泡方向 */
  role: "user" | "assistant";
  /** 头像字（单字，如 "你"/"使"）或名字首字 */
  avatar: string;
  /** 显示名（meta 行） */
  name: string;
  /** 右侧状态（assistant 执行中/已完成） */
  status?: { active: boolean };
  /** 时间标签（HH:MM） */
  time?: string | null;
  /** 消息体（文本/执行树/工具组等任意内容） */
  children: ReactNode;
  /** 关闭入场动画（流式追加频繁时防闪） */
  noMotion?: boolean;
}

/**
 * MessageItem — 消息行：头像 + 名字/状态/时间 meta + 内容体。
 *
 * user 气泡为描边卡片，assistant 为开放排版（适合挂执行树）。
 * 默认 framer-motion 淡入上移入场（流式追加传 noMotion 关闭）。
 *
 * @example
 * <MessageItem role="assistant" avatar="使" name="Agent" status={{ active: true }}>
 *   <Markdown text={reply} />
 * </MessageItem>
 */
export function MessageItem({ role, avatar, name, status, time, children, noMotion }: MessageItemProps) {
  const body = (
    <>
      <span className={`zmz-message-avatar ${role === "assistant" ? "assistant" : ""}`}>{avatar}</span>
      <div className="zmz-message-column">
        <div className="zmz-message-meta">
          <strong>{name}</strong>
          {status && <Badge variant={status.active ? "accent" : "success"} size="sm">{status.active ? "执行中" : "已完成"}</Badge>}
          {time && <span className="zmz-message-time">{time}</span>}
        </div>
        {children}
      </div>
    </>
  );
  if (noMotion) return <div className={`zmz-message ${role}`}>{body}</div>;
  return (
    <motion.div
      className={`zmz-message ${role}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {body}
    </motion.div>
  );
}

/**
 * MessageStream — 消息流容器：统一行距 + 滚动区。
 *
 * @example
 * <MessageStream scrollRef={ref}>{messages.map(...)}</MessageStream>
 */
export function MessageStream({ children, scrollRef, className }: { children: ReactNode; scrollRef?: React.Ref<HTMLDivElement>; className?: string }) {
  return (
    <div ref={scrollRef} className={`zmz-message-stream ${className ?? ""}`}>
      {children}
    </div>
  );
}
