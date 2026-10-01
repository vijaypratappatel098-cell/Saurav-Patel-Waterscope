import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Droplet,
  TreePine,
  PieChart,
  Layers,
  MapPin,
  Calendar,
  Filter,
  CheckCircle2
} from 'lucide-react';
import {
  LULC_DATA,
  NDVI_TREND_DATA,
  WATER_STORAGE_TREND_DATA,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS
} from '../data/watershedData';

export const AnalyticsView: React.FC = () => {
  const [activeMetricTab, setActiveMetricTab] = useState<'water' | 'vegetation' | 'lulc'>('water');
  const [hoveredLulc, setHoveredLulc] = useState<string | null>(null);

  // Geo-coded photos category count
  const categoryCounts = [
    { label: 'Check Dam', count: 1 },
    { label: 'Farm Pond', count: 2 },
    { label: 'Contour Bund', count: 1 },
    { label: 'Percolation Tank', count: 1 },
    { label: 'Soil Condition', count: 1 }
  ];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Quantitative Geospatial Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Watershed Spatial Analytics & Trends
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Multi-year trend analysis tracking water impoundment curves, photosynthetic canopy vigor, LULC area transitions, and ground observation point density.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
            Epoch: 2021 – 2026 Time-Series
          </span>
        </div>
      </div>

      {/* Row 1: Water Storage Growth (Area/Line Chart) & LULC Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Water Storage Growth (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-sky-600" />
                Cumulative Water Storage Capacity (m³)
              </h3>
              <p className="text-xs text-slate-500">
                Impoundment volume trajectory following check dam and farm pond deployments.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
              128,500 m³ Total
            </span>
          </div>

          {/* SVG Bar / Area Chart */}
          <div className="h-64 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              {/* Horizontal Grid lines */}
              {[0, 30000, 60000, 90000, 120000].map((val) => {
                const y = 180 - (val / 140000) * 160;
                return (
                  <g key={val}>
                    <line x1="60" y1={y} x2="580" y2={y} stroke="#f1f5f9" strokeDasharray="3,3" />
                    <text x="50" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                      {(val / 1000).toFixed(0)}k
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {WATER_STORAGE_TREND_DATA.map((d, i) => {
                const barWidth = 42;
                const x = 90 + i * 85;
                const barHeight = (d.storageCuM / 140000) * 160;
                const y = 180 - barHeight;
                return (
                  <g key={d.year} className="group">
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="6"
                      fill="#0284c7"
                      className="transition-all hover:fill-sky-500 cursor-pointer"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 8}
                      textAnchor="middle"
                      className="text-[10px] font-mono font-bold fill-sky-800"
                    >
                      {(d.storageCuM / 1000).toFixed(0)}k
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y="202"
                      textAnchor="middle"
                      className="text-[10px] font-mono fill-slate-500 font-medium"
                    >
                      {d.year.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
            <span>2021 Pre-scheme baseline: 32,000 m³</span>
            <span className="text-emerald-700 font-bold">+301% Storage Expansion</span>
          </div>
        </div>

        {/* Right: LULC Distribution Donut (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-600" />
                LULC Area Distribution
              </h3>
              <p className="text-xs text-slate-500">4,850 Hectares Total Catchment</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">7 Classes</span>
          </div>

          {/* Clean Segmented Bars */}
          <div className="space-y-3">
            {LULC_DATA.map((item) => (
              <div
                key={item.code}
                onMouseEnter={() => setHoveredLulc(item.code)}
                onMouseLeave={() => setHoveredLulc(null)}
                className={`p-2 rounded-xl transition-all ${
                  hoveredLulc === item.code ? 'bg-slate-50 ring-1 ring-slate-300' : ''
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-xs shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-slate-800">{item.name}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-bold">
                    {item.percentage}% ({item.areaHa} Ha)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: NDVI Seasonal Curve & Interventions Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Seasonal NDVI Multi-Year Curve (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-emerald-600" />
                Multi-Temporal Vegetative Health (NDVI)
              </h3>
              <p className="text-xs text-slate-500">
                10-Month phenological comparison demonstrating post-intervention photosynthetic stability.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> 2022
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> 2026
              </span>
            </div>
          </div>

          <div className="h-60 w-full">
            <svg className="w-full h-full" viewBox="0 0 650 200" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map((val) => {
                const y = 170 - val * 180;
                return (
                  <g key={val}>
                    <line x1="50" y1={y} x2="620" y2={y} stroke="#f1f5f9" strokeDasharray="3,3" />
                    <text x="40" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                      {val.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Area Under Curve for 2026 */}
              <polygon
                fill="#dcfce7"
                fillOpacity="0.5"
                points={`50,170 ${NDVI_TREND_DATA.map((d, i) => {
                  const x = 65 + i * (540 / (NDVI_TREND_DATA.length - 1));
                  const y = 170 - d.current2026 * 180;
                  return `${x},${y}`;
                }).join(' ')} 605,170`}
              />

              {/* 2022 Line */}
              <polyline
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="4,4"
                points={NDVI_TREND_DATA.map((d, i) => {
                  const x = 65 + i * (540 / (NDVI_TREND_DATA.length - 1));
                  const y = 170 - d.baseline2022 * 180;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* 2026 Line */}
              <polyline
                fill="none"
                stroke="#15803d"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={NDVI_TREND_DATA.map((d, i) => {
                  const x = 65 + i * (540 / (NDVI_TREND_DATA.length - 1));
                  const y = 170 - d.current2026 * 180;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Points & Labels */}
              {NDVI_TREND_DATA.map((d, i) => {
                const x = 65 + i * (540 / (NDVI_TREND_DATA.length - 1));
                const y = 170 - d.current2026 * 180;
                return (
                  <g key={d.month}>
                    <circle cx={x} cy={y} r="3.5" fill="#15803d" />
                    <text
                      x={x}
                      y="192"
                      textAnchor="middle"
                      className="text-[9px] fill-slate-500 font-mono"
                    >
                      {d.month.substring(0, 3)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Intervention Distribution by Category (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Intervention Typology</h3>
            <span className="text-xs font-mono text-slate-500">7 Total</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { type: 'Masonry Check Dams', count: 2, share: 28, color: '#16a34a' },
              { type: 'Farm Ponds', count: 2, share: 28, color: '#0284c7' },
              { type: 'Contour Bunds / CCT', count: 1, share: 15, color: '#92400e' },
              { type: 'Percolation Tanks', count: 1, share: 15, color: '#ea580c' },
              { type: 'Afforestation Plantations', count: 1, share: 14, color: '#059669' }
            ].map((itv) => (
              <div key={itv.type} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{itv.type}</span>
                  <span className="font-mono text-slate-900 font-semibold">{itv.count} Sites</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${itv.share}%`, backgroundColor: itv.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 mt-4 leading-relaxed">
            <strong className="text-slate-800">Analytical Insight:</strong> Continuous contour trenching on steep slopes combined with valley check dams demonstrates highest composite hydrological efficiency.
          </div>
        </div>
      </div>
    </div>
  );
};
