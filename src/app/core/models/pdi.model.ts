// Re-exporta os tipos existentes do dashboard para uso global
export type {
  ColorTone,
  DiagnosticCardData,
  AlertData,
  PhaseListItem,
  PhaseCardData,
  PhaseData,
  CertificationData,
  DeliveryRowData,
  PositionCardData,
} from '../../features/dashboard/models/dashboard.model';

import type {
  DiagnosticCardData,
  AlertData,
  PhaseData,
  CertificationData,
  DeliveryRowData,
  PositionCardData,
} from '../../features/dashboard/models/dashboard.model';

/** Shape completo do JSON pdi-dashboard.json */
export interface DashboardData {
  diagnosticCards: DiagnosticCardData[];
  focusAlert: AlertData;
  phases: PhaseData[];
  certifications: CertificationData[];
  deliveries: DeliveryRowData[];
  positionCards: PositionCardData[];
}
