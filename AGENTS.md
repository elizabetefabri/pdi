# 🚀 AGENTS.md - Guia Completo de Construção do PDI

**Data:** 2026-05-01  
**Deadline:** 2026-05-18 (17 dias)  
**Status:** 🟢 Iniciando

---

## 📋 Índice Rápido

1. [Design System & Cores](#design-system--cores)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Instalação & Setup](#instalação--setup)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Componentes a Criar](#componentes-a-criar)
6. [Serviços & Models](#serviços--models)
7. [Commits & Versionamento](#commits--versionamento)
8. [Checklist de Desenvolvimento](#checklist-de-desenvolvimento)

---

## 🎨 Design System & Cores

### Paleta de Cores (Renomeada)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0f; /* Fundo principal (quase preto) */
  --bg-secondary: #111118; /* Fundo secundário (cinza muito escuro) */
  --bg-tertiary: #18181f; /* Fundo terciário (cinza escuro) */

  /* Borders & Dividers */
  --border-default: #2a2a3a; /* Borda padrão */

  /* Accents (Destaque) */
  --accent-primary: #ec6a2a; /* Laranja (ação, destaque) */
  --accent-secondary: #f7c25e; /* Amarelo (aviso, importante) */
  --accent-tertiary: #5e9ff7; /* Azul (informação, link) */

  /* Text */
  --text-primary: #e8e8f0; /* Texto principal (branco off) */
  --text-muted: #7a7a9a; /* Texto secundário (cinza) */

  /* Status Colors */
  --status-success: #4ecb8d; /* Verde (sucesso, aprovado) */
  --status-error: #f06a7a; /* Vermelho (erro, aviso) */
  --status-highlight: #a78bfa; /* Roxo (destaque, premium) */
}
```

### Tipografia

```css
/* Google Fonts Import */
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap");

/* Font Families */
--font-display:
  "Syne", sans-serif; /* Títulos, headings (bold, design-forward) */
--font-body: "DM Sans", sans-serif; /* Corpo, textos longos (readable, clean) */
--font-mono: "DM Mono", monospace; /* Código, números, dados (precisão) */
```

### Escala de Tamanhos (Typografia)

```css
/* Títulos */
--text-h1: 2.5rem; /* 40px - Main hero titles */
--text-h2: 2rem; /* 32px - Section titles */
--text-h3: 1.5rem; /* 24px - Subsection titles */
--text-h4: 1.25rem; /* 20px - Card titles */

/* Body */
--text-lg: 1.125rem; /* 18px - Large body text */
--text-md: 1rem; /* 16px - Default body text */
--text-sm: 0.875rem; /* 14px - Secondary text */
--text-xs: 0.75rem; /* 12px - Captions, labels */
```

---

## 💻 Stack Tecnológico

### Dependências Principais

```bash
# Framework
- Angular v17 (Standalone Components)

# UI & Styling
- Tailwind CSS v3
- Framer Motion (animações suaves)

# Charts & Visualização
- ECharts (apache-echarts)

# Utils
- TypeScript 5.1+
- RxJS 7.8+
```

### Dependências de Desenvolvimento

```bash
- @angular/cli v17
- @angular/compiler-cli v17
- typescript v5.1+
- tailwindcss v3
- postcss
- autoprefixer
- @types/node
- @angular/schematics
```

---

## ⚙️ Instalação & Setup

### 1. Criar Projeto Angular v17

```bash
# Criar novo projeto (standalone, routing, tailwind)
ng new pdi-frontend --standalone --routing --skip-git

cd pdi-frontend
```

### 2. Instalar Dependências

```bash
# Charts
npm install echarts

# Animações
npm install framer-motion

# Tailwind (opcional, pode fazer manual)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Se precisar de utils
npm install class-variance-authority clsx tailwind-merge
```

### 3. Configurar Tailwind CSS

**`tailwind.config.js`**

```javascript
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      // Backgrounds
      "bg-primary": "#0a0a0f",
      "bg-secondary": "#111118",
      "bg-tertiary": "#18181f",

      // Accents
      "accent-primary": "#ec6a2a",
      "accent-secondary": "#f7c25e",
      "accent-tertiary": "#5e9ff7",

      // Text
      "text-primary": "#e8e8f0",
      "text-muted": "#7a7a9a",

      // Status
      "status-success": "#4ecb8d",
      "status-error": "#f06a7a",
      "status-highlight": "#a78bfa",

      // Transparents
      "border-default": "#2a2a3a",
    },
    fontFamily: {
      display: ["Syne", "sans-serif"],
      body: ["DM Sans", "sans-serif"],
      mono: ["DM Mono", "monospace"],
    },
    fontSize: {
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.5rem",
      h4: "1.25rem",
      lg: "1.125rem",
      md: "1rem",
      sm: "0.875rem",
      xs: "0.75rem",
    },
    extend: {
      spacing: {
        gutter: "2rem",
        "gutter-lg": "3rem",
      },
    },
  },
  plugins: [],
};
```

### 4. Estilos Globais

**`src/styles.scss`**

```scss
/* ====================================
   GLOBAL STYLES
   ==================================== */

@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap");

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

  /* Accents */
  --accent-primary: #ec6a2a;
  --accent-secondary: #f7c25e;
  --accent-tertiary: #5e9ff7;

  /* Text */
  --text-primary: #e8e8f0;
  --text-muted: #7a7a9a;

  /* Status */
  --status-success: #4ecb8d;
  --status-error: #f06a7a;
  --status-highlight: #a78bfa;

  /* Typography */
  --font-display: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --font-mono: "DM Mono", monospace;

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

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
}

h1 {
  font-size: var(--text-h1);
}
h2 {
  font-size: var(--text-h2);
}
h3 {
  font-size: var(--text-h3);
}
h4 {
  font-size: var(--text-h4);
}

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
}

code {
  font-family: var(--font-mono);
  background: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 4px;
  font-size: 0.9em;
}

/* ====================================
   GRID SYSTEM
   ==================================== */

.grid {
  display: grid;
  gap: var(--spacing-lg);

  &--cols-1 {
    grid-template-columns: 1fr;
  }
  &--cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  &--cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  &--cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    &--cols-2,
    &--cols-3,
    &--cols-4 {
      grid-template-columns: 1fr;
    }
  }
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);

  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }
}

/* ====================================
   UTILITIES
   ==================================== */

.border-bottom {
  border-bottom: 1px solid var(--border-default);
}

.text-muted {
  color: var(--text-muted);
}

.text-accent {
  color: var(--accent-primary);
}

.bg-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: var(--spacing-lg);
}

.transition {
  transition: all var(--transition-base);
}

/* ====================================
   SCROLLBAR
   ==================================== */

::-webkit-scrollbar {
  width: 8px;
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
   FOCUS STATES
   ==================================== */

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

---

## 📁 Estrutura do Projeto

### Após Setup, a estrutura deve ser:

```
pdi-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── pdi.service.ts
│   │   │   │   ├── projetos.service.ts
│   │   │   │   ├── skills.service.ts
│   │   │   │   └── evolucao.service.ts
│   │   │   └── models/
│   │   │       ├── pdi.model.ts
│   │   │       ├── projeto.model.ts
│   │   │       ├── skill.model.ts
│   │   │       └── evolucao.model.ts
│   │   │
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   └── dashboard.component.spec.ts
│   │   │   │
│   │   │   ├── skills/
│   │   │   │   ├── skills.component.ts
│   │   │   │   ├── skills.component.html
│   │   │   │   ├── skills.component.scss
│   │   │   │   └── skills.component.spec.ts
│   │   │   │
│   │   │   ├── projetos/
│   │   │   │   ├── projetos.component.ts
│   │   │   │   ├── projetos.component.html
│   │   │   │   ├── projetos.component.scss
│   │   │   │   └── projetos.component.spec.ts
│   │   │   │
│   │   │   └── roadmap/
│   │   │       ├── roadmap.component.ts
│   │   │       ├── roadmap.component.html
│   │   │       ├── roadmap.component.scss
│   │   │       └── roadmap.component.spec.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.scss
│   │   │   │   │   └── header.component.spec.ts
│   │   │   │   │
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.ts
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   ├── footer.component.scss
│   │   │   │   │   └── footer.component.spec.ts
│   │   │   │   │
│   │   │   │   └── charts/
│   │   │   │       ├── evolution-chart.component.ts
│   │   │   │       ├── evolution-chart.component.html
│   │   │   │       ├── evolution-chart.component.scss
│   │   │   │       └── evolution-chart.component.spec.ts
│   │   │   │
│   │   │   └── directives/
│   │   │       └── ... (a adicionar conforme necessário)
│   │   │
│   │   ├── app.routes.ts
│   │   ├── app.component.ts
│   │   └── app.component.html
│   │
│   ├── assets/
│   │   ├── data/
│   │   │   ├── pdi.json
│   │   │   ├── projetos.json
│   │   │   ├── skills.json
│   │   │   └── evolucao.json
│   │   └── icons/
│   │       └── ... (SVGs)
│   │
│   ├── styles.scss
│   └── main.ts
│
├── angular.json
├── tsconfig.json
├── tailwind.config.js
├── package.json
├── .gitignore
├── .env.example
├── README.md
└── AGENTS.md
```

---

## 🔧 Componentes a Criar

### Comandos para Gerar (execute um por um)

```bash
# Shared Components
ng generate component shared/components/header --skip-tests
ng generate component shared/components/footer --skip-tests
ng generate component shared/components/charts/evolution-chart --skip-tests

# Features - Dashboard
ng generate component features/dashboard --skip-tests

# Features - Skills
ng generate component features/skills --skip-tests

# Features - Projetos
ng generate component features/projetos --skip-tests

# Features - Roadmap
ng generate component features/roadmap --skip-tests
```

### Geração de Serviços

```bash
# Core Services
ng generate service core/services/pdi --skip-tests
ng generate service core/services/projetos --skip-tests
ng generate service core/services/skills --skip-tests
ng generate service core/services/evolucao --skip-tests
```

### Geração de Models/Interfaces

```bash
# Core Models
ng generate interface core/models/pdi
ng generate interface core/models/projeto
ng generate interface core/models/skill
ng generate interface core/models/evolucao
```

---

## 📊 Serviços & Models

### Core Models (`src/app/core/models/`)

Veja documento **03-mock-data.md** para as interfaces completas.

### Core Services (`src/app/core/services/`)

Cada serviço deve ter:

- Método `getAll()`
- Método `getById(id)`
- Método `create(data)` (opcional, para futuro)
- Método `update(id, data)` (opcional, para futuro)
- Usar HttpClient ou retornar dados mock

---

## 📝 Arquivo de Rotas

**`src/app/app.routes.ts`**

```typescript
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    data: { title: "Dashboard" },
  },
  {
    path: "skills",
    component: SkillsComponent,
    data: { title: "Skills & Competências" },
  },
  {
    path: "projetos",
    component: ProjetosComponent,
    data: { title: "Meus Projetos" },
  },
  {
    path: "roadmap",
    component: RoadmapComponent,
    data: { title: "Roadmap de Evolução" },
  },
  {
    path: "**",
    redirectTo: "",
  },
];
```

---

## 🔄 Commits & Versionamento

### Padrão: Conventional Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos:

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, sem lógica
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Setup, dependências

---

## ✅ Checklist de Desenvolvimento

### Fase 1: Setup (Dia 1-2)

- [ ] Criar projeto Angular v17
- [ ] Instalar dependências (ECharts, Framer Motion, Tailwind)
- [ ] Configurar Tailwind
- [ ] Criar estilos globais (styles.scss)
- [ ] Criar estrutura de pastas
- [ ] **1º Commit:** `feat: initial angular setup with tailwind`

### Fase 2: Componentes Base (Dia 2-3)

- [ ] Gerar Header Component
- [ ] Gerar Footer Component
- [ ] Gerar Layout base (App Component)
- [ ] Configurar rotas
- [ ] **2º Commit:** `feat: add header, footer, routing`

### Fase 3: Services & Models (Dia 3-4)

- [ ] Criar Models/Interfaces
- [ ] Criar Services (mock data)
- [ ] Criar dados JSON em `assets/data/`
- [ ] Testar services
- [ ] **3º Commit:** `feat: add core services and models`

### Fase 4: Dashboard (Dia 4-6)

- [ ] Dashboard Component
- [ ] KPI Cards
- [ ] Evolution Chart (ECharts)
- [ ] Integração com Service
- [ ] **4º Commit:** `feat: dashboard with charts`

### Fase 5: Skills (Dia 6-7)

- [ ] Skills Component
- [ ] Skill Cards
- [ ] Filter & Search
- [ ] **5º Commit:** `feat: skills page with filters`

### Fase 6: Projetos (Dia 7-9)

- [ ] Projetos Component
- [ ] Project Cards (grid)
- [ ] Detail Modal/Page
- [ ] **6º Commit:** `feat: projetos page with detail view`

### Fase 7: Roadmap (Dia 9-11)

- [ ] Roadmap Component
- [ ] Timeline Visual
- [ ] Milestones
- [ ] **7º Commit:** `feat: roadmap timeline`

### Fase 8: Animações (Dia 11-13)

- [ ] Framer Motion em transitions
- [ ] Card animations
- [ ] Page transitions
- [ ] **8º Commit:** `feat: add framer motion animations`

### Fase 9: Deploy & Polish (Dia 13-17)

- [ ] Environment setup
- [ ] Build otimizado
- [ ] Deploy em Vercel
- [ ] Testes finais
- [ ] **9º Commit:** `chore: production build and deploy`
- [ ] **10º Commit:** `docs: update README and AGENTS`

---

## 🚀 Próximas Ações

1. Ler **01-angular-boilerplate.md** (Setup detalhado)
2. Ler **02-componentes-tailwind.md** (Componentes prontos)
3. Ler **03-mock-data.md** (Dados estruturados)
4. Ler **04-guia-implementacao.md** (Passo a passo)
5. Começar o setup

**Topzera? 🚀**
