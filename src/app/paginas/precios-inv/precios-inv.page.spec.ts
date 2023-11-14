import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreciosInvPage } from './precios-inv.page';

describe('PreciosInvPage', () => {
  let component: PreciosInvPage;
  let fixture: ComponentFixture<PreciosInvPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreciosInvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
