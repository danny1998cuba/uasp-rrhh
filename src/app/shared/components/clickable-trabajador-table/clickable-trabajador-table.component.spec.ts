import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableTrabajadorTableComponent } from './clickable-trabajador-table.component';

describe('ClickableTrabajadorTableComponent', () => {
  let component: ClickableTrabajadorTableComponent;
  let fixture: ComponentFixture<ClickableTrabajadorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickableTrabajadorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableTrabajadorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
