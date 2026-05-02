# .agents — PDI Project Agents

**Padrão:** BMAD (Business · Model · Architecture · Design)
**Versão:** 1.0
**Stack:** Angular 21 · Taiga UI v5 · NGX-ECharts v21 · TypeScript ~5.9

---

## O que é BMAD?

Cada agente segue a estrutura de quatro camadas:

| Camada | Descrição |
|---|---|
| **B**usiness | Qual problema de negócio este agente resolve |
| **M**odel | Quais estruturas de dados ele manipula |
| **A**rchitecture | Como ele se encaixa no pipeline geral |
| **D**esign | A implementação concreta |

---

## Índice de Agentes

| # | Agente | Arquivo | Responsabilidade |
|---|---|---|---|
| 1 | SetupAgent | [setup.agent.ts](./setup.agent.ts) | Estrutura de pastas e verificação de ambiente |
| 2 | ComponentGeneratorAgent | [component-generator.agent.ts](./component-generator.agent.ts) | Geração de componentes Angular |
| 3 | StyleManagerAgent | [style-manager.agent.ts](./style-manager.agent.ts) | Design system e CSS Variables |
| 4 | DataManagerAgent | [data-manager.agent.ts](./data-manager.agent.ts) | Mock data e modelos |
| 5 | BuildAgent | [build.agent.ts](./build.agent.ts) | Build e análise de bundle |
| 6 | DeployAgent | [deploy.agent.ts](./deploy.agent.ts) | Deploy em Vercel |
| 7 | DocumentationAgent | [documentation.agent.ts](./documentation.agent.ts) | Geração de documentação |
| 8 | QualityAssuranceAgent | [quality-assurance.agent.ts](./quality-assurance.agent.ts) | Lint, tipos e testes |
| 9 | PerformanceMonitorAgent | [performance-monitor.agent.ts](./performance-monitor.agent.ts) | Auditoria de performance |
| 10 | GitManagerAgent | [git-manager.agent.ts](./git-manager.agent.ts) | Versionamento e commits |

---

## Orquestrador

O [orchestrator.ts](./orchestrator.ts) executa o pipeline completo em ordem:

```
Setup → StyleManager → ComponentGenerator → DataManager
     → QA → Build → Deploy → Git
```

---

## Dependências entre Agentes

```
SetupAgent
├── ComponentGeneratorAgent
│   └── QualityAssuranceAgent
├── StyleManagerAgent
└── DataManagerAgent

BuildAgent
├── ComponentGeneratorAgent (precisa dos componentes)
└── StyleManagerAgent (precisa dos estilos)

DeployAgent
└── BuildAgent

GitManagerAgent (independente — pode rodar a qualquer momento)
DocumentationAgent (independente)
PerformanceMonitorAgent
└── BuildAgent
```

---

## Como Usar

```typescript
// Rodar agente individualmente
const setup = new SetupAgent();
await setup.execute();

// Rodar pipeline completo
const orchestrator = new Orchestrator();
await orchestrator.runFullPipeline();
```

---

## Tipos Compartilhados

Ver [types.ts](./types.ts) para interfaces comuns a todos os agentes.
