import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  Maximize2,
  Minimize2,
  Compass,
  Eye,
  Camera,
  Droplet,
  TreePine,
  ShieldCheck,
  Ruler,
  Info
} from 'lucide-react';
import {
  WATERSHED_CONFIG,
  MAIN_WATERSHED_BOUNDARY,
  SUB_WATERSHEDS,
  DRAINAGE_STREAMS,
  WATER_BODIES,
  GEO_CODED_IMAGES,
  WATERSHED_INTERVENTIONS
} from '../data/watershedData';
import { GeoCodedImage, WatershedIntervention } from '../types/watershed';

interface InteractiveMapProps {
  height?: string;
  selectedImageId?: string | null;
  selectedInterventionId?: string | null;
  onSelectImage?: (image: GeoCodedImage) => void;
  onSelectIntervention?: (intervention: WatershedIntervention) => void;
  activeThematicLayer?: string;
  showSidebarControls?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  height = '620px',
  selectedImageId,
  selectedInterventionId,
  onSelectImage,
  onSelectIntervention,
  activeThematicLayer = 'all',
  showSidebarControls = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupsRef = useRef<{ [key: string]: L.LayerGroup }>({});

  const [activeBasemap, setActiveBasemap] = useState<'satellite' | 'bhuvan' | 'streets' | 'topo' | 'light'>('satellite');
  const [layersVisible, setLayersVisible] = useState({
    boundary: true,
    subWatersheds: true,
    drainage: true,
    waterBodies: true,
    interventions: true,
    geoImages: true,
    thematicLulc: activeThematicLayer === 'layer-lulc' || activeThematicLayer === 'all',
    thematicNdvi: activeThematicLayer === 'layer-ndvi'
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<[number, number][]>([]);
  const [measureDistanceKm, setMeasureDistanceKm] = useState<number | null>(null);
  const [activeLegendOpen, setActiveLegendOpen] = useState(true);
  const [mapCursorCoord, setMapCursorCoord] = useState<{ lat: number; lng: number } | null>(null);

  // Basemap Tile Layer URLs
  const basemaps = {
    satellite: {
      name: 'Satellite Orthomosaic',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Esri World Imagery, DigitalGlobe, GeoEye, Earthstar Geographics'
    },
    bhuvan: {
      name: 'ISRO Bhuvan Imagery',
      url: 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wmts/1.0.0/bhuvan_satellite/default/EPSG:3857/{z}/{y}/{x}.jpg',
      attribution: '© ISRO / NRSC Bhuvan, Govt of India'
    },
    streets: {
      name: 'OpenStreetMap Standard',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    topo: {
      name: 'Topographic Relief',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap (CC-BY-SA)'
    },
    light: {
      name: 'Clean CartoDB Light',
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '© CartoDB, © OpenStreetMap'
    }
  };

  const basemapTileRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: WATERSHED_CONFIG.center,
      zoom: WATERSHED_CONFIG.defaultZoom,
      zoomControl: false,
      attributionControl: false
    });

    // Add Attribution in corner
    L.control.attribution({ position: 'bottomright', prefix: 'Waterscope GIS | ISRO Bhuvan & Copernicus Sentinel-2' }).addTo(map);

    // Initial tile layer
    const initialTile = L.tileLayer(basemaps[activeBasemap].url, {
      attribution: basemaps[activeBasemap].attribution,
      maxZoom: 19
    }).addTo(map);
    basemapTileRef.current = initialTile;

    // Track mouse coordinates
    map.on('mousemove', (e) => {
      setMapCursorCoord({
        lat: Number(e.latlng.lat.toFixed(5)),
        lng: Number(e.latlng.lng.toFixed(5))
      });
    });

    // Create Layer Groups
    layerGroupsRef.current = {
      boundary: L.layerGroup().addTo(map),
      subWatersheds: L.layerGroup().addTo(map),
      drainage: L.layerGroup().addTo(map),
      waterBodies: L.layerGroup().addTo(map),
      interventions: L.layerGroup().addTo(map),
      geoImages: L.layerGroup().addTo(map),
      measurement: L.layerGroup().addTo(map)
    };

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap when state changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (basemapTileRef.current) {
      map.removeLayer(basemapTileRef.current);
    }

    const newTile = L.tileLayer(basemaps[activeBasemap].url, {
      attribution: basemaps[activeBasemap].attribution,
      maxZoom: 19
    }).addTo(map);

    // Ensure tile stays at the bottom
    newTile.bringToBack();
    basemapTileRef.current = newTile;
  }, [activeBasemap]);

  // Render Geospatial Vector Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const groups = layerGroupsRef.current;
    if (!map || !groups.boundary) return;

    // 1. Watershed Outer Boundary
    groups.boundary.clearLayers();
    if (layersVisible.boundary) {
      const boundaryPolygon = L.polygon(MAIN_WATERSHED_BOUNDARY, {
        color: '#7C3AED',
        weight: 3.5,
        opacity: 0.95,
        dashArray: '6, 6',
        fillColor: '#8B5CF6',
        fillOpacity: 0.08
      });
      boundaryPolygon.bindTooltip(
        `<div class="p-1 font-sans text-xs font-semibold text-slate-800">
           <strong>Watershed Boundary:</strong> ${WATERSHED_CONFIG.name}<br/>
           <span class="text-slate-500">Area: ${WATERSHED_CONFIG.totalAreaHa.toLocaleString()} Hectares</span>
         </div>`,
        { sticky: true }
      );
      groups.boundary.addLayer(boundaryPolygon);
    }

    // 2. Sub-Watersheds
    groups.subWatersheds.clearLayers();
    if (layersVisible.subWatersheds) {
      SUB_WATERSHEDS.forEach((sw) => {
        const poly = L.polygon(sw.coordinates, {
          color: sw.color,
          weight: 2,
          opacity: 0.85,
          fillColor: sw.color,
          fillOpacity: 0.18
        });

        poly.bindPopup(`
          <div class="p-2 text-xs font-sans max-w-xs">
            <div class="flex items-center gap-1.5 pb-1 mb-1 border-b border-slate-200">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${sw.color}"></span>
              <strong class="text-sm font-semibold text-slate-900">${sw.name}</strong>
            </div>
            <p class="text-slate-600 mb-1">Code: <span class="font-mono text-slate-800 font-medium">${sw.code}</span> · Area: <strong class="text-slate-800">${sw.areaHa} Ha</strong></p>
            <p class="text-slate-600 mb-1">Avg Slope: <strong>${sw.avgSlopePct}%</strong> · Max Stream Order: <strong>Order ${sw.maxStreamOrder}</strong></p>
            <p class="text-slate-600 mb-1.5">Dominant Soil: <span class="text-slate-700">${sw.dominantSoil}</span></p>
            <div class="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-700 italic">
              Need: ${sw.primaryInterventionNeed}
            </div>
          </div>
        `);
        groups.subWatersheds.addLayer(poly);

        // Center Label Marker
        const labelIcon = L.divIcon({
          className: 'subwatershed-label',
          html: `<div class="px-2 py-0.5 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur rounded shadow-md border border-white/20 whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2">${sw.code}</div>`,
          iconSize: [40, 20]
        });
        const labelMarker = L.marker(sw.center, { icon: labelIcon });
        groups.subWatersheds.addLayer(labelMarker);
      });
    }

    // 3. Drainage Stream Network
    groups.drainage.clearLayers();
    if (layersVisible.drainage) {
      DRAINAGE_STREAMS.forEach((stream) => {
        let weight = 2;
        let color = '#38BDF8';
        if (stream.order === 4) {
          weight = 4.5;
          color = '#0284C7';
        } else if (stream.order === 3) {
          weight = 3.5;
          color = '#0EA5E9';
        } else if (stream.order === 2) {
          weight = 2.5;
          color = '#38BDF8';
        } else {
          weight = 1.5;
          color = '#7DD3FC';
        }

        const line = L.polyline(stream.coordinates, {
          color,
          weight,
          opacity: 0.9,
          lineCap: 'round',
          lineJoin: 'round'
        });

        line.bindTooltip(
          `<div class="text-xs font-sans">
             <strong>${stream.name}</strong> (Order ${stream.order})<br/>
             <span class="text-slate-500">Flow: ${stream.type} · Length: ${stream.lengthKm} km</span>
           </div>`,
          { sticky: true }
        );
        groups.drainage.addLayer(line);
      });
    }

    // 4. Water Bodies
    groups.waterBodies.clearLayers();
    if (layersVisible.waterBodies) {
      WATER_BODIES.forEach((wb) => {
        const radius = Math.max(12, Math.min(30, Math.sqrt(wb.capacityCuM) * 0.15));
        const circle = L.circleMarker([wb.lat, wb.lng], {
          radius,
          fillColor: '#0284C7',
          color: '#FFFFFF',
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.75
        });

        circle.bindPopup(`
          <div class="p-2 text-xs font-sans max-w-xs">
            <div class="flex items-center gap-1.5 pb-1 mb-1 border-b border-slate-200">
              <span class="p-1 text-white bg-sky-600 rounded">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </span>
              <strong class="text-sm font-semibold text-slate-900">${wb.name}</strong>
            </div>
            <p class="text-slate-600 mb-1">Type: <span class="font-medium text-slate-800">${wb.type}</span></p>
            <p class="text-slate-600 mb-1">Capacity: <strong class="text-slate-900 font-mono">${wb.capacityCuM.toLocaleString()} m³</strong></p>
            <p class="text-slate-600 mb-1">Water Spread: <strong>${wb.spreadAreaHa} Ha</strong></p>
            <div class="mt-2 flex items-center justify-between text-[11px] bg-sky-50 text-sky-800 p-1.5 rounded border border-sky-200">
              <span>Storage Status</span>
              <span class="font-semibold">${wb.status} (${wb.currentStoragePct}%)</span>
            </div>
          </div>
        `);
        groups.waterBodies.addLayer(circle);
      });
    }

    // 5. Interventions Points
    groups.interventions.clearLayers();
    if (layersVisible.interventions) {
      WATERSHED_INTERVENTIONS.forEach((itv) => {
        const isSelected = selectedInterventionId === itv.id;
        const statusColor =
          itv.status === 'Completed'
            ? '#16A34A'
            : itv.status === 'Ongoing'
            ? '#0284C7'
            : '#EA580C';

        const customMarker = L.divIcon({
          className: 'intervention-marker',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ${
              isSelected ? 'scale-125 ring-4 ring-orange-400' : ''
            }">
              <div class="w-8 h-8 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white" style="background-color: ${statusColor}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white" style="background-color: ${statusColor}"></span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([itv.lat, itv.lng], { icon: customMarker });
        marker.on('click', () => {
          if (onSelectIntervention) onSelectIntervention(itv);
        });

        marker.bindPopup(`
          <div class="p-2 text-xs font-sans max-w-sm">
            <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200">
              <span class="font-semibold text-slate-900">${itv.name}</span>
              <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${
                itv.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }">${itv.status}</span>
            </div>
            <p class="text-slate-600 mb-1">Type: <strong>${itv.type}</strong></p>
            <p class="text-slate-600 mb-1">Benefited: <strong>${itv.areaBenefitedHa} Ha</strong> (${itv.farmerFamiliesBenefited} Farm Families)</p>
            <p class="text-slate-600 mb-2">Cost: <strong class="font-mono">₹${itv.costInr.toLocaleString('en-IN')}</strong></p>
            <div class="rounded overflow-hidden mb-2 border border-slate-200">
              <img src="${itv.afterImageUrl}" alt="${itv.name}" class="w-full h-24 object-cover" />
            </div>
            <p class="text-slate-700 italic text-[11px] bg-slate-50 p-1.5 rounded border border-slate-200 mb-2">${itv.impactObservation}</p>
          </div>
        `);
        groups.interventions.addLayer(marker);
      });
    }

    // 6. Geo-Coded Ground Field Images
    groups.geoImages.clearLayers();
    if (layersVisible.geoImages) {
      GEO_CODED_IMAGES.forEach((geo) => {
        const isSelected = selectedImageId === geo.id;
        const iconHtml = `
          <div class="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ${
            isSelected ? 'scale-125 ring-4 ring-emerald-400' : ''
          }">
            <div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white"></div>
          </div>
        `;

        const cameraMarkerIcon = L.divIcon({
          className: 'geocoded-image-marker',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([geo.lat, geo.lng], { icon: cameraMarkerIcon });
        marker.on('click', () => {
          if (onSelectImage) onSelectImage(geo);
        });

        marker.bindPopup(`
          <div class="p-2 text-xs font-sans max-w-xs">
            <div class="flex items-center justify-between pb-1 mb-1 border-b border-slate-200">
              <span class="font-semibold text-slate-900">${geo.title}</span>
              <span class="text-[10px] text-slate-500 font-mono">${geo.id}</span>
            </div>
            <div class="rounded overflow-hidden mb-1.5 border border-slate-200">
              <img src="${geo.thumbnailUrl}" alt="${geo.title}" class="w-full h-24 object-cover" />
            </div>
            <p class="text-slate-600 mb-0.5">Category: <strong>${geo.category}</strong></p>
            <p class="text-slate-600 mb-0.5">Date: <span>${geo.date}</span> · Elevation: <span class="font-mono">${geo.elevationM}m</span></p>
            <p class="text-slate-600 mb-1.5 font-mono text-[10px]">${geo.lat.toFixed(5)}°N, ${geo.lng.toFixed(5)}°E</p>
            <p class="text-slate-700 bg-emerald-50 text-[11px] p-1.5 rounded border border-emerald-200 mb-2">${geo.observation}</p>
          </div>
        `);
        groups.geoImages.addLayer(marker);
      });
    }
  }, [layersVisible, selectedImageId, selectedInterventionId, onSelectImage, onSelectIntervention]);

  // Handle Measurement Click Tool
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.measurement;
    if (!map || !group) return;

    if (!isMeasuring) {
      group.clearLayers();
      setMeasurePoints([]);
      setMeasureDistanceKm(null);
      return;
    }

    const handleClick = (e: L.LeafletMouseEvent) => {
      const newPt: [number, number] = [e.latlng.lat, e.latlng.lng];
      setMeasurePoints((prev) => {
        const next = [...prev, newPt];

        group.clearLayers();

        // Draw points and line
        next.forEach((pt, i) => {
          const m = L.circleMarker(pt, { radius: 5, color: '#EA580C', fillColor: '#FED7AA', fillOpacity: 1 });
          m.bindTooltip(`Point ${i + 1}`, { permanent: false });
          group.addLayer(m);
        });

        if (next.length > 1) {
          const polyline = L.polyline(next, { color: '#EA580C', weight: 3, dashArray: '4, 4' });
          group.addLayer(polyline);

          // Calculate distance in km
          let distMeters = 0;
          for (let i = 0; i < next.length - 1; i++) {
            const p1 = L.latLng(next[i][0], next[i][1]);
            const p2 = L.latLng(next[i + 1][0], next[i + 1][1]);
            distMeters += p1.distanceTo(p2);
          }
          setMeasureDistanceKm(Number((distMeters / 1000).toFixed(2)));
        }

        return next;
      });
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [isMeasuring]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(WATERSHED_CONFIG.center, WATERSHED_CONFIG.defaultZoom);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''
      }`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Top Control Bar */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-md">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {WATERSHED_CONFIG.name}
        </span>
        <span className="text-slate-300">|</span>
        {/* Basemap Switcher */}
        <div className="flex items-center gap-1">
          {(['satellite', 'bhuvan', 'topo', 'streets', 'light'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setActiveBasemap(b)}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeBasemap === b
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {b === 'satellite' ? 'Satellite' : b === 'bhuvan' ? 'Bhuvan' : b === 'topo' ? 'Terrain' : b === 'streets' ? 'Streets' : 'Light'}
            </button>
          ))}
        </div>
      </div>

      {/* Top Right Tool Buttons */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5">
        {/* Measure Tool */}
        <button
          onClick={() => {
            setIsMeasuring(!isMeasuring);
            if (isMeasuring) {
              setMeasurePoints([]);
              setMeasureDistanceKm(null);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg shadow-md border transition-all ${
            isMeasuring
              ? 'bg-amber-600 text-white border-amber-700'
              : 'bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Click points on map to measure linear distance"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>{isMeasuring ? 'Measuring...' : 'Measure'}</span>
        </button>

        {/* Reset View */}
        <button
          onClick={handleResetView}
          className="p-2 bg-white/95 text-slate-700 hover:text-slate-900 rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-all"
          title="Reset to Watershed Center"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-white/95 text-slate-700 hover:text-slate-900 rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-all"
          title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Measurement Active Display */}
      {isMeasuring && (
        <div className="absolute top-16 right-3 z-[1000] bg-white/95 backdrop-blur p-2.5 rounded-lg border border-amber-200 shadow-lg text-xs max-w-xs animate-in fade-in">
          <div className="flex items-center justify-between gap-3 font-semibold text-slate-800 mb-1">
            <span className="flex items-center gap-1 text-amber-700">
              <Ruler className="w-3.5 h-3.5" /> Distance Measurement
            </span>
            <button
              onClick={() => {
                setMeasurePoints([]);
                setMeasureDistanceKm(null);
              }}
              className="text-[10px] text-slate-500 hover:text-red-600 underline"
            >
              Reset
            </button>
          </div>
          <p className="text-slate-600 text-[11px] mb-1">Click on the map to add measurement vertices along streams or ridges.</p>
          {measureDistanceKm !== null ? (
            <div className="mt-1 p-1.5 bg-amber-50 rounded border border-amber-200 font-mono text-amber-900 font-bold text-sm">
              Total Length: {measureDistanceKm} km
            </div>
          ) : (
            <div className="text-[10px] text-slate-400 italic">Click 2 or more points...</div>
          )}
        </div>
      )}

      {/* Layer Visibility Drawer (Left Side) */}
      {showSidebarControls && (
        <div className="absolute top-16 left-3 z-[1000] bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 shadow-lg p-2.5 max-w-xs max-h-[calc(100%-80px)] overflow-y-auto">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              GIS Layer Stack
            </span>
            <span className="text-[10px] text-slate-400 font-mono">6 Layers Active</span>
          </div>

          <div className="space-y-1.5">
            {/* Boundary */}
            <label className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-purple-600"></span>
                <span className="font-medium text-slate-700">Watershed Boundary</span>
              </div>
              <input
                type="checkbox"
                checked={layersVisible.boundary}
                onChange={(e) => setLayersVisible({ ...layersVisible, boundary: e.target.checked })}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </label>

            {/* Sub-Watersheds */}
            <label className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/40 border border-purple-500"></span>
                <span className="font-medium text-slate-700">Sub-Catchments (A-D)</span>
              </div>
              <input
                type="checkbox"
                checked={layersVisible.subWatersheds}
                onChange={(e) => setLayersVisible({ ...layersVisible, subWatersheds: e.target.checked })}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </label>

            {/* Drainage Network */}
            <label className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-sky-500"></span>
                <span className="font-medium text-slate-700">Streams & Drainage</span>
              </div>
              <input
                type="checkbox"
                checked={layersVisible.drainage}
                onChange={(e) => setLayersVisible({ ...layersVisible, drainage: e.target.checked })}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </label>

            {/* Water Bodies */}
            <label className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs">
              <div className="flex items-center gap-2">
                <Droplet className="w-3 h-3 text-sky-600" />
                <span className="font-medium text-slate-700">Water Bodies & Tanks</span>
              </div>
              <input
                type="checkbox"
                checked={layersVisible.waterBodies}
                onChange={(e) => setLayersVisible({ ...layersVisible, waterBodies: e.target.checked })}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </label>

            {/* Interventions */}
            <label className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-orange-600" />
                <span className="font-medium text-slate-700">Watershed Interventions</span>
              </div>
              <input
                type="checkbox"
                checked={layersVisible.interventions}
                onChange={(e) => setLayersVisible({ ...layersVisible, interventions: e.target.checked })}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </label>

            {/* Geo-Coded Images */}
            <label className="flex items-center justify-between gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs">
              <div className="flex items-center gap-2">
                <Camera className="w-3 h-3 text-emerald-600" />
                <span className="font-medium text-slate-700">Geo-Coded Photos</span>
              </div>
              <input
                type="checkbox"
                checked={layersVisible.geoImages}
                onChange={(e) => setLayersVisible({ ...layersVisible, geoImages: e.target.checked })}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>
      )}

      {/* Collapsible Map Legend (Bottom Left) */}
      <div className="absolute bottom-6 left-3 z-[1000] bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 shadow-md p-2.5 max-w-xs transition-all">
        <button
          onClick={() => setActiveLegendOpen(!activeLegendOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 pb-1 mb-1 border-b border-slate-100"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-500" /> Map Cartographic Legend
          </span>
          <span className="text-[10px] text-slate-400">{activeLegendOpen ? 'Hide' : 'Show'}</span>
        </button>

        {activeLegendOpen && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] pt-1 text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-purple-600"></span>
              <span>Catchment Divide</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white"></span>
              <span>Geo-Coded Photo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-sky-600 rounded-sm"></span>
              <span>Trunk Stream (O4)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 border border-white"></span>
              <span>Intervention Site</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-sky-300"></span>
              <span>Seasonal Tributary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500/80"></span>
              <span>Water Body / Tank</span>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Cursor Coordinates Bar (Bottom Right) */}
      <div className="absolute bottom-2 right-3 z-[1000] hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono border border-slate-700">
        <span>Datum: WGS84</span>
        <span>·</span>
        <span>
          Cursor: {mapCursorCoord ? `${mapCursorCoord.lat}°N, ${mapCursorCoord.lng}°E` : '18.82500°N, 74.96000°E'}
        </span>
      </div>
    </div>
  );
};
