import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  Droplet,
  TreePine,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Info
} from 'lucide-react';
import { DATA_STORY_CHAPTERS, WATERSHED_CONFIG } from '../data/watershedData';
import { DataStoryChapter } from '../types/watershed';

export const WatershedDataStoryView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const currentChapter: DataStoryChapter = DATA_STORY_CHAPTERS[activeChapterIndex] || DATA_STORY_CHAPTERS[0];

  const stepsList = [
    { key: 'WHERE', label: '1. Where' },
    { key: 'WHAT', label: '2. What' },
    { key: 'BEFORE', label: '3. Before' },
    { key: 'CHANGE', label: '4. Change' },
    { key: 'NOW', label: '5. Now' },
    { key: 'EVIDENCE', label: '6. Evidence' }
  ];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Chronological Evidence Narrative</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Data Story
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A structured, evidence-based narrative converting multi-temporal remote sensing and RTK field telemetry into a 6-chapter spatial journey.
          </p>
        </div>

        {/* Navigation Step Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeChapterIndex === 0}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            title="Previous Chapter"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-700 px-2">
            Chapter {activeChapterIndex + 1} of {DATA_STORY_CHAPTERS.length}
          </span>
          <button
            onClick={() => setActiveChapterIndex((prev) => Math.min(DATA_STORY_CHAPTERS.length - 1, prev + 1))}
            disabled={activeChapterIndex === DATA_STORY_CHAPTERS.length - 1}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            title="Next Chapter"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6-Step Story Progress Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stepsList.map((step, idx) => {
            const isActive = activeChapterIndex === idx;
            const isCompleted = activeChapterIndex > idx;
            return (
              <button
                key={step.key}
                onClick={() => setActiveChapterIndex(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">
                  {step.key}
                </div>
                <div className="text-xs font-bold mt-0.5 truncate">{DATA_STORY_CHAPTERS[idx].title.split(':')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Display Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left Column: Visual Ground & Satellite Evidence Artifact (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
            <img
              src={currentChapter.imageUrl}
              alt={currentChapter.title}
              className="w-full h-full object-cover"
            />
            {/* Top Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-mono font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>CHAPTER: {currentChapter.step}</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-5 text-white space-y-1">
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{currentChapter.caption}</p>
              <div className="text-[10px] font-mono text-emerald-400">
                WGS84 Coordinates: {currentChapter.coordinates[0].toFixed(4)}°N, {currentChapter.coordinates[1].toFixed(4)}°E
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Empirical Supporting Evidence (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase">
                  Step {activeChapterIndex + 1} · {currentChapter.step}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2.5">
                  {currentChapter.title}
                </h2>
                <h3 className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                  {currentChapter.subtitle}
                </h3>
              </div>

              {/* Main Narrative Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {currentChapter.narrative}
              </p>

              {/* Structured Spatial Attributes Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {currentChapter.spatialData.map((d) => (
                  <div key={d.label} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">{d.label}</span>
                    <strong className="text-xs text-slate-900 font-mono mt-0.5 block">{d.value}</strong>
                  </div>
                ))}
              </div>

              {/* Evidence Points Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Corroborating Ground & Satellite Evidence Points:
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {currentChapter.evidencePoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-slate-50/70 rounded-lg border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span className="text-[11px] leading-relaxed font-mono">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Step Nav */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeChapterIndex === 0}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              {activeChapterIndex < DATA_STORY_CHAPTERS.length - 1 ? (
                <button
                  onClick={() => setActiveChapterIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <span>Next: {DATA_STORY_CHAPTERS[activeChapterIndex + 1].step}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate && onNavigate('dashboard')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <span>Explore on Full GIS Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
