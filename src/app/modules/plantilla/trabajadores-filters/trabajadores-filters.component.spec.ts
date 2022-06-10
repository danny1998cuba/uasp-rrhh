import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresFiltersComponent } from './trabajadores-filters.component';

describe('TrabajadoresFiltersComponent', () => {
  let component: TrabajadoresFiltersComponent;
  let fixture: ComponentFixture<TrabajadoresFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
