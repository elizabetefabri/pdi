# PDI — Mapa de Componentes

> Angular 21 · Standalone Components · SSR (Express) · Taiga UI v5

---

## 1. Hierarquia de Componentes

```mermaid
graph TD
    MAIN["main.ts\nbootstrapApplication"]
    APP["App\napp.ts\nRouterOutlet"]
    DASH["DashboardComponent\n/dashboard"]

    SHARED_HEADER["HeaderComponent\nshared/components/header"]

    SC["SectionLabelComponent\n@Input text"]
    DC["DiagnosticCardComponent\n@Input card: DiagnosticCardData"]
    PB["PhaseBlockComponent\n@Input phase: PhaseData"]
    CC["CertCardComponent\n@Input cert: CertificationData"]
    DT["DeliveriesTableComponent\n@Input rows: DeliveryRowData[]"]
    PC["PositionCardComponent\n@Input card: PositionCardData"]
    FC["FooterComponent"]

    MAIN --> APP
    APP --> DASH
    DASH --> SHARED_HEADER
    DASH --> SC
    DASH --> DC
    DASH --> PB
    DASH --> CC
    DASH --> DT
    DASH --> PC
    DASH --> FC

    style MAIN fill:#2a2a2a,color:#fff,stroke:#ec6a2a
    style APP fill:#1a1a1a,color:#fff,stroke:#ec6a2a
    style DASH fill:#ec6a2a,color:#fff,stroke:#d95a1a
    style SHARED_HEADER fill:#3b82f6,color:#fff,stroke:#2563eb
    style SC fill:#2a2a2a,color:#d0d0d0,stroke:#555
    style DC fill:#2a2a2a,color:#d0d0d0,stroke:#555
    style PB fill:#2a2a2a,color:#d0d0d0,stroke:#555
    style CC fill:#2a2a2a,color:#d0d0d0,stroke:#555
    style DT fill:#2a2a2a,color:#d0d0d0,stroke:#555
    style PC fill:#2a2a2a,color:#d0d0d0,stroke:#555
    style FC fill:#2a2a2a,color:#d0d0d0,stroke:#555
```

---

## 2. Fluxo de Dados

```mermaid
flowchart LR
    subgraph DASH["DashboardComponent (dono dos dados)"]
        D1["diagnosticCards[ ]"]
        D2["phases[ ]"]
        D3["certifications[ ]"]
        D4["deliveries[ ]"]
        D5["positionCards[ ]"]
    end

    subgraph MODEL["dashboard.model.ts"]
        M1["DiagnosticCardData"]
        M2["PhaseData\nPhaseCardData\nPhaseListItem"]
        M3["CertificationData"]
        M4["DeliveryRowData"]
        M5["PositionCardData"]
        M6["ColorTone\n'default'|'green'|'blue'\n'red'|'purple'|'yellow'"]
    end

    subgraph CHILDREN["Componentes Filhos"]
        C1["DiagnosticCardComponent\n×3"]
        C2["PhaseBlockComponent\n×4"]
        C3["CertCardComponent\n×6"]
        C4["DeliveriesTableComponent\n×1"]
        C5["PositionCardComponent\n×4"]
    end

    M1 --> D1 --> C1
    M2 --> D2 --> C2
    M3 --> D3 --> C3
    M4 --> D4 --> C4
    M5 --> D5 --> C5
    M6 -.->|tipagem| M1 & M2 & M3 & M4

    style DASH fill:#1a1a1a,color:#fff,stroke:#ec6a2a
    style MODEL fill:#0f0f0f,color:#999,stroke:#444
    style CHILDREN fill:#1a1a1a,color:#d0d0d0,stroke:#555
```

---

## 3. Arquitetura Completa

```mermaid
graph TB
    subgraph INFRA["Infraestrutura"]
        direction LR
        BROWSER["Browser\nmain.ts"]
        SERVER["SSR / Express\nserver.ts · porta 4000"]
        PRERENDER["Prerender\nRenderMode.Prerender"]
    end

    subgraph CONFIG["Configuração Angular"]
        AC["app.config.ts\nprovideRouter\nprovideAnimations\nprovideHttpClient\nprovideClientHydration"]
        ACS["app.config.server.ts\nprovideServerRendering"]
        AR["app.routes.ts\n'' → /dashboard (lazy-load)"]
        ARS["app.routes.server.ts\nServer Routes"]
    end

    subgraph SHARED["Camada Compartilhada"]
        H["HeaderComponent\nTuiChip"]
    end

    subgraph FEATURE["Feature: Dashboard"]
        direction TB
        DCOMP["DashboardComponent\ndono dos dados"]

        subgraph COMPONENTS["Sub-componentes"]
            SL["SectionLabel"]
            DIAGC["DiagnosticCard\nTuiAppearance"]
            PHASE["PhaseBlock\nTuiAppearance · TuiChip"]
            CERT["CertCard\nTuiAppearance · TuiBadge"]
            DELIV["DeliveriesTable\nTuiBadge"]
            POS["PositionCard\nTuiAppearance"]
            FOOT["Footer"]
        end

        subgraph MODEL2["Camada de Modelos"]
            DM["dashboard.model.ts\nColorTone · DiagnosticCardData\nPhaseData · CertificationData\nDeliveryRowData · PositionCardData"]
        end

        DCOMP --> COMPONENTS
        MODEL2 --> DCOMP
    end

    subgraph DESIGN["Sistema de Design"]
        CSS["styles.scss\n--color-primary: #ec6a2a\n--color-bg-primary: #0f0f0f\n--font-family-display: Syne\n--font-family-mono: DM Mono"]
        TUI["Taiga UI v5\nTuiAppearance · TuiChip\nTuiBadge · TuiIcons"]
    end

    BROWSER --> AC
    SERVER --> ACS
    ARS --> PRERENDER
    AC --> AR
    AR --> FEATURE
    SHARED --> FEATURE
    DESIGN --> FEATURE

    style INFRA fill:#0f0f0f,color:#999,stroke:#333
    style CONFIG fill:#1a1a1a,color:#d0d0d0,stroke:#444
    style SHARED fill:#1e3a5f,color:#fff,stroke:#3b82f6
    style FEATURE fill:#2a1a0f,color:#fff,stroke:#ec6a2a
    style COMPONENTS fill:#1a1a1a,color:#d0d0d0,stroke:#555
    style MODEL2 fill:#0f0f0f,color:#999,stroke:#444
    style DESIGN fill:#1a0f2a,color:#d0d0d0,stroke:#8b5cf6
```

---

## 4. Imports do Taiga UI por Componente

```mermaid
graph LR
    TUI_APP["TuiAppearance\n@taiga-ui/core"]
    TUI_CHIP["TuiChip\n@taiga-ui/kit"]
    TUI_BADGE["TuiBadge\n@taiga-ui/kit"]
    COMMON["CommonModule\n@angular/common"]
    INPUT_SIG["input signal\n@angular/core"]

    DASH_C["DashboardComponent"] --> COMMON
    HEADER["HeaderComponent"] --> COMMON & TUI_CHIP
    DIAG["DiagnosticCardComponent"] --> COMMON & TUI_APP & INPUT_SIG
    PHASE["PhaseBlockComponent"] --> COMMON & TUI_APP & TUI_CHIP & INPUT_SIG
    CERT["CertCardComponent"] --> COMMON & TUI_APP & TUI_BADGE & INPUT_SIG
    DELIV["DeliveriesTableComponent"] --> COMMON & TUI_BADGE & INPUT_SIG
    POS["PositionCardComponent"] --> COMMON & TUI_APP & INPUT_SIG
    SL["SectionLabelComponent"] --> INPUT_SIG

    style TUI_APP fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style TUI_CHIP fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style TUI_BADGE fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style COMMON fill:#3b82f6,color:#fff,stroke:#2563eb
    style INPUT_SIG fill:#22c55e,color:#fff,stroke:#16a34a
```

---

## 5. Estrutura de Arquivos

```
src/
├── main.ts                          ← entrada browser
├── main.server.ts                   ← entrada SSR
├── server.ts                        ← Express.js (porta 4000)
├── styles.scss                      ← design system / CSS vars
└── app/
    ├── app.ts                       ← componente raiz (RouterOutlet)
    ├── app.routes.ts                ← '' → /dashboard (lazy)
    ├── app.routes.server.ts         ← config prerender SSR
    ├── app.config.ts                ← providers (router, animations, HTTP)
    ├── app.config.server.ts         ← merge providers SSR
    │
    ├── shared/
    │   └── components/
    │       ├── index.ts             ← barrel export
    │       └── header/              ← HeaderComponent
    │
    └── features/
        └── dashboard/
            ├── dashboard.component.ts   ← página / dono dos dados
            ├── models/
            │   └── dashboard.model.ts  ← ColorTone + todas as interfaces
            └── components/
                ├── section-label/       ← @Input text
                ├── diagnostic-card/     ← @Input card: DiagnosticCardData
                ├── phase-block/         ← @Input phase: PhaseData
                ├── cert-card/           ← @Input cert: CertificationData
                ├── deliveries-table/    ← @Input rows: DeliveryRowData[]
                ├── position-card/       ← @Input card: PositionCardData
                └── footer/
```

---

## Resumo das Decisões de Design

| Aspecto | Decisão |
|---|---|
| Arquitetura | Standalone Components (sem NgModules) |
| Roteamento | Lazy-load da feature dashboard |
| Estado | Sem state manager — dados estáticos no `DashboardComponent` |
| API Angular | Input signals (`input.required<T>()`) em todos os filhos |
| UI Library | Taiga UI v5 (`TuiAppearance`, `TuiChip`, `TuiBadge`) |
| Renderização | SSR + Prerender via Angular Universal / Express |
| Design System | CSS Custom Properties centralizadas em `styles.scss` |
| Tipografia | Syne (display) + DM Mono (código) |
| Paleta base | Dark theme — `#0f0f0f` bg · `#ec6a2a` primary |
| Charts | `ngx-echarts` instalado, ainda não utilizado |
