import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your Tare Cover workspace to manage protection, policies and claims.",
};

export default function LoginPage() {
  return (
    <main className="auth-page"><div className="auth-panel"><Brand /><div className="auth-copy"><p className="eyebrow">Welcome back</p><h1>Your market, covered.</h1><p>Sign in to manage policies, review claims and keep your traders protected.</p></div><form className="login-form" action="/dashboard"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@market.org" required /><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required /><div className="form-row"><label className="remember-label"><input type="checkbox" name="remember" /> <span>Remember me</span></label><Link href="/dashboard/help">Forgot password?</Link></div><button className="primary-action login-action" type="submit">Sign in to workspace <ArrowRight size={16} /></button></form><p className="auth-footer">New to Tare Cover? <Link href="/">Learn how it works</Link></p></div><aside className="auth-aside"><div className="auth-aside-content"><div className="auth-shield"><ShieldCheck size={24} /></div><h2>Protection that meets you where work happens.</h2><p>From wholesale purchase to mobile-wallet payout, every step is designed for the rhythm of your market.</p><div className="auth-stat"><strong>86.4%</strong><span>of eligible invoices protected this month</span></div></div><Image src="/msulogo.jpeg" alt="MSU logo" width={192} height={192} className="auth-logo" /></aside><Link className="auth-back" href="/"><ArrowLeft size={15} /> Back to home</Link></main>
  );
}