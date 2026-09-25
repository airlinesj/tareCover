"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Info, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { calculatePremium, STOCK_CATEGORIES, type StockCategory } from "@/lib/pricing-engine";

const plans = [
  { label: "Essential", multiplier: 1, detail: "Core stock protection" },
  { label: "Plus", multiplier: 1.2, detail: "Stock + transit cover" },
];

export function CheckoutWidget() {
  const [stockValue, setStockValue] = useState(1250);
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [category, setCategory] = useState<StockCategory>("general_apparel_footwear");
  const [isVouched, setIsVouched] = useState(false);
  const [restockingStreak, setRestockingStreak] = useState(1);
  const [traderPhone, setTraderPhone] = useState("+263771234567");
  const [optInHealthMicroVoucher, setOptInHealthMicroVoucher] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const plan = plans[selectedPlan];
  const pricing = useMemo(() => calculatePremium({ batchValue: Math.max(50, stockValue), category, isVouchedByMarketAssociation: isVouched, restockingStreakConsistency: restockingStreak }), [category, isVouched, restockingStreak, stockValue]);
  const premium = Math.max(1, Math.round(pricing.calculatedMicroPremium * plan.multiplier));

  async function addProtection() {
    setCheckoutMessage("Processing checkout...");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ traderPhone, batchValue: stockValue, stockCategory: category === "fresh_produce" ? "general_apparel_footwear" : category, isVouchedByMarketAssociation: isVouched, optInHealthMicroVoucher }) });
      const result = await response.json() as { error?: string; totalInvoicedLevy?: number; healthMicroVoucherFee?: number; generatedDigitalHealthToken?: { tokenCode: string } };
      if (!response.ok) throw new Error(result.error ?? "Checkout could not be processed.");
      setIsAdded(true);
      setCheckoutMessage(`Mobile-money push prompt sent. Checkout processed at US$ ${result.totalInvoicedLevy?.toFixed(2)}.${result.generatedDigitalHealthToken ? ` Health token ${result.generatedDigitalHealthToken.tokenCode} generated.` : ""}`);
    } catch (error) { setCheckoutMessage(error instanceof Error ? error.message : "Checkout could not be processed."); }
  }

  return (
    <section className="widget-panel" aria-labelledby="widget-title">
      <div className="widget-header">
        <div>
          <p className="eyebrow">Embedded checkout</p>
          <h2 id="widget-title">Add cover at the point of sale</h2>
        </div>
        <div className="live-pill"><span /> Live preview</div>
      </div>

      <div className="widget-body">
        <div className="widget-intro">
          <div className="icon-badge icon-badge-accent"><ShieldCheck size={20} strokeWidth={1.8} /></div>
          <div>
            <h3>Stock protection</h3>
            <p>Give every purchase a little more resilience.</p>
          </div>
          <button
            type="button"
            className={`switch ${isEnabled ? "switch-on" : ""}`}
            aria-pressed={isEnabled}
            aria-label={isEnabled ? "Remove stock protection" : "Add stock protection"}
            onClick={() => setIsEnabled((current) => !current)}
          >
            <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} />
          </button>
        </div>

        <AnimatePresence initial={false} mode="wait">
          {isEnabled ? (
            <motion.div
              key="enabled"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="widget-fields"
            >
              <div className="field-group">
                <label htmlFor="stock-value">Purchase value</label>
                <div className="currency-input">
                  <span>US$</span>
                  <input
                    id="stock-value"
                    type="number"
                    min="50"
                    step="50"
                    value={stockValue}
                    onChange={(event) => setStockValue(Math.max(0, Number(event.target.value)))}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="stock-category">Stock category</label>
                <select id="stock-category" className="pricing-select" value={category} onChange={(event) => setCategory(event.target.value as StockCategory)}>
                  {Object.entries(STOCK_CATEGORIES).map(([value, option]) => <option key={value} value={value}>{option.label} · {option.risk} risk</option>)}
                </select>
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label>Protection level</label>
                  <span className="info-label"><Info size={13} /> Dynamic rate {pricing.appliedPercentageRate.toFixed(2)}%</span>
                </div>
                <div className="plan-options">
                  {plans.map((option, index) => (
                    <button
                      type="button"
                      key={option.label}
                      className={`plan-option ${selectedPlan === index ? "plan-selected" : ""}`}
                      onClick={() => setSelectedPlan(index)}
                    >
                      <span className="plan-check">{selectedPlan === index && <Check size={12} strokeWidth={3} />}</span>
                      <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                      <span className="plan-rate">{option.multiplier === 1 ? "Base" : "+20%"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pricing-controls">
                <label className="pricing-check"><input type="checkbox" checked={isVouched} onChange={(event) => setIsVouched(event.target.checked)} /> Market association voucher <strong>-10%</strong></label>
                <label className="pricing-streak" htmlFor="restocking-streak">Restocking consistency <strong>{restockingStreak}/5</strong><input id="restocking-streak" type="range" min="1" max="5" step="1" value={restockingStreak} onChange={(event) => setRestockingStreak(Number(event.target.value))} /></label>
              </div>

              <div className="field-group">
                <label htmlFor="trader-phone">Trader phone for receipt</label>
                <div className="currency-input"><input id="trader-phone" type="tel" value={traderPhone} onChange={(event) => setTraderPhone(event.target.value)} placeholder="+263771234567" /></div>
                <label className="pricing-check health-opt-in"><input type="checkbox" checked={optInHealthMicroVoucher} onChange={(event) => setOptInHealthMicroVoucher(event.target.checked)} /> Add CellMed / Nectacare health voucher <strong>+ US$ {stockValue <= 500 ? "0.50" : "1.00"}</strong></label>
              </div>

              <div className="premium-summary">
                <div><span className="summary-label">Cover for this purchase</span><strong>US$ {stockValue.toLocaleString()}</strong></div>
                <div className="premium-amount"><span>+ US$</span><motion.strong key={premium} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>{premium.toLocaleString()}</motion.strong><small>premium</small></div>
              </div>

              <div className="benchmark-summary"><span>Traditional annual benchmark</span><strong>US$ {pricing.traditionalInsuranceCostComparison.estimatedTraditionalAnnualCost.low.toLocaleString()}–{pricing.traditionalInsuranceCostComparison.estimatedTraditionalAnnualCost.high.toLocaleString()}</strong><small>{pricing.traditionalInsuranceCostComparison.tareCoverCashFlowContrast}</small></div>

              <button type="button" className="primary-action" onClick={addProtection}>{isAdded ? "Checkout processed" : "Process checkout"} {isAdded ? <Check size={16} /> : <ArrowUpRight size={16} />}</button>
              <p className="widget-footnote"><Sparkles size={13} /> {checkoutMessage || (isAdded ? "Certificate ready for this invoice" : "Certificate issued instantly after payment")}</p>
            </motion.div>
          ) : (
            <motion.div key="disabled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="disabled-state">
              <p>Protection is switched off for this invoice.</p>
              <button type="button" onClick={() => setIsEnabled(true)}>Turn on protection</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}