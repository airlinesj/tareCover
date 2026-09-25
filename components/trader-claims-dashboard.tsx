"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, Flame, MapPinned, MessageCircle, Send, ShieldCheck, Smartphone, WalletCards } from "lucide-react";

const claimOptions = [
  { label: "Fire or municipal clearance", detail: "Verified macro-disaster route", icon: Flame, amount: 420 },
  { label: "Localized stock loss", detail: "Submit a captured loss report", icon: MapPinned, amount: 280 },
];

const defaultSteps = [
  { label: "Geotagged Receipt Verified", detail: "Capture evidence matched to your stall", state: "complete" },
  { label: "Market Association Vouched", detail: "Association review is ready", state: "current" },
  { label: "Mobile Money Payout Triggered", detail: "EcoCash or InnBucks dispatch", state: "pending" },
];

export function TraderClaimsDashboard() {
  const [steps, setSteps] = useState(defaultSteps);
  const [claimMessage, setClaimMessage] = useState("Choose a claim route to start a demo payout request.");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function sendToken(channel: "WhatsApp" | "SMS") {
    setDeliveryMessage(`Demo token sent via ${channel} to +263 77 245 0198.`);
  }

  async function submitClaim(option: (typeof claimOptions)[number]) {
    setIsSubmitting(true);
    setClaimMessage(`Submitting ${option.label.toLowerCase()} claim...`);
    try {
      const response = await fetch("/api/claims/payout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ claimType: option.label, traderPhone: "+263772450198", amount: option.amount }) });
      const result = await response.json() as { error?: string; payoutReference?: string; eta?: string };
      if (!response.ok) throw new Error(result.error ?? "Claim could not be submitted.");
      setSteps(defaultSteps.map((step) => ({ ...step, state: "complete" })));
      setClaimMessage(`Payout ${result.payoutReference} dispatched to EcoCash. Estimated arrival: ${result.eta}.`);
    } catch (error) { setClaimMessage(error instanceof Error ? error.message : "Claim could not be submitted."); }
    finally { setIsSubmitting(false); }
  }

  return <div className="trader-claims-dashboard"><div className="claims-dashboard-intro"><div><p className="deep-eyebrow">Trader wallet</p><h2>Protection that moves with you</h2><p>Your stock cover, health access, and mobile-money claims in one place.</p></div><span className="wallet-status"><span /> Wallet active</span></div><div className="claims-dashboard-grid"><section className="health-token-card"><div className="token-card-top"><span className="deep-eyebrow">Active digital health token</span><ShieldCheck size={18} /></div><strong>NC-TRD-482910</strong><p>Valid at Nectacare clinics and partner pharmacies.</p><div className="token-card-meta"><span><Clock3 size={14} /> Valid for 30 days</span><span><Smartphone size={14} /> +263 77 245 0198</span></div><div className="token-actions"><button type="button" onClick={() => sendToken("WhatsApp")}><MessageCircle size={15} /> WhatsApp</button><button type="button" onClick={() => sendToken("SMS")}><Send size={15} /> SMS</button></div>{deliveryMessage && <p className="claims-feedback">{deliveryMessage}</p>}</section><section className="payout-card"><div className="payout-card-heading"><div><p className="deep-eyebrow">Instant stock claim</p><h3>What happened to your stock?</h3></div><WalletCards size={19} /></div><p className="payout-description">Use the verified route that best matches the loss. Demo payouts go straight to the trader wallet without a paper adjuster queue.</p><div className="claim-option-list">{claimOptions.map((option) => { const Icon = option.icon; return <button type="button" className="claim-option" key={option.label} disabled={isSubmitting} onClick={() => submitClaim(option)}><span className="claim-option-icon"><Icon size={17} /></span><span><strong>{option.label}</strong><small>{option.detail} · sample US$ {option.amount}</small></span><ArrowRight size={16} /></button>; })}</div><p className="claims-feedback" role="status">{claimMessage}</p></section></div><section className="claim-tracker"><div className="tracker-heading"><div><p className="deep-eyebrow">Live payout tracker</p><h3>From evidence to mobile money</h3></div><span className="mock-pill">Demo API</span></div><div className="tracker-steps">{steps.map((step, index) => <div className={`tracker-step tracker-step-${step.state}`} key={step.label}><span>{step.state === "complete" ? <CheckCircle2 size={16} /> : index + 1}</span><div><strong>{index + 1}. {step.label}</strong><small>{step.detail}</small></div>{index < steps.length - 1 && <i><ArrowRight size={14} /></i>}</div>)}</div></section></div>;
}