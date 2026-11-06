"use client";

import React, { useEffect, useState } from "react";
import { Leaf, FileX, Trees, CloudFog, Droplets, Info } from "lucide-react";
import { EcoImpactStats } from "@/types";
import { formatNumber } from "@/lib/utils";

export const EcoImpactBanner: React.FC = () => {
  const [stats, setStats] = useState<EcoImpactStats>({
    paperPostersSaved: 58400,
    treesPreserved: 46.7,
    co2PreventedKg: 7008,
    plasticFlexAvoidedKg: 4672,
    waterSavedLiters: 584000,
  });

  useEffect(() => {
    fetch("/api/eco-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8 border border-emerald-700/30">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/20">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Live Campaign Waste Reduction Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Transforming Roadside Posters into Digital Democracy
          </h2>
          <p className="text-sm text-emerald-100/80 mt-2 leading-relaxed">
            Every QR scan of a reusable campaign poster eliminates hundreds of single-use PVC flex banners and paper printouts. Voters get verified, unfiltered policy documents right on their phone.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-center">
            <FileX className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatNumber(stats.paperPostersSaved)}+
            </div>
            <div className="text-[11px] font-medium text-emerald-200">
              Posters Avoided
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-center">
            <Trees className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-white">
              {stats.treesPreserved}
            </div>
            <div className="text-[11px] font-medium text-emerald-200">
              Trees Preserved
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-center">
            <CloudFog className="w-5 h-5 text-teal-300 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatNumber(stats.co2PreventedKg)} <span className="text-xs">kg</span>
            </div>
            <div className="text-[11px] font-medium text-emerald-200">
              CO₂ Mitigated
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-center">
            <Droplets className="w-5 h-5 text-cyan-300 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatNumber(Math.round(stats.waterSavedLiters / 1000))}k <span className="text-xs">L</span>
            </div>
            <div className="text-[11px] font-medium text-emerald-200">
              Water Conserved
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/70">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>Calculations based on 120gsm paper flyers & PVC vinyl life-cycle metrics.</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px]">Updated in real-time</span>
      </div>
    </section>
  );
};
