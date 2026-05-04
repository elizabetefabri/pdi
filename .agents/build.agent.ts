/**
 * BuildAgent — BMAD
 *
 * Business:    Compila o projeto Angular com SSR e verifica se o bundle
 *              está dentro do limite de performance aceitável (< 500KB).
 *
 * Model:       BuildResult, BundleAnalysis (ver types.ts)
 *
 * Architecture: Roda após ComponentGeneratorAgent e StyleManagerAgent.
 *               Precisa que os componentes e estilos estejam prontos.
 *               Gera os artefatos em dist/pdi/.
 *
 * Design:      Usa `ng build` via CLI. Em produção adiciona otimização.
 *              Analisa o bundle principal após o build.
 *              Bundle > 500KB gera status 'warning', não 'failure'.
 */

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { BuildResult, BuildEnvironment, BundleAnalysis } from './types';

export class BuildAgent {
  readonly name = 'BuildAgent';
  readonly version = '1.0';

  private readonly BUNDLE_LIMIT_KB = 500;
  private readonly DIST_PATH = 'dist/pdi/browser';

  async build(environment: BuildEnvironment = 'production'): Promise<BuildResult> {
    const start = Date.now();
    console.log(`[${this.name}] Building ${environment}...`);

    const command = environment === 'production'
      ? 'npm run build'
      : 'npm run build -- --configuration development';

    try {
      execSync(command, { stdio: 'inherit' });

      const bundle = this.analyzeBundleSize();
      const durationMs = Date.now() - start;

      const result: BuildResult = {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: bundle.isOptimal ? 'success' : 'warning',
        durationMs,
        environment,
        bundle,
        message: bundle.isOptimal
          ? `✅ Build ${environment} completo — ${bundle.mainKB}KB (${durationMs}ms)`
          : `⚠️  Build completo mas bundle grande: ${bundle.mainKB}KB (limite: ${this.BUNDLE_LIMIT_KB}KB)`,
      };

      console.log(`[${this.name}] ${result.message}\n`);
      return result;
    } catch (error) {
      const durationMs = Date.now() - start;
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        durationMs,
        environment,
        error: String(error),
        message: `❌ Erro ao fazer build: ${error}`,
      };
    }
  }

  private analyzeBundleSize(): BundleAnalysis {
    // Angular gera múltiplos chunks — verifica o main bundle
    const candidates = [
      `${this.DIST_PATH}/main.js`,
      `${this.DIST_PATH}/chunk-`,
    ];

    let totalKB = 0;
    let mainKB = 0;

    if (existsSync(this.DIST_PATH)) {
      try {
        const { readdirSync } = require('fs');
        const files: string[] = readdirSync(this.DIST_PATH);

        for (const file of files) {
          if (file.endsWith('.js')) {
            const size = statSync(`${this.DIST_PATH}/${file}`).size;
            const sizeKB = Math.round(size / 1024);
            totalKB += sizeKB;
            if (file.startsWith('main')) mainKB = sizeKB;
          }
        }
      } catch {
        // dist não encontrado ainda
      }
    }

    return {
      mainKB,
      totalKB,
      isOptimal: totalKB < this.BUNDLE_LIMIT_KB,
    };
  }
}
