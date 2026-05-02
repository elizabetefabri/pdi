---
titulo: Data Layer — PdiDataService + pdi-dashboard.json
data: 2026-05-02
prioridade: P1
status: implementado
---

# 02 · Data Layer — PdiDataService + pdi-dashboard.json

## Problema

`DashboardComponent` continha ~340 linhas de dados hardcoded (arrays literais), causando:
- Componente com responsabilidade dupla (UI + dados)
- Impossibilidade de testar os dados isoladamente
- Sem caching — dados recalculados a cada change detection

## Solução implementada

### Arquivos criados

**`src/assets/data/pdi-dashboard.json`**
Serialização completa de todos os dados do dashboard:
- 3 diagnostic cards
- 1 focus alert
- 4 phases (cada uma com 2–3 cards de itens)
- 6 certifications
- 12 delivery rows
- 4 position cards

**`src/app/core/models/pdi.model.ts`**
Agrega todas as interfaces em `DashboardData`:
```typescript
export interface DashboardData {
  diagnosticCards: DiagnosticCardData[];
  focusAlert: AlertData;
  phases: PhaseData[];
  certifications: CertificationData[];
  deliveries: DeliveryRowData[];
  positionCards: PositionCardData[];
}
```

**`src/app/core/services/pdi-data.service.ts`**
```typescript
@Injectable({ providedIn: 'root' })
export class PdiDataService {
  private readonly http = inject(HttpClient);
  private readonly cache$ = this.http
    .get<DashboardData>('assets/data/pdi-dashboard.json')
    .pipe(shareReplay(1));

  getDashboardData(): Observable<DashboardData> {
    return this.cache$;
  }
}
```
`shareReplay(1)` garante que múltiplas subscrições não disparam múltiplas requisições HTTP.

### DashboardComponent refatorado

```typescript
export class DashboardComponent {
  private readonly pdiData = inject(PdiDataService);
  readonly data = toSignal(this.pdiData.getDashboardData());
}
```

Template usa `@if (data(); as d)` para acesso type-safe ao sinal.

## Benefícios

- Componente reduzido de ~380 para 15 linhas
- Dados podem ser substituídos por API real sem alterar componentes
- `shareReplay(1)` evita re-fetch em navegações
- `toSignal()` integra Observable com sistema de signals sem `async` pipe
