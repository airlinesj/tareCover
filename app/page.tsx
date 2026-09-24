import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, CircleCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";

export const metadata = {
  title: "Tare Cover | Simple protection for working stock",
  description: "Microinsurance for Zimbabwean traders and artisans, built into the way you already buy and sell.",
};

const benefits = ["Cover issued in minutes", "No adjuster visits for everyday claims", "Direct mobile-wallet payouts"];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Public navigation">
        <Brand />
        <div className="landing-links"><Link href="#how-it-works">How it works</Link><Link href="#partners">For market partners</Link><Link href="#about">About Tare Cover</Link></div>
        <div className="landing-actions"><Link className="landing-signin" href="/login">Sign in</Link><Link className="landing-cta" href="/login">Get started <ArrowRight size={15} /></Link></div>
      </nav>

      <section className="hero-section" id="about">
        <div className="hero-copy"><p className="eyebrow">Protection that moves with you</p><h1>Keep your work moving, <em>whatever comes.</em></h1><p className="hero-text">Simple, short-term cover for the stock, tools and income that keep Zimbabwe&apos;s informal economy moving.</p><div className="hero-actions"><Link className="primary-action hero-primary" href="/login">Protect your stock <ArrowRight size={17} /></Link><Link className="hero-secondary" href="#how-it-works">See how it works <ChevronRight size={15} /></Link></div><div className="hero-trust"><div className="trust-avatars"><span>TM</span><span>CN</span><span>BK</span></div><p><strong>Built for the people who build Zimbabwe.</strong><br />Trusted by traders across Harare markets.</p></div></div>
        <div className="hero-visual"><div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" /><div className="hero-photo-frame"><Image src="/msulogo.jpeg" alt="MSU logo representing Tare Cover protection" width={192} height={192} priority /></div><div className="hero-float-card hero-float-top"><div className="float-icon"><CircleCheck size={16} /></div><div><strong>Cover is active</strong><span>Policy TC-1048 · Just now</span></div></div><div className="hero-float-card hero-float-bottom"><span className="float-label">Protected today</span><strong>US$ 24,680</strong><span className="float-positive">+12.1% this month</span></div></div>
      </section>

      <section className="proof-strip"><p>One platform for everyday resilience</p><div><span>Traders</span><span>Market leaders</span><span>Wholesalers</span><span>Community partners</span></div></section>

      <section className="how-section" id="how-it-works"><div className="section-heading"><p className="eyebrow">The simple version</p><h2>Protection, without the paperwork.</h2><p>From the moment stock changes hands to the moment a claim is paid, Tare Cover keeps the process human and clear.</p></div><div className="benefit-grid"><article><span className="step-number">01</span><ShieldCheck size={22} /><h3>Choose your cover</h3><p>Pick protection at checkout based on the value of the stock you are buying.</p></article><article><span className="step-number">02</span><Sparkles size={22} /><h3>Keep trading</h3><p>Your digital certificate arrives instantly. No forms, queues or adjuster visits.</p></article><article><span className="step-number">03</span><CircleCheck size={22} /><h3>Recover quickly</h3><p>When the unexpected happens, verify your claim and receive a direct payout.</p></article></div></section>

      <section className="partner-section" id="partners"><div><p className="eyebrow">Made for the whole market</p><h2>One small layer of cover can protect a whole livelihood.</h2><p>Wholesalers, associations and agents can make protection part of an existing workflow, without adding friction for the people they serve.</p><Link className="text-link" href="/login">Explore the workspace <ArrowRight size={15} /></Link></div><div className="benefit-list">{benefits.map((benefit) => <div key={benefit}><span><Check size={13} /></span>{benefit}</div>)}</div></section>

      <footer className="landing-footer"><Brand compact /><p>Microinsurance for the everyday economy.</p><Link href="/login">Sign in to workspace <ArrowRight size={14} /></Link></footer>
    </main>
  );
}
