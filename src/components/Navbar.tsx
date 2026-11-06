"use client";

import React from "react";
import { Vote, QrCode, Scale, ShieldCheck, Leaf, Compass, FileCheck2, MessageSquare } from "lucide-react";

interface NavbarProps {
  activeTab: "directory" | "compare" | "scanner" | "admin" | "impact" | "issues";
  onTabChange: (tab: "directory" | "compare" | "scanner" | "admin" | "impact" | "issues") => void;
  onOpenVoterSlip: () => void;
  compareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenVoterSlip,
  compareCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => onTabChange("directory")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-gray-900">
                  Smart<span className="text-emerald-600">Voter</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <Leaf className="w-2.5 h-2.5" /> Eco-Election
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Digital Manifestos • Zero Paper Waste
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange("directory")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "directory"
                  ? "bg-emerald-50 text-emerald-700 shadow-sm font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => onTabChange("compare")}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "compare"
                  ? "bg-emerald-50 text-emerald-700 shadow-sm font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange("issues")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "issues"
                  ? "bg-emerald-50 text-emerald-700 shadow-sm font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              <span className="hidden md:inline">Ward Issues</span>
            </button>

            {/* Real Camera QR Scanner Trigger */}
            <button
              onClick={() => onTabChange("scanner")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Camera Scan</span>
              <span className="sm:hidden">Scan</span>
            </button>

            {/* Digital Voter Slip Modal Trigger */}
            <button
              onClick={onOpenVoterSlip}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">My Voter Slip</span>
              <span className="sm:hidden">Slip</span>
            </button>

            {/* Official Portal Trigger */}
            <button
              onClick={() => onTabChange("admin")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border border-gray-200 ${
                activeTab === "admin"
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Official Portal</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
