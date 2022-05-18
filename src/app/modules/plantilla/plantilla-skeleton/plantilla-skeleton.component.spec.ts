import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaSkeletonComponent } from './plantilla-skeleton.component';

describe('PlantillaSkeletonComponent', () => {
  let component: PlantillaSkeletonComponent;
  let fixture: ComponentFixture<PlantillaSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
