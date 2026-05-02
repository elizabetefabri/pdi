/**
 * DataManagerAgent — BMAD
 *
 * Business:    Cria e mantém os dados mock usados pelo frontend enquanto
 *              não há backend. Garante que os JSON em assets/data/ existam
 *              e estejam conformes com os models TypeScript.
 *
 * Model:       DataFile, DataCreationResult + modelos do projeto (PDI, Skill, etc.)
 *
 * Architecture: Roda após SetupAgent. Independente de ComponentGeneratorAgent.
 *               Gera arquivos JSON em src/assets/data/.
 *               Idempotente: não sobrescreve arquivos existentes.
 *
 * Design:      Os dados são definidos como constantes TypeScript tipadas,
 *              garantindo que o shape dos JSONs bate com os models.
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { DataFile, DataCreationResult } from './types';

// ─── Tipos inline (devem bater com src/app/core/models/) ────────────────────

interface PDI {
  id: string; nome: string; cargo: string; empresa: string;
  nivelAtual: string; nivelObjetivo: string; dataInicio: string;
  dataTermo: string; descricao: string; metasPrincipais: string[];
}

interface Skill {
  id: string; nome: string; categoria: string; nivel: number;
  nivelAlvo?: number; icon: string; dataAquisicao: string;
  descricao?: string; projetos?: string[];
}

interface Projeto {
  id: string; nome: string; descricao: string; dataInicio: string;
  dataFim: string; tecnologias: string[]; seuPapel: string;
  impacto: { usuariosAfetados?: number; performanceMelhoria?: string; roiEstimado?: string; outrasMetricas?: string[] };
  desafios: string[]; aprendizados: string[];
  status: 'completed' | 'in-progress' | 'planned'; icon: string;
}

interface Evolucao {
  skillsEvolution: Array<{ mes: string; nivel: number; competenciasCount: number; projetosCompletos: number; feedbackPositivo?: number }>;
  nivelEvolution: Array<{ mes: string; nivelTecnico: number; lideranca: number; mentorias: number }>;
}

// ─── Dados ──────────────────────────────────────────────────────────────────

const PDI_DATA: PDI = {
  id: 'pdi-2026',
  nome: 'Liza',
  cargo: 'Frontend / Platform Engineer',
  empresa: 'Itaú',
  nivelAtual: 'Pleno',
  nivelObjetivo: 'Sênior',
  dataInicio: '2026-01-01',
  dataTermo: '2029-01-01',
  descricao: 'Plano de desenvolvimento de 3 anos para evoluir de Pleno para Sênior',
  metasPrincipais: [
    'Dominar arquitetura de sistemas distribuídos',
    'Liderar projetos técnicos críticos',
    'Mentorar outros desenvolvedores',
    'Profundidade em AWS (Solutions Architect)',
    'Excelência em código limpo e DDD',
  ],
};

const SKILLS_DATA: Skill[] = [
  { id: 'nextjs', nome: 'Next.js', categoria: 'Frontend Framework', nivel: 9, nivelAlvo: 9, icon: '⚛️', dataAquisicao: '2024-01-01', descricao: 'Framework React meta-framework full-stack', projetos: ['proj-001'] },
  { id: 'angular', nome: 'Angular', categoria: 'Frontend Framework', nivel: 8, nivelAlvo: 9, icon: '🔴', dataAquisicao: '2023-06-01', descricao: 'Framework enterprise para aplicações escaláveis', projetos: ['proj-001'] },
  { id: 'typescript', nome: 'TypeScript', categoria: 'Language', nivel: 9, nivelAlvo: 9.5, icon: '📘', dataAquisicao: '2023-01-01', descricao: 'Linguagem tipada para JavaScript', projetos: ['proj-001', 'proj-002', 'proj-003'] },
  { id: 'aws', nome: 'AWS', categoria: 'Cloud', nivel: 4, nivelAlvo: 7, icon: '☁️', dataAquisicao: '2025-03-01', descricao: 'Amazon Web Services — cloud computing', projetos: ['proj-001', 'proj-002'] },
  { id: 'nodejs', nome: 'Node.js', categoria: 'Backend', nivel: 8, nivelAlvo: 8, icon: '🟢', dataAquisicao: '2023-06-01', descricao: 'JavaScript runtime para servidor', projetos: ['proj-002'] },
  { id: 'architecture', nome: 'System Architecture', categoria: 'Soft Skills', nivel: 5, nivelAlvo: 8, icon: '🏗️', dataAquisicao: '2025-06-01', descricao: 'Design de arquiteturas escaláveis', projetos: ['proj-001', 'proj-002'] },
];

const PROJETOS_DATA: Projeto[] = [
  {
    id: 'proj-001', nome: 'Replatforma do Portal Frontend', icon: '🚀',
    descricao: 'Migração de Angular legado para Next.js com refatoração completa',
    dataInicio: '2025-12-01', dataFim: '2026-03-31', status: 'completed',
    tecnologias: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS'],
    seuPapel: 'Tech Lead Frontend / Arquitetura',
    impacto: { usuariosAfetados: 50000, performanceMelhoria: '45%', roiEstimado: '$200k', outrasMetricas: ['Bundle reduzido 60%', 'Time de 8 → 5 pessoas'] },
    desafios: ['Integração com APIs legacy', 'Migração sem downtime', 'Remoção IE11'],
    aprendizados: ['Migração gradual', 'Performance em escala', 'Liderança técnica'],
  },
  {
    id: 'proj-002', nome: 'Sistema de Observabilidade', icon: '📊',
    descricao: 'Stack ELK + Grafana para toda a plataforma',
    dataInicio: '2026-04-01', dataFim: '2026-06-30', status: 'in-progress',
    tecnologias: ['AWS CloudWatch', 'Grafana', 'ELK Stack', 'Node.js'],
    seuPapel: 'Arquiteto de Observabilidade',
    impacto: { usuariosAfetados: 100000, performanceMelhoria: 'Issues em <30s', roiEstimado: '$150k', outrasMetricas: ['MTTR -70%'] },
    desafios: ['10M+ logs/dia', 'Custo de storage', 'Integração legacy'],
    aprendizados: ['Observabilidade em escala', 'Custo cloud', 'Mentoria 2 juniores'],
  },
  {
    id: 'proj-003', nome: 'Design System v2', icon: '🎨',
    descricao: 'Refatoração com componentes reutilizáveis e Storybook',
    dataInicio: '2026-07-01', dataFim: '2026-09-30', status: 'planned',
    tecnologias: ['Angular', 'Storybook', 'TypeScript', 'Taiga UI'],
    seuPapel: 'Lead Arquitetura Design System',
    impacto: { usuariosAfetados: 200, performanceMelhoria: 'Reuso 80%', roiEstimado: '$100k', outrasMetricas: ['Dev -40%'] },
    desafios: ['Adoção multi-time', 'Versionamento', 'Migration path'],
    aprendizados: ['Liderança cross-team', 'Design system thinking', 'Trade-offs'],
  },
];

const EVOLUCAO_DATA: Evolucao = {
  skillsEvolution: [
    { mes: 'Jan 2026', nivel: 6.0, competenciasCount: 5, projetosCompletos: 0, feedbackPositivo: 8 },
    { mes: 'Fev 2026', nivel: 6.5, competenciasCount: 5, projetosCompletos: 0, feedbackPositivo: 8.5 },
    { mes: 'Mar 2026', nivel: 7.0, competenciasCount: 6, projetosCompletos: 1, feedbackPositivo: 9 },
    { mes: 'Abr 2026', nivel: 7.3, competenciasCount: 7, projetosCompletos: 1, feedbackPositivo: 9 },
    { mes: 'Mai 2026', nivel: 7.6, competenciasCount: 8, projetosCompletos: 1, feedbackPositivo: 8.5 },
    { mes: 'Jun 2026', nivel: 8.0, competenciasCount: 8, projetosCompletos: 2, feedbackPositivo: 9 },
  ],
  nivelEvolution: [
    { mes: 'Jan 2026', nivelTecnico: 6, lideranca: 4, mentorias: 0 },
    { mes: 'Abr 2026', nivelTecnico: 7, lideranca: 6, mentorias: 2 },
    { mes: 'Jun 2026', nivelTecnico: 7.5, lideranca: 7, mentorias: 5 },
  ],
};

// ─── Agente ─────────────────────────────────────────────────────────────────

export class DataManagerAgent {
  readonly name = 'DataManagerAgent';
  readonly version = '1.0';

  private readonly dataDir = 'src/assets/data';

  async createMockData(overwrite = false): Promise<DataCreationResult> {
    const start = Date.now();
    console.log(`[${this.name}] Criando dados mock...`);

    mkdirSync(this.dataDir, { recursive: true });

    const files: DataFile[] = [
      this.writeJson('pdi.json', PDI_DATA, overwrite),
      this.writeJson('skills.json', SKILLS_DATA, overwrite),
      this.writeJson('projetos.json', PROJETOS_DATA, overwrite),
      this.writeJson('evolucao.json', EVOLUCAO_DATA, overwrite),
    ];

    const durationMs = Date.now() - start;
    const result: DataCreationResult = {
      agent: this.name,
      version: this.version,
      timestamp: new Date().toISOString(),
      status: 'success',
      durationMs,
      filesCreated: files,
      message: `✅ ${files.length} arquivos JSON prontos em ${this.dataDir}/ (${durationMs}ms)`,
    };

    console.log(`[${this.name}] ${result.message}\n`);
    return result;
  }

  private writeJson(filename: string, data: unknown, overwrite: boolean): DataFile {
    const path = `${this.dataDir}/${filename}`;
    const json = JSON.stringify(data, null, 2);

    if (!overwrite && existsSync(path)) {
      console.log(`  ⏭️  Ignorado (já existe): ${filename}`);
    } else {
      writeFileSync(path, json, 'utf-8');
      console.log(`  ✅ Escrito: ${filename}`);
    }

    const recordCount = Array.isArray(data) ? data.length : 1;
    return { name: filename, path, recordCount };
  }
}
