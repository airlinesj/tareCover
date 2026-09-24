import Link from "next/link";
import { BriefcaseBusiness, Camera, ChevronDown, CircleHelp, FileCheck2, LayoutDashboard, MoreHorizontal, ShieldCheck, Users } from "lucide-react";
import { Brand } from "@/components/brand";

export const workspaceLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/policies", label: "Policies", icon: ShieldCheck, count: "24" },
  { href: "/dashboard/claims", label: "Claims", icon: FileCheck2, count: "3" },
  { href: "/dashboard/traders", label: "Traders", icon: Users },
  { href: "/dashboard/capture", label: "Stock capture", icon: Camera },
  { href: "/dashboard/checkout", label: "Checkout widget", icon: BriefcaseBusiness },
  { href: "/dashboard/help", label: "Help centre", icon: CircleHelp },
];

type WorkspaceNavProps = {
  active?: string;
};

export function WorkspaceSidebar({ active = "/dashboard" }: WorkspaceNavProps) {
  return (
    <aside className="sidebar">
      <Brand compact />
      <div className="workspace-switcher"><div className="avatar avatar-sage">AG</div><div><small>Workspace</small><strong>Agro Market · Harare</strong></div><ChevronDown size={14} /></div>
      <nav className="main-nav" aria-label="Main navigation">
        <p className="nav-label">Workspace</p>
        {workspaceLinks.slice(0, 4).map((item) => <WorkspaceLink key={item.href} item={item} active={active} />)}
        <p className="nav-label nav-label-spaced">Tools</p>
        {workspaceLinks.slice(4, 6).map((item) => <WorkspaceLink key={item.href} item={item} active={active} />)}
      </nav>
      <div className="sidebar-bottom"><WorkspaceLink item={workspaceLinks[6]} active={active} /><div className="user-profile"><div className="avatar avatar-ink">TM</div><div><strong>Tendai M.</strong><small>Administrator</small></div><MoreHorizontal size={17} /></div></div>
    </aside>
  );
}

function WorkspaceLink({ item, active }: { item: (typeof workspaceLinks)[number]; active: string }) {
  const Icon = item.icon;
  return <Link className={`nav-item ${active === item.href ? "nav-item-active" : ""}`} href={item.href}><Icon size={17} /> {item.label}{item.count && <span className={`nav-count ${item.label === "Claims" ? "nav-count-warm" : ""}`}>{item.count}</span>}</Link>;
}