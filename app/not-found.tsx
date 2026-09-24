import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { Brand } from "@/components/brand";

export const metadata = {
  title: "Page not found",
  description: "The Tare Cover page you requested could not be found.",
};

export default function NotFound() {
  return <main className="not-found-page"><Brand /><div className="not-found-content"><div className="not-found-icon"><ShieldAlert size={28} /></div><p className="eyebrow">Error 404</p><h1>This page has left the market.</h1><p>It may have moved, expired or never existed. Let&apos;s get you back to a useful place.</p><div className="not-found-actions"><Link className="primary-action" href="/">Back to home <ArrowRight size={16} /></Link><Link className="text-link" href="/dashboard"><ArrowLeft size={15} /> Open dashboard</Link></div></div></main>;
}