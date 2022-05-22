import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAddModComponent } from './rol-add-mod.component';

describe('RolAddModComponent', () => {
  let component: RolAddModComponent;
  let fixture: ComponentFixture<RolAddModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolAddModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolAddModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
