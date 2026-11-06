import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
  const constituencyId = request.nextUrl.searchParams.get("constituencyId") || undefined;
  const issues = dataStore.getCivicIssues(constituencyId);
  return NextResponse.json({ issues, count: issues.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.constituencyId || !body.description) {
      return NextResponse.json(
        { error: "title, constituencyId, and description are required" },
        { status: 400 }
      );
    }

    const created = dataStore.createCivicIssue(body);
    return NextResponse.json({ success: true, issue: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
