"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, CircleDollarSign, FileCheck2, HeartPulse, Hospital, Info, ShieldCheck, Stethoscope, WalletCards } from "lucide-react";

const benefits = {
  basic: {
    label: "Essential health access",
    fee: 0.5,
    description: "Unlocked when the health micro-voucher deduction is US$0.50.",
    items: ["One primary care consultation", "Essential generic medicine support", "Digital token valid at partner clinics"],
    claimLimit: 15,
  },
  expanded: {
    label: "Expanded health access",
    fee: 1,
    description: "Unlocked on larger restocks when the health deduction is US$1.00.",
    items: ["Primary care consultation", "Essential medicine support", "Follow-up visit allowance", "Priority partner pharmacy access"],
    claimLimit: 30,
  },
};

export function HealthInsurancePage() {
  const [batchValue, setBatchValue] = useState(1250);
  const [claimMessage, setClaimMessage] = useState("Choose a benefit to start a demo claim.");
  const healthBenefit = useMemo(() => batchValue <= 500 ? benefits.basic : benefits.expanded, [batchValue]);
  const stockPremium = useMemo(() => batchValue <= 300 ? batchValue * 0.02 : batchValue <= 1500 ? batchValue * 0.011 : batchValue * 0.007, [batchValue]);
  const totalLevy = stockPremium + healthBenefit.fee;

  function makeClaim(label: string) {
    setClaimMessage(`${label} claim submitted. Your ${healthBenefit.label.toLowerCase()} covers up to US$${healthBenefit.claimLimit} in this demo policy period.`);
  }

  return <div className="health-insurance-page"><div className="health-hero"><div><p className="deep-eyebrow">Health micro-insurance</p><h2>See what your restock unlocks</h2><p>The health contribution is shown separately on every protected invoice, so traders can understand the deduction and use their benefits with confidence.</p></div><div className="health-hero-icon"><HeartPulse size={28} /></div></div><div className="health-dashboard-grid"><section className="health-charge-card"><div className="health-card-heading"><div><p className="deep-eyebrow">Your invoice today</p><h3>Restock-linked charge</h3></div><CircleDollarSign size={20} /></div><label htmlFor="health-batch-value">Batch value</label><div className="health-value-input"><span>US$</span><input id="health-batch-value" type="number" min="50" step="50" value={batchValue} onChange={(event) => setBatchValue(Math.max(50, Number(event.target.value)))} /></div><input className="health-range" type="range" min="50" max="5000" step="50" value={Math.min(batchValue, 5000)} onChange={(event) => setBatchValue(Number(event.target.value))} aria-label="Adjust batch value" /><div className="health-ledger"><div><span>Stock insurance premium</span><strong>US$ {stockPremium.toFixed(2)}</strong></div><div className="health-ledger-highlight"><span>Health micro-voucher</span><strong>+ US$ {healthBenefit.fee.toFixed(2)}</strong></div><div className="health-ledger-total"><span>Total invoice levy</span><strong>US$ {totalLevy.toFixed(2)}</strong></div></div><p className="health-charge-note"><Info size={14} /> The health amount is not hidden inside the stock premium. It is a separate restock-linked contribution.</p></section><section className="health-benefit-card"><div className="health-card-heading"><div><p className="deep-eyebrow">What you receive</p><h3>{healthBenefit.label}</h3></div><ShieldCheck size={20} /></div><p className="health-benefit-description">{healthBenefit.description}</p><div className="benefit-list">{healthBenefit.items.map((item) => <div key={item}><CheckCircle2 size={15} /><span>{item}</span></div>)}</div><div className="health-limit"><span>Demo claim allowance</span><strong>Up to US$ {healthBenefit.claimLimit}</strong></div></section></div><section className="health-claims-card"><div className="health-card-heading"><div><p className="deep-eyebrow">Use your contribution</p><h3>Eligible health claims</h3></div><FileCheck2 size={20} /></div><div className="health-claim-options"><button type="button" onClick={() => makeClaim("Primary care consultation")}><span><Stethoscope size={17} /></span><strong>Primary care consultation<small>Claim a visit at a participating clinic</small></strong><ArrowRight size={15} /></button><button type="button" onClick={() => makeClaim("Essential medicine support")}><span><Hospital size={17} /></span><strong>Essential medicine support<small>Request support for approved generic medicine</small></strong><ArrowRight size={15} /></button><button type="button" onClick={() => makeClaim("Partner pharmacy access")}><span><WalletCards size={17} /></span><strong>Partner pharmacy access<small>Use your digital voucher at the network</small></strong><ArrowRight size={15} /></button></div><p className="health-claim-feedback" role="status">{claimMessage}</p></section></div>;
}