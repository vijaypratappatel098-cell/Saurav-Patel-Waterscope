import React, { useState } from 'react';
import {
  Compass,
  ArrowLeftRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Droplet,
  TreePine,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { GEO_CODED_IMAGES, WATERSHED_INTERVENTIONS } from '../data/watershedData';
import satelliteImg from '../assets/images/satellite_watershed_view_1790767296071.jpg';

export const ComparisonView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [comparisonMode, setComparisonMode] = useState<'slider' | 'side-by-side'>('slider');

  const currentItem = GEO_CODED_IMAGES[selectedIdx];

  // Associated satellite interpretation features
  const interpretationData = [
    {
      imageId: 'GEO-IMG-2026-081',
      lulcClassification: 'Perennial Surface Impoundment (LULC-WAT)',
      vegetationStatus: 'Dense Riparian Vegetation (NDVI 0.68)',
      waterPresence: 'Permanent Open Water (NDWI +0.42)',
      interventionType: 'Masonry Check Dam (Capacity: 22,000 m³)',
      satelliteObservation: '10m Sentinel-2 band 8/4 contrast shows clear high moisture halo extending 450m downstream.',
      spectralSignatures: { red: 0.08, nir: 0.44, swir: 0.12 }
    },
    {
      imageId: 'GEO-IMG-2026-094',
      lulcClassification: 'Irrigated Agriculture - Rabi Double Crop (LULC-AG-2)',
      vegetationStatus: 'Vigorous Crop Canopy (NDVI 0.74)',
      waterPresence: 'Lined Farm Pond Stored Volume (NDWI +0.38)',
      interventionType: 'Individual Farm Pond with HDPE Membrane',
      satelliteObservation: 'Rectangular 30x30m pond clearly detected in 10m optical reflectance; crop parcel NDVI confirms double cropping.',
      spectralSignatures: { red: 0.05, nir: 0.58, swir: 0.14 }
    },
    {
      imageId: 'GEO-IMG-2026-108',
      lulcClassification: 'Deciduous Scrub & Ridge Afforestation (LULC-FOR)',
      vegetationStatus: 'Emerging Agro-Forestry Saplings (NDVI 0.52)',
      waterPresence: 'Moisture Retention in Contour Bunds',
      interventionType: 'Continuous Contour Trenches (CCT)',
      satelliteObservation: 'Hillside slope shows 35% reduction in bare soil surface reflectance (SWIR); terracing lines visible on ALOS DEM.',
      spectralSignatures: { red: 0.14, nir: 0.36, swir: 0.22 }
    }
  ];

  const currentInterp = interpretationData[selectedIdx] || interpretationData[0];

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Ground Truthing vs Remote Sensing</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Field Reality vs Satellite Perspective
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Demonstrating how ground-level geo-coded photography and multi-spectral satellite rasters complement each other for objective watershed assessment.
          </p>
        </div>

        {/* Mode Switcher & Multi-Temporal Link */}
        <div className="flex flex-wrap items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('transformation-slider')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Multi-Temporal Slider (6 Sites)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setComparisonMode('slider')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                comparisonMode === 'slider' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Interactive Slider
            </button>
            <button
              onClick={() => setComparisonMode('side-by-side')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                comparisonMode === 'side-by-side' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>
      </div>

      {/* Target Selector Bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Select Ground Truth Pair:</span>
          <div className="flex items-center gap-1.5">
            {GEO_CODED_IMAGES.slice(0, 3).map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedIdx === idx
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {img.category} ({img.id})
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          Item {selectedIdx + 1} of 3
        </div>
      </div>

      {/* Main Interactive Comparison Display */}
      {comparisonMode === 'slider' ? (
        <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900 select-none">
          {/* Right Layer: Satellite View (Underneath) */}
          <div className="absolute inset-0">
            <img
              src={satelliteImg}
              alt="High-resolution satellite view"
              className="w-full h-full object-cover"
            />
            {/* Label in top-right */}
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-mono">
              <span className="text-sky-400 font-bold">Satellite Perspective:</span> Sentinel-2 MSI (10m True Color)
            </div>
          </div>

          {/* Left Layer: Geo-Coded Field Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
            {/* Label in top-left */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-mono">
              <span className="text-emerald-400 font-bold">Field Reality:</span> Geo-Tagged Handheld Photo
            </div>
          </div>

          {/* Vertical Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center border-2 border-emerald-600">
              <ArrowLeftRight className="w-4 h-4 text-emerald-700" />
            </div>
          </div>

          {/* Invisible Draggable Range Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
          />

          {/* Bottom Floating Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/85 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-medium border border-white/20 pointer-events-none">
            ← Drag slider left or right to compare field reality with satellite orthomosaic →
          </div>
        </div>
      ) : (
        /* Side-by-Side Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
            <div className="p-3 bg-slate-900 text-white text-xs font-mono border-b border-slate-800 flex items-center justify-between">
              <span className="text-emerald-400 font-bold">LEFT: Ground Field Reality</span>
              <span>{currentItem.id}</span>
            </div>
            <img src={currentItem.imageUrl} alt={currentItem.title} className="w-full h-96 object-cover" />
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
            <div className="p-3 bg-slate-900 text-white text-xs font-mono border-b border-slate-800 flex items-center justify-between">
              <span className="text-sky-400 font-bold">RIGHT: Corresponding Satellite Orthomosaic</span>
              <span>10m Sentinel-2 MSI</span>
            </div>
            <img src={satelliteImg} alt="Satellite view" className="w-full h-96 object-cover" />
          </div>
        </div>
      )}

      {/* Comparison Scientific Telemetry & Ground Truthing Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{currentItem.title}</h3>
            <p className="text-xs text-slate-500 font-mono">
              Coordinates: {currentItem.lat.toFixed(5)}°N, {currentItem.lng.toFixed(5)}°E · Datum WGS84
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 self-start sm:self-auto">
            Spectral Cross-Validation Match: {currentItem.satelliteMatchScore}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Ground Inspection Attributes */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
              1. Ground Field Inspection Data
            </span>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Location:</span>
                <strong className="text-slate-800">{currentItem.location}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date of Field Photo:</span>
                <strong className="text-slate-800">{currentItem.date}</strong>
              </div>
              <div className="flex justify-between">
                <span>Surveyor:</span>
                <span className="text-slate-800">{currentItem.interviewer}</span>
              </div>
              <div className="flex justify-between">
                <span>Azimuth / Compass Bearing:</span>
                <strong className="text-slate-800 font-mono">{currentItem.azimuthDeg}°</strong>
              </div>
              <div className="flex justify-between">
                <span>Horizontal Accuracy:</span>
                <strong className="text-emerald-700 font-mono">±{currentItem.accuracyM} m</strong>
              </div>
            </div>
          </div>

          {/* Remote Sensing Interpretation */}
          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200 space-y-2.5">
            <span className="font-bold text-sky-950 uppercase tracking-wider text-[11px] block">
              2. Remote Sensing Pixel Analysis
            </span>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>LULC Classification:</span>
                <strong className="text-sky-900">{currentInterp.lulcClassification}</strong>
              </div>
              <div className="flex justify-between">
                <span>Vegetation Index:</span>
                <strong className="text-emerald-700 font-mono">{currentInterp.vegetationStatus}</strong>
              </div>
              <div className="flex justify-between">
                <span>Water Presence:</span>
                <strong className="text-sky-800 font-mono">{currentInterp.waterPresence}</strong>
              </div>
              <div className="flex justify-between">
                <span>Intervention Class:</span>
                <strong className="text-slate-800">{currentInterp.interventionType}</strong>
              </div>
            </div>
          </div>

          {/* Scientific Synthesis & Conclusion */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2.5">
            <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] block">
              3. Cross-Validation Synthesis
            </span>
            <p className="text-slate-700 leading-relaxed">
              {currentInterp.satelliteObservation}
            </p>
            <div className="pt-2 border-t border-emerald-200/80 text-[11px] text-emerald-900 font-medium">
              Conclusion: Field reality confirms that satellite spectral reflectance peaks correspond directly with operational masonry storage and healthy Rabi crop canopy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
