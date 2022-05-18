import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaComponent } from './cla.component';

describe('ClaComponent', () => {
  let component: ClaComponent;
  let fixture: ComponentFixture<ClaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
