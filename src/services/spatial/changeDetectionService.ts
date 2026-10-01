export interface TemporalEpochDiff {
  metricName: string;
  baselineValue: number;
  currentValue: number;
  differenceValue: number;
  percentageChange: number;
  unit: string;
  trajectory: 'positive' | 'negative' | 'neutral';
}

export class ChangeDetectionService {
  /**
   * Computes bi-temporal mathematical differential between baseline epoch (e.g. 2022) and current evaluation epoch (2026).
   */
  public static computeBiTemporalDiff(
    baseline: { ndviHighCoverHa: number; waterSpreadHa: number; barrenHa: number; groundwaterDepthM: number },
    current: { ndviHighCoverHa: number; waterSpreadHa: number; barrenHa: number; groundwaterDepthM: number }
  ): TemporalEpochDiff[] {
    return [
      {
        metricName: 'Vegetative Canopy Area (NDVI > 0.35)',
        baselineValue: baseline.ndviHighCoverHa,
        currentValue: current.ndviHighCoverHa,
        differenceValue: current.ndviHighCoverHa - baseline.ndviHighCoverHa,
        percentageChange: parseFloat((((current.ndviHighCoverHa - baseline.ndviHighCoverHa) / baseline.ndviHighCoverHa) * 100).toFixed(1)),
        unit: 'Hectares',
        trajectory: 'positive'
      },
      {
        metricName: 'Surface Water Storage Spread',
        baselineValue: baseline.waterSpreadHa,
        currentValue: current.waterSpreadHa,
        differenceValue: current.waterSpreadHa - baseline.waterSpreadHa,
        percentageChange: parseFloat((((current.waterSpreadHa - baseline.waterSpreadHa) / baseline.waterSpreadHa) * 100).toFixed(1)),
        unit: 'Hectares',
        trajectory: 'positive'
      },
      {
        metricName: 'Degraded Barren Wasteland',
        baselineValue: baseline.barrenHa,
        currentValue: current.barrenHa,
        differenceValue: current.barrenHa - baseline.barrenHa,
        percentageChange: parseFloat((((current.barrenHa - baseline.barrenHa) / baseline.barrenHa) * 100).toFixed(1)),
        unit: 'Hectares',
        trajectory: 'positive' // Net reduction in barren wasteland is positive
      },
      {
        metricName: 'Post-Monsoon Groundwater Depth bgl',
        baselineValue: baseline.groundwaterDepthM,
        currentValue: current.groundwaterDepthM,
        differenceValue: baseline.groundwaterDepthM - current.groundwaterDepthM, // Head rise
        percentageChange: parseFloat((((baseline.groundwaterDepthM - current.groundwaterDepthM) / baseline.groundwaterDepthM) * 100).toFixed(1)),
        unit: 'Meters Head Rise',
        trajectory: 'positive'
      }
    ];
  }
}
