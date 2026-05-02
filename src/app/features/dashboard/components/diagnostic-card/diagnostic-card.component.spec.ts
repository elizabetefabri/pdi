import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticCardComponent } from './diagnostic-card.component';

describe('DiagnosticCardComponent', () => {
  let component: DiagnosticCardComponent;
  let fixture: ComponentFixture<DiagnosticCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticCardComponent);
    fixture.componentRef.setInput('card', {
      title: 'test',
      tone: 'default',
      items: ['item 1'],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
