import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEscalaComponent } from './grupo-escala.component';

describe('GrupoEscalaComponent', () => {
  let component: GrupoEscalaComponent;
  let fixture: ComponentFixture<GrupoEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEscalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
