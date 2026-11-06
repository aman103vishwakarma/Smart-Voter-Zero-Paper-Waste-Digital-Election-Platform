"use client";

import React, { useState, useEffect } from "react";
import { ThumbsUp, AlertCircle, PlusCircle, CheckCircle2, MessageSquare, MapPin, Tag, Sparkles } from "lucide-react";
import { CivicIssue, Constituency } from "@/types";

interface CivicIssuesBoardProps {
  constituency: Constituency;
}

export const CivicIssuesBoard: React.FC<CivicIssuesBoardProps> = ({ constituency }) => {
  const [issues, setIssues] = useState<CivicIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);

  // New Issue Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("Roads & Transit");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const fetchIssues = async () => {
    try {
      const res = await fetch(`/api/issues?constituencyId=${constituency.id}`);
      const data = await res.json();
      setIssues(data.issues || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [constituency.id]);

  const handleUpvote = async (issueId: string) => {
    // Optimistic UI update
    setIssues((prev) =>
      prev.map((item) => (item.id === issueId ? { ...item, upvotes: item.upvotes + 1 } : item))
    );

    try {
      await fetch("/api/issues/upvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId }),
      });
    } catch {}
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          constituencyId: constituency.id,
          title,
          category,
          location,
          description,
        }),
      });

      if (res.ok) {
        setTitle("");
        setLocation("");
        setDescription("");
        setShowNewForm(false);
        setSuccessToast("Your civic issue has been logged! Candidates can now review and link their pledges.");
        fetchIssues();
        setTimeout(() => setSuccessToast(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Civic Issues & Candidate Accountability Board
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Local Ward Problems & Candidate Pledges
          </h2>
          <p className="text-xs text-teal-100/80 mt-1 max-w-2xl">
            Voters highlight urgent community grievances. See which running candidates have officially pledged solutions in their manifestos.
          </p>
        </div>

        <button
          onClick={() => setShowNewForm((prev) => !prev)}
          className="self-start md:self-center inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Ward Issue</span>
        </button>
      </div>

      {successToast && (
        <div className="bg-emerald-50 text-emerald-800 p-3.5 border-b border-emerald-200 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* New Issue Form */}
      {showNewForm && (
        <div className="p-6 bg-slate-50 border-b border-gray-200 animate-in slide-in-from-top-4 duration-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            Submit a Community Problem in {constituency.name}
          </h4>
          <form onSubmit={handleCreateIssue} className="space-y-3 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g. Chronic Low Water Pressure in Block B"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
                >
                  <option value="Roads & Transit">Roads & Transit</option>
                  <option value="Clean Water">Clean Water</option>
                  <option value="Pollution & Waste">Pollution & Waste</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Public Safety">Public Safety</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Specific Location / Ward Landmark</label>
              <input
                type="text"
                placeholder="e.g. Near Metro Pillar 142, Main Market"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Detailed Description</label>
              <textarea
                rows={3}
                placeholder="Explain the problem and what action you demand from the elected representative..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-xl"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                {submitting ? "Submitting..." : "Post to Accountability Board"}
              </button>
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Issues Feed */}
      <div className="p-6 divide-y divide-gray-100">
        {loading ? (
          <div className="py-8 text-center text-xs text-gray-400">Loading civic issues...</div>
        ) : issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                    {issue.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{issue.location}</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-gray-900">{issue.title}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{issue.description}</p>

                {/* Candidate Manifesto Pledges Tag */}
                {issue.pledgedCandidateNames.length > 0 && (
                  <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span className="text-[11px] font-bold text-gray-700">Pledged to solve by:</span>
                    {issue.pledgedCandidateNames.map((name, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Upvote Button */}
              <button
                type="button"
                onClick={() => handleUpvote(issue.id)}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 border border-gray-200 transition-all flex-shrink-0 min-w-[56px]"
              >
                <ThumbsUp className="w-4 h-4 mb-0.5 text-emerald-600" />
                <span className="text-xs font-black">{issue.upvotes}</span>
                <span className="text-[9px] font-semibold text-gray-400">Votes</span>
              </button>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-xs text-gray-500">
            No issues reported yet for this constituency. Be the first to report one!
          </div>
        )}
      </div>
    </div>
  );
};
