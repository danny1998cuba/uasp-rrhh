import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevantamientoComponent } from './levantamiento.component';

describe('LevantamientoComponent', () => {
  let component: LevantamientoComponent;
  let fixture: ComponentFixture<LevantamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevantamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevantamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
