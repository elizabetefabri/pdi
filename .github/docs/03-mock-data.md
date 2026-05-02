# 03 - Mock Data & Models

**Objetivo:** Definir estruturas de dados (Models/Interfaces) e criar dados JSON para testes.

**Tempo estimado:** 45 minutos

---

## 📊 Models & Interfaces

### 1. PDI Model

**`src/app/core/models/pdi.model.ts`**

```typescript
export interface PDI {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  nivelAtual: string;      // Ex: "Pleno"
  nivelObjetivo: string;   // Ex: "Sênior"
  dataInicio: Date;
  dataTermo: Date;
  descricao: string;
  metasPrincipais: string[];
}
```

### 2. Projeto Model

**`src/app/core/models/projeto.model.ts`**

```typescript
export interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;      // "2026-01-15"
  dataFim: string;         // "2026-03-30"
  tecnologias: string[];   // ["Next.js", "TypeScript", "AWS"]
  seuPapel: string;        // "Arquitetura Frontend"
  impacto: {
    usuariosAfetados?: number;
    performanceMelhoria?: string;  // "30%"
    roiEstimado?: string;          // "$50k"
    otrosMetricas?: string[];
  };
  desafios: string[];
  aprendizados: string[];
  status: 'completed' | 'in-progress';
  icon: string;
}
```

### 3. Skill Model

**`src/app/core/models/skill.model.ts`**

```typescript
export interface Skill {
  id: string;
  nome: string;
  categoria: string;      // "Frontend", "Cloud", "Languages"
  nivel: number;          // 1-10
  icon: string;          // emoji
  dataAquisicao: string; // "2025-01-15"
  descricao?: string;
  projetos?: string[];   // IDs de projetos que usam essa skill
}
```

### 4. Evolução Model

**`src/app/core/models/evolucao.model.ts`**

```typescript
export interface EvolutionPoint {
  mes: string;           // "Jan 2026"
  nivel: number;         // 1-10
  competenciasCount: number;
  projetosCompletos: number;
  feedbackPositivo?: number;
}

export interface Evolucao {
  skillsEvolution: EvolutionPoint[];
  nivelEvolution: {
    mes: string;
    nivelTecnico: number;      // 1-10
    lideranca: number;         // 1-10
    mentorias: number;         // 1-10
  }[];
}
```

### 5. Roadmap Model

**`src/app/core/models/roadmap.model.ts`**

```typescript
export interface RoadmapPhase {
  id: string;
  periodo: string;        // "Q2 2026"
  titulo: string;
  objetivos: string[];
  skillsFoco: string[];   // IDs de skills
  metasPrincipais: string[];
  indicadores: {
    metrica: string;
    valor: string;
    status: 'completed' | 'in-progress' | 'planned';
  }[];
  status: 'completed' | 'in-progress' | 'planned';
}
```

---

## 💾 JSON Mock Data

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
    "Dominar arquitetura de sistemas",
    "Liderar projetos técnicos críticos",
    "Mentorar outros desenvolvedores",
    "Profundidade em AWS",
    "Excelência em código limpo"
  ]
}
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
      "otrosMetricas": [
        "Redução de bundle em 60%",
        "Time reduzido de 8 para 5 pessoas"
      ]
    },
    "desafios": [
      "Integração com APIs legacy",
      "Migração de dados sem downtime",
      "Compatibilidade com IE11 removida"
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
    "nome": "Sistema de Observabilidade & Monitoramento",
    "descricao": "Implementação de stack observabilidade (ELK + Grafana) para toda plataforma",
    "dataInicio": "2026-04-01",
    "dataFim": "2026-06-30",
    "tecnologias": ["AWS CloudWatch", "Grafana", "ELK Stack", "Node.js"],
    "seuPapel": "Arquiteto de Observabilidade",
    "impacto": {
      "usuariosAfetados": 100000,
      "performanceMelhoria": "Detecção de issues em <30s",
      "roiEstimado": "$150k",
      "otrosMetricas": [
        "Redução de MTTR em 70%",
        "Visibilidade em tempo real"
      ]
    },
    "desafios": [
      "Volume massivo de logs (10M+/dia)",
      "Custo de armazenamento",
      "Integração com legado"
    ],
    "aprendizados": [
      "Arquitetura de observabilidade em escala",
      "Custos de cloud e otimizações",
      "Mentoría de 2 juniores"
    ],
    "status": "in-progress",
    "icon": "📊"
  },
  {
    "id": "proj-003",
    "nome": "Design System v2",
    "descricao": "Refatoração completa do Design System com componentes reutilizáveis",
    "dataInicio": "2026-07-01",
    "dataFim": "2026-09-30",
    "tecnologias": ["React", "Storybook", "TypeScript", "Tailwind CSS"],
    "seuPapel": "Lead Arquitetura Design System",
    "impacto": {
      "usuariosAfetados": 200,
      "performanceMelhoria": "Reuso de 80% dos componentes",
      "roiEstimado": "$100k",
      "otrosMetricas": [
        "Redução de desenvolvimento em 40%",
        "Consistência visual em 100%"
      ]
    },
    "desafios": [
      "Adoção por múltiplos times",
      "Versionamento de componentes",
      "Migration path para código existente"
    ],
    "aprendizados": [
      "Liderança de múltiplos times",
      "Design system thinking",
      "Decisões arquiteturais com trade-offs"
    ],
    "status": "planned",
    "icon": "🎨"
  }
]
```

### `src/assets/data/skills.json`

```json
[
  {
    "id": "next",
    "nome": "Next.js",
    "categoria": "Frontend Framework",
    "nivel": 9,
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
    "icon": "📘",
    "dataAquisicao": "2023-01-01",
    "descricao": "Linguagem tipada que compila para JavaScript",
    "projetos": ["proj-001", "proj-002", "proj-003"]
  },
  {
    "id": "aws",
    "nome": "AWS",
    "categoria": "Cloud",
    "nivel": 7,
    "icon": "☁️",
    "dataAquisicao": "2025-03-01",
    "descricao": "Amazon Web Services - cloud computing",
    "projetos": ["proj-001", "proj-002"]
  },
  {
    "id": "nodejs",
    "nome": "Node.js",
    "categoria": "Backend",
    "nivel": 8,
    "icon": "🟢",
    "dataAquisicao": "2023-06-01",
    "descricao": "JavaScript runtime para servidor",
    "projetos": ["proj-002"]
  },
  {
    "id": "react",
    "nome": "React",
    "categoria": "Frontend Framework",
    "nivel": 8,
    "icon": "⚛️",
    "dataAquisicao": "2023-09-01",
    "descricao": "Biblioteca JavaScript para interfaces",
    "projetos": ["proj-003"]
  },
  {
    "id": "tailwind",
    "nome": "Tailwind CSS",
    "categoria": "Styling",
    "nivel": 9,
    "icon": "🎨",
    "dataAquisicao": "2024-03-01",
    "descricao": "Utility-first CSS framework",
    "projetos": ["proj-001", "proj-003"]
  },
  {
    "id": "architecture",
    "nome": "System Architecture",
    "categoria": "Soft Skills",
    "nivel": 7,
    "icon": "🏗️",
    "dataAquisicao": "2025-06-01",
    "descricao": "Design de arquiteturas escaláveis e robustas",
    "projetos": ["proj-001", "proj-002"]
  }
]
```

### `src/assets/data/evolucao.json`

```json
{
  "skillsEvolution": [
    {
      "mes": "Jan 2026",
      "nivel": 6,
      "competenciasCount": 5,
      "projetosCompletos": 0,
      "feedbackPositivo": 8
    },
    {
      "mes": "Fev 2026",
      "nivel": 6.5,
      "competenciasCount": 5,
      "projetosCompletos": 0,
      "feedbackPositivo": 8.5
    },
    {
      "mes": "Mar 2026",
      "nivel": 7,
      "competenciasCount": 6,
      "projetosCompletos": 1,
      "feedbackPositivo": 9
    },
    {
      "mes": "Abr 2026",
      "nivel": 7.3,
      "competenciasCount": 7,
      "projetosCompletos": 1,
      "feedbackPositivo": 9
    },
    {
      "mes": "Mai 2026",
      "nivel": 7.6,
      "competenciasCount": 8,
      "projetosCompletos": 1,
      "feedbackPositivo": 8.5
    },
    {
      "mes": "Jun 2026",
      "nivel": 8,
      "competenciasCount": 8,
      "projetosCompletos": 2,
      "feedbackPositivo": 9
    }
  ],
  "nivelEvolution": [
    {
      "mes": "Jan 2026",
      "nivelTecnico": 6,
      "lideranca": 4,
      "mentorias": 0
    },
    {
      "mes": "Abr 2026",
      "nivelTecnico": 7,
      "lideranca": 6,
      "mentorias": 2
    },
    {
      "mes": "Jun 2026",
      "nivelTecnico": 7.5,
      "lideranca": 7,
      "mentorias": 5
    }
  ]
}
```

---

## 🔧 Core Services

### 1. PDI Service

**`src/app/core/services/pdi.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PDI } from '../models/pdi.model';

@Injectable({
  providedIn: 'root'
})
export class PdiService {
  private apiUrl = 'assets/data/pdi.json';
  
  constructor(private http: HttpClient) {}
  
  getPDI(): Observable<PDI> {
    return this.http.get<PDI>(this.apiUrl);
  }
  
  // Para mock local sem HttpClient
  getPDIMock(): Observable<PDI> {
    const pdi: PDI = {
      id: 'pdi-2026',
      nome: 'Liza',
      cargo: 'Frontend / Platform Engineer',
      empresa: 'Itaú',
      nivelAtual: 'Pleno',
      nivelObjetivo: 'Sênior',
      dataInicio: new Date('2026-01-01'),
      dataTermo: new Date('2029-01-01'),
      descricao: 'Plano de desenvolvimento de 3 anos',
      metasPrincipais: [
        'Dominar arquitetura',
        'Liderar projetos críticos',
        'Mentorar desenvolvedores'
      ]
    };
    return of(pdi);
  }
}
```

### 2. Projetos Service

**`src/app/core/services/projetos.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Projeto } from '../models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {
  private apiUrl = 'assets/data/projetos.json';
  private projetos: Projeto[] = [];
  
  constructor(private http: HttpClient) {}
  
  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }
  
  getProjetoById(id: string): Observable<Projeto | undefined> {
    return new Observable(observer => {
      this.getProjetos().subscribe(projetos => {
        observer.next(projetos.find(p => p.id === id));
        observer.complete();
      });
    });
  }
  
  // Mock local
  getProjetosMock(): Observable<Projeto[]> {
    const projetos: Projeto[] = [
      {
        id: 'proj-001',
        nome: 'Replatforma Frontend',
        descricao: 'Migração Next.js',
        dataInicio: '2025-12-01',
        dataFim: '2026-03-31',
        tecnologias: ['Next.js', 'TypeScript'],
        seuPapel: 'Tech Lead',
        impacto: {
          usuariosAfetados: 50000,
          performanceMelhoria: '45%'
        },
        desafios: ['APIs legacy', 'Migração sem downtime'],
        aprendizados: ['Migração gradual', 'Liderança técnica'],
        status: 'completed',
        icon: '🚀'
      }
    ];
    return of(projetos);
  }
}
```

### 3. Skills Service

**`src/app/core/services/skills.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = 'assets/data/skills.json';
  
  constructor(private http: HttpClient) {}
  
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }
  
  getSkillById(id: string): Observable<Skill | undefined> {
    return new Observable(observer => {
      this.getSkills().subscribe(skills => {
        observer.next(skills.find(s => s.id === id));
        observer.complete();
      });
    });
  }
  
  getSkillsByCategoria(categoria: string): Observable<Skill[]> {
    return new Observable(observer => {
      this.getSkills().subscribe(skills => {
        observer.next(skills.filter(s => s.categoria === categoria));
        observer.complete();
      });
    });
  }
  
  // Mock local
  getSkillsMock(): Observable<Skill[]> {
    const skills: Skill[] = [
      {
        id: 'typescript',
        nome: 'TypeScript',
        categoria: 'Language',
        nivel: 9,
        icon: '📘',
        dataAquisicao: '2023-01-01'
      },
      {
        id: 'nextjs',
        nome: 'Next.js',
        categoria: 'Frontend',
        nivel: 9,
        icon: '⚛️',
        dataAquisicao: '2024-01-01'
      }
    ];
    return of(skills);
  }
}
```

### 4. Evolução Service

**`src/app/core/services/evolucao.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Evolucao } from '../models/evolucao.model';

@Injectable({
  providedIn: 'root'
})
export class EvolucaoService {
  private apiUrl = 'assets/data/evolucao.json';
  
  constructor(private http: HttpClient) {}
  
  getEvolucao(): Observable<Evolucao> {
    return this.http.get<Evolucao>(this.apiUrl);
  }
  
  // Mock local
  getEvolucaoMock(): Observable<Evolucao> {
    const evolucao: Evolucao = {
      skillsEvolution: [
        { mes: 'Jan 2026', nivel: 6, competenciasCount: 5, projetosCompletos: 0 },
        { mes: 'Jun 2026', nivel: 8, competenciasCount: 8, projetosCompletos: 2 }
      ],
      nivelEvolution: [
        { mes: 'Jan 2026', nivelTecnico: 6, lideranca: 4, mentorias: 0 },
        { mes: 'Jun 2026', nivelTecnico: 7.5, lideranca: 7, mentorias: 5 }
      ]
    };
    return of(evolucao);
  }
}
```

---

## ✅ Checklist Final

- [ ] Todos os Models criados (6 interfaces)
- [ ] JSON files criados em `assets/data/`
- [ ] Todos os Services criados (4 serviços)
- [ ] Services com métodos `get()` e Mock
- [ ] HttpClientModule importado em main.ts
- [ ] Dados compilam sem erros

---

## 🔗 Próximo Passo

Ler **04-guia-implementacao.md** para passo a passo final.
