import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaSkeletonComponent } from './sistema-skeleton.component';

describe('SistemaSkeletonComponent', () => {
  let component: SistemaSkeletonComponent;
  let fixture: ComponentFixture<SistemaSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemaSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
