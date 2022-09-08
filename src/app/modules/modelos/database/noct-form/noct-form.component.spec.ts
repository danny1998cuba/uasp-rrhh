import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoctFormComponent } from './noct-form.component';

describe('NoctFormComponent', () => {
  let component: NoctFormComponent;
  let fixture: ComponentFixture<NoctFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoctFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoctFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
