"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Info, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const plans = [
  { label: "Essential", rate: 0.008, detail: "Core stock protection" },
  { label: "Plus", rate: 0.012, detail: "Stock + transit cover" },
];

export function CheckoutWidget() {
  const [stockValue, setStockValue] = useState(1250);
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const plan = plans[selectedPlan];
  const premium = useMemo(
    () => Math.max(1, Math.round(stockValue * plan.rate)),
    [plan.rate, stockValue],
  );

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
                <div className="field-label-row">
                  <label>Protection level</label>
                  <span className="info-label"><Info size={13} /> Rates from 0.8%</span>
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
                      <span className="plan-rate">{(option.rate * 100).toFixed(1)}%</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="premium-summary">
                <div><span className="summary-label">Cover for this purchase</span><strong>US$ {stockValue.toLocaleString()}</strong></div>
                <div className="premium-amount"><span>+ US$</span><motion.strong key={premium} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>{premium.toLocaleString()}</motion.strong><small>premium</small></div>
              </div>

              <button type="button" className="primary-action" onClick={() => setIsAdded(true)}>{isAdded ? "Protection added" : "Add protection"} {isAdded ? <Check size={16} /> : <ArrowUpRight size={16} />}</button>
              <p className="widget-footnote"><Sparkles size={13} /> {isAdded ? "Certificate ready for this invoice" : "Certificate issued instantly after payment"}</p>
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