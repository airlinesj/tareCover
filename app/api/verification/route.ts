import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const captureId = typeof body.captureId === "string" ? body.captureId : `CAP-${Date.now()}`;

  return NextResponse.json({
    mode: "demo",
    captureId,
    verdict: "demo-approved",
    message: "Dummy verification passed for this demo capture.",
    checks: {
      device: { status: "passed", label: "Demo device recognized" },
      metadata: { status: "passed", label: "Demo timestamp and market attached" },
      replay: { status: "passed", label: "Demo replay check clear" },
      stock: { status: "passed", label: "Demo stock image consistent" },
    },
  });
}