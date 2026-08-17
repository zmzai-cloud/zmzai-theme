import { useState } from "react";
import { Button } from "../src/components/button";
import { Input } from "../src/components/input";
import { Textarea } from "../src/components/textarea";
import { Card } from "../src/components/card";
import { Badge } from "../src/components/badge";
import { Avatar } from "../src/components/avatar";
import { Tooltip, TooltipProvider } from "../src/components/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../src/components/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "../src/components/dropdown-menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../src/components/select";
import { ModelSelector } from "../src/components/model-selector";
import type { ModelSelectorData } from "../src/components/model-selector";
import { Logo } from "../src/brand/logo";
import { Wordmark } from "../src/brand/wordmark";

// Aceternity components
import { CodeBlock } from "../src/components/code-block";
import { CardSpotlight } from "../src/components/card-spotlight";
import { StatefulButton } from "../src/components/stateful-button";
import { MultiStepLoader } from "../src/components/multi-step-loader";
import { AnimatedTabs } from "../src/components/animated-tabs";
import { MovingBorder } from "../src/components/moving-border";
import { Timeline } from "../src/components/timeline";
import { MagneticButton } from "../src/components/magnetic-button";
import { GlowingEffect } from "../src/components/glowing-effect";
import { TextHoverEffect } from "../src/components/text-hover-effect";
import { HoverBorderGradient } from "../src/components/hover-border-gradient";
import { FloatingNavbar } from "../src/components/floating-navbar";
import { AceternitySidebar } from "../src/components/aceternity-sidebar";
import { BentoGrid } from "../src/components/bento-grid";
import { ExpandableCard } from "../src/components/expandable-card";
import { FocusCards } from "../src/components/focus-cards";
import { TracingBeam } from "../src/components/tracing-beam";
import { FileUpload } from "../src/components/file-upload";
import { VanishInput } from "../src/components/vanish-input";
import { TextGenerate } from "../src/components/text-generate";
import { EncryptText } from "../src/components/encrypt-text";
import { Typewriter } from "../src/components/typewriter";
import { FlipWords } from "../src/components/flip-words";
import { Terminal } from "../src/components/terminal";
import { Keyboard } from "../src/components/keyboard";
import { Notch } from "../src/components/notch";
import { StickyBanner } from "../src/components/sticky-banner";
import { Compare } from "../src/components/compare";
import { InfiniteMovingCards } from "../src/components/infinite-moving-cards";
import { Loader } from "../src/components/loader";
import { Skeleton } from "../src/components/skeleton";
import { EmptyState } from "../src/components/empty-state";
import { Carousel } from "../src/components/carousel";
import { CardHoverEffect } from "../src/components/card-hover-effect";
import { WobbleCard } from "../src/components/wobble-card";
import { GlareCard } from "../src/components/glare-card";
import { CometCard } from "../src/components/comet-card";
import { Card3D } from "../src/components/card-3d";

export function Playground() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-bg">
        {/* Floating Navbar */}
        <FloatingNavbar>
          <div className="flex items-center gap-1 px-3 py-1.5 text-sm">
            <Logo size={20} />
            <Wordmark size={14} />
          </div>
        </FloatingNavbar>

        <div className="mx-auto max-w-3xl space-y-16 p-12 pt-24">

          {/* Brand */}
          <Section title="Brand">
            <div className="flex items-center gap-4">
              <Logo size={32} />
              <Wordmark />
              <Wordmark sublabel="relay" />
            </div>
          </Section>

          {/* Text Effects */}
          <Section title="Text Effects">
            <div className="space-y-3">
              <TextGenerate text="今天想做些什么？自动拆解步骤、调用工具、逐步执行。" />
              <EncryptText text="DECRYPTED MESSAGE" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink-2">Agent 正在</span>
                <FlipWords words={["分析需求", "生成代码", "运行测试", "部署上线"]} />
              </div>
              <Typewriter text="const x = await fetch('/api/users')" />
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Buttons">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <StatefulButton onClick={() => new Promise(r => setTimeout(r, 1500))}>部署</StatefulButton>
              <MagneticButton className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white">Magnetic</MagneticButton>
            </div>
            <div className="mt-4">
              <TextHoverEffect text="HOVER ME" className="text-2xl font-bold" />
            </div>
          </Section>

          {/* Inputs */}
          <Section title="Inputs">
            <div className="space-y-3 max-w-md">
              <Input placeholder="Default input…" />
              <Input variant="brutal" placeholder="Brutal input…" />
              <Textarea placeholder="描述任务…" rows={2} />
              <VanishInput placeholders={["搜索会话…", "搜索文件…", "搜索智能体…"]} onSubmit={() => {}} />
            </div>
          </Section>

          {/* Select */}
          <Section title="Select">
            <Select defaultValue="luna">
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="luna">gpt-5.6-luna</SelectItem>
                <SelectItem value="pro">deepseek-v4-pro</SelectItem>
                <SelectItem value="terra">gpt-5.6-terra</SelectItem>
              </SelectContent>
            </Select>
          </Section>

          {/* ModelSelector */}
          <Section title="ModelSelector">
            <ModelSelectorDemo />
          </Section>

          {/* Badge + Avatar */}
          <Section title="Badge + Avatar">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="solid">活跃</Badge>
              <Badge variant="success">● 完成</Badge>
              <Badge variant="warning">试用中</Badge>
              <Badge variant="accent">需要审批</Badge>
              <Badge variant="danger">失败</Badge>
              <Avatar alt="牧之" size={32} />
              <Tooltip content="点击删除">
                <button className="text-ink-2 hover:text-danger"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg></button>
              </Tooltip>
              <Keyboard>⌘K</Keyboard>
            </div>
          </Section>

          {/* Hover Border Gradient */}
          <Section title="HoverBorderGradient">
            <HoverBorderGradient className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium text-ink">
              Hover for border sweep
            </HoverBorderGradient>
          </Section>

          {/* Moving Border */}
          <Section title="MovingBorder">
            <div className="max-w-md">
              <MovingBorder duration={5}>
                <div className="p-4"><Input variant="brutal" placeholder="边框光束旋转…" /></div>
              </MovingBorder>
            </div>
          </Section>

          {/* Cards */}
          <Section title="Cards">
            <div className="grid grid-cols-2 gap-4">
              <Card variant="interactive" animatedHover padding="lg">
                <h3 className="mb-1 font-semibold">Interactive Card</h3>
                <p className="text-sm text-ink-2">Hover — lift + shadow.</p>
              </Card>
              <CardSpotlight radius={250} className="p-6">
                <h3 className="mb-1 font-semibold">Card Spotlight</h3>
                <p className="text-sm text-ink-2">鼠标移上来 — 径向光。</p>
              </CardSpotlight>
              <GlowingEffect className="rounded-xl border border-line p-6">
                <h3 className="mb-1 font-semibold">Glowing Effect</h3>
                <p className="text-sm text-ink-2">Hover — border glow.</p>
              </GlowingEffect>
              <WobbleCard className="rounded-xl border border-line p-6">
                <h3 className="mb-1 font-semibold">Wobble Card</h3>
                <p className="text-sm text-ink-2">Hover — wobble tilt.</p>
              </WobbleCard>
            </div>
          </Section>

          {/* Dark Cards */}
          <Section title="Dark Card Variants">
            <div className="grid grid-cols-3 gap-4">
              <GlareCard className="h-32 p-4">
                <span className="text-sm font-medium text-dark-ink">Glare Card</span>
              </GlareCard>
              <CometCard className="h-32 p-4">
                <span className="text-sm font-medium text-dark-ink">Comet Card</span>
              </CometCard>
              <Card3D className="h-32 p-4">
                <span className="text-sm font-medium">3D Card</span>
              </Card3D>
            </div>
          </Section>

          {/* Bento Grid */}
          <Section title="BentoGrid">
            <BentoGrid items={[
              { title: "API 调用", description: "128.4K", span: "2x1" },
              { title: "延迟", description: "234ms", span: "1x1" },
              { title: "活跃用户", description: "3,829", span: "1x1" },
              { title: "消费", description: "¥2,481", span: "2x1" },
            ]} />
          </Section>

          {/* Expandable Card */}
          <Section title="ExpandableCard">
            <ExpandableCard
              title="运行详情：你干哈呢"
              className="max-w-md"
              expandedContent={
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink" /> 分析需求 — 0.2s</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink" /> 创建类型 — 0.4s</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink" /> 编写组件 — 1.2s</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-line" /> 运行测试 — 等待中</div>
                </div>
              }
            >
              <span>通用 · gpt-5.6-luna · 5 步执行</span>
            </ExpandableCard>
          </Section>

          {/* Focus Cards */}
          <Section title="FocusCards">
            <FocusCards items={[
              { title: "生成 PPT", description: "演示文稿" },
              { title: "写文档", description: "长文写作" },
              { title: "数据分析", description: "清洗可视化" },
            ]} />
          </Section>

          {/* Card Hover Effect */}
          <Section title="CardHoverEffect">
            <CardHoverEffect items={[
              { title: "快速", description: "毫秒级响应" },
              { title: "可靠", description: "99.9% SLA" },
              { title: "安全", description: "端到端加密" },
            ]} />
          </Section>

          {/* Code Block */}
          <Section title="CodeBlock">
            <CodeBlock
              filename="useUsers.ts"
              language="typescript"
              code={`import { useState } from 'react';
export function useUsers(query: string) {
  const [users, setUsers] = useState<User[]>([]);
  return { users, loading: false };
}`}
            />
          </Section>

          {/* Terminal */}
          <Section title="Terminal">
            <Terminal title="bash">
              <div className="space-y-1">
                <div><span className="text-success">$</span> <span className="text-dark-ink">npm run dev</span></div>
                <div className="text-dark-ink/60">Ready on http://localhost:3000</div>
              </div>
            </Terminal>
          </Section>

          {/* Multi Step Loader */}
          <Section title="MultiStepLoader">
            <Card padding="lg" className="max-w-md">
              <MultiStepLoader currentIndex={2} steps={[
                { text: "分析需求" }, { text: "创建类型" }, { text: "编写组件" }, { text: "运行测试" },
              ]} />
            </Card>
          </Section>

          {/* Animated Tabs */}
          <Section title="AnimatedTabs">
            <Card padding="md" className="max-w-md">
              <AnimatedTabs tabs={[
                { label: "产物", content: <p className="py-2 text-sm text-ink-2">文件列表</p> },
                { label: "文件", content: <p className="py-2 text-sm text-ink-2">文件树</p> },
                { label: "差异", content: <p className="py-2 text-sm text-ink-2">变更差异</p> },
              ]} />
            </Card>
          </Section>

          {/* Timeline */}
          <Section title="Timeline">
            <Card padding="lg" className="max-w-md">
              <Timeline items={[
                { title: "任务创建", time: "14:32", status: "done", content: <span className="text-ink-2">用户发起请求</span> },
                { title: "执行中", time: "14:34", status: "active", content: <span className="text-ink-2">正在编写组件…</span> },
                { title: "等待审批", status: "default", content: <span className="text-ink-2">写入文件</span> },
              ]} />
            </Card>
          </Section>

          {/* Dialog + Dropdown */}
          <Section title="Dialog + DropdownMenu">
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild><Button variant="secondary">打开弹窗</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>确认删除？</DialogTitle>
                    <DialogDescription>此操作不可撤销。</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild><Button variant="secondary">取消</Button></DialogClose>
                    <DialogClose asChild><Button variant="danger">确认</Button></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>操作</DropdownMenuLabel>
                  <DropdownMenuItem>编辑</DropdownMenuItem>
                  <DropdownMenuItem>复制</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive>删除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Section>

          {/* File Upload */}
          <Section title="FileUpload">
            <div className="max-w-md">
              <FileUpload onChange={() => {}} />
            </div>
          </Section>

          {/* Compare */}
          <Section title="Compare">
            <div className="max-w-md overflow-hidden rounded-xl border border-line">
              <Compare
                before={<div className="flex h-40 items-center justify-center bg-surface-2 text-sm text-ink-3">改版前</div>}
                after={<div className="flex h-40 items-center justify-center bg-ink text-sm text-white">改版后</div>}
              />
            </div>
          </Section>

          {/* Infinite Moving Cards */}
          <Section title="InfiniteMovingCards">
            <InfiniteMovingCards speed="slow" items={[
              <div key="1" className="rounded-lg border border-line bg-bg px-6 py-3 text-sm">⚡ 快速</div>,
              <div key="2" className="rounded-lg border border-line bg-bg px-6 py-3 text-sm">🔒 安全</div>,
              <div key="3" className="rounded-lg border border-line bg-bg px-6 py-3 text-sm">✨ 现代</div>,
              <div key="4" className="rounded-lg border border-line bg-bg px-6 py-3 text-sm">🚀 高效</div>,
            ]} />
          </Section>

          {/* Loaders + Skeleton */}
          <Section title="Loaders + Skeleton">
            <div className="flex flex-wrap items-center gap-6">
              <Loader variant="spinner" />
              <Loader variant="dots" />
              <Loader variant="bars" />
              <Loader variant="ring" />
              <Loader variant="pulse" />
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </Section>

          {/* Notch */}
          <Section title="Notch">
            <Notch visible>
              <span className="px-4 py-1.5 text-sm font-medium text-dark-ink">● Agent 运行中</span>
            </Notch>
          </Section>

          {/* Sticky Banner */}
          <Section title="StickyBanner">
            <StickyBanner variant="info">
              <span className="text-sm">新版本 v2.0 已发布，支持 MiSans 字体。</span>
            </StickyBanner>
          </Section>

          {/* Empty State */}
          <Section title="EmptyState">
            <EmptyState
              icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
              title="还没有任务"
              description="选择一个智能体，描述你想完成的任务。"
              action={<Button>创建任务</Button>}
            />
          </Section>

          {/* Tracing Beam */}
          <Section title="TracingBeam">
            <TracingBeam>
              <div className="space-y-8 pl-8">
                <div>
                  <h3 className="mb-1 font-semibold">第一步：需求分析</h3>
                  <p className="text-sm text-ink-2">Agent 解析用户意图，拆解为可执行步骤。</p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">第二步：代码生成</h3>
                  <p className="text-sm text-ink-2">根据步骤逐步生成代码文件。</p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">第三步：测试验证</h3>
                  <p className="text-sm text-ink-2">运行测试确保代码正确性。</p>
                </div>
              </div>
            </TracingBeam>
          </Section>

          {/* Carousel */}
          <Section title="Carousel">
            <div className="max-w-md">
              <Carousel items={[
                <div key="1" className="flex h-40 items-center justify-center rounded-xl border border-line bg-surface text-sm">Slide 1</div>,
                <div key="2" className="flex h-40 items-center justify-center rounded-xl border border-line bg-surface text-sm">Slide 2</div>,
                <div key="3" className="flex h-40 items-center justify-center rounded-xl border border-line bg-surface text-sm">Slide 3</div>,
              ]} />
            </div>
          </Section>

        </div>
      </div>
    </TooltipProvider>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

const mockData: ModelSelectorData = {
  featured: [
    { id: "gpt-5.6-sol", name: "GPT-5.6-Sol", description: "速度、质量和成本表现均衡的模型", channel: "openai" },
    { id: "deepseek-v4-pro", name: "DeepSeek-V4-Pro", description: "用于处理复杂任务的模型", channel: "deepseek" },
    { id: "deepseek-v4-flash", name: "DeepSeek-V4-Flash", description: "兼具快速响应与低消耗的模型", channel: "deepseek" },
  ],
  channels: [
    {
      id: "openai",
      name: "OpenAI",
      models: [
        { id: "gpt-5.6-sol", name: "gpt-5.6-sol", meta: { price: "入 3 / 出 12 元/1k" } },
        { id: "gpt-5.6-terra", name: "gpt-5.6-terra", meta: { price: "入 6 / 出 24 元/1k" } },
        { id: "gpt-5.6-luna", name: "gpt-5.6-luna", meta: { price: "入 1.5 / 出 6 元/1k" } },
      ],
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      models: [
        { id: "deepseek-v4-flash", name: "deepseek-v4-flash", meta: { price: "入 0.3 / 出 1.2 元/1k" } },
        { id: "deepseek-v4-pro", name: "deepseek-v4-pro", meta: { price: "入 2 / 出 8 元/1k" } },
      ],
    },
  ],
};

function ModelSelectorDemo() {
  const [value, setValue] = useState({ channel: "openai", model: "gpt-5.6-sol" });
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-ink-2">基础用法</p>
        <ModelSelector data={mockData} value={value} onChange={setValue} placeholder="选择模型" />
      </div>
      <div>
        <p className="mb-2 text-sm text-ink-2">带搜索</p>
        <ModelSelector data={mockData} value={value} onChange={setValue} searchable placeholder="选择模型" />
      </div>
      <div className="rounded-lg border border-line bg-surface p-4 font-mono text-xs text-ink-2">
        选中: channel={value.channel} model={value.model}
      </div>
    </div>
  );
}
