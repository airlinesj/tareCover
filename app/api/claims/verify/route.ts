import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const input = await request.json().catch(() => null) as { claimId?: string; traderPhone?: string; incidentType?: "macro" | "localized" } | null;
  if (!input?.claimId || !input.traderPhone || !input.incidentType) return NextResponse.json({ error: "claimId, traderPhone, and incidentType are required." }, { status: 400 });

  const isMacro = input.incidentType === "macro";
  return NextResponse.json({
    mode: "demo",
    claimId: input.claimId,
    source: isMacro ? "Satellite SAR / Thermal Geospatial API" : "Gemini Multimodal AI Vision API",
    confidence: isMacro ? 96 : 93,
    amount: isMacro ? 420 : 280,
    verdict: "verified",
  });
}