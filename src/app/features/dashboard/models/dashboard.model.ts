export type ColorTone = 'default' | 'green' | 'blue' | 'red' | 'purple' | 'yellow';

export interface DiagnosticCardData {
  title: string;
  tone: ColorTone;
  items: string[];
}

export interface AlertData {
  title: string;
  body: string;
}

export interface PhaseListItem {
  tag: string;
  tagTone?: ColorTone;
  text: string;
}

export interface PhaseCardData {
  label: string;
  items: PhaseListItem[];
}

export interface PhaseData {
  period: string;
  tone: ColorTone;
  title: string;
  cards: PhaseCardData[];
}

export interface CertificationData {
  name: string;
  badge: 'curto' | 'medio' | 'longo' | 'paralelo';
  description: string;
  why: string;
}

export interface DeliveryRowData {
  period: string;
  periodTone: 't1' | 't2' | 't3' | 't4';
  delivery: string;
  type: string;
  expectedImpact: string;
}

export interface PositionCardData {
  title: string;
  items: string[];
}
