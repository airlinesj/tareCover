import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const input = await request.json().catch(() => null) as { claimType?: string; traderPhone?: string; amount?: number } | null;
  if (!input?.claimType || !input.traderPhone || typeof input.amount !== "number") {
    return NextResponse.json({ error: "claimType, traderPhone, and amount are required." }, { status: 400 });
  }

  return NextResponse.json({
    mode: "demo",
    payoutReference: `EC-${Date.now().toString().slice(-8)}`,
    wallet: "EcoCash",
    amount: input.amount,
    eta: "Within 2 hours",
    status: "dispatched",
    steps: ["Geotagged Receipt Verified", "Market Association Vouched", "Mobile Money Payout Triggered"],
  });
}