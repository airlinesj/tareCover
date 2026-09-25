"use client";

import { useState } from "react";
import { CheckCircle2, CloudUpload, FileCheck2, Flame, Satellite, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

type IncidentType = "macro" | "localized";
type StepState = "pending" | "active" | "complete";
type VerificationStep = { label: string; detail: string; state: StepState };

const initialSteps: VerificationStep[] = [
  { label: "Geotagged Receipt & Metadata Match", detail: "Waiting for claim evidence", state: "pending" },
  { label: "Satellite / AI Vision Validation", detail: "Waiting for verification source", state: "pending" },
  { label: "Instant Mobile Money Payout", detail: "EcoCash / InnBucks API dispatch", state: "pending" },
];

const incidentOptions = [
  { value: "macro" as const, label: "Macro-Disaster (Fire / Flood)", detail: "Satellite SAR and thermal event simulation", icon: Satellite },
  { value: "localized" as const, label: "Localized Stock Damage", detail: "Gemini Multimodal AI vision simulation", icon: Sparkles },
];

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function ClaimsPortal() {
  const [claimId, setClaimId] = useState("CL-0291");
  const [traderPhone, setTraderPhone] = useState("+263771234567");
  const [incidentType, setIncidentType] = useState<IncidentType>("macro");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [steps, setSteps] = useState(initialSteps);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState("Select an incident and run automated verification to begin.");

  async function runVerification() {
    setIsRunning(true);
    setResult("Matching claim metadata and receipt location...");
    setSteps(initialSteps.map((step, index) => ({ ...step, state: index === 0 ? "active" : "pending" })));
    try {
      await wait(450);
      const verificationResponse = await fetch("/api/claims/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ claimId, traderPhone, incidentType, evidenceName: evidenceFile?.name }) });
      const verification = await verificationResponse.json() as { error?: string; source?: string; confidence?: number; amount?: number };
      if (!verificationResponse.ok) throw new Error(verification.error ?? "Verification failed.");
      setSteps(initialSteps.map((step, index) => ({ ...step, state: index === 1 ? "active" : index === 0 ? "complete" : "pending", detail: index === 1 ? `${verification.source} returned ${verification.confidence}% confidence` : step.detail })));
      setResult(`${verification.source} validation returned ${verification.confidence}% confidence. Preparing mobile-money payout...`);
      await wait(450);
      const payoutResponse = await fetch("/api/claims/payout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ claimType: incidentType === "macro" ? "Macro-disaster" : "Localized stock damage", traderPhone, amount: verification.amount ?? 420 }) });
      const payout = await payoutResponse.json() as { error?: string; payoutReference?: string; wallet?: string; eta?: string };
      if (!payoutResponse.ok) throw new Error(payout.error ?? "Payout dispatch failed.");
      setSteps(initialSteps.map((step) => ({ ...step, state: "complete" })));
      setResult(`Payout ${payout.payoutReference} dispatched to ${payout.wallet}. ETA: ${payout.eta}. Physical adjuster queue bypassed.`);
    } catch (error) { setResult(error instanceof Error ? error.message : "Automated verification failed."); setSteps(initialSteps); }
    finally { setIsRunning(false); }
  }

  return <div className="claims-portal"><div className="claims-portal-header"><div><p className="deep-eyebrow">Automated claims control</p><h2>Verify loss. Release cover.</h2><p>Satellite and multimodal AI simulations move a verified claim from evidence to mobile money in minutes.</p></div><span className="portal-demo-badge"><span /> Mock APIs online</span></div><div className="claims-portal-grid"><section className="claim-intake-card"><div className="portal-section-heading"><div><p className="deep-eyebrow">1 / Claim intake</p><h3>Tell us what happened</h3></div><FileCheck2 size={19} /></div><label htmlFor="claim-id">Claim ID</label><input id="claim-id" value={claimId} onChange={(event) => setClaimId(event.target.value)} /><label htmlFor="claim-phone">Trader phone</label><input id="claim-phone" type="tel" value={traderPhone} onChange={(event) => setTraderPhone(event.target.value)} /><span className="portal-label">Incident type</span><div className="incident-options">{incidentOptions.map((option) => { const Icon = option.icon; return <button key={option.value} type="button" className={`incident-option ${incidentType === option.value ? "incident-option-active" : ""}`} onClick={() => setIncidentType(option.value)}><span><Icon size={17} /></span><strong>{option.label}</strong><small>{option.detail}</small></button>; })}</div>{incidentType === "localized" && <label className="evidence-upload" htmlFor="claim-evidence"><CloudUpload size={20} /><span><strong>{evidenceFile?.name ?? "Upload stock damage evidence"}</strong><small>JPG, PNG or video metadata · demo only</small></span><input id="claim-evidence" type="file" accept="image/*,video/*" onChange={(event) => setEvidenceFile(event.target.files?.[0] ?? null)} /></label>}{incidentType === "macro" && <div className="source-callout"><Satellite size={16} /><span><strong>SAR / thermal source selected</strong><small>Simulated geospatial event footprint for the market location.</small></span></div>}<button className="portal-primary-button" type="button" disabled={isRunning || !claimId || !traderPhone} onClick={runVerification}><ShieldCheck size={16} />{isRunning ? "Running verification..." : "Run Instant Automated Verification & Payout"}</button></section><section className="claims-status-card"><div className="portal-section-heading"><div><p className="deep-eyebrow">2 / Execution trail</p><h3>Live processing status</h3></div><WalletCards size={19} /></div><div className="portal-steps">{steps.map((step, index) => <div className={`portal-step portal-step-${step.state}`} key={step.label}><span>{step.state === "complete" ? <CheckCircle2 size={16} /> : index + 1}</span><div><strong>{step.label}</strong><small>{step.detail}</small></div></div>)}</div><div className={`portal-result ${steps.every((step) => step.state === "complete") ? "portal-result-success" : ""}`} role="status">{steps.every((step) => step.state === "complete") && <CheckCircle2 size={16} />}{result}</div><div className="payout-guarantee"><Flame size={16} /><span><strong>Instant disbursement window</strong><small>Mock EcoCash / InnBucks dispatch targets payout within hours, bypassing physical adjuster queues.</small></span></div></section></div></div>;
}