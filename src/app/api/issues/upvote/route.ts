import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { issueId } = await request.json();
    if (!issueId) {
      return NextResponse.json({ error: "issueId is required" }, { status: 400 });
    }

    const updated = dataStore.upvoteIssue(issueId);
    if (!updated) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, issue: updated });
  } catch {
    return NextResponse.json({ error: "Failed to upvote" }, { status: 500 });
  }
}
