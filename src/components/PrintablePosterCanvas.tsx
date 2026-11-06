"use client";

import React, { useRef, useState } from "react";
import { Download, Printer, QrCode, CheckCircle2, Leaf, ShieldCheck } from "lucide-react";
import { Candidate } from "@/types";

interface PrintablePosterCanvasProps {
  candidate: Candidate;
  locationLabel?: string;
}

export const PrintablePosterCanvas: React.FC<PrintablePosterCanvasProps> = ({
  candidate,
  locationLabel = "Ward Eco-Election Stand",
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-100 p-6 rounded-3xl border border-gray-200 text-center">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>300-DPI Print-Ready Eco-Banner</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Stand</span>
          </button>
        </div>
      </div>

      {/* The Printable Poster Container */}
      <div
        ref={posterRef}
        id="printable-campaign-stand"
        className="max-w-md mx-auto bg-white rounded-3xl border-4 border-slate-900 shadow-2xl p-8 text-slate-900 relative overflow-hidden"
      >
        {/* Top Header Banner */}
        <div
          className="h-3 -mx-8 -mt-8 mb-6"
          style={{ backgroundColor: candidate.party.colorHex || "#16a34a" }}
        />

        {/* ECI Election Commission Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3 mb-5">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
              Digital Eco-Campaign Stand
            </span>
            <span className="text-xs font-bold text-gray-500">
              {candidate.constituencyName} • 2026 General Election
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ECI Verified</span>
          </div>
        </div>

        {/* Candidate Photo & Party Symbol */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={candidate.profilePhotoUrl}
              alt={candidate.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-50 p-2 flex items-center justify-center shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={candidate.party.symbolUrl}
              alt={candidate.party.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Candidate Name & Title */}
        <h3 className="text-2xl font-black text-gray-900 mt-3">{candidate.fullName}</h3>
        <p className="text-xs font-bold text-emerald-700 tracking-wide mt-0.5">
          {candidate.party.name} ({candidate.party.abbreviation})
        </p>
        <p className="text-[11px] text-gray-500 mt-1">{candidate.education}</p>

        {/* Large Central QR Code */}
        <div className="my-6 p-4 bg-slate-900 rounded-3xl inline-block shadow-inner">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl flex flex-col items-center justify-center mx-auto">
            <QrCode className="w-36 h-36 text-slate-950" />
            <span className="font-mono text-[9px] font-bold text-slate-500 mt-1">
              {candidate.qrCodeId || "SCAN-VERIFIED-DOSSIER"}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200/80">
          <div className="text-xs font-black text-emerald-900 flex items-center justify-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scan to Read Full Manifesto & Affidavit</span>
          </div>
          <p className="text-[10px] text-emerald-800/80 mt-0.5">
            Zero Paper Litter • Verified Form 26 Disclosures • Instant Comparison
          </p>
        </div>

        {/* Bottom Stand Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-between">
          <span>📍 {locationLabel}</span>
          <span className="font-mono font-bold">SmartVoter.gov</span>
        </div>
      </div>
    </div>
  );
};
