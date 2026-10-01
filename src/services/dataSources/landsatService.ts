import { DataSourceMetadata, SatelliteSceneInfo } from './types';

export class LandsatService {
  private static DATA_ACCESS_URL = 'https://www.usgs.gov/landsat-missions/landsat-data-access';
  private static EARTH_EXPLORER_URL = 'https://earthexplorer.usgs.gov/';

  public static getMetadata(): DataSourceMetadata {
    return {
      id: 'usgs-landsat',
      name: 'NASA / USGS Landsat-8/9 OLI-2',
      agency: 'USGS / NASA',
      url: this.DATA_ACCESS_URL,
      category: 'satellite',
      status: 'DEMO',
      description: '30m optical and thermal infrared data providing continuous 50-year Earth observation archive for long-term watershed baseline assessment.',
      resolution: '30m Multispectral / 100m Thermal',
      authRequired: true,
      notes: 'Direct machine-to-machine API requires USGS EROS M2M token; archive scenes cataloged for historical benchmark analysis.'
    };
  }

  public static getHistoricalArchiveScenes(): SatelliteSceneInfo[] {
    return [
      {
        sceneId: 'LC09_L2SP_146047_20260124_20260126_02_T1',
        platform: 'Landsat-9',
        acquisitionDate: '2026-01-24',
        cloudCoverPercentage: 0.5,
        bandsAvailable: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'ST_B10'],
        isRealData: false
      },
      {
        sceneId: 'LC08_L2SP_146047_20210115_20210308_02_T1',
        platform: 'Landsat-8',
        acquisitionDate: '2021-01-15',
        cloudCoverPercentage: 1.1,
        bandsAvailable: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'ST_B10'],
        isRealData: false
      }
    ];
  }
}
