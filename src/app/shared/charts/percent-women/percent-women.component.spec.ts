import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentWomenComponent } from './percent-women.component';

describe('PercentWomenComponent', () => {
  let component: PercentWomenComponent;
  let fixture: ComponentFixture<PercentWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentWomenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
