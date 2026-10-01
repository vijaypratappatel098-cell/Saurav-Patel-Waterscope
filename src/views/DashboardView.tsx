import React, { useState } from 'react';
import {
  Layers,
  MapPin,
  Camera,
  Droplet,
  TreePine,
  ShieldCheck,
  TrendingUp,
  Filter,
  Maximize2,
  Download,
  Info,
  ExternalLink,
  ChevronRight,
  Eye,
  Activity,
  Calendar,
  Compass,
  Sparkles
} from 'lucide-react';
import {
  WATERSHED_CONFIG,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS,
  SUB_WATERSHEDS,
  WATER_BODIES,
  LULC_DATA,
  THEMATIC_LAYERS
} from '../data/watershedData';
import { GeoCodedImage, WatershedIntervention, SubWatershed } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';

interface DashboardViewProps {
  onSelectImage: (image: GeoCodedImage) => void;
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectImage, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<GeoCodedImage | null>(GEO_CODED_IMAGES[0]);
  const [selectedIntervention, setSelectedIntervention] = useState<WatershedIntervention | null>(null);
  const [selectedSubWatershed, setSelectedSubWatershed] = useState<SubWatershed | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [rightPanelTab, setRightPanelTab] = useState<'feature' | 'analytics' | 'layers'>('feature');

  // Top KPI metrics
  const topMetrics = [
    {
      label: 'Watershed Area',
      value: '4,850 Ha',
      sub: 'Micro-Catchment #4B1A2',
      color: 'emerald',
      icon: MapPin
    },
    {
      label: 'Geo-Coded Images',
      value: `${GEO_CODED_IMAGES.length} Pts`,
      sub: 'Sub-meter RTK surveyed',
      color: 'teal',
      icon: Camera
    },
    {
      label: 'Water Bodies',
      value: '23 Units',
      sub: '128.5 ML Impounded',
      color: 'sky',
      icon: Droplet
    },
    {
      label: 'Vegetation Coverage',
      value: '2,530 Ha',
      sub: '+47.1% since 2022',
      color: 'emerald',
      icon: TreePine
    },
    {
      label: 'Intervention Count',
      value: `${WATERSHED_INTERVENTIONS.length} Structures`,
      sub: 'Dams, Ponds, Bunds',
      color: 'amber',
      icon: ShieldCheck
    },
    {
      label: 'Change Detected',
      value: '+28.4%',
      sub: 'Net Biomass Growth',
      color: 'purple',
      icon: TrendingUp
    }
  ];

  const handleMapSelectImage = (img: GeoCodedImage) => {
    setSelectedImage(img);
    setSelectedIntervention(null);
    setSelectedSubWatershed(null);
    setRightPanelTab('feature');
  };

  const handleMapSelectIntervention = (itv: WatershedIntervention) => {
    setSelectedIntervention(itv);
    setSelectedImage(null);
    setSelectedSubWatershed(null);
    setRightPanelTab('feature');
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* 1. TOP DASHBOARD KPI METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {topMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{m.label}</span>
                <Icon className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-xl font-black font-mono text-slate-900 tracking-tight tabular-nums">
                {m.value}
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* 2. MAIN 3-PANEL GIS WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CENTER + LEFT COMBINED / MAIN MAP (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Map Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-xs font-bold text-slate-900">
                Interactive GIS Map Canvas · <span className="font-mono text-slate-500">UTM 43N / WGS84</span>
              </h2>
            </div>

            {/* Quick Filter by Category */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline text-[11px]">Filter Ground Truth:</span>
              <select
                value={activeCategoryFilter}
                onChange={(e) => setActiveCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Features ({GEO_CODED_IMAGES.length + WATERSHED_INTERVENTIONS.length})</option>
                <option value="Check Dam">Check Dams</option>
                <option value="Farm Pond">Farm Ponds</option>
                <option value="Contour Bund">Contour Bunds</option>
                <option value="Percolation Tank">Percolation Tanks</option>
                <option value="Plantation">Plantation Sites</option>
              </select>
            </div>
          </div>

          {/* Interactive Leaflet Map */}
          <InteractiveMap
            height="580px"
            selectedImageId={selectedImage?.id}
            selectedInterventionId={selectedIntervention?.id}
            onSelectImage={handleMapSelectImage}
            onSelectIntervention={handleMapSelectIntervention}
            showSidebarControls={true}
          />

          {/* Sub-Catchment Selector Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                Select Micro-Catchment to Zoom & Inspect:
              </span>
              <button
                onClick={() => onNavigate('watershed-analysis')}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Full Catchment Hydrology</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUB_WATERSHEDS.map((sw) => {
                const isSelected = selectedSubWatershed?.id === sw.id;
                return (
                  <button
                    key={sw.id}
                    onClick={() => {
                      setSelectedSubWatershed(sw);
                      setSelectedImage(null);
                      setSelectedIntervention(null);
                      setRightPanelTab('feature');
                    }}
                    className={`p-2 rounded-lg text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sw.color }}></span>
                      <span className="text-[11px] font-bold text-slate-800 truncate">{sw.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {sw.areaHa} Ha · Slope {sw.avgSlopePct}%
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: SELECTED FEATURE / ANALYSIS INSPECTOR (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Panel Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setRightPanelTab('feature')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                rightPanelTab === 'feature'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Feature Inspector
            </button>
            <button
              onClick={() => setRightPanelTab('analytics')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                rightPanelTab === 'analytics'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LULC Breakdown
            </button>
            <button
              onClick={() => setRightPanelTab('layers')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                rightPanelTab === 'layers'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Layer Legend
            </button>
          </div>

          {/* TAB 1: FEATURE INSPECTOR */}
          {rightPanelTab === 'feature' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              {/* If Geo-coded image is selected */}
              {selectedImage && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      Geo-Coded Ground Truth
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      {selectedImage.id}
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-2">
                      <span>{selectedImage.lat.toFixed(5)}°N</span>
                      <span>·</span>
                      <span>{selectedImage.lng.toFixed(5)}°E</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedImage.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedImage.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Category</span>
                      <span className="font-semibold text-slate-800">{selectedImage.category}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Survey Date</span>
                      <span className="font-semibold text-slate-800">{selectedImage.date}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Elevation</span>
                      <span className="font-semibold font-mono text-slate-800">{selectedImage.elevationM}m AMSL</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Spectral Match</span>
                      <span className="font-semibold font-mono text-emerald-700">{selectedImage.satelliteMatchScore}%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      Field Surveyor Observation
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      {selectedImage.observation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onSelectImage(selectedImage)}
                      className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Full Inspection Modal
                    </button>
                    <button
                      onClick={() => onNavigate('comparison')}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="Compare with Satellite Pixel"
                    >
                      <span>Split-View</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* If Intervention is selected */}
              {selectedIntervention && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                      Intervention Feature
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-semibold border border-orange-200">
                      {selectedIntervention.id}
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={selectedIntervention.afterImageUrl}
                      alt={selectedIntervention.name}
                      className="w-full h-44 object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedIntervention.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedIntervention.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Status</span>
                      <span className="font-semibold text-emerald-700">{selectedIntervention.status}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Area Benefited</span>
                      <span className="font-semibold text-slate-800">{selectedIntervention.areaBenefitedHa} Ha</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Beneficiary Families</span>
                      <span className="font-semibold text-slate-800">{selectedIntervention.farmerFamiliesBenefited} Families</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] block">Capital Cost</span>
                      <span className="font-semibold font-mono text-slate-800">₹{selectedIntervention.costInr.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900">
                    <span className="font-bold block mb-1">Impact Observation:</span>
                    {selectedIntervention.impactObservation}
                  </div>

                  <button
                    onClick={() => onNavigate('interventions')}
                    className="w-full py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    View All Interventions Registry
                  </button>
                </div>
              )}

              {/* If Sub-catchment is selected */}
              {selectedSubWatershed && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      Sub-Catchment Details
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                      {selectedSubWatershed.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{selectedSubWatershed.name}</h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-slate-500">Catchment Area:</span>
                      <strong className="text-slate-800 font-mono">{selectedSubWatershed.areaHa} Hectares</strong>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-slate-500">Drainage Density:</span>
                      <strong className="text-slate-800 font-mono">{selectedSubWatershed.drainageDensity} km/km²</strong>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-slate-500">Average Slope:</span>
                      <strong className="text-slate-800 font-mono">{selectedSubWatershed.avgSlopePct}%</strong>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-slate-500">Dominant Soil:</span>
                      <span className="text-slate-800 font-medium">{selectedSubWatershed.dominantSoil}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900">
                    <span className="font-bold block mb-1">Recommended Soil-Water Action:</span>
                    {selectedSubWatershed.primaryInterventionNeed}
                  </div>

                  <button
                    onClick={() => onNavigate('watershed-analysis')}
                    className="w-full py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    Open Catchment Hydrology Report
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LULC BREAKDOWN */}
          {rightPanelTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">LULC Area Distribution</span>
                <span className="text-[10px] font-mono text-slate-500">Total: 4,850 Ha</span>
              </div>

              <div className="space-y-2.5">
                {LULC_DATA.map((item) => (
                  <div key={item.code} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 truncate pr-2">{item.name}</span>
                      <span className="font-mono text-slate-900 font-semibold shrink-0">
                        {item.percentage}% ({item.areaHa} Ha)
                      </span>
                    </div>
                    {/* Visual Progress bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('thematic-maps')}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> View Classified LULC Raster
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: LAYER LEGEND */}
          {rightPanelTab === 'layers' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 max-h-[580px] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Active Cartographic Legends</span>
                <span className="text-[10px] text-slate-400 font-mono">Standards</span>
              </div>

              <div className="space-y-4">
                {THEMATIC_LAYERS.slice(0, 4).map((layer) => (
                  <div key={layer.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900">{layer.name}</div>
                    <div className="space-y-1 text-[11px]">
                      {layer.legend.slice(0, 4).map((leg) => (
                        <div key={leg.label} className="flex items-center justify-between text-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: leg.color }}></span>
                            <span className="truncate">{leg.label}</span>
                          </div>
                          {leg.value && <span className="text-slate-400 font-mono text-[10px] shrink-0">{leg.value}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Shortcuts to other modules */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <span className="font-bold flex items-center gap-1.5 text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Geospatial Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigate('comparison')}
                className="p-2 bg-white rounded-lg border border-emerald-200 text-slate-700 hover:text-emerald-800 text-left font-medium hover:shadow-xs transition-all"
              >
                Field vs Satellite
              </button>
              <button
                onClick={() => onNavigate('change-detection')}
                className="p-2 bg-white rounded-lg border border-emerald-200 text-slate-700 hover:text-emerald-800 text-left font-medium hover:shadow-xs transition-all"
              >
                Change Timeline
              </button>
              <button
                onClick={() => onNavigate('interventions')}
                className="p-2 bg-white rounded-lg border border-emerald-200 text-slate-700 hover:text-emerald-800 text-left font-medium hover:shadow-xs transition-all"
              >
                Interventions
              </button>
              <button
                onClick={() => onNavigate('insights')}
                className="p-2 bg-white rounded-lg border border-emerald-200 text-slate-700 hover:text-emerald-800 text-left font-medium hover:shadow-xs transition-all"
              >
                Decision Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
