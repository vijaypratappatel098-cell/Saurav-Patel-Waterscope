export type DataSourceStatus = 'LIVE' | 'DEMO' | 'UNAVAILABLE' | 'ERROR' | 'LOADING';

export interface DataSourceMetadata {
  id: string;
  name: string;
  agency: string;
  url: string;
  category: 'satellite' | 'thematic' | 'field' | 'dem' | 'boundary';
  status: DataSourceStatus;
  latencyMs?: number;
  lastChecked?: string;
  description: string;
  resolution: string;
  authRequired: boolean;
  notes?: string;
}

export interface SatelliteSceneInfo {
  sceneId: string;
  platform: 'Sentinel-2A' | 'Sentinel-2B' | 'Landsat-8' | 'Landsat-9';
  acquisitionDate: string;
  cloudCoverPercentage: number;
  sunElevationAngle?: number;
  bandsAvailable: string[];
  thumbnailUrl?: string;
  isRealData: boolean;
}

export interface NdviCalculationResult {
  meanNdvi: number;
  minNdvi: number;
  maxNdvi: number;
  vegetationCoverPercent: number;
  sourceSensor: string;
  acquisitionDate: string;
  formula: string;
  isRealData: boolean;
}

export interface ElevationPointResult {
  latitude: number;
  longitude: number;
  elevationMeters: number;
  slopeDegrees?: number;
  sourceDataset: 'Bhuvan CartoDEM' | 'USGS SRTM 30m' | 'Sample Topographic Relief';
  isRealData: boolean;
}

export interface SrishtiObservation {
  id: string;
  assetId: string;
  workCategory: string;
  subWatershedCode: string;
  latitude: number;
  longitude: number;
  inspectionDate: string;
  surveyor: string;
  expenditureInr: number;
  areaBenefitedHa: number;
  photoUrl: string;
  validationStatus: 'Verified On-Site' | 'Pending Verification' | 'Audited';
  isRealData: boolean;
}
