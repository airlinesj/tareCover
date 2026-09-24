import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { WorkspaceSidebar } from "@/components/workspace-nav";

type WorkspaceSectionProps = {
  active: string;
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  items: readonly string[];
  children?: ReactNode;
};

export function WorkspaceSection({ active, eyebrow, title, description, metric, metricLabel, items, children }: WorkspaceSectionProps) {
  return <div className="app-frame"><WorkspaceSidebar active={active} /><main className="main-content"><header className="topbar"><MobileNav /><div className="breadcrumb"><Link href="/dashboard">Overview</Link><ArrowUpRight size={14} /><span>{title}</span></div><div className="topbar-actions"><Link className="icon-button" href="/dashboard"><ArrowLeft size={17} /></Link><div className="topbar-divider" /><div className="avatar avatar-ink">TM</div></div></header><div className="content-wrap section-page"><div className="section-page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-subtitle">{description}</p></div><Link className="outline-action" href="/dashboard"><ArrowLeft size={15} /> Back to overview</Link></div><div className="section-summary"><div><span>{metricLabel}</span><strong>{metric}</strong></div><p><CheckCircle2 size={16} /> Workspace data is up to date</p></div>{children}<div className="section-list"><div className="panel-heading"><div><p className="eyebrow">Workspace view</p><h2>What you can do here</h2></div></div>{items.map((item) => <div className="section-list-row" key={item}><CheckCircle2 size={17} /><span>{item}</span><ArrowUpRight size={15} /></div>)}</div></div></main></div>;
}