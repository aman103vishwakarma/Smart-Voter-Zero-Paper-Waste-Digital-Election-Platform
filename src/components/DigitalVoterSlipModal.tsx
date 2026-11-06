"use client";

import React, { useState } from "react";
import { X, Search, MapPin, Printer, Navigation, CheckCircle2, AlertCircle, Shield, Clock, Accessibility } from "lucide-react";
import { VoterSlip } from "@/types";

interface DigitalVoterSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalVoterSlipModal: React.FC<DigitalVoterSlipModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("DEL-894210");
  const [slip, setSlip] = useState<VoterSlip | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/voter-slip?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Voter record not found");
      setSlip(data.voterSlip);
    } catch (err: any) {
      setError(err.message || "Failed to find voter slip");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">
              Digital Voter Slip & Polling Station Navigator
            </h3>
            <p className="text-xs text-gray-500">
              Find your designated polling booth, live queue status, and walking directions
            </p>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Voter ID / EPIC (e.g. DEL-894210) or Name..."
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            {loading ? "Searching..." : "Lookup Slip"}
          </button>
        </form>

        {error && (
          <div className="mb-4 text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Digital Voter Slip Preview Card */}
        {slip && (
          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 bg-slate-50 relative overflow-hidden print:border-solid print:m-0 print:p-4">
            {/* Top Slip Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  Election Commission of India • Official Voter Slip
                </span>
                <h4 className="text-xl font-black text-gray-900 mt-2">{slip.voterName}</h4>
                <div className="text-xs font-mono font-bold text-gray-600 mt-0.5">
                  EPIC No: <span className="text-blue-600">{slip.voterEpicNumber}</span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="text-right">
                <div className="h-8 flex items-center gap-0.5 justify-end">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2].map((w, idx) => (
                    <span
                      key={idx}
                      className="bg-black inline-block h-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] text-gray-400 block mt-1">
                  SERIAL #{slip.serialNumber}
                </span>
              </div>
            </div>

            {/* Voting Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Constituency</span>
                <span className="font-bold text-gray-900 mt-0.5 block">{slip.constituencyName}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Part Number</span>
                <span className="font-bold text-gray-900 mt-0.5 block">{slip.partNumber}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Polling Date</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">{slip.electionDate}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Voting Hours</span>
                <span className="font-bold text-gray-900 mt-0.5 block">{slip.votingHours}</span>
              </div>
            </div>

            {/* Polling Station Address Card */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 mb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Designated Polling Station</span>
                    <h5 className="font-bold text-sm text-gray-900">{slip.pollingStationName}</h5>
                    <p className="text-xs text-gray-600 mt-0.5">{slip.pollingStationAddress}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-emerald-700">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Queue: Low (&lt; 10 mins wait)
                      </span>
                      <span className="flex items-center gap-1">
                        <Accessibility className="w-3.5 h-3.5" />
                        Wheelchair Ramp Available
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(slip.pollingStationAddress)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 flex-shrink-0 border border-emerald-200"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Maps Directions</span>
                </a>
              </div>
            </div>

            {/* Acceptable Identity Proofs */}
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">Carry Valid Photo ID: </span>
              <span>EPIC Voter ID, Aadhaar Card, Passport, Driving License, or Bank Passbook with Photo.</span>
            </div>

            {/* Print and Save */}
            <div className="mt-4 flex items-center justify-end gap-2 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voter Slip</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
