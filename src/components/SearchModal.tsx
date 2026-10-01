import React, { useState } from 'react';
import { Search, X, MapPin, Camera, ShieldCheck, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { GEO_CODED_IMAGES, WATERSHED_INTERVENTIONS, SUB_WATERSHEDS, THEMATIC_LAYERS } from '../data/watershedData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, itemId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingImages = GEO_CODED_IMAGES.filter(
    (img) =>
      !q ||
      img.title.toLowerCase().includes(q) ||
      img.id.toLowerCase().includes(q) ||
      img.location.toLowerCase().includes(q) ||
      img.category.toLowerCase().includes(q)
  );

  const matchingInterventions = WATERSHED_INTERVENTIONS.filter(
    (itv) =>
      !q ||
      itv.name.toLowerCase().includes(q) ||
      itv.id.toLowerCase().includes(q) ||
      itv.type.toLowerCase().includes(q) ||
      itv.location.toLowerCase().includes(q)
  );

  const matchingSubWatersheds = SUB_WATERSHEDS.filter(
    (sw) =>
      !q ||
      sw.name.toLowerCase().includes(q) ||
      sw.code.toLowerCase().includes(q) ||
      sw.dominantSoil.toLowerCase().includes(q)
  );

  const matchingLayers = THEMATIC_LAYERS.filter(
    (ly) =>
      !q ||
      ly.name.toLowerCase().includes(q) ||
      ly.category.toLowerCase().includes(q) ||
      ly.description.toLowerCase().includes(q)
  );

  const intelligenceTools = [
    { id: 'intelligence', title: 'Watershed Intelligence Hub', desc: 'Overview of all 12 intelligence modules' },
    { id: 'transformation-slider', title: 'Before / After Watershed Transformation Slider', desc: 'Interactive split-handle slider' },
    { id: 'photo-map-story', title: 'Geo-Coded Photo → Map Story', desc: 'Spatial lineage context for field photos' },
    { id: 'ask-watershed', title: '“Ask the Watershed” AI Assistant', desc: 'Evidence-grounded conversational assistant' },
    { id: 'condition-score', title: 'Explainable Watershed Condition Score (74/100)', desc: 'Multi-criteria AHP health index' },
    { id: 'what-changed', title: '“What Changed Here?” Tool', desc: 'Bi-temporal pixel differential comparison' },
    { id: 'impact-explorer', title: 'Watershed Intervention Impact Explorer', desc: 'Check dams, ponds, bunds audit' },
    { id: 'hotspots', title: 'Intelligent Problem Hotspot Map', desc: 'Priority observation areas & diagnostics' },
    { id: 'layer-mixer', title: 'Advanced GIS Layer Mixer', desc: 'Layer opacity & stack reordering' },
    { id: 'image-validation', title: 'Geo-Coded Image Validation Tool', desc: 'Boundary & EXIF QA audit' },
    { id: 'report-generator', title: 'Automatic Watershed Report Generator', desc: '16-section scientific PDF & JSON export' },
    { id: 'digital-twin', title: 'Digital Watershed Twin', desc: 'Interconnected cyber-physical catchment model' },
    { id: 'data-story', title: 'Watershed Data Story (WHERE to EVIDENCE)', desc: '6-chapter chronological evidence narrative' }
  ];

  const matchingIntelligence = intelligenceTools.filter(
    (t) => !q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search geo-coded images, check dams, sub-catchments, coordinates..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-200 hover:bg-slate-300 px-2.5 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Quick Shortcuts */}
          {!q && (
            <div className="text-xs text-slate-500 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span>Suggested:</span>
              <button
                onClick={() => setQuery('Check Dam')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              >
                Check Dam
              </button>
              <button
                onClick={() => setQuery('Farm Pond')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              >
                Farm Pond
              </button>
              <button
                onClick={() => setQuery('NDVI')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              >
                NDVI
              </button>
              <button
                onClick={() => setQuery('Contour')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
              >
                Contour Bund
              </button>
            </div>
          )}

          {/* Intelligence Modules Results */}
          {matchingIntelligence.length > 0 && q && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Watershed Intelligence Tools ({matchingIntelligence.length})
              </span>
              <div className="space-y-1.5">
                {matchingIntelligence.slice(0, 4).map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onNavigate(tool.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{tool.title}</span>
                        <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                          Tool
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{tool.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geo-Coded Images Results */}
          {matchingImages.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <Camera className="w-3.5 h-3.5 text-emerald-600" /> Geo-Coded Field Photos ({matchingImages.length})
              </span>
              <div className="space-y-1.5">
                {matchingImages.slice(0, 4).map((img) => (
                  <div
                    key={img.id}
                    onClick={() => {
                      onNavigate('geo-images', img.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={img.thumbnailUrl} alt={img.title} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{img.title}</div>
                        <div className="text-[11px] text-slate-500">
                          {img.id} · {img.location} · <span className="font-mono text-emerald-700">{img.category}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interventions */}
          {matchingInterventions.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" /> Watershed Interventions ({matchingInterventions.length})
              </span>
              <div className="space-y-1.5">
                {matchingInterventions.slice(0, 3).map((itv) => (
                  <div
                    key={itv.id}
                    onClick={() => {
                      onNavigate('interventions', itv.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{itv.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {itv.type} · Benefited: {itv.areaBenefitedHa} Ha · Status:{' '}
                        <span className="font-medium text-emerald-700">{itv.status}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thematic Layers */}
          {matchingLayers.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5 text-sky-600" /> Thematic GIS Layers ({matchingLayers.length})
              </span>
              <div className="space-y-1.5">
                {matchingLayers.slice(0, 3).map((ly) => (
                  <div
                    key={ly.id}
                    onClick={() => {
                      onNavigate('thematic-maps', ly.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{ly.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {ly.category} · Sensor: {ly.sensor}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingImages.length === 0 && matchingInterventions.length === 0 && matchingLayers.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No geospatial features match &quot;{query}&quot;. Try searching for &quot;dam&quot;, &quot;pond&quot;, &quot;vegetation&quot; or &quot;contour&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
