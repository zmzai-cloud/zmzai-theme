import type { ReactNode } from "react";

/** 单个模型条目。 */
export interface ModelSelectorModel {
  /** 唯一标识，如 "gpt-5.6-terra" */
  id: string;
  /** 显示名 */
  name: string;
  /** 一句话描述（用于 featured 区） */
  description?: string;
  /** 供应商图标（消费方传入） */
  icon?: ReactNode;
  /** 所属渠道名（用于分组显示） */
  channel?: string;
  /** 附加信息，如价格、上下文等 */
  meta?: Record<string, string>;
}

/** 渠道分组。 */
export interface ModelSelectorChannel {
  /** 渠道 ID */
  id: string;
  /** 渠道名，如 "Azure OpenAI" */
  name: string;
  /** 渠道图标（消费方传入） */
  icon?: ReactNode;
  /** 该渠道下的模型 */
  models: ModelSelectorModel[];
}

/** ModelSelector 完整数据。 */
export interface ModelSelectorData {
  /** 顶部推荐模型（带描述，直接展示不折叠） */
  featured: ModelSelectorModel[];
  /** 渠道分组列表 */
  channels: ModelSelectorChannel[];
}

/** 选中值。 */
export interface ModelSelectorValue {
  channel?: string;
  model: string;
}
