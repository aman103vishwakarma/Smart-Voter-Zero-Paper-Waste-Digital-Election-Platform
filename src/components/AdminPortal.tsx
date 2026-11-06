"use client";

import React, { useState } from "react";
import { ShieldCheck, UserCheck, AlertTriangle, CheckCircle2, QrCode, PlusCircle, Sparkles, FileText, Printer } from "lucide-react";
import { Candidate, Constituency, Party } from "@/types";
import { formatCurrencyINR } from "@/lib/utils";

interface AdminPortalProps {
  candidates: Candidate[];
  constituencies: Constituency[];
  parties: Party[];
  onRefresh: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  candidates,
  constituencies,
  parties,
  onRefresh,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"verify" | "generate-qr" | "add-candidate">("verify");
  const [officerToken, setOfficerToken] = useState("ECI-OFFICER-2026-AUTH");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // QR Generator states
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(candidates[0]?.id || "");
  const [locationLabel, setLocationLabel] = useState("Metro Station Gate 1 Banner");
  const [generatedQr, setGeneratedQr] = useState<any | null>(null);

  // New Candidate Form states
  const [fullName, setFullName] = useState("");
  const [partyId, setPartyId] = useState(parties[0]?.id || "");
  const [constituencyId, setConstituencyId] = useState(constituencies[0]?.id || "");
  const [education, setEducation] = useState("Master of Public Policy");
  const [age, setAge] = useState(38);
  const [assets, setAssets] = useState(15000000);
  const [manifestoTitle, setManifestoTitle] = useState("Community Clean Governance Charter");
  const [manifestoText, setManifestoText] = useState("Our vision focuses on eliminating waste, accelerating municipal road repairs, and deploying solar energy.");
  const [isAiSummarizing, setIsAiSummarizing] = useState(false);

  // Handle Verify / Reject
  const handleVerifyCandidate = async (candidateId: string, status: "VERIFIED" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          status,
          officerName: "Dr. K. S. Verma (Returning Officer DL-04)",
          officerToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setActionMessage(data.message);
      onRefresh();
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  // Handle QR Generation
  const handleGenerateQr = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: selectedCandidateId,
          locationLabel,
        }),
      });

      const data = await res.json();
      if (data.qrCode) {
        setGeneratedQr(data.qrCode);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Add Candidate & AI Manifesto Extraction
  const handleCreateCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiSummarizing(true);

    try {
      // 1. Run AI summarization on the manifesto text
      const aiRes = await fetch("/api/manifestos/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: manifestoTitle,
          rawText: manifestoText,
          candidateName: fullName,
        }),
      });
      const aiData = await aiRes.json();

      // 2. Submit new Candidate
      const candRes = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          partyId,
          constituencyId,
          education,
          age,
          assetsDeclared: assets,
          bio: `${education} graduate campaigning for high transparency, clean energy, and civic equity.`,
          manifesto: {
            title: manifestoTitle,
            aiSummary: aiData.aiSummary,
            keyPromises: aiData.keyPromises,
            categoryBreakdown: aiData.categoryBreakdown,
            pdfUrl: "https://eci.gov.in/sample-manifesto.pdf",
            pageCount: 12,
          },
        }),
      });

      if (candRes.ok) {
        setActionMessage(`Candidate ${fullName} successfully registered for verification!`);
        setIsAiSummarizing(false);
        setFullName("");
        onRefresh();
      }
    } catch (err: any) {
      setIsAiSummarizing(false);
      setActionMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-12">
      {/* Top Banner */}
      <div className="bg-slate-950 p-6 sm:p-8 text-white border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Election Commission & Candidate Authorized Portal
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Official ECI Candidate & Digital Campaign Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review Form 26 affidavits, issue tamper-evident verification badges, and generate eco-friendly poster QR codes.
          </p>
        </div>

        {/* Auth Role Badge */}
        <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">Auth Token:</span>
          <input
            type="text"
            value={officerToken}
            onChange={(e) => setOfficerToken(e.target.value)}
            className="bg-transparent text-xs font-mono text-emerald-400 focus:outline-none w-44"
          />
        </div>
      </div>

      {actionMessage && (
        <div className="bg-emerald-50 text-emerald-800 p-3.5 border-b border-emerald-200 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50/70 px-6">
        <button
          onClick={() => setActiveSubTab("verify")}
          className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeSubTab === "verify"
              ? "border-emerald-600 text-emerald-700 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Affidavit Verification Queue</span>
        </button>

        <button
          onClick={() => setActiveSubTab("generate-qr")}
          className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeSubTab === "generate-qr"
              ? "border-emerald-600 text-emerald-700 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Generate Eco-Poster QR</span>
        </button>

        <button
          onClick={() => setActiveSubTab("add-candidate")}
          className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeSubTab === "add-candidate"
              ? "border-emerald-600 text-emerald-700 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register Candidate & Ingest Manifesto</span>
        </button>
      </div>

      {/* Tab 1: Verification Queue */}
      {activeSubTab === "verify" && (
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            Candidate Verification & Affidavit Review
          </h3>
          <div className="space-y-4">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cand.profilePhotoUrl}
                      alt={cand.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-gray-900">{cand.fullName}</h4>
                      <span className="text-xs text-gray-500 font-semibold">({cand.party.abbreviation})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cand.verificationStatus === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {cand.verificationStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {cand.constituencyName} • Assets: {formatCurrencyINR(cand.assetsDeclared)} • Criminal Cases: {cand.criminalCases}
                    </p>
                    {cand.verifiedBy && (
                      <p className="text-[11px] text-gray-400 mt-1 font-mono">
                        Audited by: {cand.verifiedBy}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {cand.verificationStatus !== "VERIFIED" ? (
                    <button
                      onClick={() => handleVerifyCandidate(cand.id, "VERIFIED")}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve & Verify
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerifyCandidate(cand.id, "REJECTED")}
                      className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-200"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Revoke Verification
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Generate Campaign QR Code */}
      {activeSubTab === "generate-qr" && (
        <div className="p-6 max-w-2xl">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
            Eco-Friendly Poster QR Code Generator
          </h3>
          <p className="text-xs text-gray-600 mb-6">
            Generate printable, trackable QR codes for reusable roadside campaign stands. When scanned, citizens view verified manifestos without printing thousands of paper flyers.
          </p>

          <form onSubmit={handleGenerateQr} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Select Candidate
              </label>
              <select
                value={selectedCandidateId}
                onChange={(e) => setSelectedCandidateId(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.fullName} — {c.party.name} ({c.constituencyName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Campaign Stand / Location Label
              </label>
              <input
                type="text"
                value={locationLabel}
                onChange={(e) => setLocationLabel(e.target.value)}
                placeholder="e.g. Assi Ghat Main Concourse Eco-Stand"
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <QrCode className="w-4 h-4" />
              Generate Trackable QR Poster
            </button>
          </form>

          {/* Generated Poster Card Preview */}
          {generatedQr && (
            <div className="mt-8 p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-50/30 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Print-Ready Eco-Campaign Banner
              </span>
              <div className="mt-4 p-6 bg-white rounded-2xl shadow-md border border-gray-200 inline-block">
                <div className="text-lg font-black text-gray-900">{generatedQr.candidateName}</div>
                <div className="text-xs font-bold text-emerald-600 mb-4">{generatedQr.partyAbbr} Campaign</div>

                {/* Simulated QR Code Canvas Display */}
                <div className="w-44 h-44 mx-auto bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-white">
                  <QrCode className="w-28 h-28 text-white" />
                  <span className="font-mono text-[9px] mt-2 text-emerald-300 tracking-wider">
                    {generatedQr.codeHash}
                  </span>
                </div>

                <div className="mt-4 text-xs font-medium text-gray-700">
                  📍 {generatedQr.locationLabel}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Scan to read manifesto & verified affidavit • Zero Paper Waste
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print Campaign Stand
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Register Candidate & AI Summarization */}
      {activeSubTab === "add-candidate" && (
        <div className="p-6 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Register Candidate & Auto-Summarize Manifesto (Gemini AI Engine)
            </h3>
          </div>
          <p className="text-xs text-gray-600 mb-6">
            Enter candidate credentials and paste their manifesto text. The AI pipeline analyzes promises, extracts timelines, and organizes them by policy category.
          </p>

          <form onSubmit={handleCreateCandidate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shalini Roy"
                  className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Education & Degree
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. B.Tech Computer Science"
                  className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Political Party
                </label>
                <select
                  value={partyId}
                  onChange={(e) => setPartyId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
                >
                  {parties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.abbreviation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Constituency
                </label>
                <select
                  value={constituencyId}
                  onChange={(e) => setConstituencyId(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
                >
                  {constituencies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Manifesto Document Title
              </label>
              <input
                type="text"
                value={manifestoTitle}
                onChange={(e) => setManifestoTitle(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Manifesto Raw Content (for AI Key Point Extraction)
              </label>
              <textarea
                rows={4}
                value={manifestoText}
                onChange={(e) => setManifestoText(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
                placeholder="Paste manifesto charter, key pledges, economic vision..."
              />
            </div>

            <button
              type="submit"
              disabled={isAiSummarizing || !fullName}
              className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              {isAiSummarizing ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  Extracting Policies with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Ingest & Auto-Summarize Manifesto
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
