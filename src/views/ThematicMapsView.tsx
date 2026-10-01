import React, { useState } from 'react';
import {
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  Eye,
  CheckCircle2,
  Filter,
  Info
} from 'lucide-react';
import { THEMATIC_LAYERS } from '../data/watershedData';
import { ThematicLayerInfo } from '../types/watershed';

interface ThematicMapsViewProps {
  onLoadLayerInDashboard: (layerId: string) => void;
}

export const ThematicMapsView: React.FC<ThematicMapsViewProps> = ({ onLoadLayerInDashboard }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeLayerDetail, setActiveLayerDetail] = useState<ThematicLayerInfo | null>(THEMATIC_LAYERS[0]);

  const categories = ['all', 'Terrain', 'Hydrology', 'Land Cover', 'Interventions', 'Indices'];

  const filteredLayers = THEMATIC_LAYERS.filter(
    (l) => selectedFilter === 'all' || l.category === selectedFilter
  );

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Thematic Cartography Repository</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Thematic Maps Gallery
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Ten research-grade thematic layers produced by fusing high-resolution Sentinel-2, SRTM DEM, and mobile geo-coded ground truth plots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">10 Specialized Cartographic Layers</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter Theme:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              selectedFilter === cat
                ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'All 10 Maps' : cat}
          </button>
        ))}
      </div>

      {/* 10 Thematic Maps Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLayers.map((layer, idx) => (
          <div
            key={layer.id}
            className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 overflow-hidden transition-all flex flex-col justify-between"
          >
            <div>
              {/* Preview Cartographic Bar */}
              <div
                className="h-28 relative p-4 flex flex-col justify-between text-white overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${layer.color}dd 0%, #0f172a 100%)`
                }}
              >
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="font-mono text-[10px] bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                    Layer 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono bg-white/20 backdrop-blur px-2 py-0.5 rounded">
                    {layer.resolution}
                  </span>
                </div>

                <div className="z-10">
                  <span className="text-[10px] uppercase tracking-wider text-slate-200 font-mono">
                    {layer.category}
                  </span>
                  <h3 className="text-base font-bold text-white drop-shadow-sm">{layer.name}</h3>
                </div>

                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                  {layer.description}
                </p>

                {/* Sensor & Date */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Sensor / Dataset:</span>
                    <span className="text-slate-800 font-medium truncate block">{layer.sensor}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Calibration Epoch:</span>
                    <span className="text-slate-800 font-medium">{layer.date}</span>
                  </div>
                </div>

                {/* Legend Preview Swatches */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Legend Classes ({layer.legend.length})
                  </span>
                  <div className="space-y-1">
                    {layer.legend.slice(0, 3).map((leg) => (
                      <div key={leg.label} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-xs shrink-0"
                            style={{ backgroundColor: leg.color }}
                          ></span>
                          <span className="text-slate-700 truncate">{leg.label}</span>
                        </div>
                        {leg.value && (
                          <span className="font-mono text-slate-400 text-[10px] shrink-0 ml-2">
                            {leg.value}
                          </span>
                        )}
                      </div>
                    ))}
                    {layer.legend.length > 3 && (
                      <div className="text-[10px] text-slate-400 italic">
                        +{layer.legend.length - 3} additional classes...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-5 pt-0">
              <button
                onClick={() => onLoadLayerInDashboard(layer.id)}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Layer in GIS Dashboard</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
