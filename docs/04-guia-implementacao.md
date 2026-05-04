# 04 - Guia de Implementação Passo a Passo

**Objetivo:** Implementar tudo do zero até deploy em 17 dias

**Prazo:** Até 18/05/2026

**Stack Final (package.json):**
- Angular: `^21.2.0`
- Taiga UI: `^5.4.0`
- NGX-ECharts: `^21.0.0`
- TypeScript: `~5.9.2`
- Build: `@angular/build ^21.2.9`
- SSR: `@angular/ssr ^21.2.9`

> **Animações:** Use Angular Animations (`@angular/animations`) — não use `framer-motion` (biblioteca React).

---

## Timeline

### Dia 1-2: Setup & Estrutura

#### app.config.ts (configuração central)

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
    NG_EVENT_PLUGINS,
    provideEchartsCore({ echarts: () => import('echarts') }),
  ],
};
```

#### Criar estrutura de pastas

```bash
mkdir -p src/app/core/{services,models}
mkdir -p src/app/features/{dashboard,skills,projetos,roadmap}
mkdir -p src/app/shared/components/{header,footer,charts}
mkdir -p src/assets/data
```

#### Gerar componentes e serviços

```bash
# Componentes
ng generate component shared/components/header --skip-tests
ng generate component shared/components/footer --skip-tests
ng generate component shared/components/charts/evolution-chart --skip-tests
ng generate component features/dashboard --skip-tests
ng generate component features/skills --skip-tests
ng generate component features/projetos --skip-tests
ng generate component features/roadmap --skip-tests

# Serviços
ng generate service core/services/pdi --skip-tests
ng generate service core/services/projetos --skip-tests
ng generate service core/services/skills --skip-tests
ng generate service core/services/evolucao --skip-tests
```

**Commit:**
```bash
git add .
git commit -m "feat: initial structure with components and services"
```

---

### Dia 3-4: Configuração de Estilos

#### src/app/app.ts (Root Component com TuiRoot)

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, HeaderComponent, FooterComponent],
  template: `
    <tui-root>
      <app-header />
      <main class="container">
        <router-outlet />
      </main>
      <app-footer />
    </tui-root>
  `,
})
export class App {}
```

#### src/app/app.routes.ts

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { title: 'Dashboard' },
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then(m => m.SkillsComponent),
    data: { title: 'Skills & Competências' },
  },
  {
    path: 'projetos',
    loadComponent: () =>
      import('./features/projetos/projetos.component').then(m => m.ProjetosComponent),
    data: { title: 'Meus Projetos' },
  },
  {
    path: 'roadmap',
    loadComponent: () =>
      import('./features/roadmap/roadmap.component').then(m => m.RoadmapComponent),
    data: { title: 'Roadmap de Evolução' },
  },
  { path: '**', redirectTo: '' },
];
```

> Rotas com `loadComponent` — lazy loading automático por feature.

**Commit:**
```bash
git commit -m "feat: configure styles, routing and TuiRoot layout"
```

---

### Dia 5-6: Dashboard + Evolution Chart

Implementar seguindo [02-componentes-tailwind.md](./02-componentes-tailwind.md).

Criar dados JSON seguindo [03-mock-data.md](./03-mock-data.md).

#### Estrutura da Evolution Chart com NGX-ECharts v21

```typescript
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

// No template:
// <div echarts [options]="chartOptions" class="chart"></div>
```

**Commit:**
```bash
git commit -m "feat: dashboard with KPI cards and evolution chart"
```

---

### Dia 7-8: Skills Component

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TuiBadge } from '@taiga-ui/kit';
import { SkillsService } from '../../core/services/skills.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [AsyncPipe, TuiBadge],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  private readonly skillsService = inject(SkillsService);

  readonly skills$ = this.skillsService.getSkills();

  ngOnInit(): void {}
}
```

**Commit:**
```bash
git commit -m "feat: skills page with cards and levels"
```

---

### Dia 9-10: Projetos Component

```typescript
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TuiChip } from '@taiga-ui/kit';
import { ProjetosService } from '../../core/services/projetos.service';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [AsyncPipe, TuiChip],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss',
})
export class ProjetosComponent {
  private readonly projetosService = inject(ProjetosService);

  readonly projetos$ = this.projetosService.getProjetos();
}
```

**Commit:**
```bash
git commit -m "feat: projetos page with project cards"
```

---

### Dia 11-12: Roadmap Timeline

Implementar timeline com 4 fases:

| Fase | Período | Foco |
|---|---|---|
| 1 | Q2 2026 | Fundações técnicas |
| 2 | Q4 2026 | Especialização cloud/arch |
| 3 | Q2 2027 | Liderança técnica |
| 4 | Q4 2027 | Mentoria e influência |

**Commit:**
```bash
git commit -m "feat: roadmap timeline with phases"
```

---

### Dia 13-14: Animações (Angular Animations)

```typescript
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

// No componente:
@Component({
  animations: [fadeInAnimation],
  template: `<div @fadeIn>...</div>`,
})
```

> **Não use `framer-motion`** — é específico para React e não funciona em Angular.

**Commit:**
```bash
git commit -m "feat: add page transitions and hover animations"
```

---

### Dia 15: Performance & Build

```bash
# Build produção com SSR
npm run build

# Verificar tamanho dos bundles
du -sh dist/pdi/browser/

# Type check
npx tsc --noEmit
```

**Metas:**
- Bundle principal: `< 500KB`
- TypeScript: sem erros

---

### Dia 16: Deploy em Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Configuração Vercel para Angular SSR:**
- Framework: `Angular`
- Build command: `npm run build`
- Output directory: `dist/pdi/browser`

---

### Dia 17-18: Documentação Final

```bash
git add .
git commit -m "docs: update README and finalize project"
git push origin develop
```

---

## Checklist Completo

### Setup & Dependências
- [ ] `app.config.ts` com `NG_EVENT_PLUGINS` e `provideEchartsCore`
- [ ] `app.ts` com `<tui-root>` no template
- [ ] Estrutura de diretórios criada
- [ ] Estilos globais com CSS Variables

### Features
- [ ] Header + Footer
- [ ] Dashboard com KPIs
- [ ] Evolution Chart (NGX-ECharts)
- [ ] Skills page
- [ ] Projetos page
- [ ] Roadmap timeline

### Qualidade
- [ ] Lazy loading em todas as rotas
- [ ] Signal inputs onde aplicável
- [ ] `inject()` no lugar de constructor DI
- [ ] Animações com `@angular/animations`
- [ ] TypeScript sem erros (`tsc --noEmit`)
- [ ] Build produção funcionando

### Deploy
- [ ] Build `< 500KB`
- [ ] Deploy em Vercel
- [ ] URL pública compartilhável

---

## Troubleshooting

### "TuiRoot is not a known element"
Adicionar `TuiRoot` nos imports do componente raiz e verificar que `NG_EVENT_PLUGINS` está no providers.

### "provideEchartsCore() argument required"
```typescript
// Correto:
provideEchartsCore({ echarts: () => import('echarts') })
```

### "Lazy route not loading"
Verificar que os componentes estão exportados (`export class XComponent`) e o path do `loadComponent` está correto.

### SSR: "document is not defined"
Usar `isPlatformBrowser` do `@angular/common` para código que acessa o DOM:
```typescript
import { isPlatformBrowser, PLATFORM_ID } from '@angular/common';
import { inject } from '@angular/core';

const platformId = inject(PLATFORM_ID);
if (isPlatformBrowser(platformId)) {
  // código DOM aqui
}
```

---

## Referências

- [01-angular-boilerplate.md](./01-angular-boilerplate.md) — Setup completo
- [02-componentes-tailwind.md](./02-componentes-tailwind.md) — Componentes prontos
- [03-mock-data.md](./03-mock-data.md) — Dados e serviços
- [Taiga UI v5 Docs](https://taiga-ui.dev/)
- [NGX-ECharts](https://xieziyu.github.io/ngx-echarts/)
- [Angular Animations](https://angular.dev/guide/animations)
