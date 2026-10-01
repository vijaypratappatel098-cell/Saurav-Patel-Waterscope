import React, { useState } from 'react';
import {
  Layers,
  Mountain,
  Droplet,
  TreePine,
  Activity,
  ArrowDownRight,
  TrendingDown,
  ShieldCheck,
  Compass,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  WATERSHED_CONFIG,
  SUB_WATERSHEDS,
  DRAINAGE_STREAMS,
  LULC_DATA
} from '../data/watershedData';
import { InteractiveMap } from '../components/InteractiveMap';

export const WatershedAnalysisView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [activeAnalysisCard, setActiveAnalysisCard] = useState<string>('topography');

  const analysisThemes = [
    {
      id: 'topography',
      name: 'Topography & Relief',
      icon: Mountain,
      color: '#B45309',
      summary: 'Hypsometric elevation from 620m in the alluvial valley to 885m on basaltic ridge dividing lines.',
      metrics: [
        { label: 'Highest Elevation', val: '885 m AMSL' },
        { label: 'Lowest Elevation', val: '620 m AMSL' },
        { label: 'Total Relief', val: '265 m Drop' },
        { label: 'Hypsometric Integral', val: '0.42 (Mature Basin)' }
      ],
      details: 'Steep convex slopes (>15%) on northern rim produce rapid storm runoff. Upper ridges demand continuous contour trenches to reduce slope length and velocity.'
    },
    {
      id: 'drainage',
      name: 'Drainage & Stream Network',
      icon: Droplet,
      color: '#0284C7',
      summary: 'Dendritic drainage pattern with Strahler orders 1 through 4. Total channel length exceeds 38.6 km.',
      metrics: [
        { label: 'Drainage Density', val: '2.34 km/km²' },
        { label: 'Bifurcation Ratio (Rb)', val: '3.8 (Normal Dendritic)' },
        { label: 'Stream Order Range', val: 'Order 1 to 4' },
        { label: 'Concentration Time (Tc)', val: '2.4 Hours' }
      ],
      details: 'Flow accumulation models show intense convergence at stream junction 3A, making it the prime candidate for large masonry impoundment CD-01.'
    },
    {
      id: 'landuse',
      name: 'Land Use & Cover (LULC)',
      icon: Layers,
      color: '#16A34A',
      summary: 'Supervised Random Forest classification delineates 39% double cropped farmland and 14.6% rocky barren wasteland.',
      metrics: [
        { label: 'Double Cropped Area', val: '1,890 Ha (39.0%)' },
        { label: 'Single Crop / Fallow', val: '780 Ha (16.1%)' },
        { label: 'Ridge Afforestation', val: '640 Ha (13.2%)' },
        { label: 'Barren Rocky Uplands', val: '710 Ha (14.6%)' }
      ],
      details: 'Over 335 hectares of formerly barren wasteland have been brought under agro-forestry through soil bunding and protective farm ponds.'
    },
    {
      id: 'vegetation',
      name: 'Vegetation & Biomass Vigor',
      icon: TreePine,
      color: '#059669',
      summary: 'Multi-spectral NDVI indicates a 47.1% increase in healthy vegetative canopy across the watershed basin.',
      metrics: [
        { label: 'Mean Basin NDVI', val: '0.54 (Peak Kharif)' },
        { label: 'Vegetation Biomass Area', val: '2,530 Hectares' },
        { label: 'Vigor Growth (2022-26)', val: '+47.1% Increase' },
        { label: 'Chlorophyll Index', val: 'High Absorption' }
      ],
      details: 'Downstream influence zones within 600m of check dams exhibit sustained winter greenness (NDVI > 0.60) through late February.'
    },
    {
      id: 'water',
      name: 'Water Resources & Storage',
      icon: Activity,
      color: '#0EA5E9',
      summary: 'Total surface water spread reaches 315 hectares with 128,500 m³ impounded across 23 conservation units.',
      metrics: [
        { label: 'Total Storage Volume', val: '128,500 m³' },
        { label: 'Surface Water Spread', val: '315 Hectares' },
        { label: 'Groundwater Table Rise', val: '+4.4 m Average' },
        { label: 'Wells Benefited', val: '74 Open Dugwells' }
      ],
      details: 'Desilted percolation tanks in the eastern pediment zone (SW-03) recharge deep fractured aquifers, sustaining drinking water wells through peak summer.'
    },
    {
      id: 'soil',
      name: 'Soil & Infiltration Condition',
      icon: TrendingDown,
      color: '#92400E',
      summary: 'Deep Vertisols in low-slope valleys contrast with shallow skeletal Lithosols on upper ridges.',
      metrics: [
        { label: 'Valley Soil Depth', val: '> 90 cm (Deep Vertisol)' },
        { label: 'Ridge Soil Depth', val: '< 20 cm (Lithosol)' },
        { label: 'Sediment Delivery (SDR)', val: '7.9 t/ha/yr (-57%)' },
        { label: 'Infiltration Rate', val: '2.8 cm/hr Average' }
      ],
      details: 'Gully plugging with loose boulders reduced annual sediment yield from 18.4 to 7.9 tonnes/ha/yr, protecting valley reservoirs from premature siltation.'
    }
  ];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Mountain className="w-3.5 h-3.5" />
            <span>Comprehensive Catchment Hydrology</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Morphometric & Spatial Analysis
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Integrated digital elevation derivatives, stream order ranking, soil infiltration profiles, and sub-catchment prioritization matrices.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          Open in Full GIS Dashboard
        </button>
      </div>

      {/* 6 Core Analysis Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analysisThemes.map((theme) => {
          const Icon = theme.icon;
          const isSelected = activeAnalysisCard === theme.id;
          return (
            <div
              key={theme.id}
              onClick={() => setActiveAnalysisCard(theme.id)}
              className={`bg-white rounded-2xl border p-6 shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: theme.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Theme Analysis
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{theme.name}</h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">{theme.summary}</p>

                {/* Mini Metric Chips */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {theme.metrics.map((m) => (
                    <div key={m.label} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">{m.label}</span>
                      <strong className="text-xs font-mono text-slate-800">{m.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 italic text-[11px] truncate max-w-[200px]">
                  {theme.details}
                </span>
                <span className="font-semibold text-emerald-700 flex items-center gap-0.5 shrink-0">
                  Inspect <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-Catchments Quantitative Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Sub-Watershed Micro-Catchment Morphometric Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Quantitative comparison of catchment geometry, drainage density, and slope gradients.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Total 4 Units</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Sub-Catchment</th>
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3">Area (Ha)</th>
                <th className="py-2.5 px-3">Drainage Density</th>
                <th className="py-2.5 px-3">Max Stream Order</th>
                <th className="py-2.5 px-3">Avg Slope</th>
                <th className="py-2.5 px-3">Dominant Soil</th>
                <th className="py-2.5 px-3">Target Priority Need</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {SUB_WATERSHEDS.map((sw) => (
                <tr key={sw.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sw.color }}></span>
                    {sw.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{sw.code}</td>
                  <td className="py-3 px-3 font-mono tabular-nums text-slate-800">{sw.areaHa} Ha</td>
                  <td className="py-3 px-3 font-mono text-slate-800">{sw.drainageDensity} km/km²</td>
                  <td className="py-3 px-3">Order {sw.maxStreamOrder}</td>
                  <td className="py-3 px-3 font-mono text-slate-800">{sw.avgSlopePct}%</td>
                  <td className="py-3 px-3 text-slate-600">{sw.dominantSoil}</td>
                  <td className="py-3 px-3 text-emerald-800 text-[11px] font-semibold">{sw.primaryInterventionNeed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Catchment Boundary & Drainage Network Visualization
            </h3>
            <p className="text-xs text-slate-500">
              Live GIS layers showing Strahler stream hierarchy and sub-catchment perimeters.
            </p>
          </div>
        </div>

        <InteractiveMap height="480px" showSidebarControls={true} />
      </div>
    </div>
  );
};
