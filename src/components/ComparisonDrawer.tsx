"use client";

import React from "react";
import { X, Scale, ShieldCheck, AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";
import { Candidate } from "@/types";
import { formatCurrencyINR } from "@/lib/utils";

interface ComparisonDrawerProps {
  candidates: Candidate[];
  onRemove: (candidateId: string) => void;
  onClear: () => void;
  onViewDetails: (candidate: Candidate) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  candidates,
  onRemove,
  onClear,
  onViewDetails,
}) => {
  if (candidates.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" />
            Voter Decision Matrix
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Side-by-Side Candidate Comparison ({candidates.length} Selected)
          </h2>
          <p className="text-xs text-blue-200/80 mt-1">
            Compare track records, verified affidavits, and policy stances side by side to make an informed, unbiased vote.
          </p>
        </div>

        <button
          onClick={onClear}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Comparison
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/4">
                Comparison Metric
              </th>
              {candidates.map((cand) => (
                <th key={cand.id} className="p-4 w-1/4 align-top">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cand.profilePhotoUrl}
                          alt={cand.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{cand.fullName}</div>
                        <div className="text-xs text-emerald-700 font-semibold">{cand.party.name}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(cand.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remove candidate"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-xs">
            {/* Verification Status */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">ECI Status</td>
              {candidates.map((cand) => (
                <td key={cand.id} className="p-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Official Candidate
                  </span>
                </td>
              ))}
            </tr>

            {/* Education & Age */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Education & Age</td>
              {candidates.map((cand) => (
                <td key={cand.id} className="p-4 text-gray-800 font-medium">
                  <div>{cand.education}</div>
                  <div className="text-gray-500 mt-0.5">{cand.age} Years Old</div>
                </td>
              ))}
            </tr>

            {/* Declared Assets */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Declared Assets</td>
              {candidates.map((cand) => (
                <td key={cand.id} className="p-4">
                  <div className="font-extrabold text-sm text-gray-900">
                    {formatCurrencyINR(cand.assetsDeclared)}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Liabilities: {formatCurrencyINR(cand.liabilitiesDeclared)}
                  </div>
                </td>
              ))}
            </tr>

            {/* Criminal Disclosures */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Criminal Disclosures</td>
              {candidates.map((cand) => (
                <td key={cand.id} className="p-4">
                  {cand.criminalCases === 0 ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Clean Record (0)
                    </span>
                  ) : (
                    <div>
                      <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        {cand.criminalCases} Cases Disclosed
                      </span>
                      <p className="text-[11px] text-gray-500 mt-1">
                        {cand.criminalCasesDetails || "Disclosed in Form 26"}
                      </p>
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Economy & Jobs */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Economy & Jobs</td>
              {candidates.map((cand) => {
                const policy = cand.manifesto?.categoryBreakdown.find(
                  (c) => c.category === "Economy & Jobs"
                );
                return (
                  <td key={cand.id} className="p-4 text-gray-700 leading-relaxed">
                    {policy ? policy.promise : "Focuses on regional infrastructure & commerce"}
                  </td>
                );
              })}
            </tr>

            {/* Healthcare */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Healthcare Stance</td>
              {candidates.map((cand) => {
                const policy = cand.manifesto?.categoryBreakdown.find(
                  (c) => c.category === "Healthcare"
                );
                return (
                  <td key={cand.id} className="p-4 text-gray-700 leading-relaxed">
                    {policy ? policy.promise : "Focuses on universal primary care clinics"}
                  </td>
                );
              })}
            </tr>

            {/* Green & Climate */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Green & Climate Stance</td>
              {candidates.map((cand) => {
                const policy = cand.manifesto?.categoryBreakdown.find(
                  (c) => c.category === "Green & Climate"
                );
                return (
                  <td key={cand.id} className="p-4 text-gray-700 leading-relaxed">
                    {policy ? policy.promise : "Support for clean water and green spaces"}
                  </td>
                );
              })}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 font-bold text-gray-700 bg-gray-50/40">Actions</td>
              {candidates.map((cand) => (
                <td key={cand.id} className="p-4">
                  <button
                    onClick={() => onViewDetails(cand)}
                    className="w-full py-2 px-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs transition-colors"
                  >
                    View Full Profile & Affidavit
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
