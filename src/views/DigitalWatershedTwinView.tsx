import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  Droplet,
  TreePine,
  ShieldCheck,
  Activity,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Mountain,
  Users,
  Info
} from 'lucide-react';
import {
  DIGITAL_TWIN_ELEMENTS,
  WATERSHED_CONFIG,
  SUB_WATERSHEDS,
  WATER_BODIES,
  WATERSHED_INTERVENTIONS
} from '../data/watershedData';
import { DigitalTwinElement } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';

export const DigitalWatershedTwinView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(DIGITAL_TWIN_ELEMENTS[3].id); // Babhulgaon Check Dam default
  const [activeSimulationMode, setActiveSimulationMode] = useState<'hydrology' | 'interventions' | 'agriculture'>('hydrology');

  const activeElement =
    DIGITAL_TWIN_ELEMENTS.find((el) => el.id === selectedNodeId) || DIGITAL_TWIN_ELEMENTS[0];

  // Connected linked elements
  const connectedElements = DIGITAL_TWIN_ELEMENTS.filter(
    (el) => activeElement.connectedTo.includes(el.id) || el.connectedTo.includes(activeElement.id)
  );

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Cyber-Physical Catchment Model</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Digital Watershed Twin
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore interconnected watershed dynamics: see how ridge contour trenches decelerate runoff, recharge valley check dams, elevate the basalt aquifer, and sustain downstream agricultural double-cropping.
          </p>
        </div>

        {/* System Simulation Layer Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSimulationMode('hydrology')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSimulationMode === 'hydrology' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Hydrological Flow
          </button>
          <button
            onClick={() => setActiveSimulationMode('interventions')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSimulationMode === 'interventions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Structure Network
          </button>
          <button
            onClick={() => setActiveSimulationMode('agriculture')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSimulationMode === 'agriculture' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Beneficiary Impact
          </button>
        </div>
      </div>

      {/* Interactive System Flow Topology Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Watershed System Architecture Topology (Ridge to Valley)
            </h3>
            <p className="text-xs text-slate-500">
              Click any node in the digital twin to inspect live telemetry and connected hydrological linkages.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold">
            Live Synchronized Twin
          </span>
        </div>

        {/* Node Flow Representation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
          {DIGITAL_TWIN_ELEMENTS.map((node, i) => {
            const isSelected = node.id === selectedNodeId;
            const isConnected =
              activeElement.connectedTo.includes(node.id) || node.connectedTo.includes(activeElement.id);

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : isConnected
                    ? 'bg-sky-50/50 border-sky-400'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
                    <span>{node.id}</span>
                    <span className="text-emerald-700 font-bold">{node.elevationAMSL.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{node.name}</h4>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded truncate ${
                      node.type === 'Civil Structure'
                        ? 'bg-orange-100 text-orange-800'
                        : node.type === 'Stream Channel'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {node.type.split(' ')[0]}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Active Element Telemetry Dossier (7 cols) + Synchronized GIS Viewport (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Element Telemetry Dossier (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {activeElement.id}
                </span>
                <span className="text-xs text-slate-500 font-medium">{activeElement.type}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{activeElement.name}</h2>
            </div>
            <div className="text-right font-mono text-xs text-slate-500">
              <div>Elevation: <strong className="text-slate-800">{activeElement.elevationAMSL}</strong></div>
              <div>Position: {activeElement.coordinates[0].toFixed(4)}°N, {activeElement.coordinates[1].toFixed(4)}°E</div>
            </div>
          </div>

          {/* Primary Function & Real-time Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">
                Hydrological Function
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">{activeElement.keyFunction}</p>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-[10px] text-emerald-800 font-mono uppercase font-bold block">
                Current Operational State
              </span>
              <p className="text-emerald-950 leading-relaxed font-medium">{activeElement.currentStatus}</p>
            </div>
          </div>

          {/* Live Synchronized Metrics */}
          <div className="grid grid-cols-3 gap-2.5 text-xs">
            {activeElement.activeMetrics.map((m) => (
              <div key={m.label} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-mono">{m.label}</span>
                <strong className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">{m.val}</strong>
              </div>
            ))}
          </div>

          {/* Measured Environmental Impact */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
              Observed Empirical Impact
            </span>
            <p className="text-slate-200 leading-relaxed font-sans">{activeElement.observedImpact}</p>
          </div>

          {/* Upstream / Downstream Linkages */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Hydrologically Linked Elements in Twin:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {connectedElements.map((el) => (
                <button
                  key={el.id}
                  onClick={() => setSelectedNodeId(el.id)}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">{el.type}</span>
                    <strong className="text-slate-800 text-xs truncate block">{el.name}</strong>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Geospatial Viewport (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                Twin Geographic Positioning
              </span>
              <span className="font-mono text-[10px] text-slate-500">Synchronized View</span>
            </div>

            <InteractiveMap height="460px" showSidebarControls={false} />
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 shadow-2xs">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Digital Twin Interconnection:</strong> Elements update based on real-time field measurements and Sentinel-2 multi-spectral observations. Zero synthetic disconnect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
