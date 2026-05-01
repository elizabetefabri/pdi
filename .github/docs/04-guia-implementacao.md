# 04 - Guia de Implementação Passo a Passo

**Objetivo:** Implementar tudo do zero até deploy em 17 dias.

**Prazo:** Até 18/05/2026

---

## 📅 Timeline por Dia

### **Dia 1-2: Setup & Estrutura** ✅

```bash
# Dia 1 - Manhã: Ambiente
npm create angular@latest pdi-frontend -- --standalone --routing --skip-git
cd pdi-frontend
npm install echarts framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Dia 1 - Tarde: Estrutura
mkdir -p src/app/{core/{services,models},features/{dashboard,skills,projetos,roadmap},shared/components/{header,footer,charts}}
mkdir -p src/assets/{data,icons}

# Dia 2 - Manhã: Componentes base
ng generate component shared/components/header --skip-tests
ng generate component shared/components/footer --skip-tests
ng generate component shared/components/charts/evolution-chart --skip-tests
ng generate component features/dashboard --skip-tests
ng generate component features/skills --skip-tests
ng generate component features/projetos --skip-tests
ng generate component features/roadmap --skip-tests

# Dia 2 - Tarde: Services
ng generate service core/services/pdi --skip-tests
ng generate service core/services/projetos --skip-tests
ng generate service core/services/skills --skip-tests
ng generate service core/services/evolucao --skip-tests
ng generate interface core/models/pdi
ng generate interface core/models/projeto
ng generate interface core/models/skill
ng generate interface core/models/evolucao

# Dia 2 - Fim do dia
ng serve
# Verificar: http://localhost:4200
git add .
git commit -m "feat: initial setup with components and services"
```

---

### **Dia 3-4: Estilos & Design System** 🎨

#### Dia 3 - Manhã: Global Styles

**Copiar todo conteúdo do `styles.scss` de `01-angular-boilerplate.md` para `src/styles.scss`**

```bash
# Depois
ng serve
# Verificar se estilos globais aplicaram (fundo dark, cores corretas)
```

#### Dia 3 - Tarde: Header & Footer

**Copiar código de `02-componentes-tailwind.md`:**
- `header.component.ts` → `src/app/shared/components/header/header.component.ts`
- `header.component.scss` → `src/app/shared/components/header/header.component.scss`
- `footer.component.ts` → `src/app/shared/components/footer/footer.component.ts`
- `footer.component.scss` → `src/app/shared/components/footer/footer.component.scss`

**Atualizar `app.component.ts`:**
```typescript
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
export class AppComponent {}
```

#### Dia 4 - Manhã: App Routes

**Criar `src/app/app.routes.ts`:**
```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjetosComponent } from './features/projetos/projetos.component';
import { RoadmapComponent } from './features/roadmap/roadmap.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projetos', component: ProjetosComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: '**', redirectTo: '' }
];
```

**Atualizar `main.ts`:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import './styles.scss';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
```

#### Dia 4 - Tarde: Commit

```bash
ng serve
# Verificar: navegação, header, footer, estilos
git add .
git commit -m "feat: add header, footer, routing and global styles"
```

---

### **Dia 5-6: Dashboard com Charts** 📊

#### Dia 5 - Manhã: Criar JSON Data

**`src/assets/data/pdi.json`**
```json
{
  "id": "pdi-2026",
  "nome": "Liza",
  "cargo": "Frontend / Platform Engineer",
  "empresa": "Itaú",
  "nivelAtual": "Pleno",
  "nivelObjetivo": "Sênior",
  "dataInicio": "2026-01-01",
  "dataTermo": "2029-01-01",
  "descricao": "Plano de desenvolvimento de 3 anos",
  "metasPrincipais": [
    "Dominar arquitetura de sistemas",
    "Liderar projetos técnicos críticos",
    "Mentorar outros desenvolvedores"
  ]
}
```

**`src/assets/data/evolucao.json`**
(Copiar de `03-mock-data.md`)

#### Dia 5 - Tarde: Services

**Copiar `pdi.service.ts` e `evolucao.service.ts` de `03-mock-data.md`**

Testar no console:
```typescript
constructor(private pdiService: PdiService) {
  this.pdiService.getPDI().subscribe(data => console.log(data));
}
```

#### Dia 6 - Manhã: Dashboard Component

**Copiar `dashboard.component.ts` e `dashboard.component.scss` de `02-componentes-tailwind.md`**

Integrar serviço:
```typescript
export class DashboardComponent implements OnInit {
  pdi: PDI | null = null;
  evolucao: Evolucao | null = null;
  
  constructor(
    private pdiService: PdiService,
    private evolucaoService: EvolucaoService
  ) {}
  
  ngOnInit() {
    this.pdiService.getPDI().subscribe(data => this.pdi = data);
    this.evolucaoService.getEvolucao().subscribe(data => this.evolucao = data);
  }
}
```

#### Dia 6 - Tarde: Evolution Chart

**Copiar `evolution-chart.component.ts` de `02-componentes-tailwind.md`**

Integrar ECharts:
```typescript
import * as echarts from 'echarts';

initChart() {
  const chartDom = this.chartContainer.nativeElement;
  const myChart = echarts.init(chartDom);
  // ... resto do código
}
```

#### Dia 6 - Fim: Commit

```bash
ng serve
# Verificar: Dashboard com KPI cards + Chart
git add .
git commit -m "feat: dashboard with KPI cards and evolution chart"
```

---

### **Dia 7-8: Skills Component** ⚡

#### Dia 7 - Manhã: Criar skills.json

**`src/assets/data/skills.json`**
(Copiar de `03-mock-data.md`)

#### Dia 7 - Tarde: Skills Service + Component

**Copiar `skills.service.ts` e `skills.component.ts` de `03-mock-data.md` e `02-componentes-tailwind.md`**

Integrar:
```typescript
export class SkillsComponent implements OnInit {
  skillsList: Skill[] = [];
  
  constructor(private skillsService: SkillsService) {}
  
  ngOnInit() {
    this.skillsService.getSkills().subscribe(data => this.skillsList = data);
  }
}
```

#### Dia 8 - Commit

```bash
ng serve
# Verificar: Skills page com cards e progress bars
git add .
git commit -m "feat: skills page with progress bars"
```

---

### **Dia 9-10: Projetos Component** 🚀

#### Dia 9 - Manhã: Criar projetos.json

**`src/assets/data/projetos.json`**
(Copiar de `03-mock-data.md`)

**IMPORTANTE: Preencher com seus dados reais!**

#### Dia 9 - Tarde: Projetos Service + Component

**Copiar `projetos.service.ts` e `projetos.component.ts`**

#### Dia 10 - Manhã: Modal/Detalhes (Opcional)

Se quiser, adicionar modal com detalhes de cada projeto.

#### Dia 10 - Tarde: Commit

```bash
ng serve
# Verificar: Projetos page com cards
git add .
git commit -m "feat: projetos page with detailed cards"
```

---

### **Dia 11-12: Roadmap Timeline** 📈

#### Dia 11 - Manhã: Roadmap Component

**Copiar `roadmap.component.ts` de `02-componentes-tailwind.md`**

Dados hardcoded:
```typescript
phases: RoadmapPhase[] = [
  {
    period: 'Q2 2026',
    title: 'Fundações',
    goals: ['Dominar padrões avançados', 'Primeira mentoría'],
    status: 'in-progress'
  },
  // ... mais fases
];
```

#### Dia 11 - Tarde: Estilos & Animações

Copiar `roadmap.component.scss` com timeline visual.

#### Dia 12 - Manhã: Keyframe Animation

Adicionar animação `pulse` ao roadmap:
```scss
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(236, 106, 42, 0.7); }
  50% { box-shadow: 0 0 0 8px rgba(236, 106, 42, 0); }
}
```

#### Dia 12 - Tarde: Commit

```bash
ng serve
# Verificar: Roadmap com timeline bonita
git add .
git commit -m "feat: roadmap timeline with animations"
```

---

### **Dia 13-14: Framer Motion & Polish** ✨

#### Dia 13 - Manhã: Page Transitions

**Adicionar ao app.component.ts:**
```typescript
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  // ...
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
```

#### Dia 13 - Tarde: Card Hover Effects

**Atualizar scss dos cards:**
```scss
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(236, 106, 42, 0.2);
  transition: all 300ms ease;
}
```

#### Dia 14 - Manhã: Scroll Animations

**Criar directive para fade-in ao scroll:**
```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFadeInOnScroll]',
  standalone: true
})
export class FadeInOnScrollDirective implements OnInit {
  constructor(el: ElementRef) {
    el.nativeElement.classList.add('fade-in');
  }
  
  ngOnInit() {
    // Observer implementação
  }
}
```

#### Dia 14 - Tarde: Commit

```bash
ng serve
# Verificar: Animações suaves, transições legais
git add .
git commit -m "feat: add animations and polish"
```

---

### **Dia 15: Testing & Otimização** 🧪

#### Dia 15 - Manhã: Build Otimizado

```bash
ng build --configuration production --optimization

# Verificar tamanho
ls -lh dist/pdi-frontend/browser/
```

Objetivo: < 500KB bundle.

#### Dia 15 - Tarde: Lighthouse Audit

```bash
ng build
npm install -g lighthouse
lighthouse http://localhost:4200 --chrome-flags="--headless"
```

Metas:
- Performance: > 90
- SEO: > 90
- Best Practices: > 90

---

### **Dia 16: Deploy em Vercel** 🚀

#### Setup Vercel

```bash
npm install -g vercel
vercel login
vercel
```

#### Seguir prompts:
1. Projeto Angular
2. Framework: Angular
3. Root directory: `.`
4. Build command: `npm run build`
5. Output directory: `dist/pdi-frontend/browser`

**Resultado:** URL pública para compartilhar!

---

### **Dia 17-18: Documentação & Finalizações** 📝

#### Dia 17 - Manhã: README.md

(Ver documento final do README)

#### Dia 17 - Tarde: AGENTS.md atualizado

Atualizar com links reais, screenshots, etc.

#### Dia 18 - Final Commits

```bash
git add .
git commit -m "docs: update README and AGENTS with final status"
git log --oneline
# Ver todos os commits
```

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Projeto Angular criado
- [ ] Componentes gerados
- [ ] Rotas configuradas
- [ ] Estilos globais aplicados

### Features
- [ ] Dashboard com KPIs + Chart
- [ ] Skills com progress bars
- [ ] Projetos com cards
- [ ] Roadmap com timeline

### Polish
- [ ] Animações suaves
- [ ] Responsive design
- [ ] Performance otimizada
- [ ] Lighthouse > 90

### Deploy
- [ ] Build production pronto
- [ ] Vercel conectado
- [ ] URL pública funcionando
- [ ] README atualizado

---

## 🔧 Troubleshooting

### "Cannot find module 'echarts'"
```bash
npm install echarts
```

### "Tailwind CSS não funciona"
```bash
# Verificar tailwind.config.js
# Verificar importação em styles.scss
# Limpar cache
rm -rf node_modules
npm install
```

### "HttpClient não funciona"
```typescript
// main.ts
providers: [provideHttpClient()]
```

### "Rotas não funcionam"
```typescript
// main.ts
providers: [provideRouter(routes)]
```

---

## 📚 Recursos Úteis

- [Angular Docs](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [ECharts](https://echarts.apache.org/)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎯 Próximos Passos Após Launch

1. **Feedback Loop:** Enviar para chefe, coletar feedback
2. **Iterações:** Melhorias baseadas em feedback
3. **Manutenção:** Atualizar dados de projetos regularmente
4. **Analytics:** Adicionar Google Analytics
5. **CV Integration:** Conectar com seu CV online

---

**Topzera? Você consegue! 🚀**
