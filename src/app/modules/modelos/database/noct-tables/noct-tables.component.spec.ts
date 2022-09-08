import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoctTablesComponent } from './noct-tables.component';

describe('NoctTablesComponent', () => {
  let component: NoctTablesComponent;
  let fixture: ComponentFixture<NoctTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoctTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoctTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
