import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresUnidadComponent } from './trabajadores-unidad.component';

describe('TrabajadoresUnidadComponent', () => {
  let component: TrabajadoresUnidadComponent;
  let fixture: ComponentFixture<TrabajadoresUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
