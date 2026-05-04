import { Component, input } from '@angular/core';
import { TuiBadge } from '@taiga-ui/kit';
import { DeliveryRowData } from '../../models/dashboard.model';

@Component({
  selector: 'app-deliveries-table',
  standalone: true,
  imports: [TuiBadge],
  templateUrl: './deliveries-table.component.html',
  styleUrl: './deliveries-table.component.scss',
})
export class DeliveriesTableComponent {
  readonly rows = input.required<DeliveryRowData[]>();
}
