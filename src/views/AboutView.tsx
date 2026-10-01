import React, { useState } from 'react';
import {
  Info,
  Compass,
  CheckCircle2,
  Workflow,
  Sparkles,
  Layers,
  ArrowRight,
  Target,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Code2,
  Award
} from 'lucide-react';
import { METHODOLOGY_STAGES } from '../data/watershedData';
import { MethodologyStage } from '../types/watershed';

export const AboutView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedStage, setSelectedStage] = useState<MethodologyStage>(METHODOLOGY_STAGES[0]);

  return (
    <div className="w-full space-y-12 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Research & Institutional Framework</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            About WATERSCOPE & Scientific Methodology
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A research and governance-grade geospatial intelligence platform designed for the Smart India Hackathon and national watershed development monitoring.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          Launch GIS Dashboard
        </button>
      </div>

      {/* 1. Problem Statement & Background */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4" />
            Problem Statement
          </div>
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            “Application of Geospatial Techniques for Visualization and Analysis to Interpret Geo-Coded Images to Enhance Watershed Development Outcomes.”
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Watershed management programs invest billions in water conservation structures (check dams, farm ponds, contour bunds). However, evaluating their actual field functionality, silting status, and vegetation recovery at scale has historically relied on sporadic, manual field audits with severe spatial blindspots.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
            <Rocket className="w-4 h-4" />
            Core Objectives
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Bridge mobile geo-tagged field inspection photographs directly with 10m Sentinel-2 remote sensing pixels.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Automate morphometric catchment delineation, stream order classification, and slope runoff hazard mapping.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provide bi-temporal change detection (2022 vs 2026) demonstrating tangible water storage expansion (+121%) and erosion reduction (-57%).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Generate prescriptive spatial decision cards to guide village watershed committees on desilting and gully plugging.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. INTERACTIVE 10-STAGE METHODOLOGY PIPELINE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Workflow className="w-4 h-4" />
            10-Stage Scientific Methodology
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Interactive Geospatial Workflow Architecture
          </h2>
          <p className="text-xs text-slate-500">
            Click on any pipeline stage below to inspect its mathematical formulation, input data layers, and output artifacts.
          </p>
        </div>

        {/* Clickable Stages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {METHODOLOGY_STAGES.map((st) => {
            const isSelected = selectedStage.id === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStage(st)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800">
                    Step {st.id < 10 ? `0${st.id}` : st.id}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{st.title}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{st.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Selected Stage View */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                Stage {selectedStage.id}: {selectedStage.subtitle}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{selectedStage.title}</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">Methodology Spec</span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {selectedStage.fullExplanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono uppercase mb-1">
                Input Geospatial Layers
              </span>
              <strong className="text-slate-800">{selectedStage.inputData}</strong>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono uppercase mb-1">
                Output Scientific Artifact
              </span>
              <strong className="text-emerald-800">{selectedStage.outputArtifact}</strong>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block font-mono uppercase mb-1">
                Enabling Algorithms & Tech
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedStage.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 rounded text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Expected Outcomes & Technology Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Expected Governance Outcomes
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700 shrink-0">1.</span>
              <span><strong>Cost-Effective Monitoring:</strong> Reduces field inspection logistics expenditure by 65% through targeted ground truthing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700 shrink-0">2.</span>
              <span><strong>Auditable Transparency:</strong> Geo-tagged photographs with verifiable EXIF coordinates provide undeniable evidence of civil works completion.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700 shrink-0">3.</span>
              <span><strong>Scientific Siting:</strong> DEM drainage models ensure new check dams are positioned strictly on high-yield stream orders rather than arbitrary locations.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            Core Technology Stack
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">Frontend Platform</span>
              <strong className="text-slate-800">React 19 + TypeScript + Vite</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">WebGIS Mapping</span>
              <strong className="text-slate-800">Leaflet 1.9 + GeoJSON</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">Styling & UI</span>
              <strong className="text-slate-800">Tailwind CSS 4.0</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">Spatial Projection</span>
              <strong className="text-slate-800">WGS84 / EPSG:4326 / UTM 43N</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
