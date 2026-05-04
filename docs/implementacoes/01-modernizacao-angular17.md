---
titulo: Modernização Angular 17+ — Remoção de CommonModule
data: 2026-05-02
prioridade: P1
status: implementado
---

# 01 · Modernização Angular 17+ — Remoção de CommonModule

## Problema

Todos os componentes standalone usavam `CommonModule` no array `imports`, o que:
- Importa ~30 diretivas desnecessárias em cada componente
- Bloqueia o tree-shaking do bundler
- Usa `*ngFor` / `*ngIf` (sintaxe legada desde Angular 17)
- Usa `[ngClass]` como binding dinâmico (deprecado em favor de `[class]`)

## Solução implementada

### Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `header/header.component.ts` | Remove `CommonModule`; `@for` no template |
| `diagnostic-card/diagnostic-card.component.ts` | Remove `CommonModule` |
| `phase-block/phase-block.component.ts` | Remove `CommonModule` |
| `cert-card/cert-card.component.ts` | Remove `CommonModule` |
| `deliveries-table/deliveries-table.component.ts` | Remove `CommonModule` |
| `position-card/position-card.component.ts` | Remove `CommonModule` |
| `dashboard.component.ts` | Remove `CommonModule` |

### Padrão aplicado

**Antes:**
```typescript
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TuiChip],
})
```

**Depois:**
```typescript
@Component({
  imports: [TuiChip],  // apenas o que é usado
})
```

**Template — antes:**
```html
<div *ngFor="let item of items" [ngClass]="item.tone">
```

**Template — depois:**
```html
@for (item of items; track item.id) {
  <div [class]="item.tone">
}
```

## Benefícios

- Bundles menores (tree-shaking efetivo)
- Compilação incremental mais rápida
- Alinhado com Angular 17+ best practices
- `[class]` binding é mais explícito e performático que `[ngClass]` para valores simples
