import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-label',
  standalone: true,
  templateUrl: './section-label.component.html',
  styleUrl: './section-label.component.scss',
})
export class SectionLabelComponent {
  readonly text = input.required<string>();
}
