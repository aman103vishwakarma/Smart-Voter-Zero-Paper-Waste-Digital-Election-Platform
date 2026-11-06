"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { EcoImpactBanner } from "@/components/EcoImpactBanner";
import { ConstituencySelector } from "@/components/ConstituencySelector";
import { CandidateCard } from "@/components/CandidateCard";
import { CandidateDetailModal } from "@/components/CandidateDetailModal";
import { ComparisonDrawer } from "@/components/ComparisonDrawer";
import { LiveCameraQrScanner } from "@/components/LiveCameraQrScanner";
import { DigitalVoterSlipModal } from "@/components/DigitalVoterSlipModal";
import { CivicIssuesBoard } from "@/components/CivicIssuesBoard";
import { AdminPortal } from "@/components/AdminPortal";
import { Candidate, Constituency, Party } from "@/types";
import { Filter, Scale, Users, Sparkles, QrCode, Search, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"directory" | "compare" | "scanner" | "admin" | "impact" | "issues">("directory");
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [selectedConstituency, setSelectedConstituency] = useState<Constituency | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [selectedPartyFilter, setSelectedPartyFilter] = useState<string>("all");
  const [cleanRecordOnly, setCleanRecordOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isVoterSlipOpen, setIsVoterSlipOpen] = useState(false);

  // Initial Data Load
  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      // 1. Get constituencies
      const constRes = await fetch("/api/constituencies");
      const constData = await constRes.json();
      const loadedConstituencies: Constituency[] = constData.constituencies || [];
      setConstituencies(loadedConstituencies);

      const defaultConst = loadedConstituencies[0];
      setSelectedConstituency(defaultConst);

      // 2. Get candidates for default constituency
      if (defaultConst) {
        const candRes = await fetch(
          `/api/candidates/by-location?lat=${(defaultConst.bounds.minLat + defaultConst.bounds.maxLat) / 2}&lng=${(defaultConst.bounds.minLng + defaultConst.bounds.maxLng) / 2}`
        );
        const candData = await candRes.json();
        setCandidates(candData.candidates || []);
      }

      // 3. Extract unique parties
      const allCandRes = await fetch("/api/candidates");
      const allCandData = await allCandRes.json();
      const allCands: Candidate[] = allCandData.candidates || [];
      const uniquePartiesMap = new Map<string, Party>();
      allCands.forEach((c) => {
        if (c.party && !uniquePartiesMap.has(c.party.id)) {
          uniquePartiesMap.set(c.party.id, c.party);
        }
      });
      setParties(Array.from(uniquePartiesMap.values()));
    } catch (err) {
      console.error("Failed to load initial data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Location handler (GPS coordinates)
  const handleLocationDetected = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/candidates/by-location?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      if (data.constituency) {
        setSelectedConstituency(data.constituency);
        setCandidates(data.candidates || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Pincode handler
  const handlePincodeSearch = async (pincode: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/candidates/by-location?pincode=${pincode}`);
      const data = await res.json();
      if (data.constituency) {
        setSelectedConstituency(data.constituency);
        setCandidates(data.candidates || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Direct Constituency selection
  const handleSelectConstituency = async (constituency: Constituency) => {
    setSelectedConstituency(constituency);
    setIsLoading(true);
    try {
      const lat = (constituency.bounds.minLat + constituency.bounds.maxLat) / 2;
      const lng = (constituency.bounds.minLng + constituency.bounds.maxLng) / 2;
      const res = await fetch(`/api/candidates/by-location?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      setCandidates(data.candidates || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle candidate in comparison
  const handleCompareToggle = (candidateId: string) => {
    setComparisonIds((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 candidates simultaneously.");
        return prev;
      }
      return [...prev, candidateId];
    });
  };

  // Comparing candidates objects
  const comparingCandidates = useMemo(() => {
    return candidates.filter((c) => comparisonIds.includes(c.id));
  }, [candidates, comparisonIds]);

  // Filtered candidate list
  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      if (selectedPartyFilter !== "all" && cand.party.id !== selectedPartyFilter) {
        return false;
      }
      if (cleanRecordOnly && cand.criminalCases > 0) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = cand.fullName.toLowerCase().includes(q);
        const matchesParty =
          cand.party.name.toLowerCase().includes(q) ||
          cand.party.abbreviation.toLowerCase().includes(q);
        const matchesBio = cand.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesParty && !matchesBio) return false;
      }
      return true;
    });
  }, [candidates, selectedPartyFilter, cleanRecordOnly, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === "scanner") {
            setIsQrScannerOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenVoterSlip={() => setIsVoterSlipOpen(true)}
        compareCount={comparisonIds.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Eco-Impact Banner */}
        <EcoImpactBanner />

        {/* VIEW 1: CANDIDATE DIRECTORY */}
        {activeTab === "directory" && (
          <div>
            {/* Constituency Selector (GPS / Pincode / Dropdown) */}
            {selectedConstituency && (
              <ConstituencySelector
                constituencies={constituencies}
                selectedConstituency={selectedConstituency}
                onSelectConstituency={handleSelectConstituency}
                onLocationDetected={handleLocationDetected}
                onPincodeSearch={handlePincodeSearch}
                isLoading={isLoading}
              />
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate by name, party, or keyword..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Party Filter */}
                <select
                  value={selectedPartyFilter}
                  onChange={(e) => setSelectedPartyFilter(e.target.value)}
                  className="py-2 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="all">All Political Parties</option>
                  {parties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.abbreviation})
                    </option>
                  ))}
                </select>

                {/* Clean Record Toggle */}
                <button
                  type="button"
                  onClick={() => setCleanRecordOnly((prev) => !prev)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    cleanRecordOnly
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>0 Criminal Cases</span>
                </button>
              </div>
            </div>

            {/* Candidate Cards Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-2xl" />
                ))}
              </div>
            ) : filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onViewDetails={(c) => setSelectedCandidate(c)}
                    onCompareToggle={handleCompareToggle}
                    isComparing={comparisonIds.includes(candidate.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No Candidates Found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your filters, selecting a different constituency, or searching with another keyword.
                </p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: CANDIDATE COMPARISON MATRIX */}
        {activeTab === "compare" && (
          <div>
            {comparingCandidates.length > 0 ? (
              <ComparisonDrawer
                candidates={comparingCandidates}
                onRemove={handleCompareToggle}
                onClear={() => setComparisonIds([])}
                onViewDetails={(c) => setSelectedCandidate(c)}
              />
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-sm">
                <Scale className="w-16 h-16 text-emerald-600 mx-auto mb-4 p-3 bg-emerald-50 rounded-2xl" />
                <h3 className="text-xl font-bold text-gray-900">No Candidates Selected For Comparison</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  Go to the Candidate Directory and click the &quot;Compare&quot; button on any candidate to inspect their track records and policy manifestos side by side.
                </p>
                <button
                  onClick={() => setActiveTab("directory")}
                  className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Browse Candidate Directory
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: CIVIC ISSUES & PLEDGE ACCOUNTABILITY */}
        {activeTab === "issues" && selectedConstituency && (
          <CivicIssuesBoard constituency={selectedConstituency} />
        )}

        {/* VIEW 4: ECO IMPACT REPORT */}
        {activeTab === "impact" && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900">
              The Environmental Cost of Traditional Elections
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-3xl">
              In a typical parliamentary election cycle, over 500 million paper posters, PVC flex banners, and leaflets are produced. The vast majority end up in roadside storm drains or landfills within 48 hours of voting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="text-3xl font-black text-emerald-900">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mt-1">
                  Zero Roadside Paper Waste
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Campaign stands use reusable, permanent QR code hubs rather than disposable paper flyers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-3xl font-black text-blue-900">Form 26</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mt-1">
                  Verified Transparency
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Direct digital access to candidate criminal disclosures and audited asset balance sheets.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
                <div className="text-3xl font-black text-purple-900">AI Indexed</div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-700 mt-1">
                  Readable Manifestos
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  50-page manifesto PDFs distilled into 4 clear policy pillars so every citizen can vote with confidence.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: ADMIN / OFFICIAL PORTAL */}
        {activeTab === "admin" && (
          <AdminPortal
            candidates={candidates}
            constituencies={constituencies}
            parties={parties}
            onRefresh={fetchInitialData}
          />
        )}
      </main>

      {/* Floating Comparison Sticky Bar (When 1+ candidates selected) */}
      {comparisonIds.length > 0 && activeTab !== "compare" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold">
              {comparisonIds.length} Candidate{comparisonIds.length > 1 ? "s" : ""} selected for comparison
            </span>
          </div>
          <button
            onClick={() => setActiveTab("compare")}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
          >
            Compare Now →
          </button>
        </div>
      )}

      {/* Candidate Full Profile Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onOpenQr={(c) => {
          setSelectedCandidate(null);
          setIsQrScannerOpen(true);
        }}
      />

      {/* Real-World Live Camera QR Scanner Modal */}
      <LiveCameraQrScanner
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onCandidateFound={(cand) => {
          setSelectedCandidate(cand);
        }}
      />

      {/* Digital Voter Slip & Polling Station Navigator Modal */}
      <DigitalVoterSlipModal
        isOpen={isVoterSlipOpen}
        onClose={() => setIsVoterSlipOpen(false)}
      />
    </div>
  );
}
