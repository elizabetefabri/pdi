import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiChip } from '@taiga-ui/kit';

interface MetaChip {
  label: string;
  dotColor: 'primary' | 'green' | 'blue' | 'pink' | 'roxo' | 'amarelo';
}

interface AnchorLink {
  label: string;
  fragment: string;
}

interface DetailLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiChip, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly title = 'Dev Júnior → Pleno';
  readonly subtitle = 'Back-end & Arquitetura';
  readonly organization = 'Itaú Unibanco · Squad Eng Foundation';
  readonly horizon = 'Tempo de Casa: 1 ano → 6 meses';
  readonly anchorLinks: AnchorLink[] = [
    { label: 'Diagnóstico', fragment: 'diagnostico' },
    { label: 'Fases', fragment: 'fases' },
    { label: 'Certificações', fragment: 'certificacoes' },
    { label: 'Entregas', fragment: 'entregas' },
    { label: 'Posicionamento', fragment: 'posicionamento' },
  ];

  readonly detailLinks: DetailLink[] = [
    { label: 'Skills', route: '/skills' },
    { label: 'Projetos', route: '/projetos' },
    { label: 'Roadmap', route: '/roadmap' },
  ];

  readonly metaChips: MetaChip[] = [
    { label: 'Go · Node.js · Python', dotColor: 'primary' },
    { label: 'Backend: AWS', dotColor: 'green' },
    { label: 'DevOps: CI/CD', dotColor: 'blue' },
    { label: 'Arquitetura: DDD, Clean Architecture', dotColor: 'pink' },
    { label: 'Dados: SQL → Data Mesh', dotColor: 'roxo' },
    { label: 'FrontEnd: React, Angular · TypeScript', dotColor: 'amarelo' },
    { label: 'Metodologias: Agile, Scrum', dotColor: 'primary' },
    { label: 'Containers: Docker, Kubernetes', dotColor: 'green' },
    { label: 'Engenharia de PROMPT ia', dotColor: 'blue' },
  ];
}
