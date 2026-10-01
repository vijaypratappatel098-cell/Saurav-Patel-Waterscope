import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Layers,
  MapPin,
  Camera,
  Droplet,
  TreePine,
  ShieldCheck,
  TrendingUp,
  Activity,
  FileCheck,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Eye,
  AlertCircle
} from 'lucide-react';
import {
  WATERSHED_CONFIG,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS,
  SUB_WATERSHEDS
} from '../data/watershedData';
import { GeoCodedImage } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';
import satelliteHeroImg from '../assets/images/satellite_watershed_view_1790767296071.jpg';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectImage: (image: GeoCodedImage) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectImage }) => {
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  const processStages = [
    {
      title: 'Geo-Coded Images',
      icon: Camera,
      color: '#16A34A',
      desc: 'Mobile ground truthing photos with RTK coordinates, camera azimuth & field checklists.'
    },
    {
      title: 'Satellite Data',
      icon: Sparkles,
      color: '#0284C7',
      desc: 'Ingestion of multi-spectral Sentinel-2, Landsat-9 & SRISHTI-DRISHTI imagery.'
    },
    {
      title: 'GIS Integration',
      icon: Layers,
      color: '#7C3AED',
      desc: 'DEM hydro-enforced drainage, Strahler stream network & catchment boundary vectorization.'
    },
    {
      title: 'Spatial Analysis',
      icon: Activity,
      color: '#EA580C',
      desc: 'Spectral fusion cross-referencing field photo observations against pixel signatures.'
    },
    {
      title: 'Thematic Mapping',
      icon: MapPin,
      color: '#059669',
      desc: 'Automated generation of LULC, NDVI vegetation vigor, slope and water spread layers.'
    },
    {
      title: 'Change Detection',
      icon: TrendingUp,
      color: '#9333EA',
      desc: 'Bi-temporal comparison (2022 vs 2026) quantifying water body and cropping gains.'
    },
    {
      title: 'Watershed Insights',
      icon: FileCheck,
      color: '#D97706',
      desc: 'Diagnostic assessment cards identifying siltation risk and high-drainage hotspots.'
    },
    {
      title: 'Decision Support',
      icon: ShieldCheck,
      color: '#2563EB',
      desc: 'Prioritized civil & biological intervention planning for village watershed committees.'
    }
  ];

  const problemCards = [
    {
      id: 1,
      title: 'Manual Field Surveys',
      desc: 'Traditional surveys rely on paper logs and scattered mobile photos without verified spatial metadata or systematic cataloging.',
      icon: Camera,
      badge: 'Time-Intensive'
    },
    {
      id: 2,
      title: 'Limited Spatial Coverage',
      desc: 'Field teams can only visit accessible road points, leaving rugged ridge tops and interior gullies unmonitored.',
      icon: MapPin,
      badge: 'Spatial Blindspots'
    },
    {
      id: 3,
      title: 'Fragmented Monitoring',
      desc: 'Hydrology, soil conservation, and forestry datasets reside in disconnected silos with no unified GIS reference.',
      icon: Layers,
      badge: 'Data Disconnect'
    },
    {
      id: 4,
      title: 'Difficult Change Detection',
      desc: 'Without calibrated multi-temporal satellite rasters, proving long-term water table or vegetation recovery is subjective.',
      icon: TrendingUp,
      badge: 'Unverified Impact'
    },
    {
      id: 5,
      title: 'Under-utilized Geo-Coded Images',
      desc: 'Thousands of photos taken during field inspections are never mapped or cross-referenced with satellite pixels.',
      icon: Eye,
      badge: 'Lost Ground Truth'
    },
    {
      id: 6,
      title: 'Lack of Integrated Analysis',
      desc: 'Decision-makers lack spatial decision models to prioritize whether a gully needs a masonry dam or contour trenches.',
      icon: BarChart3,
      badge: 'Sub-Optimal ROI'
    }
  ];

  return (
    <div className="w-full space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-8 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>GIS & Remote Sensing Platform</span>
                <span className="text-emerald-500">·</span>
                <span className="font-mono">{WATERSHED_CONFIG.state}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                Transforming Geo-Coded Images into <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-8">Watershed Intelligence</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                An integrated GIS and Remote Sensing platform for visualization, interpretation and scientific assessment of watershed development outcomes.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Open GIS Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="flex items-center gap-2 px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-xl border border-emerald-200 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Intelligence Suite</span>
                </button>
                <button
                  onClick={() => onNavigate('geo-images')}
                  className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Explore Geo-Images</span>
                </button>
              </div>

              {/* Key Indicators Bar */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-800 tabular-nums">
                    4,850 <span className="text-xs font-normal text-slate-500">Ha</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Watershed Area</div>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black font-mono text-sky-800 tabular-nums">
                    +47.1%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Vegetation Biomass</div>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-800 tabular-nums">
                    128.5 <span className="text-xs font-normal text-slate-500">ML</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Water Storage</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Map Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900">
                {/* Visual Map Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-white text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold">{WATERSHED_CONFIG.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">10m Sentinel-2 / DEM Overlay</span>
                </div>

                {/* Map Component */}
                <InteractiveMap height="440px" showSidebarControls={false} />

                {/* Floating Metric Callouts */}
                <div className="absolute bottom-4 left-4 right-4 z-[1000] flex items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700 text-white text-xs">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold">{GEO_CODED_IMAGES.length} Ground Points</span>
                      <span className="text-slate-400 text-[10px] block">RTK Geocoded</span>
                    </div>
                  </div>
                  <div className="h-6 w-px bg-slate-700"></div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                    <div>
                      <span className="font-bold">{WATERSHED_INTERVENTIONS.length} Interventions</span>
                      <span className="text-slate-400 text-[10px] block">Dams & Trenches</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Watershed Monitoring Bottleneck</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Why Watershed Monitoring Needs Geospatial Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Conventional watershed evaluations struggle with inaccessible topography, delayed feedback, and lack of ground truth validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SOLUTION SECTION: OUR GEOSPATIAL APPROACH */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scientific Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Our Geospatial Approach
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              A closed-loop workflow connecting field reality with satellite remote sensing and evidence-based decision models.
            </p>
          </div>

          {/* Interactive Process Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {processStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeProcessStep === idx;
              return (
                <button
                  key={stage.title}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                    <Icon className="w-4 h-4" style={{ color: stage.color }} />
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{stage.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Explanation Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: processStages[activeProcessStep].color }}
                >
                  {React.createElement(processStages[activeProcessStep].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Stage 0{activeProcessStep + 1} of 08
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{processStages[activeProcessStep].title}</h3>
                </div>
              </div>

              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Full Methodology Diagram</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Process Mechanism</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {processStages[activeProcessStep].desc}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Outcome Impact: </span>
                  Ensures sub-meter ground precision is matched against 10m Sentinel-2 bands, eliminating false positives in water storage or biomass reporting.
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Connected System Tool</h4>
                <button
                  onClick={() => {
                    const targets = ['geo-images', 'thematic-maps', 'watershed-analysis', 'comparison', 'thematic-maps', 'change-detection', 'insights', 'interventions'];
                    onNavigate(targets[activeProcessStep] || 'dashboard');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-emerald-900 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Launch {processStages[activeProcessStep].title} Module</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GEO-CODED GROUND TRUTH SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Ground Truthing Stream</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Recent Geo-Coded Field Inspections
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Field observations captured with sub-meter GNSS coordinates and verified against satellite observations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('geo-images')}
            className="flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 pb-1"
          >
            <span>View All {GEO_CODED_IMAGES.length} Images</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GEO_CODED_IMAGES.slice(0, 3).map((img) => (
            <div
              key={img.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 overflow-hidden transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold text-emerald-400 border border-white/20">
                  {img.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                  Match: {img.satelliteMatchScore}%
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-slate-400 font-mono mb-1">{img.id} · {img.date}</div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {img.observation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {img.lat.toFixed(4)}°N, {img.lng.toFixed(4)}°E
                  </span>
                  <button
                    onClick={() => onSelectImage(img)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUICK NAVIGATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to explore scientific watershed spatial layers?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Analyze multi-temporal change detection, inspect Strahler stream order networks, review check dam impact radii, and generate decision cards.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-5 py-3 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-colors"
              >
                Launch GIS Dashboard
              </button>
              <button
                onClick={() => onNavigate('thematic-maps')}
                className="px-5 py-3 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl border border-emerald-500/50 transition-colors"
              >
                Browse 10 Thematic Maps
              </button>
              <button
                onClick={() => onNavigate('change-detection')}
                className="px-5 py-3 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl border border-emerald-500/50 transition-colors"
              >
                2022 vs 2026 Change Slider
              </button>
              <button
                onClick={() => onNavigate('intelligence')}
                className="px-5 py-3 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl border border-emerald-400/60 transition-colors flex items-center gap-1.5"
              >
                <span>Intelligence Suite (12 Tools)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
