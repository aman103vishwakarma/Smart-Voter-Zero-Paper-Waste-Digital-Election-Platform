"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, X, RefreshCw, Upload, CheckCircle2, Sparkles, AlertCircle, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Candidate } from "@/types";

interface LiveCameraQrScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onCandidateFound: (candidate: Candidate) => void;
}

export const LiveCameraQrScanner: React.FC<LiveCameraQrScannerProps> = ({
  isOpen,
  onClose,
  onCandidateFound,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const scannerRef = useRef<any>(null);
  const scannerContainerId = "html5qr-code-full-region";

  // Play an acoustic chime using Web Audio API on successful scan
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Audio not permitted without user interaction, graceful fallback
    }
  };

  const handleSuccessfulDecodedText = async (decodedText: string) => {
    if (scanning) return;
    setScanning(true);
    setErrorMessage(null);

    playChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#f59e0b"],
    });

    try {
      const response = await fetch("/api/qr/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeHash: decodedText }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Candidate not found");
      }

      setScanSuccess(`Verified ${data.candidate.fullName}! Saved 2 roadside paper posters! 🌱`);

      // Stop camera scanner
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
        } catch {}
      }

      setTimeout(() => {
        setScanning(false);
        onCandidateFound(data.candidate);
        onClose();
      }, 1200);
    } catch (err: any) {
      setScanning(false);
      setErrorMessage(err.message || "Failed to resolve scanned QR code");
    }
  };

  // Start live camera stream
  const startCamera = async () => {
    setErrorMessage(null);
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const html5QrCode = new Html5Qrcode(scannerContainerId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleSuccessfulDecodedText(decodedText);
        },
        () => {}
      );
      setIsCameraActive(true);
    } catch (err: any) {
      setIsCameraActive(false);
      setErrorMessage("Camera access denied or unavailable. You can use image upload or sample posters below.");
    }
  };

  // Stop camera when modal closes
  const stopCamera = async () => {
    if (scannerRef.current && isCameraActive) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch {}
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  // Handle image file upload for scanning
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const html5QrCode = new Html5Qrcode(scannerContainerId);
      const decodedResult = await html5QrCode.scanFile(file, true);
      handleSuccessfulDecodedText(decodedResult);
    } catch {
      setErrorMessage("Could not detect a valid QR code in the uploaded image. Try another photo.");
    }
  };

  if (!isOpen) return null;

  const sampleRoadsidePosters = [
    {
      code: "ARANYA-DELHI-2026-01",
      candidate: "Dr. Aranya Sharma (GFA)",
      location: "Connaught Place Eco-Stand A",
    },
    {
      code: "VIKRAM-DELHI-2026-01",
      candidate: "Vikramaditya Singh (PCA)",
      location: "Karol Bagh Metro Gate 2 Stand",
    },
    {
      code: "KAVYA-BLR-2026-01",
      candidate: "Kavya N. Reddy (NRP)",
      location: "Bengaluru South - Jayanagar 4th Block",
    },
    {
      code: "RAJESH-DELHI-2026-01",
      candidate: "Rajeshwar Shukla (DPF)",
      location: "Pahar Ganj Market Square Stand",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Live Camera Roadside QR Scanner
            </h3>
            <p className="text-xs text-gray-500">
              Real-world camera stream for scanning eco-banners & digital posters
            </p>
          </div>
        </div>

        {/* Video Camera Container */}
        <div className="my-4 rounded-2xl bg-slate-950 overflow-hidden relative min-h-[260px] flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/40">
          <div id={scannerContainerId} className="w-full h-full" />

          {!isCameraActive && (
            <div className="p-6 text-center">
              <Camera className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-80" />
              <button
                type="button"
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Open Device Camera</span>
              </button>
              <p className="text-[11px] text-gray-400 mt-2">
                Works with rear phone cameras or laptop webcams
              </p>
            </div>
          )}

          {scanSuccess && (
            <div className="absolute inset-0 bg-emerald-900/90 text-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95">
              <CheckCircle2 className="w-14 h-14 text-emerald-300 mb-2" />
              <div className="text-base font-bold">{scanSuccess}</div>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mb-4 text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload Image Alternative */}
        <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Have a poster photo?</span>
          </div>
          <label className="cursor-pointer px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-semibold text-gray-800 shadow-sm transition-colors">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Fast Simulation Roadside Stands */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
            Quick Roadside Eco-Banners (Instant Test):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleRoadsidePosters.map((poster) => (
              <button
                key={poster.code}
                type="button"
                onClick={() => handleSuccessfulDecodedText(poster.code)}
                disabled={scanning}
                className="text-left p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-emerald-700 truncate">
                  {poster.candidate}
                </div>
                <div className="text-[10px] text-gray-500 truncate mt-0.5">
                  📍 {poster.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Hash Lookup */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualCode) handleSuccessfulDecodedText(manualCode);
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Or enter poster code (e.g. ARANYA-DELHI-2026-01)"
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
