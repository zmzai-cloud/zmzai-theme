"use client";

import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";
import { Navbar, type NavbarProps } from "../navbar";
import "./landing.css";

/* ════════════════════════════════════════════════════════════
   Landing kit — open-design.ai 风格落地页组件。
   样式见 landing.css（token 由消费端 @theme 提供）。
════════════════════════════════════════════════════════════ */

/* ── LandingButton — 胶囊按钮（solid/outline），href 时渲染 a ── */
type LandingButtonBase = {
  variant?: "solid" | "outline";
  /** 尾部滑入箭头 → */
  arrow?: boolean;
  href?: string;
  className?: string;
  children?: ReactNode;
};

export type LandingButtonProps = LandingButtonBase &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LandingButtonBase> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof LandingButtonBase>;

export function LandingButton({
  variant = "solid",
  arrow = false,
  href,
  className,
  children,
  ...rest
}: LandingButtonProps) {
  const cls = cn("landing-btn", variant === "solid" ? "btn-solid" : "btn-outline", className);
  const inner = (
    <>
      {children}
      {arrow && <span className="arrow-slide">→</span>}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}

/* ── PillTabs — 胶囊标签栏 ── */
export interface PillTabItem {
  value: string;
  label: ReactNode;
}

export interface PillTabsProps {
  items: PillTabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function PillTabs({ items, value, onValueChange, className }: PillTabsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="tablist">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          className={cn("tab-pill", item.value === value && "active")}
          onClick={() => onValueChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ── StepList — 工作流步骤条（点击切换） ── */
export interface StepEntry {
  num: string;
  title: string;
  desc?: string;
}

export interface StepListProps {
  steps: StepEntry[];
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function StepList({ steps, active, onSelect, className }: StepListProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((s, i) => (
        <div
          key={s.num}
          className={cn("step-item", i === active && "active")}
          onClick={() => onSelect(i)}
        >
          <span className="step-num">{s.num}</span>
          <div>
            <div className="font-semibold">{s.title}</div>
            {s.desc && (
              <div className={cn("text-xs mt-0.5", i === active ? "text-paper/70" : "text-muted")}>
                {s.desc}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── WorkflowFrame — 视觉卡框架 + 浮动 step badge ── */
export interface WorkflowFrameProps {
  /** 左上角浮动徽章文案（如 "step 1"） */
  badge?: string;
  className?: string;
  children?: ReactNode;
}

export function WorkflowFrame({ badge, className, children }: WorkflowFrameProps) {
  return (
    <div className={cn("workflow-frame", className)}>
      {badge && <span className="step-badge">{badge}</span>}
      <div className="workflow-frame-inner">{children}</div>
    </div>
  );
}

/* ── Pipeline — 管线 breadcrumb（节点 + 箭头，current 高亮） ── */
export interface PipelineProps {
  items: string[];
  /** 高亮节点下标 */
  current?: number;
  className?: string;
}

export function Pipeline({ items, current, className }: PipelineProps) {
  return (
    <div className={cn("pipeline", className)}>
      {items.map((node, i) => (
        <span key={node} className="contents">
          <span className={cn("pipeline-node", i === current && "current")}>{node}</span>
          {i < items.length - 1 && <span className="pipeline-arrow">→</span>}
        </span>
      ))}
    </div>
  );
}

/* ── WhyCard — 特性卡（dark 变体：一暗多亮） ── */
export interface WhyCardProps {
  dark?: boolean;
  icon?: ReactNode;
  title: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function WhyCard({ dark = false, icon, title, className, children }: WhyCardProps) {
  return (
    <div className={cn("why-card", dark && "dark", className)}>
      {icon && <div className="why-card-icon">{icon}</div>}
      <div className="text-lg font-bold">{title}</div>
      {children}
    </div>
  );
}

/* ── Chip — 集成/标签胶囊 ── */
export interface ChipProps {
  /** 左侧 accent 圆点 */
  dot?: boolean;
  href?: string;
  className?: string;
  children?: ReactNode;
}

export function Chip({ dot = true, href, className, children }: ChipProps) {
  const cls = cn("chip", className);
  const inner = (
    <>
      {dot && <span className="chip-dot" />}
      {children}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return <span className={cls}>{inner}</span>;
}

/* ── CheckList — 绿色勾选清单（boxed 带边框卡） ── */
export interface CheckListProps {
  items: ReactNode[];
  boxed?: boolean;
  className?: string;
}

export function CheckList({ items, boxed = true, className }: CheckListProps) {
  return (
    <div className={cn(boxed && "border border-line bg-paper p-8", className)}>
      {items.map((item, i) => (
        <div key={i} className="check-row">
          <span className="check-mark">✓</span>
          <span className="text-ink-2">{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ── FaqAccordion — FAQ 手风琴（各项独立开合） ── */
export interface FaqEntry {
  q: string;
  a: ReactNode;
}

export interface FaqAccordionProps {
  items: FaqEntry[];
  className?: string;
}

function FaqItem({ q, a }: FaqEntry) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("faq-item", open && "open")}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer">
        <p className="text-sm leading-relaxed text-ink-2">{a}</p>
      </div>
    </div>
  );
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

/* ── StatusBadge — live 脉冲 / building 流光 / planned 虚线 ── */
export type LandingStatus = "live" | "building" | "planned";

export interface StatusBadgeProps {
  status: LandingStatus;
  /** 状态文案（消费端决定措辞，如 已上线 / 建设中） */
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  if (status === "live") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-success",
          className,
        )}
      >
        <span className="relative flex size-1.5">
          <span className="status-pulse absolute inset-0 rounded-full bg-success" />
          <span className="relative size-1.5 rounded-full bg-success" />
        </span>
        {label}
      </span>
    );
  }
  if (status === "building") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-accent",
          className,
        )}
      >
        <span className="status-progress w-6 h-1 bg-accent/20 text-accent" />
        {label}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-muted",
        className,
      )}
    >
      <span className="status-dashed size-2.5" />
      {label}
    </span>
  );
}

/* ── CountUp — 进入视口后从 0 计数 ── */
export interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, suffix = "", duration = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("count-num", className)}>
      {display}
      {suffix}
    </span>
  );
}

/* ── NavShell — 吸顶胶囊导航：顶部全宽，滚动后收缩为浮动胶囊 ── */
export interface NavShellProps extends NavbarProps {
  /** 触发浮动形态的滚动距离（px） */
  floatingThreshold?: number;
}

export function NavShell({ floatingThreshold = 16, className, ...navbar }: NavShellProps) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > floatingThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [floatingThreshold]);

  return (
    <div className={cn("nav-shell", floating && "floating")}>
      <Navbar className={cn("site-nav static! border-b-0!", className)} {...navbar} />
    </div>
  );
}
