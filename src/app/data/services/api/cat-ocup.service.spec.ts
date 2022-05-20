import { TestBed } from '@angular/core/testing';

import { CatOcupService } from './cat-ocup.service';

describe('CatOcupService', () => {
  let service: CatOcupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatOcupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
