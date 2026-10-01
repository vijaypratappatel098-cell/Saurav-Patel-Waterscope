import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Droplet,
  TreePine,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import {
  SUB_WATERSHEDS,
  WATERSHED_INTERVENTIONS,
  GEO_CODED_IMAGES,
  SPATIAL_CHANGES,
  WATERSHED_CONFIG
} from '../data/watershedData';
import satelliteImg from '../assets/images/satellite_watershed_view_1790767296071.jpg';
import checkDamImg from '../assets/images/geocoded_check_dam_1790767255940.jpg';
import farmPondImg from '../assets/images/geocoded_farm_pond_1790767270216.jpg';
import soilContourImg from '../assets/images/geocoded_soil_contour_1790767281514.jpg';

interface ChangeScenario {
  id: string;
  name: string;
  subWatershed: string;
  coordinates: [number, number];
  beforeYear: number;
  afterYear: number;
  beforeState: {
    title: string;
    description: string;
    imageUrl: string;
    metrics: { label: string; val: string }[];
  };
  changeTrajectory: {
    vegetation: string;
    water: string;
    landUse: string;
    drainage: string;
    interventions: string;
    geoPhotoDifferences: string;
  };
  afterState: {
    title: string;
    description: string;
    imageUrl: string;
    metrics: { label: string; val: string }[];
  };
  causalityNote: string;
}

export const WhatChangedHereView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('SW-02');
  const [baselinePeriod, setBaselinePeriod] = useState<string>('2022');
  const [targetPeriod, setTargetPeriod] = useState<string>('2026');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(true);

  const scenarios: { [key: string]: ChangeScenario } = {
    'SW-01': {
      id: 'SW-01',
      name: 'North Ridge Sub-Catchment (SW-01)',
      subWatershed: 'North Ridge (Code: 4B1A2-A)',
      coordinates: [18.855, 74.945],
      beforeYear: 2022,
      afterYear: 2026,
      beforeState: {
        title: '2022 Baseline: Degraded Bare Hillslopes',
        description: 'Barren basaltic ridges with steep 14.5% slopes suffering severe convective rill incision and rapid flash runoff.',
        imageUrl: satelliteImg,
        metrics: [
          { label: 'Erosion Loss', val: '18.4 t/ha/yr' },
          { label: 'Mean NDVI', val: '0.18 (Sparse)' },
          { label: 'Treated Bunds', val: '0 Hectares' }
        ]
      },
      changeTrajectory: {
        vegetation: 'NDVI shifted from 0.18 to 0.52 following silvopastoral native tree planting.',
        water: 'Moisture infiltration increased by 45% within excavated continuous contour trenches.',
        landUse: '140 Ha formerly classified as Barren Wasteland converted to Ridge Afforestation.',
        drainage: 'Runoff velocity attenuated from >2.4 m/s down to 1.1 m/s along 1st-order gullies.',
        interventions: 'Continuous Contour Trenches (INT-CB-02) and 14,000 silvopastoral trees planted.',
        geoPhotoDifferences: 'Ground photo GEO-IMG-2026-108 confirms established vegetative buffer and zero scouring.'
      },
      afterState: {
        title: '2026 Present: Stabilized Ridge Terraces',
        description: '140 Ha of continuous contour trenches holding soil moisture with 89% vegetative sapling survival.',
        imageUrl: soilContourImg,
        metrics: [
          { label: 'Erosion Loss', val: '5.2 t/ha/yr (-72%)' },
          { label: 'Mean NDVI', val: '0.52 (+0.34)' },
          { label: 'Treated Bunds', val: '140 Hectares' }
        ]
      },
      causalityNote: 'Erosion reduction is directly corroborated by trapped sediment in contour trenches; regional rainfall variability also supported vegetative canopy survival.'
    },
    'SW-02': {
      id: 'SW-02',
      name: 'Central Valley Agricultural Belt (SW-02)',
      subWatershed: 'Central Valley (Code: 4B1A2-B)',
      coordinates: [18.825, 74.965],
      beforeYear: 2022,
      afterYear: 2026,
      beforeState: {
        title: '2022 Baseline: Single-Crop Rainfed Fallow',
        description: 'Rainfed agriculture restricted to monsoon Kharif season; dry sand nala with depleted water table at 11.8m bgl.',
        imageUrl: satelliteImg,
        metrics: [
          { label: 'Double Cropped', val: '520 Ha' },
          { label: 'Water Storage', val: '8,000 m³' },
          { label: 'Water Table', val: '11.8m bgl' }
        ]
      },
      changeTrajectory: {
        vegetation: 'Vigorous winter Rabi crop canopy reflected in high spectral response (NDVI 0.68 - 0.74).',
        water: 'Surface impoundment expanded to 18,500 m³ at Babhulgaon check dam + 2,700 m³ in farm ponds.',
        landUse: '410 Ha of single-crop rainfed fallow transitioned to intensive double-cropping (pulses/onions).',
        drainage: 'Trunk stream Order 4 maintains perennial impoundment extending 450m upstream of weir.',
        interventions: 'Construction of Babhulgaon Check Dam (INT-CD-01) and Shindewadi Farm Pond (INT-FP-03).',
        geoPhotoDifferences: 'Ground truth photos GEO-IMG-2026-081 and 094 verify 85% storage capacity and active pumping.'
      },
      afterState: {
        title: '2026 Present: Productive Double-Cropping Valley',
        description: 'Check dam reservoir and farm ponds providing assured secondary irrigation across 68 Ha command area.',
        imageUrl: checkDamImg,
        metrics: [
          { label: 'Double Cropped', val: '1,180 Ha (+127%)' },
          { label: 'Water Storage', val: '25,200 m³' },
          { label: 'Water Table', val: '7.4m bgl (+4.4m)' }
        ]
      },
      causalityNote: 'Groundwater table recovery (+4.4m) correlates closely with check dam impoundment radius; crop market prices also encouraged farmer adoption of high-value Rabi onions.'
    },
    'SW-03': {
      id: 'SW-03',
      name: 'Eastern Pediment & Drainage Sink (SW-03)',
      subWatershed: 'Eastern Pediment (Code: 4B1A2-C)',
      coordinates: [18.805, 74.995],
      beforeYear: 2022,
      afterYear: 2026,
      beforeState: {
        title: '2022 Baseline: Silted Percolation Tank',
        description: 'Old percolation tank choked with heavy clay silt, severely impeding groundwater infiltration into the fractured aquifer.',
        imageUrl: satelliteImg,
        metrics: [
          { label: 'Storage Extent', val: '18,000 m³' },
          { label: 'Well Recharge Head', val: '12.4m bgl' },
          { label: 'Silt Inflow Depth', val: '1.2m Silt' }
        ]
      },
      changeTrajectory: {
        vegetation: 'Downstream well zone displays sustained vegetative health through February.',
        water: 'Water storage capacity expanded to 45,000 m³ following desilting of 12,000 m³ silt.',
        landUse: 'Excavated fertile silt applied back to 22 adjacent farm plots, improving soil fertility.',
        drainage: 'Feeder canal flow routed through silt trap before entering main percolation perimeter.',
        interventions: 'Chincholi Deep Percolation Tank Renovation (INT-PT-01).',
        geoPhotoDifferences: 'GEO-IMG-2026-120 documents water perimeter matching satellite NDWI within 4.2m.'
      },
      afterState: {
        title: '2026 Present: Deep Percolation Reservoir',
        description: 'Restored percolation reservoir recharging 64 beneficiary farming households and drinking water wells.',
        imageUrl: farmPondImg,
        metrics: [
          { label: 'Storage Extent', val: '45,000 m³ (+150%)' },
          { label: 'Well Recharge Head', val: '7.8m bgl (+4.6m)' },
          { label: 'Desilted Volume', val: '12,000 m³' }
        ]
      },
      causalityNote: 'Infiltration rate restored by physical removal of clayey silt bottom blanket; local groundwater table response confirmed by 12 monitoring dugwells.'
    }
  };

  const currentScenario = scenarios[selectedAreaId] || scenarios['SW-02'];

  const handleExecuteChangeAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasExecuted(true);
    }, 600);
  };

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Interactive Bi-Temporal Diagnostic Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            “What Changed Here?” Tool
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Select a sub-catchment area and time horizons to run an automated multi-sensor differential comparison across vegetation, surface water, land cover, and civil structures.
          </p>
        </div>
      </div>

      {/* Control Selector Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          {/* 1. Select Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">1. Select Location / Micro-Catchment:</label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 font-medium focus:ring-1 focus:ring-purple-500"
            >
              <option value="SW-01">North Ridge Sub-Catchment (SW-01)</option>
              <option value="SW-02">Central Valley Agricultural Belt (SW-02)</option>
              <option value="SW-03">Eastern Pediment & Drainage Sink (SW-03)</option>
            </select>
          </div>

          {/* 2. Select Dates */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">2. Compare Time Epochs:</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={baselinePeriod}
                onChange={(e) => setBaselinePeriod(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-2.5 py-2.5 font-medium"
              >
                <option value="2022">2022 (Baseline)</option>
                <option value="2023">2023 (Phase 1)</option>
              </select>
              <select
                value={targetPeriod}
                onChange={(e) => setTargetPeriod(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-2.5 py-2.5 font-medium"
              >
                <option value="2026">2026 (Present)</option>
                <option value="2024">2024 (Mid-Term)</option>
              </select>
            </div>
          </div>

          {/* 3. Action Button */}
          <div>
            <button
              onClick={handleExecuteChangeAnalysis}
              disabled={isAnalyzing}
              className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Running Pixel Difference...' : 'What Changed Here?'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* BEFORE -> CHANGE -> AFTER TRI-PANEL DISPLAY */}
      {hasExecuted && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Panel 1: BEFORE (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    BEFORE ({currentScenario.beforeYear})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Baseline Telemetry</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{currentScenario.beforeState.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentScenario.beforeState.description}
                </p>
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 mt-3">
                  <img
                    src={currentScenario.beforeState.imageUrl}
                    alt="Before State"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                {currentScenario.beforeState.metrics.map((m) => (
                  <div key={m.label} className="p-1.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">{m.label}</span>
                    <strong className="text-slate-800 font-mono">{m.val}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2: OBSERVABLE CHANGE TRAJECTORY (4 cols) */}
            <div className="lg:col-span-4 bg-purple-50/60 rounded-2xl border border-purple-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                  <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    OBSERVABLE CHANGE (Δ)
                  </span>
                  <span className="text-[10px] font-mono text-purple-700">Multi-Sensor Matrix</span>
                </div>

                <div className="space-y-2.5 mt-3 text-xs text-slate-700">
                  <div className="p-2.5 bg-white rounded-xl border border-purple-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-purple-800 uppercase font-mono flex items-center gap-1">
                      <TreePine className="w-3 h-3 text-emerald-600" /> Vegetation Difference
                    </span>
                    <p className="text-[11px] text-slate-800 leading-relaxed">
                      {currentScenario.changeTrajectory.vegetation}
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-purple-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-purple-800 uppercase font-mono flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-sky-600" /> Water-Surface Dynamics
                    </span>
                    <p className="text-[11px] text-slate-800 leading-relaxed">
                      {currentScenario.changeTrajectory.water}
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-purple-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-purple-800 uppercase font-mono flex items-center gap-1">
                      <Layers className="w-3 h-3 text-orange-600" /> Land-Use Shift
                    </span>
                    <p className="text-[11px] text-slate-800 leading-relaxed">
                      {currentScenario.changeTrajectory.landUse}
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-purple-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-purple-800 uppercase font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600" /> Recorded Intervention
                    </span>
                    <p className="text-[11px] text-slate-800 leading-relaxed">
                      {currentScenario.changeTrajectory.interventions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-purple-900 bg-purple-100/70 p-2.5 rounded-xl border border-purple-200">
                <strong>Ground Truthing Correlation:</strong> {currentScenario.changeTrajectory.geoPhotoDifferences}
              </div>
            </div>

            {/* Panel 3: AFTER (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    AFTER ({currentScenario.afterYear})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Current Verified State</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{currentScenario.afterState.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentScenario.afterState.description}
                </p>
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 mt-3">
                  <img
                    src={currentScenario.afterState.imageUrl}
                    alt="After State"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                {currentScenario.afterState.metrics.map((m) => (
                  <div key={m.label} className="p-1.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">{m.label}</span>
                    <strong className="text-emerald-800 font-mono">{m.val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scientific Causality Guardrail Note */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
            <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-900">Causality Evaluation & Methodological Transparency:</strong>
              <p className="leading-relaxed text-[11px]">
                {currentScenario.causalityNote} The system does not claim that a single structure was solely responsible for landscape transitions without multi-factorial verification.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
