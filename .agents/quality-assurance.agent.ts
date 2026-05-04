/**
 * QualityAssuranceAgent — BMAD
 *
 * Business:    Verifica a qualidade do código antes do build e deploy.
 *              Cobre lint, tipagem TypeScript e testes unitários.
 *
 * Model:       QualityResult, QualityChecks (ver types.ts)
 *
 * Architecture: Roda após ComponentGeneratorAgent.
 *               Deve ser executado antes do BuildAgent no pipeline.
 *               Falhas de tipo são bloqueantes; lint e testes geram warnings.
 *
 * Design:      Cada check roda de forma isolada e captura o resultado.
 *              TypeScript check usa `tsc --noEmit` (sem compilar output).
 *              Lint usa `ng lint` se existir, ignora graciosamente se ausente.
 */

import { execSync } from 'child_process';
import { QualityResult, QualityChecks, AgentStatus } from './types';

export class QualityAssuranceAgent {
  readonly name = 'QualityAssuranceAgent';
  readonly version = '1.0';

  async runQualityChecks(): Promise<QualityResult> {
    const start = Date.now();
    console.log(`[${this.name}] Executando verificações de qualidade...`);

    const checks: QualityChecks = {
      lint: this.runLint(),
      typeCheck: this.runTypeCheck(),
      tests: this.runTests(),
      bundleSize: 'skipped', // avaliado pelo BuildAgent
    };

    const hasFailure = Object.values(checks).includes('failure');
    const hasWarning = Object.values(checks).includes('warning');
    const status: AgentStatus = hasFailure ? 'failure' : hasWarning ? 'warning' : 'success';

    const durationMs = Date.now() - start;

    const summary = [
      `lint: ${this.icon(checks.lint)}`,
      `types: ${this.icon(checks.typeCheck)}`,
      `tests: ${this.icon(checks.tests)}`,
    ].join(' · ');

    const result: QualityResult = {
      agent: this.name,
      version: this.version,
      timestamp: new Date().toISOString(),
      status,
      durationMs,
      checks,
      summary,
      message: status === 'success'
        ? `✅ Todas as verificações passaram (${durationMs}ms)`
        : `${status === 'failure' ? '❌' : '⚠️'} Verificações com problemas — ${summary}`,
    };

    console.log(`[${this.name}] ${result.message}\n`);
    return result;
  }

  private runLint(): AgentStatus {
    try {
      execSync('npx eslint src/ --ext .ts,.html --max-warnings 0', { stdio: 'pipe' });
      console.log('  ✅ Lint: sem erros');
      return 'success';
    } catch {
      // ESLint pode não estar configurado — não bloqueia
      console.log('  ⚠️  Lint: não configurado ou com warnings');
      return 'warning';
    }
  }

  private runTypeCheck(): AgentStatus {
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      console.log('  ✅ TypeScript: sem erros');
      return 'success';
    } catch (error) {
      console.error('  ❌ TypeScript: erros de tipagem encontrados');
      console.error('     Execute: npx tsc --noEmit para ver os detalhes');
      return 'failure';
    }
  }

  private runTests(): AgentStatus {
    try {
      // Jest é o test runner do projeto
      execSync('npm test -- --runInBand', { stdio: 'pipe' });
      console.log('  ✅ Testes: todos passaram');
      return 'success';
    } catch {
      console.log('  ⚠️  Testes: ainda não implementados ou com falhas');
      return 'warning';
    }
  }

  private icon(status: AgentStatus): string {
    const icons: Record<AgentStatus, string> = {
      success: '✅',
      failure: '❌',
      warning: '⚠️',
      skipped: '⏭️',
    };
    return icons[status];
  }
}
