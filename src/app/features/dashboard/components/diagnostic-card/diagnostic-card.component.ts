import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { DiagnosticCardData } from '../../models/dashboard.model';

@Component({
  selector: 'app-diagnostic-card',
  standalone: true,
  imports: [CommonModule, TuiAppearance],
  templateUrl: './diagnostic-card.component.html',
  styleUrl: './diagnostic-card.component.scss',
})
export class DiagnosticCardComponent {
  readonly card = input.required<DiagnosticCardData>();
}
