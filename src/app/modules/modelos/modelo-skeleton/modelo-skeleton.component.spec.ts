import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloSkeletonComponent } from './modelo-skeleton.component';

describe('ModeloSkeletonComponent', () => {
  let component: ModeloSkeletonComponent;
  let fixture: ComponentFixture<ModeloSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeloSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
