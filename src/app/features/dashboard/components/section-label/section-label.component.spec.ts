import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionLabelComponent } from './section-label.component';

describe('SectionLabelComponent', () => {
  let component: SectionLabelComponent;
  let fixture: ComponentFixture<SectionLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionLabelComponent);
    fixture.componentRef.setInput('text', 'test section');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
