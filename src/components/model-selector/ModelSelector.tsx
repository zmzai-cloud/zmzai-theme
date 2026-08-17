"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import type {
  ModelSelectorData,
  ModelSelectorValue,
  ModelSelectorModel,
  ModelSelectorChannel,
} from "./types";
import "./model-selector.css";

export interface ModelSelectorProps {
  /** 完整数据（featured + channels） */
  data: ModelSelectorData;
  /** 当前选中值 */
  value: ModelSelectorValue;
  /** 选中回调 */
  onChange: (value: ModelSelectorValue) => void;
  /** 触发器占位文案 */
  placeholder?: string;
  /** 是否显示搜索框 */
  searchable?: boolean;
  /** 自定义类名（作用于触发器） */
  className?: string;
}

/** 在全部模型中查找当前选中模型，返回 {channel, model} 用于触发器显示。 */
function findSelectedModel(
  data: ModelSelectorData,
  value: ModelSelectorValue,
): { model: ModelSelectorModel | null; channel: ModelSelectorChannel | null } {
  // 先在 featured 中找
  const featured = data.featured.find((m) => m.id === value.model);
  if (featured) return { model: featured, channel: null };
  // 再在 channels 中找
  for (const channel of data.channels) {
    const model = channel.models.find((m) => m.id === value.model);
    if (model) return { model, channel };
  }
  return { model: null, channel: null };
}

/** 过滤数据（按关键词）。 */
function filterData(
  data: ModelSelectorData,
  query: string,
): ModelSelectorData {
  const q = query.trim().toLowerCase();
  if (!q) return data;
  const matchModel = (m: ModelSelectorModel) =>
    m.name.toLowerCase().includes(q) ||
    (m.description?.toLowerCase().includes(q) ?? false) ||
    (m.channel?.toLowerCase().includes(q) ?? false);

  const featured = data.featured.filter(matchModel);
  const channels = data.channels
    .map((ch) => ({ ...ch, models: ch.models.filter(matchModel) }))
    .filter((ch) => ch.models.length > 0);
  return { featured, channels };
}

export function ModelSelector({
  data,
  value,
  onChange,
  placeholder = "选择模型",
  searchable = false,
  className,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [expandedChannels, setExpandedChannels] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // 打开时聚焦搜索框
  useEffect(() => {
    if (open && searchable) {
      // 等 Popover 渲染完再聚焦
      const timer = setTimeout(() => searchRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open, searchable]);

  // 关闭时清理搜索
  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  const { model: selectedModel, channel: selectedChannel } = findSelectedModel(data, value);
  const filtered = filterData(data, search);

  const hasResults = filtered.featured.length > 0 || filtered.channels.length > 0;

  function toggleChannel(channelId: string) {
    setExpandedChannels((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) next.delete(channelId);
      else next.add(channelId);
      return next;
    });
  }

  function selectModel(model: ModelSelectorModel, channel?: ModelSelectorChannel) {
    onChange({ channel: channel?.id ?? model.channel, model: model.id });
    setOpen(false);
  }

  function isSelected(modelId: string): boolean {
    return value.model === modelId;
  }

  const triggerLabel = selectedModel?.name ?? placeholder;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn("ms-trigger", className)}
          aria-label="选择模型"
        >
          <span className={cn(!selectedModel && "ms-trigger-placeholder")}>
            {triggerLabel}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={cn("ms-trigger-chevron", open && "ms-open")}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="ms-popover"
          sideOffset={4}
          align="start"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {searchable && (
            <div className="ms-search">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-ink-3" aria-hidden>
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L13.5 13.5" />
              </svg>
              <input
                ref={searchRef}
                className="ms-search-input"
                placeholder="搜索模型…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearch("");
                    setOpen(false);
                  }
                }}
              />
            </div>
          )}

          {!hasResults ? (
            <div className="ms-empty">没有找到匹配的模型</div>
          ) : (
            <div>
              {/* Featured 区 */}
              {filtered.featured.length > 0 && (
                <div className="ms-featured">
                  {filtered.featured.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      className={cn("ms-featured-item", isSelected(model.id) && "ms-selected")}
                      onClick={() => selectModel(model)}
                    >
                      {model.icon && (
                        <span className="ms-featured-icon">{model.icon}</span>
                      )}
                      <span className="ms-featured-body">
                        <span className="ms-featured-name">{model.name}</span>
                        {model.description && (
                          <span className="ms-featured-desc">{model.description}</span>
                        )}
                      </span>
                      {isSelected(model.id) && (
                        <svg className="ms-featured-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* 分隔线 */}
              {filtered.featured.length > 0 && filtered.channels.length > 0 && (
                <div className="ms-separator" />
              )}

              {/* 渠道分组区 */}
              {filtered.channels.map((channel) => {
                const isOpen = expandedChannels.has(channel.id);
                return (
                  <div key={channel.id} className="ms-channel">
                    <button
                      type="button"
                      className="ms-channel-trigger"
                      onClick={() => toggleChannel(channel.id)}
                      aria-expanded={isOpen}
                    >
                      {channel.icon && (
                        <span className="ms-channel-icon">{channel.icon}</span>
                      )}
                      <span>{channel.name}</span>
                      <span className="ms-channel-count">({channel.models.length})</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={cn("ms-channel-chevron", isOpen && "ms-open")}
                      >
                        <path
                          d="M4.5 3L7.5 6L4.5 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="ms-channel-models">
                        {channel.models.map((model) => (
                          <button
                            key={model.id}
                            type="button"
                            className={cn("ms-model-item", isSelected(model.id) && "ms-selected")}
                            onClick={() => selectModel(model, channel)}
                          >
                            {model.icon && (
                              <span className="ms-model-icon">{model.icon}</span>
                            )}
                            <span className="ms-model-name">{model.name}</span>
                            {model.meta && Object.values(model.meta).length > 0 && (
                              <span className="ms-model-meta">
                                {Object.values(model.meta).join(" · ")}
                              </span>
                            )}
                            {isSelected(model.id) && (
                              <svg className="ms-model-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
