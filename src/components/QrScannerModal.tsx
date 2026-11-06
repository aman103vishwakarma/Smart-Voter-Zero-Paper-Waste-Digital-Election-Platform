"use client";

import React, { useState } from "react";
import { QrCode, Scan, CheckCircle2, Sparkles, MapPin, Camera, X } from "lucide-react";
import { Candidate, CampaignQrCode } from "@/types";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCandidateFound: (candidate: Candidate) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onCandidateFound,
}) => {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScanCode = async (codeHash: string) => {
    setScanning(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/qr/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeHash }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Candidate not found for this QR code");
      }

      setSuccessMessage(
        `Verified! You saved 2 roadside paper posters by scanning digitally! 🌱`
      );

      setTimeout(() => {
        setScanning(false);
        onCandidateFound(data.candidate);
        onClose();
      }, 1200);
    } catch (err: any) {
      setScanning(false);
      setError(err.message || "Failed to scan QR code");
    }
  };

  const sampleRoadsidePosters = [
    {
      code: "ARANYA-DELHI-2026-01",
      candidate: "Dr. Aranya Sharma (GFA)",
      location: "Connaught Place Radial 3 Eco-Banner",
    },
    {
      code: "VIKRAM-DELHI-2026-01",
      candidate: "Vikramaditya Singh (PCA)",
      location: "Karol Bagh Metro Gate 2 Eco-Banner",
    },
    {
      code: "RAJESH-DELHI-2026-01",
      candidate: "Rajeshwar Shukla (DPF)",
      location: "Pahar Ganj Market Square Banner",
    },
    {
      code: "KAVYA-BLR-2026-01",
      candidate: "Kavya N. Reddy (NRP)",
      location: "Bengaluru South - Jayanagar 4th Block",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Scan Roadside Campaign Poster</h3>
            <p className="text-xs text-gray-500">
              Point your camera at any eco-friendly election QR code
            </p>
          </div>
        </div>

        {/* Scanner Simulation Viewport */}
        <div className="relative my-4 aspect-[4/3] rounded-2xl bg-slate-950 overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/40">
          <div className="absolute inset-8 border-2 border-emerald-400 rounded-xl pointer-events-none flex items-center justify-center">
            <div className="w-full h-0.5 bg-emerald-400 animate-pulse" />
          </div>

          <Camera className="w-12 h-12 text-emerald-400/80 mb-2 animate-bounce" />
          <span className="text-xs text-emerald-200 font-medium">
            {scanning ? "Decoding Poster QR Hash..." : "Ready to scan roadside QR poster"}
          </span>

          {successMessage && (
            <div className="absolute inset-0 bg-emerald-900/90 text-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-300 mb-2" />
              <span className="text-sm font-bold">{successMessage}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Quick Demo: Click a Roadside Poster QR */}
        <div className="mt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
            Simulate Scanning Live Roadside Posters:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleRoadsidePosters.map((poster) => (
              <button
                key={poster.code}
                type="button"
                onClick={() => handleScanCode(poster.code)}
                disabled={scanning}
                className="text-left p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-emerald-700 flex items-center justify-between">
                  <span>{poster.candidate}</span>
                  <Scan className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
                </div>
                <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{poster.location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Hash Lookup */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualCode) handleScanCode(manualCode);
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Or type poster hash (e.g. ARANYA-DELHI-2026-01)"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="flex-1 py-2 px-3 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!manualCode || scanning}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Resolve
          </button>
        </form>
      </div>
    </div>
  );
};
