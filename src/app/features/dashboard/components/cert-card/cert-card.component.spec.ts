import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertCardComponent } from './cert-card.component';

describe('CertCardComponent', () => {
  let component: CertCardComponent;
  let fixture: ComponentFixture<CertCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CertCardComponent] }).compileComponents();

    fixture = TestBed.createComponent(CertCardComponent);
    fixture.componentRef.setInput('cert', {
      name: 'cert',
      badge: 'curto',
      description: 'desc',
      why: 'why',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
