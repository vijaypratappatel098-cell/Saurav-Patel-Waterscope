import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Sparkles,
  TreePine,
  Droplet,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { CONDITION_SCORE_COMPONENTS, WATERSHED_CONFIG } from '../data/watershedData';
import { ConditionScoreComponent } from '../types/watershed';

export const ConditionScoreView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [expandedWhyScore, setExpandedWhyScore] = useState(true);
  const [selectedComponentId, setSelectedComponentId] = useState<string>(CONDITION_SCORE_COMPONENTS[0].id);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Compute weighted composite score dynamically
  const totalWeight = CONDITION_SCORE_COMPONENTS.reduce((acc, c) => acc + c.weightPct, 0);
  const compositeScore = Math.round(
    CONDITION_SCORE_COMPONENTS.reduce((acc, c) => acc + (c.score * c.weightPct) / 100, 0)
  );

  const filteredComponents = CONDITION_SCORE_COMPONENTS.filter(
    (c) => filterStatus === 'all' || c.status === filterStatus
  );

  const activeComponent =
    CONDITION_SCORE_COMPONENTS.find((c) => c.id === selectedComponentId) || CONDITION_SCORE_COMPONENTS[0];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Multi-Criteria Scientific Assessment</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Explainable Watershed Condition Score
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A transparent, audit-ready diagnostic score breaking down vegetative recovery, impounded storage volume, gully erosion arrest, and intervention equity.
          </p>
        </div>

        {/* Regulatory Classification Badge */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2 max-w-sm">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Analytical Indicator:</strong> Derived via Analytical Hierarchy Process (AHP); not an official statutory rating.
          </span>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-700">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Score Dial Gauge & State */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Watershed Health Composite
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white">
                {compositeScore}
              </span>
              <span className="text-2xl font-mono text-slate-400 font-bold">/ 100</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Good Hydrological & Ecological Recovery Tier</span>
            </div>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Derived from 6 distinct remote sensing indices, 32 ground monitoring wells, and sub-meter RTK field audits.
            </p>
          </div>

          {/* Right: 6 Mini Weighted Bars */}
          <div className="lg:col-span-8 space-y-3 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Transparent Component Contributions</span>
              <span className="text-[10px] text-emerald-400 font-mono">Sum: 100% Weight</span>
            </div>
            <div className="space-y-2.5">
              {CONDITION_SCORE_COMPONENTS.map((comp) => (
                <div key={comp.id} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="font-medium truncate max-w-[280px]">
                      {comp.title} ({comp.weightPct}%)
                    </span>
                    <span className="font-mono font-bold text-white">
                      {comp.score} / 100 · <span className="text-emerald-400 font-normal">{(comp.score * comp.weightPct / 100).toFixed(1)} pts</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        comp.score >= 80 ? 'bg-emerald-400' : comp.score >= 70 ? 'bg-sky-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDABLE SECTION: "WHY THIS SCORE?" */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setExpandedWhyScore(!expandedWhyScore)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 cursor-pointer border-b border-slate-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ?
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                WHY THIS SCORE? — COMPLETE TRANSPARENT DECONSTRUCTION
              </h2>
              <p className="text-xs text-slate-500">
                Click to explore mathematical logic, data sources, time periods, and sensor measurements.
              </p>
            </div>
          </div>
          {expandedWhyScore ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedWhyScore && (
          <div className="p-6 space-y-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs font-bold text-slate-700 mr-2">Filter Sub-Components:</span>
              {['all', 'Optimal', 'Good', 'Moderate'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All 6 Components' : st}
                </button>
              ))}
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents.map((comp) => {
                const isSelected = comp.id === selectedComponentId;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          Weight: {comp.weightPct}%
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            comp.status === 'Optimal'
                              ? 'bg-emerald-100 text-emerald-800'
                              : comp.status === 'Good'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {comp.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">{comp.title}</h4>
                      <div className="text-lg font-mono font-black text-slate-900 mt-1">
                        {comp.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Observed Metric</span>
                        <strong className="text-slate-800 text-[11px]">{comp.observedValue}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Data Source</span>
                        <span className="text-slate-600 text-[11px] truncate block">{comp.dataSource}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deep-Dive Inspection Pane for Active Component */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Detailed Methodology Audit: {activeComponent.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2.5 py-1 rounded border border-slate-200">
                  Calculated Score: {activeComponent.score} / 100 (Weight: {activeComponent.weightPct}%)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Primary Data Source & Instrument
                  </span>
                  <p className="font-semibold text-slate-900">{activeComponent.dataSource}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Observation Epoch & Time Period
                  </span>
                  <p className="font-semibold text-slate-900">{activeComponent.timePeriod}</p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  Calculation Algorithm & Logic
                </span>
                <p className="text-slate-800 leading-relaxed font-mono text-[11px]">
                  {activeComponent.calculationLogic}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Ground Truth Corroboration
                </span>
                <p className="text-emerald-950 leading-relaxed">{activeComponent.keyObservation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
