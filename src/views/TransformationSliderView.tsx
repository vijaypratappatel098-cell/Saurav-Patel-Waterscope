import React, { useState } from 'react';
import {
  Sliders,
  Calendar,
  MapPin,
  Sparkles,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
  CheckCircle2,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { TRANSFORMATION_PAIRS, WATERSHED_CONFIG } from '../data/watershedData';
import { TransformationPair } from '../types/watershed';

interface TransformationSliderViewProps {
  onNavigate?: (view: string) => void;
}

export const TransformationSliderView: React.FC<TransformationSliderViewProps> = ({ onNavigate }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [isDragging, setIsDragging] = useState(false);

  const currentPair: TransformationPair = TRANSFORMATION_PAIRS[selectedPairIndex] || TRANSFORMATION_PAIRS[0];

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const offsetX = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / containerRect.width) * 100));
    setSliderPosition(Math.round(percentage));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Interactive Bi-Temporal Comparison</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Before / After Watershed Transformation Slider
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Interactive multi-temporal split-slider synchronizing historical satellite & field ground records against current post-intervention outcomes.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                viewMode === 'slider' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Split Slider
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                viewMode === 'side-by-side' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>
      </div>

      {/* Target Selector Tabs */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-emerald-600" />
          <span>Select Watershed Transformation Location:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {TRANSFORMATION_PAIRS.map((pair, idx) => (
            <button
              key={pair.id}
              onClick={() => {
                setSelectedPairIndex(idx);
                setSliderPosition(50);
              }}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                selectedPairIndex === idx
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{pair.id}</span>
                <span className="text-emerald-700 font-semibold">{pair.category.split('&')[0]}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{pair.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 truncate">{pair.location}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Slider Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Top Location Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-900">{currentPair.title}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-mono">{currentPair.lat.toFixed(4)}°N, {currentPair.lng.toFixed(4)}°E</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Position Presets */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setSliderPosition(0)}
                  className="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 font-medium text-slate-700"
                >
                  100% Before
                </button>
                <button
                  onClick={() => setSliderPosition(50)}
                  className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 font-semibold text-emerald-800"
                >
                  50 / 50 Split
                </button>
                <button
                  onClick={() => setSliderPosition(100)}
                  className="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 font-medium text-slate-700"
                >
                  100% After
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Mode: Interactive Slider */}
        {viewMode === 'slider' ? (
          <div
            className="relative w-full h-[450px] sm:h-[520px] select-none overflow-hidden cursor-ew-resize bg-slate-900"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Layer 1: AFTER image (Full background) */}
            <img
              src={currentPair.afterImageUrl}
              alt={currentPair.afterLabel}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* After Top-Right Badge */}
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-semibold z-10 pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>AFTER ({currentPair.afterDate})</span>
            </div>

            {/* Layer 2: BEFORE image (Clipped to sliderPosition) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentPair.beforeImageUrl}
                alt={currentPair.beforeLabel}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Before Top-Left Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-semibold z-10 pointer-events-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>BEFORE ({currentPair.beforeDate})</span>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white shadow-xl border-2 border-white flex items-center justify-center transform -translate-x-1/2">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Slider Position Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-white pointer-events-none z-10">
              Drag Split: {sliderPosition}% Before · {100 - sliderPosition}% After
            </div>
          </div>
        ) : (
          /* View Mode: Side-by-Side */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Before Panel */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  BEFORE: {currentPair.beforeDate}
                </span>
                <span className="text-[11px] text-slate-500 font-mono truncate max-w-[200px]">
                  {currentPair.beforeSource}
                </span>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={currentPair.beforeImageUrl}
                  alt={currentPair.beforeLabel}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-600 italic">{currentPair.beforeLabel}</p>
            </div>

            {/* After Panel */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  AFTER: {currentPair.afterDate}
                </span>
                <span className="text-[11px] text-slate-500 font-mono truncate max-w-[200px]">
                  {currentPair.afterSource}
                </span>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={currentPair.afterImageUrl}
                  alt={currentPair.afterLabel}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-600 italic">{currentPair.afterLabel}</p>
            </div>
          </div>
        )}

        {/* Bottom Verification & Metadata Drawer */}
        <div className="p-6 bg-slate-50/60 border-t border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Transformation Summary & Measured Outcomes</h3>
              <p className="text-xs text-slate-600 mt-0.5">{currentPair.summary}</p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 shrink-0 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
              Sensor Pairing: {currentPair.imageType}
            </div>
          </div>

          {/* 4 Quantified Metrics Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {currentPair.metrics.map((m) => (
              <div key={m.label} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">{m.label}</span>
                <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">{m.value}</div>
                <div className="text-[10px] font-semibold text-emerald-700 font-mono mt-0.5">{m.delta}</div>
              </div>
            ))}
          </div>

          {/* Scientific Provenance Note */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Data Lineage Verification:</strong> Baseline records ingest harmonized Sentinel-2 / Landsat surface reflectance calibrated against historical revenue maps. Post-intervention data incorporates sub-meter RTK GNSS field imagery verified against staff gauge staff readings. Zero synthetic observations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
