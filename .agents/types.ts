/**
 * Tipos compartilhados entre todos os agentes PDI
 * Padrão BMAD — camada Model
 */

// ─── Status ────────────────────────────────────────────────────────────────

export type AgentStatus = 'success' | 'failure' | 'warning' | 'skipped';

// ─── Resultado base ─────────────────────────────────────────────────────────

export interface AgentResult {
  agent: string;
  version: string;
  timestamp: string;
  status: AgentStatus;
  durationMs?: number;
  message: string;
  error?: string;
}

// ─── Setup ──────────────────────────────────────────────────────────────────

export interface SetupResult extends AgentResult {
  foldersCreated: string[];
}

// ─── Component Generator ────────────────────────────────────────────────────

export type ComponentTemplate = 'basic' | 'full';
export type ComponentLayer = 'shared' | 'feature' | 'core';

export interface ComponentConfig {
  name: string;
  path: string;
  layer: ComponentLayer;
  template?: ComponentTemplate;
  selector?: string;
}

export interface ComponentGenerated {
  name: string;
  path: string;
  status: 'generated' | 'skipped' | 'failed';
  files?: string[];
  error?: string;
}

export interface GeneratorResult extends AgentResult {
  total: number;
  generated: number;
  skipped: number;
  components: ComponentGenerated[];
}

// ─── Style Manager ──────────────────────────────────────────────────────────

export interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'transition';
}

export interface StyleSyncResult extends AgentResult {
  tokensCount: number;
  filesUpdated: string[];
}

// ─── Data Manager ───────────────────────────────────────────────────────────

export interface DataFile {
  name: string;
  path: string;
  recordCount: number;
}

export interface DataCreationResult extends AgentResult {
  filesCreated: DataFile[];
}

// ─── Build ──────────────────────────────────────────────────────────────────

export type BuildEnvironment = 'development' | 'production';

export interface BundleAnalysis {
  mainKB: number;
  totalKB: number;
  isOptimal: boolean;     // < 500KB
}

export interface BuildResult extends AgentResult {
  environment: BuildEnvironment;
  bundle?: BundleAnalysis;
}

// ─── Deploy ─────────────────────────────────────────────────────────────────

export type DeployEnvironment = 'staging' | 'production';

export interface DeployResult extends AgentResult {
  environment: DeployEnvironment;
  url?: string;
}

// ─── Documentation ──────────────────────────────────────────────────────────

export interface DocFile {
  name: string;
  path: string;
  sizeBytes: number;
}

export interface DocumentationResult extends AgentResult {
  docsGenerated: DocFile[];
}

// ─── Quality Assurance ──────────────────────────────────────────────────────

export interface QualityChecks {
  lint: AgentStatus;
  typeCheck: AgentStatus;
  tests: AgentStatus;
  bundleSize: AgentStatus;
}

export interface QualityResult extends AgentResult {
  checks: QualityChecks;
  summary: string;
}

// ─── Performance Monitor ────────────────────────────────────────────────────

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface PerformanceResult extends AgentResult {
  scores?: LighthouseScores;
  suggestions?: string[];
}

// ─── Git Manager ────────────────────────────────────────────────────────────

export type CommitType = 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';

export interface CommitResult extends AgentResult {
  commitHash?: string;
  branch?: string;
}

export interface BranchResult extends AgentResult {
  branchName?: string;
}

export interface LogResult extends AgentResult {
  commits?: string[];
  count?: number;
}

// ─── Orchestrator ───────────────────────────────────────────────────────────

export interface PipelinePhase {
  name: string;
  status: AgentStatus;
  durationMs: number;
}

export interface PipelineResult {
  startedAt: string;
  finishedAt: string;
  totalDurationMs: number;
  status: AgentStatus;
  phases: PipelinePhase[];
}
