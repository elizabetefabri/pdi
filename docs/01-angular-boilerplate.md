# 01 - Angular 21 + Taiga UI Boilerplate

**Objetivo:** Setup inicial com Angular 21, Taiga UI v5, NGX-ECharts e Tailwind CSS v4

**Stack Tech (alinhada com package.json):**
- Angular: `^21.2.0`
- Taiga UI: `^5.4.0` (Design System)
- NGX-ECharts: `^21.0.0` (Gráficos)
- ECharts: `^6.0.0`
- TypeScript: `~5.9.2`
- Build Tool: `@angular/build ^21.2.9`

> **Nota:** Este projeto já está criado. Este documento serve como referência de setup e padrões.

---

## Bootstrap (Angular 21)

Angular 21 usa `app.config.ts` como configuração central, não `main.ts` diretamente.

### `src/main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch(console.error);
```

### `src/app/app.config.ts`

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
    ...provideTaiga(),                                       // Taiga UI v5 (inclui event plugins) — obrigatório
    provideEchartsCore({ echarts: () => import('echarts') }),      // NGX-ECharts v21
  ],
};
```

### `src/app/app.ts` (Root Component)

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  template: `
    <tui-root>
      <router-outlet></router-outlet>
    </tui-root>
  `,
})
export class App {}
```

> **Taiga UI v5:** `TuiRoot` é um componente que envolve a aplicação no template.
> Não use `TuiRootModule`, `TuiDialogModule` ou `TuiNotificationsModule` — existiam na v4 e foram removidos.

---

## Dependências (package.json real)

```json
{
  "dependencies": {
    "@angular/animations": "^21.2.0",
    "@angular/common": "^21.2.0",
    "@angular/compiler": "^21.2.0",
    "@angular/core": "^21.2.0",
    "@angular/forms": "^21.2.0",
    "@angular/platform-browser": "^21.2.0",
    "@angular/platform-server": "^21.2.0",
    "@angular/router": "^21.2.0",
    "@angular/ssr": "^21.2.9",
    "@taiga-ui/cdk": "^5.4.0",
    "@taiga-ui/core": "^5.4.0",
    "@taiga-ui/icons": "^5.4.0",
    "@taiga-ui/kit": "^5.4.0",
    "echarts": "^6.0.0",
    "express": "^5.1.0",
    "ngx-echarts": "^21.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "^0.15.0"
  },
  "devDependencies": {
    "@angular/build": "^21.2.9",
    "@angular/cli": "^21.2.9",
    "@angular/compiler-cli": "^21.2.0",
    "@types/express": "^5.0.1",
    "@types/node": "^20.17.19",
    "@types/jest": "^30.0.0",
    "jest": "^30.3.0",
    "jest-environment-jsdom": "^30.3.0",
    "jest-preset-angular": "^16.1.4",
    "prettier": "^3.8.1",
    "ts-jest": "^29.4.9",
    "typescript": "~5.9.2"
  }
}
```

---

## Estrutura de Diretórios

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── pdi.model.ts
│   │   │   ├── projeto.model.ts
│   │   │   ├── skill.model.ts
│   │   │   └── evolucao.model.ts
│   │   └── services/
│   │       ├── pdi.service.ts
│   │       ├── projetos.service.ts
│   │       ├── skills.service.ts
│   │       └── evolucao.service.ts
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   ├── skills/
│   │   ├── projetos/
│   │   └── roadmap/
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── header/
│   │       ├── footer/
│   │       └── charts/
│   │
│   ├── app.ts
│   ├── app.config.ts
│   ├── app.config.server.ts
│   ├── app.routes.ts
│   └── app.routes.server.ts
│
├── assets/
│   └── data/
│       ├── pdi.json
│       ├── skills.json
│       ├── projetos.json
│       └── evolucao.json
│
├── styles.scss
├── main.ts
├── main.server.ts
└── server.ts
```

---

## Estilos Globais `src/styles.scss`

```scss
// 1. Taiga UI (sempre primeiro)
@import "@taiga-ui/core/styles/taiga-ui-local";

// 2. Tipografia
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap');

// 3. CSS Variables — Design System
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-tertiary: #18181f;
  --border-default: #2a2a3a;

  --accent-primary: #ec6a2a;
  --accent-secondary: #f7c25e;
  --accent-tertiary: #5e9ff7;

  --text-primary: #e8e8f0;
  --text-muted: #7a7a9a;

  --status-success: #4ecb8d;
  --status-error: #f06a7a;
  --status-highlight: #a78bfa;

  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}

// 4. Reset
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

// 5. Tipografia
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.2;
}

code, pre { font-family: var(--font-mono); }

a {
  color: var(--accent-tertiary);
  text-decoration: none;
  transition: color var(--transition-fast);
  &:hover { color: var(--accent-secondary); }
}

// 6. Utilitários
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  @media (max-width: 768px) { padding: 0 var(--spacing-md); }
}

.bg-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
}

.text-muted { color: var(--text-muted); }
.text-accent { color: var(--accent-primary); }

// 7. Scrollbar
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: 4px;
  &:hover { background: var(--text-muted); }
}

// 8. Focus (Acessibilidade)
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

// 9. Animações
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

.fade-in  { animation: fadeIn  300ms ease-out forwards; }
.slide-in { animation: slideIn 300ms ease-out forwards; }
```

---

## Taiga UI v5 — Mudanças em Relação à v4

| v4 (não usar) | v5 (correto) |
|---|---|
| `TuiRootModule` no providers | `NG_EVENT_PLUGINS` no providers + `<tui-root>` no template |
| `TuiDialogModule` | `TuiDialogService` injetado diretamente |
| `TuiNotificationsModule` | `TuiAlertService` |
| `TuiButtonModule` | `TuiButton` (standalone) |

---

## Comandos de Desenvolvimento

```bash
npm start           # ng serve
npm run build       # ng build (produção com SSR)
npm run serve:ssr:pdi  # node dist/pdi/server/server.mjs
npm test            # jest
npm run test:coverage # jest com cobertura
```

---

## Troubleshooting

### "NG_EVENT_PLUGINS not found"
Já é dependência do `@taiga-ui/core` v5 — verificar se node_modules está limpo:
```bash
rm -rf node_modules && npm install
```

### "provideEchartsCore requires echarts option"
```typescript
// Correto (ngx-echarts v21):
provideEchartsCore({ echarts: () => import('echarts') })
```

### "Cannot find TuiRootModule"
Não existe na v5. Use `TuiRoot` no template e `NG_EVENT_PLUGINS` no providers.

---

## Próximo Passo

→ [02-componentes-tailwind.md](./02-componentes-tailwind.md)
