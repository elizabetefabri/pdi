/**
 * ComponentGeneratorAgent — BMAD
 *
 * Business:    Gera componentes Angular standalone com boilerplate correto,
 *              evitando código desatualizado (módulos, decorators antigos).
 *
 * Model:       ComponentConfig, ComponentGenerated, GeneratorResult (ver types.ts)
 *
 * Architecture: Roda após SetupAgent. Usa Angular CLI para gerar os arquivos
 *               e depois aplica ajustes de template quando necessário.
 *
 * Design:      Cada componente é gerado via `ng generate component --standalone`.
 *              Componentes com template 'full' recebem boilerplate de SCSS.
 *              Idempotente: pula componentes já existentes.
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { ComponentConfig, ComponentGenerated, GeneratorResult } from './types';

export class ComponentGeneratorAgent {
  readonly name = 'ComponentGeneratorAgent';
  readonly version = '1.0';

  // Componentes padrão do projeto PDI
  static readonly DEFAULT_COMPONENTS: ComponentConfig[] = [
    { name: 'header', path: 'shared/components/header', layer: 'shared', template: 'full' },
    { name: 'footer', path: 'shared/components/footer', layer: 'shared', template: 'full' },
    { name: 'evolution-chart', path: 'shared/components/charts/evolution-chart', layer: 'shared', template: 'basic' },
    { name: 'dashboard', path: 'features/dashboard', layer: 'feature', template: 'full' },
    { name: 'skills', path: 'features/skills', layer: 'feature', template: 'full' },
    { name: 'projetos', path: 'features/projetos', layer: 'feature', template: 'full' },
    { name: 'roadmap', path: 'features/roadmap', layer: 'feature', template: 'full' },
  ];

  async generate(components: ComponentConfig[] = ComponentGeneratorAgent.DEFAULT_COMPONENTS): Promise<GeneratorResult> {
    const start = Date.now();
    console.log(`[${this.name}] Gerando ${components.length} componentes...`);

    const results: ComponentGenerated[] = components.map(config => this.generateOne(config));

    const generated = results.filter(r => r.status === 'generated').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const durationMs = Date.now() - start;

    const result: GeneratorResult = {
      agent: this.name,
      version: this.version,
      timestamp: new Date().toISOString(),
      status: failed > 0 ? 'failure' : 'success',
      durationMs,
      total: components.length,
      generated,
      skipped,
      components: results,
      message: `✅ ${generated} gerados · ${skipped} ignorados · ${failed} falhas (${durationMs}ms)`,
    };

    console.log(`[${this.name}] ${result.message}\n`);
    return result;
  }

  private generateOne(config: ComponentConfig): ComponentGenerated {
    const componentPath = `src/app/${config.path}`;
    const tsFile = `${componentPath}/${config.name}.component.ts`;

    // Idempotente: pula se já existe
    if (existsSync(tsFile)) {
      console.log(`  ⏭️  Ignorado (já existe): ${config.path}`);
      return { name: config.name, path: config.path, status: 'skipped' };
    }

    try {
      execSync(
        `ng generate component ${config.path} --standalone --skip-tests`,
        { stdio: 'pipe' }
      );

      if (config.template === 'full') {
        this.applyFullTemplate(config);
      }

      console.log(`  ✅ Gerado: ${config.path}`);
      return {
        name: config.name,
        path: config.path,
        status: 'generated',
        files: [`${tsFile}`, `${componentPath}/${config.name}.component.html`, `${componentPath}/${config.name}.component.scss`],
      };
    } catch (error) {
      console.error(`  ❌ Falha: ${config.path} — ${error}`);
      return { name: config.name, path: config.path, status: 'failed', error: String(error) };
    }
  }

  private applyFullTemplate(config: ComponentConfig): void {
    const scssPath = `src/app/${config.path}/${config.name}.component.scss`;
    const scss = `.${config.name} {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-lg);\n}\n`;
    writeFileSync(scssPath, scss);
  }
}
