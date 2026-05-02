import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { PdiDataService } from '../../core/services/pdi-data.service';
import { DashboardData } from '../../core/models/pdi.model';

const mockDashboardData: DashboardData = {
  diagnosticCards: [{ title: 't', tone: 'default', items: ['i'] }],
  focusAlert: { title: 'a', body: 'b' },
  phases: [{ period: 'p', tone: 'blue', title: 't', cards: [{ label: 'l', items: [{ tag: 'g', text: 'x' }] }] }],
  certifications: [{ name: 'c', badge: 'curto', description: 'd', why: 'w' }],
  deliveries: [{ period: 'T1', periodTone: 't1', delivery: 'd', type: 't', expectedImpact: 'i' }],
  positionCards: [{ title: 'p', items: ['i'] }],
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        {
          provide: PdiDataService,
          useValue: {
            getDashboardData: () => of(mockDashboardData),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should display content section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dashboard-content')).toBeTruthy();
  });
});
