import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Search query required (EPIC number or voter name)" }, { status: 400 });
  }

  const voterSlip = dataStore.lookupVoterSlip(query);
  return NextResponse.json({ success: true, voterSlip });
}
