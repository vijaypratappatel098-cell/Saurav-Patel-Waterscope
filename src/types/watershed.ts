export type InterventionStatus = 'Completed' | 'Ongoing' | 'Planned';

export type GeoCategory =
  | 'Check Dam'
  | 'Farm Pond'
  | 'Percolation Tank'
  | 'Contour Bund'
  | 'Plantation'
  | 'Recharge Structure'
  | 'Drainage Line'
  | 'Soil Condition'
  | 'Agricultural Land'
  | 'Erosion Site'
  | 'Water Body';

export interface GeoCodedImage {
  id: string;
  title: string;
  lat: number;
  lng: number;
  date: string;
  location: string;
  category: GeoCategory;
  watershed: string;
  subWatershed: string;
  observation: string;
  fieldNotes: string;
  imageUrl: string;
  thumbnailUrl: string;
  elevationM: number;
  azimuthDeg: number;
  accuracyM: number;
  interviewer: string;
  device: string;
  satelliteMatchScore: number;
  interventionId?: string;
  beforeAfterType?: 'Before' | 'During' | 'After';
}

export interface SubWatershed {
  id: string;
  name: string;
  code: string;
  areaHa: number;
  drainageDensity: number; // km/km2
  maxStreamOrder: number;
  avgSlopePct: number;
  dominantSoil: string;
  color: string;
  coordinates: [number, number][];
  center: [number, number];
  primaryInterventionNeed: string;
}

export interface WaterBodyFeature {
  id: string;
  name: string;
  type: 'Masonry Check Dam' | 'Earthen Farm Pond' | 'Village Percolation Tank' | 'Stream Impoundment' | 'Contour Trench';
  lat: number;
  lng: number;
  capacityCuM: number;
  spreadAreaHa: number;
  yearBuilt: number;
  status: 'Functional' | 'Needs Desilting' | 'High Storage';
  currentStoragePct: number;
}

export interface DrainageStream {
  id: string;
  name: string;
  order: 1 | 2 | 3 | 4;
  type: 'Perennial' | 'Seasonal' | 'Ephemeral';
  lengthKm: number;
  coordinates: [number, number][];
}

export interface WatershedIntervention {
  id: string;
  name: string;
  type: GeoCategory;
  lat: number;
  lng: number;
  date: string;
  status: InterventionStatus;
  areaBenefitedHa: number;
  farmerFamiliesBenefited: number;
  costInr: number;
  beforeImageUrl: string;
  afterImageUrl: string;
  impactObservation: string;
  location: string;
  watershedName: string;
}

export interface ThematicLayerInfo {
  id: string;
  name: string;
  category: 'Terrain' | 'Hydrology' | 'Land Cover' | 'Interventions' | 'Indices';
  description: string;
  resolution: string;
  sensor: string;
  date: string;
  color: string;
  legend: { label: string; color: string; value?: string }[];
}

export interface SpatialChangeItem {
  id: string;
  parameter: string;
  year2022: number | string;
  year2026: number | string;
  unit: string;
  changePct: number;
  trend: 'positive' | 'negative' | 'neutral';
  interpretation: string;
  category: 'Vegetation' | 'Water' | 'Agriculture' | 'Soil Conservation' | 'Barren Land';
}

export interface DecisionInsight {
  id: string;
  title: string;
  category: 'Hydrology' | 'Vegetation' | 'Soil Health' | 'Intervention Audit';
  severity: 'Critical Opportunity' | 'High Priority' | 'Moderate' | 'Positive Result';
  subWatershed: string;
  description: string;
  geoEvidence: string;
  recommendedAction: string;
  estimatedImpact: string;
  isDemo: boolean;
}

export interface LULCClass {
  name: string;
  areaHa: number;
  percentage: number;
  color: string;
  code: string;
  description: string;
}

export interface MethodologyStage {
  id: number;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullExplanation: string;
  inputData: string;
  outputArtifact: string;
  technologies: string[];
}

export interface TransformationPair {
  id: string;
  title: string;
  location: string;
  category: string;
  subWatershed: string;
  beforeDate: string;
  afterDate: string;
  beforeLabel: string;
  afterLabel: string;
  beforeSource: string;
  afterSource: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  imageType: string;
  lat: number;
  lng: number;
  metrics: { label: string; value: string; delta: string }[];
  summary: string;
}

export interface ConditionScoreComponent {
  id: string;
  title: string;
  weightPct: number;
  score: number; // 0-100
  status: 'Optimal' | 'Good' | 'Moderate' | 'Lagging';
  observedValue: string;
  dataSource: string;
  calculationLogic: string;
  timePeriod: string;
  keyObservation: string;
}

export interface HotspotArea {
  id: string;
  title: string;
  subWatershed: string;
  lat: number;
  lng: number;
  priority: 'High-priority observation area' | 'Moderate observation area' | 'Monitoring area';
  category: 'Land Degradation' | 'Water Body Dynamics' | 'Intervention Gap' | 'Stream Erosion' | 'Vegetation Stress';
  whyFlagged: string;
  triggeringCriteria: { metric: string; observed: string; threshold: string }[];
  dataSource: string;
  recommendedAction: string;
  confidenceScore: number;
}

export interface ValidationReport {
  id: string;
  title: string;
  filename: string;
  lat: number;
  lng: number;
  date: string;
  elevationM: number;
  azimuthDeg: number;
  accuracyM: number;
  status: 'Location Match' | 'Location Requires Verification';
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
  subWatershedAssigned: string;
  satelliteMatchScore: number;
  verifiedTimestamp: string;
}

export interface DigitalTwinElement {
  id: string;
  name: string;
  type: 'Catchment Ridge' | 'Stream Channel' | 'Civil Structure' | 'Aquifer Recharge' | 'Agricultural Plain' | 'Community Beneficiaries';
  elevationAMSL: string;
  coordinates: [number, number];
  connectedTo: string[];
  keyFunction: string;
  currentStatus: string;
  capacityOrExtent: string;
  observedImpact: string;
  activeMetrics: { label: string; val: string }[];
}

export interface DataStoryChapter {
  id: string;
  step: 'WHERE' | 'WHAT' | 'BEFORE' | 'CHANGE' | 'NOW' | 'EVIDENCE';
  title: string;
  subtitle: string;
  narrative: string;
  spatialData: { label: string; value: string }[];
  imageUrl: string;
  caption: string;
  coordinates: [number, number];
  evidencePoints: string[];
}

