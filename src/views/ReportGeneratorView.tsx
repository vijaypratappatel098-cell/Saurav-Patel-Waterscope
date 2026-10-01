import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Calendar,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  Droplet,
  TreePine,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  WATERSHED_CONFIG,
  MAIN_WATERSHED_BOUNDARY,
  SUB_WATERSHEDS,
  DRAINAGE_STREAMS,
  WATER_BODIES,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS,
  THEMATIC_LAYERS,
  LULC_DATA,
  SPATIAL_CHANGES,
  DECISION_INSIGHTS,
  CONDITION_SCORE_COMPONENTS,
  PROBLEM_HOTSPOTS
} from '../data/watershedData';

export const ReportGeneratorView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedScope, setSelectedScope] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [reportReady, setReportReady] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');

  const reportDate = 'March 2026';
  const reportId = `WS-REP-4B1A2-2026-01`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      reportId,
      date: reportDate,
      watershedConfig: WATERSHED_CONFIG,
      subWatersheds: SUB_WATERSHEDS,
      drainageStreams: DRAINAGE_STREAMS,
      waterBodies: WATER_BODIES,
      geoCodedImages: GEO_CODED_IMAGES,
      interventions: WATERSHED_INTERVENTIONS,
      lulcData: LULC_DATA,
      spatialChanges: SPATIAL_CHANGES,
      conditionScore: {
        compositeScore: 74,
        components: CONDITION_SCORE_COMPONENTS
      },
      insights: DECISION_INSIGHTS,
      hotspots: PROBLEM_HOTSPOTS
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}_watershed_intelligence_report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Automated Geospatial Synthesis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Comprehensive Intelligence Report
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            One-click automated compilation of all 16 scientific report chapters fusing satellite remote sensing, RTK ground truth photos, and civil intervention audits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON Payload</span>
          </button>
        </div>
      </div>

      {/* Report Container (Formatted for Display & Printing) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10 max-w-5xl mx-auto print:border-none print:shadow-none print:p-0">
        {/* Cover / Title Header */}
        <div className="border-b-2 border-slate-900 pb-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>WATERSCOPE GEOSPATIAL INTELLIGENCE PLATFORM</span>
            <span>REPORT REF: {reportId}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            COMPREHENSIVE WATERSHED EVALUATION & DECISION SUPPORT REPORT
          </h1>
          <p className="text-base font-semibold text-slate-700">
            Application of Geospatial Techniques for Visualization and Analysis to Interpret Geo-Coded Images to Enhance Watershed Development Outcomes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 font-mono text-slate-600 border-t border-slate-200">
            <div><strong>Basin:</strong> {WATERSHED_CONFIG.name}</div>
            <div><strong>Region:</strong> {WATERSHED_CONFIG.state}</div>
            <div><strong>Evaluation:</strong> {reportDate}</div>
            <div><strong>Area:</strong> {WATERSHED_CONFIG.totalAreaHa.toLocaleString()} Hectares</div>
          </div>
        </div>

        {/* SECTION 1: Watershed Overview & Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            1. Watershed Overview & Executive Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The Upper Sina Micro-Catchment (#4B1A2) encompasses 4,850 hectares in the drought-vulnerable Deccan plateau rain shadow. Fusing high-resolution Sentinel-2 multi-spectral remote sensing with sub-meter RTK geo-coded field surveys, this assessment documents a significant hydrological recovery between 2022 and 2026. The catchment achieves an explainable <strong>Analytical Condition Score of 74 / 100</strong>, with vegetative canopy expanding by <strong>+47.1%</strong> (2,530 Ha vs 1,720 Ha baseline) and water storage capacity rising by <strong>+121.8%</strong> (128,500 m³ impounded across 23 conservation structures).
          </p>
        </section>

        {/* SECTION 2: Geographic Location & Administrative Context */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            2. Geographic Location
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">CENTER COORDINATES</span>
              <strong>18.825°N, 74.960°E</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">ELEVATION RANGE</span>
              <strong>620m - 885m AMSL</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">MEAN PRECIPITATION</span>
              <strong>540 mm / Year</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">DRAINAGE DENSITY</span>
              <strong>2.34 km / km²</strong>
            </div>
          </div>
        </section>

        {/* SECTION 3: Watershed Boundary & Micro-Catchments */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            3. Watershed Boundary & Sub-Catchment Delineation
          </h2>
          <p className="text-xs text-slate-600">
            Delineated via hydro-enforced 30m DEM flow accumulation algorithms into 4 micro-catchments:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2">Catchment</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Area (Ha)</th>
                  <th className="p-2">Avg Slope</th>
                  <th className="p-2">Dominant Soil</th>
                  <th className="p-2">Priority Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {SUB_WATERSHEDS.map((sw) => (
                  <tr key={sw.id}>
                    <td className="p-2 font-semibold text-slate-900">{sw.name}</td>
                    <td className="p-2 font-mono">{sw.code}</td>
                    <td className="p-2 font-mono">{sw.areaHa} Ha</td>
                    <td className="p-2 font-mono">{sw.avgSlopePct}%</td>
                    <td className="p-2 text-slate-600">{sw.dominantSoil}</td>
                    <td className="p-2 text-emerald-800">{sw.primaryInterventionNeed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: Satellite Remote Sensing Ingestion */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            4. Satellite Imagery & Sensor Platforms
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-sensor data ingestion incorporates Sentinel-2 MSI Level-2A (10m spatial resolution across bands 2, 3, 4, 8), Landsat-9 OLI-2 (30m multi-spectral), and SRTM 30m Digital Elevation Models. Atmospheric corrections applied using Sen2Cor algorithms; cloud masking verified via QA60 pixel bands.
          </p>
        </section>

        {/* SECTION 5: Geo-Coded Ground Truth Images */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            5. Geo-Coded Ground Field Image Catalog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {GEO_CODED_IMAGES.map((img) => (
              <div key={img.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-slate-500">
                  <span>{img.id}</span>
                  <span className="text-emerald-700 font-bold">{img.satelliteMatchScore}% Match</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">{img.title}</div>
                <div className="text-[11px] text-slate-600 font-mono">
                  {img.lat.toFixed(4)}°N, {img.lng.toFixed(4)}°E · Elev {img.elevationM}m
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 italic pt-1">{img.observation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Land Use / Land Cover (LULC) Classification */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            6. Land Use / Land Cover (LULC) Classification
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {LULC_DATA.slice(0, 4).map((l) => (
              <div key={l.name} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">{l.code}</span>
                <strong className="text-slate-900 text-xs block truncate">{l.name}</strong>
                <span className="text-xs font-mono font-bold text-emerald-800">{l.areaHa} Ha ({l.percentage}%)</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: Vegetation & Biomass Analysis */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            7. Vegetation Analysis (NDVI)
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-spectral NDVI differencing reveals that total photosynthetic biomass (NDVI &gt; 0.35) expanded from 1,720 Ha (2022) to 2,530 Ha (2026), representing a <strong>+47.1% increase</strong>. Peak Kharif mean NDVI reached 0.74 in September; secondary winter greening remained robust (NDVI 0.61 in December) due to groundwater irrigation halos extending 600m below check dams.
          </p>
        </section>

        {/* SECTION 8: Surface Water Bodies & Storage */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            8. Water Bodies & Storage Infrastructure
          </h2>
          <p className="text-xs text-slate-600">
            Total impounded water storage reached 128,500 m³ across 23 conservation units (5 major reservoirs, 18 farm ponds) covering 315 Ha of post-monsoon water spread (+121.8% vs 2022 baseline of 142 Ha).
          </p>
        </section>

        {/* SECTION 9: Stream Hierarchy & Drainage */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            9. Drainage Network & Strahler Stream Ordering
          </h2>
          <p className="text-xs text-slate-600">
            Dendritic stream network totaling 38.6 km across 4 orders (Trunk Sina Nala Order 4: 8.6 km perennial reach, Order 3: 9.9 km, Order 2: 6.2 km, Order 1: 4.8 km headwater gullies). Bifurcation ratio Rb = 3.8; basin concentration time Tc = 2.4 hours.
          </p>
        </section>

        {/* SECTION 10: Watershed Interventions Audit */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            10. Watershed Interventions Registry
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Structure Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Benefited (Ha)</th>
                  <th className="p-2">Families</th>
                  <th className="p-2">Cost (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {WATERSHED_INTERVENTIONS.map((itv) => (
                  <tr key={itv.id}>
                    <td className="p-2 font-mono font-bold">{itv.id}</td>
                    <td className="p-2 font-semibold text-slate-900">{itv.name}</td>
                    <td className="p-2">{itv.type}</td>
                    <td className="p-2 text-emerald-800 font-semibold">{itv.status}</td>
                    <td className="p-2 font-mono">{itv.areaBenefitedHa} Ha</td>
                    <td className="p-2 font-mono">{itv.farmerFamiliesBenefited}</td>
                    <td className="p-2 font-mono">₹{itv.costInr.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 11 & 12: Before / After & Multi-Temporal Change Detection */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            11 & 12. Before / After Analysis & Multi-Temporal Change Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {SPATIAL_CHANGES.map((chg) => (
              <div key={chg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono">{chg.parameter}</span>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-mono text-slate-500 text-[11px]">{chg.year2022} → {chg.year2026} {chg.unit}</span>
                  <span className="font-mono font-bold text-emerald-700 text-xs">
                    {chg.changePct > 0 ? `+${chg.changePct}%` : `${chg.changePct}%`}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 italic pt-1">{chg.interpretation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 13: Explainable Watershed Condition Score */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            13. Explainable Watershed Condition Score (74 / 100)
          </h2>
          <p className="text-xs text-slate-600">
            Derived using Analytical Hierarchy Process (AHP) weighted across 6 verifiable spatial components:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {CONDITION_SCORE_COMPONENTS.map((comp) => (
              <div key={comp.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Weight: {comp.weightPct}%</span>
                  <span className="text-emerald-700 font-semibold">{comp.status}</span>
                </div>
                <strong className="text-slate-900 text-xs block mt-1">{comp.title}</strong>
                <span className="text-xs font-mono font-bold text-slate-800">{comp.score} / 100</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 14: Diagnostic Observations & Hotspots */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
            14. Priority Hotspots & Diagnostic Directives
          </h2>
          <div className="space-y-2 text-xs">
            {PROBLEM_HOTSPOTS.slice(0, 3).map((hot) => (
              <div key={hot.id} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-xs">{hot.title}</strong>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {hot.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700">{hot.whyFlagged}</p>
                <div className="text-[11px] text-emerald-800 font-mono font-semibold pt-1">
                  Action: {hot.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 15 & 16: Data Sources & Limitations */}
        <section className="space-y-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
              15. Data Sources & Calibration
            </h3>
            <p className="leading-relaxed">
              Sentinel-2 MSI Level-2A (Copernicus Hub), Landsat-9 OLI-2 (USGS), SRTM 30m Digital Elevation Models (NASA), Trimble TDC600 &amp; Leica Zeno RTK GNSS mobile receivers, National Bureau of Soil Survey &amp; Land Use Planning (NBSS&amp;LUP) soil survey maps.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">
              16. Methodological Limitations & Ground Truthing Confidence
            </h3>
            <p className="leading-relaxed">
              Satellite observations are subject to 10m spatial resolution limits; small individual micro-farm ponds under 15m dimension rely primarily on RTK ground truth photos. Annual vegetative vigor metrics are influenced by seasonal precipitation fluctuations; multi-temporal normalization was applied to isolate intervention recharge effects.
            </p>
          </div>
        </section>

        {/* Report Footer / Signature Block */}
        <div className="pt-8 border-t-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            WATERSCOPE PLATFORM · ISO 19115 GEOGRAPHIC INFORMATION METADATA COMPLIANT
          </div>
          <div className="text-right">
            GENERATED ELECTRONICALLY · VERIFIED SCIENTIFIC GROUND TRUTH
          </div>
        </div>
      </div>
    </div>
  );
};
