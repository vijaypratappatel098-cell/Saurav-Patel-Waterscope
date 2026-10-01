import React from 'react';
import { X, MapPin, Compass, Mountain, Calendar, User, Smartphone, Sparkles, ExternalLink, Download, ShieldCheck } from 'lucide-react';
import { GeoCodedImage } from '../types/watershed';

interface GeoImageModalProps {
  image: GeoCodedImage | null;
  onClose: () => void;
  onViewOnMap: (image: GeoCodedImage) => void;
  onViewMapStory?: (image: GeoCodedImage) => void;
  onValidateImage?: (image: GeoCodedImage) => void;
}

export const GeoImageModal: React.FC<GeoImageModalProps> = ({ image, onClose, onViewOnMap, onViewMapStory, onValidateImage }) => {
  if (!image) return null;

  const downloadGeoJSON = () => {
    const geojson = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [image.lng, image.lat, image.elevationM]
      },
      properties: {
        id: image.id,
        title: image.title,
        category: image.category,
        date: image.date,
        location: image.location,
        azimuthDeg: image.azimuthDeg,
        accuracyM: image.accuracyM,
        interviewer: image.interviewer,
        device: image.device,
        observation: image.observation,
        fieldNotes: image.fieldNotes,
        satelliteMatchScore: image.satelliteMatchScore,
        watershed: image.watershed,
        subWatershed: image.subWatershed
      }
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${image.id}_ground_truth.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                {image.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">Category: {image.category}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{image.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Image View */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 max-h-80 flex items-center justify-center group">
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-mono flex items-center gap-3 border border-white/20">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {image.lat.toFixed(5)}°N, {image.lng.toFixed(5)}°E
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                {image.azimuthDeg}° Bearing
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3 text-slate-400" /> Inspection Date
              </span>
              <span className="text-xs font-semibold text-slate-800">{image.date}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Mountain className="w-3 h-3 text-slate-400" /> Elevation AMSL
              </span>
              <span className="text-xs font-semibold font-mono text-slate-800">{image.elevationM} meters</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Smartphone className="w-3 h-3 text-slate-400" /> GNSS Accuracy
              </span>
              <span className="text-xs font-semibold font-mono text-emerald-700">±{image.accuracyM} m</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Satellite Match
              </span>
              <span className="text-xs font-semibold font-mono text-amber-700">{image.satelliteMatchScore}% Confirmed</span>
            </div>
          </div>

          {/* Observations & Field Notes */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Ground Observation</h4>
              <p className="text-sm text-slate-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 leading-relaxed">
                {image.observation}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Technical Surveyor Field Notes</h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-mono">
                {image.fieldNotes}
              </p>
            </div>
          </div>

          {/* Lineage & Location */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Location Sector:</span>
              <span className="font-medium text-slate-800">{image.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Micro-Catchment:</span>
              <span className="font-medium text-slate-800">{image.subWatershed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Surveyor / Inquirer:</span>
              <span className="font-medium text-slate-800">{image.interviewer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hardware Terminal:</span>
              <span className="font-medium text-slate-800">{image.device}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
          <button
            onClick={downloadGeoJSON}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export GeoJSON
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer"
            >
              Close
            </button>
            {onViewMapStory && (
              <button
                onClick={() => {
                  onViewMapStory(image);
                  onClose();
                }}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Map Story</span>
              </button>
            )}
            {onValidateImage && (
              <button
                onClick={() => {
                  onValidateImage(image);
                  onClose();
                }}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Validate QA</span>
              </button>
            )}
            <button
              onClick={() => {
                onViewOnMap(image);
                onClose();
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> View on GIS Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
