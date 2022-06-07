import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcAddModComponent } from './dc-add-mod.component';

describe('DcAddModComponent', () => {
  let component: DcAddModComponent;
  let fixture: ComponentFixture<DcAddModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcAddModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcAddModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
