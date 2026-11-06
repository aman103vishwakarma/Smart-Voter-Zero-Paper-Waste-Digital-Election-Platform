import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { candidateId, locationLabel } = await request.json();

    if (!candidateId) {
      return NextResponse.json({ error: "candidateId is required" }, { status: 400 });
    }

    const qr = dataStore.createQrCode(candidateId, locationLabel || "City Center Booth");
    return NextResponse.json({ success: true, qrCode: qr }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}
