import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepCargoComponent } from './dep-cargo.component';

describe('DepCargoComponent', () => {
  let component: DepCargoComponent;
  let fixture: ComponentFixture<DepCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
