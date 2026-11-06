import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const pincode = searchParams.get("pincode");

  const lat = latStr ? parseFloat(latStr) : undefined;
  const lng = lngStr ? parseFloat(lngStr) : undefined;

  const constituency = dataStore.findConstituencyByLocation(lat, lng, pincode || undefined);

  if (!constituency) {
    return NextResponse.json(
      { error: "No constituency found matching your coordinates or pincode" },
      { status: 404 }
    );
  }

  const candidates = dataStore.getCandidates({
    constituencyId: constituency.id,
    status: "VERIFIED",
  });

  return NextResponse.json({
    constituency,
    candidates,
    totalCandidates: candidates.length,
    resolvedVia: pincode ? `pincode (${pincode})` : lat && lng ? `GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})` : "default",
  });
}
