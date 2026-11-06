"use client";

import React from "react";
import { CheckCircle2, FileText, AlertTriangle, Scale, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";
import { Candidate } from "@/types";
import { formatCurrencyINR } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
  onCompareToggle: (candidateId: string) => void;
  isComparing: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onViewDetails,
  onCompareToggle,
  isComparing,
}) => {
  const isVerified = candidate.verificationStatus === "VERIFIED";

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Top Banner with Party & Verification */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: candidate.party.colorHex || "#16a34a" }}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Candidate Profile Header */}
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={candidate.profilePhotoUrl}
              alt={candidate.fullName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {candidate.fullName}
              </h3>
              {isVerified ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  Pending Verification
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={candidate.party.symbolUrl}
                  alt={candidate.party.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 truncate">
                {candidate.party.name} ({candidate.party.abbreviation})
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {candidate.education} • Age {candidate.age}
            </p>
          </div>
        </div>

        {/* Bio Excerpt */}
        <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">
          {candidate.bio}
        </p>

        {/* Affidavit Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-2.5">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">
              Declared Assets
            </span>
            <span className="text-sm font-bold text-gray-900">
              {formatCurrencyINR(candidate.assetsDeclared)}
            </span>
          </div>

          <div
            className={`rounded-xl p-2.5 ${
              candidate.criminalCases > 0 ? "bg-amber-50/80" : "bg-emerald-50/70"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">
              Criminal Cases
            </span>
            <span
              className={`text-sm font-bold flex items-center gap-1 ${
                candidate.criminalCases > 0 ? "text-amber-800" : "text-emerald-800"
              }`}
            >
              {candidate.criminalCases > 0 ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {candidate.criminalCases} Disclosed
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Clean Record (0)
                </>
              )}
            </span>
          </div>
        </div>

        {/* AI Manifesto Digest Tag */}
        {candidate.manifesto && (
          <div className="mt-3.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100/80 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>AI Manifesto Highlight</span>
            </div>
            <p className="text-gray-700 line-clamp-2 leading-relaxed text-[11px]">
              {candidate.manifesto.aiSummary}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(candidate)}
            className="flex-1 py-2 px-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Full Profile</span>
          </button>

          <button
            type="button"
            onClick={() => onCompareToggle(candidate.id)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              isComparing
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isComparing ? "Selected" : "Compare"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
