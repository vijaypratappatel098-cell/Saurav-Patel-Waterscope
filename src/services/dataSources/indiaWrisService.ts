import { DataSourceMetadata } from './types';
import { MAIN_WATERSHED_BOUNDARY, SUB_WATERSHEDS } from '../../data/watershedData';

export class IndiaWrisService {
  private static WRIS_PORTAL = 'https://indiawris.gov.in/';
  private static BHUVAN_HYDRO = 'https://bhuvan-app1.nrsc.gov.in/envis/';

  public static getMetadata(): DataSourceMetadata {
    return {
      id: 'india-wris',
      name: 'India-WRIS / National Hydrological Delineation',
      agency: 'Central Water Commission (CWC) / NRSC',
      url: this.WRIS_PORTAL,
      category: 'boundary',
      status: 'DEMO',
      description: 'Official Water Resources Information System providing standardized watershed, basin (Krishna), and sub-basin (Bhima / Sina) boundaries and hydro-meteorological indices.',
      resolution: '1:50,000 National River Basin Scale',
      authRequired: false,
      notes: 'Standardized hierarchical watershed coding system (e.g. Catchment 4B1A2) matching national WRIS registry.'
    };
  }

  /**
   * Returns authoritative boundary coordinate ring for the Upper Sina Catchment.
   */
  public static getAuthoritativeBoundary(): [number, number][] {
    return MAIN_WATERSHED_BOUNDARY;
  }

  /**
   * Returns sub-catchment delineated boundaries.
   */
  public static getSubCatchments() {
    return SUB_WATERSHEDS;
  }
}
