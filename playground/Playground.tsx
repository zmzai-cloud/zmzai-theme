import { Button } from "../src/components/button";
import { Input } from "../src/components/input";
import { Textarea } from "../src/components/textarea";
import { Card, CardHeader, CardBody, CardFooter } from "../src/components/card";
import { Badge } from "../src/components/badge";
import { Avatar } from "../src/components/avatar";
import { Tooltip, TooltipProvider } from "../src/components/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../src/components/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "../src/components/dropdown-menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../src/components/select";
import { Logo } from "../src/brand/logo";
import { Wordmark } from "../src/brand/wordmark";
import { CodeBlock } from "../src/components/code-block";
import { CardSpotlight } from "../src/components/card-spotlight";
import { StatefulButton } from "../src/components/stateful-button";
import { MultiStepLoader } from "../src/components/multi-step-loader";
import { AnimatedTabs } from "../src/components/animated-tabs";
import { MovingBorder } from "../src/components/moving-border";
import { Timeline } from "../src/components/timeline";

export function Playground() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-bg p-12">
        <div className="mx-auto max-w-3xl space-y-12">

          {/* Brand */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Brand</h2>
            <div className="flex items-center gap-4">
              <Logo size={32} />
              <Wordmark />
              <Wordmark sublabel="relay" />
            </div>
          </section>

          {/* Buttons + Stateful */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Button + StatefulButton</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <StatefulButton onClick={() => new Promise(r => setTimeout(r, 1500))}>部署</StatefulButton>
            </div>
          </section>

          {/* Inputs */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Input + Textarea</h2>
            <div className="space-y-3 max-w-md">
              <Input placeholder="Default input…" />
              <Input variant="brutal" placeholder="Brutal input…" />
              <Textarea placeholder="描述任务…" rows={3} />
            </div>
          </section>

          {/* Select */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Select</h2>
            <Select defaultValue="luna">
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="luna">gpt-5.6-luna</SelectItem>
                <SelectItem value="pro">deepseek-v4-pro</SelectItem>
                <SelectItem value="terra">gpt-5.6-terra</SelectItem>
              </SelectContent>
            </Select>
          </section>

          {/* Badge + Avatar */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Badge + Avatar + Tooltip</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="solid">活跃</Badge>
              <Badge variant="outline">草稿</Badge>
              <Badge variant="success">● 完成</Badge>
              <Badge variant="warning">试用中</Badge>
              <Badge variant="accent">需要审批</Badge>
              <Badge variant="danger">失败</Badge>
              <Avatar alt="牧之" size={32} />
              <Avatar alt="AI" size={28} />
              <Tooltip content="点击删除">
                <button className="text-ink-2 hover:text-danger"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
              </Tooltip>
            </div>
          </section>

          {/* Dropdown */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">DropdownMenu</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>操作</DropdownMenuLabel>
                <DropdownMenuItem>编辑</DropdownMenuItem>
                <DropdownMenuItem>复制链接</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          {/* Dialog */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Dialog</h2>
            <Dialog>
              <DialogTrigger asChild><Button variant="secondary">打开弹窗</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>确认删除？</DialogTitle>
                  <DialogDescription>此操作不可撤销，文件将被永久删除。</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild><Button variant="secondary">取消</Button></DialogClose>
                  <DialogClose asChild><Button variant="danger">确认删除</Button></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          {/* Moving Border */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">MovingBorder</h2>
            <div className="max-w-md">
              <MovingBorder duration={5}>
                <div className="p-4"><Input variant="brutal" placeholder="边框光束旋转…" /></div>
              </MovingBorder>
            </div>
          </section>

          {/* Cards */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Card + CardSpotlight</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card variant="interactive" animatedHover padding="lg">
                <h3 className="mb-1 font-semibold">Interactive Card</h3>
                <p className="text-sm text-ink-2">Hover — lift up.</p>
              </Card>
              <CardSpotlight radius={250} className="p-6">
                <h3 className="mb-1 font-semibold">Card Spotlight</h3>
                <p className="text-sm text-ink-2">鼠标移上来 — 径向光跟随。</p>
              </CardSpotlight>
            </div>
          </section>

          {/* Code Block */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">CodeBlock</h2>
            <CodeBlock
              filename="useUsers.ts"
              language="typescript"
              code={`import { useState } from 'react';
import type { User } from '@/types';

export function useUsers(query: string) {
  const [users, setUsers] = useState<User[]>([]);
  // TODO: implement fetch logic
  return { users, loading: false };
}`}
            />
          </section>

          {/* Multi Step Loader */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">MultiStepLoader</h2>
            <Card padding="lg" className="max-w-md">
              <MultiStepLoader
                currentIndex={2}
                steps={[
                  { text: "分析需求，确定组件结构" },
                  { text: "创建 TypeScript 类型定义" },
                  { text: "编写 UserList 组件" },
                  { text: "添加搜索和排序功能" },
                  { text: "运行测试验证" },
                ]}
              />
            </Card>
          </section>

          {/* Animated Tabs */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">AnimatedTabs</h2>
            <Card padding="md" className="max-w-md">
              <AnimatedTabs
                tabs={[
                  { label: "产物", content: <p className="text-sm text-ink-2 py-2">智能体产出的文件列表</p> },
                  { label: "文件", content: <p className="text-sm text-ink-2 py-2">工作区文件树</p> },
                  { label: "差异", content: <p className="text-sm text-ink-2 py-2">代码变更差异</p> },
                ]}
              />
            </Card>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Timeline</h2>
            <Card padding="lg" className="max-w-md">
              <Timeline
                items={[
                  { title: "任务创建", time: "14:32", status: "done", content: <span className="text-ink-2">用户发起请求：「帮我写一个 React 组件」</span> },
                  { title: "读取文件", time: "14:33", status: "done", content: <span className="text-ink-2">读取 <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">types/index.ts</code></span> },
                  { title: "执行中", time: "14:34", status: "active", content: <span className="text-ink-2">正在编写 UserList 组件…</span> },
                  { title: "等待审批", time: "—", status: "default", content: <span className="text-ink-2">写入 <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">UserList.tsx</code></span> },
                ]}
              />
            </Card>
          </section>

        </div>
      </div>
    </TooltipProvider>
  );
}
