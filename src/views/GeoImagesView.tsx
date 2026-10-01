import React, { useState } from 'react';
import {
  Camera,
  Search,
  Filter,
  MapPin,
  Calendar,
  Compass,
  Mountain,
  Eye,
  ExternalLink,
  Sparkles,
  Download,
  CheckCircle2,
  Grid,
  Map as MapIcon
} from 'lucide-react';
import { GEO_CODED_IMAGES, WATERSHED_CONFIG } from '../data/watershedData';
import { GeoCodedImage, GeoCategory } from '../types/watershed';
import { InteractiveMap } from '../components/InteractiveMap';

interface GeoImagesViewProps {
  onSelectImage: (image: GeoCodedImage) => void;
  onViewOnDashboard: (image: GeoCodedImage) => void;
}

export const GeoImagesView: React.FC<GeoImagesViewProps> = ({ onSelectImage, onViewOnDashboard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');
  const [activeHoverImage, setActiveHoverImage] = useState<GeoCodedImage | null>(null);

  const categories: { label: string; count: number }[] = [
    { label: 'all', count: GEO_CODED_IMAGES.length },
    { label: 'Check Dam', count: GEO_CODED_IMAGES.filter((i) => i.category === 'Check Dam').length },
    { label: 'Farm Pond', count: GEO_CODED_IMAGES.filter((i) => i.category === 'Farm Pond').length },
    { label: 'Contour Bund', count: GEO_CODED_IMAGES.filter((i) => i.category === 'Contour Bund').length },
    { label: 'Percolation Tank', count: GEO_CODED_IMAGES.filter((i) => i.category === 'Percolation Tank').length },
    { label: 'Agricultural Land', count: GEO_CODED_IMAGES.filter((i) => i.category === 'Agricultural Land').length },
    { label: 'Soil Condition', count: GEO_CODED_IMAGES.filter((i) => i.category === 'Soil Condition').length }
  ];

  const filteredImages = GEO_CODED_IMAGES.filter((img) => {
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      img.title.toLowerCase().includes(q) ||
      img.id.toLowerCase().includes(q) ||
      img.location.toLowerCase().includes(q) ||
      img.observation.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Ground Truth Imagery Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Geo-Coded Image Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Field photographs with embedded GNSS coordinates, compass azimuth, and observation metadata linking ground reality to remote sensing pixels.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards Grid</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map + Cards Split</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.label
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label === 'all' ? 'All Images' : cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search image ID, sector, notes..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Split View with Mini Map or Grid View */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Map */}
          <div className="lg:col-span-6 sticky top-20">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs">
              <InteractiveMap
                height="540px"
                selectedImageId={activeHoverImage?.id}
                onSelectImage={(img) => {
                  setActiveHoverImage(img);
                  onSelectImage(img);
                }}
                showSidebarControls={false}
              />
              <div className="p-2 text-center text-xs text-slate-500">
                Click any camera marker on the map to inspect full ground observation.
              </div>
            </div>
          </div>

          {/* Right: Scrollable Cards Grid */}
          <div className="lg:col-span-6 space-y-4 max-h-[750px] overflow-y-auto pr-1">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onMouseEnter={() => setActiveHoverImage(img)}
                className={`bg-white rounded-2xl border p-4 shadow-xs transition-all flex flex-col sm:flex-row gap-4 ${
                  activeHoverImage?.id === img.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative">
                  <img src={img.thumbnailUrl} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
                    {img.category}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold text-slate-400">{img.id}</span>
                      <span className="text-[10px] font-mono text-slate-500">{img.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{img.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {img.observation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      {img.lat.toFixed(4)}°N, {img.lng.toFixed(4)}°E
                    </span>
                    <button
                      onClick={() => onSelectImage(img)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Standard 3-Column Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 overflow-hidden transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold text-emerald-400 border border-white/20">
                    {img.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-white flex items-center gap-1.5 border border-white/20">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{img.lat.toFixed(4)}°N, {img.lng.toFixed(4)}°E</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-amber-300">
                    {img.satelliteMatchScore}% Match
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{img.id}</span>
                    <span>{img.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {img.title}
                  </h3>

                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{img.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {img.observation}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onSelectImage(img)}
                  className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect Details
                </button>
                <button
                  onClick={() => onViewOnDashboard(img)}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  title="View on Main GIS Dashboard"
                >
                  <span>Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
