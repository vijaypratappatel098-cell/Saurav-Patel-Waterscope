import React, { useState } from 'react';
import {
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Info,
  ShieldAlert,
  Layers,
  ArrowRight,
  TrendingDown,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';
import { PROBLEM_HOTSPOTS, WATERSHED_CONFIG } from '../data/watershedData';
import { HotspotArea } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';

export const ProblemHotspotView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(PROBLEM_HOTSPOTS[0].id);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredHotspots = PROBLEM_HOTSPOTS.filter(
    (h) => priorityFilter === 'all' || h.priority === priorityFilter
  );

  const activeHotspot: HotspotArea =
    PROBLEM_HOTSPOTS.find((h) => h.id === selectedHotspotId) || PROBLEM_HOTSPOTS[0];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Analytical Spatial Diagnostics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Intelligent Problem Hotspot Map
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Spatial identification of high-runoff gullies, silt delta accumulation zones, and tail-end irrigation gaps derived from multi-criteria DEM and satellite indices.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5">
          {['all', 'High-priority observation area', 'Moderate observation area', 'Monitoring area'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                priorityFilter === p
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p === 'all' ? 'All Priority Zones' : p.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Hotspot Cards & Map (6 cols) + Detailed Diagnostic Flag Audit (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Hotspot List & Interactive Map (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-2.5">
            {filteredHotspots.map((hotspot) => {
              const isSelected = hotspot.id === selectedHotspotId;
              const isHigh = hotspot.priority === 'High-priority observation area';
              const isMod = hotspot.priority === 'Moderate observation area';

              return (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspotId(hotspot.id)}
                  className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{hotspot.id}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isHigh
                          ? 'bg-red-100 text-red-800'
                          : isMod
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {hotspot.priority}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{hotspot.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{hotspot.subWatershed}</p>
                  </div>
                  <div className="text-[11px] text-slate-600 line-clamp-1 italic">
                    Flag: {hotspot.category} · Confidence: {hotspot.confidenceScore}%
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Centered on Hotspot */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Hotspot Geographic Target Pinpoint
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                {activeHotspot.lat.toFixed(5)}°N, {activeHotspot.lng.toFixed(5)}°E
              </span>
            </div>

            <InteractiveMap height="360px" showSidebarControls={false} />
          </div>
        </div>

        {/* Right Column: Deep "WHY IS THIS AREA FLAGGED?" Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-400">{activeHotspot.id}</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    activeHotspot.priority === 'High-priority observation area'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {activeHotspot.priority}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-2">{activeHotspot.title}</h2>
              <p className="text-xs text-slate-500">{activeHotspot.subWatershed} · Category: {activeHotspot.category}</p>
            </div>

            {/* "WHY IS THIS AREA FLAGGED?" Section */}
            <div className="bg-amber-50/70 rounded-xl border border-amber-200 p-4 space-y-2">
              <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                WHY IS THIS AREA FLAGGED?
              </h3>
              <p className="text-xs text-amber-950 leading-relaxed font-sans">
                {activeHotspot.whyFlagged}
              </p>
            </div>

            {/* Triggering Criteria Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Triggering Diagnostic Criteria:</span>
                <span className="text-[10px] text-slate-400 font-mono">Confidence: {activeHotspot.confidenceScore}%</span>
              </div>
              <div className="space-y-1.5">
                {activeHotspot.triggeringCriteria.map((c) => (
                  <div
                    key={c.metric}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-700">{c.metric}</span>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-red-700 font-bold">Observed: {c.observed}</span>
                      <span className="text-slate-400 text-[10px]">({c.threshold})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Source & Instrument */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">
                Responsible Telemetry & Data Source
              </span>
              <p className="text-slate-800 font-medium">{activeHotspot.dataSource}</p>
            </div>

            {/* Recommended Targeted Action */}
            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Prescribed Non-Invasive Intervention Directive
              </span>
              <p className="text-emerald-950 leading-relaxed font-mono text-[11px]">
                {activeHotspot.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
