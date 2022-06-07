import { TestBed } from '@angular/core/testing';

import { DepCargoService } from './dep-cargo.service';

describe('DepCargoService', () => {
  let service: DepCargoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepCargoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
