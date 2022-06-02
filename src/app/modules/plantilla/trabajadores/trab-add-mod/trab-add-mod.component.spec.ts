import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabAddModComponent } from './trab-add-mod.component';

describe('TrabAddModComponent', () => {
  let component: TrabAddModComponent;
  let fixture: ComponentFixture<TrabAddModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabAddModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabAddModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
