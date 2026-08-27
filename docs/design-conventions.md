# 设计约定（Design Conventions）

> 2026-08-27 起。整合：交互取择表（源自 hallmark microinteractions 纪律）、反 AI 味检查清单、hallmark skill 的使用边界。
> 与 `prefer-theme-components` 原则（UI 一律 @zmzai/theme 组件）配套执行。

## 一、交互取择表（Tool-UI 场景）

写交互时的默认选择——左边被否决时才允许用右边：

| 默认采用 ✅ | 而不是 ❌ | 适用 |
| --- | --- | --- |
| 静默成功（状态自然变化） | 庆祝型 toast / 弹窗 | 所有操作反馈 |
| 乐观更新 + Undo | 事前确认对话框 | 可逆操作（删除入回收站、重命名） |
| 事前确认 | 乐观更新 | **不可逆**操作（真删数据、对外发布）——Undo 救不了的必须问 |
| 就近内联错误（字段旁/卡片内） | 顶部全局 toast 报错 | 表单与工具卡 |
| hover 提示延迟 800ms / focus 0ms | 两者都 0ms | Tooltip（防扫过闪烁） |
| `prefers-reduced-motion: reduce` 全局降级 | 只做动画不管偏好 | 所有动效 |
| 只动 `transform` / `opacity` | 动 layout 属性（width/top/margin） | 所有动效 |
| `--ease-out`（入场）/ `--ease-in`（退场） | 浏览器默认 `ease`、bounce/overshoot | 所有过渡 |
| 动效时长 ≤200ms（状态） / ≤400ms（进出场） | 更长 | 工具 UI 节奏 |
| 裁剪：删掉不损失信息的动画就删 | 多多益善 | Review 时逐个问「删了会丢信息吗」 |

**harness/工作台类界面专项**：消息流自动跟随滚动但不锁底（用户上翻即停，近底再恢复）；长任务用 terminal_read 式游标增量而非整段重渲染。

## 二、反 AI 味检查清单（并入 design-review）

每次 UI 批次过 review 时逐项检查，任一命中即退回：

1. **斜体标题**——headings 一律 roman（`font-style: normal`）；强调用字重/accent 色/下划线，不用 `<em>`。
2. **编造数据**——页面上的任何数字（用户数、百分比、"10×"）必须有真实来源；没有就放 `—` 占位并标注"数据待确认"，或者干脆换结构。
3. **手绘假 chrome**——不画假浏览器栏（URL pill + 红绿灯）、假手机框、假 IDE 窗口包 `<pre>`；要么用真实截图（hairline 边框的 `<figure>`），要么裸内容。
4. **模板节奏**——同仓两页不许共享 hero→3 特性→CTA→footer 的同一韵律；工具型界面豁免（一致性优先）。
5. **未经 token 的即兴取值**——CSS 里出现内联 hex/oklch/rgb 或绕过 token 块的 `font-family: "某字体"`，一律改为引用命名 token。
6. **假占位图冒充成品**——stock 图必须标 placeholder，不得当作最终交付。

## 三、hallmark skill 使用边界（拍板 2026-08-27）

| 场景 | 用法 | 约束 |
| --- | --- | --- |
| **叙事型新页面**（落地页、官网、产品介绍） | `hallmark redesign` / default Design flow 可用 | **token 只准指向 @zmzai/theme**；禁走 catalog 主题自选（会引入第二套 OKLCH + 字体配对，与 theme 冲突）；macrostructure 轮换照常 |
| **工具型界面**（工作台、后台、harness） | 只用 audit / 反 AI 味清单 | 不进 Design flow（工具 UI 要一致性不要多样性） |
| **任何 UI 的质检** | `hallmark audit` | 输出进 design-review 流程，与可用性审查并列 |
| **参考站拆解** | `hallmark study` | 产出的 DNA 回写 theme 时走正常 token 变更（主应用 v0.6.0 荧光绿即 study 产物） |

**权威序**：`@zmzai/theme` tokens > 各产品 globals.css 内联 token > 页面级样式。hallmark 在任何环节都不得越过第一级。

## 四、违反后果

- push main 前的约定检查（见 `prefer-theme-components` 记忆）把本文件第一、二节纳入检查范围；
- 新组件 PR 缺 8 态矩阵行（states-discipline.md）不予合并。
