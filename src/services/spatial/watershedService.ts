import { MAIN_WATERSHED_BOUNDARY, SUB_WATERSHEDS, DRAINAGE_STREAMS } from '../../data/watershedData';

export class WatershedService {
  /**
   * Ray casting point-in-polygon algorithm to check if a geographic coordinate falls within the watershed boundary.
   */
  public static isCoordinateInsideWatershed(lat: number, lng: number, polygon: [number, number][] = MAIN_WATERSHED_BOUNDARY): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersect = yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Determines which sub-watershed contains the given coordinates.
   */
  public static identifySubWatershed(lat: number, lng: number): string | null {
    for (const sw of SUB_WATERSHEDS) {
      if (this.isCoordinateInsideWatershed(lat, lng, sw.coordinates)) {
        return sw.name;
      }
    }
    return null;
  }

  /**
   * Computes basin drainage density (Total Stream Length in km / Watershed Area in km²).
   */
  public static calculateDrainageDensity(totalAreaHa: number = 4850): {
    totalStreamLengthKm: number;
    areaSqKm: number;
    drainageDensity: number;
    drainageClass: string;
  } {
    const totalStreamLengthKm = DRAINAGE_STREAMS.reduce((acc, s) => acc + s.lengthKm, 0);
    const areaSqKm = totalAreaHa / 100;
    const density = totalStreamLengthKm / areaSqKm;

    let drainageClass = 'Moderate Drainage Texture';
    if (density > 3.0) drainageClass = 'Fine / High Drainage Density';
    else if (density < 1.5) drainageClass = 'Coarse / Low Drainage Density';

    return {
      totalStreamLengthKm: parseFloat(totalStreamLengthKm.toFixed(2)),
      areaSqKm: parseFloat(areaSqKm.toFixed(2)),
      drainageDensity: parseFloat(density.toFixed(2)),
      drainageClass
    };
  }
}
