# MID · Midpoint Implementation Document
> PDI Dashboard · Angular 21 · Itaú Unibanco · Squad Eng Foundation

---

## Status geral

| Dimensão | Status |
|---|---|
| Setup / Providers | ✅ implementado |
| Data Layer | ✅ implementado |
| Shared Components | ✅ implementado |
| Feature Components | ✅ modernizados |
| Charts | ✅ EvolutionChart criado |
| Agents / BMAD | ✅ documentados |
| Documentação técnica | ✅ atualizada |
| Frontend (UI refinamento) | 🔜 próxima fase |
| Testes | 🔜 próxima fase |
| Deploy / SSR | 🔜 próxima fase |

---

## O que foi implementado (Priority 1)

### 1 · Providers e bootstrap (`app.config.ts`, `app.ts`)

```typescript
// app.config.ts — providers corretos para Angular 21
...provideTaiga(),                                       // Taiga UI v5 (inclui event plugins)
provideEchartsCore({ echarts: () => import('echarts') }), // lazy echarts
provideAnimations(),
provideHttpClient(),
```

```typescript
// app.ts — TuiRoot obrigatório no Taiga UI v5
template: `<tui-root><router-outlet /></tui-root>`
```

### 2 · Data Layer

```
src/
  assets/data/pdi-dashboard.json     ← dados do dashboard (JSON)
  app/core/
    models/pdi.model.ts              ← DashboardData (tipo agregado)
    services/pdi-data.service.ts     ← HTTP + shareReplay(1)
```

`DashboardComponent` saiu de ~380 linhas → 15 linhas via `inject()` + `toSignal()`.

### 3 · Modernização Angular 17+

Todos os componentes foram migrados:

| Padrão legado | Padrão moderno |
|---|---|
| `CommonModule` | removido |
| `*ngFor` | `@for (x of xs; track x.id)` |
| `*ngIf` | `@if (cond)` |
| `[ngClass]="val"` | `[class]="val"` |
| `@Input()` decorator | `input.required<T>()` signal |
| Constructor injection | `inject()` function |

### 4 · Shared Components

```
src/app/shared/components/
  header/          ← HeaderComponent (app-header)
  footer/          ← FooterComponent (app-footer) — movido de features/
  charts/          ← EvolutionChartComponent (app-evolution-chart)
  index.ts         ← barrel export
```

### 5 · Agents BMAD

```
.agents/
  README.md              ← índice e grafo de dependências
  types.ts               ← interfaces compartilhadas
  setup.agent.ts         ← verificação de ambiente
  style.agent.ts         ← tokens de design
  data.agent.ts          ← schema e fixtures
  component.agent.ts     ← gerador de componentes
  qa.agent.ts            ← lint + testes
  build.agent.ts         ← build + bundle analysis
  docs.agent.ts          ← documentação automática
  deploy.agent.ts        ← deploy (preview / prod)
  performance.agent.ts   ← Lighthouse
  git-manager.agent.ts   ← commits e PRs
  orchestrator.ts        ← pipeline completo
```

---

## Arquitetura atual

```
src/app/
├── app.config.ts          providers centralizados
├── app.ts                 TuiRoot + RouterOutlet
├── app.routes.ts          lazy loadComponent
│
├── core/
│   ├── models/
│   │   └── pdi.model.ts   DashboardData (agregado)
│   └── services/
│       └── pdi-data.service.ts
│
├── features/
│   └── dashboard/
│       ├── dashboard.component.ts    inject() + toSignal()
│       ├── dashboard.component.html  @for / @if
│       └── components/
│           ├── diagnostic-card/
│           ├── phase-block/
│           ├── cert-card/
│           ├── deliveries-table/
│           ├── position-card/
│           └── section-label/
│
└── shared/
    └── components/
        ├── header/
        ├── footer/
        ├── charts/
        │   └── evolution-chart.component.ts
        └── index.ts
```

---

## Próximos passos (backlog)

### P2 · UI refinamento
- [ ] Implementar `EvolutionChartComponent` no template do dashboard com dados reais de progresso
- [ ] Responsividade mobile: revisar grid layouts
- [ ] Dark/light mode via CSS custom properties (Taiga UI theme)

### P3 · Qualidade
- [ ] Testes unitários: `PdiDataService` (mock HttpClient), componentes signal inputs
- [ ] E2E smoke test com Playwright ou Cypress
- [ ] `ng build --stats-json` + bundle analysis

### P4 · SSR / Deploy
- [ ] Verificar `isPlatformBrowser` nos componentes que usam `echarts`
- [ ] `ng build` + preview com `npx serve dist/`
- [ ] Pipeline CI/CD (GitHub Actions)

---

## Referências

| Recurso | Link |
|---|---|
| Taiga UI v5 docs | https://taiga-ui.dev |
| NGX-ECharts v21 | https://github.com/xieziyu/ngx-echarts |
| Angular signals | https://angular.dev/guide/signals |
| Angular @for / @if | https://angular.dev/guide/templates/control-flow |
| BMAD agents | `.agents/README.md` |
| Docs técnicas | `docs/implementacoes/` |
