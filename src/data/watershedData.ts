import {
  GeoCodedImage,
  SubWatershed,
  WaterBodyFeature,
  DrainageStream,
  WatershedIntervention,
  ThematicLayerInfo,
  SpatialChangeItem,
  DecisionInsight,
  LULCClass,
  MethodologyStage,
  TransformationPair,
  ConditionScoreComponent,
  HotspotArea,
  ValidationReport,
  DigitalTwinElement,
  DataStoryChapter
} from '../types/watershed';

// Image assets generated for genuine ground truthing
import imgCheckDam from '../assets/images/geocoded_check_dam_1790767255940.jpg';
import imgFarmPond from '../assets/images/geocoded_farm_pond_1790767270216.jpg';
import imgSoilContour from '../assets/images/geocoded_soil_contour_1790767281514.jpg';
import imgSatelliteView from '../assets/images/satellite_watershed_view_1790767296071.jpg';

export const WATERSHED_CONFIG = {
  name: 'Upper Sina Micro-Catchment #4B1A2',
  state: 'Maharashtra / Semi-Arid Deccan Plateau',
  center: [18.825, 74.960] as [number, number],
  defaultZoom: 13,
  totalAreaHa: 4850,
  totalPopulation: 14200,
  averageRainfallMm: 540,
  drainageDensityKmPerKm2: 2.34,
  elevationRangeM: '620m - 885m AMSL',
  baselineYear: 2022,
  currentYear: 2026,
  isDemoData: true,
  dataSourceNote: 'Sample Visualization Data: SRISHTI-DRISHTI Satellite Ingestion & Geo-Tagged Ground Mobile Survey'
};

// Main Outer Watershed Boundary Polygon
export const MAIN_WATERSHED_BOUNDARY: [number, number][] = [
  [18.868, 74.920],
  [18.875, 74.952],
  [18.865, 74.985],
  [18.845, 75.012],
  [18.815, 75.018],
  [18.785, 74.995],
  [18.775, 74.960],
  [18.782, 74.925],
  [18.810, 74.905],
  [18.842, 74.908],
  [18.868, 74.920]
];

// Sub-Watersheds (Micro-catchments)
export const SUB_WATERSHEDS: SubWatershed[] = [
  {
    id: 'SW-01',
    name: 'North Ridge Sub-Catchment',
    code: '4B1A2-A',
    areaHa: 1120,
    drainageDensity: 2.8,
    maxStreamOrder: 3,
    avgSlopePct: 14.5,
    dominantSoil: 'Shallow Gravelly Loam',
    color: '#059669', // Emerald
    center: [18.855, 74.945],
    primaryInterventionNeed: 'Contour bunding & ridge afforestation to curb peak runoff velocity.',
    coordinates: [
      [18.868, 74.920],
      [18.875, 74.952],
      [18.865, 74.985],
      [18.845, 74.960],
      [18.835, 74.935],
      [18.842, 74.908],
      [18.868, 74.920]
    ]
  },
  {
    id: 'SW-02',
    name: 'Central Valley Agricultural Belt',
    code: '4B1A2-B',
    areaHa: 1640,
    drainageDensity: 2.1,
    maxStreamOrder: 4,
    avgSlopePct: 3.8,
    dominantSoil: 'Medium Deep Black Soil (Vertisols)',
    color: '#0284C7', // Sky Blue
    center: [18.825, 74.965],
    primaryInterventionNeed: 'Farm ponds, masonry check dams & micro-irrigation feeder channels.',
    coordinates: [
      [18.845, 74.960],
      [18.865, 74.985],
      [18.845, 75.012],
      [18.815, 75.005],
      [18.810, 74.955],
      [18.835, 74.935],
      [18.845, 74.960]
    ]
  },
  {
    id: 'SW-03',
    name: 'Eastern Pediment & Drainage Sink',
    code: '4B1A2-C',
    areaHa: 890,
    drainageDensity: 2.6,
    maxStreamOrder: 4,
    avgSlopePct: 7.2,
    dominantSoil: 'Clayey Alluvium with Calcareous Nodules',
    color: '#D97706', // Amber
    center: [18.805, 74.995],
    primaryInterventionNeed: 'Percolation tanks and desilting existing water bodies.',
    coordinates: [
      [18.845, 75.012],
      [18.815, 75.018],
      [18.785, 74.995],
      [18.790, 74.975],
      [18.815, 75.005],
      [18.845, 75.012]
    ]
  },
  {
    id: 'SW-04',
    name: 'South-Western Terrace Catchment',
    code: '4B1A2-D',
    areaHa: 1200,
    drainageDensity: 1.9,
    maxStreamOrder: 3,
    avgSlopePct: 9.8,
    dominantSoil: 'Coarse Loamy Skeletal Soil',
    color: '#7C3AED', // Violet
    center: [18.795, 74.935],
    primaryInterventionNeed: 'Gully plugs, loose boulder structures & agro-horticulture.',
    coordinates: [
      [18.835, 74.935],
      [18.810, 74.955],
      [18.790, 74.975],
      [18.785, 74.995],
      [18.775, 74.960],
      [18.782, 74.925],
      [18.810, 74.905],
      [18.835, 74.935]
    ]
  }
];

// Drainage Stream Network
export const DRAINAGE_STREAMS: DrainageStream[] = [
  // Trunk Stream (Order 4)
  {
    id: 'STR-01',
    name: 'Sina Main Drainage Canal',
    order: 4,
    type: 'Perennial',
    lengthKm: 8.6,
    coordinates: [
      [18.865, 74.940],
      [18.848, 74.952],
      [18.835, 74.962],
      [18.820, 74.970],
      [18.805, 74.982],
      [18.785, 74.992]
    ]
  },
  // Order 3 Tributaries
  {
    id: 'STR-02',
    name: 'North-West Ridge Stream',
    order: 3,
    type: 'Seasonal',
    lengthKm: 4.8,
    coordinates: [
      [18.870, 74.925],
      [18.855, 74.932],
      [18.848, 74.952]
    ]
  },
  {
    id: 'STR-03',
    name: 'Eastern Catchment Feeder',
    order: 3,
    type: 'Seasonal',
    lengthKm: 5.1,
    coordinates: [
      [18.840, 75.008],
      [18.828, 74.990],
      [18.820, 74.970]
    ]
  },
  // Order 2 Streams
  {
    id: 'STR-04',
    name: 'South Terrace Tributary',
    order: 2,
    type: 'Seasonal',
    lengthKm: 3.4,
    coordinates: [
      [18.782, 74.935],
      [18.795, 74.952],
      [18.805, 74.982]
    ]
  },
  {
    id: 'STR-05',
    name: 'Khadki Valley Nala',
    order: 2,
    type: 'Ephemeral',
    lengthKm: 2.8,
    coordinates: [
      [18.860, 74.975],
      [18.845, 74.972],
      [18.835, 74.962]
    ]
  },
  // Order 1 Streams (Gullies)
  {
    id: 'STR-06',
    name: 'High Ridge Gully 1',
    order: 1,
    type: 'Ephemeral',
    lengthKm: 1.5,
    coordinates: [
      [18.865, 74.915],
      [18.858, 74.928]
    ]
  },
  {
    id: 'STR-07',
    name: 'High Ridge Gully 2',
    order: 1,
    type: 'Ephemeral',
    lengthKm: 1.2,
    coordinates: [
      [18.838, 75.015],
      [18.832, 75.002]
    ]
  }
];

// Geo-Coded Ground Field Images (Linked with ground truthing photos)
export const GEO_CODED_IMAGES: GeoCodedImage[] = [
  {
    id: 'GEO-IMG-2026-081',
    title: 'Masonry Check Dam Impoundment Survey',
    lat: 18.8352,
    lng: 74.9625,
    date: '14 Jan 2026',
    location: 'Stream Junction 3A, Babhulgaon Sector',
    category: 'Check Dam',
    watershed: 'Upper Sina Micro-Catchment #4B1A2',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    observation: 'Constructed spillway retaining 18,500 m³ water at 85% storage capacity. Substantial rise in groundwater table noticed in 6 downstream open wells.',
    fieldNotes: 'Sedimentation level minimal (approx 4%). Downstream vegetative buffer thriving. Sluice gate functional.',
    imageUrl: imgCheckDam,
    thumbnailUrl: imgCheckDam,
    elevationM: 678,
    azimuthDeg: 215,
    accuracyM: 2.4,
    interviewer: 'Dr. S. Kulkarni (Senior Hydrologist)',
    device: 'Trimble TDC600 GIS Handheld GNSS',
    satelliteMatchScore: 96,
    interventionId: 'INT-CD-01',
    beforeAfterType: 'After'
  },
  {
    id: 'GEO-IMG-2026-094',
    title: 'Individual Farm Pond with HDPE Membrane',
    lat: 18.8270,
    lng: 74.9740,
    date: '22 Jan 2026',
    location: 'Plot #114, Shindewadi Farm Cluster',
    category: 'Farm Pond',
    watershed: 'Upper Sina Micro-Catchment #4B1A2',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    observation: '30m x 30m x 3m farm pond storing 2,700 m³ harvested rainwater. Farmer reports 2 supplementary irrigations for Rabi onion and pomegranate crops.',
    fieldNotes: 'Lining intact with zero seepage. Surrounding onion plots show high NDVI chlorophyll spectral response.',
    imageUrl: imgFarmPond,
    thumbnailUrl: imgFarmPond,
    elevationM: 662,
    azimuthDeg: 140,
    accuracyM: 1.8,
    interviewer: 'R. Patwardhan (Watershed Field Officer)',
    device: 'Leica Zeno GG04 Plus RTK',
    satelliteMatchScore: 98,
    interventionId: 'INT-FP-03',
    beforeAfterType: 'After'
  },
  {
    id: 'GEO-IMG-2026-108',
    title: 'Contour Continuous Trenches & Hillside Afforestation',
    lat: 18.8580,
    lng: 74.9380,
    date: '04 Feb 2026',
    location: 'Upper Ridge Slope, Goutamtekdi Forest Fringe',
    category: 'Contour Bund',
    watershed: 'Upper Sina Micro-Catchment #4B1A2',
    subWatershed: 'North Ridge Sub-Catchment (SW-01)',
    observation: 'Continuous contour trenches spaced at 8m intervals with native neem, acacia & custard apple saplings. Soil erosion reduced by an estimated 72%.',
    fieldNotes: 'Vegetation survival rate is 89%. Zero rill or gully scouring observed after recent post-monsoon showers.',
    imageUrl: imgSoilContour,
    thumbnailUrl: imgSoilContour,
    elevationM: 792,
    azimuthDeg: 78,
    accuracyM: 3.1,
    interviewer: 'A. Deshmukh (Agro-Forestry Specialist)',
    device: 'Garmin GPSMAP 66sr',
    satelliteMatchScore: 92,
    interventionId: 'INT-CB-02',
    beforeAfterType: 'After'
  },
  {
    id: 'GEO-IMG-2026-120',
    title: 'Percolation Tank Water Spread Ground Truth',
    lat: 18.8055,
    lng: 74.9880,
    date: '18 Feb 2026',
    location: 'East Nala Depression, Chincholi Village',
    category: 'Percolation Tank',
    watershed: 'Upper Sina Micro-Catchment #4B1A2',
    subWatershed: 'Eastern Pediment & Drainage Sink (SW-03)',
    observation: 'Expanded reservoir perimeter matches Sentinel-2 NDWI spectral boundary within 4.2m margin of error.',
    fieldNotes: 'Water depth monitored at staff gauge: 3.8m. Silt accumulation index is low after community desilting drive in May 2024.',
    imageUrl: imgCheckDam,
    thumbnailUrl: imgCheckDam,
    elevationM: 645,
    azimuthDeg: 310,
    accuracyM: 2.1,
    interviewer: 'M. Shinde (Geospatial Analyst)',
    device: 'Trimble TDC600 GIS Handheld GNSS',
    satelliteMatchScore: 95,
    interventionId: 'INT-PT-01',
    beforeAfterType: 'After'
  },
  {
    id: 'GEO-IMG-2026-135',
    title: 'Rabi Double Cropping Cluster Ground Verification',
    lat: 18.8180,
    lng: 74.9450,
    date: '25 Feb 2026',
    location: 'Sina River Floodplain, Wafgaon',
    category: 'Agricultural Land',
    watershed: 'Upper Sina Micro-Catchment #4B1A2',
    subWatershed: 'South-Western Terrace Catchment (SW-04)',
    observation: 'Former single-season fallow land converted into productive double-cropping ground utilizing check dam water diversion channels.',
    fieldNotes: 'Wheat and gram crops showing uniform canopy development. Soil moisture sensor indicates 28% volumetric content.',
    imageUrl: imgFarmPond,
    thumbnailUrl: imgFarmPond,
    elevationM: 655,
    azimuthDeg: 45,
    accuracyM: 2.6,
    interviewer: 'Dr. P. Patil (Agronomist)',
    device: 'Leica Zeno GG04 Plus RTK',
    satelliteMatchScore: 94,
    beforeAfterType: 'After'
  },
  {
    id: 'GEO-IMG-2026-148',
    title: 'Gully Scour & Boulder Bund Stabilization',
    lat: 18.8620,
    lng: 74.9680,
    date: '02 Mar 2026',
    location: 'Sub-Basin Ridge Tributary 1B',
    category: 'Soil Condition',
    watershed: 'Upper Sina Micro-Catchment #4B1A2',
    subWatershed: 'North Ridge Sub-Catchment (SW-01)',
    observation: 'Loose boulder check structure arrested headward gully erosion. Sediment trapped upstream reaches 0.45m thickness.',
    fieldNotes: 'Local grasses colonizing trapped silt deposits, natural vegetative biological revetment occurring.',
    imageUrl: imgSoilContour,
    thumbnailUrl: imgSoilContour,
    elevationM: 745,
    azimuthDeg: 195,
    accuracyM: 2.9,
    interviewer: 'R. Patwardhan (Watershed Field Officer)',
    device: 'Garmin GPSMAP 66sr',
    satelliteMatchScore: 91,
    interventionId: 'INT-GP-04',
    beforeAfterType: 'After'
  }
];

// Water Bodies
export const WATER_BODIES: WaterBodyFeature[] = [
  {
    id: 'WB-01',
    name: 'Babhulgaon Main Masonry Reservoir',
    type: 'Masonry Check Dam',
    lat: 18.8352,
    lng: 74.9625,
    capacityCuM: 22000,
    spreadAreaHa: 2.8,
    yearBuilt: 2023,
    status: 'High Storage',
    currentStoragePct: 88
  },
  {
    id: 'WB-02',
    name: 'Shindewadi Cluster Farm Pond #1',
    type: 'Earthen Farm Pond',
    lat: 18.8270,
    lng: 74.9740,
    capacityCuM: 3000,
    spreadAreaHa: 0.25,
    yearBuilt: 2024,
    status: 'Functional',
    currentStoragePct: 75
  },
  {
    id: 'WB-03',
    name: 'Chincholi Community Percolation Tank',
    type: 'Village Percolation Tank',
    lat: 18.8055,
    lng: 74.9880,
    capacityCuM: 45000,
    spreadAreaHa: 5.6,
    yearBuilt: 2022,
    status: 'Functional',
    currentStoragePct: 82
  },
  {
    id: 'WB-04',
    name: 'Khadki Valley Earthen Nala Bund',
    type: 'Stream Impoundment',
    lat: 18.8460,
    lng: 74.9690,
    capacityCuM: 14000,
    spreadAreaHa: 1.9,
    yearBuilt: 2023,
    status: 'High Storage',
    currentStoragePct: 90
  },
  {
    id: 'WB-05',
    name: 'Wafgaon Secondary Check Dam',
    type: 'Masonry Check Dam',
    lat: 18.8185,
    lng: 74.9490,
    capacityCuM: 16500,
    spreadAreaHa: 2.1,
    yearBuilt: 2024,
    status: 'Functional',
    currentStoragePct: 79
  }
];

// Watershed Interventions Registry
export const WATERSHED_INTERVENTIONS: WatershedIntervention[] = [
  {
    id: 'INT-CD-01',
    name: 'Babhulgaon Masonry Check Dam (CD-01)',
    type: 'Check Dam',
    lat: 18.8352,
    lng: 74.9625,
    date: '15 Mar 2023',
    status: 'Completed',
    areaBenefitedHa: 68,
    farmerFamiliesBenefited: 42,
    costInr: 1250000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgCheckDam,
    impactObservation: 'Recharged 6 downstream open borewells; increased water table by +3.2m during post-monsoon testing.',
    location: 'Babhulgaon Nala Junction',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  },
  {
    id: 'INT-FP-03',
    name: 'Shindewadi High-Efficiency Farm Pond Cluster',
    type: 'Farm Pond',
    lat: 18.8270,
    lng: 74.9740,
    date: '10 Nov 2023',
    status: 'Completed',
    areaBenefitedHa: 24,
    farmerFamiliesBenefited: 16,
    costInr: 340000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgFarmPond,
    impactObservation: 'Assures 2 critical supplementary irrigations for high-value horticulture (Pomegranate and Onion).',
    location: 'Shindewadi Farm Sector',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  },
  {
    id: 'INT-CB-02',
    name: 'Goutamtekdi Continuous Contour Trenches (CCT)',
    type: 'Contour Bund',
    lat: 18.8580,
    lng: 74.9380,
    date: '20 Jul 2023',
    status: 'Completed',
    areaBenefitedHa: 140,
    farmerFamiliesBenefited: 85,
    costInr: 890000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgSoilContour,
    impactObservation: 'Arrested topsoil erosion by 72%; vegetative survival index is 89% with high biomass accumulation.',
    location: 'Goutamtekdi Ridge',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  },
  {
    id: 'INT-PT-01',
    name: 'Chincholi Deep Percolation Tank Renovation',
    type: 'Percolation Tank',
    lat: 18.8055,
    lng: 74.9880,
    date: '05 May 2024',
    status: 'Completed',
    areaBenefitedHa: 110,
    farmerFamiliesBenefited: 64,
    costInr: 1680000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgCheckDam,
    impactObservation: 'Desilted 12,000 m³ clayey silt, applied back to farm fields; restored 45,000 m³ percolation capacity.',
    location: 'Chincholi Village East',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  },
  {
    id: 'INT-PL-05',
    name: 'Silvopastoral Ridge Green Buffer Afforestation',
    type: 'Plantation',
    lat: 18.8650,
    lng: 74.9450,
    date: '15 Aug 2024',
    status: 'Ongoing',
    areaBenefitedHa: 52,
    farmerFamiliesBenefited: 30,
    costInr: 450000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgSoilContour,
    impactObservation: '14,000 native species planted (Gliricidia, Subabul, Bamboo); 78% canopy establishment to date.',
    location: 'North Watershed Rim',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  },
  {
    id: 'INT-RS-02',
    name: 'Sub-Surface Recharge Shaft on Nala Bed',
    type: 'Recharge Structure',
    lat: 18.8220,
    lng: 74.9580,
    date: '10 Jan 2025',
    status: 'Ongoing',
    areaBenefitedHa: 38,
    farmerFamiliesBenefited: 22,
    costInr: 280000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgFarmPond,
    impactObservation: 'Directly injects filtered stream runoff into deep basalt aquifer fracture zones.',
    location: 'Central Floodplain Zone',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  },
  {
    id: 'INT-GP-04',
    name: 'Loose Boulder Gully Plugs (Package of 18)',
    type: 'Check Dam',
    lat: 18.8620,
    lng: 74.9680,
    date: '12 Nov 2025',
    status: 'Planned',
    areaBenefitedHa: 45,
    farmerFamiliesBenefited: 28,
    costInr: 320000,
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgSoilContour,
    impactObservation: 'Planned for Phase 3 runoff velocity attenuation across steep 1st order stream gullies.',
    location: 'North-East Ridge Sector',
    watershedName: 'Upper Sina Micro-Catchment #4B1A2'
  }
];

// Thematic Maps Registry
export const THEMATIC_LAYERS: ThematicLayerInfo[] = [
  {
    id: 'layer-lulc',
    name: 'Land Use / Land Cover (LULC) Classification',
    category: 'Land Cover',
    description: 'High-resolution supervised random-forest classification of multi-spectral Sentinel-2 imagery calibrated with geo-coded ground truth plots.',
    resolution: '10m Spatial Resolution',
    sensor: 'Sentinel-2 MSI (S2B)',
    date: 'January 2026',
    color: '#059669',
    legend: [
      { label: 'Intensive Agriculture (Double Cropped)', color: '#16A34A', value: '1,890 Ha (39.0%)' },
      { label: 'Single Crop / Fallow Agriculture', color: '#EAB308', value: '780 Ha (16.1%)' },
      { label: 'Deciduous Scrub & Forest', color: '#15803D', value: '640 Ha (13.2%)' },
      { label: 'Surface Water Reservoirs & Impoundments', color: '#0284C7', value: '315 Ha (6.5%)' },
      { label: 'Barren Rocky Terrain & Wasteland', color: '#92400E', value: '710 Ha (14.6%)' },
      { label: 'Built-up / Rural Settlements', color: '#DC2626', value: '265 Ha (5.5%)' },
      { label: 'Grassland / Pasture', color: '#84CC16', value: '250 Ha (5.1%)' }
    ]
  },
  {
    id: 'layer-ndvi',
    name: 'Normalized Difference Vegetation Index (NDVI)',
    category: 'Indices',
    description: 'Quantifies photosynthetic biomass vigor using (NIR - Red) / (NIR + Red) band calculations, demonstrating vegetative improvement post-intervention.',
    resolution: '10m Surface Reflectance',
    sensor: 'Sentinel-2 / Landsat-9 OLI',
    date: 'February 2026',
    color: '#22C55E',
    legend: [
      { label: 'Dense Healthy Canopy (NDVI > 0.60)', color: '#14532D', value: 'High vigor' },
      { label: 'Moderate Canopy / Crops (NDVI 0.40 - 0.60)', color: '#22C55E', value: 'Moderate vigor' },
      { label: 'Sparse Vegetation / Shrub (NDVI 0.20 - 0.40)', color: '#FACC15', value: 'Sparse vigor' },
      { label: 'Bare Soil / Rock (NDVI 0.05 - 0.20)', color: '#D97706', value: 'Non-vegetated' },
      { label: 'Water Bodies (NDVI < 0.05)', color: '#0284C7', value: 'Surface water' }
    ]
  },
  {
    id: 'layer-drainage',
    name: 'Hydrological Stream Network & Drainage Density',
    category: 'Hydrology',
    description: 'Strahler stream order classification computed from SRTM 30m Digital Elevation Model (DEM) hydro-enforced drainage sinks.',
    resolution: '30m Hydrologically Conditioned DEM',
    sensor: 'Shuttle Radar Topography Mission (SRTM)',
    date: 'November 2025',
    color: '#0EA5E9',
    legend: [
      { label: 'Order 4 Trunk Stream (Main Sina Nala)', color: '#0369A1', value: '8.6 km' },
      { label: 'Order 3 Secondary Stream (Seasonal)', color: '#0284C7', value: '9.9 km' },
      { label: 'Order 2 Minor Tributary', color: '#38BDF8', value: '6.2 km' },
      { label: 'Order 1 Headwater Gully Channels', color: '#BAE6FD', value: '4.8 km' }
    ]
  },
  {
    id: 'layer-water',
    name: 'Surface Water & Storage Water Bodies',
    category: 'Hydrology',
    description: 'Normalized Difference Water Index (NDWI) delineating perennial impoundments, masonry check dams, percolation tanks, and private farm ponds.',
    resolution: '10m Water Extent',
    sensor: 'Sentinel-2 NDWI Band Inversion',
    date: 'January 2026',
    color: '#0284C7',
    legend: [
      { label: 'Perennial Reservoirs & Impoundments', color: '#0C4A6E', value: '5 Major' },
      { label: 'Community Farm Ponds & Percolation', color: '#0284C7', value: '18 Units' },
      { label: 'Seasonal Ponding & Saturated Depressions', color: '#7DD3FC', value: 'Seasonal' }
    ]
  },
  {
    id: 'layer-soil',
    name: 'Soil Texture, Depth & Infiltration Capacity',
    category: 'Terrain',
    description: 'Classified soil series map indicating clay Vertisols in low-slope valleys, gravelly loam on pediments, and shallow lithosols on upper ridges.',
    resolution: '1:50,000 Scale Soil Survey',
    sensor: 'NBSS&LUP Ground Survey + Sentinel RS',
    date: 'October 2025',
    color: '#B45309',
    legend: [
      { label: 'Deep Black Vertisols (High Moisture Capacity)', color: '#451A03', value: 'Deep valley' },
      { label: 'Medium Black Soils (Moderate Infiltration)', color: '#78350F', value: 'Mid-slopes' },
      { label: 'Shallow Gravelly Skeletal Soil (Erosive)', color: '#B45309', value: 'Upper ridges' },
      { label: 'Clayey Alluvium with Lime Nodules', color: '#D97706', value: 'Downstream sink' }
    ]
  },
  {
    id: 'layer-elevation',
    name: 'Digital Elevation Model (DEM) & Relief Topography',
    category: 'Terrain',
    description: 'Hypsometric elevation contour tinting showing ridge-to-valley profile, guiding contour trenches and boulder gully plugs along contour contours.',
    resolution: '12.5m ALOS PALSAR / SRTM DEM',
    sensor: 'ALOS PALSAR RTC',
    date: 'December 2025',
    color: '#854D0E',
    legend: [
      { label: 'Ridge Zone (780m - 885m AMSL)', color: '#78350F', value: 'High relief' },
      { label: 'Pediment Shoulder (700m - 780m AMSL)', color: '#B45309', value: 'Moderate relief' },
      { label: 'Mid-Slope Cultivated (650m - 700m AMSL)', color: '#CA8A04', value: 'Gentle slope' },
      { label: 'Valley Floor & River Plain (620m - 650m AMSL)', color: '#16A34A', value: 'Flat alluvial' }
    ]
  },
  {
    id: 'layer-slope',
    name: 'Slope Gradient & Runoff Velocity Potential',
    category: 'Terrain',
    description: 'Percent slope distribution highlighting zones susceptible to flash runoff and sheet erosion requiring biological or mechanical soil conservation.',
    resolution: '12.5m Spatial Resolution',
    sensor: 'DEM Derivatives',
    date: 'December 2025',
    color: '#DC2626',
    legend: [
      { label: 'Steep Slopes > 15% (Erosion Hotspot)', color: '#991B1B', value: 'Continuous trenches' },
      { label: 'Moderate Slopes 8% - 15%', color: '#EA580C', value: 'Graded bunds' },
      { label: 'Gentle Slopes 3% - 8%', color: '#EAB308', value: 'Contour farming' },
      { label: 'Nearly Level < 3% (Deposition Plain)', color: '#22C55E', value: 'Broadbed furrow' }
    ]
  },
  {
    id: 'layer-interventions',
    name: 'Geospatial Intervention Density & Status',
    category: 'Interventions',
    description: 'Point-based GIS location layer for all watershed civil and biological structures cross-validated with mobile geo-tagged ground images.',
    resolution: 'Sub-meter GNSS Survey',
    sensor: 'Ground Handheld GPS + Drone Orthomosaic',
    date: 'March 2026',
    color: '#EA580C',
    legend: [
      { label: 'Completed Structures', color: '#16A34A', value: '4 Major Units' },
      { label: 'Ongoing Work In Progress', color: '#0284C7', value: '2 Units' },
      { label: 'Planned Next Phase', color: '#EAB308', value: '1 Unit' }
    ]
  },
  {
    id: 'layer-change',
    name: 'Multi-Temporal Change Detection (2022 vs 2026)',
    category: 'Indices',
    description: 'Pixel-by-pixel differential matrix detecting net gains in surface water spread, double-cropped acreage, and reduction in barren wasteland.',
    resolution: '10m Multitemporal Difference',
    sensor: 'Sentinel-2 L2A Harmonized Time Series',
    date: 'February 2026',
    color: '#7C3AED',
    legend: [
      { label: 'Net Vegetation & Cropping Gain', color: '#16A34A', value: '+28.4% Area' },
      { label: 'Permanent Water Spread Increase', color: '#0284C7', value: '+45.8% Storage' },
      { label: 'Erosion Arrest / Barren Reclaimed', color: '#9333EA', value: '-32.1% Wasteland' },
      { label: 'Unchanged Stable Area', color: '#94A3B8', value: '55.2% Total' }
    ]
  },
  {
    id: 'layer-boundary',
    name: 'Hydrological Catchment & Sub-Watershed Boundary',
    category: 'Terrain',
    description: 'Delineated watershed boundary defining the topographical water divide, dividing ridge lines, and internal micro-drainage catchments.',
    resolution: 'Cadastral & DEM Vector Boundary',
    sensor: 'Automated Watershed Delineation GIS',
    date: 'January 2026',
    color: '#7C3AED',
    legend: [
      { label: 'Macro Watershed Outer Divide', color: '#7C3AED', value: '4,850 Ha' },
      { label: 'Internal Sub-Catchments A, B, C, D', color: '#A855F7', value: '4 Micro Units' }
    ]
  }
];

// Land Use / Land Cover Distribution Data
export const LULC_DATA: LULCClass[] = [
  {
    name: 'Intensive Double-Cropped Agriculture',
    areaHa: 1890,
    percentage: 39.0,
    color: '#16A34A',
    code: 'LULC-AG-2',
    description: 'Irrigated acreage yielding Kharif and Rabi harvests facilitated by farm ponds and check dam recharge.'
  },
  {
    name: 'Single Cropped / Fallow Land',
    areaHa: 780,
    percentage: 16.1,
    color: '#EAB308',
    code: 'LULC-AG-1',
    description: 'Rainfed parcel cultivated primarily during monsoon, converting to Rabi through check dam groundwater enrichment.'
  },
  {
    name: 'Deciduous Scrub & Ridge Afforestation',
    areaHa: 640,
    percentage: 13.2,
    color: '#15803D',
    code: 'LULC-FOR',
    description: 'Native tree plantation on ridge contours, promoting soil binding and microclimate stabilization.'
  },
  {
    name: 'Barren Rocky Uplands & Wasteland',
    areaHa: 710,
    percentage: 14.6,
    color: '#92400E',
    code: 'LULC-BAR',
    description: 'Steep basaltic outcrops undergoing contour trenching and stone bunding for erosion control.'
  },
  {
    name: 'Surface Water Bodies & Reservoirs',
    areaHa: 315,
    percentage: 6.5,
    color: '#0284C7',
    code: 'LULC-WAT',
    description: 'Check dam reservoirs, farm ponds, percolation tanks, and perennial stream channels.'
  },
  {
    name: 'Settlement & Rural Infrastructure',
    areaHa: 265,
    percentage: 5.5,
    color: '#DC2626',
    code: 'LULC-BLT',
    description: 'Village hamlets, roads, threshing floors, and farm residential structures.'
  },
  {
    name: 'Grassland & Common Grazing Pastures',
    areaHa: 250,
    percentage: 5.1,
    color: '#84CC16',
    code: 'LULC-GRS',
    description: 'Common village commons conserved under controlled grazing regimens.'
  }
];

// Spatial Change Detection (2022 vs 2026)
export const SPATIAL_CHANGES: SpatialChangeItem[] = [
  {
    id: 'CHG-01',
    parameter: 'Total Vegetative Coverage (NDVI > 0.35)',
    year2022: '1,720',
    year2026: '2,530',
    unit: 'Hectares',
    changePct: 47.1,
    trend: 'positive',
    interpretation: 'Substantial 810 Ha expansion in photosynthetic biomass attributed to improved soil moisture and supplementary irrigation.',
    category: 'Vegetation'
  },
  {
    id: 'CHG-02',
    parameter: 'Surface Water Storage Extent (Post-Monsoon)',
    year2022: '142',
    year2026: '315',
    unit: 'Hectares',
    changePct: 121.8,
    trend: 'positive',
    interpretation: 'Surface water spread increased by 173 Ha due to construction of masonry check dam and 18 farm pond units.',
    category: 'Water'
  },
  {
    id: 'CHG-03',
    parameter: 'Double Cropped Agriculture Area',
    year2022: '1,150',
    year2026: '1,890',
    unit: 'Hectares',
    changePct: 64.3,
    trend: 'positive',
    interpretation: '740 Ha shift from single rainfed cropping into productive Rabi harvesting of pulses and vegetables.',
    category: 'Agriculture'
  },
  {
    id: 'CHG-04',
    parameter: 'Barren & Severely Eroded Wasteland',
    year2022: '1,045',
    year2026: '710',
    unit: 'Hectares',
    changePct: -32.1,
    trend: 'positive',
    interpretation: '335 Ha of degraded barren slopes reclaimed through continuous contour trenching and silvopastoral planting.',
    category: 'Soil Conservation'
  },
  {
    id: 'CHG-05',
    parameter: 'Average Groundwater Depth (Post-Monsoon)',
    year2022: '11.8',
    year2026: '7.4',
    unit: 'Meters Below Ground Level',
    changePct: 37.3,
    trend: 'positive',
    interpretation: 'Water table rose by 4.4 meters across 32 monitoring dugwells surrounding the percolation and check dam structures.',
    category: 'Water'
  },
  {
    id: 'CHG-06',
    parameter: 'Sediment Delivery Ratio (Erosion Index)',
    year2022: '18.4',
    year2026: '7.9',
    unit: 'Tons / Ha / Year',
    changePct: -57.1,
    trend: 'positive',
    interpretation: 'Sediment transport reduced by 57% following hillside gully stabilization and boulder weir deployments.',
    category: 'Soil Conservation'
  }
];

// Evidence-based Decision Insights
export const DECISION_INSIGHTS: DecisionInsight[] = [
  {
    id: 'INS-01',
    title: 'High Drainage Concentration in Sub-Catchment SW-01 Suggests Additional Boulder Plugs',
    category: 'Hydrology',
    severity: 'High Priority',
    subWatershed: 'North Ridge Sub-Catchment (SW-01)',
    description: 'Digital Elevation analysis identifies 3 severe 1st-order runoff gullies with flow velocities exceeding 2.4 m/s during storm events.',
    geoEvidence: 'SRTM 30m flow accumulation map coupled with 4 geo-tagged mobile photos showing active rill incision.',
    recommendedAction: 'Deploy package of 12 loose boulder structures and brushwood dams before monsoon 2026.',
    estimatedImpact: 'Will trap ~1,400 tonnes of fertile topsoil and reduce downstream check dam siltation by 38%.',
    isDemo: true
  },
  {
    id: 'INS-02',
    title: 'Vegetation Rebound Concentrated within 600m Buffer of Masonry Check Dam CD-01',
    category: 'Vegetation',
    severity: 'Positive Result',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    description: 'NDVI differential time series (2022–2026) displays a 0.28 unit spectral increase inside the check dam hydrological influence zone.',
    geoEvidence: 'Sentinel-2 NDVI time series overlay matching geo-coded photo GEO-IMG-2026-081 ground verification.',
    recommendedAction: 'Scale similar masonry weirs at stream junction 4B (coordinates: 18.820, 74.970) to duplicate recharge outcomes.',
    estimatedImpact: 'Potential to extend Rabi double-cropping across an additional 85 Ha agricultural cluster.',
    isDemo: true
  },
  {
    id: 'INS-03',
    title: 'Percolation Tank PT-01 Silt Inflow Approaching Threshold Warning',
    category: 'Soil Health',
    severity: 'Critical Opportunity',
    subWatershed: 'Eastern Pediment & Drainage Sink (SW-03)',
    description: 'Satellite spectral reflectance shows increased turbidity and silt deposition along the northern inflow delta of the percolation tank.',
    geoEvidence: 'NDWI water spread reduction during dry season + Ground Geo-tagged Image GEO-IMG-2026-120 inspection.',
    recommendedAction: 'Institute pre-monsoon community desilting program in May 2026; apply excavated nutrient-rich silt onto 22 adjacent farm plots.',
    estimatedImpact: 'Restores 14,000 m³ water percolation potential while improving soil organic matter in beneficiary fields.',
    isDemo: true
  },
  {
    id: 'INS-04',
    title: 'Farm Pond Density Clustered Around Large Landholders; Opportunity for Shared Micro-Ponds',
    category: 'Intervention Audit',
    severity: 'Moderate',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    description: 'Spatial point pattern analysis (Nearest Neighbor Ratio = 0.62) indicates clustered distribution of individual farm ponds leaving marginal farmers unbuffered.',
    geoEvidence: 'Point GIS intervention layer cross-referenced with cadastral land parcel boundaries.',
    recommendedAction: 'Prioritize community shared farm ponds on common grazing fringes for tail-end marginal farmers.',
    estimatedImpact: 'Brings 18 additional marginal farming households under assured protective irrigation umbrella.',
    isDemo: true
  }
];

// Methodology Pipeline Stages
export const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    id: 1,
    title: 'Geo-Coded Image Acquisition',
    subtitle: 'Mobile Field Survey & Tagging',
    shortDesc: 'Field surveyors capture geocoded ground truth photos with integrated GNSS coordinates, compass azimuth, altitude, and structured observations.',
    fullExplanation: 'Using dedicated Android mobile applications and RTK GNSS handhelds, field investigators capture photographs of check dams, farm ponds, soil condition, and crop vigor. Each photo embeds EXIF metadata containing latitude, longitude, altitude, bearing azimuth, and interview verification.',
    inputData: 'Mobile GNSS camera, field inspection checklists, interviewer credentials',
    outputArtifact: 'Validated Geo-Coded Image points with spatial geometry and EXIF metadata',
    technologies: ['Android GPS API', 'EXIF Metadata Parser', 'Trimble RTK', 'WGS84 Datum']
  },
  {
    id: 2,
    title: 'Quality Audit & Image Validation',
    subtitle: 'Geometric & Radiometric Scrubbing',
    shortDesc: 'Automated verification checks GPS horizontal dilution of precision (HDOP), date validity, and coordinates against watershed boundaries.',
    fullExplanation: 'Field submissions undergo automated spatial filtration to ensure coordinates lie strictly within target watershed perimeters. Out-of-bounds coordinates, degraded horizontal accuracy (>5m), or corrupted EXIF headers are flagged for re-survey or corrected.',
    inputData: 'Raw field image uploads and coordinate streams',
    outputArtifact: 'Cleaned, audited spatial points stored in spatial database with quality tags',
    technologies: ['Turf.js spatial intersection', 'HDOP Filter', 'EXIF Validator']
  },
  {
    id: 3,
    title: 'Geo-Referencing & Cadastral Ingestion',
    subtitle: 'Coordinate Projection & Alignment',
    shortDesc: 'Aligns ground photos with cadastral revenue maps, village boundaries, and national spatial reference coordinate systems (UTM 43N / WGS84).',
    fullExplanation: 'Raster village survey maps and cadastral parcel plans are geometrically rectified and overlaid onto high-resolution base maps. Every ground observation point is bound to its respective cadastral survey number and ownership parcel.',
    inputData: 'Cadastral revenue maps, village boundary shapefiles, WGS84 GPS coords',
    outputArtifact: 'Cadastral-linked GIS vector feature collection in UTM 43N projection',
    technologies: ['GDAL/OGR', 'EPSG:32643 / EPSG:4326', 'Cadastral Rectification']
  },
  {
    id: 4,
    title: 'Multi-Sensor Satellite Data Ingestion',
    subtitle: 'Optical & Radar Remote Sensing',
    shortDesc: 'Ingests multi-spectral satellite imagery from Sentinel-2 MSI, Landsat-9, and SRISHTI-DRISHTI platforms across baseline and current epochs.',
    fullExplanation: 'Acquires Level-2A surface reflectance datasets for pre-monsoon, post-monsoon, and winter seasons. Applies atmospheric correction, cloud masking using QA60 bands, and radiometric calibration to ensure cross-temporal consistency.',
    inputData: 'Sentinel-2 Level-2A (10m), Landsat-9 OLI-2 (30m), SRTM DEM (30m)',
    outputArtifact: 'Calibrated orthomosaic multi-spectral raster cubes and DEM surface',
    technologies: ['Copernicus Hub API', 'Bhuvan / ISRO SRISHTI', 'USGS EarthExplorer']
  },
  {
    id: 5,
    title: 'GIS Layer Integration & Topo Modeling',
    subtitle: 'Hydrological Modeling & Delineation',
    shortDesc: 'Computes flow direction, flow accumulation, Strahler stream networks, sub-catchment divides, and slope percent from DEM elevation.',
    fullExplanation: 'Hydrologically conditions the digital elevation model by filling sinks and carving drainage culverts. Uses D8 algorithm to determine flow direction, computes flow accumulation matrices, and auto-delineates micro-watershed boundaries.',
    inputData: 'Hydrologically conditioned SRTM 30m / ALOS 12.5m DEM',
    outputArtifact: 'Stream network vectors, sub-watershed polygon boundaries, slope raster',
    technologies: ['D8 Flow Algorithm', 'TauDEM / GRASS GIS', 'Strahler Stream Ordering']
  },
  {
    id: 6,
    title: 'Spatial Analysis & Ground Truthing',
    subtitle: 'Spectral Fusion & Cross-Validation',
    shortDesc: 'Synthesizes field geo-coded observations with satellite spectral signatures to validate crop health, pond water extents, and erosion gullies.',
    fullExplanation: 'Geo-coded photos provide ground truth training and validation pixels. For instance, when a field photo identifies a full farm pond, the corresponding satellite pixel spectral response is inspected for NDWI validation to confirm classification algorithms.',
    inputData: 'Field geo-tagged points + Satellite multi-spectral raster bands',
    outputArtifact: 'Cross-validated spectral signatures and ground-truth confusion matrix',
    technologies: ['Machine Learning Random Forest', 'Confusion Matrix (Kappa = 0.91)']
  },
  {
    id: 7,
    title: 'Thematic Mapping & Index Computation',
    subtitle: 'LULC, NDVI & NDWI Computation',
    shortDesc: 'Generates thematic maps including Land-Use/Land-Cover, NDVI vegetation vigor, NDWI water presence, soil depth, and slope hazard.',
    fullExplanation: 'Computes normalized indices: NDVI = (B8 - B4)/(B8 + B4) and NDWI = (B3 - B8)/(B3 + B8). Runs supervised Random Forest classification yielding seven distinct LULC classes. Renders cartographically styled thematic vector and raster layers.',
    inputData: 'Multi-spectral satellite bands (NIR, Red, Green, SWIR)',
    outputArtifact: 'Thematic vector maps, NDVI color ramps, classified LULC polygons',
    technologies: ['Spectral Index Calculations', 'Random Forest Classifier', 'GeoTIFF']
  },
  {
    id: 8,
    title: 'Multi-Temporal Change Detection',
    subtitle: '2022 Baseline vs 2026 Current Analysis',
    shortDesc: 'Executes pixel-by-pixel post-classification comparison to quantify net gains in water bodies, cropping intensity, and erosion reduction.',
    fullExplanation: 'Subtracts baseline 2022 raster state from current 2026 state to produce spatial trajectory maps. Calculates exact hectare shifts: e.g. how many hectares of barren hillslopes converted to continuous contour plantation.',
    inputData: '2022 baseline thematic layers vs 2026 current thematic layers',
    outputArtifact: 'Spatial change trajectory raster, transition matrix, delta statistics',
    technologies: ['Post-Classification Comparison', 'Transition Matrix Calculus']
  },
  {
    id: 9,
    title: 'Watershed Health Assessment',
    subtitle: 'Integrated Index & Impact Synthesis',
    shortDesc: 'Synthesizes hydrological, ecological, and socio-economic variables into holistic sub-watershed performance indices.',
    fullExplanation: 'Combines vegetation improvement, water storage capacity increase, groundwater recharge head, and agricultural stability into standardized watershed development impact ratings. Highlights zones performing exceptionally well versus lagging sectors.',
    inputData: 'Change metrics, intervention density, groundwater monitoring records',
    outputArtifact: 'Watershed health scorecard and micro-catchment comparative rankings',
    technologies: ['Analytical Hierarchy Process (AHP)', 'Multi-Criteria Evaluation (MCE)']
  },
  {
    id: 10,
    title: 'Evidence-Based Decision Support',
    subtitle: 'Prioritization & Policy Action',
    shortDesc: 'Translates geospatial patterns into prioritized intervention recommendations for watershed project directors and village committees.',
    fullExplanation: 'Generates prescriptive action directives: e.g. identifies sub-catchment SW-01 as requiring immediate boulder gully plugs, alerts on percolation tank silt accumulation, and calculates optimal spatial locations for future check dams.',
    inputData: 'Synthesized watershed health assessments and diagnostic insights',
    outputArtifact: 'Actionable intervention plan, priority ranking, and exportable GIS reports',
    technologies: ['Decision Support Engine', 'GeoJSON Export', 'Automated PDF/GIS Cartography']
  }
];

// NDVI Multi-temporal Trend Data (Seasonal 2022 vs 2026)
export const NDVI_TREND_DATA = [
  { month: 'Jun (Pre-Monsoon)', baseline2022: 0.18, current2026: 0.24, targetIdeal: 0.30 },
  { month: 'Jul (Sowing)', baseline2022: 0.26, current2026: 0.38, targetIdeal: 0.42 },
  { month: 'Aug (Vegetative)', baseline2022: 0.42, current2026: 0.62, targetIdeal: 0.68 },
  { month: 'Sep (Peak Kharif)', baseline2022: 0.51, current2026: 0.74, targetIdeal: 0.78 },
  { month: 'Oct (Harvest Kharif)', baseline2022: 0.44, current2026: 0.65, targetIdeal: 0.70 },
  { month: 'Nov (Rabi Sowing)', baseline2022: 0.28, current2026: 0.52, targetIdeal: 0.58 },
  { month: 'Dec (Rabi Peak)', baseline2022: 0.24, current2026: 0.61, targetIdeal: 0.65 },
  { month: 'Jan (Rabi Mature)', baseline2022: 0.21, current2026: 0.56, targetIdeal: 0.60 },
  { month: 'Feb (Rabi Harvest)', baseline2022: 0.19, current2026: 0.42, targetIdeal: 0.48 },
  { month: 'Mar (Summer Fallow)', baseline2022: 0.16, current2026: 0.31, targetIdeal: 0.35 }
];

// Water Storage Capacity Trend Data (Million Liters)
export const WATER_STORAGE_TREND_DATA = [
  { year: '2021', storageCuM: 32000, waterSpreadHa: 95 },
  { year: '2022 (Baseline)', storageCuM: 41000, waterSpreadHa: 142 },
  { year: '2023 (Phase 1)', storageCuM: 68000, waterSpreadHa: 210 },
  { year: '2024 (Phase 2)', storageCuM: 92000, waterSpreadHa: 265 },
  { year: '2025 (Phase 3)', storageCuM: 112000, waterSpreadHa: 295 },
  { year: '2026 (Current)', storageCuM: 128500, waterSpreadHa: 315 }
];

// Feature 1: Before / After Watershed Transformation Pairs
export const TRANSFORMATION_PAIRS: TransformationPair[] = [
  {
    id: 'TR-01',
    title: 'Babhulgaon Check Dam Impoundment & Water Spread',
    location: 'Stream Junction 3A, Babhulgaon Sector',
    category: 'Check Dam & Water Body',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    beforeDate: '12 Feb 2022',
    afterDate: '14 Jan 2026',
    beforeLabel: 'Baseline 2022 (Dry Stream Channel)',
    afterLabel: 'Current 2026 (Full Masonry Impoundment)',
    beforeSource: 'Sentinel-2 MSI Level-2A (10m Optical Reflectance)',
    afterSource: 'Mobile Ground RTK Photo (GEO-IMG-2026-081)',
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgCheckDam,
    imageType: 'Optical Satellite Reflectance vs RTK Field Ground Photo',
    lat: 18.8352,
    lng: 74.9625,
    metrics: [
      { label: 'Surface Water Spread', value: '2.8 Hectares', delta: '+2.8 Ha (+100%)' },
      { label: 'Storage Retention', value: '18,500 m³', delta: '+18,500 m³' },
      { label: 'Local Water Table', value: '7.2 m bgl', delta: '+3.2 m rise' },
      { label: 'Downstream NDVI', value: '0.68', delta: '+0.28 vigor' }
    ],
    summary: 'Construction of masonry check dam CD-01 transformed an ephemeral dry sand nala into a perennial reservoir sustaining 42 farm families with winter Rabi irrigation.'
  },
  {
    id: 'TR-02',
    title: 'Goutamtekdi Continuous Contour Trenches (CCT) & Afforestation',
    location: 'Upper Ridge Slope, Goutamtekdi Forest Fringe',
    category: 'Contour Bund & Soil Conservation',
    subWatershed: 'North Ridge Sub-Catchment (SW-01)',
    beforeDate: '28 Jan 2022',
    afterDate: '04 Feb 2026',
    beforeLabel: 'Baseline 2022 (Eroded Barren Basaltic Slope)',
    afterLabel: 'Current 2026 (Vegetated Terraces & Silt Traps)',
    beforeSource: 'Landsat-9 OLI-2 False Color (SWIR/NIR/Red)',
    afterSource: 'Field Survey Inspection (GEO-IMG-2026-108)',
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgSoilContour,
    imageType: 'Multi-spectral Land Surface vs Field Photo',
    lat: 18.8580,
    lng: 74.9380,
    metrics: [
      { label: 'Soil Loss Rate', value: '5.2 t/ha/yr', delta: '-72% reduction' },
      { label: 'Vegetation Biomass', value: '140 Hectares', delta: '+89 Ha biomass' },
      { label: 'Sapling Survival', value: '89% Survival', delta: '+14,000 trees' },
      { label: 'Mean Slope NDVI', value: '0.52', delta: '+0.34 change' }
    ],
    summary: 'Continuous contour trenches spaced at 8m intervals on steep 14.5% slopes arrested peak runoff velocity and restored 140 Ha of formerly barren ridge land.'
  },
  {
    id: 'TR-03',
    title: 'Shindewadi High-Efficiency Farm Pond Cluster',
    location: 'Plot #114, Shindewadi Farm Cluster',
    category: 'Farm Pond & Micro-Irrigation',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    beforeDate: '15 Mar 2022',
    afterDate: '22 Jan 2026',
    beforeLabel: 'Baseline 2022 (Unirrigated Single Crop Rainfed)',
    afterLabel: 'Current 2026 (30m x 30m Lined Pond Storing 2,700 m³)',
    beforeSource: 'Sentinel-2 MSI Pre-Monsoon True Color',
    afterSource: 'Field Verification Photo (GEO-IMG-2026-094)',
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgFarmPond,
    imageType: 'Pre-Monsoon Satellite Composite vs Ground RTK Camera',
    lat: 18.8270,
    lng: 74.9740,
    metrics: [
      { label: 'Harvested Storage', value: '2,700 m³', delta: 'Assured 2 irrigations' },
      { label: 'Double Cropping Area', value: '24 Hectares', delta: '+24 Ha Rabi crops' },
      { label: 'Crop Spectral Vigor', value: 'NDVI 0.74', delta: '+0.39 vigor' },
      { label: 'Seepage Infiltration Loss', value: '0% (HDPE Lined)', delta: 'Zero loss' }
    ],
    summary: 'Private HDPE-membrane farm pond assured critical life-saving irrigations for pomegranate orchards and onion seedlings during prolonged post-monsoon dry spells.'
  },
  {
    id: 'TR-04',
    title: 'Macro Catchment Vegetation & Cropping Trajectory (NDVI)',
    location: 'Entire Upper Sina Basin (4,850 Ha)',
    category: 'Vegetation & Land Cover Transformation',
    subWatershed: 'All 4 Sub-Catchments (SW-01 through SW-04)',
    beforeDate: 'February 2022',
    afterDate: 'February 2026',
    beforeLabel: 'Baseline 2022 (1,720 Ha Vegetated Canopy)',
    afterLabel: 'Current 2026 (2,530 Ha Vegetated Canopy)',
    beforeSource: 'Harmonized Landsat-Sentinel-2 (HLS) NDVI Baseline',
    afterSource: 'Sentinel-2 Level-2A Multi-spectral Reflectance Composite',
    beforeImageUrl: imgSatelliteView,
    afterImageUrl: imgSoilContour,
    imageType: 'Multi-Temporal Calibrated Satellite Surface Reflectance',
    lat: 18.8250,
    lng: 74.9600,
    metrics: [
      { label: 'Total Vegetated Area', value: '2,530 Ha', delta: '+810 Ha (+47.1%)' },
      { label: 'Double-Cropped Parcel', value: '1,890 Ha', delta: '+740 Ha (+64.3%)' },
      { label: 'Barren Wasteland', value: '710 Ha', delta: '-335 Ha (-32.1%)' },
      { label: 'Mean Basin NDVI', value: '0.54', delta: '+0.19 increase' }
    ],
    summary: 'Basin-wide multi-temporal spectral differencing documents a net 810-hectare expansion in photosynthetic vegetation driven by groundwater recharge and surface harvesting.'
  }
];

// Feature 4: Explainable Watershed Condition Score Components
export const CONDITION_SCORE_COMPONENTS: ConditionScoreComponent[] = [
  {
    id: 'score-veg',
    title: 'Vegetation Condition & Canopy Vigor',
    weightPct: 20,
    score: 78,
    status: 'Optimal',
    observedValue: '2,530 Ha (+47.1% vs Baseline 1,720 Ha)',
    dataSource: 'Sentinel-2 Level-2A Multi-spectral NDVI (Band 8 / Band 4)',
    calculationLogic: 'Standardized normalized difference index scaled against semi-arid Deccan plateau bio-climatic baseline.',
    timePeriod: 'February 2022 (Baseline) vs February 2026 (Current)',
    keyObservation: 'Dense healthy canopy (NDVI > 0.60) covers 1,890 Ha across agricultural clusters, with highest expansion within 600m of check dams.'
  },
  {
    id: 'score-water',
    title: 'Surface Water Bodies & Storage Dynamics',
    weightPct: 25,
    score: 84,
    status: 'Optimal',
    observedValue: '315 Ha Water Spread (+121.8%) / 128,500 m³ Impounded',
    dataSource: 'Sentinel-2 NDWI Band Inversion + Staff Gauge Monitoring',
    calculationLogic: 'Weighted ratio of permanent post-monsoon water holding duration and storage capacity utilization quotient (82% average).',
    timePeriod: 'October 2025 – January 2026 Post-Monsoon Epoch',
    keyObservation: '23 total impoundment structures (5 major reservoirs, 18 farm ponds) maintaining water holding into late winter.'
  },
  {
    id: 'score-erosion',
    title: 'Soil Loss & Land Degradation Control',
    weightPct: 15,
    score: 68,
    status: 'Good',
    observedValue: '7.9 t/ha/yr SDR (-57.1%) / 335 Ha Reclaimed',
    dataSource: 'RUSLE Hydro-morphometric Model + Mobile Ground Truth Scour Logs',
    calculationLogic: 'Quantified reduction in headward gully retreat and sediment delivery ratio (SDR) relative to bare baseline slope.',
    timePeriod: 'Multi-year Trajectory 2022 to 2026',
    keyObservation: 'Hillside continuous contour trenches and loose boulder plugs arrested 57% of topsoil erosion, though upper headwaters still require stabilization.'
  },
  {
    id: 'score-drainage',
    title: 'Drainage Network & Stream Hierarchy',
    weightPct: 15,
    score: 72,
    status: 'Good',
    observedValue: 'Drainage Density: 2.34 km/km² / Concentration Time: 2.4 hrs',
    dataSource: 'SRTM 30m Hydro-Enforced DEM (TauDEM / GRASS GIS)',
    calculationLogic: 'Dendritic bifurcation ratio (Rb = 3.8) and flow routing attenuation across treated stream reaches.',
    timePeriod: 'Conditioned Digital Elevation Model (December 2025)',
    keyObservation: 'Stream orders 1 through 4 effectively channel storm runoff; Order 4 main Sina canal retains steady perennial baseflow.'
  },
  {
    id: 'score-interventions',
    title: 'Intervention Coverage & Spatial Equity',
    weightPct: 15,
    score: 69,
    status: 'Moderate',
    observedValue: '479 Ha Directly Benefited / 287 Farming Families',
    dataSource: 'Cadastral Vector Layer + Handheld GPS Ground Audit',
    calculationLogic: 'Spatial proximity buffer analysis assessing agricultural land parcels located within 800m of a water recharge structure.',
    timePeriod: 'Project Phase 1-3 Implementation Registry (March 2026)',
    keyObservation: 'Excellent coverage in central depression; gap identified for tail-end marginal farmers lacking farm pond equity.'
  },
  {
    id: 'score-groundwater',
    title: 'Groundwater Table Recovery & Cropping Shift',
    weightPct: 10,
    score: 76,
    status: 'Good',
    observedValue: '+4.4m Head Rise / +64.3% Double-Cropped Acreage',
    dataSource: '32 Observation Dugwells + Supervised LULC Classification',
    calculationLogic: 'Depth below ground level (bgl) differential and conversion rate of single rainfed parcels to Rabi double-cropping.',
    timePeriod: 'Post-Monsoon Measurements 2022 vs 2026',
    keyObservation: 'Water table rose from 11.8m to 7.4m bgl, sustaining Rabi irrigation for pulses, onions, and wheat.'
  }
];

// Feature 7: Intelligent Problem Hotspots
export const PROBLEM_HOTSPOTS: HotspotArea[] = [
  {
    id: 'HOTSPOT-01',
    title: 'North Ridge Severe Headwater Gully Scour',
    subWatershed: 'North Ridge Sub-Catchment (SW-01)',
    lat: 18.8620,
    lng: 74.9680,
    priority: 'High-priority observation area',
    category: 'Stream Erosion',
    whyFlagged: 'Digital Elevation Model slope gradient exceeds 14.5% with flow accumulation modeling indicating storm runoff velocities > 2.4 m/s. 3 active 1st-order gullies lack mechanical weirs.',
    triggeringCriteria: [
      { metric: 'Slope Gradient', observed: '14.5%', threshold: '> 12.0%' },
      { metric: 'Peak Runoff Velocity', observed: '2.45 m/s', threshold: '> 1.80 m/s' },
      { metric: 'Active Gully Scour Incision', observed: '0.65m depth', threshold: '> 0.30m' }
    ],
    dataSource: 'SRTM 30m DEM slope analysis + Field Photo GEO-IMG-2026-148',
    recommendedAction: 'Deploy package of 18 loose boulder gully plugs (INT-GP-04) before June 2026 monsoon to dissipate kinetic runoff energy.',
    confidenceScore: 94
  },
  {
    id: 'HOTSPOT-02',
    title: 'Chincholi Percolation Tank Silt Inflow Delta',
    subWatershed: 'Eastern Pediment & Drainage Sink (SW-03)',
    lat: 18.8055,
    lng: 74.9880,
    priority: 'High-priority observation area',
    category: 'Water Body Dynamics',
    whyFlagged: 'Multi-spectral Sentinel-2 NDWI reflectance reveals elevated surface turbidity and silt deposition along the northern feeder canal delta. Staff gauge indicates silt accumulation approaching critical threshold.',
    triggeringCriteria: [
      { metric: 'Silt Accumulation Volume', observed: '13,800 m³', threshold: '> 10,000 m³' },
      { metric: 'Percolation Rate Drop', observed: '-34%', threshold: '> -25%' },
      { metric: 'Effective Storage Loss', observed: '28%', threshold: '> 20%' }
    ],
    dataSource: 'Sentinel-2 Water Turbidity Inversion + Ground Truth GEO-IMG-2026-120',
    recommendedAction: 'Institute pre-monsoon community desilting drive in May 2026; apply excavated nutrient-rich clayey alluvium back onto 22 adjacent farm plots.',
    confidenceScore: 91
  },
  {
    id: 'HOTSPOT-03',
    title: 'Tail-End Marginal Farmer Irrigation Deficit Zone',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    lat: 18.8150,
    lng: 74.9600,
    priority: 'Moderate observation area',
    category: 'Intervention Gap',
    whyFlagged: 'Spatial point pattern analysis (Nearest Neighbor Ratio = 0.62) indicates clustered distribution of individual farm ponds around large landholders, leaving 18 marginal tail-end farming households without supplementary storage.',
    triggeringCriteria: [
      { metric: 'Nearest Neighbor Ratio', observed: '0.62 (Clustered)', threshold: '< 0.85' },
      { metric: 'Unbuffered Farm Plots', observed: '18 Households', threshold: '> 5 Units' },
      { metric: 'Distance to Nearest Pond', observed: '1,240 meters', threshold: '> 600m' }
    ],
    dataSource: 'Cadastral Parcel GIS Layer + Intervention Point Spatial Pattern Analysis',
    recommendedAction: 'Prioritize 2 community-shared farm ponds on village common grazing fringes to deliver equitable protective irrigation.',
    confidenceScore: 88
  },
  {
    id: 'HOTSPOT-04',
    title: 'Khadki Valley Ephemeral Stream Bank Abrasion',
    subWatershed: 'Central Valley Agricultural Belt (SW-02)',
    lat: 18.8460,
    lng: 74.9690,
    priority: 'Monitoring area',
    category: 'Stream Erosion',
    whyFlagged: 'Unconsolidated clay banks along stream Order 2 show moderate undercut scouring during high-intensity 2-year storm events.',
    triggeringCriteria: [
      { metric: 'Bank Slump Length', observed: '220 meters', threshold: '> 150m' },
      { metric: 'Riparian Buffer Width', observed: '< 3 meters', threshold: '< 10m' }
    ],
    dataSource: 'Drone Orthomosaic + Ground Survey Inspection',
    recommendedAction: 'Plant native vetiver grass hedges and bamboo bio-fencing along stream banks to bind loose alluvial soil.',
    confidenceScore: 85
  },
  {
    id: 'HOTSPOT-05',
    title: 'South-Western Terrace Thin Skeletal Soil Wash',
    subWatershed: 'South-Western Terrace Catchment (SW-04)',
    lat: 18.7950,
    lng: 74.9350,
    priority: 'Monitoring area',
    category: 'Land Degradation',
    whyFlagged: 'Shallow lithosol soil layer (<18 cm depth) on 9.8% slope exhibits moderate sheet wash during early monsoon convective storms before vegetative cover establishes.',
    triggeringCriteria: [
      { metric: 'Effective Soil Depth', observed: '16 cm', threshold: '< 25 cm' },
      { metric: 'Organic Carbon Content', observed: '0.38%', threshold: '< 0.50%' }
    ],
    dataSource: 'NBSS&LUP Soil Profile Ground Sampling + Sentinel-2 Bare Soil Index (BSI)',
    recommendedAction: 'Construct stone bunds along cadastral boundaries and seed drought-tolerant stylo legumes for soil organic carbon enrichment.',
    confidenceScore: 82
  }
];

// Feature 11: Digital Watershed Twin Interconnected Elements
export const DIGITAL_TWIN_ELEMENTS: DigitalTwinElement[] = [
  {
    id: 'NODE-01',
    name: 'Goutamtekdi Ridge Catchment (SW-01)',
    type: 'Catchment Ridge',
    elevationAMSL: '780m - 885m AMSL',
    coordinates: [18.8580, 74.9380],
    connectedTo: ['NODE-02', 'NODE-03'],
    keyFunction: 'High-elevation catchment collecting storm rainfall; generates initial runoff into 1st & 2nd order streams.',
    currentStatus: 'Stabilized with 140 Ha continuous contour trenches & 14,000 silvopastoral trees.',
    capacityOrExtent: '1,120 Hectares Ridge Area',
    observedImpact: 'Runoff velocity curbed by 72%; trapped 1,400 tonnes topsoil upstream of main reservoirs.',
    activeMetrics: [
      { label: 'Slope', val: '14.5%' },
      { label: 'NDVI Biomass', val: '0.52' },
      { label: 'Soil Loss', val: '5.2 t/ha/yr' }
    ]
  },
  {
    id: 'NODE-02',
    name: 'North Ridge Feeder Streams (Orders 1-3)',
    type: 'Stream Channel',
    elevationAMSL: '700m - 780m AMSL',
    coordinates: [18.8550, 74.9320],
    connectedTo: ['NODE-04'],
    keyFunction: 'Hydrological drainage routing that conveys ridge runoff towards the central agricultural valley.',
    currentStatus: 'Flowing seasonally post-monsoon; 3 boulder checks operational.',
    capacityOrExtent: '8.2 km Stream Length',
    observedImpact: 'Stream water clarity improved due to upstream contour silt retention.',
    activeMetrics: [
      { label: 'Concentration Time', val: '1.8 hrs' },
      { label: 'Max Flow Order', val: 'Order 3' }
    ]
  },
  {
    id: 'NODE-03',
    name: 'Goutamtekdi Continuous Contour Bunds (INT-CB-02)',
    type: 'Civil Structure',
    elevationAMSL: '792m AMSL',
    coordinates: [18.8580, 74.9380],
    connectedTo: ['NODE-01', 'NODE-02'],
    keyFunction: 'Mechanical & biological soil water conservation structure retaining overland sheet flow.',
    currentStatus: 'Completed July 2023; 89% vegetative survival rate.',
    capacityOrExtent: '140 Ha Benefited / ₹8,90,000 Investment',
    observedImpact: 'Zero rill scouring after heavy post-monsoon downpours.',
    activeMetrics: [
      { label: 'Trench Spacing', val: '8 meters' },
      { label: 'Infiltration Gain', val: '+45%' }
    ]
  },
  {
    id: 'NODE-04',
    name: 'Babhulgaon Masonry Check Dam (INT-CD-01 / WB-01)',
    type: 'Civil Structure',
    elevationAMSL: '678m AMSL',
    coordinates: [18.8352, 74.9625],
    connectedTo: ['NODE-05', 'NODE-06', 'NODE-07'],
    keyFunction: 'Central storage impoundment arresting Order 4 trunk stream runoff; primary groundwater recharge node.',
    currentStatus: 'Operating at 85% storage capacity (18,500 m³ retained water).',
    capacityOrExtent: '22,000 m³ Design Capacity / 2.8 Ha Spread',
    observedImpact: 'Recharged 6 open wells; water table raised by +3.2m within 600m radius.',
    activeMetrics: [
      { label: 'Storage Status', val: '85% Full' },
      { label: 'Well Recharged', val: '6 Units' },
      { label: 'Downstream NDVI', val: '0.68' }
    ]
  },
  {
    id: 'NODE-05',
    name: 'Basalt Aquifer Groundwater Recharge Basin',
    type: 'Aquifer Recharge',
    elevationAMSL: '650m - 670m AMSL',
    coordinates: [18.8250, 74.9650],
    connectedTo: ['NODE-06', 'NODE-07'],
    keyFunction: 'Sub-surface fractured basalt rock layer storing percolated runoff for agricultural extraction.',
    currentStatus: 'Sustained head recovery; post-monsoon depth at 7.4m bgl (vs 11.8m baseline).',
    capacityOrExtent: '32 Monitoring Dugwells',
    observedImpact: 'Net water table rise of +4.4m maintained across 450 hectares of irrigated valley floor.',
    activeMetrics: [
      { label: 'Water Table', val: '7.4m bgl' },
      { label: 'Drawdown Recovery', val: '12 hrs' }
    ]
  },
  {
    id: 'NODE-06',
    name: 'Shindewadi Farm Pond Cluster (INT-FP-03 / WB-02)',
    type: 'Civil Structure',
    elevationAMSL: '662m AMSL',
    coordinates: [18.8270, 74.9740],
    connectedTo: ['NODE-07'],
    keyFunction: 'On-farm micro-water harvesting structure providing supplementary sprinkler/drip irrigation.',
    currentStatus: 'Lined with 500-micron HDPE membrane; 75% storage retention.',
    capacityOrExtent: '2,700 m³ Stored Volume',
    observedImpact: 'Guaranteed 2 supplementary irrigations for onion and pomegranate crops.',
    activeMetrics: [
      { label: 'Seepage Loss', val: '0%' },
      { label: 'Crop Vigor', val: 'NDVI 0.74' }
    ]
  },
  {
    id: 'NODE-07',
    name: 'Central Valley Irrigated Agricultural Plain',
    type: 'Agricultural Plain',
    elevationAMSL: '620m - 660m AMSL',
    coordinates: [18.8200, 74.9550],
    connectedTo: ['NODE-08'],
    keyFunction: 'Primary food production zone utilizing harvested surface water and recharged well water for double cropping.',
    currentStatus: 'Intensively cultivated with wheat, gram, onion, and fodder crops.',
    capacityOrExtent: '1,890 Hectares Double Cropped',
    observedImpact: 'Converted 740 Ha of single-season rainfed fallow land into productive Rabi harvest.',
    activeMetrics: [
      { label: 'Double Cropping', val: '1,890 Ha (+64.3%)' },
      { label: 'Crop Diversity', val: '4 Major Crops' }
    ]
  },
  {
    id: 'NODE-08',
    name: 'Watershed Beneficiary Farming Community',
    type: 'Community Beneficiaries',
    elevationAMSL: '620m - 680m AMSL',
    coordinates: [18.8180, 74.9450],
    connectedTo: [],
    keyFunction: '14,200 village residents and 287 direct beneficiary farming households organized under Village Watershed Committee.',
    currentStatus: 'Active participatory management; operating user water management groups.',
    capacityOrExtent: '287 Farm Families Directly Benefited',
    observedImpact: 'Average annual agricultural income stabilization and zero distress water tanker reliance in 2025-2026.',
    activeMetrics: [
      { label: 'Beneficiary Families', val: '287' },
      { label: 'Villages Covered', val: '4 Hamlets' }
    ]
  }
];

// Feature 12: Intelligent Data Story Chapters (WHERE, WHAT, BEFORE, CHANGE, NOW, EVIDENCE)
export const DATA_STORY_CHAPTERS: DataStoryChapter[] = [
  {
    id: 'STORY-01',
    step: 'WHERE',
    title: 'Geographic Setting: Upper Sina Micro-Catchment #4B1A2',
    subtitle: 'Vulnerable Semi-Arid Rain Shadow of Maharashtra',
    narrative: 'Located on the Deccan Plateau within Maharashtra, the Upper Sina Micro-Catchment spans 4,850 hectares of undulating terrain ranging from 620m in the alluvial valley to 885m AMSL on basaltic ridges. With an average annual precipitation of merely 540 mm concentrated in erratic monsoon showers, the catchment historically suffered from severe moisture deficits and rapid surface runoff.',
    spatialData: [
      { label: 'Macro Catchment Code', value: '4B1A2 (Upper Sina Basin)' },
      { label: 'Total Catchment Area', value: '4,850 Hectares' },
      { label: 'Mean Annual Rainfall', value: '540 mm (Semi-arid)' },
      { label: 'Topographical Relief', value: '620m to 885m AMSL' }
    ],
    imageUrl: imgSatelliteView,
    caption: 'Sentinel-2 satellite orthomosaic showing the delineated 4,850 Ha hydrological boundary and dividing ridge lines.',
    coordinates: [18.825, 74.960],
    evidencePoints: [
      'Topographical ridge divide delineated via hydro-conditioned SRTM 30m Digital Elevation Model.',
      'Dendritic drainage network spanning 38.6 km across 4 stream orders with density of 2.34 km/km².',
      'Underlying geology composed of horizontally bedded Deccan Trap basalt with weathered vesicular horizons.'
    ]
  },
  {
    id: 'STORY-02',
    step: 'WHAT',
    title: 'The Intervention Strategy: Ridge-to-Valley Conservation',
    subtitle: 'Integrated Civil Structures, Water Harvesting & Biological Buffers',
    narrative: 'To address recurrent droughts, the project instituted a scientific Ridge-to-Valley treatment paradigm. This deployed continuous contour trenches and loose boulder gully plugs across the upper steep ridge (SW-01), followed by masonry check dams, percolation tanks, and individual farm ponds along the lower valley floor (SW-02 & SW-03) to recharge the fractured basalt aquifer.',
    spatialData: [
      { label: 'Total Civil Structures', value: '7 Units (4 Done, 2 Active, 1 Planned)' },
      { label: 'Total Capital Outlay', value: '₹52.3 Lakhs Invested' },
      { label: 'Benefited Farmland', value: '479 Hectares' },
      { label: 'Beneficiary Families', value: '287 Farming Households' }
    ],
    imageUrl: imgCheckDam,
    caption: 'Babhulgaon Masonry Check Dam CD-01 constructed across stream junction 3A impounding 18,500 m³ of harvested runoff.',
    coordinates: [18.8352, 74.9625],
    evidencePoints: [
      'INT-CD-01: Masonry check dam retaining 18,500 m³ storage at 85% capacity with zero structural cracking.',
      'INT-FP-03: 30m x 30m farm pond lined with 500-micron HDPE membrane preventing seepage loss.',
      'INT-CB-02: 140 hectares of continuous contour trenches spaced at 8m intervals on 14.5% slopes.',
      'INT-PT-01: Deep percolation tank desilted by 12,000 m³ to restore infiltration into the fractured aquifer.'
    ]
  },
  {
    id: 'STORY-03',
    step: 'BEFORE',
    title: 'Baseline Reality (2022): Degraded Land & Water Scarcity',
    subtitle: 'Pre-Treatment Condition Documented by Satellite & Ground Surveys',
    narrative: 'Prior to comprehensive watershed development in 2022, satellite multi-spectral analysis documented 1,045 hectares of severely eroded, rocky wasteland. Only 1,150 hectares supported double-cropping, with the remaining agricultural land left fallow after the Kharif harvest due to an average water table depth of 11.8 meters below ground level. Peak monsoon runoff rushed unchecked down degraded gullies.',
    spatialData: [
      { label: 'Barren Degraded Land', value: '1,045 Ha (21.5% of Basin)' },
      { label: 'Water Table Depth', value: '11.8 meters bgl (Severely Depleted)' },
      { label: 'Surface Water Spread', value: '142 Hectares (Ephemeral Only)' },
      { label: 'Annual Topsoil Loss', value: '18.4 tons / Ha / Year' }
    ],
    imageUrl: imgSatelliteView,
    caption: 'January 2022 baseline satellite image revealing extensive dry barren slopes and lack of winter surface water.',
    coordinates: [18.845, 74.960],
    evidencePoints: [
      'Sentinel-2 NDVI time series indicated low winter crop vigor (mean Rabi NDVI: 0.24).',
      '32 monitoring dugwells documented post-monsoon water tables dropping below pump suction heads by December.',
      'Sediment delivery ratio of 18.4 t/ha/yr indicated heavy sheet wash stripping topsoil from upper ridge slopes.'
    ]
  },
  {
    id: 'STORY-04',
    step: 'CHANGE',
    title: 'The Observable Transition (2022 → 2026)',
    subtitle: 'Pixel-by-Pixel Trajectory of Hydrological Recovery',
    narrative: 'Across the 4-year implementation trajectory, multi-temporal satellite differencing reveals profound spatial transitions. Surface water storage spread expanded by +121.8% (from 142 Ha to 315 Ha) following reservoir construction. Hillslope sediment delivery plummeted by -57.1% (down to 7.9 t/ha/yr) as contour bunds trapped silt, while 335 hectares of formerly barren land were successfully reclaimed.',
    spatialData: [
      { label: 'Surface Water Extent', value: '+173 Ha (+121.8% Expansion)' },
      { label: 'Barren Land Reclaimed', value: '-335 Ha (-32.1% Reduction)' },
      { label: 'Sediment Transport', value: '-57.1% Reduction in Erosion' },
      { label: 'Groundwater Head Rise', value: '+4.4 meters Average Rise' }
    ],
    imageUrl: imgSoilContour,
    caption: 'Continuous contour trenches capturing runoff and binding topsoil on ridge slopes, verified during February 2026 ground audit.',
    coordinates: [18.858, 74.938],
    evidencePoints: [
      'Multi-temporal differential raster confirms 173 Ha net increase in open water pixels across 23 conservation units.',
      'ALOS DEM cross-referenced with ground photos shows sediment accumulation up to 0.45m behind loose boulder plugs.',
      'Observation dugwell hydrographs register sustained recharge response throughout the post-monsoon dry season.'
    ]
  },
  {
    id: 'STORY-05',
    step: 'NOW',
    title: 'Current Observed Condition (2026): Resilient Watershed',
    subtitle: 'Present Day Ecological & Socio-Economic Status',
    narrative: 'Today, the Upper Sina watershed exhibits robust ecological health, earning an explainable Analytical Condition Score of 74 / 100. Total photosynthetic vegetative coverage spans 2,530 hectares (+47.1% increase), while double-cropped acreage has expanded to 1,890 hectares. Water bodies impound 128,500 m³ of water, maintaining post-monsoon water table depths at 7.4 meters below ground level.',
    spatialData: [
      { label: 'Vegetation Canopy (NDVI > 0.35)', value: '2,530 Ha (+47.1% Gain)' },
      { label: 'Double-Cropped Agriculture', value: '1,890 Ha (+64.3% Gain)' },
      { label: 'Total Water Impounded', value: '128,500 m³ across 23 Units' },
      { label: 'Condition Score', value: '74 / 100 (Analytical Index)' }
    ],
    imageUrl: imgFarmPond,
    caption: 'Shindewadi HDPE-lined farm pond retaining 2,700 m³ of harvested water amidst vigorous Rabi onion crops in January 2026.',
    coordinates: [18.827, 74.974],
    evidencePoints: [
      'Sentinel-2 February 2026 multi-spectral image shows prominent winter greening halo extending 600m below check dams.',
      'Ground truth inspection GEO-IMG-2026-094 confirms active supplementary irrigation for commercial onion and wheat.',
      'Analytical hierarchy assessment rates catchment hydrology and vegetation vigor in the "Optimal / Good" tier.'
    ]
  },
  {
    id: 'STORY-06',
    step: 'EVIDENCE',
    title: 'The Multi-Tier Ground Truth Evidence Base',
    subtitle: 'Fusing Sub-Meter RTK Ground Photos with Satellite Telemetry',
    narrative: 'Every conclusion in Waterscope is strictly grounded in verifiable empirical evidence. Ground investigators surveyed 6 geo-coded field points using sub-meter Trimble and Leica RTK GNSS receivers (accuracy ±1.8m to ±3.1m), capturing camera azimuth, altitude, and structured observations. These ground truth points calibrate and validate 10m multi-spectral Sentinel-2 MSI and Landsat-9 spectral classifications with an average confidence match of 94.3%.',
    spatialData: [
      { label: 'Geo-Coded Photos', value: '6 RTK Verified Points' },
      { label: 'GNSS Positional Accuracy', value: '±1.8m to ±3.1m (Sub-meter)' },
      { label: 'Satellite Spectral Match', value: '94.3% Average Confidence' },
      { label: 'Thematic Maps Integrated', value: '10 Calibrated GIS Layers' }
    ],
    imageUrl: imgCheckDam,
    caption: 'Trimble RTK handheld survey verifying Babhulgaon Check Dam water level against Sentinel-2 NDWI spectral threshold.',
    coordinates: [18.8352, 74.9625],
    evidencePoints: [
      'GEO-IMG-2026-081: 18.8352°N, 74.9625°E, elev 678m, azimuth 215°, match score 96% with Sentinel-2 NDWI.',
      'GEO-IMG-2026-094: 18.8270°N, 74.9740°E, elev 662m, azimuth 140°, match score 98% with 10m crop parcel boundary.',
      'GEO-IMG-2026-108: 18.8580°N, 74.9380°E, elev 792m, azimuth 78°, match score 92% with ALOS DEM terracing lines.',
      'GEO-IMG-2026-120: 18.8055°N, 74.9880°E, elev 645m, azimuth 310°, match score 95% with reservoir water perimeter.'
    ]
  }
];

// Feature 9: Initial Validation Catalog for Geo-Coded Ground Truth
export const INITIAL_VALIDATION_CATALOG: ValidationReport[] = [
  {
    id: 'VAL-01',
    title: 'Masonry Check Dam Impoundment Survey',
    filename: 'geocoded_check_dam_1790767255940.jpg',
    lat: 18.8352,
    lng: 74.9625,
    date: '14 Jan 2026',
    elevationM: 678,
    azimuthDeg: 215,
    accuracyM: 2.4,
    status: 'Location Match',
    checks: [
      { name: 'WGS84 Coordinate Format', passed: true, details: 'Valid floating-point coordinates within range' },
      { name: 'Watershed Boundary Containment', passed: true, details: 'Point located 1.4 km inside boundary polygon' },
      { name: 'Micro-Catchment Attribution', passed: true, details: 'Assigned to Central Valley Agricultural Belt (SW-02)' },
      { name: 'Survey Date Chronology', passed: true, details: 'Date 14 Jan 2026 aligns with Phase 3 post-monsoon evaluation' },
      { name: 'EXIF Metadata Integrity', passed: true, details: 'Valid elevation (678m), compass bearing (215°), HDOP ±2.4m' },
      { name: 'Satellite Spectral Consistency', passed: true, details: 'Sentinel-2 NDWI reflectance matches water impoundment within 4.2m' }
    ],
    subWatershedAssigned: 'Central Valley Agricultural Belt (SW-02)',
    satelliteMatchScore: 96,
    verifiedTimestamp: '2026-01-14T10:45:00Z'
  },
  {
    id: 'VAL-02',
    title: 'Individual Farm Pond with HDPE Membrane',
    filename: 'geocoded_farm_pond_1790767270216.jpg',
    lat: 18.8270,
    lng: 74.9740,
    date: '22 Jan 2026',
    elevationM: 662,
    azimuthDeg: 140,
    accuracyM: 1.8,
    status: 'Location Match',
    checks: [
      { name: 'WGS84 Coordinate Format', passed: true, details: 'Valid floating-point coordinates within range' },
      { name: 'Watershed Boundary Containment', passed: true, details: 'Point located 2.1 km inside boundary polygon' },
      { name: 'Micro-Catchment Attribution', passed: true, details: 'Assigned to Central Valley Agricultural Belt (SW-02)' },
      { name: 'Survey Date Chronology', passed: true, details: 'Date 22 Jan 2026 aligns with Phase 3 winter evaluation' },
      { name: 'EXIF Metadata Integrity', passed: true, details: 'Valid elevation (662m), compass bearing (140°), RTK HDOP ±1.8m' },
      { name: 'Satellite Spectral Consistency', passed: true, details: 'Rectangular 30x30m pond clearly detected on 10m Sentinel-2 band 8/4' }
    ],
    subWatershedAssigned: 'Central Valley Agricultural Belt (SW-02)',
    satelliteMatchScore: 98,
    verifiedTimestamp: '2026-01-22T14:15:00Z'
  },
  {
    id: 'VAL-03',
    title: 'Contour Continuous Trenches & Ridge Afforestation',
    filename: 'geocoded_soil_contour_1790767281514.jpg',
    lat: 18.8580,
    lng: 74.9380,
    date: '04 Feb 2026',
    elevationM: 792,
    azimuthDeg: 78,
    accuracyM: 3.1,
    status: 'Location Match',
    checks: [
      { name: 'WGS84 Coordinate Format', passed: true, details: 'Valid floating-point coordinates within range' },
      { name: 'Watershed Boundary Containment', passed: true, details: 'Point located 0.8 km inside north boundary divide' },
      { name: 'Micro-Catchment Attribution', passed: true, details: 'Assigned to North Ridge Sub-Catchment (SW-01)' },
      { name: 'Survey Date Chronology', passed: true, details: 'Date 04 Feb 2026 aligns with agro-forestry monitoring' },
      { name: 'EXIF Metadata Integrity', passed: true, details: 'Valid elevation (792m), compass bearing (78°), GNSS accuracy ±3.1m' },
      { name: 'Satellite Spectral Consistency', passed: true, details: '35% reduction in bare soil surface reflectance (SWIR); terracing on DEM' }
    ],
    subWatershedAssigned: 'North Ridge Sub-Catchment (SW-01)',
    satelliteMatchScore: 92,
    verifiedTimestamp: '2026-02-04T09:30:00Z'
  },
  {
    id: 'VAL-04',
    title: 'Chincholi Community Percolation Tank Water Spread',
    filename: 'geocoded_check_dam_1790767255940.jpg',
    lat: 18.8055,
    lng: 74.9880,
    date: '18 Feb 2026',
    elevationM: 645,
    azimuthDeg: 310,
    accuracyM: 2.1,
    status: 'Location Match',
    checks: [
      { name: 'WGS84 Coordinate Format', passed: true, details: 'Valid coordinates' },
      { name: 'Watershed Boundary Containment', passed: true, details: 'Point located 1.2 km inside boundary polygon' },
      { name: 'Micro-Catchment Attribution', passed: true, details: 'Assigned to Eastern Pediment (SW-03)' },
      { name: 'Survey Date Chronology', passed: true, details: 'Date 18 Feb 2026 verified' },
      { name: 'EXIF Metadata Integrity', passed: true, details: 'Valid elevation (645m), bearing (310°), accuracy ±2.1m' },
      { name: 'Satellite Spectral Consistency', passed: true, details: 'Reservoir perimeter matches Sentinel-2 NDWI boundary within 4.2m' }
    ],
    subWatershedAssigned: 'Eastern Pediment & Drainage Sink (SW-03)',
    satelliteMatchScore: 95,
    verifiedTimestamp: '2026-02-18T11:20:00Z'
  }
];

