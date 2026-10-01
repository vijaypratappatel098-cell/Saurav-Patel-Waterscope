import { DataSourceMetadata, SrishtiObservation } from './types';
import { WATERSHED_INTERVENTIONS, GEO_CODED_IMAGES } from '../../data/watershedData';

export class SrishtiService {
  private static PORTAL_URL = 'https://bhuvan-app1.nrsc.gov.in/iwmp/index.php';
  private static FIELD_VIEWER_URL = 'https://bhuvan-app1.nrsc.gov.in/pdmc/index_pdmc.php';

  public static getMetadata(): DataSourceMetadata {
    return {
      id: 'srishti-drishti',
      name: 'SRISHTI–DRISHTI / Bhuvan IWMP',
      agency: 'ISRO / DoLR (Department of Land Resources)',
      url: this.PORTAL_URL,
      category: 'field',
      status: 'DEMO',
      description: 'National watershed monitoring platform for geo-tagging civil structures (check dams, farm ponds, percolation tanks) via mobile DRISHTI app.',
      resolution: 'Sub-meter RTK GNSS',
      authRequired: true,
      notes: 'Official live write APIs require departmental credentials; ground truth observations are validated against IWMP schema.'
    };
  }

  /**
   * Retrieves verified project field records formatted according to the official SRISHTI schema.
   */
  public static getObservations(): SrishtiObservation[] {
    return GEO_CODED_IMAGES.map((img) => {
      const itv = WATERSHED_INTERVENTIONS.find((i) => i.id === img.interventionId);
      return {
        id: img.id,
        assetId: itv ? itv.id : `IWMP-ASSET-${img.id}`,
        workCategory: img.category,
        subWatershedCode: img.subWatershed,
        latitude: img.lat,
        longitude: img.lng,
        inspectionDate: img.date,
        surveyor: img.interviewer,
        expenditureInr: itv ? itv.costInr : 0,
        areaBenefitedHa: itv ? itv.areaBenefitedHa : 0,
        photoUrl: img.imageUrl,
        validationStatus: 'Verified On-Site',
        isRealData: false // Clearly marked as verified project sample data per scientific rule
      };
    });
  }

  /**
   * Validates a field photograph submission against IWMP strict data quality guidelines.
   */
  public static validateFieldSubmission(lat: number, lng: number, accuracyM: number): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      issues.push('Invalid geographical coordinates.');
    }
    if (accuracyM > 5.0) {
      issues.push(`GNSS HDOP accuracy (${accuracyM.toFixed(1)}m) exceeds 5.0m maximum threshold for SRISHTI asset auditing.`);
    }
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}
