import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { CertificationData } from '../../models/dashboard.model';

@Component({
  selector: 'app-cert-card',
  standalone: true,
  imports: [CommonModule, TuiAppearance, TuiBadge],
  templateUrl: './cert-card.component.html',
  styleUrl: './cert-card.component.scss',
})
export class CertCardComponent {
  readonly cert = input.required<CertificationData>();
}
