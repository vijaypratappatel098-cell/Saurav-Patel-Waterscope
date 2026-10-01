import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  Sparkles,
  Droplet,
  TreePine,
  ShieldCheck,
  Compass,
  ArrowRight,
  Mountain,
  ChevronDown,
  ChevronUp,
  Layers,
  Calendar,
  User,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import {
  GEO_CODED_IMAGES,
  SUB_WATERSHEDS,
  DRAINAGE_STREAMS,
  WATER_BODIES,
  WATERSHED_INTERVENTIONS,
  WATERSHED_CONFIG
} from '../data/watershedData';
import { GeoCodedImage } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';
import satelliteImg from '../assets/images/satellite_watershed_view_1790767296071.jpg';

interface PhotoMapStoryViewProps {
  initialImageId?: string;
  onNavigate?: (view: string) => void;
}

export const PhotoMapStoryView: React.FC<PhotoMapStoryViewProps> = ({ initialImageId, onNavigate }) => {
  const [selectedImageId, setSelectedImageId] = useState<string>(
    initialImageId || GEO_CODED_IMAGES[0].id
  );
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    location: true,
    satellite: true,
    boundary: true,
    drainage: true,
    vegetation: true,
    waterBodies: true,
    interventions: true
  });

  const activeImage = GEO_CODED_IMAGES.find((img) => img.id === selectedImageId) || GEO_CODED_IMAGES[0];

  // Derive spatial context relationships based on available datasets
  const matchedSubWatershed = SUB_WATERSHEDS.find((sw) => sw.name.includes('Central') && activeImage.category.includes('Check Dam')) ||
    SUB_WATERSHEDS.find((sw) => sw.name.includes('North') && activeImage.category.includes('Contour')) ||
    SUB_WATERSHEDS[1];

  const nearbyDrainageStream = DRAINAGE_STREAMS[0]; // Sina Main Drainage Canal
  const nearbyWaterBody = WATER_BODIES[0]; // Babhulgaon reservoir
  const nearbyIntervention = WATERSHED_INTERVENTIONS.find((itv) => itv.id === activeImage.interventionId) || WATERSHED_INTERVENTIONS[0];

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Spatial Lineage & Context Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Geo-Coded Photo → Map Story
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Trace any ground-truthed mobile field photograph through its full spatial lineage: geographic coordinates, satellite pixel footprint, drainage network, vegetative buffer, and structural intervention context.
          </p>
        </div>

        {/* Image Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">Select Photo:</span>
          <select
            value={selectedImageId}
            onChange={(e) => setSelectedImageId(e.target.value)}
            className="bg-white border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium shadow-xs focus:ring-1 focus:ring-emerald-500"
          >
            {GEO_CODED_IMAGES.map((img) => (
              <option key={img.id} value={img.id}>
                {img.id}: {img.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Photo Selector Thumbnail Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {GEO_CODED_IMAGES.map((img) => {
          const isSelected = img.id === selectedImageId;
          return (
            <button
              key={img.id}
              onClick={() => setSelectedImageId(img.id)}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="relative h-20 w-full rounded-lg overflow-hidden mb-1.5 bg-slate-900">
                <img src={img.thumbnailUrl} alt={img.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[9px] font-mono px-1 rounded">
                  {img.elevationM}m
                </span>
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 truncate">{img.id}</div>
              <div className="text-[11px] font-bold text-slate-900 truncate">{img.category}</div>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Story Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map with Photo Centered (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Ground Truthing Map Position
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                {activeImage.lat.toFixed(5)}°N, {activeImage.lng.toFixed(5)}°E
              </span>
            </div>

            <InteractiveMap
              height="520px"
              selectedImageId={activeImage.id}
              showSidebarControls={false}
            />

            <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="italic text-[11px]">
                Marker pinpoint displays photo azimuth ({activeImage.azimuthDeg}°) & sub-meter GNSS radius (±{activeImage.accuracyM}m).
              </span>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 text-[11px]"
                >
                  <span>Open GIS Map</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Actual Ground Photograph Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                Field Inspection Photograph
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {activeImage.satelliteMatchScore}% Confirmed Ground Truth
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 max-h-72">
              <img src={activeImage.imageUrl} alt={activeImage.title} className="w-full h-72 object-cover" />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-white flex items-center gap-2">
                <span>Azimuth: {activeImage.azimuthDeg}°</span>
                <span>·</span>
                <span>Altitude: {activeImage.elevationM}m AMSL</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-mono">
              <strong>Observation:</strong> {activeImage.observation}
            </p>
          </div>
        </div>

        {/* Right Column: Complete Step-by-Step Spatial Context Lineage (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Spatial Context Tree:</strong> Deconstructing the ground observation through hydrological hierarchy and remote sensing indices.
            </span>
          </div>

          {/* STEP 1: Exact Geographic Location */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">
                  1
                </span>
                <span>Exact Geographic Location & Telemetry</span>
              </div>
              {expandedSections.location ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.location && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono">WGS84 LAT/LNG</span>
                    <span className="font-semibold font-mono text-slate-800">
                      {activeImage.lat.toFixed(5)}°N, {activeImage.lng.toFixed(5)}°E
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono">ELEVATION AMSL</span>
                    <span className="font-semibold font-mono text-slate-800">{activeImage.elevationM} meters</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-mono">GNSS ACCURACY</span>
                    <span className="font-semibold font-mono text-emerald-700">±{activeImage.accuracyM} m</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  Surveyed by: <span className="font-medium text-slate-800">{activeImage.interviewer}</span> on{' '}
                  <span className="font-medium text-slate-800">{activeImage.date}</span> using{' '}
                  <span className="font-mono text-slate-700">{activeImage.device}</span>.
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Satellite View Context */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('satellite')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-mono text-xs">
                  2
                </span>
                <span>Satellite Spectral View (10m Resolution)</span>
              </div>
              {expandedSections.satellite ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.satellite && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    <img src={satelliteImg} alt="Satellite footprint" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">Sentinel-2 MSI Level-2A Orthomosaic</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Ground truth position overlays pixel (X: 1842, Y: 2910) with multi-spectral band alignment score of {activeImage.satelliteMatchScore}%.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Watershed Boundary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('boundary')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-mono text-xs">
                  3
                </span>
                <span>Catchment & Sub-Watershed Boundary</span>
              </div>
              {expandedSections.boundary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.boundary && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <p>
                  Located in: <strong className="text-slate-900">{matchedSubWatershed.name}</strong> ({matchedSubWatershed.code})
                </p>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block">Area</span>
                    <span className="font-bold text-slate-800 font-mono">{matchedSubWatershed.areaHa} Ha</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block">Avg Slope</span>
                    <span className="font-bold text-slate-800 font-mono">{matchedSubWatershed.avgSlopePct}%</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block">Dominant Soil</span>
                    <span className="font-semibold text-slate-800 truncate block">{matchedSubWatershed.dominantSoil}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Nearby Drainage */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('drainage')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-mono text-xs">
                  4
                </span>
                <span>Nearby Drainage Network</span>
              </div>
              {expandedSections.drainage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.drainage && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{nearbyDrainageStream.name}</span>
                  <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
                    Order {nearbyDrainageStream.order} Stream
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Conveys perennial storm drainage across {nearbyDrainageStream.lengthKm} km channel length. Sits within 45m lateral distance of the photo point.
                </p>
              </div>
            )}
          </div>

          {/* STEP 5: Vegetation Context */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('vegetation')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">
                  5
                </span>
                <span>Vegetation & Biomass Context (NDVI)</span>
              </div>
              {expandedSections.vegetation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.vegetation && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Photosynthetic Vigor (NDVI):</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    NDVI 0.68 (Dense Healthy Canopy)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Surrounding parcels show sustained post-monsoon greening through late February, supported by groundwater table recharge.
                </p>
              </div>
            )}
          </div>

          {/* STEP 6: Nearby Water Bodies */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('waterBodies')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-mono text-xs">
                  6
                </span>
                <span>Nearby Water Bodies & Impoundments</span>
              </div>
              {expandedSections.waterBodies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.waterBodies && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{nearbyWaterBody.name}</span>
                  <span className="text-sky-700 font-mono font-bold">{nearbyWaterBody.capacityCuM.toLocaleString()} m³</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Storage Status: <strong className="text-slate-800">{nearbyWaterBody.status}</strong> ({nearbyWaterBody.currentStoragePct}% capacity utilized across {nearbyWaterBody.spreadAreaHa} Ha surface area).
                </p>
              </div>
            )}
          </div>

          {/* STEP 7: Nearby Watershed Interventions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('interventions')}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-mono text-xs">
                  7
                </span>
                <span>Nearby Watershed Interventions</span>
              </div>
              {expandedSections.interventions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.interventions && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{nearbyIntervention.name}</span>
                  <span className="text-orange-700 font-semibold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {nearbyIntervention.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {nearbyIntervention.impactObservation}
                </p>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                  <span>Benefited: <strong>{nearbyIntervention.areaBenefitedHa} Ha</strong></span>
                  <span>Families: <strong>{nearbyIntervention.farmerFamiliesBenefited}</strong></span>
                  <span>Cost: <strong className="font-mono">₹{nearbyIntervention.costInr.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
