import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent {
  readonly title = 'PDI — Júnior para Pleno em Back-end & Arquitetura';
  readonly subtitle = 'Plano organizado para apresentar contexto, evolução e próximos passos com clareza.';
  readonly objectivePlaceholder = 'Objetivo atual: __________________________________________';

  readonly dailyStack = ['Go', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Datadog', 'SQL'];
  readonly workPractices = ['Agile', 'Scrum', 'CI/CD', 'Clean Architecture', 'Data Mesh'];
}
