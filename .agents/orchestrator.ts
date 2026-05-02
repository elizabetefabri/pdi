/**
 * Orchestrator — PDI Pipeline
 *
 * Executa todos os agentes em ordem de dependência:
 *
 *   Setup → Style → Data → ComponentGenerator
 *        → QA → Build → Deploy → Git → Docs → Performance
 *
 * Cada fase reporta duração e status. Uma falha crítica
 * (Setup, Build) interrompe o pipeline. Warnings continuam.
 */

import { SetupAgent } from './setup.agent';
import { StyleManagerAgent } from './style-manager.agent';
import { DataManagerAgent } from './data-manager.agent';
import { ComponentGeneratorAgent } from './component-generator.agent';
import { QualityAssuranceAgent } from './quality-assurance.agent';
import { BuildAgent } from './build.agent';
import { DeployAgent } from './deploy.agent';
import { GitManagerAgent } from './git-manager.agent';
import { DocumentationAgent } from './documentation.agent';
import { PerformanceMonitorAgent } from './performance-monitor.agent';
import { PipelineResult, PipelinePhase, AgentStatus } from './types';

export class Orchestrator {
  private readonly setup    = new SetupAgent();
  private readonly style    = new StyleManagerAgent();
  private readonly data     = new DataManagerAgent();
  private readonly compGen  = new ComponentGeneratorAgent();
  private readonly qa       = new QualityAssuranceAgent();
  private readonly build    = new BuildAgent();
  private readonly deploy   = new DeployAgent();
  private readonly git      = new GitManagerAgent();
  private readonly docs     = new DocumentationAgent();
  private readonly perf     = new PerformanceMonitorAgent();

  async runFullPipeline(deployToProduction = false): Promise<PipelineResult> {
    const startedAt = new Date().toISOString();
    const pipelineStart = Date.now();
    const phases: PipelinePhase[] = [];

    console.log('\n🤖 PDI Pipeline — iniciando...\n');
    console.log('═'.repeat(50));

    // ── Fase 1: Setup ──────────────────────────────────
    const setupResult = await this.runPhase('Setup', () => this.setup.execute(), phases);
    if (setupResult === 'failure') return this.buildResult(startedAt, pipelineStart, 'failure', phases);

    // ── Fase 2: Design System ──────────────────────────
    await this.runPhase('StyleManager', () => this.style.sync(), phases);

    // ── Fase 3: Dados Mock ─────────────────────────────
    await this.runPhase('DataManager', () => this.data.createMockData(), phases);

    // ── Fase 4: Componentes ────────────────────────────
    await this.runPhase('ComponentGenerator', () => this.compGen.generate(), phases);

    // ── Fase 5: Quality Assurance ──────────────────────
    await this.runPhase('QualityAssurance', () => this.qa.runQualityChecks(), phases);

    // ── Fase 6: Build ──────────────────────────────────
    const buildStatus = await this.runPhase('Build', () => this.build.build('production'), phases);
    if (buildStatus === 'failure') return this.buildResult(startedAt, pipelineStart, 'failure', phases);

    // ── Fase 7: Documentação ───────────────────────────
    await this.runPhase('Documentation', () => this.docs.generateDocs(), phases);

    // ── Fase 8: Deploy ─────────────────────────────────
    const deployEnv = deployToProduction ? 'production' : 'staging';
    await this.runPhase('Deploy', () => this.deploy.deploy(deployEnv), phases);

    // ── Fase 9: Commit final ───────────────────────────
    await this.runPhase('Git', () =>
      this.git.commit('pipeline complete — build, deploy, docs', 'chore'),
      phases
    );

    // ── Fase 10: Performance (não bloqueante) ──────────
    await this.runPhase('PerformanceMonitor', () => this.perf.audit(), phases);

    const overallStatus: AgentStatus = phases.some(p => p.status === 'failure')
      ? 'failure'
      : phases.some(p => p.status === 'warning')
      ? 'warning'
      : 'success';

    const result = this.buildResult(startedAt, pipelineStart, overallStatus, phases);
    this.printSummary(result);
    return result;
  }

  private async runPhase(
    name: string,
    fn: () => Promise<{ status: AgentStatus }>,
    phases: PipelinePhase[]
  ): Promise<AgentStatus> {
    const start = Date.now();
    console.log(`\n▶ Fase: ${name}`);
    console.log('─'.repeat(40));

    try {
      const result = await fn();
      const durationMs = Date.now() - start;
      phases.push({ name, status: result.status, durationMs });
      return result.status;
    } catch (error) {
      const durationMs = Date.now() - start;
      console.error(`❌ ${name} lançou exceção: ${error}`);
      phases.push({ name, status: 'failure', durationMs });
      return 'failure';
    }
  }

  private buildResult(
    startedAt: string,
    pipelineStart: number,
    status: AgentStatus,
    phases: PipelinePhase[]
  ): PipelineResult {
    return {
      startedAt,
      finishedAt: new Date().toISOString(),
      totalDurationMs: Date.now() - pipelineStart,
      status,
      phases,
    };
  }

  private printSummary(result: PipelineResult): void {
    const icon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    const totalSec = (result.totalDurationMs / 1000).toFixed(1);

    console.log('\n' + '═'.repeat(50));
    console.log(`${icon} Pipeline ${result.status.toUpperCase()} em ${totalSec}s`);
    console.log('─'.repeat(50));

    for (const phase of result.phases) {
      const phaseIcon = phase.status === 'success' ? '✅' : phase.status === 'warning' ? '⚠️' : phase.status === 'skipped' ? '⏭️' : '❌';
      const sec = (phase.durationMs / 1000).toFixed(1);
      console.log(`  ${phaseIcon} ${phase.name.padEnd(22)} ${sec}s`);
    }

    console.log('═'.repeat(50) + '\n');
  }
}

// ─── Entry point ────────────────────────────────────────────────────────────
// Para rodar: npx ts-node .agents/orchestrator.ts
if (require.main === module) {
  const orchestrator = new Orchestrator();
  orchestrator.runFullPipeline().then(result => {
    process.exit(result.status === 'failure' ? 1 : 0);
  });
}
