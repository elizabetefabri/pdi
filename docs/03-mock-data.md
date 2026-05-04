# 03 - Mock Data & Models

**Objetivo:** Definir interfaces TypeScript e dados JSON para desenvolvimento sem backend.

> **Convenção:** Todos os arquivos de modelo usam sufixo `.model.ts` — ex: `pdi.model.ts`, não `pdi.ts`.

---

## Models / Interfaces

### `src/app/core/models/pdi.model.ts`

```typescript
export interface PDI {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  nivelAtual: string;
  nivelObjetivo: string;
  dataInicio: string;      // "2026-01-01"
  dataTermo: string;       // "2029-01-01"
  descricao: string;
  metasPrincipais: string[];
}
```

### `src/app/core/models/projeto.model.ts`

```typescript
export type ProjetoStatus = 'completed' | 'in-progress' | 'planned';

export interface ProjetoImpacto {
  usuariosAfetados?: number;
  performanceMelhoria?: string;
  roiEstimado?: string;
  outrasMetricas?: string[];
}

export interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  tecnologias: string[];
  seuPapel: string;
  impacto: ProjetoImpacto;
  desafios: string[];
  aprendizados: string[];
  status: ProjetoStatus;
  icon: string;
}
```

### `src/app/core/models/skill.model.ts`

```typescript
export type SkillCategoria =
  | 'Frontend Framework'
  | 'Language'
  | 'Cloud'
  | 'Backend'
  | 'Styling'
  | 'Soft Skills';

export interface Skill {
  id: string;
  nome: string;
  categoria: SkillCategoria;
  nivel: number;           // 1–10
  nivelAlvo?: number;      // 1–10 (objetivo)
  icon: string;
  dataAquisicao: string;   // "2024-01-01"
  descricao?: string;
  projetos?: string[];     // IDs de projetos relacionados
}
```

### `src/app/core/models/evolucao.model.ts`

```typescript
export interface SkillEvolutionPoint {
  mes: string;                // "Jan 2026"
  nivel: number;
  competenciasCount: number;
  projetosCompletos: number;
  feedbackPositivo?: number;
}

export interface NivelEvolutionPoint {
  mes: string;
  nivelTecnico: number;
  lideranca: number;
  mentorias: number;
}

export interface Evolucao {
  skillsEvolution: SkillEvolutionPoint[];
  nivelEvolution: NivelEvolutionPoint[];
}
```

### `src/app/core/models/roadmap.model.ts`

```typescript
export type FaseStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapIndicador {
  metrica: string;
  valor: string;
  status: FaseStatus;
}

export interface RoadmapFase {
  id: string;
  periodo: string;         // "Q2 2026"
  titulo: string;
  objetivos: string[];
  skillsFoco: string[];    // IDs de skills
  metasPrincipais: string[];
  indicadores: RoadmapIndicador[];
  status: FaseStatus;
}
```

---

## JSON Mock Data

### `src/assets/data/pdi.json`

```json
{
  "id": "pdi-2026",
  "nome": "Liza",
  "cargo": "Frontend / Platform Engineer",
  "empresa": "Itaú",
  "nivelAtual": "Pleno",
  "nivelObjetivo": "Sênior",
  "dataInicio": "2026-01-01",
  "dataTermo": "2029-01-01",
  "descricao": "Plano de desenvolvimento de 3 anos para evoluir de Pleno para Sênior",
  "metasPrincipais": [
    "Dominar arquitetura de sistemas distribuídos",
    "Liderar projetos técnicos críticos",
    "Mentorar outros desenvolvedores",
    "Profundidade em AWS (Solutions Architect)",
    "Excelência em código limpo e DDD"
  ]
}
```

### `src/assets/data/skills.json`

```json
[
  {
    "id": "nextjs",
    "nome": "Next.js",
    "categoria": "Frontend Framework",
    "nivel": 9,
    "nivelAlvo": 9,
    "icon": "⚛️",
    "dataAquisicao": "2024-01-01",
    "descricao": "Framework React meta-framework para aplicações full-stack",
    "projetos": ["proj-001"]
  },
  {
    "id": "angular",
    "nome": "Angular",
    "categoria": "Frontend Framework",
    "nivel": 8,
    "nivelAlvo": 9,
    "icon": "🔴",
    "dataAquisicao": "2023-06-01",
    "descricao": "Framework enterprise para aplicações escaláveis",
    "projetos": ["proj-001"]
  },
  {
    "id": "typescript",
    "nome": "TypeScript",
    "categoria": "Language",
    "nivel": 9,
    "nivelAlvo": 9.5,
    "icon": "📘",
    "dataAquisicao": "2023-01-01",
    "descricao": "Linguagem tipada que compila para JavaScript",
    "projetos": ["proj-001", "proj-002", "proj-003"]
  },
  {
    "id": "aws",
    "nome": "AWS",
    "categoria": "Cloud",
    "nivel": 4,
    "nivelAlvo": 7,
    "icon": "☁️",
    "dataAquisicao": "2025-03-01",
    "descricao": "Amazon Web Services — cloud computing",
    "projetos": ["proj-001", "proj-002"]
  },
  {
    "id": "nodejs",
    "nome": "Node.js",
    "categoria": "Backend",
    "nivel": 8,
    "nivelAlvo": 8,
    "icon": "🟢",
    "dataAquisicao": "2023-06-01",
    "descricao": "JavaScript runtime para servidor",
    "projetos": ["proj-002"]
  },
  {
    "id": "architecture",
    "nome": "System Architecture",
    "categoria": "Soft Skills",
    "nivel": 5,
    "nivelAlvo": 8,
    "icon": "🏗️",
    "dataAquisicao": "2025-06-01",
    "descricao": "Design de arquiteturas escaláveis e robustas",
    "projetos": ["proj-001", "proj-002"]
  }
]
```

### `src/assets/data/projetos.json`

```json
[
  {
    "id": "proj-001",
    "nome": "Replatforma do Portal Frontend",
    "descricao": "Migração de aplicação legada Angular para Next.js com refatoração completa",
    "dataInicio": "2025-12-01",
    "dataFim": "2026-03-31",
    "tecnologias": ["Next.js", "TypeScript", "Tailwind CSS", "AWS"],
    "seuPapel": "Tech Lead Frontend / Arquitetura",
    "impacto": {
      "usuariosAfetados": 50000,
      "performanceMelhoria": "45%",
      "roiEstimado": "$200k",
      "outrasMetricas": ["Redução de bundle em 60%", "Time de 8 → 5 pessoas"]
    },
    "desafios": [
      "Integração com APIs legacy",
      "Migração sem downtime",
      "Remoção de suporte a IE11"
    ],
    "aprendizados": [
      "Estratégia de migração gradual",
      "Performance optimization em escala",
      "Liderança técnica de projeto crítico"
    ],
    "status": "completed",
    "icon": "🚀"
  },
  {
    "id": "proj-002",
    "nome": "Sistema de Observabilidade",
    "descricao": "Stack de observabilidade (ELK + Grafana) para toda a plataforma",
    "dataInicio": "2026-04-01",
    "dataFim": "2026-06-30",
    "tecnologias": ["AWS CloudWatch", "Grafana", "ELK Stack", "Node.js"],
    "seuPapel": "Arquiteto de Observabilidade",
    "impacto": {
      "usuariosAfetados": 100000,
      "performanceMelhoria": "Detecção de issues em <30s",
      "roiEstimado": "$150k",
      "outrasMetricas": ["Redução de MTTR em 70%"]
    },
    "desafios": [
      "Volume de logs: 10M+/dia",
      "Custo de armazenamento",
      "Integração com legado"
    ],
    "aprendizados": [
      "Arquitetura de observabilidade em escala",
      "Otimizações de custo cloud",
      "Mentoria de 2 juniores"
    ],
    "status": "in-progress",
    "icon": "📊"
  },
  {
    "id": "proj-003",
    "nome": "Design System v2",
    "descricao": "Refatoração completa com componentes reutilizáveis e Storybook",
    "dataInicio": "2026-07-01",
    "dataFim": "2026-09-30",
    "tecnologias": ["Angular", "Storybook", "TypeScript", "Taiga UI"],
    "seuPapel": "Lead Arquitetura Design System",
    "impacto": {
      "usuariosAfetados": 200,
      "performanceMelhoria": "Reuso de 80% dos componentes",
      "roiEstimado": "$100k",
      "outrasMetricas": ["Redução de desenvolvimento em 40%"]
    },
    "desafios": [
      "Adoção por múltiplos times",
      "Versionamento de componentes",
      "Migration path para código existente"
    ],
    "aprendizados": [
      "Liderança cross-team",
      "Design system thinking",
      "Trade-offs arquiteturais"
    ],
    "status": "planned",
    "icon": "🎨"
  }
]
```

### `src/assets/data/evolucao.json`

```json
{
  "skillsEvolution": [
    { "mes": "Jan 2026", "nivel": 6.0, "competenciasCount": 5, "projetosCompletos": 0, "feedbackPositivo": 8 },
    { "mes": "Fev 2026", "nivel": 6.5, "competenciasCount": 5, "projetosCompletos": 0, "feedbackPositivo": 8.5 },
    { "mes": "Mar 2026", "nivel": 7.0, "competenciasCount": 6, "projetosCompletos": 1, "feedbackPositivo": 9 },
    { "mes": "Abr 2026", "nivel": 7.3, "competenciasCount": 7, "projetosCompletos": 1, "feedbackPositivo": 9 },
    { "mes": "Mai 2026", "nivel": 7.6, "competenciasCount": 8, "projetosCompletos": 1, "feedbackPositivo": 8.5 },
    { "mes": "Jun 2026", "nivel": 8.0, "competenciasCount": 8, "projetosCompletos": 2, "feedbackPositivo": 9 }
  ],
  "nivelEvolution": [
    { "mes": "Jan 2026", "nivelTecnico": 6, "lideranca": 4, "mentorias": 0 },
    { "mes": "Abr 2026", "nivelTecnico": 7, "lideranca": 6, "mentorias": 2 },
    { "mes": "Jun 2026", "nivelTecnico": 7.5, "lideranca": 7, "mentorias": 5 }
  ]
}
```

---

## Core Services

### `src/app/core/services/pdi.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PDI } from '../models/pdi.model';

@Injectable({ providedIn: 'root' })
export class PdiService {
  private readonly http = inject(HttpClient);

  getPDI(): Observable<PDI> {
    return this.http.get<PDI>('assets/data/pdi.json');
  }
}
```

### `src/app/core/services/skills.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Skill, SkillCategoria } from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private readonly http = inject(HttpClient);

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>('assets/data/skills.json');
  }

  getSkillsByCategoria(categoria: SkillCategoria): Observable<Skill[]> {
    return this.getSkills().pipe(
      map(skills => skills.filter(s => s.categoria === categoria))
    );
  }

  getSkillById(id: string): Observable<Skill | undefined> {
    return this.getSkills().pipe(
      map(skills => skills.find(s => s.id === id))
    );
  }
}
```

### `src/app/core/services/projetos.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Projeto, ProjetoStatus } from '../models/projeto.model';

@Injectable({ providedIn: 'root' })
export class ProjetosService {
  private readonly http = inject(HttpClient);

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>('assets/data/projetos.json');
  }

  getProjetoById(id: string): Observable<Projeto | undefined> {
    return this.getProjetos().pipe(
      map(projetos => projetos.find(p => p.id === id))
    );
  }

  getProjetosByStatus(status: ProjetoStatus): Observable<Projeto[]> {
    return this.getProjetos().pipe(
      map(projetos => projetos.filter(p => p.status === status))
    );
  }
}
```

### `src/app/core/services/evolucao.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evolucao } from '../models/evolucao.model';

@Injectable({ providedIn: 'root' })
export class EvolucaoService {
  private readonly http = inject(HttpClient);

  getEvolucao(): Observable<Evolucao> {
    return this.http.get<Evolucao>('assets/data/evolucao.json');
  }
}
```

---

## Checklist

- [ ] `src/app/core/models/pdi.model.ts`
- [ ] `src/app/core/models/projeto.model.ts`
- [ ] `src/app/core/models/skill.model.ts`
- [ ] `src/app/core/models/evolucao.model.ts`
- [ ] `src/app/core/models/roadmap.model.ts`
- [ ] `src/assets/data/pdi.json`
- [ ] `src/assets/data/skills.json`
- [ ] `src/assets/data/projetos.json`
- [ ] `src/assets/data/evolucao.json`
- [ ] `src/app/core/services/pdi.service.ts`
- [ ] `src/app/core/services/skills.service.ts`
- [ ] `src/app/core/services/projetos.service.ts`
- [ ] `src/app/core/services/evolucao.service.ts`

---

## Próximo Passo

→ [04-guia-implementacao.md](./04-guia-implementacao.md)
