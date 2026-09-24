"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { workspaceLinks } from "@/components/workspace-nav";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return <div className="mobile-nav-wrap"><button className="mobile-menu" type="button" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>{isOpen ? <X size={20} /> : <Menu size={20} />}</button>{isOpen && <div className="mobile-nav-popover">{workspaceLinks.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}><Icon size={16} />{item.label}{item.count && <span>{item.count}</span>}</Link>; })}</div>}</div>;
}