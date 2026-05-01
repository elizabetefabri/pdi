# 01 - Angular v17 Boilerplate & Setup

**Objetivo:** Setup completo do projeto Angular v17 com todas as dependências, estrutura e configuração inicial.

**Tempo estimado:** 1-2 horas

---

## 📦 Passo 1: Criar Projeto Angular v17

### Comando Base

```bash
# Criar projeto Angular com Standalone Components
ng new pdi-frontend \
  --standalone \
  --routing \
  --style=scss \
  --package-manager=npm \
  --skip-git

# Entrar na pasta
cd pdi-frontend
```

### O que foi criado
- ✅ Projeto Angular v17
- ✅ Standalone Components (sem módulos)
- ✅ Router pré-configurado
- ✅ SCSS como preprocessador
- ✅ package.json pronto

---

## 📥 Passo 2: Instalar Dependências

### 2.1 Dependências principais

```bash
# Charts (ECharts)
npm install echarts

# Animações
npm install framer-motion

# Utils (opcional, mas recomendado)
npm install clsx class-variance-authority
```

### 2.2 Tailwind CSS (Manual Setup)

```bash
# Instalar Tailwind e dependências
npm install -D tailwindcss postcss autoprefixer

# Inicializar configuração
npx tailwindcss init -p
```

**Resultado esperado:**
- ✅ `tailwind.config.js` criado
- ✅ `postcss.config.js` criado

---

## ⚙️ Passo 3: Configurar Tailwind CSS

### 3.1 Atualizar `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#111118',
        'bg-tertiary': '#18181f',
        
        // Accents (Destaque)
        'accent-primary': '#ec6a2a',    // Laranja
        'accent-secondary': '#f7c25e',  // Amarelo
        'accent-tertiary': '#5e9ff7',   // Azul
        
        // Text
        'text-primary': '#e8e8f0',
        'text-muted': '#7a7a9a',
        
        // Status
        'status-success': '#4ecb8d',
        'status-error': '#f06a7a',
        'status-highlight': '#a78bfa',
        
        // Borders
        'border-default': '#2a2a3a',
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
      fontSize: {
        'h1': '2.5rem',
        'h2': '2rem',
        'h3': '1.5rem',
        'h4': '1.25rem',
        'lg': '1.125rem',
        'md': '1rem',
        'sm': '0.875rem',
        'xs': '0.75rem',
      },
      spacing: {
        'gutter': '2rem',
        'gutter-lg': '3rem',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}
```

### 3.2 Atualizar `src/styles.scss`

Substituir todo conteúdo por:

```scss
/* ====================================
   GLOBAL STYLES & DESIGN SYSTEM
   ==================================== */

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

/* ====================================
   CSS VARIABLES (Color System)
   ==================================== */

:root {
  /* Backgrounds */
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-tertiary: #18181f;
  
  /* Borders */
  --border-default: #2a2a3a;
  
  /* Accents (Destaque) */
  --accent-primary: #ec6a2a;    /* Laranja - Ação, destaque */
  --accent-secondary: #f7c25e;  /* Amarelo - Aviso, importante */
  --accent-tertiary: #5e9ff7;   /* Azul - Informação, link */
  
  /* Text */
  --text-primary: #e8e8f0;      /* Branco off */
  --text-muted: #7a7a9a;        /* Cinza médio */
  
  /* Status */
  --status-success: #4ecb8d;    /* Verde */
  --status-error: #f06a7a;      /* Vermelho */
  --status-highlight: #a78bfa;  /* Roxo */
  
  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}

/* ====================================
   RESET & NORMALIZATION
   ==================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ====================================
   TYPOGRAPHY
   ==================================== */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; }

p {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

a {
  color: var(--accent-tertiary);
  text-decoration: none;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--accent-secondary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }
}

button {
  cursor: pointer;
  
  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
}

code {
  font-family: var(--font-mono);
  background: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--accent-secondary);
}

pre {
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: var(--spacing-lg);
  border: 1px solid var(--border-default);
  
  code {
    background: transparent;
    padding: 0;
    color: var(--text-primary);
  }
}

/* ====================================
   GRID SYSTEM
   ==================================== */

.grid {
  display: grid;
  gap: var(--spacing-lg);
  
  &--cols-1 { grid-template-columns: 1fr; }
  &--cols-2 { grid-template-columns: repeat(2, 1fr); }
  &--cols-3 { grid-template-columns: repeat(3, 1fr); }
  &--cols-4 { grid-template-columns: repeat(4, 1fr); }
  
  @media (max-width: 1024px) {
    &--cols-3, &--cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    &--cols-2, &--cols-3, &--cols-4 {
      grid-template-columns: 1fr;
    }
  }
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }
}

/* ====================================
   CARD STYLES
   ==================================== */

.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
  }
}

/* ====================================
   BUTTONS
   ==================================== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;
  
  &--primary {
    background: var(--accent-primary);
    color: var(--bg-primary);
    
    &:hover {
      background: #ff7f3a;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(236, 106, 42, 0.3);
    }
  }
  
  &--secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-default);
    
    &:hover {
      border-color: var(--accent-primary);
      background: var(--bg-tertiary);
    }
  }
  
  &--ghost {
    background: transparent;
    color: var(--accent-tertiary);
    
    &:hover {
      background: var(--bg-secondary);
    }
  }
}

/* ====================================
   UTILITY CLASSES
   ==================================== */

.text-muted {
  color: var(--text-muted);
}

.text-accent {
  color: var(--accent-primary);
}

.text-success {
  color: var(--status-success);
}

.text-error {
  color: var(--status-error);
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.bg-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
}

.border-bottom {
  border-bottom: 1px solid var(--border-default);
}

.border-top {
  border-top: 1px solid var(--border-default);
}

.transition {
  transition: all var(--transition-base);
}

.mt-xs { margin-top: var(--spacing-xs); }
.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }
.mt-xl { margin-top: var(--spacing-xl); }
.mt-2xl { margin-top: var(--spacing-2xl); }

.mb-xs { margin-bottom: var(--spacing-xs); }
.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }
.mb-xl { margin-bottom: var(--spacing-xl); }
.mb-2xl { margin-bottom: var(--spacing-2xl); }

.px-lg { padding: 0 var(--spacing-lg); }
.py-lg { padding: var(--spacing-lg) 0; }

/* ====================================
   SCROLLBAR STYLING
   ==================================== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: 4px;
  
  &:hover {
    background: var(--text-muted);
  }
}

/* ====================================
   ANIMATIONS
   ==================================== */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn var(--transition-base) ease-out;
}

/* ====================================
   RESPONSIVE UTILITIES
   ==================================== */

@media (max-width: 768px) {
  h1 { font-size: 1.875rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
}

/* ====================================
   PRINT STYLES
   ==================================== */

@media print {
  * {
    background: transparent;
    color: #000;
    box-shadow: none;
    text-shadow: none;
  }
  
  a {
    text-decoration: underline;
  }
}
```

### 3.3 Adicionar imports ao `src/main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Importar Tailwind
import './styles.scss';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
  ]
}).catch(err => console.error(err));
```

---

## 📁 Passo 4: Criar Estrutura de Pastas

Execute os comandos abaixo na sequência:

```bash
# Criar pastas principais
mkdir -p src/app/core/services
mkdir -p src/app/core/models
mkdir -p src/app/features/dashboard
mkdir -p src/app/features/skills
mkdir -p src/app/features/projetos
mkdir -p src/app/features/roadmap
mkdir -p src/app/shared/components/{header,footer,charts}
mkdir -p src/app/shared/directives
mkdir -p src/assets/data
mkdir -p src/assets/icons
```

---

## 🚀 Passo 5: Remover e Limpar Projeto Inicial

### O que remover:
- ❌ `src/app/app.component.css`
- ❌ `src/app/app.component.spec.ts`
- ❌ Conteúdo padrão do `app.component.html` e `app.component.ts`

### Manter:
- ✅ `src/app/app.component.ts` (modificar)
- ✅ `src/app/app.component.html` (modificar)
- ✅ `src/app/app.routes.ts` (criar)
- ✅ `src/styles.scss`
- ✅ `src/main.ts`

### 5.1 Novo `src/app/app.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="container py-lg">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PDI - Plano de Desenvolvimento Individual';
}
```

### 5.2 Novo `src/app/app.component.scss`

```scss
main {
  min-height: calc(100vh - 200px); // Espaço para header + footer
}
```

---

## 🎯 Passo 6: Criar Arquivo de Rotas

**`src/app/app.routes.ts`**

```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjetosComponent } from './features/projetos/projetos.component';
import { RoadmapComponent } from './features/roadmap/roadmap.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { title: 'Skills & Competências' }
  },
  {
    path: 'projetos',
    component: ProjetosComponent,
    data: { title: 'Meus Projetos' }
  },
  {
    path: 'roadmap',
    component: RoadmapComponent,
    data: { title: 'Roadmap de Evolução' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

---

## 🔨 Passo 7: Gerar Componentes Iniciais

Execute os comandos (sem testes por enquanto):

```bash
# Shared Components
ng generate component shared/components/header --skip-tests
ng generate component shared/components/footer --skip-tests
ng generate component shared/components/charts/evolution-chart --skip-tests

# Features
ng generate component features/dashboard --skip-tests
ng generate component features/skills --skip-tests
ng generate component features/projetos --skip-tests
ng generate component features/roadmap --skip-tests

# Services
ng generate service core/services/pdi --skip-tests
ng generate service core/services/projetos --skip-tests
ng generate service core/services/skills --skip-tests
ng generate service core/services/evolucao --skip-tests

# Models (Interfaces)
ng generate interface core/models/pdi
ng generate interface core/models/projeto
ng generate interface core/models/skill
ng generate interface core/models/evolucao
```

---

## ✅ Passo 8: Primeiro Teste - Hello World

### Rodar o servidor

```bash
ng serve
```

Acesse `http://localhost:4200/`

Você deve ver:
- ✅ Header vazio (será preenchido)
- ✅ Main com "Dashboard" ou similar
- ✅ Footer vazio

---

## 🎯 Passo 9: Primeiro Commit

```bash
# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "feat: initial angular v17 setup with tailwind and structure"

# Logs
git log --oneline
```

Seu primeiro commit deve aparecer com mensagem clara.

---

## ✅ Checklist Final

- [ ] Projeto Angular v17 criado
- [ ] Dependências instaladas (ECharts, Framer Motion)
- [ ] Tailwind configurado
- [ ] Estilos globais criados
- [ ] Estrutura de pastas criada
- [ ] Componentes gerados
- [ ] Services gerados
- [ ] Models gerados
- [ ] Rotas configuradas
- [ ] Servidor rodando sem erros
- [ ] Primeiro commit feito

---

## 🔗 Próximo Passo

Ler **02-componentes-tailwind.md** para criar os componentes com estilos.
