import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatOcupComponent } from './cat-ocup.component';

describe('CatOcupComponent', () => {
  let component: CatOcupComponent;
  let fixture: ComponentFixture<CatOcupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatOcupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatOcupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
