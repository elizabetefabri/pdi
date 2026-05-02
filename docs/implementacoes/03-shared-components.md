---
titulo: Shared Components — Footer e EvolutionChartComponent
data: 2026-05-02
prioridade: P1
status: implementado
---

# 03 · Shared Components — Footer e EvolutionChartComponent

## FooterComponent movido para shared

### Problema
`FooterComponent` estava em `features/dashboard/components/footer/` com seletor
`app-dashboard-footer`. Componentes de layout (header, footer) pertencem ao módulo
`shared`, não a uma feature específica.

### Solução

Criado em `src/app/shared/components/footer/`:
- Seletor alterado para `app-footer`
- Exportado pelo barrel `shared/components/index.ts`
- `DashboardComponent` atualizado para importar da nova localização
- Template atualizado: `<app-dashboard-footer>` → `<app-footer>`

O diretório original `features/dashboard/components/footer/` permanece (não deletado)
até refatoração futura — evita risco de quebrar referências não mapeadas.

## EvolutionChartComponent

### Localização
`src/app/shared/components/charts/evolution-chart.component.ts`

### API

```typescript
// Inputs
readonly title = input<string>('Evolução');
readonly data  = input.required<EvolutionPoint[]>();

// Tipo de dado
export interface EvolutionPoint {
  month: string;
  value: number; // 0–100
}
```

### Uso
```html
<app-evolution-chart
  title="Progresso técnico"
  [data]="evolutionPoints"
/>
```

### Características

- Usa `NgxEchartsDirective` (API standalone do ngx-echarts v21)
- Todas as cores via CSS custom properties do projeto (`--color-primary`, `--color-border`, `--color-text-muted`)
- Linha suavizada com área semi-transparente
- Eixo Y fixo 0–100 (porcentagem de progresso)
- Grid responsivo via CSS (`height: 200px; width: 100%`)

### Integração com provideEchartsCore

Requer que `app.config.ts` tenha:
```typescript
provideEchartsCore({ echarts: () => import('echarts') })
```
Lazy load do bundle echarts (~1MB) — carregado apenas quando o componente é usado.
