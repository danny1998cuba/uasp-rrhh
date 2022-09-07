import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusentismoFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: AusentismoFormComponent;
  let fixture: ComponentFixture<AusentismoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusentismoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusentismoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
