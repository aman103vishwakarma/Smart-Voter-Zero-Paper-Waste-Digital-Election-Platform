import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { codeHash } = await request.json();

    if (!codeHash) {
      return NextResponse.json({ error: "codeHash is required" }, { status: 400 });
    }

    const result = dataStore.resolveQrCode(codeHash);

    if (!result.candidate) {
      return NextResponse.json(
        { error: "Invalid QR code. Candidate or campaign poster not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      candidate: result.candidate,
      qrCode: result.qrCode,
      ecoImpact: {
        paperSavedForThisScan: 2,
        message: "Thank you for choosing digital over roadside paper posters! 🌱",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to process QR scan" }, { status: 500 });
  }
}
