"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, AlertTriangle, FileText, Download, QrCode, Building, GraduationCap, Calendar, Sparkles, Printer, Globe } from "lucide-react";
import { Candidate, SupportedLanguage } from "@/types";
import { formatCurrencyINR } from "@/lib/utils";
import { AudioManifestoReader } from "./AudioManifestoReader";
import { PrintablePosterCanvas } from "./PrintablePosterCanvas";

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onOpenQr: (candidate: Candidate) => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  onClose,
  onOpenQr,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("en");
  const [showPosterCanvas, setShowPosterCanvas] = useState(false);

  if (!candidate) return null;

  const categories = candidate.manifesto?.categoryBreakdown || [];
  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Active translation
  const activeTranslation = candidate.manifesto?.translations?.[selectedLanguage];
  const summaryText = activeTranslation?.aiSummary || candidate.manifesto?.aiSummary;
  const promisesList = activeTranslation?.keyPromises || candidate.manifesto?.keyPromises || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Banner */}
        <div
          className="h-24 w-full relative flex items-end justify-between px-6 pb-3"
          style={{
            background: `linear-gradient(135deg, ${candidate.party.colorHex || "#16a34a"} 0%, #0f172a 100%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Profile Header Card */}
        <div className="px-6 -mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-end gap-4">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white p-1 border-4 border-white shadow-lg flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={candidate.profilePhotoUrl}
                alt={candidate.fullName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900">{candidate.fullName}</h2>
                {candidate.verificationStatus === "VERIFIED" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ECI Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-0.5">
                <span>{candidate.party.name} ({candidate.party.abbreviation})</span>
                <span>•</span>
                <span>{candidate.constituencyName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowPosterCanvas((prev) => !prev)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{showPosterCanvas ? "Hide Poster" : "Printable Poster"}</span>
            </button>
            {candidate.manifesto?.pdfUrl && (
              <a
                href={candidate.manifesto.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>PDF Manifesto</span>
              </a>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-6">
          {/* Printable Poster Stand Preview if toggled */}
          {showPosterCanvas && (
            <div className="mb-6 animate-in slide-in-from-top-4 duration-300">
              <PrintablePosterCanvas candidate={candidate} />
            </div>
          )}

          {/* Multilingual Voice Reader (Web Speech API) */}
          <AudioManifestoReader
            candidate={candidate}
            selectedLanguage={selectedLanguage}
            onLanguageChange={(lang) => setSelectedLanguage(lang)}
          />

          {/* Biography & Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Candidate Background
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">{candidate.bio}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Education</span>
                  <span className="text-xs font-semibold text-gray-800">{candidate.education}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Age</span>
                  <span className="text-xs font-semibold text-gray-800">{candidate.age} Years</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Building className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Party HQ</span>
                  <span className="text-xs font-semibold text-gray-800">{candidate.party.headquarters}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Declared Assets & Criminal Cases Affidavit */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Official Affidavit Disclosure (Form 26)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Declared Assets</span>
                <span className="text-lg font-black text-slate-900 mt-1 block">
                  {formatCurrencyINR(candidate.assetsDeclared)}
                </span>
                <span className="text-[11px] text-slate-500">Movable & Immovable</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Declared Liabilities</span>
                <span className="text-lg font-black text-slate-900 mt-1 block">
                  {formatCurrencyINR(candidate.liabilitiesDeclared)}
                </span>
                <span className="text-[11px] text-slate-500">Bank loans & dues</span>
              </div>

              <div
                className={`p-3.5 rounded-2xl border ${
                  candidate.criminalCases > 0 ? "bg-amber-50/80 border-amber-200" : "bg-emerald-50/80 border-emerald-200"
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-gray-600 block">Criminal Disclosures</span>
                <span
                  className={`text-lg font-black mt-1 flex items-center gap-1.5 ${
                    candidate.criminalCases > 0 ? "text-amber-800" : "text-emerald-800"
                  }`}
                >
                  {candidate.criminalCases > 0 ? (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      {candidate.criminalCases} Cases
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      Zero Cases
                    </>
                  )}
                </span>
                <span className="text-[11px] text-gray-600">
                  {candidate.criminalCases > 0 ? "Non-violent union action" : "Clean Police Record"}
                </span>
              </div>
            </div>

            {candidate.criminalCasesDetails && (
              <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold">Affidavit Record Details: </span>
                {candidate.criminalCasesDetails}
              </div>
            )}
          </div>

          {/* Manifesto & Policy Breakdown */}
          {candidate.manifesto && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Election Manifesto & Policy Commitments
                  </h4>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {candidate.manifesto.pageCount} Pages • AI Indexed
                </span>
              </div>

              {/* AI Executive Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-900 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Executive AI Summary</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-mono uppercase font-bold">
                    Language: {selectedLanguage.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed">{summaryText}</p>
              </div>

              {/* Key Promises Bullets */}
              <div className="mt-4">
                <h5 className="text-xs font-bold text-gray-900 mb-2">Key Campaign Pledges:</h5>
                <ul className="space-y-1.5">
                  {promisesList.map((promise, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{promise}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category Breakdown Tabs */}
              {categories.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-gray-100">
                    {["all", "Green & Climate", "Healthcare", "Economy & Jobs", "Infrastructure", "Governance"].map(
                      (cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                            activeCategory === cat
                              ? "bg-gray-900 text-white font-semibold"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {cat === "all" ? "All Policies" : cat}
                        </button>
                      )
                    )}
                  </div>

                  <div className="space-y-2 mt-3">
                    {filteredCategories.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-emerald-700">{item.category}</span>
                          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            Timeline: {item.timeline}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 mt-1">{item.promise}</p>
                        {item.budgetAllocation && (
                          <div className="mt-2 text-[11px] text-gray-500">
                            Budget Target:{" "}
                            <span className="font-semibold text-gray-900">{item.budgetAllocation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified from ECI Public Records • Form 26 Affidavit</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
