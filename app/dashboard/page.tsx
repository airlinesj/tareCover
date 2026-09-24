import Link from "next/link";
import { ArrowUpRight, FileCheck2, PackageCheck, Plus, ShieldCheck } from "lucide-react";
import { CheckoutWidget } from "@/components/checkout-widget";
import { MobileNav } from "@/components/mobile-nav";
import { WorkspaceSidebar } from "@/components/workspace-nav";

export const metadata = {
  title: "Workspace overview",
  description: "Monitor market cover, policies, claims and stock protection from your Tare Cover workspace.",
};

export default function Home() {
  return (
    <div className="app-frame">
      <WorkspaceSidebar />

      <main className="main-content" id="overview">
        <header className="topbar"><MobileNav /><div className="breadcrumb"><span>Overview</span><ArrowUpRight size={14} /></div><div className="topbar-actions"><Link className="icon-button" aria-label="Add new policy" href="/dashboard/checkout"><Plus size={18} /></Link><div className="topbar-divider" /><div className="avatar avatar-ink">TM</div></div></header>
        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">Thursday, 24 September 2026 · Harare</p><h1>Good morning, Tendai<span>.</span></h1><p className="page-subtitle">Here is what is happening across your market today.</p></div><Link className="outline-action" href="/dashboard/checkout"><Plus size={16} /> New policy</Link></section>

          <section className="metric-grid" aria-label="Workspace summary">
            <div className="metric-card"><div className="metric-card-top"><span>Active policies</span><div className="metric-icon metric-icon-green"><ShieldCheck size={17} /></div></div><strong>326</strong><p><span className="trend-up">+8.4%</span> <span>vs last month</span></p></div>
            <div className="metric-card"><div className="metric-card-top"><span>Covered stock value</span><div className="metric-icon metric-icon-blue"><PackageCheck size={17} /></div></div><strong>US$ 24.7k</strong><p><span className="trend-up">+12.1%</span> <span>vs last month</span></p></div>
            <div className="metric-card"><div className="metric-card-top"><span>Open claims</span><div className="metric-icon metric-icon-yellow"><FileCheck2 size={17} /></div></div><strong>7</strong><p><span className="trend-neutral">2 due today</span> <span>needs review</span></p></div>
            <div className="metric-card metric-card-accent"><div className="metric-card-top"><span>Protection rate</span><div className="metric-icon metric-icon-white"><ShieldCheck size={17} /></div></div><strong>86.4%</strong><p><span>of eligible invoices covered</span></p></div>
          </section>

          <section className="dashboard-grid" id="checkout"><div className="panel recent-panel"><div className="panel-heading"><div><p className="eyebrow">Latest activity</p><h2>Recent policies</h2></div><Link className="text-action" href="/dashboard/policies">View all <ArrowUpRight size={14} /></Link></div><div className="activity-list"><div className="activity-row"><div className="activity-icon"><PackageCheck size={17} /></div><div><strong>Policy #TC-1048</strong><span>Stock cover · Mbare Musika</span></div><div className="activity-value"><strong>US$ 680</strong><span>just now</span></div><span className="status status-active">Active</span></div><div className="activity-row"><div className="activity-icon activity-icon-blue"><PackageCheck size={17} /></div><div><strong>Policy #TC-1047</strong><span>Stock cover · Siyaso Market</span></div><div className="activity-value"><strong>US$ 1,240</strong><span>18 min ago</span></div><span className="status status-active">Active</span></div><div className="activity-row"><div className="activity-icon activity-icon-yellow"><FileCheck2 size={17} /></div><div><strong>Claim #CL-0291</strong><span>Water damage · Mbare Musika</span></div><div className="activity-value"><strong>US$ 420</strong><span>42 min ago</span></div><span className="status status-review">Review</span></div></div></div><CheckoutWidget /></section>
        </div>
      </main>
    </div>
  );
}
