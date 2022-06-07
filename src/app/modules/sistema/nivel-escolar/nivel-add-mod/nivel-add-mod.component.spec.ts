import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelAddModComponent } from './nivel-add-mod.component';

describe('NivelAddModComponent', () => {
  let component: NivelAddModComponent;
  let fixture: ComponentFixture<NivelAddModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelAddModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelAddModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
