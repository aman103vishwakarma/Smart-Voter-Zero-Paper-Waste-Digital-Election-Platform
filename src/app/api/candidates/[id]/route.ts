import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const candidate = dataStore.getCandidateById(params.id);

  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  return NextResponse.json({ candidate });
}
