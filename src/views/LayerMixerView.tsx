import React, { useState } from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  Sliders,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Droplet,
  TreePine,
  ShieldCheck,
  Camera,
  AlertTriangle,
  RotateCcw,
  Compass
} from 'lucide-react';
import { THEMATIC_LAYERS, WATERSHED_CONFIG } from '../data/watershedData';
import { InteractiveMap } from '../components/InteractiveMap';

interface MixerLayer {
  id: string;
  name: string;
  category: string;
  visible: boolean;
  opacity: number; // 0 to 100
  color: string;
  description: string;
}

export const LayerMixerView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const initialLayers: MixerLayer[] = [
    {
      id: 'layer-boundary',
      name: 'Catchment Boundary & Sub-Watersheds',
      category: 'Boundary',
      visible: true,
      opacity: 100,
      color: '#7C3AED',
      description: 'Topographical divide polygon and 4 micro-catchments'
    },
    {
      id: 'layer-drainage',
      name: 'Hydrological Drainage & Stream Hierarchy',
      category: 'Hydrology',
      visible: true,
      opacity: 90,
      color: '#0EA5E9',
      description: 'Strahler stream orders 1 through 4 (38.6 km network)'
    },
    {
      id: 'layer-water',
      name: 'Surface Water Reservoirs & Ponds',
      category: 'Hydrology',
      visible: true,
      opacity: 85,
      color: '#0284C7',
      description: '23 water bodies impounding 128,500 m³ volume'
    },
    {
      id: 'layer-interventions',
      name: 'Watershed Civil & Biological Structures',
      category: 'Interventions',
      visible: true,
      opacity: 95,
      color: '#EA580C',
      description: 'Check dams, farm ponds, percolation tanks, and contour bunds'
    },
    {
      id: 'layer-geo-images',
      name: 'Geo-Coded Ground Field Photos',
      category: 'Ground Truth',
      visible: true,
      opacity: 100,
      color: '#16A34A',
      description: '6 RTK sub-meter surveyed ground validation photos'
    },
    {
      id: 'layer-lulc',
      name: 'Land Use / Land Cover (LULC) Classification',
      category: 'Land Cover',
      visible: true,
      opacity: 70,
      color: '#059669',
      description: 'Supervised Random Forest classification into 7 land cover classes'
    },
    {
      id: 'layer-ndvi',
      name: 'NDVI Vegetation Vigor & Biomass',
      category: 'Indices',
      visible: false,
      opacity: 65,
      color: '#22C55E',
      description: 'Sentinel-2 NIR/Red band reflectance showing crop canopy health'
    },
    {
      id: 'layer-hotspots',
      name: 'Intelligent Problem Hotspot Areas',
      category: 'Diagnostics',
      visible: false,
      opacity: 80,
      color: '#D97706',
      description: 'Gully erosion, silt delta, and unbuffered irrigation zones'
    }
  ];

  const [layers, setLayers] = useState<MixerLayer[]>(initialLayers);
  const [selectedLayerId, setSelectedLayerId] = useState<string>(initialLayers[0].id);

  // Toggle Visibility
  const toggleVisibility = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  // Change Opacity
  const handleOpacityChange = (id: string, opacity: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity } : l))
    );
  };

  // Move Layer Up
  const moveLayerUp = (index: number) => {
    if (index === 0) return;
    setLayers((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Move Layer Down
  const moveLayerDown = (index: number) => {
    if (index === layers.length - 1) return;
    setLayers((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Reset to Defaults
  const resetMixer = () => {
    setLayers(initialLayers);
  };

  const activeLayer = layers.find((l) => l.id === selectedLayerId) || layers[0];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Cartographic Compositor</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Advanced GIS Layer Mixer
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Fine-tune layer visibility, opacity blending, and vertical stack ordering to analyze spatial intersections between civil structures, drainage networks, and vegetative vigor.
          </p>
        </div>

        <button
          onClick={resetMixer}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Main Mixer Layout: Left Map Viewport (7 cols) + Right Stack Mixer Controls (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Map Container with Composite Rendering (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                Live Blended GIS Canvas
              </span>
              <span className="font-mono text-slate-500 text-[11px]">
                {layers.filter((l) => l.visible).length} of {layers.length} Layers Rendered
              </span>
            </div>

            <InteractiveMap height="560px" showSidebarControls={false} />
          </div>

          {/* Quick Blend State Readout */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700">Active Blend Order (Top to Bottom):</span>
            {layers
              .filter((l) => l.visible)
              .map((l, i) => (
                <span
                  key={l.id}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white flex items-center gap-1"
                  style={{ backgroundColor: l.color }}
                >
                  <span>{i + 1}.</span> {l.name.split(' ')[0]} ({l.opacity}%)
                </span>
              ))}
          </div>
        </div>

        {/* Right: Layer Mixer Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Layer Stack Mixer (Reorder & Opacity)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Drag or Use Arrows</span>
          </div>

          {/* Layers List */}
          <div className="space-y-2.5">
            {layers.map((layer, idx) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`p-3 rounded-xl border transition-all text-xs space-y-2 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-50 border-emerald-500 ring-1 ring-emerald-500/20 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVisibility(layer.id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          layer.visible ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                        }`}
                        title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                      <span className={`font-semibold ${layer.visible ? 'text-slate-900' : 'text-slate-400 line-through'}`}>
                        {layer.name}
                      </span>
                    </div>

                    {/* Up / Down Reorder Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveLayerUp(idx);
                        }}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                        title="Move Up in Stack"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveLayerDown(idx);
                        }}
                        disabled={idx === layers.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                        title="Move Down in Stack"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Opacity Slider */}
                  {layer.visible && (
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">Opacity:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.opacity}
                        onChange={(e) => handleOpacityChange(layer.id, Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-1.5 bg-slate-200 rounded-lg accent-emerald-600 cursor-pointer"
                      />
                      <span className="text-[11px] font-mono font-bold text-slate-700 w-8 text-right shrink-0">
                        {layer.opacity}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Layer Details */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
              Selected Layer Description
            </span>
            <p className="font-medium text-slate-800">{activeLayer.name}</p>
            <p className="text-[11px] text-slate-500">{activeLayer.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
