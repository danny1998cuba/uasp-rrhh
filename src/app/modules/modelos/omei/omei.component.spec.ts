import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmeiComponent } from './omei.component';

describe('OmeiComponent', () => {
  let component: OmeiComponent;
  let fixture: ComponentFixture<OmeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmeiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
