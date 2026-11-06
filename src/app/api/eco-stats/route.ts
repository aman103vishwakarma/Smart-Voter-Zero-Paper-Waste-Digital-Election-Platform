import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  const stats = dataStore.getEcoStats();
  const qrCodes = dataStore.getAllQrCodes();
  return NextResponse.json({ stats, activeQrBanners: qrCodes.length });
}
