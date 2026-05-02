import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { TuiChip } from '@taiga-ui/kit';
import { PhaseData } from '../../models/dashboard.model';

@Component({
  selector: 'app-phase-block',
  standalone: true,
  imports: [CommonModule, TuiAppearance, TuiChip],
  templateUrl: './phase-block.component.html',
  styleUrl: './phase-block.component.scss',
})
export class PhaseBlockComponent {
  readonly phase = input.required<PhaseData>();
}
