import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevFormComponent } from './lev-form.component';

describe('LevFormComponent', () => {
  let component: LevFormComponent;
  let fixture: ComponentFixture<LevFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
