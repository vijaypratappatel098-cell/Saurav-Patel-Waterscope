import { DataSourceMetadata } from './types';

export class BhuvanService {
  private static WMS_BASE_URL = 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms';
  private static WMTS_BASE_URL = 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wmts';
  private static STORE_URL = 'https://bhuvan-app1.nrsc.gov.in/2dresources/bhuvanstore.php';

  public static readonly THEMATIC_LAYERS = {
    LULC: 'lulc:WB_LULC50k_1516',
    WASTELAND: 'wasteland:MH_Wasteland_1516',
    WATER_BODIES: 'waterbodies:WB_MH_Waterbodies',
    GEOMORPHOLOGY: 'geomorphology:MH_Geomorphology',
    CARTODEM: 'cartodem:CartoDEM_V3R1'
  };

  public static getMetadata(): DataSourceMetadata {
    return {
      id: 'bhuvan-nrsc',
      name: 'NRSC / Bhuvan Thematic WMS & CartoDEM',
      agency: 'ISRO / National Remote Sensing Centre (NRSC)',
      url: 'https://bhuvan.nrsc.gov.in/',
      category: 'thematic',
      status: 'DEMO',
      description: 'Official national geospatial portal hosting 1:50,000 LULC, CartoDEM (30m/10m), wastelands, drainage and water body layers.',
      resolution: '1:50,000 / 30m CartoDEM',
      authRequired: false,
      notes: 'Browser WMS access subject to cross-origin policies; server proxy provided where available.'
    };
  }

  public static getWmsTileUrl(layerName: string): string {
    return `${this.WMS_BASE_URL}?service=WMS&version=1.1.1&request=GetMap&layers=${layerName}&format=image/png&transparent=true`;
  }

  public static getWmtsTileUrl(): string {
    return `${this.WMTS_BASE_URL}`;
  }

  public static async testConnectivity(): Promise<{ isOnline: boolean; latencyMs: number; status: 'LIVE' | 'DEMO' }> {
    try {
      const response = await fetch('/api/data-status');
      if (response.ok) {
        const data = await response.json();
        const bhuvanStatus = data.sources?.find((s: any) => s.id === 'bhuvan-nrsc');
        if (bhuvanStatus && bhuvanStatus.status === 'LIVE') {
          return { isOnline: true, latencyMs: bhuvanStatus.latencyMs || 120, status: 'LIVE' };
        }
      }
    } catch {
      // Graceful fallback
    }
    return { isOnline: false, latencyMs: 0, status: 'DEMO' };
  }
}
