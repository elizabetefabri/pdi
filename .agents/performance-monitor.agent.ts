/**
 * PerformanceMonitorAgent — BMAD
 *
 * Business:    Audita a performance do projeto usando Lighthouse.
 *              Gera sugestões concretas quando scores ficam abaixo do alvo.
 *
 * Model:       PerformanceResult, LighthouseScores (ver types.ts)
 *
 * Architecture: Depende do BuildAgent (precisa do app rodando).
 *               Requer que `ng serve` ou o SSR esteja ativo na porta alvo.
 *               Não instala Lighthouse globalmente — usa npx.
 *
 * Design:      Executa Lighthouse em modo headless via CLI.
 *              Targets: Performance > 90, Accessibility > 90, SEO > 90.
 *              Falha graciosamente se o servidor não está disponível.
 */

import { execSync } from 'child_process';
import { PerformanceResult, LighthouseScores } from './types';

export class PerformanceMonitorAgent {
  readonly name = 'PerformanceMonitorAgent';
  readonly version = '1.0';

  readonly targets: LighthouseScores = {
    performance: 90,
    accessibility: 90,
    bestPractices: 85,
    seo: 90,
  };

  async audit(url = 'http://localhost:4200'): Promise<PerformanceResult> {
    const start = Date.now();
    console.log(`[${this.name}] Auditando ${url}...`);

    if (!this.isServerAvailable(url)) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'skipped',
        message: `⏭️  Servidor não disponível em ${url} — rode \`npm start\` antes`,
      };
    }

    try {
      const output = execSync(
        `npx lighthouse ${url} --chrome-flags="--headless --no-sandbox" --output=json --quiet`,
        { encoding: 'utf-8', timeout: 60000 }
      );

      const report = JSON.parse(output);
      const scores: LighthouseScores = {
        performance:    Math.round(report.categories.performance.score * 100),
        accessibility:  Math.round(report.categories.accessibility.score * 100),
        bestPractices:  Math.round(report.categories['best-practices'].score * 100),
        seo:            Math.round(report.categories.seo.score * 100),
      };

      const suggestions = this.buildSuggestions(scores);
      const allPassed = Object.entries(scores).every(
        ([key, val]) => val >= this.targets[key as keyof LighthouseScores]
      );

      const durationMs = Date.now() - start;
      const result: PerformanceResult = {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: allPassed ? 'success' : 'warning',
        durationMs,
        scores,
        suggestions,
        message: allPassed
          ? `✅ Todos os scores acima do alvo (${durationMs}ms)`
          : `⚠️  Scores abaixo do alvo — veja sugestões abaixo`,
      };

      console.log(`[${this.name}] Scores:`, scores);
      if (suggestions.length > 0) {
        console.log(`[${this.name}] Sugestões:\n${suggestions.map(s => `  ${s}`).join('\n')}`);
      }
      return result;
    } catch (error) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        error: String(error),
        message: `❌ Erro ao executar Lighthouse: ${error}`,
      };
    }
  }

  private isServerAvailable(url: string): boolean {
    try {
      execSync(`curl -s -o /dev/null -w "%{http_code}" ${url}`, { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }

  private buildSuggestions(scores: LighthouseScores): string[] {
    const suggestions: string[] = [];

    if (scores.performance < this.targets.performance) {
      suggestions.push('• Performance: implementar lazy loading, reduzir bundle size, otimizar imagens');
    }
    if (scores.accessibility < this.targets.accessibility) {
      suggestions.push('• Accessibility: melhorar contraste, adicionar aria-labels, checar foco de teclado');
    }
    if (scores.bestPractices < this.targets.bestPractices) {
      suggestions.push('• Best Practices: usar HTTPS, remover console.log, atualizar dependências');
    }
    if (scores.seo < this.targets.seo) {
      suggestions.push('• SEO: adicionar meta tags, título de página, canonical links');
    }

    return suggestions;
  }
}
