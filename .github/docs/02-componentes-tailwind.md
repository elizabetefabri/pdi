# 02 - Componentes & Tailwind CSS

**Objetivo:** Criar todos os componentes com estilos Tailwind prontos para usar.

**Tempo estimado:** 1-2 horas

---

## 🎨 Componentes a Criar

- [ ] **Header** - Navegação principal
- [ ] **Footer** - Rodapé
- [ ] **Dashboard** - Página principal
- [ ] **Skills** - Seção de competências
- [ ] **Projetos** - Seção de projetos
- [ ] **Roadmap** - Timeline de evolução
- [ ] **Evolution Chart** - Gráfico de evolução (ECharts)

---

## 📍 1. Header Component

### `src/app/shared/components/header/header.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <nav class="nav">
          <!-- Logo / Title -->
          <div class="nav__brand">
            <h1 class="nav__title">PDI</h1>
            <p class="nav__subtitle">Plano de Desenvolvimento Individual</p>
          </div>
          
          <!-- Navigation Links -->
          <ul class="nav__menu">
            <li>
              <a 
                routerLink="/" 
                routerLinkActive="active" 
                [routerLinkActiveOptions]="{ exact: true }"
                class="nav__link"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a 
                routerLink="/skills" 
                routerLinkActive="active"
                class="nav__link"
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                routerLink="/projetos" 
                routerLinkActive="active"
                class="nav__link"
              >
                Projetos
              </a>
            </li>
            <li>
              <a 
                routerLink="/roadmap" 
                routerLinkActive="active"
                class="nav__link"
              >
                Roadmap
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
```

### `src/app/shared/components/header/header.component.scss`

```scss
.header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-default);
  padding: var(--spacing-lg) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-2xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-lg);
    align-items: flex-start;
  }
}

.nav__brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.nav__title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav__subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.nav__menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    gap: var(--spacing-md);
  }
}

.nav__link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 4px;
  transition: all var(--transition-fast);
  position: relative;
  
  &:hover {
    color: var(--accent-primary);
    background: var(--bg-tertiary);
  }
  
  &.active {
    color: var(--accent-primary);
    background: var(--bg-tertiary);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -var(--spacing-sm);
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent-primary);
      border-radius: 1px;
    }
  }
}
```

---

## 📍 2. Footer Component

### `src/app/shared/components/footer/footer.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__section">
            <h4 class="footer__title">Rápidos Links</h4>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">Home</a></li>
              <li><a href="#" class="footer__link">Skills</a></li>
              <li><a href="#" class="footer__link">Projetos</a></li>
              <li><a href="#" class="footer__link">Roadmap</a></li>
            </ul>
          </div>
          
          <div class="footer__section">
            <h4 class="footer__title">Conectar</h4>
            <ul class="footer__list">
              <li>
                <a href="https://linkedin.com" target="_blank" class="footer__link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" class="footer__link">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:elizabetesousafabri@gmail.com" class="footer__link">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="footer__divider"></div>
        
        <div class="footer__bottom">
          <p class="footer__credit">
            © 2026 Liza - Desenvolvido com ❤️ usando Angular v17
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
```

### `src/app/shared/components/footer/footer.component.scss`

```scss
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-default);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  margin-top: auto;
}

.footer__content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}

.footer__section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.footer__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.footer__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer__link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--accent-primary);
  }
}

.footer__divider {
  height: 1px;
  background: var(--border-default);
  margin-bottom: var(--spacing-lg);
}

.footer__bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.footer__credit {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
}
```

---

## 📍 3. Dashboard Component

### `src/app/features/dashboard/dashboard.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvolutionChartComponent } from '../../shared/components/charts/evolution-chart/evolution-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EvolutionChartComponent],
  template: `
    <div class="dashboard">
      <div class="dashboard__header">
        <h2 class="text-h2">Dashboard</h2>
        <p class="text-muted">Bem-vinda ao seu plano de desenvolvimento individual</p>
      </div>
      
      <!-- KPI Cards -->
      <div class="grid grid--cols-4">
        <div class="kpi-card">
          <div class="kpi-card__icon">📊</div>
          <h3 class="kpi-card__title">Projetos</h3>
          <p class="kpi-card__value">5</p>
          <p class="kpi-card__label">Realizados em 2026</p>
        </div>
        
        <div class="kpi-card">
          <div class="kpi-card__icon">⚡</div>
          <h3 class="kpi-card__title">Skills</h3>
          <p class="kpi-card__value">8</p>
          <p class="kpi-card__label">Tecnologias dominadas</p>
        </div>
        
        <div class="kpi-card">
          <div class="kpi-card__icon">🎯</div>
          <h3 class="kpi-card__title">Progresso</h3>
          <p class="kpi-card__value">42%</p>
          <p class="kpi-card__label">Plano completado</p>
        </div>
        
        <div class="kpi-card">
          <div class="kpi-card__icon">📈</div>
          <h3 class="kpi-card__title">Evolução</h3>
          <p class="kpi-card__value">↑ 15%</p>
          <p class="kpi-card__label">vs. ano passado</p>
        </div>
      </div>
      
      <!-- Evolution Chart -->
      <div class="dashboard__chart">
        <h3 class="text-h3">Evolução ao Longo do Tempo</h3>
        <app-evolution-chart></app-evolution-chart>
      </div>
    </div>
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    console.log('Dashboard loaded');
  }
}
```

### `src/app/features/dashboard/dashboard.component.scss`

```scss
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.dashboard__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.dashboard__header h2 {
  margin: 0;
}

.dashboard__chart {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
}

.dashboard__chart h3 {
  margin: 0 0 var(--spacing-lg) 0;
}

.kpi-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(236, 106, 42, 0.1);
  }
}

.kpi-card__icon {
  font-size: 2rem;
}

.kpi-card__title {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.kpi-card__value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin: 0;
  font-family: var(--font-display);
}

.kpi-card__label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
}
```

---

## 📍 4. Skills Component

### `src/app/features/skills/skills.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  id: string;
  name: string;
  level: number; // 1-10
  category: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skills">
      <div class="skills__header">
        <h2 class="text-h2">Skills & Competências</h2>
        <p class="text-muted">Tecnologias e conhecimentos principais</p>
      </div>
      
      <div class="grid grid--cols-3">
        <div *ngFor="let skill of skillsList" class="skill-card">
          <div class="skill-card__icon">{{ skill.icon }}</div>
          <h3 class="skill-card__name">{{ skill.name }}</h3>
          <p class="skill-card__category">{{ skill.category }}</p>
          
          <div class="skill-card__level">
            <div class="skill-card__bar">
              <div 
                class="skill-card__fill" 
                [style.width.%]="skill.level * 10"
              ></div>
            </div>
            <span class="skill-card__percentage">{{ skill.level }}/10</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skillsList: Skill[] = [
    {
      id: 'next',
      name: 'Next.js',
      level: 9,
      category: 'Frontend',
      icon: '⚛️'
    },
    {
      id: 'angular',
      name: 'Angular',
      level: 8,
      category: 'Frontend',
      icon: '🔴'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      level: 9,
      category: 'Language',
      icon: '📘'
    },
    {
      id: 'aws',
      name: 'AWS',
      level: 7,
      category: 'Cloud',
      icon: '☁️'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      level: 8,
      category: 'Backend',
      icon: '🟢'
    },
    {
      id: 'react',
      name: 'React',
      level: 8,
      category: 'Frontend',
      icon: '⚛️'
    },
  ];
  
  ngOnInit() {
    console.log('Skills loaded');
  }
}
```

### `src/app/features/skills/skills.component.scss`

```scss
.skills {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.skills__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.skills__header h2 {
  margin: 0;
}

.skill-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
  cursor: pointer;
  
  &:hover {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(236, 106, 42, 0.1);
  }
}

.skill-card__icon {
  font-size: 2.5rem;
  line-height: 1;
}

.skill-card__name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.skill-card__category {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.skill-card__level {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.skill-card__bar {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--border-default);
}

.skill-card__fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--accent-primary),
    var(--accent-secondary)
  );
  transition: width var(--transition-slow);
  border-radius: 3px;
}

.skill-card__percentage {
  font-size: 0.75rem;
  color: var(--accent-primary);
  font-weight: 600;
  font-family: var(--font-mono);
}
```

---

## 📍 5. Projetos Component

### `src/app/features/projetos/projetos.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  tecnologias: string[];
  dataInicio: string;
  dataFim: string;
  impacto: string;
  icon: string;
}

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="projetos">
      <div class="projetos__header">
        <h2 class="text-h2">Meus Projetos</h2>
        <p class="text-muted">Trabalhos realizados e aprendizados adquiridos</p>
      </div>
      
      <div class="grid grid--cols-3">
        <div *ngFor="let projeto of projetosList" class="projeto-card">
          <div class="projeto-card__icon">{{ projeto.icon }}</div>
          <h3 class="projeto-card__name">{{ projeto.nome }}</h3>
          
          <p class="projeto-card__desc">{{ projeto.descricao }}</p>
          
          <div class="projeto-card__period">
            <span class="projeto-card__date">{{ projeto.dataInicio }}</span>
            <span class="projeto-card__separator">→</span>
            <span class="projeto-card__date">{{ projeto.dataFim }}</span>
          </div>
          
          <div class="projeto-card__techs">
            <span 
              *ngFor="let tech of projeto.tecnologias"
              class="projeto-card__tech"
            >
              {{ tech }}
            </span>
          </div>
          
          <div class="projeto-card__impact">
            <strong>Impacto:</strong> {{ projeto.impacto }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent implements OnInit {
  projetosList: Projeto[] = [
    {
      id: 'proj-1',
      nome: 'Projeto 1',
      descricao: 'Descrição do projeto',
      tecnologias: ['Next.js', 'TypeScript', 'AWS'],
      dataInicio: 'Jan 2026',
      dataFim: 'Mar 2026',
      impacto: '+500 usuários',
      icon: '📱'
    },
    {
      id: 'proj-2',
      nome: 'Projeto 2',
      descricao: 'Descrição do projeto',
      tecnologias: ['Angular', 'Node.js', 'AWS'],
      dataInicio: 'Apr 2026',
      dataFim: 'Jun 2026',
      impacto: '+30% performance',
      icon: '⚙️'
    },
    {
      id: 'proj-3',
      nome: 'Projeto 3',
      descricao: 'Descrição do projeto',
      tecnologias: ['React', 'TypeScript'],
      dataInicio: 'Jul 2026',
      dataFim: 'Ago 2026',
      impacto: '+200k requests/dia',
      icon: '🚀'
    },
  ];
  
  ngOnInit() {
    console.log('Projetos loaded');
  }
}
```

### `src/app/features/projetos/projetos.component.scss`

```scss
.projetos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.projetos__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.projetos__header h2 {
  margin: 0;
}

.projeto-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
  cursor: pointer;
  
  &:hover {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(236, 106, 42, 0.15);
  }
}

.projeto-card__icon {
  font-size: 2.5rem;
}

.projeto-card__name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.projeto-card__desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

.projeto-card__period {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.projeto-card__date {
  font-family: var(--font-mono);
}

.projeto-card__separator {
  color: var(--border-default);
}

.projeto-card__techs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.projeto-card__tech {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  color: var(--accent-tertiary);
  font-size: 0.625rem;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 3px;
  font-weight: 500;
}

.projeto-card__impact {
  font-size: 0.875rem;
  color: var(--status-success);
  font-family: var(--font-mono);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-default);
}
```

---

## 📍 6. Roadmap Component

### `src/app/features/roadmap/roadmap.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RoadmapPhase {
  period: string;
  title: string;
  goals: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="roadmap">
      <div class="roadmap__header">
        <h2 class="text-h2">Roadmap de Evolução</h2>
        <p class="text-muted">Plano de 3 anos: Pleno → Sênior</p>
      </div>
      
      <div class="timeline">
        <div 
          *ngFor="let phase of phases; let i = index"
          class="timeline__item"
          [class.timeline__item--completed]="phase.status === 'completed'"
          [class.timeline__item--active]="phase.status === 'in-progress'"
        >
          <div class="timeline__marker"></div>
          
          <div class="timeline__content">
            <h3 class="timeline__period">{{ phase.period }}</h3>
            <h4 class="timeline__title">{{ phase.title }}</h4>
            
            <ul class="timeline__goals">
              <li *ngFor="let goal of phase.goals" class="timeline__goal">
                {{ goal }}
              </li>
            </ul>
            
            <span class="timeline__badge" [class]="'timeline__badge--' + phase.status">
              {{ phase.status === 'completed' ? '✓ Completo' : phase.status === 'in-progress' ? '⚡ Em progresso' : '📋 Planejado' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './roadmap.component.scss'
})
export class RoadmapComponent implements OnInit {
  phases: RoadmapPhase[] = [
    {
      period: 'Q2 2026',
      title: 'Fundações',
      goals: [
        'Dominar padrões avançados em Angular',
        'Primeira mentoría técnica',
        'Completar projeto crítico'
      ],
      status: 'in-progress'
    },
    {
      period: 'Q3-Q4 2026',
      title: 'Arquitetura & Design',
      goals: [
        'Liderar decisões técnicas',
        'Documentar ADRs',
        'Implementar padrões escaláveis'
      ],
      status: 'planned'
    },
    {
      period: '2027',
      title: 'AWS & Performance',
      goals: [
        'Certificação AWS',
        'Implementar observabilidade',
        'Otimizar aplicações críticas'
      ],
      status: 'planned'
    },
    {
      period: '2028',
      title: 'Liderança Sênior',
      goals: [
        'Mentoría de 2+ juniores',
        'Arquiteto de sistemas',
        'Decisões estratégicas'
      ],
      status: 'planned'
    }
  ];
  
  ngOnInit() {
    console.log('Roadmap loaded');
  }
}
```

### `src/app/features/roadmap/roadmap.component.scss`

```scss
.roadmap {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.roadmap__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.roadmap__header h2 {
  margin: 0;
}

.timeline {
  position: relative;
  padding: var(--spacing-xl) 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      180deg,
      var(--accent-primary),
      var(--accent-secondary)
    );
  }
}

.timeline__item {
  margin-left: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  position: relative;
  
  &--completed .timeline__marker {
    background: var(--status-success);
    box-shadow: 0 0 0 4px rgba(78, 203, 141, 0.1);
  }
  
  &--active .timeline__marker {
    background: var(--accent-primary);
    animation: pulse 2s infinite;
    box-shadow: 0 0 0 4px rgba(236, 106, 42, 0.2);
  }
}

.timeline__marker {
  position: absolute;
  left: -36px;
  top: 6px;
  width: 16px;
  height: 16px;
  background: var(--border-default);
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  transition: all var(--transition-base);
}

.timeline__content {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
  }
}

.timeline__period {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  font-weight: 600;
}

.timeline__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: var(--accent-primary);
}

.timeline__goals {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin: 0;
  padding: 0;
}

.timeline__goal {
  font-size: 0.875rem;
  color: var(--text-primary);
  padding-left: var(--spacing-lg);
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--status-success);
    font-weight: 700;
  }
}

.timeline__badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 4px;
  width: fit-content;
  font-family: var(--font-mono);
  
  &--completed {
    background: rgba(78, 203, 141, 0.1);
    color: var(--status-success);
  }
  
  &--in-progress {
    background: rgba(236, 106, 42, 0.1);
    color: var(--accent-primary);
  }
  
  &--planned {
    background: rgba(122, 122, 154, 0.1);
    color: var(--text-muted);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(236, 106, 42, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(236, 106, 42, 0);
  }
}
```

---

## 📍 7. Evolution Chart Component (ECharts)

### `src/app/shared/components/charts/evolution-chart/evolution-chart.component.ts`

```typescript
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-evolution-chart',
  standalone: true,
  template: `<div #chartContainer class="chart-container"></div>`,
  styleUrl: './evolution-chart.component.scss'
})
export class EvolutionChartComponent implements OnInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  
  ngOnInit() {
    this.initChart();
  }
  
  initChart() {
    setTimeout(() => {
      const chartDom = this.chartContainer.nativeElement;
      const myChart = echarts.init(chartDom, null, { renderer: 'canvas' });
      
      const option = {
        backgroundColor: 'transparent',
        textStyle: {
          fontFamily: "'DM Sans', sans-serif",
          color: '#e8e8f0'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          axisLine: { lineStyle: { color: '#2a2a3a' } },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#2a2a3a' } },
          splitLine: { lineStyle: { color: '#2a2a3a' } }
        },
        series: [
          {
            data: [3, 4, 5, 6, 7, 8],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#ec6a2a' },
            lineStyle: { width: 3 },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(236, 106, 42, 0.3)' },
                { offset: 1, color: 'rgba(236, 106, 42, 0)' }
              ])
            }
          }
        ],
        tooltip: {
          backgroundColor: '#111118',
          borderColor: '#2a2a3a',
          textStyle: { color: '#e8e8f0' }
        }
      };
      
      myChart.setOption(option);
      
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }, 100);
  }
}
```

### `src/app/shared/components/charts/evolution-chart/evolution-chart.component.scss`

```scss
.chart-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}
```

---

## ✅ Checklist Final

- [ ] Header criado com navegação
- [ ] Footer criado com links
- [ ] Dashboard com KPI cards
- [ ] Skills com progress bars
- [ ] Projetos com cards
- [ ] Roadmap com timeline
- [ ] Evolution Chart com ECharts
- [ ] Todos os estilos SCSS prontos
- [ ] Componentes rodando sem erros

---

## 🔗 Próximo Passo

Ler **03-mock-data.md** para estruturar os dados.
