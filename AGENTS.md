# AGENTS.md — Guia Completo do Projeto PDI

**Data:** 2026-05-02
**Deadline:** 2026-05-18 (17 dias)
**Status:** 🟡 Em desenvolvimento

---

## Stack Tecnológico (package.json)

| Lib | Versão | Uso |
|---|---|---|
| Angular | `^21.2.0` | Framework principal (Standalone Components) |
| Taiga UI | `^5.4.0` | Design System (TuiRoot, TuiButton, TuiChip, TuiBadge) |
| NGX-ECharts | `^21.0.0` | Gráficos (NgxEchartsDirective) |
| ECharts | `^6.0.0` | Engine de gráficos |
| TypeScript | `~5.9.2` | Tipagem |
| @angular/ssr | `^21.2.9` | Server-Side Rendering |
| Express | `^5.1.0` | Servidor SSR |
| Vitest | `^4.0.8` | Testes unitários |

> **Não use:** `framer-motion` (React-only), `TuiRootModule` (Taiga UI v4), `@angular-devkit/build-angular` (deprecado — use `@angular/build`)

---

## Design System & Cores

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-tertiary: #18181f;
  --border-default: #2a2a3a;

  /* Accents */
  --accent-primary: #ec6a2a;    /* laranja — ação principal */
  --accent-secondary: #f7c25e;  /* amarelo — destaque */
  --accent-tertiary: #5e9ff7;   /* azul — informação */

  /* Text */
  --text-primary: #e8e8f0;
  --text-muted: #7a7a9a;

  /* Status */
  --status-success: #4ecb8d;
  --status-error: #f06a7a;
  --status-highlight: #a78bfa;

  /* Tipografia */
  --font-display: 'Syne', sans-serif;     /* títulos */
  --font-body: 'DM Sans', sans-serif;     /* textos */
  --font-mono: 'DM Mono', monospace;      /* código/dados */

  /* Espaçamento */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Transições */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

---

## Configuração Angular 21

### app.config.ts (padrão obrigatório)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideEchartsCore } from 'ngx-echarts';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    ...provideTaiga(),                                       // Taiga UI v5 (inclui event plugins)
    provideEchartsCore({ echarts: () => import('echarts') }), // NGX-ECharts v21
  ],
};
```

### app.ts (Root Component)

```typescript
import { TuiRoot } from '@taiga-ui/core';

@Component({
  imports: [RouterOutlet, TuiRoot],
  template: `<tui-root><router-outlet /></tui-root>`,
})
export class App {}
```

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # .model.ts — interfaces TypeScript
│   │   └── services/         # .service.ts — HttpClient + Observable
│   ├── features/
│   │   ├── dashboard/        # rota: /
│   │   ├── skills/           # rota: /skills
│   │   ├── projetos/         # rota: /projetos
│   │   └── roadmap/          # rota: /roadmap
│   ├── shared/
│   │   └── components/
│   │       ├── header/
│   │       ├── footer/
│   │       └── charts/
│   ├── app.ts                # <tui-root> aqui
│   ├── app.config.ts         # providers centrais
│   ├── app.routes.ts         # loadComponent lazy
│   └── app.routes.server.ts  # SSR prerender
├── assets/data/              # JSONs mock
└── styles.scss               # CSS Variables + Taiga UI
```

---

## Rotas (Lazy Loading)

```typescript
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'skills', loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'projetos', loadComponent: () => import('./features/projetos/projetos.component').then(m => m.ProjetosComponent) },
  { path: 'roadmap', loadComponent: () => import('./features/roadmap/roadmap.component').then(m => m.RoadmapComponent) },
  { path: '**', redirectTo: '' },
];
```

---

## Padrões de Código

### Injeção de Dependência (Angular 21)

```typescript
// ✅ Correto — inject()
export class DashboardComponent {
  private readonly pdiService = inject(PdiService);
}

// ❌ Evitar — constructor injection (verboso, legado)
constructor(private pdiService: PdiService) {}
```

### Signal Inputs (Angular 17+)

```typescript
// ✅ Correto
readonly card = input.required<DiagnosticCardData>();
readonly items = input<string[]>([]);

// ❌ Evitar — @Input() decorator (legado)
@Input() card!: DiagnosticCardData;
```

### Templates modernos (Angular 17+)

```html
<!-- ✅ @for / @if -->
@for (item of items; track item.id) { <div>{{ item.name }}</div> }
@if (pdi$ | async; as pdi) { <h1>{{ pdi.nome }}</h1> }

<!-- ❌ *ngFor / *ngIf (legado) -->
<div *ngFor="let item of items">...</div>
```

### Animações

```typescript
// ✅ Angular Animations
import { trigger, transition, style, animate } from '@angular/animations';

// ❌ framer-motion (biblioteca React — não funciona em Angular)
```

---

## Taiga UI v5 — Cheat Sheet

| Componente | Import |
|---|---|
| Root wrapper | `TuiRoot` from `@taiga-ui/core` |
| Botão | `TuiButton` from `@taiga-ui/core` |
| Chip/tag | `TuiChip` from `@taiga-ui/kit` |
| Badge | `TuiBadge` from `@taiga-ui/kit` |
| Ícone | `TuiIcon` from `@taiga-ui/core` |
| Provider | `NG_EVENT_PLUGINS` from `@taiga-ui/event-plugins` |

---

## NGX-ECharts v21 — Uso

```typescript
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
  imports: [NgxEchartsDirective],
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
})
export class ChartComponent {
  chartOptions: EChartsOption = { /* ... */ };
}
```

---

## Commits & Versionamento (Conventional Commits)

```
<type>(<scope>): <subject>
```

| Tipo | Uso |
|---|---|
| `feat` | Nova feature |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação / estilos |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Testes |
| `chore` | Setup, dependências, config |

**Exemplos:**
```
feat: dashboard with KPI cards and evolution chart
feat(skills): skills page with progress indicators
fix(header): active route not highlighting on direct navigation
docs: update AGENTS.md with Angular 21 patterns
chore: add data JSON files to assets
```

---

## Checklist de Desenvolvimento

### Setup (Dia 1-2)
- [ ] `app.config.ts` com `NG_EVENT_PLUGINS` + `provideEchartsCore`
- [ ] `app.ts` com `<tui-root>`
- [ ] `styles.scss` com CSS Variables
- [ ] Estrutura de pastas

### Componentes Base (Dia 2-4)
- [ ] `HeaderComponent` (navegação, routerLinkActive)
- [ ] `FooterComponent`
- [ ] `EvolutionChartComponent` (NGX-ECharts)

### Services & Models (Dia 3-5)
- [ ] `pdi.model.ts`, `skill.model.ts`, `projeto.model.ts`, `evolucao.model.ts`
- [ ] `PdiService`, `SkillsService`, `ProjetosService`, `EvolucaoService`
- [ ] JSON files em `assets/data/`

### Features (Dia 5-12)
- [ ] Dashboard (KPIs + Chart)
- [ ] Skills (cards com nível)
- [ ] Projetos (cards com status)
- [ ] Roadmap (timeline)

### Qualidade (Dia 13-15)
- [ ] Lazy loading em todas as rotas
- [ ] TypeScript sem erros (`npx tsc --noEmit`)
- [ ] Bundle < 500KB
- [ ] Responsividade mobile

### Deploy (Dia 16)
- [ ] `npm run build` sem erros
- [ ] Deploy em Vercel
- [ ] URL pública

---

## Agentes de Automação

Ver [.agents/README.md](./.agents/README.md) para os 10 agentes BMAD:

```bash
# Rodar pipeline completo
npx ts-node .agents/orchestrator.ts

# Agentes individuais
npx ts-node .agents/setup.agent.ts
npx ts-node .agents/data-manager.agent.ts
npx ts-node .agents/style-manager.agent.ts
```

---

## Troubleshooting

| Erro | Solução |
|---|---|
| `TuiRoot is not a known element` | Importar `TuiRoot` no component + `NG_EVENT_PLUGINS` no config |
| `provideEchartsCore() argument required` | Usar `provideEchartsCore({ echarts: () => import('echarts') })` |
| `TuiRootModule not found` | Não existe na v5 — use `TuiRoot` (componente) |
| `document is not defined` (SSR) | Usar `isPlatformBrowser(inject(PLATFORM_ID))` |
| `Cannot find module '@taiga-ui/event-plugins'` | É dependência do `@taiga-ui/core` v5 — `rm -rf node_modules && npm i` |

---

## Referências

- [01-angular-boilerplate.md](./docs/01-angular-boilerplate.md) — Setup completo
- [02-componentes-tailwind.md](./docs/02-componentes-tailwind.md) — Componentes prontos
- [03-mock-data.md](./docs/03-mock-data.md) — Dados e serviços
- [04-guia-implementacao.md](./docs/04-guia-implementacao.md) — Guia dia a dia
- [COMPONENT_MAP.md](./COMPONENT_MAP.md) — Mapa de componentes (Mermaid)
- [Taiga UI v5](https://taiga-ui.dev/)
- [NGX-ECharts](https://xieziyu.github.io/ngx-echarts/)
- [Angular Animations](https://angular.dev/guide/animations)
