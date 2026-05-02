/**
 * DeployAgent — BMAD
 *
 * Business:    Publica o projeto no Vercel com SSR habilitado.
 *              Staging para validação antes de ir para produção.
 *
 * Model:       DeployResult (ver types.ts)
 *
 * Architecture: Depende do BuildAgent — só roda depois do build concluído.
 *               Verifica se Vercel CLI está disponível antes de prosseguir.
 *               Não instala o CLI globalmente — delega ao usuário se ausente.
 *
 * Design:      Usa `vercel` CLI. Extrai a URL do output para relatório.
 *              Produção usa `vercel --prod`. Staging usa `vercel` (preview).
 */

import { execSync } from 'child_process';
import { DeployResult, DeployEnvironment } from './types';

export class DeployAgent {
  readonly name = 'DeployAgent';
  readonly version = '1.0';

  async deploy(environment: DeployEnvironment = 'staging'): Promise<DeployResult> {
    const start = Date.now();
    console.log(`[${this.name}] Deploying to ${environment}...`);

    if (!this.isVercelAvailable()) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        environment,
        message: '❌ Vercel CLI não encontrado. Instale com: npm install -g vercel',
        error: 'vercel CLI not found',
      };
    }

    const command = environment === 'production' ? 'vercel --prod' : 'vercel';

    try {
      const output = execSync(command, { encoding: 'utf-8' });
      const url = this.extractUrl(output);
      const durationMs = Date.now() - start;

      const result: DeployResult = {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'success',
        durationMs,
        environment,
        url,
        message: `✅ Deploy ${environment} concluído — ${url} (${durationMs}ms)`,
      };

      console.log(`[${this.name}] ${result.message}\n`);
      return result;
    } catch (error) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        environment,
        error: String(error),
        message: `❌ Erro no deploy: ${error}`,
      };
    }
  }

  private isVercelAvailable(): boolean {
    try {
      execSync('vercel --version', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }

  private extractUrl(output: string): string {
    const match = output.match(/https:\/\/[^\s]+\.vercel\.app/);
    return match ? match[0] : 'URL não detectada no output';
  }
}
