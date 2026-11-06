import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const constituencyId = searchParams.get("constituencyId") || undefined;
  const partyId = searchParams.get("partyId") || undefined;
  const status = searchParams.get("status") || undefined;

  const candidates = dataStore.getCandidates({ constituencyId, partyId, status });
  return NextResponse.json({ candidates, count: candidates.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.constituencyId) {
      return NextResponse.json(
        { error: "fullName and constituencyId are required" },
        { status: 400 }
      );
    }

    const created = dataStore.addCandidate(body);
    return NextResponse.json({ success: true, candidate: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
