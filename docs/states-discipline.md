# 组件状态纪律（States Discipline）

> 来源：hallmark skill 的 8-state discipline，经 2026-08-27 评审吸收进 @zmzai/theme。
> 自 v0.6.1 起执行。适用范围：**所有交互组件**（theme 仓内 + 各产品仓自建控件）。

## 验收标准（8 态清单）

每个交互组件必须对以下状态有**明确的设计决定**——要么有样式，要么有书面豁免理由（如纯装饰元素）。缺态 = 验收不通过。

| 状态 | 载体 | 硬性要求 |
| --- | --- | --- |
| default | — | 基线样式 |
| hover | `:hover` | 必须有可感知反馈（边框/背景/阴影任一），纯 `cursor` 不算 |
| focus-visible | `:focus-visible` | **≥3:1 对比度的 ring，立即可见、禁止动画**。用 `ring-2 ring-ink ring-offset-2 ring-offset-bg`；绝不能用 `:focus` 代替（避免鼠标点击也出 ring） |
| active | `:active` | 按压反馈统一 `active:scale-[0.98]`（按钮族）；不可缩的用背景加深 |
| disabled | `disabled:` | `pointer-events-none opacity-40`（按钮）/ `cursor-not-allowed bg-surface text-ink-3`（输入族） |
| loading | `data-state` / 组件内状态 | 由 `StatefulButton` 承担（spinner + 防重复点击） |
| error | `aria-invalid` | 输入族：边框转 `border-danger`；按钮族：错误不落在按钮上，落在就近的错误文案区 |
| success | `data-state` | 静默优先——成功不必庆祝，需要确认感的操作用 `StatefulButton` 的 checkmark 过渡（1.5s 自复位） |

## 现状矩阵（v0.6.1 基线）

| 组件 | default | hover | focus-visible | active | disabled | loading | error | success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | ✅ | ✅ | ✅ 0.6.1 补 | ✅ 0.6.1 补齐 secondary/ghost | ✅ | via StatefulButton | 豁免（就近文案） | via StatefulButton |
| Input / Textarea | ✅ | ✅ 0.6.1 补 | ✅ 0.6.1 补 | 豁免（输入不按压） | ✅ 0.6.1 补 | 豁免 | ✅ 0.6.1 补（aria-invalid） | 豁免 |
| SelectTrigger | ✅ | ✅ | ✅ 0.6.1 补 | 豁免 | ✅ 0.6.1 补 | 豁免 | ✅ 0.6.1 补（aria-invalid） | 豁免 |
| StatefulButton | ✅ | ✅ | ✅（继承 Button） | ✅ | ✅ | ✅ | ⚠️ **待补**：当前 catch 静默回 idle | ✅ |

**待办**：StatefulButton 的 error 呈现（失败态停留 + 重试入口，不自动复位）——下个版本。

## 新组件自查流程

1. 写完组件后对照矩阵逐格打勾，打不了勾的写豁免理由进组件头注释；
2. playground 里过一遍键盘 Tab 流（只看 focus-visible 是否全程可见）；
3. `aria-invalid` / `data-state` 用真实表单校验驱动，不要手动塞 class。
