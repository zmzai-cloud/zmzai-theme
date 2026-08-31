#!/usr/bin/env node
/**
 * check-color-literals.mjs — 品牌色守卫（BRAND.md 戒律的 CI 化）
 *
 * 组件源码禁止出现硬编码颜色字面量（hex / oklch / rgb(），
 * 颜色一律通过 token（var(--color-*)）或 Tailwind 语义类消费。
 * 白名单（有意保留的功能色）：
 *   - markdown/markdown.css  — hljs 语法高亮（代码语义色，深底专用）
 *   - terminal/Terminal.tsx  — macOS 红绿灯（平台惯例）
 *   - code-block/CodeBlock.tsx — 同上
 *
 * 用法：node scripts/check-color-literals.mjs（违规时 exit 1）
 * 已挂进 prepublishOnly：带色值字面量的组件无法发布。
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../src/components/", import.meta.url).pathname;
const ALLOWLIST = new Set([
  "markdown/markdown.css",
  "terminal/Terminal.tsx",
  "code-block/CodeBlock.tsx",
]);

const COLOR_RE =
  /(#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{8}\b|oklch\(|rgba?\([^)]*\)|hsla?\([^)]*\))/g;

/**
 * 无彩黑白灰放行：rgba(0,0,0,α) / rgba(255,255,255,α) / r=g=b 灰阶、
 * #000 / #fff。守卫目标是「有色相」的品牌色/暖纸色残留
 * （如 #b03a28、#51D845、hue-80 暖调），透明黑白是遮罩/光晕的中性功能色。
 * 注意：framer-motion 动画需要可直接插值的色值，color-mix 无法参与，
 * 因此动画里的黑白 rgba 必须保留。
 */
function isNeutral(color) {
  const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) return rgb[1] === rgb[2] && rgb[2] === rgb[3];
  const hex = color.match(/^#([0-9a-fA-F]{3,8})$/);
  if (hex) {
    const h = hex[1];
    const r = parseInt(h[0] + (h.length <= 4 ? h[0] : h[1] ?? ""), 16);
    const g = parseInt(h[h.length - 2] + h[h.length - 1], 16);
    const b = parseInt(h[h.length - 2] + h[h.length - 1], 16);
    return r === g && g === b;
  }
  return false;
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(css|tsx|ts)$/.test(name)) out.push(p);
  }
  return out;
}

const violations = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (ALLOWLIST.has(rel)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    // 跳过注释行里的历史沿革记录（色值作为文档出现是允许的）
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    const hits = line.match(COLOR_RE) ?? [];
    const chromatic = hits.filter((c) => !isNeutral(c));
    if (chromatic.length) {
      violations.push(`${rel}:${i + 1}  ${trimmed.slice(0, 90)}`);
    }
  });
}

if (violations.length) {
  console.error(
    `\n✗ 品牌色守卫：组件源码发现 ${violations.length} 处硬编码颜色（BRAND.md 戒律 3/9）。` +
      `\n  颜色必须走 var(--color-*) token。确属功能色的文件请加入白名单并注明理由：\n\n` +
      violations.map((v) => `  ${v}`).join("\n") +
      "\n"
  );
  process.exit(1);
}

/**
 * G2 · spot 同框禁令（v0.9.2）
 *
 * --color-spot*（品红点睛色阶）与 --color-danger（错误红）不得出现在同一
 * 视口区块——品红距语义红仅 35°（OKLab ΔE 0.229，安全线 0.20 之上），
 * 快速扫视时仍有被误读为错误状态的风险。
 *
 * 静态检查只能做到文件级保守代理：同一文件同时引用两者即报错。
 * 这会比视口级更严格，但 spot 本就只该出现在深色叙事区（hero / CTA /
 * 终端），danger 属于表单与状态区——两者同文件本身就该怀疑。
 *
 * 注：G1（暖纸载体禁用）与 G3（spot 实底禁白字）依赖运行时样式解析，
 * 静态检查无法覆盖，靠 theme.css 4.5 节的注释纪律 + code review 把关。
 */
const spotViolations = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (ALLOWLIST.has(rel)) continue;
  const src = readFileSync(file, "utf8");
  const usesSpot = /var\(--color-spot/.test(src);
  const usesDanger = /var\(--color-danger/.test(src);
  if (usesSpot && usesDanger) {
    spotViolations.push(rel);
  }
}

if (spotViolations.length) {
  console.error(
    `\n✗ 品牌色守卫（G2 同框禁令）：以下文件同时引用 --color-spot* 与 --color-danger。` +
      `\n  品红点睛色与错误红不得同框（BRAND.md 戒律 · v0.9.2 spot 纪律）。` +
      `\n  spot 只出现在深色叙事区，danger 属于表单/状态区——拆开：\n\n` +
      spotViolations.map((v) => `  ${v}`).join("\n") +
      "\n"
  );
  process.exit(1);
}

console.log("✓ 品牌色守卫通过：components/ 白名单外零硬编码颜色，spot×danger 无同框。");
