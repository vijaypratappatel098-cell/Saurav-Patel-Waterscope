export class ElevationService {
  /**
   * Calculates slope percentage from elevation differential and horizontal run distance.
   * Slope % = (rise / run) * 100
   * Slope Angle (degrees) = arctan(rise / run) * (180 / PI)
   */
  public static calculateSlope(elevationA: number, elevationB: number, horizontalDistanceM: number): {
    slopePercent: number;
    slopeDegrees: number;
    erosionVulnerabilityClass: 'Gentle / Low Vulnerability' | 'Moderate Vulnerability' | 'Steep / High Vulnerability';
  } {
    if (horizontalDistanceM <= 0) {
      return { slopePercent: 0, slopeDegrees: 0, erosionVulnerabilityClass: 'Gentle / Low Vulnerability' };
    }

    const rise = Math.abs(elevationB - elevationA);
    const slopePercent = (rise / horizontalDistanceM) * 100;
    const slopeDegrees = Math.atan(rise / horizontalDistanceM) * (180 / Math.PI);

    let vulnerability: 'Gentle / Low Vulnerability' | 'Moderate Vulnerability' | 'Steep / High Vulnerability' = 'Gentle / Low Vulnerability';
    if (slopePercent > 12.0) {
      vulnerability = 'Steep / High Vulnerability';
    } else if (slopePercent > 5.0) {
      vulnerability = 'Moderate Vulnerability';
    }

    return {
      slopePercent: parseFloat(slopePercent.toFixed(1)),
      slopeDegrees: parseFloat(slopeDegrees.toFixed(1)),
      erosionVulnerabilityClass: vulnerability
    };
  }
}
