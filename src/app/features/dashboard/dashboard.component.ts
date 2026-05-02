import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PdiDataService } from '../../core/services/pdi-data.service';
import { SectionLabelComponent } from './components/section-label/section-label.component';
import { DiagnosticCardComponent } from './components/diagnostic-card/diagnostic-card.component';
import { PhaseBlockComponent } from './components/phase-block/phase-block.component';
import { CertCardComponent } from './components/cert-card/cert-card.component';
import { DeliveriesTableComponent } from './components/deliveries-table/deliveries-table.component';
import { PositionCardComponent } from './components/position-card/position-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SectionLabelComponent,
    DiagnosticCardComponent,
    PhaseBlockComponent,
    CertCardComponent,
    DeliveriesTableComponent,
    PositionCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly pdiData = inject(PdiDataService);

  readonly data = toSignal(this.pdiData.getDashboardData());
}
