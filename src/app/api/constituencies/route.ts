import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  const constituencies = dataStore.getConstituencies();
  return NextResponse.json({ constituencies });
}
