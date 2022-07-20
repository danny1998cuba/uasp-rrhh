import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPdfViewerComponent } from './my-pdf-viewer.component';

describe('MyPdfViewerComponent', () => {
  let component: MyPdfViewerComponent;
  let fixture: ComponentFixture<MyPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPdfViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
