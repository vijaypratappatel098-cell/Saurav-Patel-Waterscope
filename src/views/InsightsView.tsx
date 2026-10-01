import React, { useState } from 'react';
import {
  FileCheck,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Droplet,
  TreePine,
  ShieldCheck,
  Compass,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { DECISION_INSIGHTS, WATERSHED_CONFIG } from '../data/watershedData';
import { DecisionInsight } from '../types/watershed';

export const InsightsView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Hydrology', 'Vegetation', 'Soil Health', 'Intervention Audit'];

  const filteredInsights = DECISION_INSIGHTS.filter(
    (ins) => selectedCategory === 'all' || ins.category === selectedCategory
  );

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnostic Spatial Synthesis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Insights & Decision Support
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Synthesizing geo-coded field truthing, digital elevation flow models, and satellite vegetation indices into actionable watershed governance directives.
          </p>
        </div>

        {/* Demo Data Disclaimer Label */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2 max-w-md">
          <Info className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Demonstration Insight:</strong> Modelled spatial intelligence derived from synthetic baseline data for Hackathon & Research demonstration.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-700 mr-2">Filter Category:</span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === c
                ? 'bg-emerald-700 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {c === 'all' ? 'All Insights' : c}
          </button>
        ))}
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInsights.map((ins) => (
          <div
            key={ins.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-[11px] font-mono font-semibold text-slate-400">{ins.id}</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    ins.severity === 'Critical Opportunity'
                      ? 'bg-red-100 text-red-800'
                      : ins.severity === 'High Priority'
                      ? 'bg-amber-100 text-amber-800'
                      : ins.severity === 'Positive Result'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {ins.severity}
                </span>
              </div>

              <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                {ins.subWatershed}
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{ins.title}</h3>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ins.description}</p>

              {/* Geospatial Evidence Source */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block mb-0.5">Geospatial Evidence:</span>
                <span className="font-mono text-slate-600 text-[11px]">{ins.geoEvidence}</span>
              </div>

              {/* Action Directive */}
              <div className="mt-3 p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                <span className="font-bold text-emerald-900 block mb-1">
                  Prescribed Technical Recommendation:
                </span>
                <p className="leading-relaxed">{ins.recommendedAction}</p>
                <div className="mt-2 pt-2 border-t border-emerald-200/60 font-semibold text-emerald-800 text-[11px]">
                  Expected Impact: {ins.estimatedImpact}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-amber-700 font-mono italic">
                Demonstration Insight
              </span>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect on GIS Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
