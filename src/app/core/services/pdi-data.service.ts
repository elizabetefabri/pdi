import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { DashboardData } from '../models/pdi.model';

@Injectable({ providedIn: 'root' })
export class PdiDataService {
  private readonly http = inject(HttpClient);

  // shareReplay(1) garante que múltiplas subscrições não disparem múltiplas requisições
  private readonly cache$ = this.http
    .get<DashboardData>('assets/data/pdi-dashboard.json')
    .pipe(shareReplay(1));

  getDashboardData(): Observable<DashboardData> {
    return this.cache$;
  }
}
