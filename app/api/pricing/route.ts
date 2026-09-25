import { NextResponse } from "next/server";
import { calculatePremium, pricingExamples, type PricingInput } from "@/lib/pricing-engine";

export async function GET() {
  return NextResponse.json(pricingExamples);
}

export async function POST(request: Request) {
  const input = await request.json().catch(() => null) as Partial<PricingInput> | null;

  if (!input || typeof input.batchValue !== "number" || typeof input.category !== "string") {
    return NextResponse.json({ error: "batchValue and category are required." }, { status: 400 });
  }

  try {
    return NextResponse.json(calculatePremium({
      batchValue: input.batchValue,
      category: input.category as PricingInput["category"],
      isVouchedByMarketAssociation: input.isVouchedByMarketAssociation,
      restockingStreakConsistency: input.restockingStreakConsistency,
    }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to calculate premium." }, { status: 400 });
  }
}