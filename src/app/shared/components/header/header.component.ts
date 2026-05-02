import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiChip } from '@taiga-ui/kit';

interface MetaChip {
  label: string;
  dotColor: 'primary' | 'green' | 'blue' | 'pink' | 'roxo' | 'amarelo';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiChip],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Dev Júnior → Pleno';
  subtitle = 'Back-end & Arquitetura';
  organization = 'Itaú Unibanco · Squad Eng Foundation';
  horizon = 'Tempo de Casa: 1 ano → 6 meses';

  metaChips: MetaChip[] = [
    { label: 'Go · Node.js · Python', dotColor: 'primary' },
    { label: 'Backend: AWS', dotColor: 'green' },
    { label: 'DevOps: CI/CD', dotColor: 'blue' },
    { label: 'Arquitetura: DDD, Clean Architecture', dotColor: 'pink' },
    { label: 'Dados: SQL → Data Mesh', dotColor: 'roxo' },
    { label: 'FrontEnd: React, Angular · TypeScript', dotColor: 'amarelo' },
    { label: 'Metodologias: Agile, Scrum', dotColor: 'primary' },
    { label: 'Containers: Docker, Kubernetes', dotColor: 'green' },
    { label: 'Engenharia de PROMPT ia ', dotColor: 'blue' },

  ];
}
