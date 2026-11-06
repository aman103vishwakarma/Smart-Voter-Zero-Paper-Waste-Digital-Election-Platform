import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { candidateId, status, officerName, reason, officerToken } = await request.json();

    // Role-Based Access Control check (simulated token validation)
    if (officerToken !== "ECI-OFFICER-2026-AUTH") {
      return NextResponse.json(
        { error: "Unauthorized: Election Officer credentials required." },
        { status: 403 }
      );
    }

    if (!candidateId || !status) {
      return NextResponse.json(
        { error: "candidateId and status ('VERIFIED' | 'REJECTED') are required" },
        { status: 400 }
      );
    }

    const updated = dataStore.verifyCandidate(
      candidateId,
      status,
      officerName || "Senior Returning Officer",
      reason
    );

    if (!updated) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Candidate ${updated.fullName} has been ${status.toLowerCase()}.`,
      candidate: updated,
    });
  } catch {
    return NextResponse.json({ error: "Failed to update verification status" }, { status: 500 });
  }
}
