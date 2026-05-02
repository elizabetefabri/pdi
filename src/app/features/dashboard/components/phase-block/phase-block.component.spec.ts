import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhaseBlockComponent } from './phase-block.component';

describe('PhaseBlockComponent', () => {
  let component: PhaseBlockComponent;
  let fixture: ComponentFixture<PhaseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhaseBlockComponent);
    fixture.componentRef.setInput('phase', {
      period: '0-3 meses',
      tone: 'default',
      title: 'fase',
      cards: [
        {
          label: 'foco',
          items: [{ tag: 'GO', text: 'item' }],
        },
      ],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
