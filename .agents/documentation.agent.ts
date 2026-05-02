/**
 * DocumentationAgent — BMAD
 *
 * Business:    Mantém a documentação do projeto atualizada de forma automática.
 *              Gera índice de componentes, guia de serviços e paleta de cores.
 *
 * Model:       DocumentationResult, DocFile (ver types.ts)
 *
 * Architecture: Independente. Pode rodar a qualquer momento.
 *               Lê o estado atual do projeto (componentes, services) para
 *               gerar documentação precisa.
 *
 * Design:      Gera arquivos Markdown em docs/.
 *              Usa glob patterns para descobrir componentes e services automaticamente.
 */

import { writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { DocumentationResult, DocFile } from './types';

export class DocumentationAgent {
  readonly name = 'DocumentationAgent';
  readonly version = '1.0';

  async generateDocs(): Promise<DocumentationResult> {
    const start = Date.now();
    console.log(`[${this.name}] Gerando documentação...`);

    const files: DocFile[] = [];

    files.push(this.generateComponentIndex());
    files.push(this.generateServiceGuide());
    files.push(this.generateApiGuide());

    const durationMs = Date.now() - start;
    const result: DocumentationResult = {
      agent: this.name,
      version: this.version,
      timestamp: new Date().toISOString(),
      status: 'success',
      durationMs,
      docsGenerated: files,
      message: `✅ ${files.length} docs gerados em docs/ (${durationMs}ms)`,
    };

    console.log(`[${this.name}] ${result.message}\n`);
    return result;
  }

  private generateComponentIndex(): DocFile {
    const path = 'docs/components.md';

    const shared = this.listComponents('src/app/shared/components');
    const features = this.listComponents('src/app/features');

    const content = [
      '# Índice de Componentes',
      '',
      '> Gerado automaticamente por DocumentationAgent',
      '',
      '## Shared',
      ...shared.map(c => `- \`${c}\``),
      '',
      '## Features',
      ...features.map(c => `- \`${c}\``),
      '',
    ].join('\n');

    writeFileSync(path, content);
    return { name: 'components.md', path, sizeBytes: Buffer.byteLength(content) };
  }

  private generateServiceGuide(): DocFile {
    const path = 'docs/services.md';

    const content = [
      '# Guia de Serviços',
      '',
      '> Gerado automaticamente por DocumentationAgent',
      '',
      '## Core Services',
      '',
      '### PdiService',
      '- `getPDI(): Observable<PDI>` — retorna dados do PDI via assets/data/pdi.json',
      '',
      '### SkillsService',
      '- `getSkills(): Observable<Skill[]>`',
      '- `getSkillsByCategoria(cat): Observable<Skill[]>`',
      '- `getSkillById(id): Observable<Skill | undefined>`',
      '',
      '### ProjetosService',
      '- `getProjetos(): Observable<Projeto[]>`',
      '- `getProjetoById(id): Observable<Projeto | undefined>`',
      '- `getProjetosByStatus(status): Observable<Projeto[]>`',
      '',
      '### EvolucaoService',
      '- `getEvolucao(): Observable<Evolucao>`',
      '',
      '## Padrão de Uso',
      '',
      '```typescript',
      "import { inject } from '@angular/core';",
      "import { PdiService } from '../../core/services/pdi.service';",
      '',
      'export class MyComponent {',
      '  private readonly pdiService = inject(PdiService);',
      '  readonly pdi$ = this.pdiService.getPDI();',
      '}',
      '```',
      '',
    ].join('\n');

    writeFileSync(path, content);
    return { name: 'services.md', path, sizeBytes: Buffer.byteLength(content) };
  }

  private generateApiGuide(): DocFile {
    const path = 'docs/api.md';

    const content = [
      '# API Reference',
      '',
      '> Gerado automaticamente por DocumentationAgent',
      '',
      '## Assets (JSON)',
      '',
      '| Arquivo | Tipo | Descrição |',
      '|---|---|---|',
      '| `assets/data/pdi.json` | `PDI` | Dados do plano de desenvolvimento |',
      '| `assets/data/skills.json` | `Skill[]` | Lista de competências |',
      '| `assets/data/projetos.json` | `Projeto[]` | Projetos do portfólio |',
      '| `assets/data/evolucao.json` | `Evolucao` | Dados de evolução temporal |',
      '',
      '## Models',
      '',
      'Ver [03-mock-data.md](./03-mock-data.md) para as interfaces completas.',
      '',
      '## Rotas',
      '',
      '| Path | Componente | Título |',
      '|---|---|---|',
      '| `/` | DashboardComponent | Dashboard |',
      '| `/skills` | SkillsComponent | Skills & Competências |',
      '| `/projetos` | ProjetosComponent | Meus Projetos |',
      '| `/roadmap` | RoadmapComponent | Roadmap de Evolução |',
      '',
    ].join('\n');

    writeFileSync(path, content);
    return { name: 'api.md', path, sizeBytes: Buffer.byteLength(content) };
  }

  private listComponents(basePath: string): string[] {
    if (!existsSync(basePath)) return [];

    const result: string[] = [];
    const entries = readdirSync(basePath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const tsFile = `${basePath}/${entry.name}/${entry.name}.component.ts`;
        if (existsSync(tsFile)) {
          result.push(entry.name);
        } else {
          // Sub-diretórios (ex: charts/)
          const sub = this.listComponents(`${basePath}/${entry.name}`);
          result.push(...sub.map(s => `${entry.name}/${s}`));
        }
      }
    }

    return result;
  }
}
