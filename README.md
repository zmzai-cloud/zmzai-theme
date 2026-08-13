# @zmzai/theme

zmzai 全品牌设计系统 — Radix UI + framer-motion + Tailwind v4 + MiSans.

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
@import "@zmzai/theme/fonts";     /* MiSans @font-face */

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

- **Color**: 纯白底 + 纯黑字, neutral grays. 蓝色 `#2563EB` 只用于动态状态.
- **Font**: SF Pro (英文) + MiSans (中文), SF Mono (等宽).
- **Radius**: 8/12/16/20px + pill.
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
