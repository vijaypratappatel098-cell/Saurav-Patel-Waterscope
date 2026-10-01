import { DataSourceMetadata, DataSourceStatus } from './types';
import { BhuvanService } from './bhuvanService';
import { SrishtiService } from './srishtiService';
import { CopernicusService } from './copernicusService';
import { LandsatService } from './landsatService';
import { DemService } from './demService';
import { IndiaWrisService } from './indiaWrisService';

class DataSourceManager {
  private static instance: DataSourceManager;
  private statusCache: { [id: string]: DataSourceMetadata } = {};
  private lastFetchTime: number = 0;
  private readonly CACHE_TTL_MS = 60 * 1000; // 1 minute cache

  private constructor() {
    this.initDefaultSources();
  }

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }
    return DataSourceManager.instance;
  }

  private initDefaultSources() {
    const list: DataSourceMetadata[] = [
      BhuvanService.getMetadata(),
      SrishtiService.getMetadata(),
      CopernicusService.getMetadata(),
      LandsatService.getMetadata(),
      DemService.getMetadata(),
      IndiaWrisService.getMetadata()
    ];

    list.forEach((src) => {
      this.statusCache[src.id] = src;
    });
  }

  public getAllSources(): DataSourceMetadata[] {
    return Object.values(this.statusCache);
  }

  public getSourceById(id: string): DataSourceMetadata | undefined {
    return this.statusCache[id];
  }

  public async refreshStatuses(): Promise<{ [id: string]: DataSourceMetadata }> {
    const now = Date.now();
    if (now - this.lastFetchTime < this.CACHE_TTL_MS) {
      return this.statusCache;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/data-status', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.sources && Array.isArray(data.sources)) {
          data.sources.forEach((remoteSource: any) => {
            if (this.statusCache[remoteSource.id]) {
              this.statusCache[remoteSource.id] = {
                ...this.statusCache[remoteSource.id],
                status: remoteSource.status as DataSourceStatus,
                latencyMs: remoteSource.latencyMs,
                lastChecked: remoteSource.lastChecked,
                notes: remoteSource.notes || this.statusCache[remoteSource.id].notes
              };
            }
          });
          this.lastFetchTime = now;
        }
      }
    } catch {
      // Network or offline: preserve safe fallback
    }

    return this.statusCache;
  }
}

export const dataSourceManager = DataSourceManager.getInstance();
