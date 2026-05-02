import { Component, input } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { PositionCardData } from '../../models/dashboard.model';

@Component({
  selector: 'app-position-card',
  standalone: true,
  imports: [TuiAppearance],
  templateUrl: './position-card.component.html',
  styleUrl: './position-card.component.scss',
})
export class PositionCardComponent {
  readonly card = input.required<PositionCardData>();
}
