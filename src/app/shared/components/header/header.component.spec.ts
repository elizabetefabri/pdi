import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header-title')).toBeTruthy();
  });

  it('should display meta chips', () => {
    const compiled = fixture.nativeElement;
    const chips = compiled.querySelectorAll('.meta-chip');
    expect(chips.length).toBe(4);
  });

  it('should render correct number of dots', () => {
    const compiled = fixture.nativeElement;
    const dots = compiled.querySelectorAll('.dot');
    expect(dots.length).toBe(4);
  });
});
