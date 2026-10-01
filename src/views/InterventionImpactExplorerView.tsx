import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Camera,
  Layers,
  Droplet,
  TreePine,
  TrendingUp,
  ExternalLink,
  Users,
  IndianRupee,
  Activity,
  ArrowRight
} from 'lucide-react';
import {
  WATERSHED_INTERVENTIONS,
  GEO_CODED_IMAGES,
  WATER_BODIES,
  WATERSHED_CONFIG
} from '../data/watershedData';
import { WatershedIntervention, GeoCategory } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';
import satelliteImg from '../assets/images/satellite_watershed_view_1790767296071.jpg';

export const InterventionImpactExplorerView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedInterventionId, setSelectedInterventionId] = useState<string>(
    WATERSHED_INTERVENTIONS[0].id
  );
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activePhotoTab, setActivePhotoTab] = useState<'after' | 'before'>('after');

  const categories = [
    'all',
    'Check Dam',
    'Farm Pond',
    'Contour Bund',
    'Percolation Tank',
    'Plantation',
    'Recharge Structure'
  ];

  const filteredInterventions = WATERSHED_INTERVENTIONS.filter(
    (itv) => activeCategoryFilter === 'all' || itv.type === activeCategoryFilter
  );

  const activeIntervention: WatershedIntervention =
    WATERSHED_INTERVENTIONS.find((i) => i.id === selectedInterventionId) || WATERSHED_INTERVENTIONS[0];

  // Find linked geo-coded ground photo
  const linkedGeoPhoto =
    GEO_CODED_IMAGES.find((g) => g.interventionId === activeIntervention.id) || GEO_CODED_IMAGES[0];

  // Find linked or nearby water body
  const nearbyWaterBody = WATER_BODIES[0];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Multi-Tier Structure Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Intervention Impact Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            In-depth geospatial inspection of check dams, farm ponds, percolation tanks, and contour trenches cross-referenced with ground truth photos and satellite spectral halos.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Structures' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout: Interventions Selector & Interactive Map (6 cols) + Detailed Impact Dossier (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interventions List & Map (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Structure Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredInterventions.map((itv) => {
              const isSelected = itv.id === selectedInterventionId;
              return (
                <button
                  key={itv.id}
                  onClick={() => setSelectedInterventionId(itv.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-orange-50/70 border-orange-500 ring-2 ring-orange-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>{itv.id}</span>
                      <span
                        className={`font-semibold px-1.5 py-0.5 rounded ${
                          itv.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {itv.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{itv.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{itv.location}</p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
                    <span>Benefited: <strong className="text-slate-800">{itv.areaBenefitedHa} Ha</strong></span>
                    <span className="font-mono text-slate-800">₹{(itv.costInr / 100000).toFixed(1)}L</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Centered on Selected Intervention */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                Intervention Spatial Position & Catchment Reach
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                {activeIntervention.lat.toFixed(5)}°N, {activeIntervention.lng.toFixed(5)}°E
              </span>
            </div>

            <InteractiveMap
              height="380px"
              selectedInterventionId={activeIntervention.id}
              showSidebarControls={false}
            />
          </div>
        </div>

        {/* Right Column: Deep Impact Dossier (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            {/* Title & Status */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
                    {activeIntervention.id}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Type: {activeIntervention.type}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {activeIntervention.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-2">{activeIntervention.name}</h2>
              <p className="text-xs text-slate-500">{activeIntervention.location} · {activeIntervention.watershedName}</p>
            </div>

            {/* Before / After Photographic Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Photographic Ground & Satellite Evidence:</span>
                <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-[11px]">
                  <button
                    onClick={() => setActivePhotoTab('after')}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      activePhotoTab === 'after' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Post-Construction
                  </button>
                  <button
                    onClick={() => setActivePhotoTab('before')}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      activePhotoTab === 'before' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Pre-Construction Baseline
                  </button>
                </div>
              </div>

              <div className="relative h-60 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={activePhotoTab === 'after' ? activeIntervention.afterImageUrl : activeIntervention.beforeImageUrl}
                  alt={activeIntervention.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-white">
                  {activePhotoTab === 'after'
                    ? `Field Ground Photo (Captured ${activeIntervention.date})`
                    : 'Historical Satellite Surface Baseline (2022)'}
                </div>
              </div>
            </div>

            {/* Quantified Beneficiaries & Cost Grid */}
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">AREA BENEFITED</span>
                <strong className="text-sm font-bold font-mono text-slate-900">{activeIntervention.areaBenefitedHa} Ha</strong>
                <span className="text-[10px] text-slate-500 block">Command reach</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">FARM FAMILIES</span>
                <strong className="text-sm font-bold font-mono text-slate-900">{activeIntervention.farmerFamiliesBenefited} Families</strong>
                <span className="text-[10px] text-slate-500 block">Direct stakeholders</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">CAPITAL EXPENDITURE</span>
                <strong className="text-sm font-bold font-mono text-slate-900">₹{activeIntervention.costInr.toLocaleString('en-IN')}</strong>
                <span className="text-[10px] text-slate-500 block">Audited outlay</span>
              </div>
            </div>

            {/* Field Measured Impact Observation */}
            <div className="p-4 bg-orange-50/70 rounded-xl border border-orange-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-orange-900 uppercase tracking-wider block">
                Hydrological Impact Audit
              </span>
              <p className="text-orange-950 leading-relaxed font-mono text-[11px]">
                {activeIntervention.impactObservation}
              </p>
            </div>

            {/* Nearby Vegetation & Water Context Accordion */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Vegetation Halo (NDVI):</span>
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +0.28 NDVI within 600m buffer
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  <span>Nearby Water Storage Body:</span>
                </span>
                <span className="font-semibold text-slate-800">
                  {nearbyWaterBody.name} ({nearbyWaterBody.capacityCuM.toLocaleString()} m³)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
