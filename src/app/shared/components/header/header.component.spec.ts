import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render identity bar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.identity-main')?.textContent).toContain('Elizabete Fabri');
  });

  it('should render primary navigation links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('.nav-row.primary .nav-link');
    expect(links.length).toBe(component.primaryLinks.length);
  });

  it('should render secondary navigation links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('.nav-row.secondary .nav-link');
    expect(links.length).toBe(component.secondaryLinks.length);
  });
});
