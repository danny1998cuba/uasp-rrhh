import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDocComponent } from './cat-doc.component';

describe('CatDocComponent', () => {
  let component: CatDocComponent;
  let fixture: ComponentFixture<CatDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
