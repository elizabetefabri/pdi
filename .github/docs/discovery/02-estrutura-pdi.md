# Estrutura de Dados do PDI

## Arquitetura da Aplicação

### Camadas

┌─────────────────────────────┐
│  Angular v17 (Standalone)   │
├─────────────────────────────┤
│  Routes + Components        │
├─────────────────────────────┤
│  Services (TypeScript)      │
├─────────────────────────────┤
│  Mock Data (JSON local)     │ ← Seu banco de dados inicial
└─────────────────────────────┘

### Estrutura de Pastas (Recomendação)

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── pdi.service.ts
│   │   │   ├── projetos.service.ts
│   │   │   └── skills.service.ts
│   │   └── models/
│   │       ├── pdi.model.ts
│   │       ├── projeto.model.ts
│   │       ├── skill.model.ts
│   │       └── evolucao.model.ts
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   ├── skills/
│   │   ├── projetos/
│   │   └── roadmap/
│   │
│   └── shared/
│       ├── components/
│       │   ├── charts/
│       │   ├── cards/
│       │   └── header/
│       └── directives/
│
├── assets/
│   └── data/
│       ├── pdi.json
│       ├── projetos.json
│       ├── skills.json
│       └── evolucao.json
│
└── styles/
└── tailwind.config.js
```

## ❓ PERGUNTAS A RESPONDER:

### Sobre Dados

#### 1. Qual é a estrutura de um "Projeto" para você?

```json
   {
     "id": "proj-001",
     "nome": "???",
     "descricao": "???",
     "dataInicio": "2025-01-01",
     "dataFim": "2025-06-30",
     "tecnologias": ["???", "???"],
     "impacto": {
       "usuarios": "???",
       "performanceMelhoria": "??%",
       "roiEstimado": "$???"
     },
     "seuPapel": "???",
     "aprendizados": ["???", "???"],
     "challenges": ["???"]
   }
```

   Sua resposta: Mude o template acima para refletir o que você realmente precisa

#### 2. Qual é a estrutura de "Skill"?

   - Apenas nome + nível?
   - Ou também: categoria, roadmap, fontes de aprendizado?
   - Sua resposta: ___________

#### 3. Como você quer rastrear evolução ao longo do tempo?

   - Snapshots trimestrais dos skills?
   - Histórico de projetos por data?
   - Ambos?
   - Sua resposta: ___________

## Resultado esperado
Um schema de dados flexível que você consegue preencher rapidinho e que alimenta TODOS os charts
