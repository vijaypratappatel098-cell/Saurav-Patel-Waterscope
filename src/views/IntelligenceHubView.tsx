import React from 'react';
import {
  Compass,
  ArrowRight,
  Sliders,
  Camera,
  Bot,
  Activity,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Layers,
  FileCheck,
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { WATERSHED_CONFIG } from '../data/watershedData';

interface IntelligenceHubViewProps {
  onNavigate: (view: string) => void;
}

export const IntelligenceHubView: React.FC<IntelligenceHubViewProps> = ({ onNavigate }) => {
  const tools = [
    {
      id: 'transformation-slider',
      featureNumber: 'FEATURE 1',
      title: 'Before / After Watershed Transformation Slider',
      description: 'Interactive split-handle slider synchronizing historical satellite & field ground records against current post-intervention outcomes.',
      icon: Sliders,
      category: 'Comparative Vision',
      badge: 'Interactive Slider',
      color: '#059669'
    },
    {
      id: 'photo-map-story',
      featureNumber: 'FEATURE 2',
      title: 'Geo-Coded Photo → Map Story',
      description: 'Trace ground truth mobile photographs through exact coordinates, satellite footprint, drainage, vegetation, water bodies, and civil structures.',
      icon: Camera,
      category: 'Spatial Context',
      badge: 'Multi-Tier Lineage',
      color: '#0284C7'
    },
    {
      id: 'ask-watershed',
      featureNumber: 'FEATURE 3',
      title: '“Ask the Watershed” AI Assistant',
      description: 'Evidence-grounded conversational spatial assistant distinguishing observed data, derived analysis, and possible interpretation with zero hallucination.',
      icon: Bot,
      category: 'AI Assistant',
      badge: 'Gemini 3.8 Flash',
      color: '#7C3AED'
    },
    {
      id: 'condition-score',
      featureNumber: 'FEATURE 4',
      title: 'Explainable Watershed Condition Score',
      description: 'Composite 74/100 scientific health index with an expandable “WHY THIS SCORE?” deconstruction across 6 transparent components.',
      icon: Activity,
      category: 'Diagnostic Index',
      badge: '74 / 100 AHP',
      color: '#10B981'
    },
    {
      id: 'what-changed',
      featureNumber: 'FEATURE 5',
      title: '“What Changed Here?” Tool',
      description: 'Select any micro-catchment area and time horizons to run an automated Before → Change → After pixel differential comparison.',
      icon: TrendingUp,
      category: 'Change Analytics',
      badge: 'Bi-Temporal Delta',
      color: '#9333EA'
    },
    {
      id: 'impact-explorer',
      featureNumber: 'FEATURE 6',
      title: 'Watershed Intervention Impact Explorer',
      description: 'Audit check dams, farm ponds, percolation tanks, and contour bunds with linked geo-photos, satellite halos, and farmer beneficiary metrics.',
      icon: ShieldCheck,
      category: 'Civil Infrastructure',
      badge: 'Structure Registry',
      color: '#EA580C'
    },
    {
      id: 'hotspots',
      featureNumber: 'FEATURE 7',
      title: 'Intelligent Problem Hotspot Map',
      description: 'Analytical spatial identification of gully erosion incision, reservoir silt deltas, and marginal farmer irrigation gaps with “WHY IS THIS FLAGGED?”.',
      icon: AlertTriangle,
      category: 'Spatial Diagnostics',
      badge: 'Priority Hotspots',
      color: '#D97706'
    },
    {
      id: 'layer-mixer',
      featureNumber: 'FEATURE 8',
      title: 'Advanced GIS Layer Mixer',
      description: 'Full opacity blending, visibility toggling, and vertical stack reordering across 10 specialized cartographic layers.',
      icon: Layers,
      category: 'Cartography',
      badge: 'Layer Mixer',
      color: '#0284C7'
    },
    {
      id: 'image-validation',
      featureNumber: 'FEATURE 9',
      title: 'Geo-Coded Image Validation Tool',
      description: 'Automated quality assurance checking GPS coordinates against watershed boundaries, azimuth, elevation, and sub-meter HDOP precision.',
      icon: FileCheck,
      category: 'Quality Assurance',
      badge: 'Zero-Tamper QA',
      color: '#059669'
    },
    {
      id: 'report-generator',
      featureNumber: 'FEATURE 10',
      title: 'Automatic Watershed Report Generator',
      description: 'Compile a structured, 16-section scientific watershed assessment report with print-ready PDF formatting and machine-readable JSON exports.',
      icon: FileText,
      category: 'Reporting & Policy',
      badge: '16 Sections Ready',
      color: '#2563EB'
    },
    {
      id: 'digital-twin',
      featureNumber: 'FEATURE 11',
      title: 'Digital Watershed Twin',
      description: 'Interactive interconnected network model tracing hydrological flow and socio-economic dependencies from ridge trenches to valley farms.',
      icon: Sparkles,
      category: 'Cyber-Physical Model',
      badge: 'System Topology',
      color: '#059669'
    },
    {
      id: 'data-story',
      featureNumber: 'FEATURE 12',
      title: 'Intelligent Data Story (WHERE → EVIDENCE)',
      description: 'Chronological spatial journey through 6 evidence-based chapters: WHERE, WHAT, BEFORE, CHANGE, NOW, and EVIDENCE.',
      icon: BookOpen,
      category: 'Narrative Telemetry',
      badge: '6-Chapter Story',
      color: '#7C3AED'
    }
  ];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-12 text-white border border-slate-700 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Watershed Intelligence & Decision Support Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Geo-Coded Images → Satellite Data → GIS Analysis → Watershed Intelligence
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to the advanced intelligence system built on top of Waterscope. Seamlessly explore multi-temporal transformation sliders, trace geo-coded photo map stories, assess explainable condition scores, query the evidence-based AI assistant, and export comprehensive watershed reports.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Open Interactive GIS Canvas
            </button>
            <button
              onClick={() => onNavigate('transformation-slider')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Try Transformation Slider
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 12 Intelligence Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">All 12 Watershed Intelligence Modules</h2>
            <p className="text-xs text-slate-500">Inheriting the existing platform's design system with zero unrelated changes.</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            12 of 12 Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => onNavigate(t.id)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: t.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {t.featureNumber}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                    {t.category}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                    {t.badge}
                  </span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
