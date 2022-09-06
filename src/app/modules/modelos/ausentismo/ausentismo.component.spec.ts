import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusentismoComponent } from './ausentismo.component';

describe('AusentismoComponent', () => {
  let component: AusentismoComponent;
  let fixture: ComponentFixture<AusentismoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusentismoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusentismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
