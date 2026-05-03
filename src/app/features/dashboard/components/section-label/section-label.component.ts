import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-label',
  standalone: true,
  templateUrl: './section-label.component.html',
  styleUrl: './section-label.component.scss',
})
export class SectionLabelComponent {
    readonly subtitle = 'Plano organizado para apresentar contexto, evolução e próximos passos com clareza.';
  readonly text = input.required<string>();
}
