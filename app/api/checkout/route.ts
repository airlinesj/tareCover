import { NextResponse } from "next/server";
import { processTareCoverCheckout, type CheckoutRequest } from "@/lib/checkout-processor";

export async function POST(request: Request) {
  const input = await request.json().catch(() => null) as Partial<CheckoutRequest> | null;
  if (!input || typeof input.traderPhone !== "string" || typeof input.batchValue !== "number" || typeof input.stockCategory !== "string" || typeof input.isVouchedByMarketAssociation !== "boolean" || typeof input.optInHealthMicroVoucher !== "boolean") {
    return NextResponse.json({ error: "traderPhone, batchValue, stockCategory, isVouchedByMarketAssociation, and optInHealthMicroVoucher are required." }, { status: 400 });
  }

  try {
    return NextResponse.json(processTareCoverCheckout(input as CheckoutRequest));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to process checkout." }, { status: 400 });
  }
}