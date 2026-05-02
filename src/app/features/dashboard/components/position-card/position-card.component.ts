import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { PositionCardData } from '../../models/dashboard.model';

@Component({
  selector: 'app-position-card',
  standalone: true,
  imports: [CommonModule, TuiAppearance],
  templateUrl: './position-card.component.html',
  styleUrl: './position-card.component.scss',
})
export class PositionCardComponent {
  readonly card = input.required<PositionCardData>();
}
