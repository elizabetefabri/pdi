# 02 - Componentes com Taiga UI + NGX-ECharts

**Objetivo:** Criar componentes Header, Footer, Dashboard e Evolution Chart

**Stack:**
- Taiga UI v5 — standalone imports (`TuiButton`, `TuiChip`, `TuiBadge`, etc.)
- NGX-ECharts v21 — `NgxEchartsDirective`
- Angular 21 — Signal Inputs (`input.required<T>()`)
- CSS Variables do design system (sem Tailwind utilitário inline)

> **Nota:** Taiga UI v5 não usa módulos (`TuiButtonModule`, etc.). Todos os componentes são standalone e importados diretamente.

---

## 1. Header Component

**`src/app/shared/components/header/header.component.ts`**

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TuiButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
```

**`src/app/shared/components/header/header.component.html`**

```html
<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <span class="logo-text">PDI</span>
      </div>

      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
        <a routerLink="/skills" routerLinkActive="active">Skills</a>
        <a routerLink="/projetos" routerLinkActive="active">Projetos</a>
        <a routerLink="/roadmap" routerLinkActive="active">Roadmap</a>
      </nav>
    </div>
  </div>
</header>
```

**`src/app/shared/components/header/header.component.scss`**

```scss
.header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-default);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-primary) 0%, #ff8c42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 2rem;

  a {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color var(--transition-fast);
    border-bottom: 2px solid transparent;
    padding-bottom: 0.25rem;

    &:hover { color: var(--text-primary); }

    &.active {
      color: var(--accent-primary);
      border-bottom-color: var(--accent-primary);
    }
  }

  @media (max-width: 768px) { display: none; }
}
```

---

## 2. Footer Component

**`src/app/shared/components/footer/footer.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
```

**`src/app/shared/components/footer/footer.component.html`**

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h4>PDI</h4>
        <p>Plano de Desenvolvimento Individual</p>
      </div>

      <div class="footer-section">
        <h4>Links</h4>
        <ul>
          <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Contato</h4>
        <p>elizabetesousafabri&#64;gmail.com</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ year }} Liza — Frontend / Platform Engineer</p>
      <p class="version">Angular 21 + Taiga UI v5</p>
    </div>
  </div>
</footer>
```

**`src/app/shared/components/footer/footer.component.scss`**

```scss
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-default);
  margin-top: 4rem;
  padding: 2rem 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  h4 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    a {
      font-size: 0.9rem;
      color: var(--text-muted);
      &:hover { color: var(--accent-primary); }
    }
  }
}

.footer-bottom {
  border-top: 1px solid var(--border-default);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin: 0;
  }

  .version {
    font-family: var(--font-mono);
    color: var(--border-default);
  }
}

@media (max-width: 768px) {
  .footer-content { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
```

---

## 3. Evolution Chart Component (NGX-ECharts v21)

**`src/app/shared/components/charts/evolution-chart.component.ts`**

```typescript
import { Component, input, OnChanges } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

export interface ChartDataPoint {
  skill: string;
  atual: number;
  objetivo: number;
}

@Component({
  selector: 'app-evolution-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `
    <div class="chart-container">
      <h3 class="chart-title">Evolução de Skills</h3>
      <div
        echarts
        [options]="chartOptions"
        class="chart"
      ></div>
    </div>
  `,
  styleUrl: './evolution-chart.component.scss',
})
export class EvolutionChartComponent implements OnChanges {
  readonly data = input<ChartDataPoint[]>([
    { skill: 'Angular', atual: 6, objetivo: 9 },
    { skill: 'TypeScript', atual: 7, objetivo: 9.5 },
    { skill: 'AWS', atual: 4, objetivo: 7 },
    { skill: 'System Design', atual: 5, objetivo: 8 },
    { skill: 'Leadership', atual: 3, objetivo: 8 },
  ]);

  chartOptions: EChartsOption = {};

  ngOnChanges(): void {
    this.buildChart();
  }

  ngOnInit(): void {
    this.buildChart();
  }

  private buildChart(): void {
    const items = this.data();
    this.chartOptions = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#111118',
        borderColor: '#2a2a3a',
        textStyle: { color: '#e8e8f0' },
      },
      legend: {
        data: ['Nível Atual', 'Objetivo'],
        textStyle: { color: '#7a7a9a' },
        bottom: 0,
      },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '5%', containLabel: true },
      xAxis: {
        type: 'category',
        data: items.map(d => d.skill),
        axisLine: { lineStyle: { color: '#2a2a3a' } },
        axisLabel: { color: '#7a7a9a', fontSize: 11 },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 10,
        axisLine: { lineStyle: { color: '#2a2a3a' } },
        axisLabel: { color: '#7a7a9a' },
        splitLine: { lineStyle: { color: '#18181f' } },
      },
      series: [
        {
          name: 'Nível Atual',
          data: items.map(d => d.atual),
          type: 'line',
          smooth: true,
          itemStyle: { color: '#ec6a2a' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(236,106,42,0.3)' },
                { offset: 1, color: 'rgba(236,106,42,0.02)' },
              ],
            },
          },
          lineStyle: { width: 2 },
          symbol: 'circle',
          symbolSize: 6,
        },
        {
          name: 'Objetivo',
          data: items.map(d => d.objetivo),
          type: 'line',
          smooth: true,
          itemStyle: { color: '#5e9ff7' },
          lineStyle: { width: 2, type: 'dashed' },
          symbol: 'circle',
          symbolSize: 6,
        },
      ],
    };
  }
}
```

**`src/app/shared/components/charts/evolution-chart.component.scss`**

```scss
.chart-container {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
}

.chart-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.chart {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  .chart { height: 280px; }
}
```

---

## 4. Dashboard Component

**`src/app/features/dashboard/dashboard.component.ts`**

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { EvolutionChartComponent } from '../../shared/components/charts/evolution-chart.component';
import { PdiService } from '../../core/services/pdi.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    HeaderComponent,
    FooterComponent,
    EvolutionChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly pdiService = inject(PdiService);

  readonly pdi$ = this.pdiService.getPDI();

  readonly kpis = [
    { icon: '🎯', value: '35%', label: 'Progresso Total' },
    { icon: '⚡', value: '5', label: 'Skills em Desenvolvimento' },
    { icon: '🚀', value: '3', label: 'Projetos Completados' },
    { icon: '📅', value: '304', label: 'Dias até Meta' },
  ] as const;

  ngOnInit(): void {}
}
```

**`src/app/features/dashboard/dashboard.component.html`**

```html
<div class="dashboard">
  <div class="container">

    @if (pdi$ | async; as pdi) {
      <section class="greeting">
        <h1>Olá, <span class="name">{{ pdi.nome }}</span></h1>
        <p class="subtitle">{{ pdi.nivelAtual }} → {{ pdi.nivelObjetivo }} · {{ pdi.empresa }}</p>
      </section>
    }

    <section class="kpi-section">
      <h2>Progresso Geral</h2>
      <div class="kpi-grid">
        @for (kpi of kpis; track kpi.label) {
          <div class="kpi-card">
            <span class="kpi-icon">{{ kpi.icon }}</span>
            <div class="kpi-content">
              <div class="kpi-value">{{ kpi.value }}</div>
              <div class="kpi-label">{{ kpi.label }}</div>
            </div>
          </div>
        }
      </div>
    </section>

    <section class="chart-section">
      <app-evolution-chart />
    </section>

  </div>
</div>
```

**`src/app/features/dashboard/dashboard.component.scss`**

```scss
.dashboard {
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
}

.greeting {
  margin-bottom: var(--spacing-2xl);
  text-align: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--spacing-sm);

    .name {
      background: linear-gradient(135deg, var(--accent-primary) 0%, #ff8c42 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    h1 { font-size: 1.8rem; }
  }
}

.kpi-section {
  margin-bottom: var(--spacing-2xl);

  h2 {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
  }
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.kpi-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--accent-primary);
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(236, 106, 42, 0.1);
  }
}

.kpi-icon { font-size: 2.5rem; }

.kpi-content {
  .kpi-value {
    font-family: var(--font-mono);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
  }

  .kpi-label {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: var(--spacing-xs);
  }
}

.chart-section {
  margin-bottom: var(--spacing-2xl);
}

@media (max-width: 768px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## App Component Layout

**`src/app/app.ts`**

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

---

## Taiga UI v5 — Imports Corretos

```typescript
// Core
import { TuiRoot, TuiButton, TuiAppearance } from '@taiga-ui/core';

// Kit
import { TuiChip, TuiBadge, TuiAvatar } from '@taiga-ui/kit';

// Icons
import { TuiIcon } from '@taiga-ui/core';

// NÃO use (v4):
// TuiRootModule, TuiButtonModule, TuiChipModule, etc.
```

---

## Próximo Passo

→ [03-mock-data.md](./03-mock-data.md)
