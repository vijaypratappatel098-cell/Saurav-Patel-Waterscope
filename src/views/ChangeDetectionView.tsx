import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Layers,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Droplet,
  TreePine,
  ShieldCheck,
  Activity,
  CheckCircle2
} from 'lucide-react';
import {
  SPATIAL_CHANGES,
  NDVI_TREND_DATA,
  WATER_STORAGE_TREND_DATA,
  WATERSHED_CONFIG
} from '../data/watershedData';
import satelliteImg from '../assets/images/satellite_watershed_view_1790767296071.jpg';
import farmPondImg from '../assets/images/geocoded_farm_pond_1790767270216.jpg';

export const ChangeDetectionView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [timelineYear, setTimelineYear] = useState<number>(2026);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Vegetation', 'Water', 'Agriculture', 'Soil Conservation'];

  const filteredChanges = SPATIAL_CHANGES.filter(
    (c) => selectedCategory === 'all' || c.category === selectedCategory
  );

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Multi-Temporal Trajectory Analysis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Change Detection (2022 vs 2026)
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Pixel-level differential matrix analyzing bi-temporal transitions in photosynthetic biomass, open water bodies, groundwater elevation, and soil erosion.
          </p>
        </div>

        {/* Timeline Slider Badge & Tool Navigation */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onNavigate && (
            <button
              onClick={() => onNavigate('what-changed')}
              className="px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>“What Changed Here?” Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Calendar className="w-4 h-4 text-purple-600" />
            <div>
              <div className="text-[10px] text-slate-400 font-mono">TIMELINE EPOCH</div>
              <div className="text-sm font-bold font-mono text-purple-900">
                {timelineYear === 2022 ? 'Baseline 2022' : timelineYear === 2024 ? 'Mid-Term 2024' : 'Current 2026 (Post-Phase 3)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Scrubbing Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>2022 (Pre-Intervention Baseline)</span>
          <span>2024 (Phase 1 & 2 Completed)</span>
          <span className="text-purple-700 font-extrabold">2026 (Present Day Evaluation)</span>
        </div>

        <input
          type="range"
          min="2022"
          max="2026"
          step="2"
          value={timelineYear}
          onChange={(e) => setTimelineYear(Number(e.target.value))}
          className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
          <span>Pre-treatment water table: 11.8m</span>
          <span>Check Dam CD-01 built (2023)</span>
          <span className="text-emerald-700 font-semibold">+47.1% Net Vegetative Gain</span>
        </div>
      </div>

      {/* Side-by-Side Bi-Temporal Visual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baseline 2022 Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <h3 className="text-xs font-bold text-slate-800">2022 Baseline Satellite Perspective</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Sentinel-2 (Jan 2022)</span>
          </div>

          <div className="relative h-64 overflow-hidden bg-slate-900">
            <img
              src={satelliteImg}
              alt="2022 baseline"
              className="w-full h-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply"></div>
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg text-white text-xs font-mono">
              Water Spread: 142 Ha · Double Crop: 1,150 Ha
            </div>
          </div>

          <div className="p-4 text-xs text-slate-600 space-y-1.5 bg-slate-50/50">
            <div className="flex justify-between">
              <span>Mean Watershed NDVI:</span>
              <strong className="text-slate-800 font-mono">0.24 (Sparse Vegetation)</strong>
            </div>
            <div className="flex justify-between">
              <span>Erosion Delivery:</span>
              <strong className="text-red-700 font-mono">18.4 tonnes/Ha/yr</strong>
            </div>
            <div className="flex justify-between">
              <span>Barren Wasteland:</span>
              <strong className="text-slate-800 font-mono">1,045 Hectares</strong>
            </div>
          </div>
        </div>

        {/* Current 2026 Card */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500 overflow-hidden shadow-md">
          <div className="p-4 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-emerald-950">2026 Current State Post-Interventions</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold">Sentinel-2 (Jan 2026)</span>
          </div>

          <div className="relative h-64 overflow-hidden bg-slate-900">
            <img
              src={satelliteImg}
              alt="2026 current"
              className="w-full h-full object-cover saturate-150 contrast-110"
            />
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg text-white text-xs font-mono">
              Water Spread: 315 Ha (+121%) · Double Crop: 1,890 Ha (+64%)
            </div>
          </div>

          <div className="p-4 text-xs text-slate-600 space-y-1.5 bg-emerald-50/30">
            <div className="flex justify-between">
              <span>Mean Watershed NDVI:</span>
              <strong className="text-emerald-800 font-mono">0.54 (+125% Chlorophyll Boost)</strong>
            </div>
            <div className="flex justify-between">
              <span>Erosion Delivery:</span>
              <strong className="text-emerald-700 font-mono">7.9 tonnes/Ha/yr (-57%)</strong>
            </div>
            <div className="flex justify-between">
              <span>Barren Wasteland Reclaimed:</span>
              <strong className="text-emerald-800 font-mono">335 Ha Afforested</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Detected Spatial Changes Table & Trend Indicators */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Detected Spatial Changes Matrix</h3>
            <p className="text-xs text-slate-500">
              Harmonized Sentinel-2 & Ground-Verified Multi-Temporal Indicators.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Metrics' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChanges.map((chg) => (
            <div
              key={chg.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">{chg.id}</span>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                      chg.changePct > 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {chg.changePct > 0 ? `+${chg.changePct}%` : `${chg.changePct}%`}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{chg.parameter}</h4>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  2022: <span className="font-semibold text-slate-700">{chg.year2022}</span> → 2026:{' '}
                  <span className="font-semibold text-emerald-800">{chg.year2026}</span> {chg.unit}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed italic">
                {chg.interpretation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal NDVI Trend Curve Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Seasonal NDVI Vegetative Curve (2022 Baseline vs 2026 Rejuvenation)
            </h3>
            <p className="text-xs text-slate-500">
              Demonstrates extension of photosynthetic green canopy well into the Rabi dry winter season.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-0.5 bg-slate-400"></span> 2022 Baseline
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-3 h-1 bg-emerald-600 rounded"></span> 2026 Current
            </span>
          </div>
        </div>

        {/* Clean Responsive SVG Chart */}
        <div className="h-64 w-full">
          <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 0.2, 0.4, 0.6, 0.8].map((val, idx) => {
              const y = 200 - val * 220;
              return (
                <g key={val}>
                  <line x1="50" y1={y} x2="780" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
                  <text x="40" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                    {val.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* Baseline 2022 Line (Dashed) */}
            <polyline
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeDasharray="4,4"
              points={NDVI_TREND_DATA.map((d, i) => {
                const x = 70 + i * (710 / (NDVI_TREND_DATA.length - 1));
                const y = 200 - d.baseline2022 * 220;
                return `${x},${y}`;
              }).join(' ')}
            />

            {/* 2026 Current Line (Bold Emerald) */}
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={NDVI_TREND_DATA.map((d, i) => {
                const x = 70 + i * (710 / (NDVI_TREND_DATA.length - 1));
                const y = 200 - d.current2026 * 220;
                return `${x},${y}`;
              }).join(' ')}
            />

            {/* Data Points */}
            {NDVI_TREND_DATA.map((d, i) => {
              const x = 70 + i * (710 / (NDVI_TREND_DATA.length - 1));
              const yCurrent = 200 - d.current2026 * 220;
              const yBase = 200 - d.baseline2022 * 220;
              return (
                <g key={d.month}>
                  <circle cx={x} cy={yBase} r="3" fill="#64748b" />
                  <circle cx={x} cy={yCurrent} r="4.5" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                  <text
                    x={x}
                    y="225"
                    textAnchor="middle"
                    className="text-[9px] fill-slate-500 font-mono font-medium"
                  >
                    {d.month.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
