import { randomInt } from "node:crypto";

export type CheckoutStockCategory =
  | "non_perishable_hardware"
  | "general_apparel_footwear"
  | "flammable_textiles_plastics";

export interface CheckoutRequest {
  traderPhone: string;
  batchValue: number;
  stockCategory: CheckoutStockCategory;
  isVouchedByMarketAssociation: boolean;
  optInHealthMicroVoucher: boolean;
}

export interface TransactionResult {
  traderPhone: string;
  batchValue: number;
  stockInsurancePremium: number;
  healthMicroVoucherFee: number;
  totalInvoicedLevy: number;
  ecosystemRoute: string;
  generatedDigitalHealthToken?: {
    tokenCode: string;
    validAt: string;
    accessType: string;
  };
}

const categoryMultipliers: Record<CheckoutStockCategory, number> = {
  non_perishable_hardware: 1,
  general_apparel_footwear: 1.1,
  flammable_textiles_plastics: 1.3,
};

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function validateCheckout(input: CheckoutRequest) {
  if (!/^\+263\d{9}$/.test(input.traderPhone)) throw new Error("traderPhone must be a Zimbabwe number such as +263771234567.");
  if (!Number.isFinite(input.batchValue) || input.batchValue < 50) throw new Error("batchValue must be at least $50.");
  if (!(input.stockCategory in categoryMultipliers)) throw new Error("Unsupported stock category.");
}

export function processTareCoverCheckout(input: CheckoutRequest): TransactionResult {
  validateCheckout(input);

  let baseRate = 0.02;
  if (input.batchValue > 300 && input.batchValue <= 1500) baseRate = 0.011;
  else if (input.batchValue > 1500) baseRate = 0.007;

  let stockInsurancePremium = input.batchValue * baseRate * categoryMultipliers[input.stockCategory];
  if (input.isVouchedByMarketAssociation) stockInsurancePremium *= 0.9;

  const healthMicroVoucherFee = input.optInHealthMicroVoucher ? (input.batchValue <= 500 ? 0.5 : 1) : 0;
  const generatedDigitalHealthToken = input.optInHealthMicroVoucher
    ? {
        tokenCode: `NC-TRD-${randomInt(100000, 1000000)}`,
        validAt: "Nectacare Clinics & Partner Pharmacies Network",
        accessType: "Primary Healthcare Consultation & Essential Drug Token",
      }
    : undefined;

  return {
    traderPhone: input.traderPhone,
    batchValue: roundCurrency(input.batchValue),
    stockInsurancePremium: roundCurrency(stockInsurancePremium),
    healthMicroVoucherFee: roundCurrency(healthMicroVoucherFee),
    totalInvoicedLevy: roundCurrency(stockInsurancePremium + healthMicroVoucherFee),
    ecosystemRoute: input.optInHealthMicroVoucher
      ? "Cell Insurance (MGA) + CellMed/Nectacare Integrated Health Cell"
      : "Cell Insurance (MGA) Short-Term Stock Only",
    generatedDigitalHealthToken,
  };
}

export const checkoutExample = processTareCoverCheckout({
  traderPhone: "+263771234567",
  batchValue: 350,
  stockCategory: "flammable_textiles_plastics",
  isVouchedByMarketAssociation: true,
  optInHealthMicroVoucher: true,
});