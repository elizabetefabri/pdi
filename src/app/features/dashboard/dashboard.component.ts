import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SectionLabelComponent } from './components/section-label/section-label.component';
import { DiagnosticCardComponent } from './components/diagnostic-card/diagnostic-card.component';
import { PhaseBlockComponent } from './components/phase-block/phase-block.component';
import { CertCardComponent } from './components/cert-card/cert-card.component';
import { DeliveriesTableComponent } from './components/deliveries-table/deliveries-table.component';
import { PositionCardComponent } from './components/position-card/position-card.component';
import {
  AlertData,
  CertificationData,
  DeliveryRowData,
  DiagnosticCardData,
  PhaseData,
  PositionCardData,
} from './models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SectionLabelComponent,
    DiagnosticCardComponent,
    PhaseBlockComponent,
    CertCardComponent,
    DeliveriesTableComponent,
    PositionCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly diagnosticCards: DiagnosticCardData[] = [
    {
      title: '✦ Forcas reais',
      tone: 'green',
      items: [
        '2-3 anos de experiencia ativa como dev',
        'Stack back-end diversificada: Go, Node.js, Python',
        'Exposicao front Angular em producao (banco)',
        'SQL / queries no dia a dia',
        'On-call via ServiceNow (maturidade operacional)',
        'Projeto pessoal relevante: Rollout Service (Go + Mongo + Hexagonal)',
      ],
    },
    {
      title: '⚠ Gaps criticos para pleno',
      tone: 'red',
      items: [
        'Sem especializacao definida ainda (full stack amplo = risco de ser mediano em tudo)',
        'Dados alem de SQL: pipelines, streaming, data mesh ainda conceitual',
        'Observabilidade / Datadog ainda nao consolidado',
        'Arquitetura de software: dominio parcial (hexagonal no projeto, mas nao em prod)',
        'Sem certificacao de mercado',
      ],
    },
    {
      title: '◈ Contexto Itau',
      tone: 'blue',
      items: [
        'Banco grande = valoriza especializacao + impacto mensuravel',
        'ENG FOUNDATION: area de plataforma - back-end solido e pre-requisito',
        'Iniciativa RT DJ (Developer Journey): visibilidade real na area',
        '1:1 com tech lead: usar para alinhar expectativas de promocao diretamente',
      ],
    },
  ];

  readonly focusAlert: AlertData = {
    title: 'analise de redundancia no objetivo',
    body: 'Voce mencionou querer se especializar em data mesh + Datadog, mas definiu como prioridade maxima arquitetura de back-end solido. Isso nao e redundancia, e uma sequencia logica: nao da para operar bem em data mesh ou observabilidade sem fundacao de back-end primeiro. O plano abaixo resolve isso com foco em fases progressivas.',
  };

  readonly phases: PhaseData[] = [
    {
      period: '0-3 meses',
      tone: 'default',
      title: 'Fundacao: Back-end Solido + Visibilidade',
      cards: [
        {
          label: 'foco tecnico',
          items: [
            { tag: 'Go', text: 'Aprofundar hexagonal architecture em prod (Rollout Service como laboratorio)' },
            { tag: 'Go', text: 'Dominar testes unitarios + integracao em Go' },
            { tag: 'Design', text: 'Patterns: SOLID, Clean Architecture, DDD basico' },
            { tag: 'API', text: 'REST design avancado: versionamento, contratos, erros padronizados' },
            { tag: 'SQL', text: 'Evoluir SQL: indices, explain plan, performance queries' },
          ],
        },
        {
          label: 'entregas concretas',
          items: [
            { tag: 'Projeto', tagTone: 'green', text: 'Completar fases 3.3+ do Rollout Service (Release Train Service)' },
            { tag: 'Doc', tagTone: 'green', text: 'Documentar arquitetura no Notion com ADRs (Architecture Decision Records)' },
            { tag: 'Visib.', tagTone: 'green', text: 'Apresentar o Rollout Service ou iniciativa DJ ao tech lead / squad' },
            { tag: '1:1', tagTone: 'green', text: 'Conversa direta com gestor: o que falta para eu ser pleno em 6 meses?' },
          ],
        },
        {
          label: 'estudo semanal (5-10h)',
          items: [
            { tag: 'Livro', tagTone: 'blue', text: 'Clean Architecture - Robert C. Martin (1-2 caps/semana)' },
            { tag: 'Curso', tagTone: 'blue', text: 'Go avancado - Udemy / Alura (Itau pode subsidiar)' },
            { tag: 'Pratica', tagTone: 'blue', text: 'Refatorar 1 modulo do Rollout por semana aplicando principios' },
          ],
        },
      ],
    },
    {
      period: '3-6 meses',
      tone: 'green',
      title: 'Pleno: Consolidacao + Observabilidade + Certificacao',
      cards: [
        {
          label: 'foco tecnico',
          items: [
            { tag: 'Obs.', text: 'Datadog: logs estruturados, APM, traces distribuidos, alertas' },
            { tag: 'Cloud', text: 'AWS fundamentals: ECS, CloudWatch, IAM, S3 (ja no contexto do Rollout)' },
            { tag: 'Back', text: 'Message queues basico: conceitos de Kafka/SQS para integracoes' },
            { tag: 'Front', text: 'Angular: manter competencia, nao evoluir - tempo minimo necessario' },
          ],
        },
        {
          label: 'entregas concretas',
          items: [
            { tag: 'Prod', tagTone: 'green', text: 'Instrumentar Rollout Service com Datadog APM em ambiente de dev' },
            { tag: 'Cert', tagTone: 'green', text: 'Tirar AWS Cloud Practitioner (base para proximas)' },
            { tag: 'Promocao', tagTone: 'green', text: 'Apresentar case tecnico ao gestor: impacto do Rollout + DJ + certs' },
            { tag: 'Mentoria', tagTone: 'green', text: 'Documentar aprendizados e comecar a ajudar devs mais novos' },
          ],
        },
        {
          label: 'estudo semanal (5-10h)',
          items: [
            { tag: 'Cert', tagTone: 'blue', text: 'AWS Cloud Practitioner - 4-6 semanas de estudo focado' },
            { tag: 'Docs', tagTone: 'blue', text: 'Datadog docs oficiais + playground gratuito (trial 14 dias)' },
            { tag: 'Itau', tagTone: 'blue', text: 'Trilhas internas de cloud/observabilidade (verificar com gestor)' },
          ],
        },
      ],
    },
    {
      period: '6-12 meses (pos-pleno)',
      tone: 'blue',
      title: 'Especializacao: Dados + Plataforma',
      cards: [
        {
          label: 'foco tecnico',
          items: [
            { tag: 'Dados', text: 'Data Mesh: conceitos, data products, data contracts' },
            { tag: 'Dados', text: 'Pipelines: dbt, Apache Kafka, Spark basico ou Flink' },
            { tag: 'Python', text: 'Pandas, Pydantic, FastAPI para data APIs' },
            { tag: 'AWS', text: 'AWS Solutions Architect Associate: infra completa' },
            { tag: 'Obs.', text: 'Datadog avancado: custom metrics, SLOs, dashboards de negocio' },
          ],
        },
        {
          label: 'entregas concretas',
          items: [
            { tag: 'Projeto', tagTone: 'blue', text: 'Propor (ou participar de) solucao de data product no Itau' },
            { tag: 'Cert', tagTone: 'blue', text: 'AWS Solutions Architect Associate' },
            { tag: 'Tech', tagTone: 'blue', text: 'Tech talk interno: apresentar data mesh ou observabilidade para o time' },
            { tag: 'RT DJ', tagTone: 'blue', text: 'Evoluir iniciativa DJ com metricas de developer experience' },
          ],
        },
        {
          label: 'estudo semanal (5-10h)',
          items: [
            { tag: 'Livro', tagTone: 'blue', text: 'Designing Data-Intensive Applications - M. Kleppmann' },
            { tag: 'Curso', tagTone: 'blue', text: 'Data Mesh course (data.world ou Udemy)' },
            { tag: 'Pratica', tagTone: 'blue', text: 'Side project: pipeline simples com Kafka + Python + Datadog' },
          ],
        },
      ],
    },
    {
      period: '12-24 meses',
      tone: 'purple',
      title: 'Senior Horizonte: Referencia Tecnica',
      cards: [
        {
          label: 'foco tecnico',
          items: [
            { tag: 'Arq.', tagTone: 'purple', text: 'System design: escalabilidade, tolerancia a falhas, trade-offs' },
            { tag: 'Dados', tagTone: 'purple', text: 'Governanca de dados, data lineage, data quality em escala' },
            { tag: 'Lider.', tagTone: 'purple', text: 'Tech leadership: code review estrategico, RFCs, decisoes de arquitetura' },
            { tag: 'Plat.', tagTone: 'purple', text: 'Platform engineering: developer portals, Internal Developer Platform' },
          ],
        },
        {
          label: 'entregas concretas',
          items: [
            { tag: 'Cert', tagTone: 'purple', text: 'AWS Data Analytics Specialty ou Datadog Fundamentals (oficial)' },
            { tag: 'Impacto', tagTone: 'purple', text: 'Liderar tech de um modulo critico do time' },
            { tag: 'Ext.', tagTone: 'purple', text: 'Publicar artigo tecnico (Medium, dev.to, LinkedIn)' },
            { tag: 'Mentoria', tagTone: 'purple', text: 'Ser referencia tecnica para juniores da equipe' },
          ],
        },
      ],
    },
  ];

  readonly certifications: CertificationData[] = [
    {
      name: 'AWS Cloud Practitioner',
      badge: 'curto',
      description: 'Certificacao de entrada AWS. Cobre conceitos de cloud, principais servicos, seguranca e billing.',
      why: 'Por que agora: voce ja usa ECS, S3, CloudWatch no Rollout Service. Esta cert formaliza e estrutura esse conhecimento. E a base para todas as AWS que vem depois.',
    },
    {
      name: 'Datadog Fundamentals',
      badge: 'curto',
      description: 'Certificacao oficial da Datadog. Cobre APM, logs, traces, dashboards e alertas.',
      why: 'Por que agora: Datadog e parte do seu objetivo e o Itau usa em producao. Esta cert e rapida (20-30h estudo) e gera impacto imediato no trabalho.',
    },
    {
      name: 'AWS Solutions Architect Associate',
      badge: 'medio',
      description: 'Principal cert de arquitetura cloud. Cobre design de sistemas, alta disponibilidade, seguranca e custo.',
      why: 'Por que: diferencial forte para pleno->senior em banco. Valida capacidade de decisao arquitetural em cloud - essencial na ENG FOUNDATION.',
    },
    {
      name: 'MongoDB Associate Developer',
      badge: 'medio',
      description: 'Certificacao oficial MongoDB para desenvolvedores. Cobre modelagem, agregacoes, indices e drivers.',
      why: 'Por que: voce ja usa MongoDB no Rollout Service. Esta cert formaliza e aprofunda o conhecimento que voce ja tem - otimo custo-beneficio de estudo.',
    },
    {
      name: 'AWS Data Analytics Specialty',
      badge: 'longo',
      description: 'Cert avancada de dados na AWS. Cobre Kinesis, Glue, Redshift, Athena e pipelines analiticos.',
      why: 'Por que: alinha diretamente com o objetivo de data mesh e plataforma de dados. Posiciona voce como especialista de dados em nivel senior.',
    },
    {
      name: 'Trilhas internas Itau',
      badge: 'curto',
      description: 'Plataformas como Alura (parceria), trilhas de cloud, seguranca e dados disponiveis internamente.',
      why: 'Por que: validacao interna tem peso em processos de promocao no Itau. Pergunte ao gestor quais trilhas contam como evidencia no PDI oficial.',
    },
  ];

  readonly deliveries: DeliveryRowData[] = [
    {
      period: 'T1 · M1-3',
      periodTone: 't1',
      delivery: 'Completar Release Train Service (fase 3.3 do Rollout)',
      type: 'Projeto',
      expectedImpact: 'Evidencia tecnica de back-end completo em Go',
    },
    {
      period: 'T1 · M1-3',
      periodTone: 't1',
      delivery: 'Documentar arquitetura com ADRs no Notion',
      type: 'Documentacao',
      expectedImpact: 'Habito de senior: decisoes documentadas e rastreaveis',
    },
    {
      period: 'T1 · M1-3',
      periodTone: 't1',
      delivery: '1:1 com gestor: pacto de promocao com criterios claros',
      type: 'Carreira',
      expectedImpact: 'Alinhar expectativas e ter mapa de avaliacao real',
    },
    {
      period: 'T1 · M2-3',
      periodTone: 't1',
      delivery: 'Datadog Fundamentals certification',
      type: 'Certificacao',
      expectedImpact: 'Diferencial imediato + aplicacao no Rollout Service',
    },
    {
      period: 'T2 · M4-6',
      periodTone: 't2',
      delivery: 'AWS Cloud Practitioner aprovado',
      type: 'Certificacao',
      expectedImpact: 'Base para arquitetura cloud + credito em processos internos',
    },
    {
      period: 'T2 · M4-6',
      periodTone: 't2',
      delivery: 'Instrumentar Rollout Service com APM/Datadog',
      type: 'Tecnico',
      expectedImpact: 'Aplicacao pratica de observabilidade em projeto real',
    },
    {
      period: 'T2 · M5-6',
      periodTone: 't2',
      delivery: 'Case tecnico para promocao a pleno',
      type: 'Carreira',
      expectedImpact: 'Evidenciar evolucao, impactos e especializacao ao gestor',
    },
    {
      period: 'T3 · M7-9',
      periodTone: 't3',
      delivery: 'MongoDB Associate Developer certification',
      type: 'Certificacao',
      expectedImpact: 'Consolida expertise ja existente com validacao oficial',
    },
    {
      period: 'T3 · M7-9',
      periodTone: 't3',
      delivery: 'Iniciar estudos de data mesh e pipelines',
      type: 'Estudo',
      expectedImpact: 'Transicao para o proximo nivel de especializacao',
    },
    {
      period: 'T3 · M8-9',
      periodTone: 't3',
      delivery: 'Tech talk interno: arquitetura hexagonal ou observabilidade',
      type: 'Visibilidade',
      expectedImpact: 'Posicionamento como referencia tecnica no time',
    },
    {
      period: 'T4 · M10-12',
      periodTone: 't4',
      delivery: 'AWS Solutions Architect Associate',
      type: 'Certificacao',
      expectedImpact: 'Credencial senior em cloud - diferencial forte no banco',
    },
    {
      period: 'T4 · M10-12',
      periodTone: 't4',
      delivery: 'Propor ou participar de projeto de dados na area',
      type: 'Tecnico',
      expectedImpact: 'Primeiro contato real com data mesh / plataforma de dados',
    },
  ];

  readonly positionCards: PositionCardData[] = [
    {
      title: 'O que comunicar ao gestor',
      items: [
        'Estou me especializando em arquitetura back-end com Go, com visao de dados e observabilidade',
        'O Rollout Service e meu projeto ancora de evidencia tecnica',
        'Quero entender os criterios concretos de avaliacao para pleno',
        'Tenho contribuido com a iniciativa DJ, que impacta toda a area',
        'Estou buscando certs de mercado (Datadog + AWS) para formalizar expertise',
      ],
    },
    {
      title: 'Evidencias que constroem o case',
      items: [
        'Codigo em producao com impacto mensuravel (ex: latencia, bugs resolvidos)',
        'Documentacao tecnica de qualidade (ADRs, diagramas, Notion)',
        'Certificacoes: prova de conhecimento alem do dia a dia',
        'Iniciativas alem do backlog: DJ, Rollout, tech talks',
        'On-call resolvido com diagnostico estruturado (Datadog + post-mortem)',
        'Ajudar e revisar codigo de outros devs (comportamento pleno)',
      ],
    },
    {
      title: 'Armadilhas a evitar',
      items: [
        'Tentar estudar tudo ao mesmo tempo -> foco ate os 6 meses primeiro',
        'Ficar invisivel: entrega sem comunicacao nao gera promocao',
        'Angular como escape: e sua realidade, mas nao e sua trajetoria - limite o tempo',
        'PDI sem alinhamento com gestor: valide as prioridades internamente',
        'Certificacao sem aplicacao pratica: estude o que ja usa ou vai usar logo',
      ],
    },
    {
      title: 'Perfil alvo em 6 meses',
      items: [
        'Dev back-end pleno em Go com dominio de arquitetura hexagonal',
        'Capacidade de propor e revisar solucoes de forma autonoma',
        'Observabilidade com Datadog: logs, APM, alertas - certificado',
        'AWS Cloud Practitioner: infra cloud formalizada',
        'Contribuicao visivel na iniciativa DJ com impacto na area',
        'Referencia tecnica para 1 dominio especifico do time',
      ],
    },
  ];
}
