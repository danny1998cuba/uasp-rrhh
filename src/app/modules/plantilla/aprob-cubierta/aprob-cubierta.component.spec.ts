import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobCubiertaComponent } from './aprob-cubierta.component';

describe('AprobCubiertaComponent', () => {
  let component: AprobCubiertaComponent;
  let fixture: ComponentFixture<AprobCubiertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobCubiertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobCubiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
