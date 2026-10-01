import { DataSourceMetadata, ElevationPointResult } from './types';

export class DemService {
  private static SRTM_URL = 'https://www.usgs.gov/centers/eros/science/usgs-eros-archive-digital-elevation-shuttle-radar-topography-mission-srtm';
  private static CARTODEM_URL = 'https://bhuvan-app1.nrsc.gov.in/2dresources/bhuvanstore.php';

  public static getMetadata(): DataSourceMetadata {
    return {
      id: 'srtm-cartodem',
      name: 'ISRO CartoDEM & USGS SRTM 30m',
      agency: 'ISRO NRSC / USGS EROS',
      url: this.CARTODEM_URL,
      category: 'dem',
      status: 'DEMO',
      description: 'Hydrologically enforced digital elevation models for Strahler stream hierarchy derivation, catchment divide delineation, and slope calculation.',
      resolution: '30m Gridded Elevation (1 Arc-Second)',
      authRequired: false,
      notes: 'Direct elevation sampling available via backend elevation proxy endpoint.'
    };
  }

  /**
   * Retrieves elevation for a given geographic point from USGS SRTM / CartoDEM via backend.
   */
  public static async getPointElevation(lat: number, lng: number): Promise<ElevationPointResult> {
    try {
      const response = await fetch(`/api/elevation?lat=${lat}&lng=${lng}`);
      if (response.ok) {
        const data = await response.json();
        if (typeof data.elevation === 'number' && !isNaN(data.elevation)) {
          return {
            latitude: lat,
            longitude: lng,
            elevationMeters: data.elevation,
            slopeDegrees: data.slope,
            sourceDataset: data.isLive ? 'USGS SRTM 30m' : 'Sample Topographic Relief',
            isRealData: !!data.isLive
          };
        }
      }
    } catch {
      // Fallback
    }

    // Mathematical elevation model based on Deccan Plateau Upper Sina baseline (620m - 885m AMSL)
    const baseElev = 650 + Math.sin(lat * 100) * 110 + Math.cos(lng * 100) * 95;
    return {
      latitude: lat,
      longitude: lng,
      elevationMeters: Math.round(baseElev),
      slopeDegrees: 8.5,
      sourceDataset: 'Sample Topographic Relief',
      isRealData: false
    };
  }
}
