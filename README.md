# 🚀 My PDI - Plano de Desenvolvimento Individual

> Um website interativo que mostra minha evolução de **Pleno → Sênior em 3 anos** com dados reais, visualizações e roadmap estratégico.

<div align="center">

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Last Updated](https://img.shields.io/badge/Última%20atualização-Maio%202026-blue?style=flat-square)

[🌐 Website Ao Vivo](#-acesse-online) • [📚 Documentação](#-documentação) • [💼 LinkedIn](#-conectar) • [📧 Email](#-contacto)

</div>

---

## 📋 Sobre

Um **PDI (Plano de Desenvolvimento Individual) digital e interativo** construído com **Angular 21**, mostrando meu progresso técnico com:

- 📊 **Dashboard** com KPIs de evolução
- ⚡ **Skills & Competências** com progress bars
- 🚀 **Projetos Realizados** com impacto técnico
- 📈 **Roadmap** de 3 anos (Pleno → Sênior)
- 📉 **Gráficos ECharts** de evolução contínua

---

## 🎯 Objetivos Principais

| Objetivo                           | Status         | Prazo   |
| ---------------------------------- | -------------- | ------- |
| Dominar arquitetura de sistemas    | 🔄 In Progress | 2026-Q4 |
| Liderar projetos técnicos críticos | 🔄 In Progress | 2026-Q3 |
| Profundidade em AWS                | ⏳ Planned     | 2027-Q1 |
| Mentorar 2+ desenvolvedores        | ⏳ Planned     | 2027-Q2 |
| Posição Sênior Full                | ⏳ Planned     | 2029-Q1 |

---

## 🛠️ Tech Stack

### Frontend

```
Angular 21           Standalone Components, Routing, SSR
TypeScript 5.9       Tipagem forte e precisão
Taiga UI v5          Design system (componentes standalone)
NGX-ECharts + ECharts Gráficos interativos e animados
SCSS                 Preprocessador para estilos
Jest                 Testes unitários + cobertura
```

### Deploy & CI/CD

```
Vercel               Hosting e preview automático
GitHub Actions       (Opcional, para CI/CD)
npm / Node.js 18+    Package management
```

### Development

```
@angular/cli v21     Gerador de componentes
ng serve             Desenvolvimento local
npm build            Build otimizado
```

---

## 📂 Estrutura do Projeto

```
pdi-frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Serviços e Models
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
│   │   ├── features/                # Páginas principais
│   │   │   ├── dashboard/
│   │   │   ├── skills/
│   │   │   ├── projetos/
│   │   │   └── roadmap/
│   │   │
│   │   ├── shared/                  # Componentes reutilizáveis
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   └── charts/
│   │   │   └── directives/
│   │   │
│   │   ├── app.routes.ts            # Configuração de rotas
│   │   ├── app.component.ts         # Component raiz
│   │   └── app.component.scss
│   │
│   ├── assets/
│   │   ├── data/
│   │   │   ├── pdi.json
│   │   │   ├── projetos.json
│   │   │   ├── skills.json
│   │   │   └── evolucao.json
│   │   └── icons/
│   │
│   ├── styles.scss                  # Estilos globais + Design System
│   └── main.ts
│
├── angular.json
├── tsconfig.json
├── tailwind.config.js
├── package.json
├── .gitignore
├── README.md
├── AGENTS.md
└── ...
```

---

## 🌐 Acesse Online

### 🔗 Links Importantes

| Recurso            | Link                                                       | Descrição                  |
| ------------------ | ---------------------------------------------------------- | -------------------------- |
| 🌍 **Website PDI** | [pdi-frontend.vercel.app](https://pdi-frontend.vercel.app) | Seu PDI interativo ao vivo |
| 💼 **LinkedIn**    | [linkedin.com/in/elizabetesousafabri](#)                   | Conecte-se comigo          |
| 🐙 **GitHub**      | [github.com/liza/pdi-frontend](#)                          | Repositório do projeto     |
| 📄 **Currículo**   | [CV Online](#)                                             | Currículo atualizado       |
| 📌 **Notion**      | [Documentação completa](#)                                 | Notas e planejamento       |

---

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (vem com Node)
- **Git** ([Download](https://git-scm.com/))

### Instalação Local

```bash
# 1. Clonar repositório
git clone https://github.com/liza/pdi-frontend.git
cd pdi-frontend

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm start
# ou
ng serve

# 4. Abrir no navegador
# http://localhost:4200/
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Output: dist/pdi-frontend/browser/
# Pronto para deploy em Vercel, AWS, etc.
```

### Enviar e Fazer Deploy

```bash
git status
git add .
git commit -m "feat: descreva sua mudança"
git push origin main
```

Se o projeto estiver conectado à Vercel pelo Git, o push já dispara o deploy automático.

Deploy manual pela CLI:

```bash
npx vercel
npx vercel --prod
```

Para validar localmente antes de enviar:

```bash
npm run build
```

### Testes Unitários e Cobertura

```bash
# Executar testes unitários
npm test

# Gerar cobertura de testes (pasta ./coverage)
npm run test:coverage
```

---

## 📊 Seções do Website

### 1. **Dashboard** 📊

- **KPI Cards:** Projetos, Skills, Progresso, Evolução
- **Evolution Chart:** Gráfico interativo de evolução ao longo do tempo
- **Quick Stats:** Visão geral do PDI

### 2. **Skills & Competências** ⚡

- **Skill Cards:** Nome, categoria, nível (1-10), ícone
- **Progress Bars:** Visualização do domínio
- **Categorias:** Frontend, Backend, Cloud, Languages, etc.

### 3. **Meus Projetos** 🚀

- **Project Cards:** Nome, descrição, tecnologias, datas
- **Impacto:** Usuários afetados, performance, ROI
- **Desafios & Aprendizados:** Contexto técnico
- **Status:** Completed, In Progress, Planned

### 4. **Roadmap** 📈

- **Timeline Visual:** Fases trimestrais de evolução
- **Objetivos:** Metas por período
- **Status Badges:** Completed ✓ | In Progress ⚡ | Planned 📋
- **Animações:** Pulse effect no fase atual

---

## 📈 Plano de 3 Anos

```
2026 (Ano 1) - Fundações
├─ Q2: Consolidar fundamentos + Primeira mentoría
├─ Q3: Arquitetura & Decisões técnicas
└─ Q4: AWS & Performance

2027 (Ano 2) - Liderança
├─ Q1: Certificação AWS
├─ Q2: Mentoría de juniores
└─ Q3-Q4: Decisões estratégicas

2028 (Ano 3) - Sênior Full
├─ Liderança técnica de múltiplos times
├─ Arquiteto de sistemas
└─ Mentor experiente
```

---

## 💻 Componentes Principais

### Design System

**Cores:**

```
Primária (Laranja):    #ec6a2a - Ação, destaque
Secundária (Amarelo):  #f7c25e - Aviso, importante
Terciária (Azul):      #5e9ff7 - Informação, link
Background:            #0a0a0f - Escuro, elegante
Status Success:        #4ecb8d - Verde
Status Error:          #f06a7a - Vermelho
```

**Tipografia:**

```
Display:  'Syne' (bold, design-forward) - Títulos
Body:     'DM Sans' (readable, clean) - Textos
Mono:     'DM Mono' (code, data) - Código/números
```

### Componentes Reutilizáveis

- **Header:** Navegação principal sticky
- **Footer:** Links e informações de contacto
- **KPI Card:** Métrica com ícone e valor
- **Skill Card:** Skill com progress bar
- **Project Card:** Projeto com tecnologias
- **Timeline Item:** Fase do roadmap
- **Evolution Chart:** Gráfico ECharts customizado

---

## 🎨 Sugestões de Logos & Ícones

### Opção 1: Monograma "L"

```
Um "L" moderno em gradiente (laranja → amarelo)
Estilo: Minimalista, tech-forward
Uso: Logo principal, favicon
```

### Opção 2: Seta Ascendente

```
Seta ↗ em gradiente com "PDI"
Estilo: Growth-focused, motivacional
Uso: Hero image, badge
```

### Opção 3: Gráfico Ascendente

```
Linha crescente com pontos de progresso
Estilo: Data-driven, profissional
Uso: Dashboard, header
```

### Opção 4: Combinado (Recomendado)

```
- Logo: Monograma "L"
- Favicon: Seta ↗
- Header: "PDI" + Monograma
- Badge: Gráfico ascendente
```

---

## 📊 Resumo do Desenvolvimento

### 📅 Timeline (17 dias)

| Fase                  | Dias  | Status |
| --------------------- | ----- | ------ |
| 🏗️ Setup & Estrutura  | 1-2   | ✅     |
| 🎨 Design System      | 3-4   | ✅     |
| 📊 Dashboard          | 5-6   | ✅     |
| ⚡ Skills             | 7-8   | ✅     |
| 🚀 Projetos           | 9-10  | ✅     |
| 📈 Roadmap            | 11-12 | ✅     |
| ✨ Polish & Animações | 13-14 | ✅     |
| 🧪 Testing            | 15    | ✅     |
| 🚀 Deploy Vercel      | 16    | ✅     |
| 📝 Documentação       | 17-18 | ✅     |

---

## 📚 Documentação

### Documentos Principais

1. **[AGENTS.md](./AGENTS.md)** - Guia completo de construção
2. **[01-angular-boilerplate.md](./01-angular-boilerplate.md)** - Setup Angular v17
3. **[02-componentes-tailwind.md](./02-componentes-tailwind.md)** - Componentes prontos
4. **[03-mock-data.md](./03-mock-data.md)** - Models e dados JSON
5. **[04-guia-implementacao.md](./04-guia-implementacao.md)** - Passo a passo

### Quick Links

- 📖 [Angular Docs](https://angular.io/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 📉 [ECharts](https://echarts.apache.org/)
- 🚀 [Vercel](https://vercel.com/)

---

## 🔄 Fluxo de Desenvolvimento

```
Feature Development:
  git checkout -b feature/nova-feature
  npm run start
  # ... desenvolvimento
  git commit -m "feat: descrição da feature"
  git push origin feature/nova-feature
  # Pull Request → Vercel Preview → Merge → Deploy Automático

Branches:
  main      → Production (ao vivo)
  develop   → Staging (testes)
  feature/* → Desenvolvimento (features)
```

---

## 🤝 Contribute & Feedback

### Feedback para Melhorias

Se seu chefe ou mentores sugerirem melhorias:

1. Abra uma issue com o feedback
2. Crie uma branch `improvement/descricao`
3. Implemente e teste localmente
4. Faça commit com mensagem clara
5. Push e crie PR

### Exemplos de Melhorias Futuras

- [ ] Adicionar seção de "Mentorias"
- [ ] Integrar com GitHub para commits/contributions
- [ ] Dark mode toggle (já tem, mas pode melhorar)
- [ ] Versão PDF do PDI para download
- [ ] Integração com LinkedIn API
- [ ] Comments/feedback dos mentores
- [ ] Charts em tempo real
- [ ] Blog de aprendizados

---

## 📞 Contacto & Redes

### 💼 Profissional

| Canal           | Link/Email                    | Descrição                  |
| --------------- | ----------------------------- | -------------------------- |
| 📧 **Email**    | elizabetesousafabri@gmail.com | Contacto principal         |
| 💼 **LinkedIn** | [linkedin.com/in/...](#)      | Atualizações profissionais |
| 🐙 **GitHub**   | [github.com/liza](#)          | Código e projetos          |
| 🌐 **Website**  | [seu-site.com](#)             | Portfolio geral            |
| 📌 **Notion**   | [seu-notion.so](#)            | Documentação pessoal       |

---

## 📄 License

Este projeto está sob a licença **MIT**.

```
MIT License
Copyright (c) 2026 Liza
```

---

## 🎉 Agradecimentos

Construído com:

- ❤️ Dedicação e foco
- 🧠 Aprendizado contínuo
- 👥 Suporte do time
- 💡 Mentoría e feedback

---

<div align="center">

### 🚀 Pronto para Sênior!

**Last Updated:** Maio 2026  
**Next Review:** Junho 2026

[⬆ Voltar ao topo](#-my-pdi---plano-de-desenvolvimento-individual)

</div>
