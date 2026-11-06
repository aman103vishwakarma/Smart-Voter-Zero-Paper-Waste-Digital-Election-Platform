"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Search, Check, AlertCircle } from "lucide-react";
import { Constituency } from "@/types";

interface ConstituencySelectorProps {
  constituencies: Constituency[];
  selectedConstituency: Constituency;
  onSelectConstituency: (constituency: Constituency) => void;
  onLocationDetected: (lat: number, lng: number) => void;
  onPincodeSearch: (pincode: string) => void;
  isLoading?: boolean;
}

export const ConstituencySelector: React.FC<ConstituencySelectorProps> = ({
  constituencies,
  selectedConstituency,
  onSelectConstituency,
  onLocationDetected,
  onPincodeSearch,
  isLoading = false,
}) => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [locating, setLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDetectGPS = () => {
    setLocating(true);
    setErrorMessage(null);

    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        onLocationDetected(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLocating(false);
        // Fallback for demo: default to New Delhi Central coords if user denies permission
        setErrorMessage("GPS permission denied. Showing nearest central constituency.");
        onLocationDetected(28.6139, 77.2090);
      },
      { timeout: 7000 }
    );
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 4) {
      setErrorMessage(null);
      onPincodeSearch(pincodeInput.trim());
    } else {
      setErrorMessage("Please enter a valid pincode");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Active Constituency Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Your Voting Constituency
            </div>
            <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>{selectedConstituency.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-mono">
                {selectedConstituency.code}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {selectedConstituency.state} • {new Intl.NumberFormat("en-IN").format(selectedConstituency.totalRegisteredVoters)} Registered Voters
            </p>
          </div>
        </div>

        {/* Search & Location Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* GPS Auto-detect Button */}
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={locating || isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200/60 disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${locating ? "animate-spin text-emerald-600" : ""}`} />
            {locating ? "Locating..." : "Use My GPS"}
          </button>

          {/* Pincode Search Form */}
          <form onSubmit={handlePincodeSubmit} className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Pincode (e.g. 110001)"
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                maxLength={6}
                className="w-36 sm:w-44 pl-8 pr-3 py-2.5 text-xs rounded-l-xl border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-r-xl transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Dropdown */}
          <select
            value={selectedConstituency.id}
            onChange={(e) => {
              const c = constituencies.find((item) => item.id === e.target.value);
              if (c) onSelectConstituency(c);
            }}
            className="py-2.5 px-3 text-xs bg-gray-50 border border-gray-300 rounded-xl text-gray-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          >
            {constituencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suggested Quick Pincodes */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
        <span className="font-medium text-gray-600">Quick Pincodes:</span>
        {[
          { pin: "110001", label: "Delhi Central" },
          { pin: "560004", label: "Bengaluru South" },
          { pin: "400001", label: "Mumbai South" },
          { pin: "221001", label: "Varanasi" },
        ].map((item) => (
          <button
            key={item.pin}
            type="button"
            onClick={() => {
              setPincodeInput(item.pin);
              onPincodeSearch(item.pin);
            }}
            className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors font-mono"
          >
            {item.pin} ({item.label})
          </button>
        ))}
      </div>

      {errorMessage && (
        <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
