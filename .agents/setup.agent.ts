/**
 * SetupAgent — BMAD
 *
 * Business:    Garante que a estrutura de pastas do projeto existe e está correta
 *              antes de qualquer outro agente rodar.
 *
 * Model:       SetupResult (ver types.ts)
 *
 * Architecture: Primeiro agente do pipeline. Todos os outros dependem dele.
 *               Não instala dependências — apenas verifica e cria diretórios.
 *
 * Design:      Cria pastas de forma idempotente (mkdirSync recursive).
 *              Valida que package.json e angular.json existem.
 */

import { mkdirSync, existsSync } from 'fs';
import { SetupResult, AgentStatus } from './types';

export class SetupAgent {
  readonly name = 'SetupAgent';
  readonly version = '1.0';

  private readonly requiredFolders = [
    'src/app/core/services',
    'src/app/core/models',
    'src/app/features/dashboard',
    'src/app/features/skills',
    'src/app/features/projetos',
    'src/app/features/roadmap',
    'src/app/shared/components/header',
    'src/app/shared/components/footer',
    'src/app/shared/components/charts',
    'src/assets/data',
    'src/assets/icons',
  ];

  private readonly requiredFiles = [
    'package.json',
    'angular.json',
    'tsconfig.json',
    'src/main.ts',
    'src/app/app.ts',
    'src/app/app.config.ts',
    'src/app/app.routes.ts',
  ];

  async execute(): Promise<SetupResult> {
    const start = Date.now();
    console.log(`[${this.name}] Iniciando verificação de ambiente...`);

    const created: string[] = [];
    const missing: string[] = [];

    // Criar pastas ausentes
    for (const folder of this.requiredFolders) {
      if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
        created.push(folder);
        console.log(`  ✅ Criada: ${folder}`);
      }
    }

    // Verificar arquivos obrigatórios
    for (const file of this.requiredFiles) {
      if (!existsSync(file)) {
        missing.push(file);
        console.warn(`  ⚠️  Ausente: ${file}`);
      }
    }

    const status: AgentStatus = missing.length > 0 ? 'warning' : 'success';
    const durationMs = Date.now() - start;

    const result: SetupResult = {
      agent: this.name,
      version: this.version,
      timestamp: new Date().toISOString(),
      status,
      durationMs,
      foldersCreated: created,
      message:
        status === 'success'
          ? `✅ Setup completo. ${created.length} pastas criadas.`
          : `⚠️  Setup parcial. Arquivos ausentes: ${missing.join(', ')}`,
    };

    console.log(`[${this.name}] ${result.message} (${durationMs}ms)\n`);
    return result;
  }
}
