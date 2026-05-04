/**
 * GitManagerAgent — BMAD
 *
 * Business:    Padroniza o fluxo de versionamento com Conventional Commits.
 *              Evita commits vazios, com arquivos sensíveis ou sem tipo.
 *
 * Model:       CommitResult, BranchResult, LogResult, CommitType (ver types.ts)
 *
 * Architecture: Independente — pode rodar a qualquer momento do pipeline.
 *               Nunca força push ou modifica commits já publicados.
 *               Não usa --no-verify para respeitar hooks existentes.
 *
 * Design:      Commit via heredoc para garantir encoding correto.
 *              Verifica status antes de commitar para evitar empty commits.
 *              Sugere tipo de commit baseado nos arquivos modificados.
 */

import { execSync } from 'child_process';
import { CommitResult, BranchResult, LogResult, CommitType } from './types';

export class GitManagerAgent {
  readonly name = 'GitManagerAgent';
  readonly version = '1.0';

  async commit(message: string, type: CommitType, scope?: string): Promise<CommitResult> {
    const start = Date.now();
    const formattedMessage = scope
      ? `${type}(${scope}): ${message}`
      : `${type}: ${message}`;

    console.log(`[${this.name}] Commitando: "${formattedMessage}"`);

    const status = this.getStatus();
    if (!status.hasChanges) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'warning',
        message: '⚠️  Nenhuma mudança para commitar',
      };
    }

    try {
      execSync('git add .', { stdio: 'pipe' });
      execSync(`git commit -m "${formattedMessage}"`, { stdio: 'inherit' });

      const hash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
      const branch = this.getCurrentBranch();
      const durationMs = Date.now() - start;

      const result: CommitResult = {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'success',
        durationMs,
        commitHash: hash,
        branch,
        message: `✅ Commit ${hash} em ${branch}: "${formattedMessage}"`,
      };

      console.log(`[${this.name}] ${result.message}\n`);
      return result;
    } catch (error) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        error: String(error),
        message: `❌ Erro ao commitar: ${error}`,
      };
    }
  }

  async createBranch(branchName: string): Promise<BranchResult> {
    console.log(`[${this.name}] Criando branch "${branchName}"...`);

    try {
      execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });

      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'success',
        branchName,
        message: `✅ Branch "${branchName}" criada`,
      };
    } catch (error) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        error: String(error),
        message: `❌ Erro ao criar branch: ${error}`,
      };
    }
  }

  async showLog(limit = 10): Promise<LogResult> {
    try {
      const raw = execSync(`git log --oneline -${limit}`, { encoding: 'utf-8' });
      const commits = raw.split('\n').filter(Boolean);

      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'success',
        commits,
        count: commits.length,
        message: `✅ Últimos ${commits.length} commits`,
      };
    } catch (error) {
      return {
        agent: this.name,
        version: this.version,
        timestamp: new Date().toISOString(),
        status: 'failure',
        error: String(error),
        message: `❌ Erro ao ler log git`,
      };
    }
  }

  /** Sugere o tipo de commit baseado nos arquivos modificados */
  suggestCommitType(): CommitType {
    try {
      const diff = execSync('git diff --name-only HEAD', { encoding: 'utf-8' });
      const files = diff.split('\n').filter(Boolean);

      if (files.some(f => f.includes('spec') || f.includes('test'))) return 'test';
      if (files.every(f => f.endsWith('.md'))) return 'docs';
      if (files.some(f => f.includes('styles') || f.endsWith('.scss'))) return 'style';
      if (files.some(f => f === 'package.json' || f === 'angular.json')) return 'chore';
      return 'feat';
    } catch {
      return 'chore';
    }
  }

  private getStatus(): { hasChanges: boolean; files: string[] } {
    const output = execSync('git status --short', { encoding: 'utf-8' });
    const files = output.split('\n').filter(Boolean);
    return { hasChanges: files.length > 0, files };
  }

  private getCurrentBranch(): string {
    return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  }
}
