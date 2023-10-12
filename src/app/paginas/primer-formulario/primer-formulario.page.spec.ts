import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimerFormularioPage } from './primer-formulario.page';

describe('PrimerFormularioPage', () => {
  let component: PrimerFormularioPage;
  let fixture: ComponentFixture<PrimerFormularioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrimerFormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
