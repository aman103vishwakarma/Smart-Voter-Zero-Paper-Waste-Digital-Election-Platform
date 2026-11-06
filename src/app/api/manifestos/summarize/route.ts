import { NextRequest, NextResponse } from "next/server";
import { PolicyCategory } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { title, rawText, candidateName } = await request.json();

    if (!rawText && !title) {
      return NextResponse.json({ error: "Title or rawText required" }, { status: 400 });
    }

    // AI Summarization Pipeline simulation (Structured extraction)
    const aiSummary = `This manifesto outlines a forward-looking civic agenda for ${candidateName || "the constituency"}. Key priorities emphasize clean public governance, environmental resilience, modernization of municipal public health infrastructure, and transparent public budgeting.`;

    const keyPromises: string[] = [
      "100% conversion of local feeder transit to clean electric buses",
      "Digital single-window clearance for small merchants within 48 hours",
      "Establishment of 24/7 primary health care & diagnostic centers",
      "Real-time open portal for all ward infrastructure expenditures",
    ];

    const categoryBreakdown: PolicyCategory[] = [
      {
        category: "Economy & Jobs",
        promise: "Support local MSMEs through streamlined municipal permits and local trade incentives.",
        timeline: "Year 1",
        budgetAllocation: "₹45 Crore",
      },
      {
        category: "Healthcare",
        promise: "Upgrade municipal dispensaries with subsidized digital diagnostic laboratories.",
        timeline: "Year 1-2",
        budgetAllocation: "₹35 Crore",
      },
      {
        category: "Green & Climate",
        promise: "Rooftop solar subsidies and zero roadside paper/plastic campaign materials.",
        timeline: "Year 1",
        budgetAllocation: "₹25 Crore",
      },
      {
        category: "Infrastructure",
        promise: "Smart water metering and underground drainage repairs to eliminate waterlogging.",
        timeline: "Year 2",
        budgetAllocation: "₹80 Crore",
      },
    ];

    return NextResponse.json({
      success: true,
      aiSummary,
      keyPromises,
      categoryBreakdown,
      modelUsed: "gemini-1.5-pro-election-analyzer",
      extractedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to summarize manifesto" }, { status: 500 });
  }
}
