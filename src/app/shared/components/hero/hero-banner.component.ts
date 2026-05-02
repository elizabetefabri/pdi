import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent {
  readonly subtitle = 'Plano organizado para apresentar contexto, evolução e próximos passos com clareza.';
  readonly objectivePlaceholder = 'Quero entregar um trabalho de alto nível e mostrar meu valor através da minha evolução diária. Confio no processo e sei que os resultados virão no tempo certo. Estou focada em aprender, crescer e contribuir de verdade com a equipe e com a empresa. Acredito que, com dedicação e constância, posso alcançar meus objetivos e construir uma carreira sólida e significativa.';

  readonly dailyStack = ['Go', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Datadog', 'SQL'];
  readonly workPractices = ['Agile', 'Scrum', 'CI/CD', 'Clean Architecture', 'Data Mesh'];
}
