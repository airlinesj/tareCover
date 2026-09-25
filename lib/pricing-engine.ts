export const STOCK_CATEGORIES = {
  non_perishable_hardware: { multiplier: 1, label: "Non-perishable hardware", risk: "Low" },
  general_apparel_footwear: { multiplier: 1.1, label: "General apparel and footwear", risk: "Moderate" },
  flammable_textiles_plastics: { multiplier: 1.3, label: "Flammable textiles and plastics", risk: "High" },
  fresh_produce: { multiplier: 1.15, label: "Fresh produce", risk: "Moderate" },
} as const;

export type StockCategory = keyof typeof STOCK_CATEGORIES;

export type PricingInput = {
  batchValue: number;
  category: StockCategory;
  isVouchedByMarketAssociation?: boolean;
  restockingStreakConsistency?: number;
};

export type PricingResult = {
  inputBatchValue: number;
  stockCategory: StockCategory;
  appliedPercentageRate: number;
  calculatedMicroPremium: number;
  traditionalInsuranceCostComparison: {
    traditionalAnnualRateRange: string;
    traditionalMinimumAnnualBaselineFee: string;
    estimatedTraditionalAnnualCost: { low: number; high: number };
    tareCoverCashFlowContrast: string;
  };
  breakdownLog: string[];
};

const MINIMUM_BATCH_VALUE = 50;
const TRADITIONAL_RATE_LOW = 0.015;
const TRADITIONAL_RATE_HIGH = 0.02;
const TRADITIONAL_FEE_LOW = 150;
const TRADITIONAL_FEE_HIGH = 300;

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Returns the base rate before stock and loyalty modifiers. */
function getTierRate(batchValue: number) {
  if (batchValue <= 300) return { rate: 0.02, tier: "micro-batch ($50-$300)" };
  if (batchValue <= 1500) {
    const progress = (batchValue - 301) / (1500 - 301);
    return { rate: 0.012 - progress * 0.002, tier: "mid-tier ($301-$1,500)" };
  }

  const progress = clamp((batchValue - 1501) / (15000 - 1501), 0, 1);
  return { rate: 0.008 - progress * 0.003, tier: "commercial bulk ($1,501+)" };
}

export function calculatePremium(input: PricingInput): PricingResult {
  if (!Number.isFinite(input.batchValue) || input.batchValue < MINIMUM_BATCH_VALUE) {
    throw new Error(`batchValue must be at least $${MINIMUM_BATCH_VALUE.toFixed(2)}.`);
  }

  const category = STOCK_CATEGORIES[input.category];
  if (!category) throw new Error(`Unsupported stock category: ${input.category}`);

  const streak = clamp(input.restockingStreakConsistency ?? 1, 1, 5);
  const voucherDiscount = input.isVouchedByMarketAssociation ? 0.1 : 0;
  const streakDiscount = ((streak - 1) / 4) * 0.1;
  const tier = getTierRate(input.batchValue);
  const adjustedRate = tier.rate * category.multiplier * (1 - voucherDiscount - streakDiscount);
  const microPremium = roundCurrency(input.batchValue * adjustedRate);
  const traditionalLow = roundCurrency(Math.max(input.batchValue * TRADITIONAL_RATE_LOW, TRADITIONAL_FEE_LOW));
  const traditionalHigh = roundCurrency(Math.max(input.batchValue * TRADITIONAL_RATE_HIGH, TRADITIONAL_FEE_HIGH));

  return {
    inputBatchValue: roundCurrency(input.batchValue),
    stockCategory: input.category,
    appliedPercentageRate: roundCurrency(adjustedRate * 100),
    calculatedMicroPremium: microPremium,
    traditionalInsuranceCostComparison: {
      traditionalAnnualRateRange: "1.5%-2.0% of total insured value",
      traditionalMinimumAnnualBaselineFee: "$150-$300 per year",
      estimatedTraditionalAnnualCost: { low: traditionalLow, high: traditionalHigh },
      tareCoverCashFlowContrast: `Tare Cover charges $${microPremium.toFixed(2)} on this restock instead of requiring a $150-$300 annual baseline upfront.`,
    },
    breakdownLog: [
      `Applied ${tier.tier} base rate of ${(tier.rate * 100).toFixed(2)}%.`,
      `Applied ${category.label} multiplier of ${category.multiplier.toFixed(2)}x (${category.risk.toLowerCase()} risk).`,
      input.isVouchedByMarketAssociation ? "Applied 10% market association voucher discount." : "No market association voucher discount applied.",
      `Applied ${(streakDiscount * 100).toFixed(2)}% restocking streak discount for consistency score ${streak}/5.`,
      `Final rate is ${adjustedRate.toFixed(4)} (${(adjustedRate * 100).toFixed(2)}%).`,
    ],
  };
}

export const pricingExamples = {
  vegetableRestock: calculatePremium({
    batchValue: 200,
    category: "fresh_produce",
    isVouchedByMarketAssociation: true,
    restockingStreakConsistency: 5,
  }),
  electronicsHardwareRestock: calculatePremium({
    batchValue: 12000,
    category: "non_perishable_hardware",
    isVouchedByMarketAssociation: false,
    restockingStreakConsistency: 3,
  }),
};