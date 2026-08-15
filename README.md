# @zmzai/theme

zmzai 全品牌设计系统 — Radix UI + framer-motion + Tailwind v4。v0.2.0 起为暖色杂志风（Warm paper / warm ink / seal-red，与 zmzai.cloud 主应用同源）；v0.1.x 黑白 Monochrome 已废弃。

## Quick Start

### Install (consumer app)

```bash
pnpm add @zmzai/theme
# or via git:
pnpm add @zmzai/theme@github:Ulanxx/zmzai-theme
```

### Import tokens + fonts

In your app's `globals.css`:

```css
@import "tailwindcss";
@import "@zmzai/theme/tokens";    /* Design tokens (@theme block) */
@import "@zmzai/theme/fonts";     /* Noto Serif SC + JetBrains Mono @font-face */

/* Optional: per-site accent override */
:root {
  --color-accent: #7C3AED;  /* sandbox = violet */
}
```

### Use components

```tsx
import { Button, Card, Logo, Wordmark } from "@zmzai/theme";

<Button variant="primary" size="md">发送</Button>
<Card variant="interactive" animatedHover padding="lg">
  Hover me
</Card>
<Logo size={28} />
<Wordmark sublabel="agent" />
```

## Design Language

- **Color**: 暖纸张底 + 暖墨字 + 印章红 accent（oklch，Hallmark Study 锁定）.
- **Font**: Noto Serif SC 衬线正文（杂志感）+ JetBrains Mono 等宽.
- **Radius**: 锐利编辑风 2/2/4/6px + pill.
- **Motion**: framer-motion, exponential ease-out `cubic-bezier(0.16,1,0.3,1)`.

## Components

| Module | Components |
|--------|-----------|
| `@zmzai/theme` (default) | Button, Input, Card |
| `@zmzai/theme/brand` | Logo, Wordmark |

### Variants (per-site accent)

| Site | accent |
|------|--------|
| cloud / muzhi / auth / agent | `#000000` (default) |
| relay | `#2563EB` blue |
| sandbox | `#7C3AED` violet |
| workos | `#059669` emerald |

## Development

```bash
pnpm install
pnpm playground    # Vite dev server at :5174
pnpm typecheck     # tsc --noEmit
```

## License

Apache-2.0
